import {
  Bell,
  Fingerprint,
  Lock,
  MapPin,
  Plus,
  Trash2,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";
import { OrderRow } from "./OrderRow";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

// 1. DASHBOARD VIEW
export const DashboardView = () => {
  const { user } = useOutletContext();

  return (
    <div className="space-y-12">
      <section className="bg-white rounded-[2.5rem] p-12 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-100 ring-8 ring-slate-50">
          <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
            {!user.avatar ? (
              <User size={24} />
            ) : (
              <img
                src={user.avatar}
                className="w-full h-full rounded-full object-cover"
              />
            )}
          </div>
        </div>
        <div className="text-center md:text-left flex-grow">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
            {user.name}
          </h1>
          <p className="text-slate-500 font-medium">
            {user.tier} Member since May 2026
          </p>
        </div>
        <button
          onClick={() => setActiveTab("Settings")}
          className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest"
        >
          Edit Profile
        </button>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Orders" value="24" />
        <StatCard label="Reward Points" value="1,250" />
        <StatCard label="Wishlist" value="12 Items" />
      </div>
    </div>
  );
};

// 2. ORDERS VIEW
export const OrdersView = () => (
  <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
    <div className="p-8 border-b border-slate-100 flex justify-between items-center">
      <h2 className="text-lg font-black uppercase tracking-widest">
        Your Orders
      </h2>
    </div>
    <table className="w-full text-left">
      <tbody className="divide-y divide-slate-100">
        <OrderRow
          id="#LX-88291"
          status="Delivered"
          total="1,240.00"
          date="12 May 2026"
        />
        <OrderRow
          id="#LX-88304"
          status="In Transit"
          total="450.00"
          date="10 May 2026"
        />
      </tbody>
    </table>
  </div>
);

// 3. ADDRESS VIEW
export const AddressView = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black uppercase tracking-widest">
          Address Book
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white px-6 py-3 rounded-xl shadow-lg"
        >
          <Plus size={14} /> Add New
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-900 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500">
          <h3 className="font-black uppercase tracking-widest text-xs mb-6">
            New Address Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Full Name" placeholder="Alex Sterling" />
            <InputField label="Phone" placeholder="+91 98765 43210" />
            <div className="col-span-2">
              <InputField
                label="Street Address"
                placeholder="Suite 400, Alpha Plaza"
              />
            </div>
            <InputField label="City" placeholder="Indore" />
            <InputField label="Postal Code" placeholder="452010" />
          </div>
          <div className="flex gap-4 mt-8">
            <button className="flex-grow py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest">
              Save Address
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-8 py-4 bg-slate-100 text-slate-400 rounded-xl font-black uppercase text-[10px] tracking-widest"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddressCard
          title="Home"
          address="349, Madina Nagar, Indore"
          type="Primary"
        />
        <AddressCard title="Office" address="Vijay Nagar, Indore" type="Work" />
      </div>
    </div>
  );
};

// 4. PAYMENT VIEW
export const PaymentView = () => (
  <div className="space-y-8">
    <h2 className="text-xl font-black uppercase tracking-widest">
      Payment Methods
    </h2>
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 flex items-center justify-between group cursor-pointer hover:border-slate-900 transition-all">
      <div className="flex items-center gap-6">
        <div className="w-16 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400">
          VISA
        </div>
        <div>
          <p className="font-black text-slate-900 tracking-widest text-sm">
            •••• •••• •••• 4421
          </p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Expires 09/28
          </p>
        </div>
      </div>
      <Trash2
        size={18}
        className="text-slate-300 hover:text-red-500 transition-colors"
      />
    </div>
    <button className="w-full border-2 border-dashed border-slate-200 p-8 rounded-[2.5rem] text-slate-400 font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all">
      + Add New Credit Card
    </button>
  </div>
);

// 5. SECURITY VIEW
export const SecurityView = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-black uppercase tracking-widest">
      Security Settings
    </h2>
    <div className="grid gap-4">
      <SecurityOption
        icon={<Lock size={18} />}
        title="Password"
        desc="Last changed 3 months ago"
        action="Change"
      />
      <SecurityOption
        icon={<Fingerprint size={18} />}
        title="2-Step Verification"
        desc="Currently Enabled"
        action="Manage"
      />
      <SecurityOption
        icon={<Bell size={18} />}
        title="Login Alerts"
        desc="Email notifications for new logins"
        action="Config"
      />
    </div>
  </div>
);

// 6. SETTINGS VIEW (Edit Profile)
export const SettingsView = () => {

  const { user } = useOutletContext();

  return (
    <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10">
      <div>
        <h2 className="text-xl font-black uppercase tracking-widest mb-2">
          Account Settings
        </h2>
        <p className="text-slate-400 text-sm">
          Update your public profile and contact information.
        </p>
      </div>
      <div className="flex items-center gap-6 pb-10 border-b border-slate-100">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 border border-slate-200">
          {!user.avatar ? (
            <User size={24} />
          ) : (
            <img
              src={user.avatar}
              className="w-full h-full rounded-full object-cover"
            />
          )}
        </div>
        <button className="text-[10px] font-black uppercase tracking-widest border-2 border-slate-900 px-6 py-3 rounded-xl">
          Change Avatar
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InputField label="Display Name" placeholder={user.name} />
        <InputField label="Email Address" placeholder={user.email} />
        <InputField label="Phone Number" placeholder="+91 98765 43210" />
        <div className="flex items-end">
          <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// --- REUSABLE MINI COMPONENTS ---

const InputField = ({ label, placeholder }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
      {label}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-slate-900 transition-all placeholder:text-slate-300"
    />
  </div>
);

const AddressCard = ({ title, address, type }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 hover:border-slate-900 transition-all group">
    <div className="flex justify-between mb-6">
      <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
        <MapPin size={18} />
      </div>
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">
        {type}
      </span>
    </div>
    <h4 className="text-xl font-black tracking-tighter mb-2">{title}</h4>
    <p className="text-sm text-slate-400 leading-relaxed">{address}</p>
  </div>
);

const SecurityOption = ({ icon, title, desc, action }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 flex justify-between items-center">
    <div className="flex items-center gap-6">
      <div className="p-3 bg-slate-50 text-slate-900 rounded-2xl">{icon}</div>
      <div>
        <p className="font-black text-xs uppercase tracking-widest">{title}</p>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
    </div>
    <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
      {action}
    </button>
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm text-center">
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
      {label}
    </p>
    <p className="text-3xl font-black text-slate-900 tracking-tighter">
      {value}
    </p>
  </div>
);
