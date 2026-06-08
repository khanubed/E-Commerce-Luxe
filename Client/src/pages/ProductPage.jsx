import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Heart,
  Star,
  ShoppingBag,
  Truck,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  RefreshCcw,
  Package,
  Ruler,
  QrCode,
  CheckCircle2,Video
} from "lucide-react";

// Redux Actions
import { setWishlistItems, setCartItems } from "../features/auth/authSlice"; // Imported the action
import { addToCart, removeFromCart } from "../features/cart/cartSlice";

// Components
import RelatedProductsSlider from "../components/shop/RelatedProductsSlider";

// Axios API Services
import {
  getProductBySlug,
  getProducts,
  toggleWishlist,
  toggleCart,
} from "../features/products/productApi"; // Make sure this path targets your Axios functions

const ProductPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  // Redux State
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Local State
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisting, setIsWishlisting] = useState(false);

  // 1. Fetch Main Product
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsLoading(true);
        const data = await getProductBySlug(slug);
        setProduct(data.product);
      } catch (err) {
        toast.error("Product not found");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductData();
  }, [slug]);

  // 2. Fetch Related Products (Fires after product is loaded)
  useEffect(() => {
    if (product) {
      const fetchRelated = async () => {
        try {
          const data = await getProducts({
            category: product.category,
            limit: 8,
          });
          const filtered =
            data.products?.filter((item) => item._id !== product._id) || [];
          setRelatedProducts(filtered);
        } catch (err) {
          console.error("Failed to fetch related products");
        }
      };
      fetchRelated();
    }
  }, [product]);

  // Derived State (Much cleaner than maintaining an extra useState for favorites)
  const isFavorited =
    user?.wishlist?.some((item) =>
      typeof item === "string"
        ? item === product?._id
        : item._id === product?._id,
    ) || false;

  const isCarted =
    user?.cart?.some((item) => {
      const checkId = typeof item.product === "string" ? item.product : item.product?._id || item.product?.id;
      return checkId === product?._id;
    }) || false;

  const [isCarting, setIsCarting] = useState(false);

  // 3. Handle Wishlist Toggle
  const handleWishlist = async () => {
    if (!isAuthenticated) return toast.error("Please login first");

    try {
      setIsWishlisting(true);
      const data = await toggleWishlist(product._id);

      if (data.success) {
        // Pass the updated array directly to the slice action
        dispatch(setWishlistItems(data.wishlist));

        // Use the array from your controller to check the new state
        const isNowFavorite = data.wishlist.some((id) =>
          typeof id === "string" ? id === product._id : id._id === product._id,
        );

        toast.success(
          isNowFavorite ? "Added to wishlist" : "Removed from wishlist",
        );
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update wishlist");
    } finally {
      setIsWishlisting(false);
    }
  };

  // 4. Handle Cart Toggle
  const handleCart = async () => {
    if (!isAuthenticated) return toast.error("Please login first");

    try {
      setIsCarting(true);
      const data = await toggleCart(product._id);

      if (data.success) {
        // Update database-synced cart in authSlice
        dispatch(setCartItems(data.cart));

        // Sync with local cartSlice so cart page / header displays correctly
        const isNowInCart = data.cart.some((item) => {
          const checkId = typeof item.product === "string" ? item.product : item.product?._id || item.product?.id;
          return checkId === product._id;
        });

        if (isNowInCart) {
          // Pass the product details to add to local cart state
          dispatch(addToCart({
            id: product._id,
            _id: product._id,
            title: product.title,
            brand: product.brand,
            price: product.price,
            thumbnail: product.thumbnail,
            discountPercentage: product.discountPercentage,
            availabilityStatus: product.availabilityStatus,
            category: product.category,
          }));
        } else {
          // Pass the product ID to remove from local cart state
          dispatch(removeFromCart(product._id));
        }

        toast.success(
          isNowInCart ? "Added to Cart" : "Removed from Cart"
        );
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update cart");
    } finally {
      setIsCarting(false);
    }
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading Archive...
      </div>
    );

  if (!product)
    return (
      <div className="h-screen flex items-center justify-center">
        Product not found
      </div>
    );

  const originalPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);
  return (
    <main className="pt-20 pb-16 bg-white font-sans antialiased">
      <div className="w-full max-w-[1500px] mx-auto px-4 md:px-12">
        {/* --- 1. BREADCRUMBS --- */}
        <nav className="mb-6 flex items-center space-x-2 text-[11px] font-medium tracking-wide text-slate-400 overflow-x-auto whitespace-nowrap pb-2">
          <Link to="/" className="hover:text-black transition-colors">
            All Categories
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-600 capitalize">
            {product.category.replace("-", " ")}
          </span>
        </nav>

        {/* --- MAIN PRODUCT GRID CONTAINER --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-t border-slate-200">
          {/* --- 2. HERO IMAGE & SPECIFICATIONS AREA --- */}
          <div className="lg:col-span-7 pt-6 lg:pr-12 lg:border-r border-slate-200">
            <div className="relative bg-slate-50 border border-slate-200 overflow-hidden aspect-square w-full flex items-center justify-center">
              {product.discountPercentage > 0 && (
                <div className="absolute top-3 left-3 z-10 bg-blue-600 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                  Save {Math.round(product.discountPercentage)}%
                </div>
              )}
              <img
                src={product.images[selectedImage]}
                className="w-full h-full object-contain p-6 mix-blend-multiply"
                alt={product.title}
              />
            </div>

            {/* HORIZONTAL THUMBNAIL STRIP */}
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-thin">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 flex-shrink-0 border-2 bg-white p-1 transition-all ${
                    selectedImage === index
                      ? "border-slate-900"
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

            {/* PRODUCT SPECIFICATIONS GRID */}
            <div className="mt-8 grid grid-cols-3 border-t border-b border-slate-200 divide-x divide-slate-200">
              <SpecBox
                icon={<Ruler size={16} />}
                title="Dimensions"
                value={`${product.dimensions.width} x ${product.dimensions.height} cm`}
              />
              <SpecBox
                icon={<Package size={16} />}
                title="Item Weight"
                value={`${product.weight}g`}
              />
              <SpecBox
                icon={<ShieldCheck size={16} />}
                title="Warranty"
                value={product.warrantyInformation || "Standard Warranty"}
              />
            </div>

            {/* --- NEW SECTION: PRODUCT VIDEO --- */}
            {product.video && (
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <Video size={18} className="text-slate-800" />
                  <h3 className="text-sm font-bold tracking-wider uppercase text-slate-800">
                    Product Walkthrough
                  </h3>
                </div>
                <div className="relative bg-slate-900 rounded-none overflow-hidden border border-slate-200 aspect-video w-full max-w-2xl shadow-sm">
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

          {/* --- 3. PRODUCT INFORMATION PANEL --- */}
          <div className="lg:col-span-5 pt-8 lg:pl-12 h-fit lg:sticky lg:top-24">
            <div className="mb-3 flex justify-between items-center">
              <span className="text-[12px] font-bold tracking-wider text-blue-600 uppercase">
                {product.brand || "Authentic Product"}
              </span>
              <div className="flex items-center gap-1 bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-xs font-semibold">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
              </div>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              {product.title}
            </h1>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-3xl font-black text-slate-900">
                ${product.price}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-base text-slate-400 line-through font-medium">
                  ${originalPrice}
                </span>
              )}
            </div>

            <div className="border-t border-slate-100 pt-4 mb-6">
              <p className="text-slate-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* CALL TO ACTIONS */}
            <div className="flex flex-col gap-3 mb-8">
              <button
                onClick={handleCart}
                disabled={isCarting}
                className={`w-full py-4 text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  isCarting ? "opacity-50 pointer-events-none" : ""
                } ${
                  isCarted
                    ? "bg-amber-500 text-white hover:bg-amber-600"
                    : "bg-slate-900 text-white hover:bg-blue-600"
                }`}
              >
                <ShoppingBag size={16} />
                {isCarted ? "Remove From Cart" : "Add to Cart"}
              </button>

              <button
                onClick={handleWishlist}
                className="w-full border border-slate-300 bg-white text-slate-800 py-4 text-sm font-bold uppercase tracking-wider hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <Heart
                  size={16}
                  className={
                    isFavorited ? "fill-red-500 text-red-500" : "text-slate-600"
                  }
                />
                {isFavorited ? "Saved to Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            {/* DELIVERY & TRUST SECTIONS */}
            <div className="space-y-0 border-t border-slate-200">
              <Disclosure
                icon={<Truck size={16} className="text-slate-500" />}
                title="Shipping & Delivery"
                content={
                  product.shippingInformation ||
                  "Standard home delivery options available at checkout."
                }
              />
              <Disclosure
                icon={<RefreshCcw size={16} className="text-slate-500" />}
                title="Return Policy"
                content={
                  product.returnPolicy ||
                  "Easy returns within 30 days of delivery."
                }
              />
              <Disclosure
                icon={<QrCode size={16} className="text-slate-500" />}
                title="Product Authenticity"
                content={`SKU Verification Code: ${product.sku || "N/A"}. Verified genuine product.`}
              />
            </div>
          </div>
        </div>

        {/* --- 4. CUSTOMER REVIEWS SECTION --- */}
        <section className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-2">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Customer Reviews
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                What our buyers say about this product
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-600">Average:</span>
              <span className="text-2xl font-extrabold text-slate-900">
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
                          size={12}
                          className={
                            starI < review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-200"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-700 text-xs italic font-medium leading-relaxed">
                    "{review.comment}"
                  </p>
                  <p className="text-[11px] font-semibold text-slate-900 flex items-center gap-1 pt-2 border-t border-slate-200/60">
                    <CheckCircle2 size={12} className="text-emerald-600" />{" "}
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

        {/* --- 5. RELATED PRODUCTS SYSTEM --- */}
        <div className="mt-16">
          <RelatedProductsSlider relatedProducts={relatedProducts} />
        </div>
      </div>
    </main>
  );
};

// --- MOBILE INTERFACE COMPONENT BOXES ---
const SpecBox = ({ icon, title, value }) => (
  <div className="p-4 bg-white flex flex-col items-center text-center justify-center">
    <div className="text-slate-500 mb-1.5">{icon}</div>
    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-0.5">
      {title}
    </p>
    <p className="text-[11px] font-bold text-slate-800 line-clamp-1">{value}</p>
  </div>
);

const Disclosure = ({ icon, title, content }) => (
  <details className="group border-b border-slate-200">
    <summary className="flex justify-between items-center cursor-pointer list-none py-4 outline-none select-none">
      <div className="flex items-center gap-3 text-xs font-bold text-slate-800 tracking-wide">
        {icon} {title}
      </div>
      <ChevronDown
        size={16}
        className="group-open:rotate-180 transition-transform text-slate-400"
      />
    </summary>
    <p className="pb-4 text-xs text-slate-500 leading-relaxed pr-2">
      {content}
    </p>
  </details>
);

export default ProductPage;
