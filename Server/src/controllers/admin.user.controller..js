// @desc    Get all users with advanced filtering, segmentation, search, and pagination
// @route   GET /api/admin/users
// @access  Private/Admin
import User from "../models/userSchema.js";

export const getAllUsersForAdmin = async (req, res) => {
  try {
    const { segment, search, page = 1, limit = 10 } = req.query;

    // Build query object
    let query = {};

    // 1. Handle Global Search (Name or Email)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // 2. Handle Segment Filters
    if (segment === "vip") {
      // VIP logic: Customers with 15+ orders
      query.$expr = { $gte: [{ $size: "$orders" }, 15] };
    } else if (segment === "new") {
      // New signups: Created within the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      query.createdAt = { $gte: thirtyDaysAgo };
    } else if (segment === "inactive") {
      // Inactive: Has zero orders
      query.orders = { $size: 0 };
    }

    // 3. Setup Pagination
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    // 4. Fetch data and total counts
    const users = await User.find(query)
      .select("-password -refreshToken") // Security safety
      .populate("orders")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const totalCustomers = await User.countDocuments(query);

    // 5. Build Aggregation Dashboard Metrics
    const metrics = await User.aggregate([
      {
        $facet: {
          totalCount: [{ $count: "count" }],
          newCount: [
            {
              $match: {
                createdAt: {
                  $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                },
              },
            },
            { $count: "count" },
          ],
          vipCount: [
            {
              $project: { orderCount: { $size: { $ifNull: ["$orders", []] } } },
            },
            { $match: { orderCount: { $gte: 15 } } },
            { $count: "count" },
          ],
        },
      },
    ]);

    // Format results to cleanly hand off to frontend
    const formattedUsers = users.map((user) => {
      // 🔧 FIXED: Changed order.totalPrice to order.totalAmount to match Order schema
      const totalSpend = user.orders.reduce(
        (sum, order) => sum + (order.totalAmount || 0),
        0,
      );

      // Determine status string dynamically for the UI tags
      let computedStatus = "STANDARD";
      if (user.orders.length >= 15) computedStatus = "VIP ELITE";
      else if (user.orders.length === 0) computedStatus = "INACTIVE";
      else if (user.createdAt > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
        computedStatus = "NEW";

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: computedStatus,
        ordersCount: user.orders.length,
        totalSpend: totalSpend,
        createdAt: user.createdAt,
        isVerified: user.isVerified,
      };
    });

    res.status(200).json({
      success: true,
      customers: formattedUsers,
      pagination: {
        totalCustomers,
        currentPage: pageNum,
        totalPages: Math.ceil(totalCustomers / limitNum),
        limit: limitNum,
      },
      stats: {
        total: metrics[0]?.totalCount[0]?.count || 0,
        newSignups: metrics[0]?.newCount[0]?.count || 0,
        vips: metrics[0]?.vipCount[0]?.count || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
