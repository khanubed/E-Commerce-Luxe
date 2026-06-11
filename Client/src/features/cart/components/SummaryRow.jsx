export const SummaryRow = ({ label, value }) => (
  <div className="flex justify-between text-slate-500 text-sm">
    <span>{label}</span>
    <span className="text-slate-900 font-bold">{value}</span>
  </div>
);