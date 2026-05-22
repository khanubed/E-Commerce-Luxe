import React, { useState } from 'react';
import { faqData } from '../data/home.js';
import { Plus, Minus } from 'lucide-react'; // Swapped Chevron for a more surgical Plus/Minus

const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id='faq' className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-8">
        
        {/* 1. Header: Clean & Bold */}
        <div className="mb-20">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 mb-4 block">
            Customer Care
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-slate-900 mb-6">
            Inquiries
          </h2>
          <p className="text-slate-500 font-medium border-l-2 border-slate-900 pl-6">
            Everything you need to know about the LuxeStore experience.
          </p>
        </div>

        {/* 2. FAQ List: Sharp Border-Top Style */}
        <div className="border-t border-slate-900">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;
            
            return (
              <div 
                key={faq.id}
                className="border-b border-slate-100 transition-all duration-500"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between py-10 text-left group"
                >
                  <span className={`text-lg md:text-xl font-bold uppercase tracking-tight transition-colors duration-300 ${
                    isOpen ? 'text-amber-600' : 'text-slate-900 group-hover:text-amber-600'
                  }`}>
                    {/* Added leading zero/index for a technical look */}
                    <span className="mr-6 text-[10px] font-black text-slate-300">0{faq.id}</span>
                    {faq.question}
                  </span>
                  
                  {/* Icon Toggle: Swapped to Plus/Minus for a cleaner look */}
                  <span className="text-slate-900 transition-transform duration-500">
                    {isOpen ? <Minus size={20} strokeWidth={3} /> : <Plus size={20} strokeWidth={3} />}
                  </span>
                </button>

                {/* Animation Container: Kept your original grid-row logic */}
                <div 
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-10 pl-12 md:pl-16 max-w-2xl">
                      <p className="text-slate-500 leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;