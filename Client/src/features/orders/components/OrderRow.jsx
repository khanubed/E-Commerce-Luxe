import React, { useState } from "react";
import {
  Truck,
  Package,
  MapPin,
  CheckCircle2,
  XCircle,
  ChevronDown,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// 1. Added the raw 'order' object prop coming from MongoDB down through your parent map list
export const OrderRow = ({
  id,
  dbOrderId,
  status,
  total,
  date,
  rawDate,
  order,
}) => {
  const navigate = useNavigate();
  const [isTracking, setIsTracking] = useState(false);

  // Status mapping definitions array
  const statusHierarchy = ["Pending", "Confirmed", "Shipped", "Delivered"];
  const currentStepIndex = statusHierarchy.indexOf(status);

  // Parse accurate timestamps for timeline indicators
  const parsedOrderDate = new Date(rawDate);
  const getOffsetDateString = (daysOffset) => {
    const d = new Date(parsedOrderDate);
    d.setDate(d.getDate() + daysOffset);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Dynamically configure state indices based on what MongoDB contains
  const trackingSteps = [
    { label: "Ordered", date: getOffsetDateString(0), completed: true },
    {
      label: "Processing",
      date: getOffsetDateString(1),
      completed: currentStepIndex >= 1 || status === "Delivered",
    },
    {
      label: "In Transit",
      date: getOffsetDateString(2),
      completed: currentStepIndex >= 2 || status === "Delivered",
    },
    {
      label: "Delivered",
      date: status === "Delivered" ? getOffsetDateString(3) : "Pending",
      completed: status === "Delivered",
    },
  ];

  // Map dynamic neubrutalist status pills accents styling configurations
  const getStatusStyles = (currentStatus) => {
    switch (currentStatus) {
      case "Cancelled":
        return "bg-red-50 text-red-600 border border-red-200";
      case "Delivered":
        return "bg-emerald-50 text-emerald-600 border border-emerald-200";
      case "Shipped":
        return "bg-blue-50 text-blue-600 border border-blue-200";
      case "Confirmed":
        return "bg-amber-50 text-amber-600 border border-amber-200";
      default:
        return "bg-slate-100 text-slate-900";
    }
  };

  // 2. 🔥 REDIRECT INVOICE HANDLER ROUTINE WITH ROUTER STATE
  const handleViewInvoiceRedirect = (e) => {
    e.stopPropagation(); // Stops the accordion tr collapsible row from shutting closed

    // Normalize the dataset fields structure so your OrderSuccessPage handles it safely
    const successPagePayload = {
      orderId: dbOrderId,
      totalAmount: parseFloat(total),
      paymentMethod: order?.paymentMethod || "CARD",
      date: date,
      // Map across embedded populated subdocuments or map plain fallbacks dynamically
      items: order?.items?.map((item) => ({
        title:
          item.product?.title || item.title || "Purchased E-Shop Product Item",
        price: item.price,
        quantity: item.quantity,
      })) || [
        {
          title: `Order Reference Summary ${id}`,
          quantity: 1,
          price: parseFloat(total),
        },
      ],
    };

    // Forward the payload down downstream exactly like your checkout panel execution trigger did!
    navigate(`/order/success/${dbOrderId}`, {
      state: successPagePayload,
    });
  };

  return (
    <>
      {/* Main Row */}
      <tr
        onClick={() => setIsTracking(!isTracking)}
        className={`transition-all group cursor-pointer border-l-4 ${
          isTracking
            ? "bg-slate-50 border-slate-900"
            : "hover:bg-slate-50 border-transparent"
        }`}
      >
        <td className="px-8 py-8">
          <div className="font-black text-slate-900 uppercase tracking-tighter flex items-center gap-2">
            {id}
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${isTracking ? "rotate-180" : ""}`}
            />
          </div>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            {date}
          </div>
        </td>
        <td className="px-8 py-8">
          <span
            className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${getStatusStyles(status)}`}
          >
            {status}
          </span>
        </td>
        <td className="px-8 py-8 font-black text-slate-900">${total}</td>
        <td className="px-8 py-8 text-right">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsTracking(!isTracking);
            }}
            className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
              isTracking
                ? "bg-slate-900 text-white"
                : "bg-white border border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white"
            }`}
          >
            {isTracking ? "Close Details" : "Track Order"}
          </button>
        </td>
      </tr>

      {/* Expanded Tracking Detail */}
      {isTracking && (
        <tr>
          <td
            colSpan="4"
            className="bg-slate-50/50 px-8 py-10 border-b border-slate-100"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in zoom-in-95 duration-300">
              {/* 1. Progress Stepper */}
              <div className="lg:col-span-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">
                  Live Journey
                </h4>

                {status === "Cancelled" ? (
                  <div className="flex items-center gap-4 bg-red-50 text-red-700 border-2 border-red-200 p-6 rounded-2xl">
                    <XCircle size={24} />
                    <div>
                      <p className="text-xs font-black uppercase">
                        This Order Was Terminated
                      </p>
                      <p className="text-[11px] font-bold opacity-80">
                        Refunds process automatically to original payments
                        systems parameters.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start relative px-2">
                    {/* Background Line */}
                    <div className="absolute top-4 left-0 w-full h-[2px] bg-slate-200 z-0" />

                    {trackingSteps.map((step, index) => (
                      <div
                        key={index}
                        className="relative z-10 flex flex-col items-center group"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                            step.completed
                              ? "bg-slate-900 text-white shadow-md scale-110"
                              : "bg-white border-2 border-slate-200 text-slate-300"
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle2 size={16} />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-current" />
                          )}
                        </div>
                        <p
                          className={`mt-3 text-[10px] font-black uppercase tracking-widest ${step.completed ? "text-slate-900" : "text-slate-400"}`}
                        >
                          {step.label}
                        </p>
                        <p className="text-[9px] font-bold text-slate-400">
                          {step.date}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Actions & Info */}
              <div className="lg:col-span-4 flex flex-col justify-between border-l border-slate-200 pl-12">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                    Courier Information
                  </h4>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-white rounded-lg border border-slate-100">
                      <Truck size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-900">
                        Express Delivery
                      </p>
                      <p className="text-[10px] font-bold text-slate-400">
                        TRACK ID: {dbOrderId.slice(-10).toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {status !== "Cancelled" && status !== "Delivered" && (
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/account/orders/order-cancel/${dbOrderId}`)
                      }
                      className="w-full py-4 bg-white border border-red-100 text-red-600 rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                    >
                      <XCircle size={14} /> Cancel Order
                    </button>
                  )}

                  {/* 3. 🔥 ATTACHED THE INTERCEPTOR ACTION CLICK TRIGGER RIGHT HERE */}
                  <button
                    type="button"
                    onClick={handleViewInvoiceRedirect}
                    className="w-full py-4 bg-slate-100 text-slate-900 rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                  >
                    <FileText size={14} /> Download Invoice
                  </button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
