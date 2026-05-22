import React from "react";
import Hero from "../sections/Hero";
import Categories from "../sections/Categories";
import Deals from "../sections/Deals";
import Offers from "../sections/Offers";
import Stats from "../sections/States"; 
import Testimonials from "../sections/Testimonials";
import FAQ from "../sections/FAQ";

const Home = () => {
  return (
    <main className="bg-white min-h-screen  dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <Hero />
      <div className="space-y-0"> 
        <Categories />
        <Deals />
        <Offers />
        <Stats />
        <Testimonials />
        <FAQ />
      </div>
    </main>
  );
};

export default Home;