import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice"; 
import API from "../api/axios";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  Settings,
  LogOut,
  ChevronRight,
  HomeIcon,
  Menu,
  X,
  Phone,
} from "lucide-react";

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // 🚨 Redux workflow bridge

  const menuItems = [
    { name: "Overview", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Products", path: "/admin/products", icon: <Package size={20} /> },
    { name: "Orders", path: "/admin/orders", icon: <ShoppingBag size={20} /> },
    { name: "Customers", path: "/admin/users", icon: <Users size={20} /> },
    {
      name: "Homepage Content",
      path: "/admin/homepage",
      icon: <HomeIcon size={20} />,
    },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
    { name: "Inquiries", path: "/admin/inquiries", icon: <Phone size={20} /> },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // 🚨 FIXED WORKFLOW HANDLER
  const handleLogout = async () => {
    try {
      // 1. Clear the refreshToken secure cookie on your database/express layers
      await API.post("/api/auth/logout");
    } catch (error) {
      console.warn(
        "Backend cookie clearing session missed or expired early:",
        error,
      );
    } finally {
      // 2. Wipe memory inside Redux store regardless of API connection status (Defensive Design)
      dispatch(logoutUser());

      // 3. Throw interactive UI notice & shift view focus
      toast.success("Securely signed out.");
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Menu Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Admin Sidebar Navigation Panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}
      >
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg" />
            LuxeStore{" "}
            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">
              Admin
            </span>
          </h1>
          <button
            onClick={closeMobileMenu}
            className="md:hidden p-2 text-slate-500"
          >
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
                onClick={closeMobileMenu}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${isActive ? "bg-slate-900 text-white shadow-lg shadow-slate-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-sm font-bold tracking-wide">
                    {item.name}
                  </span>
                </div>
                {isActive && <ChevronRight size={14} />}
              </Link>
            );
          })}
        </nav>

        {/* 🚨 REWIRED RUNTIME BUTTON LOGIC */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all text-sm font-bold duration-200 group"
          >
            <LogOut
              size={20}
              className="group-hover:translate-x-0.5 transition-transform"
            />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Panel Output Workspace Matrix */}
      <main className="flex-grow flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-slate-600 md:hidden hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <h2 className="font-bold text-slate-900 uppercase tracking-widest text-xs hidden sm:block">
              {menuItems.find((i) => i.path === location.pathname)?.name ||
                "Admin"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900">Admin User</p>
              <p className="text-[10px] text-slate-400">Store Manager</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm" />
          </div>
        </header>

        <div className="p-4 md:p-8 flex-grow overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
