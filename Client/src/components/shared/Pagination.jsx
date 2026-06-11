import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ current, total, onPageChange }) => {
  if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, i) => i + 1).slice(
    Math.max(0, current - 3), 
    Math.min(total, current + 2)
  );

  return (
    <div className="mt-32 flex z-10 flex-col items-center border-t border-slate-100 pt-5 md:pt-12">
      <div className="flex items-center gap-2">
        <button 
          disabled={current === 1}
          onClick={() => onPageChange(current - 1)}
          className="w-12 h-12 flex items-center justify-center border border-slate-200 text-slate-900 hover:bg-slate-950 hover:text-white disabled:opacity-10 transition-all"
        >
          <ChevronLeft size={16} />
        </button>

        {pages.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-12 h-12 text-[10px] font-black transition-all ${
              current === pageNum ? 'bg-slate-950 text-white' : 'text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-200'
            }`}
          >
            {pageNum.toString().padStart(2, '0')}
          </button>
        ))}

        <button 
          disabled={current === total}
          onClick={() => onPageChange(current + 1)}
          className="w-12 h-12 flex items-center justify-center border border-slate-200 text-slate-900 hover:bg-slate-950 hover:text-white disabled:opacity-10 transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};