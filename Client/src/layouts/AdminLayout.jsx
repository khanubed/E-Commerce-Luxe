import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingBag, 
  Settings, 
  LogOut,
  ChevronRight,
  HomeIcon,
  Menu, // Three bars icon
  X     // Close icon
} from 'lucide-react';

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Overview', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', path: '/admin/products', icon: <Package size={20} /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingBag size={20} /> },
    { name: 'Customers', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'Homepage Content', path: '/admin/homepage', icon: <HomeIcon size={20}/> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      
      {/* 1. MOBILE OVERLAY (Darkens the background when menu is open) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden" 
          onClick={closeMobileMenu}
        />
      )}

      {/* 2. SIDEBAR (Fixed on Desktop, Slide-out on Mobile) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg" />
            LuxeStore <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">Admin</span>
          </h1>
          {/* Close button for mobile only */}
          <button onClick={closeMobileMenu} className="md:hidden p-2 text-slate-500">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-grow px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={closeMobileMenu} // Closes menu when clicking a link on mobile
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-sm font-bold tracking-wide">{item.name}</span>
                </div>
                {isActive && <ChevronRight size={14} />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:text-red-600 transition-colors text-sm font-bold">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* 3. MAIN CONTENT AREA */}
      <main className="flex-grow flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {/* MOBILE HAMBURGER BUTTON (Three bars) */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-slate-600 md:hidden hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            
            <h2 className="font-bold text-slate-900 uppercase tracking-widest text-xs hidden sm:block">
              {menuItems.find(i => i.path === location.pathname)?.name || 'Admin'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden xs:block">
              <p className="text-xs font-bold text-slate-900">Admin User</p>
              <p className="text-[10px] text-slate-400">Store Manager</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm" />
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="p-4 md:p-8 flex-grow overflow-y-auto">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;