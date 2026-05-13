import React from "react";
import Hero from "../sections/Hero";
import Categories from "../sections/Categories";
import Deals from "../sections/Deals";
import Offers from "../sections/Offers";
import Stats from "../sections/States"; // Corrected spelling
import Testimonials from "../sections/Testimonials";
import FAQ from "../sections/FAQ";

const Home = () => {
  return (
    <main className="bg-white">
      <Hero />
      <div className="space-y-0"> {/* Use 0 spacing; let borders define the sections */}
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