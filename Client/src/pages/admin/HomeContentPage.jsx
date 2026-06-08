import React, { useState, useEffect } from 'react';
import { 
  useFetchPublicHomeContentQuery, 
  useUpdateAdminHomeContentMutation 
} from '../../services/homeContentApi'; 
import { Eye, Grid, HomeIcon, Timer, Loader2 } from 'lucide-react';

const HomeContentPage = () => {
  // 1. Fetch live settings data from MongoDB
  const { data: remoteData, isLoading: fetchLoading } = useFetchPublicHomeContentQuery();
  
  // 2. Setup the save handler mutation function
  const [updateHomeContent, { isLoading: isPublishing }] = useUpdateAdminHomeContentMutation();

  // Local Form states
  const [hero, setHero] = useState(null);
  const [deals, setDeals] = useState([]);
  const [offers, setOffers] = useState([]);

  // Sync database response to state fields safely
  useEffect(() => {
    if (remoteData?.data) {
      setHero(remoteData.data.heroData);
      setDeals(remoteData.data.dealsSection?.products || []);
      setOffers(remoteData.data.offersSection || []);
    }
  }, [remoteData]);

  const handlePublish = async () => {
    try {
      const fullPayload = {
        heroData: hero,
        dealsSection: {
          ...remoteData?.data?.dealsSection,
          products: deals
        },
        offersSection: offers,
        categorySection: remoteData?.data?.categorySection // preserves unchanged subfields safely
      };

      await updateHomeContent(fullPayload).unwrap();
      alert("Homepage elements successfully synced live to production MongoDB database!");
    } catch (err) {
      alert("Failed to sync database modifications: " + (err?.data?.message || err.message));
    }
  };

  if (fetchLoading || !hero) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-slate-900" size={40} />
      </div>
    );
  }

  return (
    <main className="p-8 bg-slate-50 min-h-screen space-y-12">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-display text-4xl font-bold text-slate-900">Homepage Content</h2>
          <p className="text-slate-500 mt-2">Manage your storefront's visual identity and daily promotions.</p>
        </div>
        <div className="flex gap-4">
          <button 
            disabled={isPublishing}
            onClick={handlePublish}
            className="px-8 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 disabled:bg-slate-400 transition-all shadow-lg flex items-center gap-2"
          >
            {isPublishing && <Loader2 className="animate-spin" size={16} />}
            Publish Update
          </button>
        </div>
      </div>

      {/* Hero Banner Configuration */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-indigo-600"><HomeIcon/></span>
          <h3 className="text-xl font-bold text-slate-900">Hero Banner</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Main Heading</label>
              <input 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none" 
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
          </div>

          <div className="relative group">
            <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Banner Image URL</label>
            <input 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl mb-4 text-xs font-mono" 
              value={hero.backgroundImage.src}
              onChange={(e) => setHero({
                ...hero, 
                backgroundImage: { ...hero.backgroundImage, src: e.target.value }
              })}
            />
          </div>
        </div>
      </section>

    </main>
  );
};

export default HomeContentPage;