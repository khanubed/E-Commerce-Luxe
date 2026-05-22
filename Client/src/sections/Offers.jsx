import React from 'react';
import { offersSection } from '../data/home.js';
import { MoveRight } from 'lucide-react';

const Offers = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {offersSection.map((promo) => (
          <div 
            key={promo.id} 
            /* Kept h-100 and group, but swapped rounded-3xl for rounded-none */
            className="relative rounded-none overflow-hidden h-[500px] group border border-slate-100"
          >
            {/* 1. Background Image - Added a subtle zoom on hover */}
            <img
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2000ms] ease-out"
              src={promo.image}
              alt={promo.title}
            />
            
            {/* 2. Dynamic Overlay - Kept your promo.overlayClass logic */}
            <div className={`absolute inset-0 transition-opacity duration-700 ${promo.overlayClass}`}></div>
            
            {/* 3. Content Area - Typography Transformation */}
            <div className="relative h-full flex flex-col justify-center p-12 text-white">
              {/* Refined the tag: Thinner, more spacing */}
              <span className={`text-[10px] font-black tracking-[0.4em] uppercase mb-6 block ${promo.tagClass}`}>
                // {promo.tag}
              </span>
              
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
                {/* Visual Trick: Splits text to create that "layered" look */}
                {promo.title}
              </h2>
              
              <p className="text-sm font-medium mb-10 max-w-xs text-slate-100/90 leading-relaxed uppercase tracking-tight">
                {promo.description}
              </p>
              
              {/* Button: Swapped rounded-xl for the Luxe Store sharp button */}
              <button className={`group flex items-center gap-4 px-10 py-5 rounded-none font-black uppercase tracking-[0.3em] text-[11px] w-fit transition-all duration-500 ${promo.buttonClass}`}>
                {promo.buttonText} 
                <MoveRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            {/* Added a subtle design detail: Corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-white/20 m-4 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Offers;