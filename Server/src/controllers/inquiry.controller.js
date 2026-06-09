import { Inquiry } from "../models/inquirySchema.js";

export const createInquiry = async (req, res) => {
  try {
    console.log("Inquiry Create touched")
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const newInquiry = await Inquiry.create({ name, email, subject, message });
    return res.status(201).json({ success: true, inquiry: newInquiry });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, inquiries });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      id,
      {
        ...(status && { status }),
        ...(adminNotes !== undefined && { adminNotes }),
      },
      { new: true },
    );

    if (!updatedInquiry) {
      return res
        .status(404)
        .json({ success: false, message: "Inquiry not found" });
    }

    return res.status(200).json({ success: true, inquiry: updatedInquiry });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
