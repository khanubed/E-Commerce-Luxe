export const StatCard = ({ label, value }) => (
  <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm text-center">
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
      {label}
    </p>
    <p className="text-3xl font-black text-slate-900 tracking-tighter">
      {value}
    </p>
  </div>
);