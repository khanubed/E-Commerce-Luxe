import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  Package,
  Clock,
  Truck,
  DollarSign,
  TrendingUp,
  Loader2,
  X,
  MapPin,
  Calendar,
  ShoppingBag,
} from "lucide-react";

import {
  useGetAdminOrdersQuery,
  useGetAdminOrderStatsQuery,
  useUpdateOrderStatusMutation,
} from "../../services/adminOrderApi";
import {
  setSearchQuery,
  setSortBy,
} from "../../features/admin/adminOrderSlice";
import toast from "react-hot-toast";

const OrderManagementPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get("status") || "all";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const { searchQuery, sortBy } = useSelector((state) => state.adminOrder);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Local state to manage the currently open order details panel
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { data: statsData, isLoading: statsLoading } =
    useGetAdminOrderStatsQuery();
  const {
    data: ordersData,
    isLoading: ordersLoading,
    isFetching,
  } = useGetAdminOrdersQuery({
    status: currentFilter,
    page: currentPage,
    search: searchQuery,
    sort: sortBy,
  });

  const [updateStatus] = useUpdateOrderStatusMutation();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(setSearchQuery(localSearch));
      updateParams("page", "1");
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [localSearch, dispatch]);

  const updateParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const activeToast = toast.loading("Updating order status...");
    try {
      await updateStatus({ id: orderId, status: newStatus }).unwrap();
      toast.success(`Order updated to ${newStatus}`, { id: activeToast });

      // Sync state if the active panel is updating dynamically
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update status", {
        id: activeToast,
      });
    }
  };

  const stats = [
    {
      label: "Total Orders",
      value: statsData?.total || "0",
      trend: "Overall volume",
      icon: <Package size={20} />,
      color: "text-slate-900",
    },
    {
      label: "Pending",
      value: statsData?.pending || "0",
      trend: "Requires Attention",
      icon: <Clock size={20} />,
      color: "text-amber-600",
    },
    {
      label: "In Transit",
      value: statsData?.inTransit || "0",
      trend: "Normal Flow",
      icon: <Truck size={20} />,
      color: "text-blue-600",
    },
    {
      label: "Total Revenue",
      value: statsData?.revenue
        ? `$${statsData.revenue.toLocaleString()}`
        : "$0",
      trend: "Gross Earnings",
      icon: <DollarSign size={20} />,
      color: "text-emerald-600",
    },
  ];

  return (
    <main className="flex-1 flex flex-col min-w-0 bg-slate-50/50 relative">
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-40 flex justify-between items-center w-full px-8 py-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-md group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors"
              size={18}
            />
            <input
              className="w-full bg-slate-100 border-none rounded-full py-2.5 pl-10 pr-4 text-sm outline-none text-slate-800"
              placeholder="Search orders..."
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
            {isFetching && (
              <Loader2
                className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-slate-400"
                size={16}
              />
            )}
          </div>
        </div>
      </header>

      <div className="p-8 max-w-[1400px] mx-auto w-full space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
              Order Management
            </h2>
            <p className="text-slate-500 font-medium mt-1">
              Click any Order ID to view explicit item and delivery details.
            </p>
          </div>
        </div>

        {/* Telemetry Display Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 bg-slate-50 rounded-xl ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                {stat.label}
              </p>
              {statsLoading ? (
                <div className="h-7 w-20 bg-slate-100 animate-pulse rounded mt-1" />
              ) : (
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {stat.value}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Core Table Framework */}
        <section className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs">
          <div className="p-6 border-b border-slate-50 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto">
              {[
                "all",
                "pending",
                "confirmed",
                "shipped",
                "delivered",
                "cancelled",
              ].map((status) => (
                <button
                  key={status}
                  onClick={() => updateParams("status", status)}
                  className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                    currentFilter === status
                      ? "bg-slate-900 text-white"
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto relative">
            {ordersLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
                <Loader2 className="animate-spin text-slate-900" size={32} />
              </div>
            )}

            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 uppercase font-bold text-[9px] tracking-[0.2em]">
                  <th className="px-8 py-4">Order ID</th>
                  <th className="px-8 py-4">Customer</th>
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4">Amount</th>
                  <th className="px-8 py-4">Status Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {ordersData?.orders?.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-slate-50/50 transition-all"
                  >
                    <td className="px-8 py-5">
                      {/* Trigger Button opening detail view */}
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="font-bold text-blue-600 hover:underline text-sm tracking-wide text-left block"
                      >
                        {order.orderDisplayId ||
                          `#${order._id.slice(-6).toUpperCase()}`}
                      </button>
                    </td>
                    <td className="px-8 py-5">
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {order.customerName}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {order.customerEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-xs text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-slate-900">
                      ${order.totalAmount?.toFixed(2)}
                    </td>
                    <td className="px-8 py-5">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border bg-white outline-none cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/20">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Showing {ordersData?.orders?.length || 0} orders
            </p>
            <div className="flex gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => updateParams("page", String(currentPage - 1))}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 disabled:opacity-40"
                disabled={currentPage >= (ordersData?.totalPages || 1)}
                onClick={() => updateParams("page", String(currentPage + 1))}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Dimmed Background Overlay */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 transition-opacity"
          onClick={() => setSelectedOrder(null)}
        />
      )}

      {/* 📦 SIDE-OUT ORDER INSPECTION DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
          selectedOrder ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedOrder && (
          <>
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedOrder.orderDisplayId ||
                    `#${selectedOrder._id.slice(-6).toUpperCase()}`}
                </h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                  <Calendar size={12} />{" "}
                  {new Date(selectedOrder.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-slate-200/60 rounded-xl text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
              {/* 🛍️ Items & Quantity Sub-Layout */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  <ShoppingBag size={14} /> Product Line Items
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 divide-y divide-slate-100">
                  {selectedOrder.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-3 first:pt-0 last:pb-0"
                    >
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {item.product?.name ||
                            `Product ID: ...${item.product?.toString().slice(-6)}`}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          ${item.price?.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-slate-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}

                  {/* Financial Summary Calculation breakdown */}
                  <div className="flex justify-between items-center pt-3 mt-3 border-t-2 border-dashed border-slate-200">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Grand Total
                    </p>
                    <p className="text-lg font-black text-slate-900">
                      ${selectedOrder.totalAmount?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* 📍 Customer Shipping Address Layout block */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  <MapPin size={14} /> Shipping Destination
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 space-y-2 text-sm shadow-2xs">
                  <div className="border-b border-slate-50 pb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">
                      Recipient
                    </span>
                    <p className="font-bold text-slate-900 mt-0.5">
                      {selectedOrder.shippingAddress?.fullName ||
                        selectedOrder.customerName}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">
                      Address Fields
                    </span>
                    {selectedOrder.shippingAddress ? (
                      <p className="text-slate-600 text-xs leading-relaxed mt-1 font-medium">
                        {selectedOrder.shippingAddress.street},<br />
                        {selectedOrder.shippingAddress.city},{" "}
                        {selectedOrder.shippingAddress.state} -{" "}
                        {selectedOrder.shippingAddress.postalCode},<br />
                        {selectedOrder.shippingAddress.country}
                      </p>
                    ) : (
                      <p className="text-slate-400 text-xs italic mt-1">
                        No explicit shipping metrics provided.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Drawer Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col gap-1.5">
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 block px-1">
                Modify Order Status
              </span>
              <select
                value={selectedOrder.status}
                onChange={(e) =>
                  handleStatusChange(selectedOrder._id, e.target.value)
                }
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 outline-none shadow-2xs"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default OrderManagementPage;
