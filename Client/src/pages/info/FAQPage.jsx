import React, { useState } from "react";
import { 
  Plus, 
  Minus, 
  HelpCircle, 
  Truck, 
  RefreshCcw, 
  ShieldCheck, 
  CreditCard 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();
  const faqData = [
    {
      category: "Logistics & Delivery",
      icon: <Truck size={18} />,
      questions: [
        {
          q: "How are shipping costs calculated for large items?",
          a: "For heavy-duty categories like Furniture and Automotive parts, shipping is calculated based on weight, dimensions, and your distribution zone. Exact rates are displayed at the final stage of checkout."
        },
        {
          q: "Do you offer international shipping?",
          a: "Yes. We ship to over 50 countries. International transit times vary by region but generally range between 7–14 business days via our global logistics partners."
        }
      ]
    },
    {
      category: "Orders & Returns",
      icon: <RefreshCcw size={18} />,
      questions: [
        {
          q: "What is your return protocol for fashion and electronics?",
          a: "Fashion items must be returned within 30 days with original tags. Electronics and Personal Care products must be unopened in their original vacuum-seal or packaging to qualify for a return."
        },
        {
          q: "Can I modify my order after confirmation?",
          a: "Orders enter our processing stream immediately. You can modify details within 60 minutes of placement via your dashboard. After this window, the manifest is locked for dispatch."
        }
      ]
    },
    {
      category: "Payments & Security",
      icon: <ShieldCheck size={18} />,
      questions: [
        {
          q: "Which payment methods are verified?",
          a: "We accept all major Credit/Debit cards (Visa, Mastercard, Amex), Digital Wallets, and Cash on Delivery (COD) for eligible regional zones."
        },
        {
          q: "Is my financial data encrypted?",
          a: "Every transaction is processed through an SSL-encrypted gateway. We do not store raw credit card data on our internal servers."
        }
      ]
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 font-sans">
      <div className="max-w-[1000px] mx-auto px-6">
        
        {/* HEADER SECTION */}
        <div className="border-b-[6px] border-slate-900 pb-12 mb-16">
          <h1 className="text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            Support<br />Center<span className="text-blue-600">.</span>
          </h1>
          <p className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-400">
            Frequently Asked Questions / Operational Protocols
          </p>
        </div>

        {/* FAQ ACCORDION */}
        <div className="space-y-16">
          {faqData.map((section, sIdx) => (
            <div key={sIdx} className="group">
              <div className="flex items-center gap-3 mb-8 text-blue-600">
                {section.icon}
                <h2 className="text-sm font-black uppercase tracking-[0.2em]">{section.category}</h2>
              </div>

              <div className="border-t-2 border-slate-900">
                {section.questions.map((item, qIdx) => {
                  const uniqueIndex = `${sIdx}-${qIdx}`;
                  const isOpen = openIndex === uniqueIndex;

                  return (
                    <div 
                      key={qIdx} 
                      className={`border-b-2 border-slate-900 transition-all ${isOpen ? 'bg-slate-50' : 'bg-white hover:bg-slate-50'}`}
                    >
                      <button
                        onClick={() => toggleFAQ(uniqueIndex)}
                        className="w-full flex justify-between items-center p-8 text-left transition-all"
                      >
                        <span className="text-lg font-black uppercase tracking-tight pr-8">
                          {item.q}
                        </span>
                        <div className="shrink-0 border-2 border-slate-900 p-1">
                          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                        </div>
                      </button>

                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-8 pb-8 text-slate-500 font-bold text-sm leading-relaxed uppercase max-w-[800px]">
                          {item.a}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER CTA */}
        <div className="mt-24 p-12 border-4 border-slate-900 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tighter">Still need assistance?</h3>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-2">
              Our support team is active 24/7 for urgent inquiries.
            </p>
          </div>
          <button onClick={()=>navigate('../contact')} className="bg-slate-900 text-white px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all active:scale-[0.98]">
            Contact Protocol
          </button>
        </div>

      </div>
    </div>
  );
};

export default FAQPage;