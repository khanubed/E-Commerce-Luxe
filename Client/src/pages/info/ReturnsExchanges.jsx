import React from "react";
import { PackageX, Clock, ShieldAlert, FileSearch, Scale, Mail } from "lucide-react";

const ReturnsExchanges = () => {
  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto bg-white min-h-screen">
      
      {/* 1. EDITORIAL HEADER */}
      <header className="border-b-4 border-slate-950 pb-12 mb-20">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-slate-900 leading-[0.8]">
          Protocol<br />
          & Revision<span className="text-amber-600">.</span>
        </h1>
        <p className="text-[12px] font-black text-slate-900 uppercase tracking-[0.5em] mt-8 bg-slate-100 inline-block px-4 py-1">
          Archive Acquisition Terms / v.2026.11
        </p>
      </header>

      {/* 2. CORE CONDITIONS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-slate-950 mb-32">
        <ProtocolCard 
          icon={<Clock size={20} />} 
          title="Archive Revision Window" 
          desc="An acquisition revision request must be initialized within 14 standard calendar days post-verification of receipt."
          isFirst
        />
        <ProtocolCard 
          icon={<ShieldAlert size={20} />} 
          title="Authenticity & Condition" 
          desc="Items must return in their precise 'As-Archived' state. Tags, serialized packaging, and origin certificates are mandatory."
        />
      </section>

      {/* 3. TECHNICAL BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <h2 className="text-[13px] font-black uppercase tracking-[0.4em] text-slate-900 sticky top-32 leading-relaxed">
            Standard Procedure<br />
            for Item Rejection
          </h2>
        </div>

        <div className="lg:col-span-8 space-y-24">
          {/* Section A: Returns Process */}
          <div className="space-y-8">
            <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
              <span className="text-amber-600">A</span> Initialization of Return
            </h3>
            <div className="text-[16px] text-slate-800 font-medium leading-relaxed space-y-6 border-l-4 border-slate-950 pl-10">
              <p>
                To initiate an **Archive Revision**, access your **Registry Identity** dashboard. Navigate to **"Acquisitions,"** locate the specific serialized ID, and select the **"Initialize Protocol"** function.
              </p>
              <p>
                Upon verification of the request, a pre-authorized logistics manifest (Shipping Label) will be generated. The piece must be dispatched within **48 hours** of manifest generation.
              </p>
            </div>
          </div>

          {/* Section B: Refund / Exchanges */}
          <div className="space-y-8">
            <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
              <span className="text-amber-600">B</span> The Revision Workflow
            </h3>
            <div className="border border-slate-950">
              <div className="grid grid-cols-2 border-b-2 border-slate-950 bg-slate-900">
                <div className="p-6 font-black text-[11px] uppercase tracking-widest text-white">Action Tier</div>
                <div className="p-6 font-black text-[11px] uppercase tracking-widest text-white text-right">Protocol</div>
              </div>
              <WorkflowRow label="Refund of Value" protocol="Reimbursed to original Financial Profile minus Logistics." />
              <WorkflowRow label="Exchange of Selection" protocol="Value converted to digital credit for re-acquisition." />
              <WorkflowRow label="Final Acquisition Items" protocol="Designated pieces are ineligible for revision or credit." isAmber />
            </div>
          </div>

          {/* Section C: Inspections */}
          <div className="space-y-8">
            <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
              <span className="text-amber-600">C</span> Technical Verification
            </h3>
            <div className="text-[16px] text-slate-800 font-medium leading-relaxed border-l-4 border-slate-950 pl-10 italic">
              "Every returned piece undergoes a serialized physical inspection for authenticity, component integrity, and environmental exposure."
            </div>
            <p className="text-[15px] text-slate-800 pl-10 font-bold leading-relaxed">
              If a piece fails verification (e.g., missing serialized ID tags, clear exposure to fragrances, or structural alteration), the acquisition status is locked, and the item is returned to the user at their logistical cost.
            </p>
          </div>
        </div>
      </div>

      {/* 4. SUPPORT CALL TO ACTION */}
      <footer className="mt-40 pt-20 border-t-4 border-slate-950 flex flex-col items-center text-center">
        <p className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-900 mb-6 bg-slate-100 px-4 py-1">
          Technical Assistance / Protocol Support
        </p>
        <a 
          href="mailto:protocol@luxearchive.com" 
          className="text-2xl font-black uppercase tracking-tighter hover:text-amber-600 transition-colors"
        >
          protocol@luxearchive.com
        </a>
      </footer>
    </main>
  );
};

// --- TECHNICAL MINI COMPONENTS ---

const ProtocolCard = ({ icon, title, desc, isFirst }) => (
  <div className={`p-12 bg-white ${!isFirst ? 'md:border-l border-slate-950 border-t md:border-t-0' : ''}`}>
    <div className="text-slate-950 mb-8 p-3 bg-slate-50 inline-block border border-slate-100">{icon}</div>
    <h4 className="text-[12px] font-black uppercase tracking-[0.3em] mb-5 text-slate-900">{title}</h4>
    <p className="text-[15px] text-slate-800 font-bold leading-relaxed">{desc}</p>
  </div>
);

const WorkflowRow = ({ label, protocol, isAmber }) => (
  <div className="grid grid-cols-2 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
    <div className="p-6 text-[12px] font-black uppercase tracking-widest text-slate-900">{label}</div>
    <div className={`p-6 text-[12px] font-bold uppercase text-right tracking-tighter ${isAmber ? 'text-amber-600 font-black' : 'text-slate-800'}`}>
      {protocol}
    </div>
  </div>
);

export default ReturnsExchanges;