import React, { useState } from 'react';
import { 
  Settings, User, Lock, Bell, Globe, 
  ShieldCheck, Database, CreditCard, Save,
  RefreshCcw, Moon, Eye, Smartphone
} from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const navigation = [
    { id: 'general', label: 'General', icon: <Settings size={18} /> },
    { id: 'security', label: 'Security', icon: <Lock size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'billing', label: 'Billing & Plan', icon: <CreditCard size={18} /> },
  ];

  return (
    <main className="flex-1 py-10 px-8 max-w-[1200px] mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Settings</h2>
          <p className="text-slate-500 font-medium mt-1">Configure your administrative workspace and preferences.</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.15em] shadow-xl shadow-slate-200 hover:scale-[1.02] active:scale-[0.98] transition-all">
          <Save size={16} /> Save Changes
        </button>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Navigation */}
        {/* <aside className="lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === item.id 
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-100' 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-12 p-6 bg-slate-900 rounded-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-2">Current Plan</p>
              <h4 className="text-white text-lg font-bold mb-4">Enterprise Pro</h4>
              <button className="text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                Upgrade <RefreshCcw size={12} />
              </button>
            </div>
            <Database className="absolute -right-4 -bottom-4 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-500" size={100} />
          </div>
        </aside> */}

        {/* Settings Form Canvas */}
        <section className="flex-1 space-y-8">
          {/* Section: Profile */}
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-slate-50 rounded-xl text-slate-900">
                <User size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Public Profile</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Admin Username</label>
                <input 
                  type="text" 
                  defaultValue="Ubed Khan" 
                  className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-slate-900/5 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="ubedkhan@lx-admin.com" 
                  className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-slate-900/5 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section: System Preferences */}
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-slate-50 rounded-xl text-slate-900">
                <Globe size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">System Preferences</h3>
            </div>

            <div className="space-y-6">
              <SettingToggle 
                icon={<Moon size={18} />} 
                title="Dark Mode" 
                description="Switch to a dark interface for reduced eye strain."
                active={false}
              />
              <SettingToggle 
                icon={<Eye size={18} />} 
                title="Real-time Analytics" 
                description="Enable live data stream on your primary dashboard."
                active={true}
              />
              <SettingToggle 
                icon={<Smartphone size={18} />} 
                title="Mobile Push Notifications" 
                description="Receive instant alerts for high-value orders."
                active={true}
              />
            </div>
          </div>

          {/* Section: Security */}
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-slate-50 rounded-xl text-slate-900">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Privacy & Security</h3>
            </div>
            
            <p className="text-slate-500 text-sm font-medium mb-8">
              Keep your account secure by enabling advanced authentication methods.
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <button className="flex-1 border border-slate-200 rounded-2xl p-6 text-left hover:border-slate-900 hover:shadow-sm transition-all group">
                <h4 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-slate-900">Two-Factor Auth</h4>
                <p className="text-xs text-slate-400 font-medium">Add an extra layer of security.</p>
              </button>
              <button className="flex-1 border border-slate-200 rounded-2xl p-6 text-left hover:border-slate-900 hover:shadow-sm transition-all group">
                <h4 className="text-sm font-bold text-slate-900 mb-1">Session Manager</h4>
                <p className="text-xs text-slate-400 font-medium">Log out of all active devices.</p>
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

// Sub-component for Toggles
const SettingToggle = ({ icon, title, description, active }) => {
  const [isOn, setIsOn] = useState(active);

  return (
    <div className="flex items-center justify-between py-2 group">
      <div className="flex items-center gap-4">
        <div className="text-slate-400 group-hover:text-slate-900 transition-colors">
          {icon}
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900">{title}</h4>
          <p className="text-xs text-slate-400 font-medium">{description}</p>
        </div>
      </div>
      <button 
        onClick={() => setIsOn(!isOn)}
        className={`w-10 h-5 rounded-full relative transition-all duration-300 ${isOn ? 'bg-slate-900' : 'bg-slate-200'}`}
      >
        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${isOn ? 'right-1' : 'left-1'}`} />
      </button>
    </div>
  );
};

export default AdminSettings;