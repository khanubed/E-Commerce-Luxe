import React, { useState, useEffect } from "react";
import { dealsSection } from "../data/home.js";
import { Timer, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "../components/shop/ProductCard.jsx";
import { useGetDealsOfTheDayQuery } from "../services/productApi.js";

// 🚨 IMPORT SWIPER CORE AND COMPONENTS
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// 🚨 IMPORT SWIPER STYLES (Make sure these are loaded in your main/index CSS if preferred)
import "swiper/css";
import "swiper/css/navigation";

const Deals = () => {
  const { title, description } = dealsSection;
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // 1. Fetch live products from database matrix using your RTK slice
  const {
    data: responsePayload,
    isLoading,
    error,
  } = useGetDealsOfTheDayQuery();

  // 2. Safely grab the unwrapped payload array
  const dealProducts = responsePayload?.products || responsePayload?.data || [];

  // 3. Strict 24-Hour Loop Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeLeft({
        days: 0,
        hours: 23 - now.getHours(),
        minutes: 59 - now.getMinutes(),
        seconds: 59 - now.getSeconds(),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="deals"
      className="py-12 bg-white border-b border-slate-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-8 relative overflow-x-hidden  ">
        {/* Header & Countdown Layout Timer block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-center md:justify-between mb-16 gap-8 pb-8 border-b border-slate-100">
          <div className="max-w-xl">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 mb-4 block">
              Exclusive Opportunity
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-slate-900">
              {title}
            </h2>
            <p className="text-slate-500 mt-4 text-sm font-medium leading-relaxed italic">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* Custom Navigation Arrows (Keeps UI matching your design language) */}
            {!isLoading && !error && dealProducts.length > 0 && (
              <div className="flex gap-2 mr-4">
                <button
                  id="deals-swiper-prev"
                  className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  id="deals-swiper-next"
                  className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Countdown Clock Display */}
            <div className="flex items-center gap-6 bg-slate-900 max-w-[300px] text-white p-6 md:p-8 ">
              <Timer size={20} className="text-amber-500 hidden md:block" />
              <div className="flex gap-6">
                <TimerUnit value={timeLeft.hours} label="Hrs" />
                <span className="text-slate-700 font-light text-2xl">:</span>
                <TimerUnit value={timeLeft.minutes} label="Min" />
                <span className="text-slate-700 font-light text-2xl">:</span>
                <TimerUnit value={timeLeft.seconds} label="Sec" />
              </div>
            </div>
          </div>
        </div>

        {/* 4. Live Render Matrix States */}
        {isLoading && (
          <div className="py-20 flex items-center justify-center">
            <Loader2 size={32} className="animate-spin text-slate-400" />
          </div>
        )}

        {error && (
          <div className="py-12 text-center text-red-500 text-sm font-bold">
            Failed to coordinate promotional product feeds.
          </div>
        )}

        {!isLoading && !error && dealProducts.length === 0 && (
          <div className="py-16 text-center border border-dashed border-slate-200 rounded-2xl">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">
              No promotions are actively running in this slot right now.
            </p>
          </div>
        )}

        {/* 🚨 DYNAMIC SINGLE ROW SWIPER CAROUSEL */}
        {!isLoading && !error && dealProducts.length > 0 && (
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: "#deals-swiper-prev",
              nextEl: "#deals-swiper-next",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={24} // Matches your gap-x-6 (24px) spacing design constraint
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 }, // sm
              1024: { slidesPerView: 4 }, // lg: Strict single row viewport frame layout
            }}
            className="!overflow-visible" // Keeps hover absolute elements (like the sliding bottom cart button) visible
          >
            {dealProducts.map((product) => (
              <SwiperSlide key={product._id || product.id}>
                <div className="pb-4">
                  {" "}
                  {/* Provides execution clearance room for subtle hover shadow expansions */}
                  <ProductCard {...product} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

const TimerUnit = ({ value, label }) => {
  const safeValue =
    typeof value === "number" && !isNaN(value) && value >= 0 ? value : 0;
  return (
    <div className="flex flex-col items-center min-w-[36px]">
      <span className="text-2xl font-black tracking-tighter tabular-nums text-white">
        {String(safeValue).padStart(2, "0")}
      </span>
      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 mt-1">
        {label}
      </span>
    </div>
  );
};

export default Deals;
