import React from "react";
import { Link } from "react-router-dom";
// 1. Import Swiper React components and styles

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { ProductCard } from "../../../components/shared/ProductCard";

export const RelatedProductsSlider = ({ relatedProducts }) => {
  return (
    <section className="border-t border-slate-100 pt-12 mb-20">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
            You Might Also Like
          </h2>
          <p className="text-slate-400 text-sm mt-2 font-medium">
            Explore more from this collection
          </p>
        </div>

        <div className="hidden md:flex gap-3">
          <button className="swiper-prev-button p-3 rounded-full border border-slate-200 hover:bg-slate-900 hover:text-white transition-all">
            <ArrowLeft size={18} />
          </button>
          <button className="swiper-next-button p-3 rounded-full border border-slate-200 hover:bg-slate-900 hover:text-white transition-all">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, FreeMode]}
        spaceBetween={24}
        slidesPerView={1.2} // Shows a peek of the next slide on mobile
        freeMode={true}
        navigation={{
          nextEl: ".swiper-next-button",
          prevEl: ".swiper-prev-button",
        }}
        breakpoints={{
          // Responsive breakpoints
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="related-products-swiper"
      >
        {relatedProducts.map((item) => (
          <SwiperSlide key={item.id} className="pb-12">
            <ProductCard key={item.id} {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RelatedProductsSlider;