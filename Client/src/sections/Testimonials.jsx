import React from 'react';
import { testimonialsData } from '../data/home.js';
import { Star, StarHalf, Quote } from 'lucide-react';

const Testimonials = () => {
  const { title, description, reviews } = testimonialsData;

  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* 1. Header Transformation: Editorial & Left-Aligned */}
        <div className="mb-20">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 mb-4 block">
            The Inner Circle
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-slate-900 mb-6">
            {title}
          </h2>
          <p className="text-slate-500 max-w-xl font-medium border-l-2 border-slate-900 pl-6">
            {description}
          </p>
        </div>

        {/* 2. Reviews Grid: Sharp Architectural Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className={`relative flex flex-col p-5 md:p-10 bg-slate-50 transition-all duration-500 hover:bg-white border-t-4 ${
                review.featured ? 'border-amber-500' : 'border-slate-900'
              }`}
            >
              {/* Subtle Quote Icon */}
              <Quote size={40} className="absolute top-6 right-6 text-slate-200/50" />

              {/* Star Rating: Simplified for Luxury Vibe */}
              <div className="flex gap-1 text-amber-500 mb-8 scale-75 origin-left">
                {[1, 2, 3, 4, 5].map((star) => {
                  let icon = <Star size={16} fill="currentColor" />;
                  if (review.rating < star) {
                    icon = review.rating > star - 1 ? <StarHalf size={16} fill="currentColor" /> : <Star size={16} />;
                  }
                  return <span key={star}>{icon}</span>;
                })}
              </div>

              {/* The Review Text: Pull-Quote Style */}
              <p className= " text-sm md:text-lg font-bold leading-relaxed text-slate-800 mb-10 tracking-tight">
                "{review.text}"
              </p>

              {/* User Identity: Minimalist */}
              <div className="mt-auto flex items-center gap-4">
                <div className="relative">
                  <img
                    className="w-12 h-12 rounded-none object-cover grayscale"
                    src={review.image}
                    alt={review.name}
                  />
                  <div className="absolute inset-0 border border-slate-900/10" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900">
                    {review.name}
                  </h4>
                  <p className="text-[9px] font-bold text-amber-600 uppercase tracking-widest mt-1">
                    {review.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;