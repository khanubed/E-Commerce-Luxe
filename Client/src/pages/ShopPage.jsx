
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
// import { getProducts } from "../api/product"; // Import the Axios service

import { ProductCard } from "../components/shop/ProductCard";
import { Pagination } from "../components/shop/Pagination";
import { CategoryFilter } from "../components/shop/CategoryFilter";
import { HeroStrip } from "../components/shop/HeroStrip";
import { getProducts } from "../features/products/productApi";

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // --- New Manual State ---
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchQuery = searchParams.get("search") || "";
  const sortBy = searchParams.get("sort") || "Newest";
  const activeCategory = searchParams.get("category") || "all";
  const currentPage = Number(searchParams.get("page")) || 1;

  // --- Fetch Logic using Axios ---
  useEffect(() => {
    const fetchShopData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const result = await getProducts({
          page: currentPage,
          limit: 24,
          search: searchQuery,
          category: activeCategory === "all" ? "" : activeCategory,
          sort: sortBy,
        });

        setData(result);
      } catch (err) {
        console.error("Axios Fetch Error:", err);
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchShopData();
  }, [currentPage, searchQuery, activeCategory, sortBy]); // Re-run when URL params change

  const updateParams = (updates) => {
    const params = {
      search: searchQuery,
      sort: sortBy,
      category: activeCategory,
      page: currentPage,
      ...updates,
    };

    if (!params.search) delete params.search;
    if (params.sort === "Newest") delete params.sort;
    if (params.category === "all") delete params.category;

    if (
      updates.search !== undefined ||
      updates.sort !== undefined ||
      updates.category !== undefined
    ) {
      params.page = 1;
    }

    setSearchParams(params);
  };

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;
  const totalProducts = data?.totalProducts || 200 ;

  // --- Rendering (Keep your existing UI logic) ---
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-900 animate-pulse">
          Retrieving Archive...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-500 mb-2">Failed to load products</h2>
          <p className="text-gray-500">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 underline text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  return (
    <main className="bg-white">
      {/* Header */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 pt-24 pb-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-slate-950 pb-6 gap-4">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900">
              Collection<span className="text-amber-600">.</span>
            </h1>

            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
              Showing {totalProducts} Results
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div className="group relative">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1">
                Sort Logic
              </span>

              <select
                value={sortBy}
                onChange={(e) => updateParams({ sort: e.target.value })}
                className="bg-transparent border-none p-0 text-[12px] font-black uppercase tracking-widest text-slate-900 focus:ring-0 cursor-pointer outline-none"
              >
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <HeroStrip />

      {/* Main Layout */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-30 flex flex-col md:flex-row gap-12 pb-24">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-32 space-y-16">
            <div className="space-y-4 max-md:hidden">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-900 border-l-4 border-amber-600 pl-4">
                Categories
              </h3>

              <CategoryFilter
                activeCategory={activeCategory}
                onCategoryChange={(category) => updateParams({ category })}
              />
            </div>

            {(activeCategory !== "all" || searchQuery) && (
              <button
                onClick={() => setSearchParams({})}
                className="w-full py-4 border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-500"
              >
                Reset Filters
              </button>
            )}
          </div>
        </aside>

        {/* Products */}
        <section className="flex-grow">
          {products.length > 0 ? (
            <div className="space-y-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-16">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="border-b border-slate-50 pb-8 hover:border-slate-200 transition-colors"
                  >
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>

              <div className="pt-12 border-t border-slate-100">
                <Pagination
                  current={currentPage}
                  total={totalPages}
                  onPageChange={(page) => {
                    updateParams({ page: page.toString() });

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="h-[60vh] flex flex-col items-center justify-center border border-dashed border-slate-200">
              <p className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-300">
                No matching pieces found
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ShopPage;
