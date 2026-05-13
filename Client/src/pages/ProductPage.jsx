import React, { useState, useEffect } from "react";
import { useParams, Link, useLoaderData } from "react-router-dom";
import {
  ChevronRight, Star, Heart, ShoppingBag, Truck, ShieldCheck, 
  ChevronDown, Ruler, RefreshCcw, Package, QrCode
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import RelatedProductsSlider from "../components/shop/RelatedProductsSlider";

const ProductPage = () => {
  const { product, relatedProducts } = useLoaderData();
  const dispatch = useDispatch();
  
  const isFavorited = useSelector((state) =>
    state.wishlist.items.some((item) => item.id === product.id),
  );
  const isCarted = useSelector((state) =>
    state.cart.items.some((item) => item.id === product.id),
  );

  const [selectedImage, setSelectedImage] = useState(0);

  // Calculate original price for the UI
  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);

  return (
    <main className="pt-24 pb-16 px-4 md:px-8 max-w-[1400px] mx-auto bg-white">
      {/* 1. Breadcrumbs */}
      <nav className="mb-8 flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
        <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
        <ChevronRight size={10} />
        <span className="cursor-pointer">{product.category}</span>
        <ChevronRight size={10} />
        <span className="text-slate-900">{product.title}</span>
      </nav>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 mb-32">
        {/* 2. Left: Image Gallery */}
        <div className="lg:col-span-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Thumbnails */}
            <div className="md:col-span-2 order-2 md:order-1 flex md:flex-col gap-3 overflow-x-auto">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square w-20 md:w-full flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all p-1 bg-slate-50 ${
                    selectedImage === index ? "border-slate-900" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
            {/* Main Display */}
            <div className="md:col-span-10 border-2 border-slate-200 order-1 md:order-2 aspect-square overflow-hidden bg-slate-50 rounded-[1.5rem] relative group">
              {product.discountPercentage > 0 && (
                <div className="absolute top-6 left-6 z-10 bg-red-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase">
                  -{Math.round(product.discountPercentage)}% OFF
                </div>
              )}
              <img
                src={product.images[selectedImage]}
                className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110"
                alt={product.title}
              />
            </div>
          </div>

          {/* 3. Tech Specs Grid (Hidden on Mobile, or shown below) */}
          <div className="hidden md:grid grid-cols-3 gap-4 pt-12">
             <SpecBox icon={<Ruler size={18}/>} title="Dimensions" value={`${product.dimensions.width} x ${product.dimensions.height} cm`} />
             <SpecBox icon={<Package size={18}/>} title="Weight" value={`${product.weight}g`} />
             <SpecBox icon={<ShieldCheck size={18}/>} title="Warranty" value={product.warrantyInformation} />
          </div>
        </div>

        {/* 4. Right: Product Actions (Sticky) */}
        <div className="lg:col-span-6 flex flex-col lg:sticky lg:top-32 h-fit">
          <div className="mb-2">
            <span className="text-[11px] font-black tracking-[0.4em] text-amber-600 uppercase bg-amber-50 px-3 py-1 rounded-full">
              {product.brand}
            </span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-black text-slate-900 mb-2 tracking-tighter leading-[1.1]">
            {product.title}
          </h1>

          <div className="flex items-center gap-2 mb-8">
             <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.round(product.rating) ? "currentColor" : "none"} />
                ))}
             </div>
             <span className="text-xs font-bold text-slate-400">({product.rating} Rating)</span>
          </div>

          <div className="flex items-baseline space-x-4 mb-10">
            <span className="text-4xl font-black text-slate-900">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="text-xl text-slate-300 line-through font-medium">${originalPrice}</span>
            )}
          </div>

          <p className="text-slate-500 leading-relaxed mb-10 text-sm xl:text-base border-l-2 border-slate-100 pl-6">
            {product.description}
          </p>

          <div className="flex flex-col gap-4 mb-12">
            <button
              onClick={() => {isCarted ? dispatch(removeFromCart(product.id)) : dispatch(addToCart(product))}}
              className={`w-full py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] transition-all flex items-center justify-center gap-3 ${
                isCarted ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-slate-900 text-white hover:bg-black shadow-2xl shadow-slate-200"
              }`}
            >
              <ShoppingBag size={18} />
              {isCarted ? "Remove from Cart" : "Add to Shopping Bag"}
            </button>
            
            <button
              onClick={() => dispatch(toggleWishlist(product))}
              className="w-full border-2 border-slate-100 text-slate-900 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
            >
              <Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
              {isFavorited ? "In your Wishlist" : "Save to Favorites"}
            </button>
          </div>

          {/* 5. Utility Accordion */}
          <div className="border-t border-slate-100 pt-2">
            <Disclosure icon={<Truck size={16}/>} title="Delivery Policy" content={product.shippingInformation} />
            <Disclosure icon={<RefreshCcw size={16}/>} title="Returns" content={product.returnPolicy} />
            <Disclosure icon={<QrCode size={16}/>} title="Authenticity" content={`Product SKU: ${product.sku}. Scan QR in-package for verification.`} />
          </div>
        </div>
      </section>

      {/* 6. Detailed Reviews Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-black text-slate-900 mb-12 tracking-tighter">Customer Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {product.reviews.map((review, i) => (
             <div key={i} className="bg-slate-50 border-2 border-slate-200 p-8 rounded-[2rem] space-y-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, starI) => (
                    <Star key={starI} size={12} fill={starI < review.rating ? "currentColor" : "none"} />
                  ))}
                </div>
                <p className="text-slate-900 font-bold text-sm italic">"{review.comment}"</p>
                <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{review.reviewerName}</span>
                   <span className="text-[10px] text-slate-400 uppercase font-bold">{new Date(review.date).toLocaleDateString()}</span>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* 7. Related Products */}
        <RelatedProductsSlider relatedProducts={relatedProducts}/>
    </main>
  );
};

// Reusable Sub-components
const SpecBox = ({ icon, title, value }) => (
  <div className="bg-slate-50 p-6 border-2 border-slate-200 rounded-3xl border border-slate-100">
    <div className="text-slate-400 mb-2">{icon}</div>
    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{title}</p>
    <p className="text-xs font-bold text-slate-900">{value}</p>
  </div>
);

const Disclosure = ({ icon, title, content }) => (
  <details className="group py-6 border-b border-slate-100">
    <summary className="flex justify-between items-center cursor-pointer list-none">
      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
        {icon} {title}
      </div>
      <ChevronDown size={16} className="group-open:rotate-180 transition-transform text-slate-400" />
    </summary>
    <p className="mt-4 text-xs text-slate-500 leading-relaxed pl-7">{content}</p>
  </details>
);

export default ProductPage;