import React, { useState } from "react";
import { NavLink, Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Heart, Handbag, User, Menu, X, Search } from "lucide-react";
import { CategoryFilter } from "./shop/CategoryFilter";

const navLinkStyles = ({ isActive }) =>
  `text-sm font-medium uppercase tracking-wide transition-colors ${
    isActive
      ? "text-slate-900 border-b-2 border-slate-900 pb-1"
      : "text-slate-500 hover:text-slate-900"
  }`;

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) return;

    navigate(`/shop?search=${search}`);
    setIsOpen(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const items = useSelector((state) => state.cart.items);
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <nav className="h-16 max-w-7xl mx-auto px-4 py-6 md:px-8 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-slate-900"
          >
            LuxeStore
          </Link>

          <div className="hidden md:flex items-center gap-8"></div>
          {/* SEARCH */}
          <div className="relative hidden md:flex w-full max-w-md items-center">
            <input
              type="text"
              placeholder="Search by name, brand or category..."
              className="w-full pl-4 pr-14 py-2 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-slate-900/5 transition-all text-sm outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              onClick={handleSearch}
              className="absolute right-2 p-2 rounded-xl hover:bg-slate-200 transition"
            >
              <Search size={18} />
            </button>
          </div>
          <div className="hidden md:flex items-center gap-9">
            <NavLink to="/" className={navLinkStyles}>
              Home
            </NavLink>

            <NavLink to="/shop" className={navLinkStyles}>
              Shop
            </NavLink>

            <NavLink to="/contact" className={navLinkStyles}>
              Contact
            </NavLink>
            {isAuth ? (
              <div className="flex gap-4">
                <NavLink to="/wishlist" className="hover:opacity-70 transition">
                  <Heart size={27} />
                </NavLink>

                <NavLink
                  to="/cart"
                  className="relative hover:opacity-70 transition"
                >
                  <Handbag size={27} />

                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center">
                    {items.length}
                  </span>
                </NavLink>

                <NavLink to="/account" className="hover:opacity-70 transition">
                  <User size={27} />
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/auth/signup"
                  className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:scale-[1.02] transition"
                >
                  Sign Up
                </Link>

                <Link
                  to="/auth/login"
                  className="border border-slate-300 px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-100 transition"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          <button onClick={() => setIsOpen(true)} className="md:hidden">
            <Menu size={26} />
          </button>
        </nav>
      </header>

      <aside
        className={`fixed top-0 right-0 overflow-y-auto h-screen w-[280px] bg-white z-50 shadow-2xl transform transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="font-bold text-lg">Menu</h2>

          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col p-5 gap-6">
          <div className="relative md:hidden flex w-full max-w-md items-center">
            <input
              type="text"
              placeholder="Search by name, brand or category..."
              className="w-full pl-4 pr-14 py-2 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-slate-900/5 transition-all text-sm outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              onClick={handleSearch}
              className="absolute right-2 p-2 rounded-xl hover:bg-slate-200 transition"
            >
              <Search size={18} />
            </button>
          </div>
          <NavLink
            to="/"
            className={navLinkStyles}
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={navLinkStyles}
            onClick={() => setIsOpen(false)}
          >
            Shop
          </NavLink>

          <NavLink
            to="/contact"
            className={navLinkStyles}
            onClick={() => setIsOpen(false)}
          >
            Contact
          </NavLink>

          <div className="border-t pt-6 flex flex-col gap-5">
            {isAuth ? (
              <>
                <NavLink
                  to="/wishlist"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3"
                >
                  <Heart size={20} />
                  Wishlist
                </NavLink>

                <NavLink
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3"
                >
                  <Handbag size={20} />
                  Cart
                </NavLink>

                <NavLink
                  to="/account"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3"
                >
                  <User size={20} />
                  Account
                </NavLink>
              </>
            ) : (
              <>
                <Link
                  to="/auth/signup"
                  onClick={() => setIsOpen(false)}
                  className="bg-slate-900 text-white py-3 rounded-full text-center font-semibold"
                >
                  Sign Up
                </Link>

                <Link
                  to="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="border border-slate-300 py-3 rounded-full text-center font-semibold"
                >
                  Login
                </Link>
              </>
            )}
          </div>
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={(category) => updateParams({ category })}
          />
        </div>
      </aside>
    </>
  );
};

export default Header;
