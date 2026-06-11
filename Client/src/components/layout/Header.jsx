import React, { useState } from "react";
import { NavLink, Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Heart,
  Handbag,
  User,
  Menu,
  X,
  Search,
  MoveRight,
} from "lucide-react";

import {CategoryFilter} from '../../features/products/components/CategoryFilter'

const navLinkStyles = ({ isActive }) =>
  `text-[14px] font-black uppercase tracking-[0.3em] transition-all duration-300 ${
    isActive
      ? "text-slate-900 border-b border-slate-900 pb-1"
      : "text-slate-500 hover:text-slate-900"
  }`;

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const items = useSelector((state) => state.cart.items);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
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
    navigate(`/shop`);
    setSearchParams(params);
    setIsOpen(false);
  };

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/shop?search=${search}`);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-100">
        <nav className="h-20 max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-black uppercase tracking-[0.2em] text-slate-900 group"
          >
            Luxe
            <span className="text-amber-600 group-hover:text-slate-900 transition-colors">
              Store
            </span>
          </Link>

          <div className="relative hidden md:flex w-full max-w-xs items-center group">
            <input
              type="text"
              placeholder="SEARCH COLLECTION..."
              className="w-full pl-0 pr-10 py-2 bg-transparent border-b border-slate-200 focus:border-slate-900 transition-all text-[10px] font-bold tracking-widest uppercase outline-none placeholder:text-slate-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSearch}
              className="absolute right-0 p-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Search size={16} strokeWidth={3} />
            </button>
          </div>

          <div className="flex justify-center items-center gap-6">
            <div className="hidden lg:flex items-center gap-10">
              <NavLink to="/" className={navLinkStyles}>
                Home
              </NavLink>
              <NavLink to="/shop" className={navLinkStyles}>
                Shop
              </NavLink>
              <NavLink to="/contact" className={navLinkStyles}>
                Contact
              </NavLink>
            </div>

            <div className="flex items-center gap-6">
              {isAuth ? (
                <div className="hidden lg:flex items-center gap-6 border-l border-slate-100 pl-6">
                  <NavLink
                    to="/wishlist"
                    className="text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <Heart size={25} strokeWidth={2} />
                  </NavLink>

                  <NavLink
                    to="/cart"
                    className="relative text-slate-600 text-[14px] hover:text-slate-900 transition-colors"
                  >
                    <Handbag size={25} strokeWidth={2} />
                    {items.length > 0 && (
                      <span className="absolute -top-2 -right-2 w-4 h-4 bg-amber-600 text-white text-[8px] font-black flex items-center justify-center rounded-none italic">
                        {items.length}
                      </span>
                    )}
                  </NavLink>

                  <NavLink
                    to="/account"
                    className="text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <User size={25} strokeWidth={2} />
                  </NavLink>
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-4">
                  <Link
                    to="/auth/login"
                    className="text-[14px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/signup"
                    className="bg-slate-900 text-white px-6 py-2.5 rounded-none text-[14px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all"
                  >
                    Join
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden text-slate-900"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-screen w-full sm:w-[350px] bg-slate-950 text-white z-50 shadow-2xl transform overflow-y-auto transition-transform duration-500 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-8 border-b border-white/10">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500">
            Navigation
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:rotate-90 transition-transform"
          >
            <X size={24} strokeWidth={1} />
          </button>
        </div>

        <div className="flex flex-col p-10 gap-8">
          <div className="flex flex-col gap-6">
            <MobileLink to="/" label="Home" onClick={() => setIsOpen(false)} />
            <MobileLink
              to="/shop"
              label="Shop"
              onClick={() => setIsOpen(false)}
            />
            <MobileLink
              to="/contact"
              label="Contact"
              onClick={() => setIsOpen(false)}
            />
            {isAuth && (
              <>
                <MobileLink
                  to="/wishlist"
                  label="Wishlist"
                  onClick={() => setIsOpen(false)}
                />
                <MobileLink
                  to="/cart"
                  label="Cart"
                  onClick={() => setIsOpen(false)}
                />
                <MobileLink
                  to="/account"
                  label="Account"
                  onClick={() => setIsOpen(false)}
                />
              </>
            )}
          </div>

          {/* 🚨 Added Auth Options for Unauthenticated Mobile Users */}
          {!isAuth && (
            <div className="mt-6 space-y-4 pt-8 border-t border-white/5">
              <Link
                to="/auth/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between w-full group py-2"
              >
                <span className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-white transition-colors">
                  Sign In
                </span>
              </Link>
              <Link
                to="/auth/signup"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between w-full group py-2"
              >
                <span className="text-2xl font-black uppercase tracking-tighter italic group-hover:text-amber-500 transition-colors">
                  Join Now
                </span>
                <MoveRight className="group-hover:translate-x-2 transition-transform text-amber-500" />
              </Link>
            </div>
          )}

          <div className="mt-4 pt-6 border-t border-white/5">
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={(category) => updateParams({ category })}
            /> 
          </div>
        </div>
      </aside>
    </>
  );
};

// Sub-component for Mobile Links
const MobileLink = ({ to, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className="text-4xl font-black uppercase tracking-tighter text-slate-500 hover:text-white hover:italic transition-all"
  >
    {label}
  </NavLink>
);

export default Header;