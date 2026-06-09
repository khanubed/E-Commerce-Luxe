import React from "react";
import {
  TrendingUp,
  Users,
  DollarSign,
  Package,
  ArrowUpRight,
  ShoppingBag,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useGetOverviewMetricsQuery } from "../../services/adminOverviewApi";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useGetOverviewMetricsQuery } from "../../services/adminOverviewApi";

const OverviewPage = () => {
  const navigate = useNavigate()

  const {
    data: serverData,
    isLoading,
    isError,
    error,
  } = useGetOverviewMetricsQuery();

  useEffect(() => {
    console.log(serverData);
    console.log(error);
    // console.log(isError)
    // console.log(isLoading)
  }, [serverData, error]);

  if (isLoading) {
    return (
      <div className="w-full min-h-[500px] flex items-center justify-center">
        <Loader2 className="animate-spin text-slate-900" size={40} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded-xl font-medium">
        Failed to pull admin performance metrics:{" "}
        {error?.data?.message || "Server Error"}
      </div>
    );
  }

  // Fallbacks mapped straight from server data formats
  const dashboardStats = [
    {
      label: "Total Revenue",
      value: serverData?.stats?.totalRevenue || "$0.00",
      icon: <DollarSign className="text-emerald-600" />,
      // trend: "+12.5%",
    },
    {
      label: "Total Orders",
      value: serverData?.stats?.totalOrders || "0",
      icon: <ShoppingBag className="text-blue-600" />,
      // trend: "+8.2%",
    },
    {
      label: "New Customers",
      value: serverData?.stats?.newCustomers || "0",
      icon: <Users className="text-purple-600" />,
      trend: "+15.1%",
    },
    {
      label: "Active Products",
      value: serverData?.stats?.activeProducts || "0",
      icon: <Package className="text-orange-600" />,
      // trend: "0%",
    },
  ];

  const recentOrders = serverData?.recentOrders || [];
  const inventoryAlerts = serverData?.inventoryAlerts || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-50 rounded-lg">{stat.icon}</div>
              {/* <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                {stat.trend}
              </span> */}
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
              {stat.label}
            </p>
            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Recent Orders</h3>
            <button onClick={()=> navigate("/admin/orders")} className="text-xs font-bold text-slate-400 hover:text-slate-900 flex items-center gap-1 uppercase tracking-widest">
              View All <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] uppercase tracking-widest text-slate-400 border-b border-slate-100">
                  <th className="px-6 py-4 font-bold">Order ID</th>
                  <th className="px-6 py-4 font-bold">Customer</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Amount</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-slate-400">
                      No orders logged yet.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">
                        #{order.id.slice(-8).toUpperCase()}
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {order.customerName}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${
                            order.status === "Delivered"
                              ? "bg-emerald-50 text-emerald-600"
                              : order.status === "Pending"
                                ? "bg-amber-50 text-amber-600"
                                : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">
                        {order.amount}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Inventory Info */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-bold text-slate-900 mb-6">Inventory Alerts</h3>
          <div className="space-y-6">
            {inventoryAlerts.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">
                All product counts healthy.
              </p>
            ) : (
              inventoryAlerts.map((prod) => (
                <div key={prod.id} className="flex gap-4 items-center">
                  {/* 🚨 FIXED: Added optional chaining (?.) and fallback string */}
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-xs text-slate-400 uppercase">
                    {(prod?.name || "Product").slice(0, 2)}
                  </div>

                  <div className="flex-grow">
                    {/* 🚨 FIXED: Added optional chaining fallback */}
                    <p className="text-xs font-bold text-slate-900">
                      {prod?.name || "Unnamed Product"}
                    </p>
                    <p className="text-[10px] text-red-500 font-bold uppercase">
                      Low Stock: {prod?.stockLeft ?? 0} left
                    </p>
                  </div>
                  <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-900">
                    <ChevronRight size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
          <button onClick={()=> navigate("/admin/products")} className="w-full mt-8 py-3 bg-slate-50 text-slate-900 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-colors">
            Restock Inventory
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
