export const SecurityOption = ({ icon, title, desc, action }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 flex justify-between items-center">
    <div className="flex items-center gap-6">
      <div className="p-3 bg-slate-50 text-slate-900 rounded-2xl">{icon}</div>
      <div>
        <p className="font-black text-xs uppercase tracking-widest">{title}</p>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
    </div>
    <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
      {action}
    </button>
  </div>
);