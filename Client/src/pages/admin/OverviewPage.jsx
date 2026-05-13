import React from 'react';
import { TrendingUp, Users, DollarSign, Package, ArrowUpRight, ShoppingBag, ChevronRight } from 'lucide-react';

const OverviewPage = () => {
  const stats = [
    { label: 'Total Revenue', value: '$45,231.89', icon: <DollarSign className="text-emerald-600" />, trend: '+12.5%' },
    { label: 'Total Orders', value: '356', icon: <ShoppingBag className="text-blue-600" />, trend: '+8.2%' },
    { label: 'New Customers', value: '1,204', icon: <Users className="text-purple-600" />, trend: '+15.1%' },
    { label: 'Active Products', value: '48', icon: <Package className="text-orange-600" />, trend: '0%' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-50 rounded-lg">{stat.icon}</div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                {stat.trend}
              </span>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Recent Orders</h3>
            <button className="text-xs font-bold text-slate-400 hover:text-slate-900 flex items-center gap-1 uppercase tracking-widest">
              View All <ArrowUpRight size={14} />
            </button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] uppercase tracking-widest text-slate-400">
                <th className="px-6 py-4 font-bold">Order ID</th>
                <th className="px-6 py-4 font-bold">Customer</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[1, 2, 3, 4, 5].map((order) => (
                <tr key={order} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">#ORD-772{order}</td>
                  <td className="px-6 py-4 text-slate-500">Customer Name</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-[10px] font-bold bg-amber-50 text-amber-600 rounded uppercase">Pending</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">$240.00</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Inventory Info */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-bold text-slate-900 mb-6">Inventory Alerts</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex-shrink-0" />
                <div className="flex-grow">
                  <p className="text-xs font-bold text-slate-900">Product Name {i}</p>
                  <p className="text-[10px] text-red-500 font-bold uppercase">Low Stock: 2 left</p>
                </div>
                <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-900">
                  <ChevronRight size={18} />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-slate-50 text-slate-900 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-colors">
            Restock Inventory
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;