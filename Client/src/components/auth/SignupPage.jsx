import React, { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    if (!formData.fullName.trim()) {
      return alert("Full name is required");
    }

    if (!formData.email.trim()) {
      return alert("Email is required");
    }

    if (formData.password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    if (!formData.terms) {
      return alert("Please accept terms");
    }

    console.log(formData);

    const tempUser = {
      _id: "user_123",
      profile: {
        name: "Ubed Khan",
        email: "ubedkhan@example.com",
        avatar: "https://avatars.githubusercontent.com/u/178263372?v=4",
        memberSince: "January 2026",
        tier: "Premium",
      },
      auth: {
        passwordHash: formData.password,
        twoFactorEnabled: true,
      },
    };
    const tempToken = "abc123";
    dispatch(login({ user: tempUser, token: tempToken }));
    navigate("/");
  };

  return (
    <div className="w-full max-w-110 ">
      {/* Header */}
      <div className="mb-10">
        <div className="md:hidden mb-8">
          <span className="text-slate-900 font-bold text-2xl tracking-tighter">
            LuxeStore
          </span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Create Account
        </h1>
        <p className="text-slate-500">
          Start your journey into quiet luxury today.
        </p>
      </div>

      {/* Registration Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* FULL NAME */}
        <div>
          <label className="block font-bold text-slate-900 mb-2 uppercase tracking-wider text-[11px]">
            Full Name
          </label>

          <div className="relative">
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 outline-none"
              type="text"
              placeholder="Ubed Khan"
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
              <User size={20} />
            </span>
          </div>
        </div>

        {/* EMAIL */}
        <div>
          <label className="block font-bold text-slate-900 mb-2 uppercase tracking-wider text-[11px]">
            Email Address
          </label>

          <div className="relative">
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 outline-none"
              type="email"
              placeholder="ubed@example.com"
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
              <Mail size={20} />
            </span>
          </div>
        </div>

        {/* PASSWORDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-900 mb-2 uppercase tracking-wider text-[11px]">
              Password
            </label>

            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 outline-none"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-900 mb-2 uppercase tracking-wider text-[11px]">
              Confirm
            </label>

            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 outline-none"
              type="password"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* TERMS */}
        <div className="flex items-start gap-3">
          <input
            id="terms"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            className="w-5 h-5 mt-0.5 cursor-pointer"
            type="checkbox"
          />

          <label htmlFor="terms" className="text-sm text-slate-500">
            I agree to the Terms and Privacy Policy.
          </label>
        </div>

        {/* SUBMIT */}
        <button className="w-full bg-slate-900 text-white py-4 px-6 rounded-xl font-bold uppercase tracking-[0.2em] text-[13px] hover:bg-slate-800 transition-all active:scale-[0.98]">
          Create Account
        </button>
      </form>

      <p className="mt-10 text-center text-slate-500">
        Already a member?
        <Link
          className="text-slate-900 font-bold hover:underline underline-offset-4 ml-1"
          to={"/auth/login"}
        >
          Log in here
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
