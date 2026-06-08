import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, ShoppingBag, ArrowRight, Clipboard } from "lucide-react";
import toast from "react-hot-toast";

const OrderSuccessPage = () => {
  const { orderId } = useParams(); // Fallback identifier from URL params
  const navigate = useNavigate();
  
  // 1. Hook into router state location layer parameters
  const location = useLocation();
  
  // 2. Destructure the props passed from checkout. 
  // Add an empty object fallback `|| {}` so the app doesn't crash if someone refreshes the success page!
  const { items, totalAmount, paymentMethod, date } = location.state || {};

  const copyToClipboard = () => {
    navigator.clipboard.writeText(orderId);
    toast.success("Order ID copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-16 font-mono flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-6">
        
        {/* --- BRUTALIST STATUS CARD --- */}
        <div className="border-[4px] border-slate-900 p-8 text-center bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 border-2 border-slate-900 rounded-full mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2">RECEIPT CONFIRMED</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Transaction handled securely</p>
          
          <div onClick={copyToClipboard} className="mt-6 inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 cursor-pointer hover:bg-slate-100 transition-all text-xs font-bold uppercase text-slate-700">
            ID: <span className="font-black text-slate-900">#{orderId?.toUpperCase()}</span>
            <Clipboard size={14} className="text-slate-400" />
          </div>
        </div>

        {/* --- DYNAMIC ITEMS LIST SUMMARY (ONLY SHOWS IF STATE EXISTS) --- */}
        {items && items.length > 0 && (
          <div className="border-2 border-slate-900 p-6 space-y-4 mb-8 bg-slate-50">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-200 pb-2">Order Items Manifest</h3>
            <div className="divide-y divide-slate-200 max-h-[200px] overflow-y-auto pr-2">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3 text-xs font-bold uppercase">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-bold">[{item.quantity}x]</span>
                    <span className="text-slate-900 font-black">{item.title}</span>
                  </div>
                  <span className="font-black text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t-2 border-slate-900 pt-4 flex justify-between font-black uppercase">
              <span>Total Paid ({paymentMethod})</span>
              <span className="text-lg">${totalAmount?.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* --- NAVIGATION LINKS BUTTONS --- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => navigate("/account/orders")} 
            className="flex-1 bg-slate-900 text-white text-xs font-black uppercase tracking-widest py-5 border-2 border-slate-900 hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(59,130,246,1)]"
          >
            <ShoppingBag size={14} /> View My Orders
          </button>
          <button 
            onClick={() => navigate("/")} 
            className="flex-1 bg-white text-slate-900 text-xs font-black uppercase tracking-widest py-5 border-2 border-slate-900 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            Continue Browsing <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccessPage;