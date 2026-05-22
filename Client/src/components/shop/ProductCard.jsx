import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../features/wishlist/wishlistSlice.js";
import { addToCart, removeFromCart } from "../../features/cart/cartSlice.js";
import { Heart, Star, ShoppingBag, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProductCard = (product) => {
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

  const originalPrice = (price / (1 - discountPercentage / 100)).toFixed(2);

  return (
    <div
      className="group cursor-pointer bg-white"
      onClick={() => navigate(`/product/${id}`)}
    >
      {/* Image Container: Sharp Edges, Minimal Border */}
      <div className="relative aspect-[5/4] overflow-hidden bg-slate-50 border border-slate-100 group-hover:border-slate-300 transition-all duration-700">
        
        {/* Discount Badge: High Contrast Rectangular */}
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

        {/* Wishlist Button: Minimalist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleWishlist(product));
          }}
          className={`absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center transition-all duration-500 ${
            isFavorited ? "text-amber-600" : "text-slate-300 hover:text-slate-900"
          }`}
        >
          <Heart size={18} fill={isFavorited ? "currentColor" : "none"} strokeWidth={1.5} />
        </button>

        {/* Low Stock Warning: Subtle Technical Text */}
        {availabilityStatus === "Low Stock" && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
             <span className="text-[8px] font-black text-amber-600 uppercase tracking-[0.3em] bg-white/90 px-3 py-1 border border-amber-600/20">
               Limited Edition
             </span>
          </div>
        )}

        {/* Add to Cart: Full Width Reveal */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            isCarted 
              ? dispatch(removeFromCart(product.id)) 
              : dispatch(addToCart(product));
          }}
          className={`absolute bottom-0 left-0 right-0 py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 transform border-t border-slate-900/10 ${
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

      {/* Product Details: Editorial Spacing */}
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
            <span className="text-[10px] font-bold text-slate-900 tracking-tighter">{rating}</span>
          </div>
        </div>

        <div className="flex items-baseline gap-3">
          <p className="text-base font-medium text-slate-950 tracking-tighter">${price}</p>
          {discountPercentage > 0 && (
            <p className="text-[11px] text-slate-400 line-through tracking-tighter">${originalPrice}</p>
          )}
        </div>
      </div>
    </div>
  );
};