import React from 'react';
import { Tag, ArrowRight, Sparkles } from 'lucide-react';

export const HeroStrip = () => {
  return (
    <div className="relative overflow-hidden mb-12 bg-slate-900 text-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px' 
        }}></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between relative z-10">
        
        {/* Left Side: Tagline */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex h-6 w-6 items-center justify-center bg-white/10 rounded-full">
            <Tag size={12} className="text-amber-400" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em]">
            Limited Season <span className="text-amber-400">Offer</span>
          </p>
        </div>

        {/* Center: Main Message */}
        <div className="flex items-center gap-4">
          <span className="hidden md:block h-[1px] w-8 bg-white/20"></span>
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-amber-400 animate-pulse" />
            <h2 className="text-xs sm:text-sm font-bold tracking-tight">
              Summer Sale — <span className="text-amber-400">Up to 50% Off</span>
            </h2>
          </div>
          <span className="hidden md:block h-[1px] w-8 bg-white/20"></span>
        </div>

        {/* Right Side: CTA */}
        <div className="hidden sm:block">
          <button className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-amber-400 transition-colors">
            Claim Discount
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Bottom Gradient Border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>
    </div>
  );
};