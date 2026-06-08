import Order from "../models/orderSchema.js";

// 📊 GET ALL ORDERS (With User Population, Advanced Search, and Pagination)
export const getAdminOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, search, sort } = req.query;

    // Build initial filter object for root elements
    const matchQuery = {};

    // 1. Filter by Order Tracking Status
    if (status && status !== "all") {
      // Capitalize first letter to match your exact enum structure: "Pending", "Shipped", etc.
      matchQuery.orderStatus = status.charAt(0).toUpperCase() + status.slice(1);
    }

    // 2. Setup Sorting Logic
    let sortOptions = { createdAt: -1 }; // Default: Latest First
    if (sort === "Highest Amount") {
      sortOptions = { totalAmount: -1 };
    }

    const skipIndex = (parseInt(page) - 1) * parseInt(limit);

    // 3. High Performance Pipeline Aggregation for Data Lookup Joins
    const aggregationPipeline = [
      { $match: matchQuery },

      // Look up relational data from the "users" collection
      {
        $lookup: {
          from: "users", // Must match your exact MongoDB user collection name (usually lowercase plural)
          localField: "user",
          foreignField: "_id",
          as: "customerDetails",
        },
      },
      // Flatten the resulting customer array
      {
        $unwind: { path: "$customerDetails", preserveNullAndEmptyArrays: true },
      },
    ];

    // 4. Dynamic Complex Search Handling
    if (search) {
      aggregationPipeline.push({
        $match: {
          $or: [
            // Look up by internal hexadecimal ObjectId format or text patterns
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

    // 5. Clone pipeline branches to accurately compile counting totals alongside paginated arrays
    const totalCountPipeline = [...aggregationPipeline, { $count: "count" }];
    const totalResult = await Order.aggregate(totalCountPipeline);
    const totalOrders = totalResult[0]?.count || 0;

    // 6. Complete paginated execution chain
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
          // Ensure these fields are explicitly sent down to the frontend:
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

// 📈 GET ORDER METRICS & TELEMETRY
export const getAdminOrderStats = async (req, res) => {
  try {
    // Single-pass structural calculations parsing live states
    const statsData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalCount: { $sum: 1 },
          // Total Revenue excludes cancelled transactions to protect analytical bookkeeping accuracy
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

// 🛠️ UPDATE STATUS ALTERATION MUTATION
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // Expecting values like: "Pending", "Confirmed", "Shipped", etc.

    // Enforce matching enum criteria values
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

    // Inject automatic tracking stamps if an order is cancelled
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
