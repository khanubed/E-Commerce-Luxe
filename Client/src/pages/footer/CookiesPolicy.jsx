import React from "react";
import { Cookie, MousePointerClick, ShieldCheck, BarChart3, Settings, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CookiesPolicy = () => {
    const navigate = useNavigate();
  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto bg-white min-h-screen">

      {/* 1. ARCHITECTURAL HEADER */}
      <header className="border-b-4 border-slate-950 pb-12 mb-20">
        <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter text-slate-900 leading-[0.8]">
          Telemetry<br />
          Protocol<span className="text-amber-600">.</span>
        </h1>
        <p className="text-[12px] font-black text-slate-900 uppercase tracking-[0.5em] mt-8 bg-slate-100 inline-block px-4 py-1">
          Cookie Deployment Policy / v.2026.05
        </p>
      </header>

      {/* 2. CORE UTILITY GRID */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-950 mb-32">
        <CookieCard
          icon={<Cookie size={20} />}
          title="Essential Cache"
          desc="Critical data fragments required for secure identity verification and acquisition management."
          isFirst
        />
        <CookieCard
          icon={<BarChart3 size={20} />}
          title="Performance Logs"
          desc="Anonymous telemetry used to optimize technical load speeds and interface responsiveness."
        />
        <CookieCard
          icon={<Settings size={20} />}
          title="Preference Memory"
          desc="Localized storage that remembers your aesthetic configurations and linguistic settings."
        />
      </section>

      {/* 3. TECHNICAL BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <h2 className="text-[13px] font-black uppercase tracking-[0.4em] text-slate-900 sticky top-32 leading-relaxed">
            Technical Specification<br />
            of Data Caching
          </h2>
        </div>

        <div className="lg:col-span-8 space-y-24">
          {/* Section 01: Definition */}
          <div className="space-y-8">
            <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
              <span className="text-amber-600">01</span> Protocol Definition
            </h3>
            <div className="text-[16px] text-slate-800 font-medium leading-relaxed space-y-6 border-l-4 border-slate-950 pl-10">
              <p>
                A "Cookie" is a localized data fragment stored on your hardware. These fragments allow our **Archive Engine** to recognize your device across multiple sessions, ensuring that your **Registry Identity** and **Acquisition Cart** remain synchronized.
              </p>
              <p>
                We utilize both "Session Cookies" (purged upon browser closure) and "Persistent Cookies" (retained until manual erasure) to manage the Archive's operational integrity.
              </p>
            </div>
          </div>

          {/* Section 02: Cookie Taxonomy Table */}
          <div className="space-y-8">
            <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
              <span className="text-amber-600">02</span> Telemetry Taxonomy
            </h3>
            <div className="border border-slate-950">
              <div className="grid grid-cols-2 border-b-2 border-slate-950 bg-slate-900">
                <div className="p-6 font-black text-[11px] uppercase tracking-widest text-white">Identifier</div>
                <div className="p-6 font-black text-[11px] uppercase tracking-widest text-white text-right">Functional Core</div>
              </div>
              <CookieRow id="_Auth_Protocol" function="Identity Verification" />
              <CookieRow id="_Cart_Manifest" function="Inventory Reservation" />
              <CookieRow id="_Interface_State" function="UX Configuration" isAmber />
            </div>
          </div>

          {/* Section 03: User Control */}
          <div className="space-y-8">
            <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
              <span className="text-amber-600">03</span> User Authority
            </h3>
            <div className="text-[16px] text-slate-800 font-medium leading-relaxed border-l-4 border-slate-950 pl-10 italic">
              "The User maintains absolute authority to disable telemetry via their hardware settings."
            </div>
            <p className="text-[15px] text-slate-800 pl-10 font-bold leading-relaxed">
              Note that disabling "Essential Cache" fragments will result in structural failure of the Archive’s acquisition chain. You will be unable to initialize a secure login or maintain an active cart without these technical requirements.
            </p>
          </div>
        </div>
      </div>

      {/* 4. MANAGEMENT FOOTER */}
      <footer className="mt-40 pt-20 border-t-4 border-slate-950 flex flex-col items-center text-center">
        <p className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-900 mb-6 bg-slate-100 px-4 py-1">
          Technical Configuration Support
        </p>
        <div className="flex flex-col md:flex-row gap-8">
          <button className="bg-slate-950 text-white px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-amber-600 transition-all">
            Reset All Preferences
          </button>
          <a onClick={()=>navigate('../contact')}
            href="mailto:tech@luxearchive.com"
            className="border-2 border-slate-950 text-slate-950 px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-slate-950 hover:text-white transition-all"
          >
            Consult Tech Advisor
          </a>
        </div>
      </footer>
    </main>
  );
};

// --- TECHNICAL SUB-COMPONENTS ---

const CookieCard = ({ icon, title, desc, isFirst }) => (
  <div className={`p-12 bg-white ${!isFirst ? 'md:border-l border-slate-950 border-t md:border-t-0' : ''}`}>
    <div className="text-slate-950 mb-8 p-3 bg-slate-50 inline-block border border-slate-100">{icon}</div>
    <h4 className="text-[12px] font-black uppercase tracking-[0.3em] mb-5 text-slate-900">{title}</h4>
    <p className="text-[15px] text-slate-800 font-bold leading-relaxed">{desc}</p>
  </div>
);

const CookieRow = ({ id, function: func, isAmber }) => (
  <div className="grid grid-cols-2 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
    <div className="p-6 text-[12px] font-black uppercase tracking-widest text-slate-900">{id}</div>
    <div className={`p-6 text-[12px] font-bold uppercase text-right tracking-tighter ${isAmber ? 'text-amber-600 font-black' : 'text-slate-800'}`}>
      {func}
    </div>
  </div>
);

export default CookiesPolicy;