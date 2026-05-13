import React, { useMemo, useEffect } from "react";
import { Search } from "lucide-react";
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

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  const [searchParams, setSearchParams] = useSearchParams();

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

    // remove empty/default values
    if (!params.search) delete params.search;
    if (params.sort === "Newest") delete params.sort;
    if (params.category === "all") delete params.category;

    // reset page on filter change
    if (
      updates.search !== undefined ||
      updates.sort !== undefined ||
      updates.category !== undefined
    ) {
      params.page = 1;
    }

    setSearchParams(params);
  };

  // FILTER + SORT
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();

      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query),
      );
    }

    // SORT
    switch (sortBy) {
      case "Price: Low to High":
        result.sort((a, b) => a.price - b.price);
        break;

      case "Price: High to Low":
        result.sort((a, b) => b.price - a.price);
        break;

      case "Top Rated":
        result.sort((a, b) => b.rating - a.rating);
        break;

      default:
        break;
    }

    return result;
  }, [products, searchQuery, sortBy, activeCategory]);

  // PAGINATION
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center text-slate-400 animate-pulse uppercase tracking-[0.3em]">
        Loading Collection...
      </div>
    );
  }

  return (
    <main className="max-w-[1440px] mx-auto px-6 md:px-12 py-24 pt-22">
      {/* SEARCH + SORT */}
      <div className="flex flex-col lg:flex-row justify-between border-b border-slate-100 pb-2 items-center gap-6 mb-4">


        {/* SORT */}
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">
            Sort By
          </span>

          <select
            value={sortBy}
            onChange={(e) => updateParams({ sort: e.target.value })}
            className="bg-transparent border-none text-sm font-bold text-slate-900 focus:ring-0 cursor-pointer"
          >
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Top Rated</option>
          </select>
        </div>
      </div>
      <HeroStrip/>
      <div className="flex flex-col md:flex-row  gap-16">
        {/* SIDEBAR */}
        <aside className="w-full max-md:hidden md:w-64 flex-shrink-0">
          <div className="sticky top-32 pl-20 space-y-12">
            {(activeCategory !== "all" || searchQuery) && (
              <button
                onClick={() => setSearchParams({})}
                className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors mb-5"
              >
                Clear All Filters
              </button>
            )}
            
            <CategoryFilter
              
              activeCategory={activeCategory}
              onCategoryChange={(category) => updateParams({ category })}
            />
          </div>
        </aside>

        {/* PRODUCTS */}
        <div className="flex-grow">
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-y-10 gap-y-5 md:pr-20">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>

              {/* PAGINATION */}
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
            </>
          ) : (
            <div className="py-40 text-center uppercase tracking-widest text-slate-400">
              No items found in this collection.
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
