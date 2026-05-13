import React from 'react';
import { 
  ArrowUpRight, 
  Code2, 
  Palette, 
  BarChart, 
  Briefcase,
  Globe
} from 'lucide-react';

const CareersPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* 1. HERO: THE INVITATION */}
      <section className="pt-32 pb-24 px-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 mb-6 block">
            Work with LuxeStore
          </span>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-12">
            Build the <br /> 
            <span className="text-slate-200 italic font-light">Future of</span> <br /> 
            Excellence.
          </h1>
          <p className="max-w-2xl text-lg text-slate-500 font-medium leading-relaxed">
            We are looking for the outliers. The perfectionists. The ones who 
            believe that "good enough" is the enemy of the exceptional. 
            Join our global team in redefining digital luxury.
          </p>
        </div>
      </section>

      {/* 2. CULTURE PILLARS: THE LUXE WAY */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 border-l-4 border-slate-900 pl-4">
                Autonomy
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                We hire experts and get out of their way. At LuxeStore, you own 
                your projects from ideation to deployment.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 border-l-4 border-slate-900 pl-4">
                Craftsmanship
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Whether it's a line of code or a marketing campaign, we 
                prioritize quality over speed. Every detail matters.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 border-l-4 border-slate-900 pl-4">
                Global Impact
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Our team spans 12 countries. We operate in a remote-first 
                environment that values diversity of thought and location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OPEN ROLES: THE ARCHIVES */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16 border-b border-slate-100 pb-8">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Open Positions</h2>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Showing 04 Roles
            </span>
          </div>

          <div className="divide-y divide-slate-100 border-b border-slate-100">
            <JobRow 
              title="Senior Product Designer" 
              dept="Design" 
              loc="Remote / London" 
              icon={<Palette size={18} />}
            />
            <JobRow 
              title="Full Stack Engineer (React/Go)" 
              dept="Engineering" 
              loc="Remote" 
              icon={<Code2 size={18} />}
            />
            <JobRow 
              title="Luxury Brand Manager" 
              dept="Marketing" 
              loc="NYC Hub" 
              icon={<Briefcase size={18} />}
            />
            <JobRow 
              title="Data Analyst" 
              dept="Operations" 
              loc="Remote / Tokyo" 
              icon={<BarChart size={18} />}
            />
          </div>
        </div>
      </section>

      {/* 4. PERKS: LUXE BENEFITS */}
      <section className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 leading-none">
              Exceptional <br/> Work Deserves <br/> Exceptional Rewards.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <Benefit item="Competitive Equity" />
              <Benefit item="Health & Wellness Stipend" />
              <Benefit item="Annual Learning Budget" />
              <Benefit item="Global Co-working Access" />
            </div>
          </div>
          <div className="aspect-square border border-white/10 p-12 flex flex-col justify-between">
            <Globe size={48} strokeWidth={1} className="text-amber-500" />
            <div>
              <p className="text-3xl font-black tracking-tighter uppercase leading-none mb-4">
                100% <br/> Distributed.
              </p>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-relaxed">
                We don't care where you work, as long as your work is world-class.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER CTA */}
      <section className="py-32 text-center">
        <h2 className="text-lg font-black uppercase tracking-tighter mb-8">
          Don’t see a fit?
        </h2>
        <button className="px-12 py-5 border-2 border-slate-900 text-slate-900 font-black uppercase text-xs tracking-[0.3em] hover:bg-slate-900 hover:text-white transition-all duration-300">
          Send a Spontaneous Application
        </button>
      </section>

    </div>
  );
};

const JobRow = ({ title, dept, loc, icon }) => (
  <div className="group flex flex-col md:flex-row md:items-center justify-between py-10 hover:px-6 hover:bg-slate-50 transition-all cursor-pointer">
    <div className="flex items-center gap-6">
      <div className="text-slate-300 group-hover:text-amber-600 transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-black uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">
          {title}
        </h3>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
          {dept}
        </p>
      </div>
    </div>
    <div className="mt-4 md:mt-0 flex items-center gap-8">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{loc}</span>
      <div className="p-3 border border-slate-200 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all">
        <ArrowUpRight size={16} />
      </div>
    </div>
  </div>
);

const Benefit = ({ item }) => (
  <div className="flex items-center gap-3">
    <div className="w-1.5 h-1.5 bg-amber-500" />
    <span className="text-xs font-bold uppercase tracking-widest text-slate-300">{item}</span>
  </div>
);

export default CareersPage;