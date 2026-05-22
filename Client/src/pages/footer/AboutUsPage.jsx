import React from 'react';
import { 
  History, 
  Sparkles, 
  Globe, 
  ArrowRight,
} from 'lucide-react';

import { faInstagram , faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { useNavigate } from 'react-router-dom';

const AboutUsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* 1. EDITORIAL HERO */}
      <section className="pt-32 pb-24 px-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 block">
                The LuxeStore Narrative
              </span>
              <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-0">
                Defining <br /> 
                <span className="text-slate-200 italic">Modern</span> <br /> 
                Standards.
              </h1>
            </div>
            <div className="lg:col-span-4 pb-2">
              <p className="text-sm font-medium leading-relaxed text-slate-500 border-l-2 border-slate-900 pl-6">
                Founded in 2026, LuxeStore emerged as a response to the fleeting nature of digital commerce. 
                We don't just curate products; we archive excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE MANIFESTO GRID */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
          <div className="p-16 bg-white flex flex-col justify-between aspect-square md:aspect-auto">
            <History size={32} strokeWidth={1.5} className="mb-12" />
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4">The Origin</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Born in the heart of a digital revolution, LuxeStore was conceived as a sanctuary for those who value 
                craftsmanship over convenience. We started as a small collective of curators and have grown into a 
                global benchmark for quality.
              </p>
            </div>
          </div>
          <div className="p-16 bg-slate-900 text-white flex flex-col justify-between aspect-square md:aspect-auto">
            <Sparkles size={32} strokeWidth={1.5} className="text-amber-500 mb-12" />
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4">The Curation</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Every item entering the LuxeStore inventory undergoes a rigorous 48-point inspection. 
                If it isn't exceptional, it doesn't belong here. We prioritize the "few" over the "many."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUNDER / ARCHITECTS SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tighter">The Visionaries</h2>
            <div className="h-px w-24 bg-slate-900 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="group">
                <div className="aspect-[3/4] bg-slate-100 mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
                  {/* Image placeholder for high-fashion headshot */}
                </div>
                <h4 className="text-lg font-black uppercase tracking-tight">Executive {member}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Department Head</p>
                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <faInstagram size={14} className="cursor-pointer hover:text-amber-600" />
                  <faLinkedin size={14} className="cursor-pointer hover:text-amber-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GLOBAL REACH */}
      <section className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 leading-none">
                Seamless <br/> Worldwide <br/> Presence.
              </h2>
              <div className="space-y-6">
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-500">Logistics Hubs</span>
                  <span className="text-xs font-bold">London / Tokyo / NYC</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-500">Member Countries</span>
                  <span className="text-xs font-bold">140+</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Globe size={300} strokeWidth={0.5} className="text-white/5 animate-[spin_20s_linear_infinite]" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="py-32 px-6 text-center">
        <h2 className="text-sm font-black uppercase tracking-[0.5em] text-slate-400 mb-8">Join the Inner Circle</h2>
        <button onClick={()=>navigate('../contact')} className="px-12 py-5 bg-slate-900 text-white font-black uppercase text-xs tracking-[0.3em] hover:bg-amber-600 transition-all duration-300">
          Apply for Membership
        </button>
      </section>

    </div>
  );
};

export default AboutUsPage;