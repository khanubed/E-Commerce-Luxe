import React from 'react';
import { footerData } from '../data/home.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { brand, links, copyright } = footerData;

  return (
    <footer className="bg-slate-950 text-slate-400 pt-12 pb-12 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-12">
          
          {/* 1. Brand Column */}
          <div className="lg:col-span-4">
            <h3 className="text-white text-3xl font-black uppercase tracking-[0.2em] mb-8 leading-none">
              {brand.name}<span className="text-amber-600">.</span>
            </h3>
            <p className="mb-10 leading-relaxed font-medium text-slate-500 max-w-sm italic">
              {brand.description}
            </p>
            
            <div className="flex gap-3">
              {brand.socials.map((social) => (
                <a 
                  key={social.id} 
                  href={social.href} 
                  className="w-12 h-12 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-slate-950 transition-all duration-500"
                >
                  <FontAwesomeIcon icon={social.icon} className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Navigation: Mapping to specific router paths */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-12">
            {links.map((group) => (
              <div key={group.title}>
                <h4 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[10px]">
                  {group.title}
                </h4>
                <ul className="space-y-4">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <Link 
                        to={item.path} 
                        className="text-[11px] font-bold uppercase tracking-widest hover:text-amber-600 transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 3. Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[10px]">
              The Edit
            </h4>
            <p className="text-[11px] font-medium tracking-wide text-slate-500 mb-8 uppercase">
              Exclusive drops and architectural insights.
            </p>
            <form className="group relative border-b border-white/20 focus-within:border-white transition-colors duration-500">
              <input 
                type="email" 
                placeholder="YOUR EMAIL" 
                className="w-full bg-transparent py-4 pr-12 text-white text-[10px] font-bold tracking-widest uppercase focus:outline-none placeholder:text-slate-700"
              />
              <button 
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white group-hover:text-amber-600 transition-colors"
              >
                <ArrowRight size={18} strokeWidth={3} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
            {copyright}
          </p>
          
          <div className="flex gap-10">
            {/* These can remain as anchors or be updated to Link if you add routes for them */}
            {['Privacy', 'Terms', 'Cookies'].map((policy) => (
              <Link 
                key={policy}
                to={`/${policy.toLowerCase()}`} 
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 hover:text-white transition-colors"
              >
                {policy}
              </Link>
            ))}
          </div>
          
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-800">
            Created for <span className="text-slate-600">LuxeStore</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;