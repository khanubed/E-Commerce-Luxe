import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../features/wishlist/wishlistSlice.js";
import { addToCart, removeFromCart } from "../../features/cart/cartSlice.js";
import { Heart, Star, ShoppingBag } from "lucide-react"; // Added Star and ShoppingBag
import { useNavigate } from "react-router-dom";

export const ProductCard = (product) => {
  // 1. Destructure more data from the product object
  const { 
    title, 
    brand, 
    price, 
    thumbnail, 
    id, 
    rating, 
    discountPercentage, 
    availabilityStatus,
    category 
  } = product;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isFavorited = useSelector((state) =>
    state.wishlist.items.some((item) => item.id === id),
  );
  const isCarted = useSelector((state) =>
    state.cart.items.some((item) => item.id === id),
  );

  // Calculate original price if there's a discount
  const originalPrice = (price / (1 - discountPercentage / 100)).toFixed(2);

  return (
    <div
      className="group cursor-pointer bg-slate-200 p-4 rounded-[1rem] border border-slate-300 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
      onClick={() => navigate(`/product/${id}`)}
    >
      <div className="relative aspect-5/4 overflow-hidden bg-slate-100 rounded-[0.75rem] mb-5">
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-500 text-white text-[10px] font-black uppercase tracking-tighter rounded-full">
            -{Math.round(discountPercentage)}%
          </div>
        )}

        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Wishlist Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleWishlist(product));
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
              isFavorited
                ? "bg-slate-900 text-white scale-110"
                : "bg-white/80 backdrop-blur-md text-slate-900 hover:bg-slate-900 hover:text-white"
            }`}
          >
            <Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Status Overlay for Low Stock */}
        {availabilityStatus === "Low Stock" && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none">
             <span className="bg-amber-500/90 backdrop-blur-sm text-white text-[9px] font-bold px-4 py-1 uppercase tracking-[0.2em] rounded-full">
               Limited Stock
             </span>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            isCarted
              ? dispatch(removeFromCart(product.id))
              : dispatch(addToCart(product));
          }}
          className={`absolute bottom-4 left-4 right-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 rounded-xl flex items-center justify-center gap-2 ${
            isCarted 
            ? "bg-red-50 text-red-600 opacity-100 translate-y-0" 
            : "bg-slate-900/90 backdrop-blur-md text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
          }`}
        >
          <ShoppingBag size={14} />
          {isCarted ? "Remove" : "Add to Cart"}
        </button>
      </div>

      <div className="px-1 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
              {brand || category}
            </p>
            <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{title}</h4>
          </div>
          {/* Star Rating */}
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
            <Star size={10} className="fill-amber-400 text-amber-400" />
            <span className="text-[10px] font-bold text-slate-600">{rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <p className="text-lg font-black text-slate-900">${price}</p>
          {discountPercentage > 0 && (
            <p className="text-xs text-slate-400 line-through">${originalPrice}</p>
          )}
        </div>
      </div>
    </div>
  );
};