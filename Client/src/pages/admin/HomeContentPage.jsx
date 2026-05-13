import React, { useState } from 'react';
// Importing your data.js exports
import { 
  heroData, 
  dealsSection, 
  offersSection, 
  categorySection 
} from '../../data/home'; 
import { Eye, Grid, HomeIcon, Timer } from 'lucide-react';

const HomeContentPage = () => {
  // 1. Initialize state with your data.js structures
  const [hero, setHero] = useState(heroData);
  const [deals, setDeals] = useState(dealsSection.products);
  const [offers, setOffers] = useState(offersSection);

  const handlePublish = () => {
    // This object matches your data.js structure for easy saving
    const updatedData = {
      heroData: hero,
      dealsSection: {
        ...dealsSection,
        products: deals
      },
      offersSection: offers
    };
    console.log("Saving to data.js structure:", updatedData);
    alert("Homepage updated! Check console for data payload.");
  };

  return (
    <main className="p-8 bg-slate-50 min-h-screen space-y-12">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-display text-4xl font-bold text-slate-900">Homepage Content</h2>
          <p className="text-slate-500 mt-2">Manage your storefront's visual identity and daily promotions.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-white transition-colors">
            Preview Changes
          </button>
          <button 
            onClick={handlePublish}
            className="px-8 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-all shadow-lg"
          >
            Publish Update
          </button>
        </div>
      </div>

      {/* Hero Banner Configuration */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-indigo-600"><HomeIcon/></span>
          <h3 className="text-xl font-bold text-slate-900">Hero Banner</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Main Heading</label>
              <input 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none" 
                value={hero.title}
                onChange={(e) => setHero({...hero, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Subtext</label>
              <textarea 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none" 
                rows="3"
                value={hero.description}
                onChange={(e) => setHero({...hero, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Button Text</label>
                <input 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl" 
                  value={hero.primaryBtn.text}
                  onChange={(e) => setHero({
                    ...hero, 
                    primaryBtn: {...hero.primaryBtn, text: e.target.value}
                  })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Button Link</label>
                <input 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl" 
                  value={hero.primaryBtn.link}
                  onChange={(e) => setHero({
                    ...hero, 
                    primaryBtn: {...hero.primaryBtn, link: e.target.value}
                  })}
                />
              </div>
            </div>
          </div>

          <div className="relative group">
            <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Banner Asset</label>
            <div className="relative aspect-[16/9] bg-slate-100 rounded-2xl overflow-hidden border-2 border-dashed border-slate-200 flex items-center justify-center">
              <img 
                src={hero.backgroundImage.src} 
                alt="Preview" 
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <div className="z-10 text-center flex flex-col items-center p-6 bg-white shadow-xl rounded-2xl">
                <span className="material-symbols-outlined text-center text-indigo-600 mb-2"><Eye/></span>
                <p className="font-bold text-sm text-slate-900">Change Image</p>
                <p className="text-[10px] text-slate-500">Path: assets/images/hero.png</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deals of the Day - Mapping products from dealsSection */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-indigo-600"><Timer/></span>
            <h3 className="text-xl font-bold text-slate-900">{dealsSection.title}</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((product, index) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
              <div className="h-40 relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 px-2 py-1 bg-indigo-600 text-white font-bold text-[10px] rounded-lg">
                  {product.discountBadge}
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.category}</label>
                  <input 
                    className="w-full font-bold text-slate-900 bg-transparent border-none p-0 focus:ring-0"
                    value={product.name}
                    onChange={(e) => {
                      const newDeals = [...deals];
                      newDeals[index].name = e.target.value;
                      setDeals(newDeals);
                    }}
                  />
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-900">${product.price}</span>
                    <span className="text-xs line-through text-slate-400">${product.originalPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Secondary Banners - Mapping offersSection */}
      <section className="space-y-8 pb-12">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-indigo-600"><Grid/></span>
          <h3 className="text-xl font-bold text-slate-900">Secondary Banners (Offers)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer, index) => (
            <div key={offer.id} className="bg-white rounded-2xl p-6 flex gap-6 border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors">
              <div className="w-32 h-32 rounded-xl overflow-hidden shrink-0 shadow-inner">
                <img src={offer.image} className="w-full h-full object-cover" alt={offer.title} />
              </div>
              <div className="flex-grow space-y-2">
                <div className="flex justify-between">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${offer.tagClass.replace('text-', 'text-')}`}>
                    {offer.tag}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                <input 
                  className="w-full font-bold text-lg text-slate-900 border-none p-0 focus:ring-0" 
                  value={offer.title}
                  onChange={(e) => {
                    const newOffers = [...offers];
                    newOffers[index].title = e.target.value;
                    setOffers(newOffers);
                  }}
                />
                <p className="text-xs text-slate-500 leading-relaxed">{offer.description}</p>
                <div className="pt-2">
                   <button className="text-[10px] font-bold text-indigo-600 uppercase hover:underline">Edit Banner Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomeContentPage;