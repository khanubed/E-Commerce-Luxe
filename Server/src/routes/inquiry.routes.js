import express from "express";
import { createInquiry, getAllInquiries, updateInquiryStatus } from "../controllers/inquiry.controller.js";
import { protect, protectAdmin } from "../middleware/auth.middleware.js";

const inquiryRouter = express.Router();

// Public submissions route
inquiryRouter.post("/", createInquiry);

// Secured administrative routing modules
inquiryRouter.get("/", protect, protectAdmin, getAllInquiries);
inquiryRouter.patch("/:id", protect, protectAdmin, updateInquiryStatus);

export default inquiryRouter;