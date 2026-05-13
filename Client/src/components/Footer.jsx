import React from 'react';
import { footerData } from '../data/home.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  const { brand, links, copyright } = footerData;

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Column */}
 <div className="lg:col-span-4">
            <h3 className="text-white text-2xl font-display font-bold mb-6 italic">
              {brand.name}
            </h3>
            <p className="mb-8 leading-relaxed text-slate-400 max-w-sm">
              {brand.description}
            </p>
            
            {/* SOCIAL ICONS START */}
            <div className="flex gap-4">
              {brand.socials.map((social) => (
                <a 
                  key={social.id} 
                  href={social.href} 
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 hover:border-white transition-all duration-300"
                >
                  <FontAwesomeIcon icon={social.icon} className="text-sm" />
                </a>
              ))}
            </div>
            {/* SOCIAL ICONS END */}
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            {links.map((group) => (
              <div key={group.title}>
                <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
                  {group.title}
                </h4>
                <ul className="space-y-4">
                  {group.items.map((item) => (
                    <li key={item}>
                      <a href={`#${item.replace(/\s+/g, '-').toLowerCase()}`} className="hover:text-white transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Stay Inspired
            </h4>
            <p className="text-sm text-slate-400 mb-6">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-white text-slate-900 px-4 rounded-lg font-bold text-sm hover:bg-slate-200 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
          <p>{copyright}</p>
          <div className="flex gap-8">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#cookies" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;