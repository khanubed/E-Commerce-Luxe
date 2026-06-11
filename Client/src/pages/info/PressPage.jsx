import React from 'react';
import { 
  Download, 
  ExternalLink, 
  Mail, 
  FileText, 
  Camera, 
  Share2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PressPage = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* 1. HERO: MEDIA GATEWAY */}
      <section className="pt-32 pb-24 px-6 border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 mb-6 block">
                Press & Media Portal
              </span>
              <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-0">
                The <br /> 
                <span className="text-slate-200 italic">Luxe</span> <br /> 
                Report.
              </h1>
            </div>
            <div className="lg:col-span-4">
              <div className="p-8 border-2 border-slate-900 bg-white">
                <p className="text-xs font-black uppercase tracking-widest mb-4 italic">Media Inquiries</p>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  For interview requests, high-res editorials, or brand partnerships, contact our global press office.
                </p>
                <a href="mailto:press@luxestore.com" className="flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:text-amber-600 transition-colors">
                  <Mail size={16} /> press@luxestore.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRESS RELEASES - ARCHIVAL STYLE */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-2xl font-black uppercase tracking-tight">Recent Dispatches</h2>
            <div className="h-px flex-grow mx-8 bg-slate-100" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Archive 2026</span>
          </div>

          <div className="space-y-0">
            <PressReleaseRow 
              date="May 12, 2026"
              title="LuxeStore Announces Carbon-Neutral Logistics Hub in Tokyo"
              category="Sustainability"
            />
            <PressReleaseRow 
              date="April 28, 2026"
              title="A New Era of Digital Curation: The Spring Collection"
              category="Product"
            />
            <PressReleaseRow 
              date="March 15, 2026"
              title="LuxeStore Q1 Growth Exceeds Projections by 42%"
              category="Finance"
            />
          </div>
        </div>
      </section>

      {/* 3. MEDIA ASSETS - VISUAL GRID */}
      <section className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter">Brand Assets</h2>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Professional Grade Toolkits</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 border border-white/20 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all">
              Download Full Media Kit (1.2GB) <Download size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AssetCard 
              title="Visual Identity" 
              type="Logos & Brandmarks" 
              icon={<Share2 size={20} />} 
            />
            <AssetCard 
              title="Editorial Stills" 
              type="Product Photography" 
              icon={<Camera size={20} />} 
            />
            <AssetCard 
              title="Fact Sheets" 
              type="Company Backgrounder" 
              icon={<FileText size={20} />} 
            />
          </div>
        </div>
      </section>

      {/* 4. AS SEEN IN - LOGO STRIP */}
      <section className="py-24 px-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-12">Global Coverage</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
            {/* Replace with actual media logos */}
            <span className="text-xl font-black italic tracking-tighter">VOGUE</span>
            <span className="text-xl font-black tracking-widest uppercase">Forbes</span>
            <span className="text-xl font-black tracking-tighter">WIRED</span>
            <span className="text-xl font-serif">The New York Times</span>
          </div>
        </div>
      </section>

      {/* 5. CONTACT CTA */}
      <section className="py-32 px-6 text-center">
        <h2 className="text-sm font-black uppercase tracking-[0.5em] text-slate-400 mb-8">Stay Informed</h2>
        <p className="text-2xl font-bold mb-10 max-w-xl mx-auto leading-tight">
          Join our media list for embargoed announcements and exclusive previews.
        </p>
        <div className="flex max-w-md mx-auto border-b-2 border-slate-900 pb-2">
          <input 
            type="email" 
            placeholder="Journalist Email Address" 
            className="flex-grow bg-transparent outline-none text-sm font-medium"
          />
          <button onClick={()=>navigate('../contact')}  className="text-[10px] font-black uppercase tracking-widest">Subscribe</button>
        </div>
      </section>

    </div>
  );
};

const PressReleaseRow = ({ date, title, category }) => (
  <div className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-slate-100 hover:bg-slate-50 transition-all px-4 cursor-pointer">
    <div className="flex flex-col gap-2">
      <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{date}</span>
      <h3 className="text-xl font-black uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">
        {title}
      </h3>
    </div>
    <div className="mt-4 md:mt-0 flex items-center gap-6">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-200 px-3 py-1">
        {category}
      </span>
      <ExternalLink size={18} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
    </div>
  </div>
);

const AssetCard = ({ title, type, icon }) => (
  <div className="p-10 border border-white/10 hover:border-amber-500 transition-colors group cursor-pointer">
    <div className="mb-12 text-slate-500 group-hover:text-amber-500 transition-colors">
      {icon}
    </div>
    <h3 className="text-lg font-black uppercase tracking-tight mb-1">{title}</h3>
    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{type}</p>
    <div className="mt-8 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
      Download Files <Download size={12} />
    </div>
  </div>
);

export default PressPage;