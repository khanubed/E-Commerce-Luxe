import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, Star, ShoppingBag, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Redux Actions (Everything goes through Auth now)
import { setWishlistItems, setCartItems } from "../../features/auth/authSlice.js";
import { toggleWishlist, toggleCart } from "../../features/products/productApi.js";

export const ProductCard = (product) => {
  const {
    title,
    brand,
    price,
    thumbnail,
    id,
    _id, 
    rating,
    discountPercentage,
    availabilityStatus,
    category,
  } = product;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productId = _id || id;

  // --- Redux State Subscriptions ---
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Safely check if item is in the cart array inside your user profile
  const isCarted =
    user?.cart?.some((item) => {
      // Handles cases where backend sends populated objects or raw ID strings
      const checkId = typeof item.product === "string" ? item.product : item.product?._id || item.product?.id || item;
      return checkId === productId;
    }) || false;

  // Safely check if item is in the wishlist array inside your user profile
  const isFavorited =
    user?.wishlist?.some((item) => {
      const checkId = typeof item === "string" ? item : item._id || item.id;
      return checkId === productId;
    }) || false;

  // --- Local Loading States ---
  const [isWishlisting, setIsWishlisting] = useState(false);
  const [isCarting, setIsCarting] = useState(false);

  const originalPrice = (price / (1 - discountPercentage / 100)).toFixed(2);

  // --- Wishlist Interaction ---
  const handleWishlistClick = async (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      return toast.error("Please login first");
    }

    try {
      setIsWishlisting(true);
      const data = await toggleWishlist(productId);

      if (data.success) {
        dispatch(setWishlistItems(data.wishlist));

        const isNowFavorite = data.wishlist.some((item) => {
          const checkId = typeof item === "string" ? item : item._id || item.id;
          return checkId === productId;
        });

        toast.success(
          isNowFavorite ? "Added to wishlist" : "Removed from wishlist"
        );
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update wishlist");
    } finally {
      setIsWishlisting(false);
    }
  };

  // --- Cart Interaction ---
  const handleCartClick = async (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      return toast.error("Please login first");
    }

    try {
      setIsCarting(true);
      const data = await toggleCart(productId);

      if (data.success) {
        // 1. Sync fresh database array into authSlice user profile
        dispatch(setCartItems(data.cart));

        // 2. Derive state directly from the fresh backend response data array
        const isNowInCart = data.cart.some((item) => {
          const checkId = typeof item.product === "string" ? item.product : item.product?._id || item.product?.id || item;
          return checkId === productId;
        });

        toast.success(
          isNowInCart ? "Added to Archive" : "Removed from Archive"
        );
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update cart");
    } finally {
      setIsCarting(false);
    }
  };

  return (
    <div
      className="group cursor-pointer bg-white"
      onClick={() => navigate(`/product/${product.slug}`)}
    >
      {/* Image Container */}
      <div className="relative aspect-[5/4] overflow-hidden bg-slate-50 border border-slate-100 group-hover:border-slate-300 transition-all duration-700">
        {discountPercentage > 0 && (
          <div className="absolute top-0 left-0 z-10 px-3 py-2 bg-amber-600 text-white text-[9px] font-black uppercase tracking-[0.2em]">
            -{Math.round(discountPercentage)}%
          </div>
        )}

        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-contain group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          disabled={isWishlisting}
          className={`absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center transition-all duration-500 ${
            isWishlisting ? "opacity-50 pointer-events-none" : ""
          } ${
            isFavorited ? "text-amber-600" : "text-slate-300 hover:text-slate-900"
          }`}
        >
          <Heart
            size={18}
            fill={isFavorited ? "currentColor" : "none"}
            strokeWidth={1.5}
          />
        </button>

        {/* Low Stock Warning */}
        {availabilityStatus === "Low Stock" && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            <span className="text-[8px] font-black text-amber-600 uppercase tracking-[0.3em] bg-white/90 px-3 py-1 border border-amber-600/20">
              Limited Edition
            </span>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleCartClick}
          disabled={isCarting}
          className={`absolute bottom-0 left-0 right-0 py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 transform border-t border-slate-900/10 ${
            isCarting ? "opacity-50 pointer-events-none" : ""
          } ${
            isCarted
              ? "bg-amber-600 text-white translate-y-0"
              : "bg-slate-950 text-white translate-y-full group-hover:translate-y-0"
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            {isCarted ? <ShoppingBag size={12} /> : <Plus size={12} />}
            {isCarted ? "In Archive" : "Purchase"}
          </div>
        </button>
      </div>

      {/* Product Details */}
      <div className="mt-6 space-y-3 px-1">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
              {brand || category}
            </p>
            <h4 className="text-[13px] font-black uppercase tracking-tight text-slate-900 leading-tight group-hover:text-amber-600 transition-colors duration-300">
              {title}
            </h4>
          </div>

          <div className="flex items-center gap-1.5 opacity-60">
            <Star size={10} className="fill-slate-900 text-slate-900" />
            <span className="text-[10px] font-bold text-slate-900 tracking-tighter">
              {rating}
            </span>
          </div>
        </div>

        <div className="flex items-baseline gap-3">
          <p className="text-base font-medium text-slate-950 tracking-tighter">
            ${price}
          </p>
          {discountPercentage > 0 && (
            <p className="text-[11px] text-slate-400 line-through tracking-tighter">
              ${originalPrice}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};