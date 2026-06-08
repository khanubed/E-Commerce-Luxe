import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      fullName: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    // 🔄 MODIFIED: Adjusted tracking method values to match general modern naming conventions
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      default: "online",
    },

    // ➕ ADDED: Explicit structural fields to record dynamic gateway transaction statuses safely
    paymentDetails: {
      razorpayOrderId: { type: String },
      razorpayPaymentId: { type: String },
      razorpaySignature: { type: String },
      paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed", "Refunded"],
        default: "Pending",
      },
      paidAt: { type: Date },
    },

    orderStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },

    cancellation: {
      reason: {
        type: String,
        enum: ["Price too high", "Found elsewhere", "Other"],
        required: function () {
          // 🔧 FIXED: Changed "this.status" to "this.orderStatus" to match your actual schema key
          return this.orderStatus === "Cancelled";
        },
      },
      comments: {
        type: String,
        trim: true,
        maxlength: 500,
        required: function () {
          return this.cancellation && this.cancellation.reason === "Other";
        },
      },
      cancelledAt: {
        type: Date,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
