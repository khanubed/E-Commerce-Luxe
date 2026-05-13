import React from "react";
import { dealsSection } from "../data/home.js";
import { useState } from "react";
import { useEffect } from "react";
import { Handbag } from "lucide-react";
import { Heart } from "lucide-react";

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
    <section id="#deals" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header with Timer */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <h2 className="font-h2 text-h2 text-slate-900">{title}</h2>
            <p className="text-slate-500 mt-2">{description}</p>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-4 glass-panel px-6 py-3 rounded-full shadow-low">
            <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
              Ends In:
            </span>
            <div className="flex gap-4 font-mono text-xl font-bold text-slate-900">
              <span className="flex flex-col items-center">
                {timeLeft.hours}
                <small className="text-[10px] font-sans font-medium uppercase tracking-tight text-slate-400">
                  Hrs
                </small>
              </span>
              <span className="opacity-30">:</span>
              <span className="flex flex-col items-center">
                {timeLeft.minutes}
                <small className="text-[10px] font-sans font-medium uppercase tracking-tight text-slate-400">
                  Min
                </small>
              </span>
              <span className="opacity-30">:</span>
              <span className="flex flex-col items-center">
                {timeLeft.seconds}
                <small className="text-[10px] font-sans font-medium uppercase tracking-tight text-slate-400">
                  Sec
                </small>
              </span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-low hover-lift transition-all"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={product.image}
                  alt={product.name}
                />
                {/* Sale Badge */}
                <div className="absolute top-4 left-4 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {product.discountBadge}
                </div>
                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined">
                    <Heart></Heart>
                  </span>
                </button>
              </div>

              <div className="p-6">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  {product.category}
                </p>
                <h4 className="font-semibold text-slate-900 mb-2">
                  {product.name}
                </h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-900">
                      ${product.price}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>

                  <button className="bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                    <span className="material-symbols-outlined">
                      <Handbag />
                    </span>
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

export default Deals;
