import React, { useState } from "react";
import { ChevronDown, Send } from "lucide-react";
import toast from "react-hot-toast";
import { useSubmitInquiryMutation } from "../inquiryApi";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [submitInquiry, { isLoading }] = useSubmitInquiryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await submitInquiry(formData).unwrap();

      if (response.success) {
        toast.success("Inquiry dispatched directly to concierge.");

        setFormData({
          name: "",
          email: "",
          subject: "General Inquiry",
          message: "",
        });
      }
    } catch (err) {
      toast.error(err?.data?.message || "Transmission failed.");
    }
  };

  return (
    <div className="lg:col-span-7">
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-2 group">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-slate-900 transition-colors">
              Full Name
            </label>
            <input
              className="w-full py-4 bg-transparent border-b border-slate-200 focus:border-slate-900 transition-all outline-none text-sm font-bold uppercase tracking-tight placeholder:text-slate-200"
              type="text"
              placeholder="E.G. ALEXANDER VOGUE"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-2 group">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-slate-900 transition-colors">
              Email Address
            </label>
            <input
              className="w-full py-4 bg-transparent border-b border-slate-200 focus:border-slate-900 transition-all outline-none text-sm font-bold uppercase tracking-tight placeholder:text-slate-200"
              type="email"
              placeholder="CONTACT@DOMAIN.COM"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2 group">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-slate-900 transition-colors">
            Department
          </label>
          <div className="relative">
            <select
              className="w-full py-4 bg-transparent border-b border-slate-200 focus:border-slate-900 transition-all outline-none appearance-none text-sm font-black uppercase tracking-widest cursor-pointer"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            >
              <option>General Inquiry</option>
              <option>Order Status</option>
              <option>Returns & Exchanges</option>
              <option>Private Appointments</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"
            />
          </div>
        </div>

        <div className="space-y-2 group">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-slate-900 transition-colors">
            Message
          </label>
          <textarea
            className="w-full py-4 bg-transparent border-b border-slate-200 focus:border-slate-900 transition-all outline-none min-h-[120px] resize-none text-sm font-medium leading-relaxed"
            placeholder="How may we assist you today?"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="group flex items-center gap-4 px-12 py-5 bg-slate-900 text-white font-black uppercase tracking-[0.3em] text-[11px] hover:bg-amber-600 transition-all duration-300"
        >
          Dispatch Message{" "}
          <Send
            size={14}
            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
          />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
