import React from "react";
import { statsData } from "../data/home.js";

const Stats = () => {
  return (
    <section className="py-20 bg-slate-950 text-white overflow-hidden relative border-y border-slate-800">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4  gap-0 divide-x divide-slate-800 border-x border-slate-800">
          {statsData.map((stat) => (
            <div 
              key={stat.id} 
              className=" p-4 md:p-10 group hover:bg-slate-900 transition-colors duration-500"
            >
              {/* Value: Massive and Italicized for movement */}
              <div className="sm:text-3xl md:text-4xl lg:text-7xl font-black italic tracking-tighter mb-4 text-white group-hover:text-amber-500 transition-colors duration-500">
                {stat.value}
              </div>
              
              {/* Label: Small, wide tracking, and sharp */}
              <p className="text-slate-500 font-black uppercase tracking-[0.3em]  text-[10px] flex items-center gap-3">
                <span className="w-4 h-[1px] bg-amber-600"></span>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;