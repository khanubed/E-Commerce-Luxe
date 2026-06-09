import Order from "../models/orderSchema.js";

export const getAdminOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, search, sort } = req.query;

    const matchQuery = {};
    if (status && status !== "all") {
      matchQuery.orderStatus = status.charAt(0).toUpperCase() + status.slice(1);
    }

    let sortOptions = { createdAt: -1 }; 
    if (sort === "Highest Amount") {
      sortOptions = { totalAmount: -1 };
    }

    const skipIndex = (parseInt(page) - 1) * parseInt(limit);

    const aggregationPipeline = [
      { $match: matchQuery },
      {
        $lookup: {
          from: "users", 
          localField: "user",
          foreignField: "_id",
          as: "customerDetails",
        },
      },
      {
        $unwind: { path: "$customerDetails", preserveNullAndEmptyArrays: true },
      },
    ];

    if (search) {
      aggregationPipeline.push({
        $match: {
          $or: [
            {
              _id: search.match(/^[0-9a-fA-F]{24}$/)
                ? new mongoose.Types.ObjectId(search)
                : null,
            },
            { "shippingAddress.fullName": { $regex: search, $options: "i" } },
            { "customerDetails.email": { $regex: search, $options: "i" } },
            { "customerDetails.name": { $regex: search, $options: "i" } },
          ],
        },
      });
    }
    const totalCountPipeline = [...aggregationPipeline, { $count: "count" }];
    const totalResult = await Order.aggregate(totalCountPipeline);
    const totalOrders = totalResult[0]?.count || 0;
    aggregationPipeline.push(
      { $sort: sortOptions },
      { $skip: skipIndex },
      { $limit: parseInt(limit) },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          totalAmount: 1,
          status: "$orderStatus",
          customerName: {
            $ifNull: ["$shippingAddress.fullName", "$customerDetails.name"],
          },
          customerEmail: { $ifNull: ["$customerDetails.email", "N/A"] },
          items: 1,
          shippingAddress: 1,
          paymentMethod: 1,
        },
      },
    );

    const formattedOrders = await Order.aggregate(aggregationPipeline);

    return res.status(200).json({
      success: true,
      orders: formattedOrders,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to balance order log registry pipeline.",
      error: error.message,
    });
  }
};

export const getAdminOrderStats = async (req, res) => {
  try {
    const statsData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalCount: { $sum: 1 },
          totalRevenue: {
            $sum: {
              $cond: [
                { $eq: ["$orderStatus", "Cancelled"] },
                0,
                "$totalAmount",
              ],
            },
          },
          pendingCount: {
            $sum: { $cond: [{ $eq: ["$orderStatus", "Pending"] }, 1, 0] },
          },
          inTransitCount: {
            $sum: { $cond: [{ $eq: ["$orderStatus", "Shipped"] }, 1, 0] },
          },
        },
      },
    ]);

    const metrics = statsData[0] || {
      totalCount: 0,
      totalRevenue: 0,
      pendingCount: 0,
      inTransitCount: 0,
    };

    return res.status(200).json({
      success: true,
      total: metrics.totalCount,
      pending: metrics.pendingCount,
      inTransit: metrics.inTransitCount,
      revenue: Math.round(metrics.totalRevenue),
      totalTrend: "+14% from last week",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Metrics aggregate engine failure.",
      error: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; 
    
    const validStatuses = [
      "Pending",
      "Confirmed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid target status identifier." });
    }

    const updateFields = { orderStatus: status };

    if (status === "Cancelled") {
      updateFields["cancellation.reason"] = req.body.reason || "Other";
      updateFields["cancellation.comments"] =
        req.body.comments || "Cancelled by Store Administrator";
      updateFields["cancellation.cancelledAt"] = new Date();
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true },
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Target order record missing." });
    }

    return res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "State transmission mutation pipeline failed.",
      error: error.message,
    });
  }
};
