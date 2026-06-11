import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import {
  AlertTriangle,
  CheckCircle2,
  X,
  Trash2,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { cancelOrderApi } from "../features/orders/orderApi";

const OrderCancelPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [step, setStep] = useState("confirm");
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleFinalCancel = () => {
    setStep("reason");
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      reason: reason,
      comments: otherReason, 
    };

    try {

      const response = await cancelOrderApi(orderId, payload);
      if (response.success) {
        toast.success(`Order cancelled successfully!`);
        setStep("done");
      }
    } catch (error) {
      const errorMessage =
        error.response?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center p-6 font-sans">
      <div className="max-w-lg w-full bg-white border border-slate-200 rounded-lg shadow-2xl overflow-hidden transition-all duration-500">
        {/* STEP 1: CONFIRMATION */}
        {step === "confirm" && (
          <div className="animate-in fade-in zoom-in-95">
            <div className="p-10 text-center">
              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={28} />
              </div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                Confirm Cancellation
              </h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">
                Action is irreversible
              </p>
            </div>

            <div className="p-8 pt-0 flex flex-col gap-3">
              <button
                onClick={handleFinalCancel}
                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-md font-black uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={14} /> Yes, Cancel Order
              </button>

              <button
                onClick={() => navigate(-1)}
                className="w-full py-4 bg-white border border-slate-200 text-slate-900 rounded-md font-black uppercase text-[10px] tracking-[0.2em] hover:bg-slate-50 transition-all"
              >
                No, Go Back
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: REASON FORM */}
        {step === "reason" && (
          <div className="p-8 animate-in slide-in-from-right-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Feedback
              </h2>
              <X
                size={18}
                className="text-slate-300 cursor-pointer hover:text-slate-900"
                onClick={() => navigate("/")}
              />
            </div>

            <form onSubmit={handleFinish} className="space-y-4">
              <div className="grid grid-cols-1 gap-2">
                {["Price too high", "Found elsewhere", "Other"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setReason(r)}
                    className={`w-full p-4 text-left border rounded-md text-xs font-black uppercase tracking-widest transition-all flex justify-between items-center ${
                      reason === r
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-100 text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    {r}
                    {reason === r && <ChevronRight size={14} />}
                  </button>
                ))}
              </div>

              {/* Conditional Textarea */}
              {reason !== "" && (
                <div className="animate-in fade-in slide-in-from-top-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
                    {reason === "Other"
                      ? "Please specify"
                      : "Any additional comments? (Optional)"}
                  </label>
                  <textarea
                    required={reason === "Other"}
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    placeholder="Type here..."
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none focus:border-slate-900 min-h-[100px] resize-none"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={
                  !reason ||
                  (reason === "Other" && !otherReason) ||
                  isSubmitting
                }
                className="w-full py-4 bg-slate-900 disabled:bg-slate-200 text-white rounded-md font-black uppercase text-[10px] tracking-[0.2em] transition-all"
              >
                {isSubmitting ? "Processing..." : "Submit & Close"}
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: SUCCESS STATE */}
        {step === "done" && (
          <div className="p-12 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
              Order Dead
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 mb-8">
              Items returned to inventory
            </p>

            <button
              onClick={() => navigate("/")}
              className="px-10 py-4 bg-slate-900 text-white rounded-md font-black uppercase text-[10px] tracking-[0.2em] hover:bg-slate-800 transition-all"
            >
              Back to Store
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCancelPage;
