import React, { useState } from "react";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import toast from "react-hot-toast";
import { loginApi } from "../../services/authApi";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadToast = toast.loading("Authenticating admin access...");

    try {
      const data = await loginApi({ email, password });

      if (data.success) {
        console.log(data)
        // Enforce admin privilege control parameters before entry
        if (!data.user?.isAdmin) {
          toast.error("Access Denied: Admin authorization required.", {
            id: loadToast,
          });
          return;
        }

        dispatch(
          setCredentials({
            user: data.user,
            accessToken: data.accessToken,
          }),
        );

        toast.success("Welcome back, Administrator!", { id: loadToast });
        navigate("/admin");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed", {
        id: loadToast,
      });
    }
  };

  return (
    <div className="bg-white flex flex-col min-h-screen font-sans selection:bg-slate-900 selection:text-white">
      {/* --- SPLIT LAYOUT BODY WRAPPER --- */}
      <main className="flex-grow flex flex-col md:flex-row h-screen min-h-[600px]">
        {/* Left Side: Brand Visual Panel (Hidden on Mobile) */}
        <section className="hidden md:flex relative md:w-5/12 lg:w-1/2 bg-slate-900 overflow-hidden items-center justify-center p-12">
          <div className="absolute inset-0 opacity-40">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDGr0Rm_gYpjnOWWKIRq2sNXgvpu5UFDosS7ZCySJWjtqL8IIyK7a3xxTjaFjDkpskGXv049ZdKoayxFowxfNJwU6gvMgq57hwOt1z0ZfO-rl9yGpQgJwhavodW5spP2rPldrAR2R0GWINmfxRqEFzsFtuneEPtPQuvuNOdn-rtFjwqImLPnmf7DYOg2itwwb0dFulhjtjcmt0MuzukNWk7cuGWEvrzXGiqcCd3l8uzX3jvDikXJtngm_FSI2omGRLe0_1TurjCu4"
              alt="Luxury Interior Layout"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/60 to-transparent"></div>

          <div className="relative z-10 max-w-md text-white">
            <div className="mb-8 flex items-center gap-3">
              <span className="text-white font-bold text-5xl tracking-tighter italic">
                LuxeStore
              </span>
              <span className="text-xs font-bold uppercase tracking-widest border border-white/40 px-2 py-0.5 mt-2 bg-white/10 backdrop-blur-sm rounded">
                HQ Panel
              </span>
            </div>
            <h2 className="text-5xl font-bold leading-tight mb-6">
              Management Portal Console Terminal.
            </h2>
            <p className="text-lg text-slate-300 opacity-90 leading-relaxed">
              Verify your system authorization keys to manage business
              transactions, inventory datasets, and security access logs.
            </p>
          </div>
        </section>

        {/* Right Side: Form Content Panel */}
        <section className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 lg:p-24 bg-white">
          <div className="w-full max-w-110">
            <div className="mb-10">
              <div className="md:hidden mb-8">
                <span className="text-slate-900 font-bold text-2xl tracking-tighter italic">
                  LuxeStore
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-900 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck size={14} className="text-emerald-600" /> Secure
                Node Clearance
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Terminal Login
              </h1>
              <p className="text-slate-500 text-sm">
                Enter structural credentials to gain management control access.
              </p>
            </div>

            {/* Login Form Processing Pipeline */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block font-bold text-slate-900 mb-2 uppercase tracking-wider text-[11px]">
                  System Operator Email
                </label>
                <div className="relative">
                  <input
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none text-sm font-medium placeholder-slate-300 text-slate-800"
                    type="email"
                    required
                    placeholder="admin@luxestore.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
                    <Mail size={18} />
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Security Passkey
                  </label>
                </div>
                <div className="relative">
                  <input
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none text-sm placeholder-slate-300 text-slate-800"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
                    <Lock size={18} />
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 text-white py-4 px-6 rounded-xl font-bold uppercase tracking-[0.2em] text-[13px] hover:bg-slate-800 shadow-lg transition-all active:scale-[0.98] mt-2"
              >
                Authorize Connection
              </button>
            </form>

            <p className="mt-10 text-center text-slate-500 text-sm">
              Accidentally landed here?
              <Link
                className="text-slate-900 font-bold hover:underline underline-offset-4 ml-1"
                to={"/"}
              >
                Return to public storefront
              </Link>
            </p>
          </div>
        </section>
      </main>

      {/* --- CLIENT ALIGNED GLOBAL STRUCTURAL FOOTER --- */}
      <footer className="w-full border-t border-slate-100 bg-white py-8 px-8 md:px-12">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8">
            <span className="font-bold text-slate-900 text-xl tracking-tighter italic">
              LuxeStore
            </span>
            <span className="hidden md:block h-4 w-px bg-slate-200"></span>
            <p className="text-sm text-slate-400">
              © 2026 LuxeStore. System Control Infrastructure.
            </p>
          </div>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Security_Logs"].map((link) => (
              <a
                key={link}
                className="text-[10px] uppercase font-bold tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                href={`#${link.toLowerCase()}`}
              >
                {link.replace("_", " ")}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLoginPage;
