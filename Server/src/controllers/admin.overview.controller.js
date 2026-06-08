import Order from "../models/orderSchema.js";
import User from "../models/userSchema.js";
import Product from "../models/productSchema.js";

export const getAdminOverviewStats = async (req, res) => {
  try {
    console.log("Controller Touched");
    const dashboardStats = await Order.aggregate([
      {
        $facet: {
          revenueAndOrders: [
            { $match: { "paymentDetails.paymentStatus": "Paid" } },
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: "$totalAmount" },
                totalOrders: { $sum: 1 },
              },
            },
          ],
          recentOrders: [
            { $sort: { createdAt: -1 } },
            { $limit: 5 },
            {
              $lookup: {
                from: "users", // Matches user collection name
                localField: "user",
                foreignField: "_id",
                as: "customerInfo",
              },
            },
            {
              $unwind: {
                path: "$customerInfo",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $project: {
                _id: 1,
                totalAmount: 1,
                orderStatus: 1,
                customerName: {
                  $ifNull: ["$customerInfo.name", "Unknown Customer"],
                },
                createdAt: 1,
              },
            },
          ],
        },
      },
    ]);

    // 2. Extract calculations safely
    const totalRevenue =
      dashboardStats[0]?.revenueAndOrders[0]?.totalRevenue || 0;
    const totalOrders =
      dashboardStats[0]?.revenueAndOrders[0]?.totalOrders || 0;
    const recentOrders = dashboardStats[0]?.recentOrders || [];

    // 3. Count total unique client profiles
    const totalCustomers = await User.countDocuments({ isAdmin: false });

    // 4. Fetch Active Products and low stock metrics (less than 5 units left)
    // Adjust thresholds or keys to fit your specific Product Schema rules
    const activeProductsCount = await Product.countDocuments();
    const lowStockAlerts = await Product.find({ stock: { $lt: 5 } })
      .select("title stock images price")
      .limit(3);

    res.status(200).json({
      success: true,
      stats: {
        totalRevenue: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
        totalOrders: totalOrders.toString(),
        newCustomers: totalCustomers.toLocaleString(),
        activeProducts: activeProductsCount.toString(),
      },
      recentOrders: recentOrders.map((ord) => ({
        id: ord._id,
        customerName: ord.customerName,
        status: ord.orderStatus,
        amount: `$${ord.totalAmount.toFixed(2)}`,
      })),
      inventoryAlerts: lowStockAlerts.map((prod) => ({
        id: prod._id,
        name: prod.title,
        stockLeft: prod.stock,
      })),
    });
  } catch (error) {
    console.error("=== OVERVIEW AGGREGATION ERROR ===", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
