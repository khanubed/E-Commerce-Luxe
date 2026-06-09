import express from "express";
import {
  cancelOrder,
  createOrder,
  getUserOrders,
  verifyPaymentSignature,
} from "../controllers/order.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const orderRouter = express.Router();

orderRouter.get("/my-orders", protect, getUserOrders);
orderRouter.patch("/:orderId/cancel", protect, cancelOrder);
orderRouter.post("/checkout", protect, createOrder);
orderRouter.post("/verify", protect, verifyPaymentSignature);

export default orderRouter;
