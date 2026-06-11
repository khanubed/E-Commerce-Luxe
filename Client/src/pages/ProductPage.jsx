import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Heart,
  Star,
  ShoppingBag,
  Truck,
  ShieldCheck,
  ChevronDown,
  RefreshCcw,
  Package,
  Ruler,
  QrCode,
  CheckCircle2,
  Video,
} from "lucide-react";

import { setWishlistItems, setCartItems } from "../features/auth/authSlice";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";

import RelatedProductsSlider from "../features/products/components/RelatedProductsSlider";

import {
  useGetProductBySlugQuery,
  useGetProductsQuery,
  useToggleCartMutation,
  useToggleWishlistMutation,
} from "../features/products/productApi";

const ProductPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [selectedImage, setSelectedImage] = useState(0);

  const {
    data: mainProductData,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useGetProductBySlugQuery(slug);

  const product = mainProductData?.product || mainProductData;

  const { data: relatedData } = useGetProductsQuery(
    { category: product?.category, limit: 8 },
    { skip: !product?.category },
  );

  const relatedProducts =
    relatedData?.products?.filter((item) => item._id !== product?._id) || [];

  const [toggleWishlist, { isLoading: isWishlisting }] =
    useToggleWishlistMutation();
  const [toggleCart, { isLoading: isCarting }] = useToggleCartMutation();

  const isFavorited =
    user?.wishlist?.some((item) =>
      typeof item === "string"
        ? item === product?._id
        : item._id === product?._id,
    ) || false;

  const isCarted =
    user?.cart?.some((item) => {
      const checkId =
        typeof item.product === "string"
          ? item.product
          : item.product?._id || item.product?.id;
      return checkId === product?._id;
    }) || false;

  const handleWishlist = async () => {
    if (!isAuthenticated) return toast.error("Please login first");
    if (!product?._id) return;

    try {
      const response = await toggleWishlist(product._id).unwrap();

      if (response) {
        const freshWishlist = response.wishlist || response;
        dispatch(setWishlistItems(freshWishlist));

        const isNowFavorite = freshWishlist.some((id) =>
          typeof id === "string" ? id === product._id : id._id === product._id,
        );

        toast.success(
          isNowFavorite ? "Added to wishlist" : "Removed from wishlist",
        );
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update wishlist");
    }
  };

  const handleCart = async () => {
    if (!isAuthenticated) return toast.error("Please login first");
    if (!product?._id) return;

    try {
      const response = await toggleCart(product._id).unwrap();

      if (response) {
        const freshCart = response.cart || response;
        dispatch(setCartItems(freshCart));

        const isNowInCart = freshCart.some((item) => {
          const checkId =
            typeof item.product === "string"
              ? item.product
              : item.product?._id || item.product?.id;
          return checkId === product._id;
        });

        if (isNowInCart) {
          dispatch(
            addToCart({
              id: product._id,
              _id: product._id,
              title: product.title,
              brand: product.brand,
              price: product.price,
              thumbnail: product.thumbnail,
              discountPercentage: product.discountPercentage,
              availabilityStatus: product.availabilityStatus,
              category: product.category,
              slug: product.slug,
            }),
          );
        } else {
          dispatch(removeFromCart(product._id));
        }

        toast.success(isNowInCart ? "Added to Cart" : "Removed from Cart");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update cart");
    }
  };

  if (isProductLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-xs font-black uppercase tracking-[0.4em] text-slate-900 bg-white">
        Loading Archive...
      </div>
    );
  }

  if (isProductError || !product) {
    return (
      <div className="h-screen flex items-center justify-center text-sm font-bold text-slate-500 bg-white">
        Product not found
      </div>
    );
  }

  const originalPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <main className="pt-20 pb-16 bg-white font-sans antialiased">
      <div className="w-full max-w-[1500px] mx-auto px-4 md:px-12">
        {/* Breadcrumbs Navigation Wrapper */}
        <nav className="mb-6 flex items-center space-x-2 text-[11px] font-medium tracking-wide text-slate-400 overflow-x-auto whitespace-nowrap pb-2">
          <Link to="/shop" className="hover:text-black transition-colors">
            All Categories
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-600 capitalize">
            {product.category?.replace("-", " ")}
          </span>
        </nav>

        {/* Workspace Display Blueprint Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-t border-slate-200">
          {/* Hero Presentation Canvas Area */}
          <div className="lg:col-span-7 pt-6 lg:pr-12 lg:border-r border-slate-200">
            <div className="relative bg-slate-50 border border-slate-200 overflow-hidden aspect-square w-full flex items-center justify-center">
              {product.discountPercentage > 0 && (
                <div className="absolute top-0 left-0 z-10 bg-amber-600 text-white px-3 py-2 text-[9px] font-black uppercase tracking-[0.2em]">
                  Save {Math.round(product.discountPercentage)}%
                </div>
              )}
              <img
                src={product.images?.[selectedImage] || product.thumbnail}
                className="w-full h-full object-contain p-6 mix-blend-multiply"
                alt={product.title}
              />
            </div>

            {/* Carousel Thumbnail Node Strip */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-thin">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 flex-shrink-0 border bg-white p-1 transition-all ${
                      selectedImage === index
                        ? "border-slate-900 border-2"
                        : "border-slate-200"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Product Structural Dimension Spec Metric Blocks */}
            <div className="mt-8 grid grid-cols-3 border-t border-b border-slate-200 divide-x divide-slate-200">
              <SpecBox
                icon={<Ruler size={16} />}
                title="Dimensions"
                value={
                  product.dimensions
                    ? `${product.dimensions.width} x ${product.dimensions.height} cm`
                    : "N/A"
                }
              />
              <SpecBox
                icon={<Package size={16} />}
                title="Item Weight"
                value={product.weight ? `${product.weight}g` : "N/A"}
              />
              <SpecBox
                icon={<ShieldCheck size={16} />}
                title="Warranty"
                value={product.warrantyInformation || "Standard Clearance"}
              />
            </div>

            {/* Video Embedded Interface Node Panel */}
            {product.video && (
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <Video size={18} className="text-slate-800" />
                  <h3 className="text-[11px] font-black tracking-[0.3em] uppercase text-slate-800">
                    Product Walkthrough
                  </h3>
                </div>
                <div className="relative bg-slate-900 overflow-hidden border border-slate-200 aspect-video w-full max-w-2xl shadow-sm">
                  <video
                    src={product.video}
                    controls
                    preload="metadata"
                    className="w-full h-full object-cover"
                    poster={product.thumbnail}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
          </div>

          {/* Checkout Operational Actions Sidebar Console Layout */}
          <div className="lg:col-span-5 pt-8 lg:pl-12 h-fit lg:sticky lg:top-24">
            <div className="mb-3 flex justify-between items-center">
              <span className="text-[10px] font-black tracking-[0.3em] text-amber-600 uppercase">
                {product.brand || product.category}
              </span>
              <div className="flex items-center gap-1.5 bg-slate-900 text-white px-2 py-1 text-[10px] font-bold">
                <Star size={10} className="fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight leading-none">
              {product.title}
            </h1>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-3xl font-medium tracking-tighter text-slate-900">
                ${product.price}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-base text-slate-400 line-through tracking-tighter">
                  ${originalPrice}
                </span>
              )}
            </div>

            <div className="border-t border-slate-100 pt-4 mb-6">
              <p className="text-slate-600 text-xs leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Action Command Controls Terminal Grid */}
            <div className="flex flex-col gap-3 mb-8">
              <button
                onClick={handleCart}
                disabled={isCarting}
                className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 ${
                  isCarted
                    ? "bg-amber-600 text-white hover:bg-amber-700"
                    : "bg-slate-950 text-white hover:bg-slate-900"
                }`}
              >
                <ShoppingBag size={12} />
                {isCarted ? "Remove From Archive" : "Purchase Piece"}
              </button>

              <button
                onClick={handleWishlist}
                disabled={isWishlisting}
                className="w-full border border-slate-200 bg-white text-slate-900 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <Heart
                  size={12}
                  className={
                    isFavorited
                      ? "fill-amber-600 text-amber-600"
                      : "text-slate-900"
                  }
                />
                {isFavorited ? "Saved to Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            {/* Security Clearance Dropdowns */}
            <div className="space-y-0 border-t border-slate-200">
              <Disclosure
                icon={<Truck size={14} className="text-slate-900" />}
                title="Shipping & Delivery"
                content={
                  product.shippingInformation ||
                  "Standard home delivery options available at checkout."
                }
              />
              <Disclosure
                icon={<RefreshCcw size={14} className="text-slate-900" />}
                title="Return Policy"
                content={
                  product.returnPolicy ||
                  "Easy returns within 30 days of delivery."
                }
              />
              <Disclosure
                icon={<QrCode size={14} className="text-slate-900" />}
                title="Product Authenticity"
                content={`SKU Verification Code: ${product.sku || "N/A"}. Verified genuine piece asset.`}
              />
            </div>
          </div>
        </div>

        {/* Verified User Evaluation Thread Section */}
        <section className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-2">
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900">
                Customer Reviews
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                What our buyers say about this product
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                Average:
              </span>
              <span className="text-xl font-black text-slate-900 tracking-tighter">
                {product.rating} / 5.0
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, i) => (
                <div
                  key={i}
                  className="bg-slate-50 border border-slate-200 p-5 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, starI) => (
                        <Star
                          key={starI}
                          size={10}
                          className={
                            starI < review.rating
                              ? "fill-amber-500 text-amber-500"
                              : "text-slate-200"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-medium tracking-tight text-slate-400">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-700 text-xs italic font-medium leading-relaxed">
                    "{review.comment}"
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5 pt-2 border-t border-slate-200/60">
                    <CheckCircle2 size={12} className="text-amber-600" />
                    {review.reviewerName}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 col-span-full">
                No reviews available yet for this item.
              </p>
            )}
          </div>
        </section>

        {/* Content Recommendation Slide Hub */}
        <div className="mt-16">
          <RelatedProductsSlider relatedProducts={relatedProducts} />
        </div>
      </div>
    </main>
  );
};

// --- PRIVATE UTILITY NODE COMPONENTS ---
const SpecBox = ({ icon, title, value }) => (
  <div className="p-4 bg-white flex flex-col items-center text-center justify-center">
    <div className="text-slate-500 mb-1.5">{icon}</div>
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">
      {title}
    </p>
    <p className="text-[11px] font-bold text-slate-900 line-clamp-1 uppercase tracking-tight">
      {value}
    </p>
  </div>
);

const Disclosure = ({ icon, title, content }) => (
  <details className="group border-b border-slate-200">
    <summary className="flex justify-between items-center cursor-pointer list-none py-4 outline-none select-none">
      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
        {icon} {title}
      </div>
      <ChevronDown
        size={14}
        className="group-open:rotate-180 transition-transform text-slate-400"
      />
    </summary>
    <p className="pb-4 text-xs text-slate-500 leading-relaxed pr-2">
      {content}
    </p>
  </details>
);

export default ProductPage;
