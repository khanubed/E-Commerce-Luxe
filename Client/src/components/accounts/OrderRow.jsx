import React, { useState } from "react";
import { Truck, Package, MapPin, CheckCircle2, XCircle, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const OrderRow = ({ id, status, total, date }) => {
  const navigate = useNavigate()
  const [isTracking, setIsTracking] = useState(false);

  // Mock tracking steps
  const trackingSteps = [
    { label: "Ordered", date: "May 10", completed: true },
    { label: "Processing", date: "May 11", completed: true },
    { label: "In Transit", date: "May 12", completed: status === "In Transit" || status === "Delivered" },
    { label: "Delivered", date: "Pending", completed: status === "Delivered" },
  ];

  return (
    <>
      {/* Main Row */}
      <tr 
        onClick={() => setIsTracking(!isTracking)}
        className={`transition-all group cursor-pointer border-l-4 ${
          isTracking ? "bg-slate-50 border-slate-900" : "hover:bg-slate-50 border-transparent"
        }`}
      >
        <td className="px-8 py-8">
          <div className="font-black text-slate-900 uppercase tracking-tighter flex items-center gap-2">
            {id} 
            <ChevronDown size={14} className={`transition-transform duration-300 ${isTracking ? "rotate-180" : ""}`} />
          </div>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{date}</div>
        </td>
        <td className="px-8 py-8">
          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
            status === "Cancelled" ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-900"
          }`}>
            {status}
          </span>
        </td>
        <td className="px-8 py-8 font-black text-slate-900">${total}</td>
        <td className="px-8 py-8 text-right">
          <button 
            className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
              isTracking ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white"
            }`}
          >
            {isTracking ? "Close Details" : "Track Order"}
          </button>
        </td>
      </tr>

      {/* Expanded Tracking Detail */}
      {isTracking && (
        <tr>
          <td colSpan="4" className="bg-slate-50/50 px-8 py-10 border-b border-slate-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in zoom-in-95 duration-300">
              
              {/* 1. Progress Stepper */}
              <div className="lg:col-span-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Live Journey</h4>
                <div className="flex justify-between items-start relative">
                  {/* Background Line */}
                  <div className="absolute top-4 left-0 w-full h-[2px] bg-slate-200 z-0" />
                  
                  {trackingSteps.map((step, index) => (
                    <div key={index} className="relative z-10 flex flex-col items-center group">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 ${
                        step.completed ? "bg-slate-900 text-white" : "bg-white border-2 border-slate-200 text-slate-300"
                      }`}>
                        {step.completed ? <CheckCircle2 size={16} /> : <div className="w-2 h-2 rounded-full bg-current" />}
                      </div>
                      <p className={`mt-3 text-[10px] font-black uppercase tracking-widest ${step.completed ? "text-slate-900" : "text-slate-400"}`}>
                        {step.label}
                      </p>
                      <p className="text-[9px] font-bold text-slate-400">{step.date}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Actions & Info */}
              <div className="lg:col-span-4 flex flex-col justify-between border-l border-slate-200 pl-12">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Courier Information</h4>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-white rounded-lg border border-slate-100"><Truck size={16}/></div>
                    <div>
                      <p className="text-xs font-black text-slate-900">Express Delivery</p>
                      <p className="text-[10px] font-bold text-slate-400">ID: 99281-AMZ</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {status !== "Cancelled" && status !== "Delivered" && (
                    <button onClick={()=> navigate('/account/orders/order-cancel/orderid')} className="w-full py-4 bg-white border border-red-100 text-red-600 rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                      <XCircle size={14} /> Cancel Order
                    </button>
                  )}
                  <button className="w-full py-4 bg-slate-100 text-slate-900 rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-slate-200 transition-all">
                    Download Invoice
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