import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search,Bell , Printer, Edit3, MoreVertical, 
  ChevronLeft, ChevronRight, ArrowRight, Download, Plus,
  Package, Clock, Truck, DollarSign, TrendingUp
} from 'lucide-react';

const OrderManagementPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get('status') || 'all';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const stats = [
    { label: 'Total Orders', value: '1,284', trend: '+12% from last month', icon: <Package size={20} />, color: 'text-slate-900' },
    { label: 'Pending', value: '43', trend: 'Requires Attention', icon: <Clock size={20} />, color: 'text-amber-600' },
    { label: 'In Transit', value: '156', trend: 'Normal Flow', icon: <Truck size={20} />, color: 'text-blue-600' },
    { label: 'Total Revenue', value: '$42,920', trend: 'New Record', icon: <DollarSign size={20} />, color: 'text-emerald-600' },
  ];

  const orders = [
    { id: '#LX-92831', customer: 'Eleanor Campbell', email: 'eleanor.c@email.com', date: 'Oct 24, 2023', amount: 1240.00, status: 'Pending', initials: 'EC' },
    { id: '#LX-92830', customer: 'Brooks Moore', email: 'brooks.m@web.com', date: 'Oct 23, 2023', amount: 450.50, status: 'Shipped', initials: 'BM' },
    { id: '#LX-92829', customer: 'Sienna Aris', email: 'sienna@design.com', date: 'Oct 23, 2023', amount: 3100.00, status: 'Delivered', initials: 'SA' },
    { id: '#LX-92828', customer: 'Jameson Wells', email: 'j.wells@corp.io', date: 'Oct 22, 2023', amount: 89.00, status: 'Cancelled', initials: 'JW' },
  ];

  const updateParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  return (
    <main className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
      {/* TopNavBar */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50 flex justify-between items-center w-full px-8 py-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={18} />
            <input 
              className="w-full bg-slate-100 border-none rounded-full py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-slate-900/5 focus:bg-white transition-all text-sm outline-none" 
              placeholder="Search orders by ID..." 
              type="text"
            />
          </div>
        </div>
        
        {/* <div className="flex items-center gap-6">
          <button className="relative text-slate-400 hover:text-slate-900 transition-colors p-2 rounded-full hover:bg-slate-100">
            <Bell size  ={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-slate-900 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="flex items-center gap-3 cursor-pointer group pl-6 border-l border-slate-100">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900">Julian Thorne</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Chief Admin</p>
            </div>
            <img 
              alt="Admin" 
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm group-hover:border-slate-200 transition-all" 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" 
            />
          </div>
        </div> */}
      </header>

      {/* Content Canvas */}
      <div className="p-8 max-w-[1400px] mx-auto w-full space-y-8 animate-in fade-in duration-700">
        
        {/* Page Header & Stats */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Order Management</h2>
              <p className="text-slate-500 font-medium mt-1">Monitor and manage all customer transactions.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 border border-slate-200 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-white hover:shadow-sm transition-all flex items-center gap-2">
                <Download size={16} /> Export CSV
              </button>
              <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-xl shadow-slate-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
                <Plus size={16} /> Create Order
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2.5 bg-slate-50 rounded-xl ${stat.color}`}>{stat.icon}</div>
                </div>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                <p className={`text-[10px] font-bold mt-2 ${stat.color === 'text-slate-900' ? 'text-emerald-600' : stat.color}`}>
                  {stat.trend}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Table Section */}
        <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
          <div className="p-6 border-b border-slate-50 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {['all', 'pending', 'shipped', 'delivered', 'cancelled'].map((status) => (
                <button 
                  key={status}
                  onClick={() => updateParams('status', status)}
                  className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                    currentFilter === status 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-[11px] font-bold uppercase">Sort by:</span>
              <select className="bg-transparent border-none font-bold text-[11px] text-slate-900 focus:ring-0 cursor-pointer uppercase tracking-widest">
                <option>Latest First</option>
                <option>Highest Amount</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 uppercase font-bold text-[9px] tracking-[0.2em]">
                  <th className="px-8 py-4">Order ID</th>
                  <th className="px-8 py-4">Customer</th>
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4">Amount</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {orders.map((order) => (
                  <tr key={order.id} className="group hover:bg-slate-50/50 transition-all">
                    <td className="px-8 py-5 font-bold text-slate-900 text-sm">{order.id}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 font-bold text-[10px] border border-slate-200">
                          {order.initials}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{order.customer}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{order.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-xs font-medium text-slate-500">{order.date}</td>
                    <td className="px-8 py-5 text-sm font-bold text-slate-900">${order.amount.toFixed(2)}</td>
                    <td className="px-8 py-5">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <IconButton icon={<Printer size={16} />} />
                        <IconButton icon={<Edit3 size={16} />} />
                        <IconButton icon={<MoreVertical size={16} />} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/20">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Showing 4 of 1,284 orders</p>
            <div className="flex gap-2">
              <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-white transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-900 text-white text-[10px] font-bold">1</button>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-white text-[10px] font-bold">2</button>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-white transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Bottom Bento Insights */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 rounded-3xl relative overflow-hidden h-[320px] group border border-slate-800">
            <img 
              alt="Footwear Trend" 
              className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
            <div className="relative z-10 p-10 flex flex-col h-full justify-between">
              <div>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full text-[9px] font-bold uppercase tracking-widest">
                  Trend Insight
                </span>
                <h3 className="text-3xl font-bold text-white mt-6 max-w-sm leading-tight">
                  Footwear demand has increased by 24% this week.
                </h3>
              </div>
              <button className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-all group/btn">
                View Category Performance 
                <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-slate-900" />
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-900">Quick Settings</h4>
              </div>
              <p className="text-slate-400 text-xs font-medium leading-relaxed">Manage your notification preferences and store visibility.</p>
            </div>
            
            <div className="space-y-5 mt-8">
              <Toggle label="Order Alerts" active />
              <Toggle label="Email Digests" />
              <Toggle label="Public Storefront" active />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

// Helper Components
const StatusBadge = ({ status }) => {
  const styles = {
    Pending: 'bg-amber-50 text-amber-600 border-amber-100',
    Shipped: 'bg-blue-50 text-blue-600 border-blue-100',
    Delivered: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    Cancelled: 'bg-red-50 text-red-600 border-red-100',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${styles[status]}`}>
      {status}
    </span>
  );
};

const IconButton = ({ icon }) => (
  <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg border border-transparent hover:border-slate-100 transition-all">
    {icon}
  </button>
);

const Toggle = ({ label, active }) => (
  <div className="flex items-center justify-between group cursor-pointer">
    <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{label}</span>
    <div className={`w-9 h-5 rounded-full relative transition-colors duration-300 ${active ? 'bg-slate-900' : 'bg-slate-100'}`}>
      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${active ? 'right-1' : 'left-1'}`} />
    </div>
  </div>
);

export default OrderManagementPage;