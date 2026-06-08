import HomeContent from "../models/homeContentSchema.js";

export const getHomeContent = async (req, res) => {
  try {
    let content = await HomeContent.findOne();
    
    if (!content) {
      return res.status(200).json({ 
        success: true, 
        message: "No layout data initialized yet. Please publish first."
      });
    }

    res.status(200).json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateHomeContent = async (req, res) => {
  try {
    const updatePayload = req.body;

    // Performs an atomic update or creates a new entry if none exists
    const updatedLayout = await HomeContent.findOneAndUpdate(
      {}, 
      updatePayload, 
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Storefront visual content published successfully!",
      data: updatedLayout
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};