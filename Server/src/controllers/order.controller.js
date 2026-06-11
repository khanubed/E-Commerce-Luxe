import Order from "../models/orderSchema.js";
import Product from "../models/productSchema.js";
import User from "../models/userSchema.js";

import Razorpay from "razorpay";
import crypto from "crypto";

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("items.product", "title thumbnail");

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("GET USER ORDERS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error retrieving your orders history",
    });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { reason, comments } = req.body;
    if (!reason) {
      return res
        .status(400)
        .json({ success: false, message: "Cancellation reason is required." });
    }
    if (reason === "Other" && !comments) {
      return res.status(400).json({
        success: false,
        message: "Please specify your reason in the comments.",
      });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }
    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "This order has already been cancelled.",
      });
    }

    order.orderStatus = "Cancelled";
    order.cancellation = {
      reason: reason,
      comments: comments || "",
      cancelledAt: new Date(),
    };

    await order.save();
    if (order.items && order.items.length > 0) {
      const stockUpdates = order.items.map((item) => {
        return Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity },
        });
      });
      await Promise.all(stockUpdates);
    }
    return res.status(200).json({
      success: true,
      message: "Order successfully cancelled and items returned to inventory.",
      data: order,
    });
  } catch (error) {
    console.error("Error in cancelOrder controller:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while attempting to cancel the order.",
      error: error.message,
    });
  }
};

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;
    const userId = req.user._id;

    // 1. Structural Payload Validation
    if (
      !items ||
      items.length === 0 ||
      !totalAmount ||
      !shippingAddress ||
      !paymentMethod
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required order checkout details.",
      });
    }

    // Ensure payment method string matches schema enum exactly
    if (!["cod", "online"].includes(paymentMethod.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method structure.",
      });
    }
    const formattedItems = items.map((item) => ({
      product: item.productId || item.product,
      quantity: Number(item.quantity),
      price: Number(item.price),
    }));

    // ==========================================
    // CASE A: CASH ON DELIVERY (COD)
    // ==========================================
    if (paymentMethod.toLowerCase() === "cod") {
      const newCodOrder = new Order({
        user: userId,
        items: formattedItems,
        totalAmount,
        shippingAddress,
        paymentMethod: "cod",
        paymentDetails: {
          paymentStatus: "Pending",
        },
        orderStatus: "Confirmed",
      });

      await User.findByIdAndUpdate(req.user._id, {
        $push: { orders: newCodOrder._id },
      });

      await newCodOrder.save();

      return res.status(201).json({
        success: true,
        isCOD: true,
        message: "Order placed successfully using Cash on Delivery!",
        orderId: newCodOrder._id,
      });
    }

    // ==========================================
    // CASE B: ONLINE PAYMENT VIA RAZORPAY
    // ==========================================
    if (paymentMethod.toLowerCase() === "online") {
      // Razorpay expects amounts processed in smaller subunits (Paisa for INR). Multiply by 100.
      const razorpayOptions = {
        amount: Math.round(totalAmount * 100),
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`,
      };

      // Ping Razorpay API to generate transaction token parameters
      const rzpOrderIntent =
        await razorpayInstance.orders.create(razorpayOptions);

      // Save a local trace record of this order set to 'Pending'
      const newOnlineOrder = new Order({
        user: userId,
        items: formattedItems,
        totalAmount,
        shippingAddress,
        paymentMethod: "online",
        paymentDetails: {
          razorpayOrderId: rzpOrderIntent.id,
          paymentStatus: "Pending",
        },
        orderStatus: "Pending", // Stays Pending until signature verification hook clears it
      });

      await newOnlineOrder.save();
      await User.findByIdAndUpdate(req.user._id, {
        $push: { orders: newOnlineOrder._id },
      });

      return res.status(200).json({
        success: true,
        isCOD: false,
        razorpayOrder: rzpOrderIntent, // This token structure is required by frontend window modal popup
        localOrderId: newOnlineOrder._id,
      });
    }
  } catch (error) {
    console.error("CREATE ORDER CONTROLLER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error setting up checkout pipeline process.",
      error: error.message,
    });
  }
};

export const verifyPaymentSignature = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      localOrderId,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !localOrderId
    ) {
      return res.status(400).json({
        success: false,
        message: "Verification payload keys missing.",
      });
    }

    const paymentSecretHashBody = razorpay_order_id + "|" + razorpay_payment_id;

    const generatedExpectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(paymentSecretHashBody.toString())
      .digest("hex");

    const isTransactionLegit =
      generatedExpectedSignature === razorpay_signature;

    if (isTransactionLegit) {
      const finalizedOrder = await Order.findByIdAndUpdate(
        localOrderId,
        {
          $set: {
            "paymentDetails.razorpayPaymentId": razorpay_payment_id,
            "paymentDetails.razorpaySignature": razorpay_signature,
            "paymentDetails.paymentStatus": "Paid",
            "paymentDetails.paidAt": new Date(),
            orderStatus: "Confirmed",
          },
        },
        { new: true },
      );

      return res.status(200).json({
        success: true,
        message: "Payment authorized successfully. Your order is confirmed!",
        order: finalizedOrder,
      });
    } else {
      await Order.findByIdAndUpdate(localOrderId, {
        $set: {
          "paymentDetails.paymentStatus": "Failed",
          orderStatus: "Cancelled",
        },
      });

      return res.status(400).json({
        success: false,
        message:
          "Cryptographic signature validation check failed. Security exception.",
      });
    }
  } catch (error) {
    console.error("VERIFY PAYMENT CONTROLLER ERROR:", error);
    return res.status(500).json({
      success: false,
      message:
        "Server exception dropped during signature audit verification tracks.",
      error: error.message,
    });
  }
};
