import { Lock, Minus, MoveRight, Plus, Truck, Trash2 } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice.js"; // Adjust path
import { CartItem } from "../components/cart/CartItem.jsx";
import { SummaryRow } from "./SummaryRow.jsx";
import { useNavigate } from "react-router-dom";

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
    <main className="pt-32 pb-24 max-w-[1280px] mx-auto px-6 md:px-12 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-slate-900 mb-12">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdate={handleUpdate}
                onRemove={handleRemove}
              />
            ))
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-2xl">
              <p className="text-slate-400 font-medium">
                Your cart is currently empty.
              </p>
              <a
                href="/"
                className="text-slate-900 font-bold underline underline-offset-4 mt-4 inline-block italic"
              >
                Explore the Collection
              </a>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 space-y-6">
            <div className="p-8 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50">
              <h2 className="text-xl font-bold text-slate-900 mb-8 tracking-tight">
                Order Summary
              </h2>

              <div className="space-y-4 mb-8">
                <SummaryRow
                  label="Subtotal"
                  value={`$${subtotal.toLocaleString()}`}
                />
                <SummaryRow label="Estimated Shipping" value="FREE" />
                <SummaryRow
                  label="Tax (8%)"
                  value={`$${tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                />
                <div className="pt-4 border-t border-slate-100 flex justify-between">
                  <span className="text-lg font-bold text-slate-900">
                    Total
                  </span>
                  <span className="text-lg font-bold text-slate-900">
                    $
                    {total.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate('/cart/checkout') }
                className="w-full py-5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-3"
              >
                Proceed to Checkout
                <MoveRight size={18} />
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-slate-400">
                <Lock size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Encrypted & Secure
                </span>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4">
              <Truck className="text-slate-900" size={24} />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-900">
                  Complimentary Express Shipping
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Estimated delivery: 2-3 business days.
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
