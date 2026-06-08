import React, { useState, useEffect } from "react";
import { data, useSearchParams } from "react-router-dom";
import {
  Search,
  Filter,
  ChevronRight,
  ChevronLeft,
  UserPlus,
  Award,
  Clock,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { useGetAdminCustomersQuery } from "../../services/adminCustomerApi";

const CustomerManagementPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL parameters synchronization (Direct source of truth for the controller)
  const currentTab = searchParams.get("segment") || "all";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const urlSearch = searchParams.get("search") || "";

  // Local text input state for fluid typing
  const [searchInput, setSearchInput] = useState(urlSearch);

  // RTK Query fetches directly from synchronized URL search states
  const {
    data: responseData,
    isLoading: customersLoading,
    isFetching,
  } = useGetAdminCustomersQuery({
    segment: currentTab,
    page: currentPage,
    search: urlSearch,
  });

  useEffect(() => {
    console.log(responseData)
  }, [responseData])
  

  const customers = responseData?.customers || [];
  const pagination = responseData?.pagination || {
    totalCustomers: 0,
    totalPages: 1,
  };
  const stats = responseData?.stats || { total: 0, newSignups: 0, vips: 0 };

  const segments = [
    { id: "all", label: "All Customers" },
    { id: "vip", label: "VIP Segments" },
    { id: "new", label: "New Signups" },
    { id: "inactive", label: "Inactive" },
  ];

  // Debounce input to URL search parameters
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      if (searchInput.trim()) {
        newParams.set("search", searchInput.trim());
      } else {
        newParams.delete("search");
      }
      newParams.set("page", "1"); // Reset to page 1 on active search changes
      setSearchParams(newParams);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  const updateParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    if (key === "segment") {
      newParams.set("page", "1");
    }
    setSearchParams(newParams);
  };

  return (
    <main className="flex-1 py-8 max-w-[1400px] mx-auto w-full animate-in fade-in duration-700 px-4 md:px-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">
            Customer Management
          </h2>
          <p className="text-slate-500 font-medium">
            Manage and segment your global customer base with precision.
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-80 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors"
              size={18}
            />
            <input
              className="w-full pl-12 pr-12 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-slate-900/5 focus:border-slate-990 outline-none transition-all text-sm font-medium"
              placeholder="Search by name or email..."
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {isFetching && (
              <Loader2
                className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-slate-400"
                size={16}
              />
            )}
          </div>
          <button className="bg-white border border-slate-200 px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-slate-50 transition-colors text-xs font-bold uppercase tracking-widest">
            <Filter size={16} /> Advanced Filters
          </button>
        </div>
      </header>

      {/* Segmentation Chips */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
        {segments.map((tab) => (
          <button
            key={tab.id}
            onClick={() => updateParams("segment", tab.id)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all ${
              currentTab === tab.id
                ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                : "bg-white text-slate-500 border border-slate-100 hover:border-slate-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Customer Table Container */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-12 min-h-[400px] relative">
        {customersLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 backdrop-blur-xs">
            <Loader2 className="animate-spin text-slate-900" size={32} />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                  Customer Details
                </th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] text-center">
                  Status
                </th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] text-right">
                  Orders
                </th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] text-right">
                  Total Spend
                </th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {!customersLoading && customers.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-16 text-slate-400 font-medium text-sm"
                  >
                    No customers found tracking this segment or search criteria.
                  </td>
                </tr>
              ) : (
                customers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs shadow-sm ring-1 ring-slate-100 uppercase">
                          {user.name.slice(0, 2)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">
                            {user.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-medium">
                            {user.email} • {user.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase border bg-slate-50 text-slate-600 border-slate-200">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right text-sm font-bold text-slate-700">
                      {user.ordersCount}
                    </td>
                    <td className="px-8 py-6 text-right text-sm font-bold text-slate-900">
                      $
                      {user.totalSpend.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-slate-400 hover:text-slate-900 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 ml-auto transition-all group-hover:translate-x-[-4px]">
                        View History <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <footer className="px-8 py-6 bg-slate-50/30 border-t border-slate-100 flex justify-between items-center">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Showing {customers.length} of {pagination.totalCustomers} customers
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => updateParams("page", currentPage - 1)}
              disabled={currentPage === 1 || customersLoading}
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 hover:bg-white transition-all disabled:opacity-20"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from(
              { length: pagination.totalPages },
              (_, index) => index + 1,
            ).map((p) => (
              <button
                key={p}
                onClick={() => updateParams("page", p)}
                disabled={customersLoading}
                className={`w-10 h-10 rounded-xl font-bold text-[11px] transition-all ${currentPage === p ? "bg-slate-900 text-white shadow-lg shadow-slate-200" : "border border-slate-200 hover:bg-white text-slate-500"}`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => updateParams("page", currentPage + 1)}
              disabled={
                currentPage === pagination.totalPages || customersLoading
              }
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 hover:bg-white transition-all disabled:opacity-20"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </footer>
      </div>

      {/* Insights KPIs Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InsightCard
          title="New Customers"
          value={stats.newSignups.toString()}
          trend="+12% vs last month"
          icon={<UserPlus size={20} />}
          variant="blue"
        />
        <InsightCard
          title="VIP Segments"
          value={stats.vips.toString()}
          trend="High Value"
          icon={<Award size={20} />}
          variant="amber"
        />
        <InsightCard
          title="Total Base Account"
          value={stats.total.toString()}
          icon={<Clock size={20} />}
          variant="slate"
        />
      </section>
    </main>
  );
};

const InsightCard = ({ title, value, trend, icon, variant }) => {
  const styles = {
    blue: "text-blue-600 bg-blue-50",
    amber: "text-amber-600 bg-amber-50",
    slate: "text-slate-600 bg-slate-50",
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div
          className={`p-3 rounded-2xl ${styles[variant]} transition-transform group-hover:scale-110`}
        >
          {icon}
        </div>
        {trend && (
          <span
            className={`text-[9px] font-bold px-2 py-1 rounded uppercase tracking-widest ${styles[variant]}`}
          >
            {trend}
          </span>
        )}
      </div>
      <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
        {title}
      </h4>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-slate-900 tracking-tight">
          {value}
        </p>
        <ArrowUpRight size={14} className="text-slate-300" />
      </div>
    </div>
  );
};

export default CustomerManagementPage;
