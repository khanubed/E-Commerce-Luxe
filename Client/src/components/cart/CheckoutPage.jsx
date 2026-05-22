import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MapPin,
  Plus,
  CreditCard,
  CheckCircle2,
  Package,
  Truck,
  ShieldCheck,
  ChevronRight,
  ShoppingBag,
  Info,
  Loader2
} from "lucide-react";
import { setAddresses } from "../../features/auth/authSlice.js";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { addresses } = useSelector((state) => state.auth);

  // --- STATE MANAGEMENT ---
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  // New Address Form State
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    type: "Home",
  });

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNewAddress = (e) => {
    e.preventDefault();
    const newId = Date.now().toString();
    const updatedAddresses = [...addresses, { ...addressForm, id: newId }];
    
    dispatch(setAddresses(updatedAddresses));
    setSelectedAddressId(newId);
    setIsAddingAddress(false);
    toast.success("Delivery address updated");
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId && !isAddingAddress) {
      toast.error("Please select a delivery destination");
      return;
    }

    setIsProcessing(true);
    
    // Simulate API Call
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Order Placed Successfully!");
      console.log("Final Order Data:", {
        orderItems: items,
        total: totalAmount,
        shippingId: selectedAddressId,
        payment: paymentMethod
      });
      // Redirect logic here: navigate('/order-success')
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white pt-30 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* --- PAGE HEADER --- */}
        <div className="mb-12 border-b-[6px] border-slate-900 pb-8">
          <h1 className="text-3xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
            Secure Checkout<span className="text-blue-600">.</span>
          </h1>
          <div className="flex max-md:flex-col max-md:items-start justify-between items-center mt-6">
            <p className="text-[8px] md:text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
              Transaction ID: TXN-{Date.now().toString().slice(-4)}-2026
            </p>
            <div className="flex items-center  gap-2 text-emerald-600">
              <ShieldCheck size={14} />
              <span className="text-[6px] md:text-[10px] font-black uppercase tracking-widest">End-to-End Encrypted</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* --- LEFT: SHIPMENT & PAYMENT --- */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* SECTION 01: DELIVERY ADDRESS */}
            <section>
              <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 mb-8">
                <span className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center text-sm">01</span>
                Shipping Destination
              </h2>

              {!isAddingAddress ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-6 border-2 transition-all cursor-pointer relative ${
                        selectedAddressId === addr.id 
                        ? "border-slate-900 bg-slate-50" 
                        : "border-slate-100 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[9px] font-black uppercase border border-slate-900 px-2 py-1">
                          {addr.type}
                        </span>
                        {selectedAddressId === addr.id && <CheckCircle2 size={18} className="text-blue-600" />}
                      </div>
                      <p className="font-black text-[14px] uppercase tracking-tight">{addr.fullName}</p>
                      <p className="text-[12px] text-slate-500 font-bold mt-1">
                        {addr.address}, {addr.city}
                      </p>
                    </div>
                  ))}
                  
                  <button 
                    onClick={() => setIsAddingAddress(true)}
                    className="p-6 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 hover:border-slate-900 hover:bg-slate-50 transition-all text-slate-400"
                  >
                    <Plus size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">New Address</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAddNewAddress} className="space-y-4 bg-slate-50 p-8 border-2 border-slate-900">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      name="fullName"
                      required
                      placeholder="FULL NAME"
                      className="p-4 border-2 border-slate-200 focus:border-slate-900 outline-none text-xs font-black uppercase"
                      onChange={handleInputChange}
                    />
                    <select
                      name="type"
                      className="p-4 border-2 border-slate-200 focus:border-slate-900 outline-none text-xs font-black uppercase"
                      onChange={handleInputChange}
                    >
                      <option value="Home">Home</option>
                      <option value="Office">Office</option>
                    </select>
                  </div>
                  <input
                    name="address"
                    required
                    placeholder="STREET ADDRESS"
                    className="w-full p-4 border-2 border-slate-200 focus:border-slate-900 outline-none text-xs font-black uppercase"
                    onChange={handleInputChange}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      name="city"
                      required
                      placeholder="CITY"
                      className="p-4 border-2 border-slate-200 focus:border-slate-900 outline-none text-xs font-black uppercase"
                      onChange={handleInputChange}
                    />
                    <input
                      name="postalCode"
                      required
                      placeholder="POSTAL CODE"
                      className="p-4 border-2 border-slate-200 focus:border-slate-900 outline-none text-xs font-black uppercase"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="bg-slate-900 text-white px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors">
                      Save Address
                    </button>
                    <button type="button" onClick={() => setIsAddingAddress(false)} className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </section>

            {/* SECTION 02: PAYMENT */}
            <section>
              <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 mb-8">
                <span className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center text-sm">02</span>
                Payment Method
              </h2>
              <div className="space-y-3">
                {['card', 'cod'].map((method) => (
                  <label 
                    key={method}
                    className={`flex items-center justify-between p-8 border-2 cursor-pointer transition-all ${paymentMethod === method ? 'border-slate-900 bg-slate-50' : 'border-slate-100'}`}
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
                          {method === 'card' ? 'Credit / Debit Card' : 'Cash on Delivery'}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                          {method === 'card' ? 'Secure Online Transaction' : 'Pay at your doorstep'}
                        </p>
                      </div>
                    </div>
                    {method === 'card' ? <CreditCard size={20}/> : <Truck size={20}/>}
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* --- RIGHT: SUMMARY --- */}
          <div className="lg:col-span-5">
            <div className="border-[4px] border-slate-900 p-8 sticky top-32 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8 flex items-center gap-2">
                <Package size={14} /> 03. Inventory Summary
              </h3>

              <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-slate-100 border border-slate-200 overflow-hidden">
                      <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] font-black uppercase leading-tight">{item.title}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">QTY: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-black">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
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
                disabled={isProcessing}
                className="w-full mt-10 bg-slate-900 text-white py-8 text-[12px] font-black uppercase tracking-[0.4em] hover:bg-blue-600 transition-all flex items-center justify-center gap-4 disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>Processing <Loader2 size={18} className="animate-spin" /></>
                ) : (
                  <>Place Order <ChevronRight size={18} /></>
                )}
              </button>

              <div className="mt-8 p-4 bg-slate-50 border border-slate-100 flex items-start gap-3">
                <Info size={14} className="text-blue-600 mt-0.5" />
                <p className="text-[9px] font-bold text-slate-500 leading-normal uppercase">
                  Verify your delivery details before final submission. Standard shipping applies to all automotive and furniture categories.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;