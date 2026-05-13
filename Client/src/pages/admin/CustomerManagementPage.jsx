import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, Filter, ChevronRight, ChevronLeft, 
  UserPlus, Award, Clock, ArrowUpRight 
} from 'lucide-react';

const CustomerManagementPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('segment') || 'all';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const segments = [
    { id: 'all', label: 'All Customers' },
    { id: 'vip', label: 'VIP Segments' },
    { id: 'new', label: 'New Signups' },
    { id: 'inactive', label: 'Inactive' },
  ];

  const customers = [
    { id: 1, name: 'Alexander Pierce', email: 'a.pierce@luxurymail.com', status: 'VIP ELITE', orders: 42, spend: 18450, img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100' },
    { id: 2, name: 'Elena Rodriguez', email: 'elena.r@lifestyle.co', status: 'NEW', orders: 2, spend: 1200.50, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
    { id: 3, name: 'Marcus Thorne', email: 'm.thorne@global.com', status: 'INACTIVE', orders: 12, spend: 4890, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100' },
    { id: 4, name: 'Sophia Chen', email: 's.chen@creative.io', status: 'VIP', orders: 28, spend: 12100, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100' },
  ];

  const updateParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    if (key === 'segment') newParams.set('page', '1'); // Reset page on tab change
    setSearchParams(newParams);
  };

  return (
    <main className="flex-1 py-8 max-w-[1400px] mx-auto w-full animate-in fade-in duration-700">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Customer Management</h2>
          <p className="text-slate-500 font-medium">Manage and segment your global customer base with precision.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={18} />
            <input 
              className="w-full pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all text-sm font-medium"
              placeholder="Search customers..." 
              type="text"
            />
          </div>
          <button className="bg-white border border-slate-200 px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-slate-50 transition-colors text-xs font-bold uppercase tracking-widest">
            <Filter size={16} /> Advanced Filters
          </button>
        </div>
      </header>

      {/* Segmentation Chips */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
        {segments.map((tab) => (
          <button
            key={tab.id}
            onClick={() => updateParams('segment', tab.id)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all ${
              currentTab === tab.id 
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                : 'bg-white text-slate-500 border border-slate-100 hover:border-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Customer Details</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] text-right">Orders</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] text-right">Total Spend</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {customers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
                        <img src={user.img} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{user.name}</div>
                        <div className="text-[11px] text-slate-400 font-medium">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase border ${
                      user.status.includes('VIP') 
                        ? 'bg-amber-50 text-amber-600 border-amber-100' 
                        : user.status === 'NEW' 
                        ? 'bg-blue-50 text-blue-600 border-blue-100'
                        : 'bg-slate-50 text-slate-400 border-slate-100'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right text-sm font-bold text-slate-700">{user.orders}</td>
                  <td className="px-8 py-6 text-right text-sm font-bold text-slate-900">${user.spend.toLocaleString()}</td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-slate-400 hover:text-slate-900 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 ml-auto transition-all group-hover:translate-x-[-4px]">
                      View History <ChevronRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <footer className="px-8 py-6 bg-slate-50/30 border-t border-slate-100 flex justify-between items-center">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Showing 4 of 1,284 customers</p>
          <div className="flex gap-2">
            <button onClick={() => updateParams('page', currentPage - 1)} disabled={currentPage === 1} className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 hover:bg-white transition-all disabled:opacity-20">
              <ChevronLeft size={18} />
            </button>
            {[1, 2, 3].map(p => (
              <button 
                key={p} 
                onClick={() => updateParams('page', p)}
                className={`w-10 h-10 rounded-xl font-bold text-[11px] transition-all ${currentPage === p ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'border border-slate-200 hover:bg-white text-slate-500'}`}
              >
                {p}
              </button>
            ))}
            <button onClick={() => updateParams('page', currentPage + 1)} className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 hover:bg-white transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </footer>
      </div>

      {/* Insights Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InsightCard 
          title="New Customers" 
          value="342" 
          trend="+12% vs last month" 
          icon={<UserPlus size={20} />} 
          variant="blue" 
        />
        <InsightCard 
          title="VIP Retention Rate" 
          value="94.8%" 
          trend="High Value" 
          icon={<Award size={20} />} 
          variant="amber" 
        />
        <InsightCard 
          title="Avg. Lifetime Value" 
          value="$4,210" 
          icon={<Clock size={20} />} 
          variant="slate" 
        />
      </section>
    </main>
  );
};

const InsightCard = ({ title, value, trend, icon, variant }) => {
  const styles = {
    blue: 'text-blue-600 bg-blue-50',
    amber: 'text-amber-600 bg-amber-50',
    slate: 'text-slate-600 bg-slate-50'
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-2xl ${styles[variant]} transition-transform group-hover:scale-110`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-[9px] font-bold px-2 py-1 rounded uppercase tracking-widest ${styles[variant]}`}>
            {trend}
          </span>
        )}
      </div>
      <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{title}</h4>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
        <ArrowUpRight size={14} className="text-slate-300" />
      </div>
    </div>
  );
};

export default CustomerManagementPage;