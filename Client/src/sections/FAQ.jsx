import React, { useState } from 'react';
import { faqData } from '../data/home.js';
import { ChevronDown } from 'lucide-react';

const FAQ= () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[800px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="font-h2 text-h2 text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500">
            Everything you need to know about the LuxeStore experience.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;
            
            return (
              <div 
                key={faq.id}
                className="border border-slate-200 rounded-2xl overflow-hidden shadow-low transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className={`w-full flex items-center justify-between p-6 text-left transition-colors ${
                    isOpen ? 'bg-slate-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <span className="font-semibold text-slate-900">
                    {faq.question}
                  </span>
                  <span 
                    className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <ChevronDown />
                  </span>
                </button>
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden ">
                    <div className="px-6 py-6 text-slate-500">
                      {faq.answer}
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