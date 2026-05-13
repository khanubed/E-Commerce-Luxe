import React from 'react';
import { offersSection } from '../data/home.js';

const Offers = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {offersSection.map((promo) => (
          <div 
            key={promo.id} 
            className="relative rounded-3xl overflow-hidden h-100 group"
          >
            {/* Background Image */}
            <img
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              src={promo.image}
              alt={promo.title}
            />
            
            {/* Dynamic Overlay */}
            <div className={`absolute inset-0 backdrop-blur-[2px] ${promo.overlayClass}`}></div>
            
            {/* Content Area */}
            <div className="relative h-full flex flex-col justify-center p-12 text-white">
              <span className={`font-bold tracking-widest uppercase mb-4 ${promo.tagClass}`}>
                {promo.tag}
              </span>
              <h2 className="font-display text-h1 mb-6">
                {promo.title}
              </h2>
              <p className="text-lg mb-8 max-w-sm text-slate-100">
                {promo.description}
              </p>
              <button className={`px-8 py-3 rounded-xl font-bold w-fit transition-colors ${promo.buttonClass}`}>
                {promo.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Offers;