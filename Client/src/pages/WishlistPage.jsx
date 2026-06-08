import { CircleX, ShoppingCart, Heart, MoveRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// Redux Actions
import { setWishlistItems } from "../features/auth/authSlice.js";
import { addToCart } from "../features/cart/cartSlice.js"; // Keep if you use Option B (local cart slice)

// Axios API Services
import {
  toggleWishlist,
  getProductsListByIds
} from "../features/products/productApi.js";

const WishlistPage = () => {
  const dispatch = useDispatch();

  // 1. Grab auth data from Redux
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const wishlistData = user?.wishlist || [];

  // 2. Component UI states
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // 3. Sync or Fetch fully populated items when wishlist state shifts
useEffect(() => {
  if (!isAuthenticated || wishlistData.length === 0) {
    setItems([]);
    return;
  }

  const isPopulated = typeof wishlistData[0] === 'object';

  if (isPopulated) {
    setItems(wishlistData);
  } else {
    const fetchPopulatedWishlist = async () => {
      try {
        setIsLoading(true);
        
        // Pass the raw string array directly to your new specialized endpoint
        const data = await getProductsListByIds(wishlistData); 

        console.log(data)
        
        setItems(data.products || []);
      } catch (err) {
        console.error("Failed to load wishlist items details", err);
        toast.error("Error loading curated gallery layout");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPopulatedWishlist();
  }
}, [wishlistData, isAuthenticated]);

  // 4. Remove Item Handler via Axios
  const removeItem = async (product) => {
    const productId = product._id || product.id;
    try {
      setIsActionLoading(true);
      const data = await toggleWishlist(productId);

      if (data.success) {
        dispatch(setWishlistItems(data.wishlist));
        toast.success("Removed from wishlist");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove item");
    } finally {
      setIsActionLoading(false);
    }
  };

  // 5. Move to Cart Handler
  const handleMoveToCart = async (product) => {
    const productId = product._id || product.id;
    try {
      setIsActionLoading(true);

      // Add to cart local state/slice
      dispatch(addToCart(product));

      // Hit backend API to remove from wishlist database
      const data = await toggleWishlist(productId);

      if (data.success) {
        dispatch(setWishlistItems(data.wishlist));
        toast.success("Moved to Archive Cart");
      }
    } catch (err) {
      toast.error("Failed to sync structural changes");
    } finally {
      setIsActionLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-black uppercase tracking-wider text-slate-900 mb-4">
          Authentication Required
        </h2>
        <p className="text-slate-400 text-xs tracking-widest uppercase mb-6">
          Please log in to review your curated archives.
        </p>
        <Link
          to="/login"
          className="px-8 py-4 bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest"
        >
          Login
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-slate-900 text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">
        Assembling Curated Archive...
      </div>
    );
  }

  return (
    <div className="bg-white">
      <main
        className={`pt-12 pb-8 px-6 md:px-12 max-w-[1400px] mx-auto transition-opacity duration-300 ${isActionLoading ? "opacity-60 pointer-events-none" : "opacity-100"}`}
      >
        {items.length > 0 ? (
          <>
            {/* Header: Architectural & Bold */}
            <div className="mb-5 border-b border-slate-100 pb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 mb-4 block">
                Saved Gallery
              </span>
              <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                Your{" "}
                <span className="italic font-serif font-light lowercase text-slate-400">
                  Wishlist
                </span>
              </h1>
              <p className="mt-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                {items.length} {items.length === 1 ? "Selection" : "Selections"}{" "}
                Curated
              </p>
            </div>

            {/* Grid: Sharp Gallery Style */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
              {items.map((item) => {
                const itemId = item._id || item.id;
                return (
                  <div
                    key={itemId}
                    className="group border-2 border-slate-700/30 p-4 relative bg-white"
                  >
                    {/* Remove Button: Minimalist Overlay */}
                    <button
                      onClick={() => removeItem(item)}
                      className="absolute top-0 right-0 z-10 p-4 text-slate-300 hover:text-slate-900 transition-colors"
                      aria-label="Remove item"
                    >
                      <CircleX size={18} strokeWidth={1.5} />
                    </button>

                    {/* Image: Sharp 3:4 Frame */}
                    <div className="aspect-[5/4] overflow-hidden bg-slate-50 mb-8 border border-slate-400 group-hover:border-slate-200 transition-colors duration-500">
                      <img
                        className="w-full h-full object-contain grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                        src={item.thumbnail}
                        alt={item.title}
                      />
                    </div>

                    {/* Product Details: Left Aligned, Clean Typography */}
                    <div className="flex flex-col items-start">
                      <h3 className="text-[11px] font-black text-slate-900 mb-1 uppercase tracking-[0.15em] leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 mb-8 font-bold tracking-widest">
                        ${item.price}
                      </p>

                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="w-full py-5 bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-amber-600 transition-all duration-500 flex items-center justify-center gap-3"
                      >
                        <ShoppingCart size={14} strokeWidth={2.5} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </section>
          </>
        ) : (
          /* Empty State: Editorial Centerpiece */
          <div className="flex flex-col items-center justify-center py-40 text-center">
            <div className="relative mb-12">
              <Heart size={80} strokeWidth={0.5} className="text-slate-100" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1 h-20 bg-amber-600/20 rotate-45"></div>
              </div>
            </div>

            <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900 mb-6 leading-none">
              The gallery is <br />
              <span className="italic font-serif font-light lowercase text-slate-400">
                currently empty
              </span>
            </h2>

            <p className="text-slate-400 max-w-sm mb-12 text-[11px] font-bold uppercase tracking-widest leading-relaxed">
              Your curated favorites will appear here. Begin your exploration of
              our latest collections.
            </p>

            <Link
              to="/shop"
              className="group flex items-center gap-4 px-12 py-6 bg-slate-950 text-white font-black uppercase tracking-[0.3em] text-[10px] hover:bg-amber-600 transition-all duration-500"
            >
              Back to Collection
              <MoveRight
                className="group-hover:translate-x-2 transition-transform"
                size={16}
              />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default WishlistPage;
