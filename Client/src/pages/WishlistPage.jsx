import { CircleX, ShoppingCart, Heart } from 'lucide-react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist } from '../features/wishlist/wishlistSlice.js'; // Adjust path
import { addToCart } from '../features/cart/cartSlice.js'; // Adjust path

const WishlistPage = () => {
  const dispatch = useDispatch();
  
  const items = useSelector((state) => state.wishlist.items);

  const removeItem = (product) => {
    dispatch(toggleWishlist(product));
  };  

  const handleMoveToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(toggleWishlist(product)); 
  };

  return (
    <div className="bg-white min-h-screen">
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1280px] mx-auto">
        
        {items.length > 0 ? (
          <>
            {/* Wishlist Header */}
            <div className="mb-16">
              <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">Your Wishlist</h1>
              <p className="text-slate-400 font-bold uppercase tracking-[0.25em] text-[10px]">
                {items.length} {items.length === 1 ? 'item' : 'items'} curated for you
              </p>
            </div>

            {/* Wishlist Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {items.map((item) => (
                <div key={item.id} className="group relative bg-white transition-all duration-500">
                  
                  <button 
                    onClick={() => removeItem(item)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-md rounded-full text-slate-300 hover:text-red-500 transition-all shadow-sm hover:scale-110 active:scale-90"
                  >
                    <CircleX size={20} />
                  </button>

                  <div className="aspect-[3/4] overflow-hidden bg-slate-50 rounded-2xl mb-6">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                      src={item.thumbnail} // Matches DummyJSON
                      alt={item.title} 
                    />
                  </div>

                  <div className="text-center px-2">
                    <h3 className="text-sm font-bold text-slate-900 mb-1 uppercase tracking-tight">{item.title}</h3>
                    <p className="text-sm text-slate-400 mb-6 font-medium">${item.price}</p>
                    
                    <button 
                      onClick={() => handleMoveToCart(item)}
                      className="w-full py-4 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2 rounded-xl"
                    >
                      <ShoppingCart size={14} />
                      Move to Cart
                    </button>
                  </div>
                </div>
              ))}
            </section>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8">
              <Heart size={40} className="text-slate-200" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Your wishlist is empty</h2>
            <p className="text-slate-500 max-w-md mb-12 leading-relaxed text-sm">
              Explore our curated collections and save your favorite pieces here to find them easily later.
            </p>
            <a 
              href="/" 
              className="px-12 py-5 bg-slate-900 text-white font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-slate-800 transition-all hover:shadow-2xl active:scale-95 rounded-full"
            >
              Continue Shopping
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default WishlistPage;