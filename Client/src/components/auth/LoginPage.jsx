import React, { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Lock, Mail } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  setCredentials } from "../../features/auth/authSlice";
import toast from "react-hot-toast";
import { loginApi } from "../../services/authApi";

const LoginPage = () => {
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadToast = toast.loading("Logging in...");

    try {
      const data = await loginApi({ email, password });
      
      if (data.success) {
        dispatch(setCredentials({ 
          user: data.user, 
          accessToken: data.accessToken 
        }));
        
        toast.success("Welcome back!", { id: loadToast });
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed", { id: loadToast });
    }
  };

  return (
    <div className="w-full max-w-110 ">
      <div className="mb-10">
        <div className="md:hidden mb-8">
          <span className="text-slate-900 font-bold text-2xl tracking-tighter italic">
            LuxeStore
          </span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome Back</h1>
        <p className="text-slate-500">
          Enter your credentials to access your account.
        </p>
      </div>

      {/* Login Form */}
      <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className="block font-bold text-slate-900 mb-2 uppercase tracking-wider text-[11px]">
            Email Address
          </label>
          <div className="relative">
            <input
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none"
              type="email"
              placeholder="ubedkhan@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-300 text-[20px]">
              <Mail />
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Password
            </label>
            <a
              href="#forgot"
              className="text-[11px] font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-wider"
            >
              Forgot Password?
            </a>
          </div>
          <div className="relative">
            <input
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-300 text-[20px]">
              <Lock />
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            className="w-5 h-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900/20 cursor-pointer"
            id="remember"
            type="checkbox"
          />
          <label
            className="text-sm text-slate-500 select-none cursor-pointer"
            htmlFor="remember"
          >
            Remember me for 30 days
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-4 px-6 rounded-xl font-bold uppercase tracking-[0.2em] text-[13px] hover:bg-slate-800 shadow-lg transition-all active:scale-[0.98]"
        >
            Sign In
        </button>
      </form>

      <p className="mt-10 text-center text-slate-500">
        New to LuxeStore?
        <Link
          className="text-slate-900 font-bold hover:underline underline-offset-4 ml-1"
          to={"/auth/signup"}
        >
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
