import React from "react";
import { Gavel, Scale, FileText, Ban, AlertTriangle, ShieldCheck } from "lucide-react";

const TermsOfService = () => {
  return (
    <main className="pt-24 md:pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto bg-white min-h-screen">
      
      {/* 1. ARCHITECTURAL HEADER */}
      <header className="border-b-4 border-slate-950 pb-12 mb-20">
        <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter text-slate-900 leading-[0.8]">
          Governance<br />
          Protocol<span className="text-amber-600">.</span>
        </h1>
        <p className="text-[12px] font-black text-slate-900 uppercase tracking-[0.5em] mt-8 bg-slate-100 inline-block px-4 py-1">
          User Agreement / v.2026.08
        </p>
      </header>

      {/* 2. CORE LEGAL PILLARS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-950 mb-20 md:mb-32">
        <GovernanceCard 
          icon={<Gavel size={20} />} 
          title="Binding Agreement" 
          desc="By accessing the Archive, you enter a legally binding protocol governing all digital and physical interactions."
          isFirst
        />
        <GovernanceCard 
          icon={<Ban size={20} />} 
          title="Prohibited Conduct" 
          desc="Any attempt to circumvent digital security or replicate archival intellectual property results in immediate termination."
        />
        <GovernanceCard 
          icon={<Scale size={20} />} 
          title="Jurisdiction" 
          desc="All disputes are resolved under the governing laws of the registered Archive HQ territory."
        />
      </section>

      {/* 3. TERMS BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <h2 className="text-[13px] font-black uppercase tracking-[0.4em] text-slate-900 sticky top-32 leading-relaxed">
            Standard Operating<br />
            Clauses & Liabilities
          </h2>
        </div>

        <div className="lg:col-span-8 space-y-24">
          {/* Section 01: Eligibility */}
          <div className="space-y-8">
            <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
              <span className="text-amber-600">01</span> Registry Eligibility
            </h3>
            <div className="text-[16px] text-slate-800 font-medium leading-relaxed space-y-6 border-l-4 border-slate-950 pl-5 md:pl-10">
              <p>
                To utilize the **Luxe Archive**, you must be of legal majority in your jurisdiction. By creating a **Registry Identity**, you affirm that all provided telemetry is accurate and that you are the authorized holder of the linked financial instruments.
              </p>
              <p>
                The Archive reserves the right to refuse service or terminate identities at our discretion, particularly in cases of suspected automated acquisition (botting) or fraudulent verification.
              </p>
            </div>
          </div>

          {/* Section 02: Intellectual Property */}
          <div className="space-y-8">
            <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
              <span className="text-amber-600">02</span> Proprietary Assets
            </h3>
            <div className="text-[16px] text-slate-800 font-medium leading-relaxed border-l-4 border-slate-950 pl-5 md:pl-10 italic">
              "All visual assets, code structures, product photography, and brand manifests are the exclusive intellectual property of LuxeStore Inc."
            </div>
            <p className="text-[15px] text-slate-800 pl-5 md:pl-10 font-bold leading-relaxed">
              Users are granted a limited, non-exclusive license to view the Archive for personal acquisition purposes. Any extraction of data, scraping, or commercial repurposing of Archive content is strictly prohibited without written authorization.
            </p>
          </div>

          {/* Section 03: Liability Table */}
          <div className="space-y-8">
            <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
              <span className="text-amber-600">03</span> Limitation of Liability
            </h3>
            <div className="border border-slate-950">
              <div className="grid grid-cols-2 border-b-2 border-slate-950 bg-slate-900">
                <div className="p-4 md:p-6 font-black text-[11px] uppercase tracking-widest text-white">Clause</div>
                <div className="p-4 md:p-6 font-black text-[11px] uppercase tracking-widest text-white text-right">Maximum Exposure</div>
              </div>
              <LiabilityRow clause="Service Interruptions" limit="Zero Liability" />
              <LiabilityRow clause="Logistical Delays" limit="Logistics Provider Responsibility" />
              <LiabilityRow clause="Product Discrepancy" limit="Value of Original Acquisition" isAmber />
            </div>
          </div>

          {/* Section 04: Modifications */}
          <div className="space-y-8">
            <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
              <span className="text-amber-600">04</span> Protocol Revisions
            </h3>
            <p className="text-[16px] text-slate-800 font-medium leading-relaxed border-l-4 border-slate-950 pl-5 md:pl-10">
              Luxe Archive reserves the right to modify this **Governance Protocol** at any time. Significant revisions will be broadcast via your Registry-linked communication channels. Continued interaction with the Archive post-revision constitutes formal acceptance of the new terms.
            </p>
          </div>
        </div>
      </div>

      {/* 4. LEGAL CONTACT FOOTER */}
      <footer className="mt-20 md:mt-40 pt-10 md:pt-20 border-t-4 border-slate-950 flex flex-col items-center text-center">
        <p className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-900 mb-6 bg-slate-100 px-4 py-1">
          Legal Counsel / Dispute Resolution
        </p>
        <a 
          href="mailto:legal@luxearchive.com" 
          className="text-xl md:text-2xl font-black uppercase tracking-tighter hover:text-amber-600 transition-colors"
        >
          legal@luxearchive.com
        </a>
      </footer>
    </main>
  );
};

// --- TECHNICAL SUB-COMPONENTS ---

const GovernanceCard = ({ icon, title, desc, isFirst }) => (
  <div className={`p-6 md:p-12 bg-white ${!isFirst ? 'md:border-l border-slate-950 border-t md:border-t-0' : ''}`}>
    <div className="text-slate-950 mb-8 p-3 bg-slate-50 inline-block border border-slate-100">{icon}</div>
    <h4 className="text-[12px] font-black uppercase tracking-[0.3em] mb-5 text-slate-900">{title}</h4>
    <p className="text-[15px] text-slate-800 font-bold leading-relaxed">{desc}</p>
  </div>
);

const LiabilityRow = ({ clause, limit, isAmber }) => (
  <div className="grid grid-cols-2 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
    <div className="p-4 md:p-6 text-[12px] font-black uppercase tracking-widest text-slate-900">{clause}</div>
    <div className={`p-4 md:p-6 text-[12px] font-bold uppercase text-right tracking-tighter ${isAmber ? 'text-amber-600 font-black' : 'text-slate-800'}`}>
      {limit}
    </div>
  </div>
);

export default TermsOfService;