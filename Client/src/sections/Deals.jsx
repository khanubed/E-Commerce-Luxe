import React, { useState, useEffect } from "react";
import { dealsSection } from "../data/home.js";
import { Handbag, Heart, Timer } from "lucide-react";

const Deals = () => {
  const { title, description, products, targetDate } = dealsSection;
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = new Date(targetDate) - new Date();
      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section id="#deals" className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* 1. Header & Timer Transformation */}
        <div className="flex flex-col lg:flex-row lg:items-end  justify-center md:justify-between mb-16 gap-8 pb-8 border-b border-slate-100">
          <div className="max-w-xl">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 mb-4 block">
              Exclusive Opportunity
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-slate-900">
              {title}
            </h2>
            <p className="text-slate-500 mt-4 text-sm font-medium leading-relaxed italic">
              {description}
            </p>
          </div>

          {/* Countdown: Swapped 'Glass Pill' for 'Architectural Grid' */}
          <div className="flex items-center gap-6 bg-slate-900 max-w-[300px]  text-white p-6 md:p-8 ">
            <Timer size={20} className="text-amber-500 hidden md:block" />
            <div className="flex gap-6">
              <TimerUnit value={timeLeft.hours} label="Hrs" />
              <span className="text-slate-700 font-light text-2xl">:</span>
              <TimerUnit value={timeLeft.minutes} label="Min" />
              <span className="text-slate-700 font-light text-2xl">:</span>
              <TimerUnit value={timeLeft.seconds} label="Sec" />
            </div>
          </div>
        </div>

        {/* 2. Product Grid: Minimalist & Sharp */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white overflow-hidden transition-all duration-500"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-50">
                <img
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
                  src={product.image}
                  alt={product.name}
                />
                
                {/* Sharp Badge */}
                <div className="absolute top-0 left-0 bg-amber-500 text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest">
                  {product.discountBadge}
                </div>

                {/* Wishlist Icon - Minimalist */}
                <button className="absolute top-4 right-4 text-slate-900 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  <Heart size={20} strokeWidth={1.5} />
                </button>
              </div>

              <div className="p-8">
                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">
                  {product.category}
                </p>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-tight mb-4 group-hover:text-amber-600 transition-colors">
                  {product.name}
                </h4>
                
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xl font-black text-slate-900 tracking-tighter">
                      ${product.price}
                    </span>
                    <span className="text-xs text-slate-400 line-through font-medium">
                      ${product.originalPrice}
                    </span>
                  </div>

                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-amber-600 transition-colors">
                    Add <Handbag size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Helper Component for the Timer Units
const TimerUnit = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-2xl font-black tracking-tighter">
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">
      {label}
    </span>
  </div>
);

export default Deals;