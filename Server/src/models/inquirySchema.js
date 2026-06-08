import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { 
      type: String, 
      required: true, 
      enum: ["General Inquiry", "Order Status", "Returns & Exchanges", "Private Appointments"] 
    },
    message: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["unread", "in-progress", "resolved"], 
      default: "unread" 
    },
    adminNotes: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Inquiry = mongoose.model("Inquiry", inquirySchema);