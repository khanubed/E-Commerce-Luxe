import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MapPin,
  Home,
  Briefcase,
  Plus,
  ChevronLeft,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Banknote,
  Save,
  Lock,
} from "lucide-react";
import {
  setAddresses,
  setLastUsedAddress,
} from "../../features/auth/authSlice.js";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { addresses, lastUsedAddressId } = useSelector((state) => state.auth);

  // --- STATE MANAGEMENT ---
  const [selectedAddressId, setSelectedAddressId] = useState(
    lastUsedAddressId || addresses[0]?.id,
  );
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("saved_card");

  const [newAddress, setNewAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    type: "Home",
  });

  // --- LOGIC ---
  const handleAddNewAddress = (e) => {
    e.preventDefault();
    const id = Date.now().toString(); // Temporary ID generation
    const updatedAddresses = [...addresses, { ...newAddress, id }];

    dispatch(setAddresses(updatedAddresses)); // Update Redux
    setSelectedAddressId(id);
    setIsAddingAddress(false);
  };

  const handleAddNewCard = (e) => {
    e.preventDefault();
    setPaymentMethod("new_card");
    setIsAddingCard(false);
    alert("New card details captured securely.");
  };

  const handlePlaceOrder = () => {
    const finalOrder = {
      items,
      total: totalAmount,
      address: addresses.find((a) => a.id === selectedAddressId) || newAddress,
      payment: paymentMethod,
    };
    console.log("Order Finalized:", finalOrder);
    alert(`Order Placed via ${paymentMethod.toUpperCase()}!`);
  };

  useEffect(() => {
    console.log(items, totalAmount);
  }, [items, totalAmount]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]  py-20">
      <div className="max-w-7xl mx-auto px-6 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          {/* 1. SHIPPING SECTION */}
          <section className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center gap-3">
              <MapPin size={20} className="text-slate-400" /> Shipping
              Information
            </h2>

            {!isAddingAddress ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${selectedAddressId === addr.id ? "border-slate-900 bg-slate-50" : "border-slate-100"}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[9px] font-black uppercase bg-white px-2 py-1 rounded-md border border-slate-100">
                        {addr.type}
                      </span>
                      {selectedAddressId === addr.id && (
                        <CheckCircle2 size={18} className="text-slate-900" />
                      )}
                    </div>
                    <p className="text-sm font-bold text-slate-900">
                      {addr.fullName}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {addr.address}, {addr.city}
                    </p>
                  </div>
                ))}
                <button
                  onClick={() => setIsAddingAddress(true)}
                  className="p-5 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 flex flex-col items-center justify-center gap-1 hover:border-slate-900 hover:text-slate-900 transition-all"
                >
                  <Plus size={20} />
                  <span className="text-[10px] font-black uppercase">
                    Add New Address
                  </span>
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleAddNewAddress}
                className="space-y-4 animate-in fade-in slide-in-from-top-2"
              >
                <div className="grid grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="Full Name"
                    className="p-4 bg-slate-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-900"
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, fullName: e.target.value })
                    }
                  />
                  <select
                    className="p-4 bg-slate-50 rounded-xl text-sm outline-none"
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, type: e.target.value })
                    }
                  >
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                  </select>
                </div>
                <input
                  required
                  placeholder="Street Address"
                  className="w-full p-4 bg-slate-50 rounded-xl text-sm outline-none"
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, address: e.target.value })
                  }
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest"
                  >
                    Save Address
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingAddress(false)}
                    className="text-[10px] font-black uppercase tracking-widest text-slate-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </section>

          {/* 2. PAYMENT SECTION */}
          <section className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center gap-3">
              <CreditCard size={20} className="text-slate-400" /> Payment Method
            </h2>

            <div className="space-y-4">
              {/* Option: Saved Card */}
              {!isAddingCard && (
                <div
                  onClick={() => {
                    setPaymentMethod("saved_card");
                    setIsAddingCard(false);
                  }}
                  className={`p-5 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${paymentMethod === "saved_card" ? "border-slate-900 bg-slate-50" : "border-slate-100"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-6 bg-slate-900 rounded flex items-center justify-center text-[8px] text-white font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        •••• 4242
                      </p>
                      <p className="text-[9px] text-slate-400 uppercase font-black">
                        Stored Payment
                      </p>
                    </div>
                  </div>
                  {paymentMethod === "saved_card" && (
                    <CheckCircle2 size={18} className="text-slate-900" />
                  )}
                </div>
              )}

              {/* NEW CARD FORM */}
              {isAddingCard ? (
                <form
                  onSubmit={handleAddNewCard}
                  className="p-6 bg-slate-50 rounded-[1.5rem] border border-slate-200 space-y-4 animate-in zoom-in-95"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Card Details
                    </span>
                    <Lock size={14} className="text-slate-400" />
                  </div>

                  <input
                    required
                    placeholder="0000 0000 0000 0000"
                    className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm font-mono outline-none focus:border-slate-900"
                    onChange={(e) =>
                      setNewCard({ ...newCard, number: e.target.value })
                    }
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      required
                      placeholder="MM/YY"
                      className="p-4 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-slate-900"
                      onChange={(e) =>
                        setNewCard({ ...newCard, expiry: e.target.value })
                      }
                    />
                    <input
                      required
                      placeholder="CVV"
                      className="p-4 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-slate-900"
                      onChange={(e) =>
                        setNewCard({ ...newCard, cvv: e.target.value })
                      }
                    />
                  </div>

                  <input
                    required
                    placeholder="Cardholder Name"
                    className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-slate-900"
                    onChange={(e) =>
                      setNewCard({ ...newCard, name: e.target.value })
                    }
                  />

                  <div className="flex gap-4 pt-2">
                    <button
                      type="submit"
                      className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                    >
                      <Save size={14} /> Use This Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingCard(false)}
                      className="text-[10px] font-black uppercase tracking-widest text-slate-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setIsAddingCard(true)}
                  className={`w-full p-5 rounded-2xl border-2 border-dashed flex items-center gap-4 transition-all ${paymentMethod === "new_card" ? "border-slate-900 text-slate-900" : "border-slate-200 text-slate-400 hover:border-slate-400"}`}
                >
                  <Plus size={20} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Add New Credit / Debit Card
                  </span>
                </button>
              )}

              {/* Option: Cash on Delivery */}
              {!isAddingCard && (
                <div
                  onClick={() => {
                    setPaymentMethod("cod");
                    setIsAddingCard(false);
                  }}
                  className={`p-5 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${paymentMethod === "cod" ? "border-emerald-500 bg-emerald-50/30" : "border-slate-100"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                      <Banknote size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Cash on Delivery
                      </p>
                      <p className="text-[9px] text-emerald-600 uppercase font-black">
                        Pay when you receive
                      </p>
                    </div>
                  </div>
                  {paymentMethod === "cod" && (
                    <CheckCircle2 size={18} className="text-emerald-600" />
                  )}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* 3. ORDER SUMMARY */}
        <div className="lg:col-span-4">
          <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 shadow-2xl sticky top-24">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8">
              Summary
            </h3>

            <div className="space-y-6 mb-10 max-h-60 overflow-y-auto pr-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.thumbnail}
                      className="w-12 h-12 rounded-xl object-cover bg-white/10"
                      alt=""
                    />
                    <div>
                      <p className="text-[11px] font-black line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-[9px] text-slate-400 uppercase font-bold">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] font-black">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-white/10 pt-8 mb-10">
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>Shipping</span>
                <span className="text-emerald-400">Calculated at Sync</span>
              </div>
              <div className="flex justify-between text-2xl font-black pt-4">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full py-6 bg-white text-slate-900 rounded-3xl font-black uppercase text-[11px] tracking-[0.3em] hover:bg-slate-100 transition-all active:scale-95 shadow-xl"
            >
              Complete Order
            </button>

            <div className="mt-8 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
              <ShieldCheck size={14} className="text-emerald-500" /> AES-256
              Encryption Secured
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
