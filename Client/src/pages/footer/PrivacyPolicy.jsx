import React from "react";
import { ShieldCheck, EyeOff, Lock, Database, UserCheck, Fingerprint } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {

    const navigate = useNavigate();

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto bg-white min-h-screen">
      
      {/* 1. ARCHITECTURAL HEADER */}
      <header className="border-b-4 border-slate-950 pb-12 mb-20">
        <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter text-slate-900 leading-[0.8]">
          Data<br />
          Sovereignty<span className="text-amber-600">.</span>
        </h1>
        <p className="text-[12px] max-md:text-[10px] font-black text-slate-900 uppercase tracking-[0.5em] mt-8 bg-slate-100 inline-block px-4 py-1">
          Privacy Protocol / v.2026.05
        </p>
      </header>

      {/* 2. ENCRYPTION PILLARS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-950 mb-32">
        <VaultCard 
          icon={<Lock size={20} />} 
          title="AES-256 Encryption" 
          desc="All identity data is hashed and stored within isolated secure vaults, inaccessible to external pings."
          isFirst
        />
        <VaultCard 
          icon={<EyeOff size={20} />} 
          title="Zero-Trace Browsing" 
          desc="We do not monetize your archive history. Your aesthetic preferences remain your private property."
        />
        <VaultCard 
          icon={<Fingerprint size={20} />} 
          title="Identity Rights" 
          desc="Users maintain absolute authority over their registry data, including the right to total erasure."
        />
      </section>

      {/* 3. TECHNICAL DISCLOSURE BODY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <h2 className="text-[13px] font-black uppercase tracking-[0.4em] text-slate-900 sticky top-32 leading-relaxed">
            Technical Specification<br />
            of Data Handling
          </h2>
        </div>

        <div className="lg:col-span-8 space-y-24">
          {/* Section 01: Data Collection */}
          <div className="space-y-8">
            <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
              <span className="text-amber-600">01</span> Information Intake
            </h3>
            <div className="text-[16px] text-slate-800 font-medium leading-relaxed space-y-6 border-l-4 border-slate-950 pl-10">
              <p>
                Upon initializing a **Registry Identity**, we collect minimal telemetry required for acquisition: specifically your **legal name, logistical coordinates, and encrypted communication channels.**
              </p>
              <p>
                Our system automatically generates a **Unique Archive ID** to represent your profile, ensuring that your real-world identity is decoupled from your browsing habits within our internal database.
              </p>
            </div>
          </div>

          {/* Section 02: Processing Table */}
          <div className="space-y-8">
            <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
              <span className="text-amber-600">02</span> Data Utilization
            </h3>
            <div className="border border-slate-950">
              <div className="grid grid-cols-2 border-b-2 border-slate-950 bg-slate-900">
                <div className="p-6 font-black text-[11px] uppercase tracking-widest text-white">Data Type</div>
                <div className="p-6 font-black text-[11px] uppercase tracking-widest text-white text-right">Retention Period</div>
              </div>
              <DataRow type="Financial Tokens" retention="Purged post-verification" />
              <DataRow type="Logistical Coordinates" retention="Duration of Active Transit" />
              <DataRow type="Acquisition History" retention="Indefinite (Archive Integrity)" isAmber />
            </div>
          </div>

          {/* Section 03: Third Party Logic */}
          <div className="space-y-8">
            <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
              <span className="text-amber-600">03</span> External Interfaces
            </h3>
            <div className="text-[16px] text-slate-800 font-medium leading-relaxed border-l-4 border-slate-950 pl-10 italic">
              "Luxe Archive does not sell, trade, or lease user identities to advertising conglomerates."
            </div>
            <p className="text-[15px] text-slate-800 pl-10 font-bold leading-relaxed">
              We only interface with technical partners essential to the archive's operation: specialized couriers for logistics and encrypted payment gateways for financial processing. These entities are strictly prohibited from utilizing your data for non-archive purposes.
            </p>
          </div>
        </div>
      </div>

      {/* 4. DATA REQUEST FOOTER */}
      <footer className="mt-40 pt-20 border-t-4 border-slate-950 flex flex-col items-center text-center">
        <p className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-900 mb-6 bg-slate-100 px-4 py-1">
          Data Request / Erasure Protocol
        </p>
        <a 
          href="mailto:privacy@luxearchive.com" 
          className="text-2xl font-black uppercase tracking-tighter hover:text-amber-600 transition-colors"
        >
          privacy@luxearchive.com
        </a>
      </footer>
    </main>
  );
};

// --- TECHNICAL SUB-COMPONENTS ---

const VaultCard = ({ icon, title, desc, isFirst }) => (
  <div className={`p-12 bg-white ${!isFirst ? 'md:border-l border-slate-950 border-t md:border-t-0' : ''}`}>
    <div className="text-slate-950 mb-8 p-3 bg-slate-50 inline-block border border-slate-100">{icon}</div>
    <h4 className="text-[12px] font-black uppercase tracking-[0.3em] mb-5 text-slate-900">{title}</h4>
    <p className="text-[15px] text-slate-800 font-bold leading-relaxed">{desc}</p>
  </div>
);

const DataRow = ({ type, retention, isAmber }) => (
  <div className="grid grid-cols-2 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
    <div className="p-6 text-[12px] font-black uppercase tracking-widest text-slate-900">{type}</div>
    <div className={`p-6 text-[12px] font-bold uppercase text-right tracking-tighter ${isAmber ? 'text-amber-600 font-black' : 'text-slate-800'}`}>
      {retention}
    </div>
  </div>
);

export default PrivacyPolicy;