import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  return (
    <div className="bg-white flex flex-col">
      <main className="flex-grow min-h-screen flex flex-col md:flex-row">
        {/* Brand/Hero Section */}
        <section className="hidden md:flex relative md:w-5/12 lg:w-1/2 bg-slate-900 overflow-hidden items-center justify-center p-12">
          <div className="absolute inset-0 opacity-40">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDGr0Rm_gYpjnOWWKIRq2sNXgvpu5UFDosS7ZCySJWjtqL8IIyK7a3xxTjaFjDkpskGXv049ZdKoayxFowxfNJwU6gvMgq57hwOt1z0ZfO-rl9yGpQgJwhavodW5spP2rPldrAR2R0GWINmfxRqEFzsFtuneEPtPQuvuNOdn-rtFjwqImLPnmf7DYOg2itwwb0dFulhjtjcmt0MuzukNWk7cuGWEvrzXGiqcCd3l8uzX3jvDikXJtngm_FSI2omGRLe0_1TurjCu4" 
              alt="Luxury Interior" 
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/60 to-transparent"></div>
          
          <div className="relative z-10 max-w-md text-white">
            <div className="mb-8">
              <span className="text-white font-bold text-5xl tracking-tighter italic">LuxeStore</span>
            </div>
            <h2 className="text-5xl font-bold leading-tight mb-6">Join the elite circle of curated fashion.</h2>
            <p className="text-lg text-slate-300 opacity-90 leading-relaxed">
              Experience a world where craftsmanship meets modern elegance. Create your account to unlock personalized styling and exclusive early access.
            </p>
            

          </div>
        </section>

        {/* Signup Form Section */}
        <section className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 lg:p-24 bg-white">
          <Outlet/>
        </section>
      </main>

      {/* Global Footer */}
      <footer className="w-full border-t border-slate-100 bg-white py-8 px-8 md:px-12">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8">
            <span className="font-bold text-slate-900 text-xl tracking-tighter italic">LuxeStore</span>
            <span className="hidden md:block h-4 w-px bg-slate-200"></span>
            <p className="text-sm text-slate-400">© 2024 LuxeStore. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Support'].map(link => (
              <a key={link} className="text-[10px] uppercase font-bold tracking-widest text-slate-400 hover:text-slate-900 transition-colors" href={`#${link.toLowerCase()}`}>{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;