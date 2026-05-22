import React from "react";
import { Truck, Globe, Clock, ShieldCheck, Box, Package } from "lucide-react";

const ShippingPolicy = () => {
  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto bg-white min-h-screen">
      {/* 1. HEADER SECTION */}
      <header className="border-b border-slate-950 pb-12 mb-20">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-slate-900 leading-[0.8]">
          Logistics<br />
          Protocol<span className="text-amber-600">.</span>
        </h1>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mt-8">
          Global Distribution Framework / v.2026.04
        </p>
      </header>

      {/* 2. CORE PILLARS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-950 mb-32">
        <PolicyPillar 
          icon={<Globe size={20} />} 
          title="Global Reach" 
          desc="Archive pieces are dispatched from our central hub to over 120 sovereign territories."
          isFirst
        />
        <PolicyPillar 
          icon={<ShieldCheck size={20} />} 
          title="Insured Transit" 
          desc="Every acquisition is fully insured for its declared value until the moment of signature."
        />
        <PolicyPillar 
          icon={<Box size={20} />} 
          title="Eco-Packaging" 
          desc="Recycled structural cardboard and biodegradable seals protect both item and environment."
        />
      </section>

      {/* 3. DETAILED LOGISTICS BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <h2 className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-900 sticky top-32">
            Standard Operating<br />Procedures
          </h2>
        </div>

        <div className="lg:col-span-8 space-y-24">
          {/* Section A: Dispatch Timing */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
              <span className="text-amber-600">01</span> Dispatch Timeline
            </h3>
            <div className="text-sm text-slate-500 font-medium leading-relaxed space-y-4 border-l-2 border-slate-100 pl-8">
              <p>
                Orders are processed for acquisition within **24–48 hours** of verification. 
                Our logistics team operates Monday through Friday, excluding international registry holidays.
              </p>
              <p>
                Once processed, an **Archive Tracking ID** will be issued via your registered 
                Identity email, allowing for real-time monitoring of the transit chain.
              </p>
            </div>
          </div>

          {/* Section B: Delivery Tiers */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
              <span className="text-amber-600">02</span> Delivery Tiers
            </h3>
            <div className="border border-slate-950">
              <div className="grid grid-cols-2 border-b border-slate-950">
                <div className="p-6 font-black text-[10px] uppercase tracking-widest bg-slate-50">Tier</div>
                <div className="p-6 font-black text-[10px] uppercase tracking-widest bg-slate-50 text-right">Estimate</div>
              </div>
              <TierRow label="Domestic Archive (India)" time="3 — 5 Business Days" />
              <TierRow label="International Registry" time="7 — 12 Business Days" />
              <TierRow label="Priority Courier" time="48 — 72 Hours" />
            </div>
          </div>

          {/* Section C: Duties & Taxes */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
              <span className="text-amber-600">03</span> Custom Compliance
            </h3>
            <div className="text-sm text-slate-500 font-medium leading-relaxed border-l-2 border-slate-100 pl-8 italic">
              "The recipient is the importer of record and must comply with all laws and regulations 
              of the destination country."
            </div>
            <p className="text-sm text-slate-500 pl-8">
              International acquisitions may be subject to import taxes, customs duties, and fees 
              levied by the destination country. Luxe Archive has no control over these 
              technical charges and cannot predict their value.
            </p>
          </div>
        </div>
      </div>

      {/* 4. FOOTER CALL TO ACTION */}
      <footer className="mt-40 pt-20 border-t border-slate-950 flex flex-col items-center text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6">
          Require Technical Assistance?
        </p>
        <a 
          href="mailto:support@luxearchive.com" 
          className="text-2xl font-black uppercase tracking-tighter hover:text-amber-600 transition-colors"
        >
          logistics@luxearchive.com
        </a>
      </footer>
    </main>
  );
};

// --- REUSABLE COMPONENTS ---

const PolicyPillar = ({ icon, title, desc, isFirst }) => (
  <div className={`p-10 bg-white ${!isFirst ? 'md:border-l border-slate-950 border-t md:border-t-0' : ''}`}>
    <div className="text-slate-950 mb-6">{icon}</div>
    <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-4">{title}</h4>
    <p className="text-xs text-slate-400 font-medium leading-relaxed">{desc}</p>
  </div>
);

const TierRow = ({ label, time }) => (
  <div className="grid grid-cols-2 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
    <div className="p-6 text-[11px] font-black uppercase tracking-widest text-slate-900">{label}</div>
    <div className="p-6 text-[11px] font-bold uppercase text-slate-400 text-right tracking-tighter">{time}</div>
  </div>
);

export default ShippingPolicy;