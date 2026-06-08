import mongoose from "mongoose";
import express from "express";
import { config } from "dotenv";

await config();

import cors from "cors";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import { seedProducts } from "./scripts/seedProduct.js";
import cookieParser from "cookie-parser";
import orderRouter from "./routes/order.routes.js";
import adminOrderRouter from "./routes/admin.order.routes.js";
import { getAllUsersForAdmin } from "./controllers/admin.user.controller..js";
import { getAdminOverviewStats } from "./controllers/admin.overview.controller.js";
import { protect, protectAdmin } from "./middleware/auth.middleware.js";
import homecontentRouter from "./routes/homecontent.routes.js";
import { updateHomeContent } from "./controllers/homecontent.controller.js";
import { toggleDealStatus } from "./controllers/product.controller.js";
import inquiryRouter from "./routes/inquiry.routes.js";

connectDB();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(cookieParser());
// Add this line in your main server.js file
app.use("/uploads", express.static("uploads"));

// seedProducts();

app.get("/", (req, res) => {
  res.send(`Server Running at : ${process.env.PORT}`);
});

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.get("/api/admin/users", protect, protectAdmin, getAllUsersForAdmin);
app.get("/api/admin/overview", protect, protectAdmin, getAdminOverviewStats);
app.use("/api/home-content", homecontentRouter);
app.post("/api/admin/home-content", protect, protectAdmin, updateHomeContent);
app.patch("/api/admin/product/toggle-deal/:id", protect, protectAdmin, toggleDealStatus);
app.use("/api/inquiries", inquiryRouter);

export default app;
