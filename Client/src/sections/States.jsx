import React from "react";
import { statsData } from "../data/home.js";

const Stats = () => {
  return (
    <section className="py-24 bg-primary-container text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {statsData.map((stat) => (
            <div key={stat.id}>
              <div className="text-display font-display mb-2">{stat.value}</div>
              <p className="text-on-primary-container font-medium uppercase tracking-widest text-sm">
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
