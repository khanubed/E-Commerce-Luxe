import {
  CalendarClock,
  ChevronDown,
  Headset,
  MapPin,
  MoveRight,
  Truck,
  Phone,
  Clock,
  Mail,
  Send,
} from "lucide-react";
import React, { useState } from "react";
import { useSubmitInquiryMutation } from "../services/inquiryApi";
import toast from "react-hot-toast";

const ContactPage = () => {
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
      console.log( "Contact ", response)
      if (response.success) {
        console.log( "Contact ", response)

        toast.success("Inquiry dispatched directly to concierge.");
        setFormData({
          name: "",
          email: "",
          subject: "General Inquiry",
          message: "",
        });
      }
    } catch (err) {
      console.log(err)
      toast.error(err?.data?.message || "Transmission failed.");
    }
  };

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      {/* 1. HERO: EDITORIAL HEADER */}
      <section className="pt-32 pb-24 px-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 mb-6 block">
                Concierge & Support
              </span>
              <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-0">
                Connect <br />
                <span className="text-slate-200 italic">With</span> <br />
                LuxeStore.
              </h1>
            </div>
            <div className="lg:col-span-4 pb-2">
              <p className="text-sm font-medium leading-relaxed text-slate-500 border-l-2 border-slate-900 pl-6 uppercase tracking-tight">
                Our global concierge team is available 24/7 to assist with
                private appointments, order tracking, and bespoke requests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN INTERACTION GRID */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Contact Form - Sharp & Professional */}
        <div className="lg:col-span-7">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-12">
            Submit an Inquiry
          </h2>
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

        {/* Sidebar: Office & Location */}
        <div className="lg:col-span-5 space-y-16">
          <div className="p-10 border border-slate-900 bg-white">
            <h3 className="text-xl font-black uppercase tracking-tighter mb-8">
              Global HQ
            </h3>
            <div className="space-y-6">
              <ContactInfo
                icon={<MapPin size={18} />}
                label="Address"
                value="7th Floor, Luxe Tower, NYC"
              />
              <ContactInfo
                icon={<Phone size={18} />}
                label="Telephone"
                value="+1 (800) LUXE-STR"
              />
              <ContactInfo
                icon={<Clock size={18} />}
                label="Hours"
                value="Mon - Sun | 24 Hours"
              />
            </div>
          </div>

          {/* Map Image Section - Sharp & Grayscale */}
          <div className="relative w-full h-[350px] bg-slate-100 overflow-hidden group border border-slate-200">
            <img
              className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 transition-all duration-[2000ms]"
              src="https://lh3.googleusercontent.com/aida-public/..." // Your existing map link
              alt="Store Location Map"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 bg-slate-900 text-white flex items-center justify-center">
                <MapPin size={20} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Service Cards */}
      <section className="bg-slate-50 py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
            <div className="bg-white p-10 flex flex-col gap-4">
              <Truck size={24} className="text-amber-600" />
              <h4 className="font-black uppercase text-xs tracking-widest">
                Global Shipping
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                Complimentary insured delivery on all orders over $500.
              </p>
            </div>
            <div className="bg-white p-10 flex flex-col gap-4">
              <Headset size={24} className="text-amber-600" />
              <h4 className="font-black uppercase text-xs tracking-widest">
                24/7 Concierge
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                Direct access to our style consultants anytime, anywhere.
              </p>
            </div>
            <div className="bg-white p-10 flex flex-col gap-4">
              <CalendarClock size={24} className="text-amber-600" />
              <h4 className="font-black uppercase text-xs tracking-widest">
                Appointments
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                Book a private virtual or in-person viewing of our collection.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// Internal Helper Component
const ContactInfo = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="text-amber-600 mt-1">{icon}</div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="text-sm font-bold uppercase tracking-tight">{value}</p>
    </div>
  </div>
);

export default ContactPage;
