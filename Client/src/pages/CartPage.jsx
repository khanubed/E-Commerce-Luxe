import { Lock, MoveRight, Truck } from "lucide-react";
import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice.js";
import { CartItem } from "../components/cart/CartItem.jsx";
import { SummaryRow } from "./SummaryRow.jsx";
import { useNavigate, Link } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const handleUpdate = (id, delta, currentQty) => {
    dispatch(updateQuantity({ id, quantity: currentQty + delta }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems],
  );

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <main className="pt-24 pb-24 max-w-[1440px] mx-auto px-6 md:px-12 bg-white min-h-screen transition-colors duration-500">
      {/* 1. ARCHITECTURAL HEADER */}
      <header className="border-b border-slate-950 pb-4 mb-4">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">
          Your Archive<span className="text-amber-600">.</span>
        </h1>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3">
          Review your selection before final acquisition
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* 2. ITEMS LIST */}
        <div className="lg:col-span-7 space-y-1">
          {cartItems.length > 0 ? (
            <div className="border-t border-slate-100">
              {cartItems.map((item) => (
                <div key={item.id} className="border-b border-slate-100 py-2">
                  <CartItem
                    item={item}
                    onUpdate={handleUpdate}
                    onRemove={handleRemove}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-32 text-center border border-dashed border-slate-200">
              <p className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-300">
                Archive is currently empty
              </p>
              <Link
                to="/shop"
                className="text-[10px] font-black uppercase tracking-widest text-slate-900 border-b-2 border-amber-600 mt-8 inline-block hover:text-amber-600 transition-colors"
              >
                Return to Collection
              </Link>
            </div>
          )}
        </div>

        {/* 3. ORDER SUMMARY (STICKY MANIFESTO) */}
        <div className="lg:col-span-5">
          <div className="sticky top-32 space-y-8">
            <div className="p-10 bg-white border border-slate-950 relative overflow-hidden">
              {/* Decorative technical line */}
              <div className="absolute top-0 left-0 w-2 h-full bg-slate-900"></div>
              
              <h2 className="text-[14px] font-black text-slate-900 mb-10 uppercase tracking-[0.3em] flex items-center gap-3">
                Order Summary
              </h2>

              <div className="space-y-6 mb-10">
                <SummaryRow
                  label="Archive Subtotal"
                  value={`$${subtotal.toLocaleString()}`}
                />
                <SummaryRow label="Logistics (Express)" value="COMPLIMENTARY" />
                <SummaryRow
                  label="Service Tax (8%)"
                  value={`$${tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                />
                
                <div className="pt-8 border-t-2 border-slate-950 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Total Payable</span>
                    <span className="text-3xl font-black text-slate-900 tracking-tighter">
                      ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <Lock size={16} className="mb-2 text-slate-300" />
                </div>
              </div>

              <button
                onClick={() => navigate('/cart/checkout')}
                className="w-full py-6 bg-slate-900 text-white text-[12px] font-black uppercase tracking-[0.3em] hover:bg-amber-600 transition-all duration-500 flex items-center justify-center gap-4 group"
              >
                Place Order
                <MoveRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            {/* SHIPPING INFO (Subtle Technical Block) */}
            <div className="p-6 border border-slate-100 flex items-start gap-4">
              <Truck className="text-slate-900 mt-1" size={20} />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                  Global Express Fulfillment
                </p>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Complimentary white-glove delivery. Estimated arrival in 48-72 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;