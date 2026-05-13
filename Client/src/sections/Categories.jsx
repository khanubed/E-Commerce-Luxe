import React from 'react';
import { categorySection } from '../data/home.js';
import {  MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const { title, subtitle, viewAllLink, categories } = categorySection;

  return (
    <section id='#categories' className="py-24 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-h2 text-h2 text-slate-900">{title}</h2>
            <p className="text-slate-500 mt-2">{subtitle}</p>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((item) => (
            <Link
              to = {item.to}
              key={item.id}
              className="group relative overflow-hidden rounded-2xl aspect-4/5 bg-slate-100 hover-lift cursor-pointer"
            >
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                src={item.image}
                alt={item.alt}
              />

              <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6">
                <h3 className="font-h3 text-h3 text-white mb-1">{item.title}</h3>
                <p className="text-white/80 text-sm">{item.count}</p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Categories;