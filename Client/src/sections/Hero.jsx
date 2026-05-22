import React from "react";
import { heroData } from "../data/home";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-204.5 min-h-150 flex items-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-[3000ms]"
          alt={heroData.backgroundImage.alt}
          src={heroData.backgroundImage.src}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/40 to-transparent" />
      </div>

      <div className="container mx-auto px-8 relative z-10 max-w-7xl">
        <div className="max-w-3xl">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500 mb-6 block">
            Limited Edition
          </span>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-[0.8] mb-8">
            {heroData.title.split(' ').slice(0, -1).join(' ')} <br />
            <span className="text-slate-400 italic font-light lowercase">
              {heroData.title.split(' ').pop()}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl font-medium leading-relaxed border-l border-white/20 pl-6">
            {heroData.description}
          </p>
          <div className="flex items-center space-x-6">
            <Link 
              to={'/shop'} 
              className="group relative flex items-center gap-3 bg-white text-slate-900 px-12 py-5 rounded-none font-black uppercase text-[11px] tracking-[0.3em] hover:bg-amber-500 hover:text-white transition-all shadow-2xl"
            >
              {heroData.primaryBtn.text}
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 right-10 hidden lg:flex flex-col items-center gap-4">
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 rotate-90 origin-bottom mb-12">
          Scroll
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
      </div>
    </section>
  );
};

export default Hero;