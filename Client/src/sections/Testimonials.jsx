import React from 'react';
import { testimonialsData } from '../data/home.js';
import { Star } from 'lucide-react';
import { StarHalf } from 'lucide-react';

const Testimonials = () => {
  const { title, description, reviews } = testimonialsData;

  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-h2 text-h2 text-slate-900 mb-4">{title}</h2>
          <p className="text-slate-500 max-w-xl mx-auto">{description}</p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className={`glass-panel p-8 rounded-3xl shadow-low transition-all hover:shadow-md ${
                review.featured ? 'border-secondary/20' : ''
              }`}
            >
              {/* Star Rating Logic */}
              <div className="flex gap-1 text-amber-400 mb-6">
                {[1, 2, 3, 4, 5].map((star) => {
                  let icon = <Star fill="#FFCA28"/>;
                  if (review.rating < star) {
                    icon = review.rating > star - 1 ? <StarHalf fill="#FFCA28"/> : <Star></Star>;
                  }
                  return (
                    <span 
                      key={star}
                      className="material-symbols-outlined" 
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      {icon}
                    </span>
                  );
                })}
              </div>

              <p className="text-slate-700 italic mb-8">"{review.text}"</p>

              <div className="flex items-center gap-4">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={review.image}
                  alt={review.name}
                />
                <div>
                  <h4 className="font-bold text-slate-900">{review.name}</h4>
                  <p className="text-xs text-slate-400">{review.status}</p>
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