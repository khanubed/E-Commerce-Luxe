import React from "react";
import { heroData } from "../data/home";
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <section class="relative h-204.5 min-h-150 flex items-center overflow-hidden bg-slate-900">
      <div class="absolute inset-0 z-0">
        <img
          class="w-full h-full object-cover opacity-50"
          data-alt={heroData.backgroundImage.alt}
          src={heroData.backgroundImage.src}
        />
      </div>
      <div class="container mx-auto px-8 relative z-10 max-w-7xl">
        <div class="max-w-2xl text">
          <h1 class="font-display text-display mb-6">{heroData.title}</h1>
          <p class="font-body-lg text-body-lg mb-8 text-slate-200">
            {heroData.description}
          </p>
          <div class="flex space-x-4 max-md:flex-col gap-2.5">
            
            <Link to={'/shop'} class="bg-white text-slate-900 px-10 py-4  text-center w-55 rounded-xl font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-high">
              {heroData.primaryBtn.text}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
