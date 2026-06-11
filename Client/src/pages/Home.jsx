import React, { useEffect } from "react";
import Hero from "../sections/Hero";
import Categories from "../sections/Categories";
import Deals from "../sections/Deals";
import Offers from "../sections/Offers";
import Stats from "../sections/States";
import Testimonials from "../sections/Testimonials";
import FAQ from "../sections/FAQ";
// import { useFetchPublicHomeContentQuery } from "../services/homeContentApi";
import { Loader2 } from "lucide-react";
import { useFetchPublicHomeContentQuery } from "../features/info/homeContentApi";

const Home = () => {
  const { data: homeContent, isLoading } = useFetchPublicHomeContentQuery();

  useEffect(() => {
    if (!isLoading && homeContent) {
      console.log("Home Content", homeContent.data.categorySection);
    }
  }, [homeContent, isLoading]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <Loader2 className="animate-spin text-slate-900 dark:text-white" size={40} />
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen  dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <Hero heroData={homeContent?.data?.heroData} />
      <div className="space-y-0">
        <Categories categorySection={homeContent?.data?.categorySection} />
        <Deals dealsData={homeContent?.data?.dealsSection} />
        <Offers offersData={homeContent?.data?.offersSection} />
        <Stats  />
        <Testimonials />
        <FAQ />
      </div>
    </main>
  );
};

export default Home;
