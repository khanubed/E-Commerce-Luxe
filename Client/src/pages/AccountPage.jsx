import React from "react";

import {
  BaggageClaim,
  CreditCard,
  Grid,
  LogOut,
  MapPin,
  Shield,
  Settings,
  Loader2,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

// import { logout } from "../features/auth/authSlice";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logoutUser } from "../features/auth/authSlice";
import { useState } from "react";
import { useEffect } from "react";
import { loginApi, logoutApi } from "../services/authApi";

const AccountPage = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user?.email) {
      setLoading(false);
    }
  }, [user]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logoutApi();
      navigate("/");
      dispatch(logoutUser());
      toast.success("User Logged Out Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const menuItems = [
    {
      path: "/account",

      icon: <Grid size={18} />,

      label: "Overview",

      end: true,
    },

    {
      path: "/account/orders",

      icon: <BaggageClaim size={18} />,

      label: "My Orders",
    },

    {
      path: "/account/address",

      icon: <MapPin size={18} />,

      label: "Address Book",
    },


    // {
    //   path: "/account/security",

    //   icon: <Shield size={18} />,

    //   label: "Security",
    // },

    // {
    //   path: "/account/settings",

    //   icon: <Settings size={18} />,

    //   label: "Settings",
    // },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="pt-32 pb-24 px-4 md:px-12 max-w-[1440px] mx-auto bg-[#fafafa] min-h-screen">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* SIDEBAR */}

        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-[2.5rem] p-6 border border-slate-200 shadow-sm sticky top-32">
            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-bold text-[11px] uppercase tracking-widest ${
                      isActive
                        ? "bg-slate-900 text-white shadow-xl"
                        : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                    }`
                  }
                >
                  {item.icon}

                  {item.label}
                </NavLink>
              ))}

              <div className="mt-6 pt-6 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all duration-300 font-bold text-[11px] uppercase tracking-widest"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            </nav>
          </div>
        </aside>

        <div className="flex-grow space-y-12">
          <Outlet context={{ user: user }} />
        </div>
      </div>
    </main>
  );
};

export default AccountPage;
