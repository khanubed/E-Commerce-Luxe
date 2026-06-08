import React, { useState } from "react";
import API from "../../api/axios";
import { Search, Star, Loader2, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useGetProductsQuery,
  useToggleDealStatusMutation,
} from "../../services/productApi";
import toast from "react-hot-toast";

export const ProductsManagementPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Track ongoing local visual toggle overrides to keep UI snappy without infinite loops
  const [localToggles, setLocalToggles] = useState({});

  const navigate = useNavigate();

  // Fetching data from RTK Query
  const {
    data: responsePayload,
    isLoading,
    error,
  } = useGetProductsQuery({
    page,
    limit: 10,
    search,
  });

  // 👇 ADD THIS TEMPORARY LOG TO SEE THE EXACT OBJECT STRUCTURE
  console.log("COMPONENT RECEIVED PAYLOAD:", responsePayload);

  // Fallback scanner to extract the product array no matter what key your backend used
  const apiProducts = (() => {
    if (!responsePayload) return [];
    if (Array.isArray(responsePayload)) return responsePayload;
    if (Array.isArray(responsePayload.products))
      return responsePayload.products;
    if (Array.isArray(responsePayload.data)) return responsePayload.data;
    if (responsePayload.data && Array.isArray(responsePayload.data.products))
      return responsePayload.data.products;
    return [];
  })();

  const totalPages = responsePayload?.totalPages || 1;
  const totalProducts = responsePayload?.totalProducts || apiProducts.length;

  // Compute final presentation array by merging cache states with user selections
  const displayProducts = apiProducts.map((product) => {
    const override = localToggles[product._id];
    return override ? { ...product, ...override } : product;
  });

  // Standard Status Toggle Core API Request
  const handleToggleStatus = async (productId, currentStatus) => {
    const loadingToast = toast.loading("Updating status...");

    // Optimistic Update
    const targetStatus =
      currentStatus === "published" ? "inactive" : "published";
    setLocalToggles((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], status: targetStatus },
    }));

    try {
      const response = await API.patch(
        `/api/product/toggle-status/${productId}`,
      );
      if (response.data.success) {
        toast.success(response.data.message, { id: loadingToast });
      }
    } catch (error) {
      console.error("Toggle failed", error);
      // Revert optimistic change on error
      setLocalToggles((prev) => {
        const copy = { ...prev };
        if (copy[productId]) {
          delete copy[productId].status;
          if (Object.keys(copy[productId]).length === 0) delete copy[productId];
        }
        return copy;
      });
      const errorMsg =
        error.response?.data?.message || "Could not update status.";
      toast.error(errorMsg, { id: loadingToast });
    }
  };

  // 1. Make sure this line is sitting at the TOP of your component, next to useGetProductsQuery:
  const [triggerToggleDeal] = useToggleDealStatusMutation();

  // 2. Update your handler function to look like this:
  const toggleDealStatusHandler = async (product) => {
    const loadingToast = toast.loading("Updating promotional priority...");
    const targetDealState = !product.isDealOfTheDay;

    // Optimistic Update
    setLocalToggles((prev) => ({
      ...prev,
      [product._id]: { ...prev[product._id], isDealOfTheDay: targetDealState },
    }));

    try {
      // 🚨 FIXED: Call the trigger function here and unwrap the promise response
      const res = await triggerToggleDeal(product._id).unwrap();

      toast.success(res?.message || "Deal updated successfully!", {
        id: loadingToast,
      });
    } catch (err) {
      console.error("Deal modification action failure:", err);

      // Revert optimistic change on error
      setLocalToggles((prev) => {
        const copy = { ...prev };
        if (copy[product._id]) {
          delete copy[product._id].isDealOfTheDay;
          if (Object.keys(copy[product._id]).length === 0) {
            delete copy[product._id];
          }
        }
        return copy;
      });

      toast.error("Failed to alter promotional deals configuration matrix.", {
        id: loadingToast,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-slate-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 font-bold">
        Failed to load products
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#fafafa] p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
            Product Intelligence
          </h2>
          <p className="text-slate-500 font-bold text-[10px] tracking-widest uppercase mt-1">
            Full-Schema Control Panel
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/products/add")}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all"
        >
          Create New Entry
        </button>
      </div>

      {/* FILTER SEARCH UTILITY */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-lg">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
        <span className="text-sm font-bold text-slate-500">
          {totalProducts} Products
        </span>
      </div>

      {/* INVENTORY DATA GRID TABLE */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Status
              </th>
              <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Deal of Day
              </th>
              <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Product
              </th>
              <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {displayProducts.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center font-bold text-slate-400 text-sm"
                >
                  No active products found matching current database
                  configuration.
                </td>
              </tr>
            ) : (
              displayProducts.map((p) => (
                <tr
                  key={p._id}
                  className={`group transition-all ${p.status !== "published" ? "opacity-50 grayscale-[0.5]" : ""}`}
                >
                  {/* Standard Lifecycle Toggle */}
                  <td className="p-8">
                    <button
                      onClick={() => handleToggleStatus(p._id, p.status)}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-300 flex items-center ${p.status === "published" ? "bg-emerald-500" : "bg-slate-300"}`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 transform ${p.status === "published" ? "translate-x-7" : "translate-x-1"}`}
                      />
                    </button>
                  </td>

                  {/* Deal of the Day Star Status Switcher */}
                  <td className="p-8">
                    <button
                      onClick={() => toggleDealStatusHandler(p)}
                      className={`p-3 rounded-xl border transition-all flex items-center gap-2 text-[11px] font-black uppercase tracking-wider ${
                        p.isDealOfTheDay
                          ? "bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-500/20"
                          : "bg-white border-slate-200 text-slate-400 hover:border-slate-400 hover:text-slate-600"
                      }`}
                    >
                      <Star
                        size={14}
                        fill={p.isDealOfTheDay ? "currentColor" : "none"}
                      />
                      {p.isDealOfTheDay ? "Active Deal" : "Promote"}
                    </button>
                  </td>

                  {/* Product Metadata Thumbnail Info Card */}
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                      <img
                        src={p.thumbnail}
                        className="w-12 h-12 rounded-xl object-cover"
                        alt=""
                      />
                      <div>
                        <p className="text-sm font-black text-slate-900">
                          {p.title}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                          {p.sku}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* System Management Actions Routing */}
                  <td className="p-8 text-right">
                    <button
                      onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                      className="p-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                    >
                      <Settings size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* COMPACT PAGINATION FOOTER CONTROL LAYOUT */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded-xl disabled:opacity-40"
        >
          Prev
        </button>

        {[...Array(5)].map((_, i) => {
          const pageNumber = page - 2 + i;
          if (pageNumber < 1 || pageNumber > totalPages) return null;

          return (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`w-10 h-10 rounded-xl ${
                page === pageNumber
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded-xl disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};
