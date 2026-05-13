import React from 'react';
import { 
  ShieldCheck, 
  Wind, 
  Layers, 
  Globe2, 
  ArrowRight,
  BarChart2
} from 'lucide-react';

const SustainabilityPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* 1. HERO: THE LUXE PROMISE */}
      <section className="pt-32 pb-24 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="max-w-2xl">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 mb-6 block">
                The LuxeStore Standard
              </span>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                Legacy <br /> 
                <span className="text-slate-300 italic">Over</span> Waste.
              </h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                We believe true luxury is timeless. LuxeStore is committed to a circular 
                ecosystem where every product is crafted to last generations, not seasons.
              </p>
            </div>
            <div className="hidden md:block">
               <div className="w-32 h-32 border-2 border-slate-900 flex items-center justify-center p-4">
                  <span className="text-[10px] font-black text-center uppercase tracking-widest leading-tight">
                    EST. 2026 <br/> SUSTAINABLE <br/> CORE
                  </span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE THREE PILLARS - SHARP GRID */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 border border-slate-900">
          <Pillar 
            icon={<Layers size={20} />}
            title="Curated Materials"
            desc="We source only from certified ethical suppliers. Every leather, fabric, and metal is traced from origin to atelier."
          />
          <Pillar 
            icon={<Wind size={20} />}
            title="Low-Impact Logisitcs"
            desc="LuxeStore utilizes carbon-neutral shipping lanes and 100% plastic-free, biodegradable packaging for every order."
          />
          <Pillar 
            icon={<ShieldCheck size={20} />}
            title="Lifetime Repair"
            desc="Luxury means longevity. Our dedicated concierge handles repairs to ensure your items never reach a landfill."
          />
        </div>
      </section>

      {/* 3. IMPACT DATA SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-2xl font-black uppercase tracking-tight italic">Our Progress</h2>
            <div className="h-[2px] flex-grow bg-slate-100" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <StatRow label="Plastic-Free Packaging" value="100%" />
              <StatRow label="Renewable Energy Use" value="84%" />
              <StatRow label="Supply Chain Transparency" value="92%" />
            </div>

            <div className="p-12 bg-slate-900 text-white rounded-sm relative overflow-hidden">
                <BarChart2 className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5" />
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 relative z-10">
                  Investing in <br/> the Future.
                </h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed relative z-10">
                  By 2028, LuxeStore aims to be fully regenerative, putting more back into 
                  the environment than we take.
                </p>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 hover:text-white transition-colors relative z-10">
                  Download Full Report <ArrowRight size={14} />
                </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER CALL-OUT */}
      <section className="py-24 border-t border-slate-100 text-center">
        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Want to learn more?</h2>
        <p className="text-xl font-bold max-w-xl mx-auto px-6 mb-10">
          Our ethical sourcing team is available for transparency inquiries 24/7.
        </p>
        <button className="px-10 py-5 border-2 border-slate-900 text-slate-900 font-black uppercase text-xs tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all">
          Contact Ethics Department
        </button>
      </section>

    </div>
  );
};

const Pillar = ({ icon, title, desc }) => (
  <div className="p-12 border-r last:border-r-0 border-slate-900 hover:bg-slate-50 transition-colors group">
    <div className="mb-8 p-3 w-fit bg-slate-900 text-white group-hover:bg-amber-600 transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-black uppercase tracking-tight mb-4">{title}</h3>
    <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

const StatRow = ({ label, value }) => (
  <div className="flex justify-between items-end pb-4 border-b border-slate-100">
    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">{label}</span>
    <span className="text-4xl font-black tracking-tighter leading-none">{value}</span>
  </div>
);

export default SustainabilityPage;