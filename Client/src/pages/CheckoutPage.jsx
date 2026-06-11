import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Plus,
  CreditCard,
  CheckCircle2,
  Package,
  Truck,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { setAddresses, setCartItems } from "../features/auth/authSlice.js";
import toast from "react-hot-toast";
import { useGetProductsListByIdsQuery } from "../features/products/productApi.js";
import {
  createOrderApi,
  saveAddressApi,
  verifyPaymentApi,
} from "../features/orders/orderApi.js";
import { clearCart } from "../features/cart/cartSlice.js";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. Get user data directly from auth state
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const addresses = user?.addresses || [];

  // 2. Simple local states for the checkout data
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);

  // Set default to "card" to match your state options mapping
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const [addressForm, setAddressForm] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    type: "Home",
  });

  // A. Safely isolate raw cart items array
  const rawCart = user?.cart?.items || user?.cart || [];

  // B. Extract IDs array for the hook tracking
  const productIds = rawCart
    .map((item) => item?.product?._id || item?.product || item?._id)
    .filter(Boolean);

  // C. ⚡ THE FIX: RTK Query must be placed here at the component top level
  const { data, isLoading: isFetchLoading } = useGetProductsListByIdsQuery(
    productIds,
    {
      skip: productIds.length === 0, // Don't run query if cart is empty
    },
  );

  // D. Process and merge data when either user cart or RTK query updates
  useEffect(() => {
    if (rawCart.length === 0) {
      setCheckoutItems([]);
      setTotalAmount(0);
      setIsLoading(false);
      return;
    }

    if (data) {
      try {
        setIsLoading(true);
        const dbProducts = data.products || data || [];

        const mergedItems = rawCart
          .map((cartItem) => {
            const targetId =
              cartItem?.product?._id || cartItem?.product || cartItem?._id;
            const productInfo = dbProducts.find(
              (p) => p._id === targetId || p.id === targetId,
            );
            if (!productInfo) return null;

            return {
              ...productInfo,
              quantity: cartItem.quantity || 1,
            };
          })
          .filter(Boolean);

        setCheckoutItems(mergedItems);

        const total = mergedItems.reduce(
          (acc, item) => acc + (item.price || 0) * item.quantity,
          0,
        );
        setTotalAmount(total);
      } catch (error) {
        console.error("Checkout UI Synchronizer Failed:", error);
        toast.error("Error organizing order summary items");
      } finally {
        setIsLoading(false);
      }
    } else {
      // Sync loading state with RTK Query's fetching state
      setIsLoading(isFetchLoading);
    }
  }, [user, data, isFetchLoading]);

  // 3. Keep address synchronization working seamlessly
  useEffect(() => {
    if (addresses?.length > 0 && !selectedAddressId) {
      setSelectedAddressId(addresses[0]._id || addresses[0].id);
    }
  }, [addresses, selectedAddressId]);

  // --- HELPERS ---
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNewAddress = async (e) => {
    e.preventDefault();
    try {
      setIsSavingAddress(true); // Fixed: mapped to correct dynamic state flag
      const data = await saveAddressApi(addressForm);

      if (data.success) {
        dispatch(setAddresses(data.addresses));

        const newlyCreatedAddress = data.addresses[data.addresses.length - 1];
        setSelectedAddressId(newlyCreatedAddress._id || newlyCreatedAddress.id);

        setIsAddingAddress(false);
        toast.success("Delivery destinations synchronized securely");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          "Failed to persist destination credentials",
      );
    } finally {
      setIsSavingAddress(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error("Please select a delivery destination");
      return;
    }

    const activeAddressObject = addresses.find(
      (a) => (a._id || a.id) === selectedAddressId,
    );

    setIsProcessing(true);

    try {
      // Build parameters payload to match your exact backend controller schemas rules
      const orderPayload = {
        items: checkoutItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: totalAmount,
        shippingAddress: activeAddressObject,
        // Map frontend strings down to match database enum specifications ("cod" or "online")
        paymentMethod: paymentMethod === "cod" ? "cod" : "online",
      };

      // 1. Initialize checkout processing request
      const data = await createOrderApi(orderPayload);

      // ==========================================
      // CASE A: CASH ON DELIVERY RESOLUTION
      // ==========================================
      if (data.success && data.isCOD) {
        dispatch(clearCart());
        dispatch(setCartItems(data.cart || []));
        setCheckoutItems([]);
        setTotalAmount(0);

        toast.success("Order Processed Successfully!");
        navigate(`/order/success/${data.orderId}`, {
          state: {
            orderId: data.orderId,
            items: checkoutItems,
            totalAmount: totalAmount,
            paymentMethod: "Cash on Delivery",
            date: new Date().toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
          },
        });
        return;
      }

      // ==========================================
      // CASE B: ONLINE TRANSITIONS VIA RAZORPAY MODAL
      // ==========================================
      if (data.success && !data.isCOD) {
        const isScriptLoaded = await loadRazorpayScript();
        if (!isScriptLoaded) {
          toast.error("Payment Gateway component failed to mount.");
          setIsProcessing(false);
          return;
        }

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.razorpayOrder.amount,
          currency: data.razorpayOrder.currency,
          name: "SECURE CHECKOUT",
          description: "Transaction Settlement Pipeline",
          order_id: data.razorpayOrder.id,
          handler: async function (response) {
            try {
              const verificationBody = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                localOrderId: data.localOrderId,
              };
              
              const verifyRes = await verifyPaymentApi(verificationBody);
              if (verifyRes.success) {
                dispatch(clearCart());
                dispatch(setCartItems([]));
                setCheckoutItems([]);
                setTotalAmount(0);

                toast.success("Online Payment Secured!");
                navigate(`/order/success/${data.localOrderId}`, {
                  state: {
                    orderId: data.localOrderId,
                    items: checkoutItems,
                    totalAmount: totalAmount,
                    paymentMethod: "Credit / Debit Card",
                    date: new Date().toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }),
                  },
                });
              }
            } catch (vErr) {
              console.error(vErr);
              toast.error(
                "Signature verification authentication mismatch error.",
              );
            }
          },
          prefill: {
            name: user?.fullName || "",
            email: user?.email || "",
          },
          theme: { color: "#0F172A" },
          modal: {
            ondismiss: function () {
              toast.error("Payment authorization cancelled.");
              setIsProcessing(false);
            },
          },
        };

        const paymentOverlay = new window.Razorpay(options);
        paymentOverlay.open();
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          "Failed to finalize transactions framework parameters",
      );
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-30 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* --- HEADER --- */}
        <div className="mb-12 border-b-[6px] border-slate-900 pb-8">
          <h1 className="text-3xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
            Secure Checkout<span className="text-blue-600">.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* --- LEFT: SHIPPING & PAYMENT --- */}
          <div className="lg:col-span-7 space-y-16">
            <section>
              <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 mb-8">
                <span className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center text-sm">
                  01
                </span>
                Shipping Destination
              </h2>

              {!isAddingAddress ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => {
                    const currentId = addr._id || addr.id;
                    return (
                      <div
                        key={currentId}
                        onClick={() => setSelectedAddressId(currentId)}
                        className={`p-6 border-2 transition-all cursor-pointer relative ${
                          selectedAddressId === currentId
                            ? "border-slate-900 bg-slate-50"
                            : "border-slate-100"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-[9px] font-black uppercase border border-slate-900 px-2 py-1">
                            {addr.type}
                          </span>
                          {selectedAddressId === currentId && (
                            <CheckCircle2 size={18} className="text-blue-600" />
                          )}
                        </div>
                        <p className="font-black text-[14px] uppercase tracking-tight">
                          {addr.fullName}
                        </p>
                        <p className="text-[12px] text-slate-500 font-bold mt-1">
                          {addr.street}, {addr.city}, {addr.state},{" "}
                          {addr.postalCode}, {addr.country}
                        </p>
                      </div>
                    );
                  })}
                  <button
                    onClick={() => setIsAddingAddress(true)}
                    className="p-6 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 hover:border-slate-900 text-slate-400"
                  >
                    <Plus size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      New Address
                    </span>
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleAddNewAddress}
                  className="space-y-4 bg-slate-50 p-8 border-2 border-slate-900"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      name="fullName"
                      required
                      placeholder="FULL NAME"
                      className="p-4 border-2 border-slate-200 text-xs font-black uppercase outline-none focus:border-slate-900 bg-white"
                      onChange={handleInputChange}
                    />
                    <select
                      name="type"
                      className="p-4 border-2 border-slate-200 text-xs font-black uppercase outline-none focus:border-slate-900 bg-white"
                      onChange={handleInputChange}
                    >
                      <option value="Home">Home</option>
                      <option value="Office">Office</option>
                    </select>
                  </div>

                  <input
                    name="street"
                    required
                    placeholder="STREET ADDRESS"
                    className="w-full p-4 border-2 border-slate-200 text-xs font-black uppercase outline-none focus:border-slate-900 bg-white"
                    onChange={handleInputChange}
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <input
                      name="city"
                      required
                      placeholder="CITY"
                      className="p-4 border-2 border-slate-200 text-xs font-black uppercase outline-none focus:border-slate-900 bg-white"
                      onChange={handleInputChange}
                    />
                    <input
                      name="state"
                      required
                      placeholder="STATE"
                      className="p-4 border-2 border-slate-200 text-xs font-black uppercase outline-none focus:border-slate-900 bg-white"
                      onChange={handleInputChange}
                    />
                    <input
                      name="postalCode"
                      required
                      placeholder="POSTAL CODE"
                      className="p-4 border-2 border-slate-200 text-xs font-black uppercase outline-none focus:border-slate-900 bg-white"
                      onChange={handleInputChange}
                    />
                  </div>

                  <input
                    name="country"
                    required
                    placeholder="COUNTRY"
                    className="w-full p-4 border-2 border-slate-200 text-xs font-black uppercase outline-none focus:border-slate-900 bg-white"
                    onChange={handleInputChange}
                  />

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isSavingAddress}
                      className="bg-slate-900 text-white px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 disabled:bg-slate-400"
                    >
                      {isSavingAddress ? "Saving..." : "Save Address"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(false)}
                      className="text-[10px] font-black uppercase text-slate-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 mb-8">
                <span className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center text-sm">
                  02
                </span>
                Payment Method
              </h2>
              <div className="space-y-3">
                {["card", "cod"].map((method) => (
                  <label
                    key={method}
                    className={`flex items-center justify-between p-8 border-2 cursor-pointer transition-all ${
                      paymentMethod === method
                        ? "border-slate-900 bg-slate-50"
                        : "border-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === method}
                        onChange={() => setPaymentMethod(method)}
                        className="w-4 h-4 accent-slate-900"
                      />
                      <div>
                        <p className="text-sm font-black uppercase tracking-wider">
                          {method === "card"
                            ? "Credit / Debit Card (Razorpay)"
                            : "Cash on Delivery"}
                        </p>
                      </div>
                    </div>
                    {method === "card" ? (
                      <CreditCard size={20} />
                    ) : (
                      <Truck size={20} />
                    )}
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* --- RIGHT: DIRECT INVENTORY SUMMARY PANEL --- */}
          <div className="lg:col-span-5">
            <div className="border-[4px] border-slate-900 p-8 sticky top-32 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8 flex items-center gap-2">
                <Package size={14} /> 03. Inventory Summary
              </h3>

              <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-2">
                    <Loader2
                      className="animate-spin text-slate-900"
                      size={24}
                    />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Live Fetching...
                    </span>
                  </div>
                ) : checkoutItems.length === 0 ? (
                  <p className="text-xs font-bold text-slate-400 uppercase py-8 text-center">
                    Your cart is empty
                  </p>
                ) : (
                  checkoutItems.map((item) => (
                    <div key={item._id} className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                        <img
                          src={item.thumbnail}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-[11px] font-black uppercase leading-tight">
                          {item.title}
                        </p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">
                          QTY: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-black">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-4 pt-8 border-t-2 border-slate-900">
                <div className="flex justify-between text-[11px] font-black uppercase text-slate-400">
                  <span>Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-4xl font-black uppercase pt-4">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={
                  isProcessing ||
                  !selectedAddressId ||
                  checkoutItems.length === 0
                }
                className="w-full mt-10 bg-slate-900 text-white py-8 text-[12px] font-black uppercase tracking-[0.4em] hover:bg-blue-600 transition-all flex items-center justify-center gap-4 disabled:bg-slate-400 disabled:cursor-not-allowed active:scale-[0.99]"
              >
                {isProcessing ? (
                  <>
                    Processing <Loader2 size={18} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Place Order <ChevronRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
