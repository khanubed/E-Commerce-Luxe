import { User } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { StatCard } from "./components/StatCard";

export default function DashboardViewPage() {
  const { user } = useOutletContext();

  return (
    <div className="space-y-12">
      <section className="bg-white rounded-[2.5rem] p-12 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-100 ring-8 ring-slate-50">
          <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
            <User size={24} />
          </div>
        </div>
        <div className="text-center md:text-left flex-grow">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
            {user.name}
          </h1>
          <p className="text-slate-500 font-medium">
            {user.tier} Member since {
              new Date(user.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            }
          </p>
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Orders" value={user.orders?.length || 0} />
        <StatCard label="Total Cart" value={user.cart?.length || 0} />
        <StatCard label="Wishlist" value={user.wishlist?.length || 0} />
      </div>
    </div>
  );
};