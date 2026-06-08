import React from 'react';
// import { categorySection } from '../data/home.js';
import { MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Categories = ({categorySection}) => {

  const { title, subtitle, viewAllLink, categories } = categorySection;

  return (
    /* Kept your original py-24, shifted background to clean white for that gallery feel */
    <section id='#categories' className="py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* 1. Header Transformation: Editorial Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 mb-4 block">
              Curated Selection
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-slate-900">
              {title}
            </h2>
            <p className="text-slate-500 mt-4 text-sm font-medium uppercase tracking-tight border-l-2 border-slate-900 pl-4">
              {subtitle}
            </p>
          </div>
          
          {/* Added a 'View All' link that fits the Luxe theme */}
          <Link to={viewAllLink || "/shop"} className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 hover:text-amber-600 transition-colors">
            Explore All Collections <MoveRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* 2. Grid Transformation: Architectural Sharpness */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((item) => (
            <Link
              to={item.to}
              key={item.id}
              /* Changed rounded-2xl to rounded-none for the boutique aesthetic */
              className="group relative overflow-hidden aspect-[4/5] bg-slate-100 cursor-pointer border border-transparent hover:border-slate-200 transition-all"
            >
              <img
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1200ms]"
                src={item.image}
                alt={item.alt}
              />

              {/* Refined the overlay: lighter, more sophisticated gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
              
              <div className="absolute bottom-8 left-8 right-8">
                {/* Typography Transform: Sharp and bold */}
                <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <p className="text-amber-400 text-[10px] font-black uppercase tracking-widest italic">{item.count}</p>
                  <MoveRight size={14} className="text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Categories;