import { Lock, MoveRight, Truck } from "lucide-react";
import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { setCartItems } from "../features/auth/authSlice.js";

import {
  useGetProductsListByIdsQuery,
  useToggleCartMutation,
  useUpdateCartQuantityMutation,
} from "../features/products/productApi.js";

import { CartItem } from "../features/cart/components/CartItem.jsx";
import { SummaryRow } from "../features/cart/components/SummaryRow.jsx";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const rawCartArray = useMemo(() => {
    return user?.cart?.items || user?.cart || [];
  }, [user]);


  const productIds = useMemo(() => {
    if (!isAuthenticated) return [];
    return rawCartArray
      .map((item) => {
        if (!item) return null;
        if (typeof item === "string") return item;
        return (
          item.product?._id ||
          item.product?.id ||
          item.product ||
          item._id ||
          item.id
        );
      })
      .filter(Boolean);
  }, [rawCartArray, isAuthenticated]);

  const { data: fetchedPayload, isLoading: isQueryLoading } =
    useGetProductsListByIdsQuery(productIds, {
      skip: !isAuthenticated || productIds.length === 0,
    });

  const [toggleCart] = useToggleCartMutation();
  const [updateCartQuantity] = useUpdateCartQuantityMutation();

  const localCartItems = useMemo(() => {
    if (!fetchedPayload) return [];
    const productsList = fetchedPayload.products || fetchedPayload;
    if (!Array.isArray(productsList)) return [];

    return productsList.map((product) => {
      const originalRecord = rawCartArray.find((item) => {
        const targetId =
          item?.product?._id ||
          item?.product?.id ||
          item?.product ||
          item?._id ||
          item?.id;
        return targetId === product._id || targetId === product.id;
      });
      return {
        ...product,
        quantity: originalRecord?.quantity || 1,
      };
    });
  }, [fetchedPayload, rawCartArray]);

  const isLoading = isAuthenticated && productIds.length > 0 && isQueryLoading;

  const handleRemove = async (productId) => {
    try {
      const response = await toggleCart(productId).unwrap();
      const freshCart = response.cart || response;
      dispatch(setCartItems(freshCart));
      toast.success("Removed from Archive");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item from cart");
    }
  };

  const handleUpdate = async (productId, delta, currentQty) => {
    const newQty = currentQty + delta;

    if (newQty < 1) {
      return handleRemove(productId);
    }

    try {
      const response = await updateCartQuantity({
        productId,
        quantity: newQty,
      }).unwrap();
      const freshCart = response.cart || response;
      dispatch(setCartItems(freshCart));
    } catch (err) {
      console.error(err);
      toast.error("Failed to alter quantity index balance");
    }
  };

  const subtotal = useMemo(() => {
    return localCartItems.reduce((acc, item) => {
      const price = item.price || 0;
      const quantity = item.quantity || 1;
      return acc + price * quantity;
    }, 0);
  }, [localCartItems]);

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center bg-white">
        <h2 className="text-xl font-black uppercase tracking-widest text-slate-900 mb-4">
          Authentication Required
        </h2>
        <p className="text-slate-400 text-xs tracking-wider uppercase mb-8">
          Log in to reconstruct your preserved archive drawer.
        </p>
        <Link
          to="/login"
          className="px-10 py-5 bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.2em]"
        >
          Identify Session
        </Link>
      </div>
    );
  }

  if (isLoading && localCartItems.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-slate-900 text-[10px] font-black uppercase tracking-[0.5em] bg-white">
        Reconstructing Archive...
      </div>
    );
  }

  return (
    <main className="pt-24 pb-24 max-w-[1440px] mx-auto px-6 md:px-12 bg-white min-h-screen transition-colors duration-500">
      {/* Architectural Branding Header section */}
      <header className="border-b border-slate-950 pb-4 mb-4">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">
          Your Archive<span className="text-amber-600">.</span>
        </h1>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3">
          Review your selection before final acquisition
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Dynamic Items Container Block Node List */}
        <div className="lg:col-span-7 space-y-1">
          {localCartItems.length > 0 ? (
            <div className="border-t border-slate-100">
              {localCartItems.map((item) => {
                const itemId = item._id || item.id;

                return (
                  <div key={itemId} className="border-b border-slate-100 py-2">
                    <CartItem
                      item={item}
                      onUpdate={(id, delta) =>
                        handleUpdate(itemId, delta, item.quantity)
                      }
                      onRemove={() => handleRemove(itemId)}
                    />
                  </div>
                );
              })}
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

        {/* Global Checkout Ledger Order summary context widget */}
        <div className="lg:col-span-5">
          <div className="sticky top-32 space-y-8">
            <div className="p-10 bg-white border border-slate-950 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-slate-900"></div>

              <h2 className="text-[14px] font-black text-slate-900 mb-10 uppercase tracking-[0.3em] flex items-center gap-3">
                Order Summary
              </h2>

              <div className="space-y-6 mb-10">
                <SummaryRow
                  label="Archive Subtotal"
                  value={`$${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                />
                <SummaryRow label="Logistics (Express)" value="COMPLIMENTARY" />
                <SummaryRow
                  label="Service Tax (8%)"
                  value={`$${tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                />

                <div className="pt-8 border-t-2 border-slate-950 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                      Total Payable
                    </span>
                    <span className="text-3xl font-black text-slate-900 tracking-tighter">
                      $
                      {total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <Lock size={16} className="mb-2 text-slate-300" />
                </div>
              </div>

              <button
                onClick={() => navigate("/cart/checkout")}
                disabled={localCartItems.length === 0}
                className="w-full py-6 bg-slate-900 text-white text-[12px] font-black uppercase tracking-[0.3em] hover:bg-amber-600 transition-all duration-500 flex items-center justify-center gap-4 group disabled:opacity-50 disabled:pointer-events-none"
              >
                Place Order
                <MoveRight
                  size={18}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </button>
            </div>

            {/* Fulfilment Logistics Info Unit */}
            <div className="p-6 border border-slate-100 flex items-start gap-4">
              <Truck className="text-slate-900 mt-1" size={20} />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                  Global Express Fulfillment
                </p>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Complimentary white-glove delivery. Estimated arrival in 48-72
                  hours.
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
