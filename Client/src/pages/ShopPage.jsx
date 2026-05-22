import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { ProductCard } from "../components/shop/ProductCard";
import { Pagination } from "../components/shop/Pagination";
import { fetchAllProducts } from "../features/products/productsSlice.js";
import { CategoryFilter } from "../components/shop/CategoryFilter.jsx";
import { HeroStrip } from "../components/shop/HeroStrip.jsx";

const ITEMS_PER_PAGE = 12;

const ShopPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const searchQuery = searchParams.get("search") || "";
  const sortBy = searchParams.get("sort") || "Newest";
  const activeCategory = searchParams.get("category") || "all";
  const currentPage = Number(searchParams.get("page")) || 1;

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
    if (updates.search !== undefined || updates.sort !== undefined || updates.category !== undefined) {
      params.page = 1;
    }
    setSearchParams(params);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (activeCategory !== "all") result = result.filter((p) => p.category === activeCategory);
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
    }
    
    switch (sortBy) {
      case "Price: Low to High": result.sort((a, b) => a.price - b.price); break;
      case "Price: High to Low": result.sort((a, b) => b.price - a.price); break;
      case "Top Rated": result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return result;
  }, [products, searchQuery, sortBy, activeCategory]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-900 animate-pulse">
          Retrieving Archive...
        </span>
      </div>
    );
  }

  return (
    <main className="bg-white ">
      {/* 1. Subtle Utility Header */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 pt-24 pb-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-slate-950 pb-6 gap-4">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900">
              Collection<span className="text-amber-600">.</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
              Showing {filteredProducts.length} Results
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div className="group relative">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1">Sort Logic</span>
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

      {/* 2. Main Layout Grid */}
      <div className="max-w-[1800px] mx-auto px-6  md:px-30 flex flex-col md:flex-row gap-12 pb-24">
        
        {/* SIDEBAR: Sticky & Minimal */}
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

        {/* PRODUCT GRID: Clean White Space */}
        <section className="flex-grow">
          {paginatedProducts.length > 0 ? (
            <div className="space-y-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-16">
                {paginatedProducts.map((product) => (
                  <div key={product.id} className="border-b border-slate-50 pb-8 hover:border-slate-200 transition-colors">
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
                    window.scrollTo({ top: 0, behavior: "smooth" });
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