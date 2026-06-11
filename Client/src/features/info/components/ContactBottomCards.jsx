import React from "react";
import { cardData } from "../../../data/contact.jsx";
import { MoveRight } from "lucide-react";

const ContactBottomCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="p-8 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all duration-500 group cursor-pointer"
        >
          <span className="material-symbols-outlined text-slate-900 text-3xl mb-6 block">
            {card.icon}
          </span>

          <h4 className="text-xl font-bold text-slate-900 mb-4">
            {card.title}
          </h4>

          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            {card.desc}
          </p>

          <a
            href="#"
            className="text-[11px] font-bold text-slate-900 uppercase tracking-widest inline-flex items-center group-hover:translate-x-2 transition-transform duration-300"
          >
            Explore
            <span className="material-symbols-outlined ml-2 text-sm">
              <MoveRight />
            </span>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ContactBottomCards;
