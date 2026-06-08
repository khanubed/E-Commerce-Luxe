import React, { useState } from "react";
import { Mail, User, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerApi} from "../../services/authApi";
import { setCredentials } from "../../features/auth/authSlice";
import toast from "react-hot-toast";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return toast.error("Name is required");
    }

    if (!formData.email.trim()) {
      return toast.error("Email is required");
    }

    if (!formData.phone.trim()) {
      return toast.error("Phone number is required");
    }

    if (formData.password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (!formData.terms) {
      return toast.error("Please accept Terms & Conditions");
    }
    try {
      const data = await registerApi({name : formData.name , email : formData.email , phone : formData.phone , password : formData.password});
      dispatch(setCredentials({ user: data.user, accessToken: data.accessToken }));
      toast.success("Account created!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="w-full max-w-110">
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

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* NAME */}
        <div>
          <label className="block font-bold text-slate-900 mb-2 uppercase tracking-wider text-[11px]">
            Full Name
          </label>

          <div className="relative">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
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
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              type="email"
              placeholder="ubed@example.com"
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
              <Mail size={20} />
            </span>
          </div>
        </div>

        {/* PHONE */}
        <div>
          <label className="block font-bold text-slate-900 mb-2 uppercase tracking-wider text-[11px]">
            Phone Number
          </label>

          <div className="relative">
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              type="tel"
              placeholder="+91 9876543210"
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
              <Phone size={20} />
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
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-900 mb-2 uppercase tracking-wider text-[11px]">
              Confirm Password
            </label>

            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
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

        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-4 px-6 rounded-xl font-bold uppercase tracking-[0.2em] text-[13px] hover:bg-slate-800 transition-all disabled:opacity-50"
        >
          Create Account
        </button>
      </form>

      <p className="mt-10 text-center text-slate-500">
        Already a member?
        <Link
          className="text-slate-900 font-bold hover:underline underline-offset-4 ml-1"
          to="/auth/login"
        >
          Log in here
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;