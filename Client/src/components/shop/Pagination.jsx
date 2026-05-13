import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ current, total, onPageChange }) => {
  if (total <= 1) return null;

  // Sliding Window Logic: Determine which 5 numbers to show
  const getPageNumbers = () => {
    const maxVisible = 5;
    
    if (total <= maxVisible) {
      // If total pages are 5 or less, show all of them
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // Determine the start of the window
    let start = Math.max(current - Math.floor(maxVisible / 2), 1);
    let end = start + maxVisible - 1;

    // Adjust if the window exceeds the total number of pages
    if (end > total) {
      end = total;
      start = end - maxVisible + 1;
    }

    return Array.from({ length: (end - start) + 1 }, (_, i) => start + i);
  };

  const pages = getPageNumbers();

  return (
    <div className="mt-24 flex flex-col items-center border-t border-slate-100 pt-16">
      <div className="flex items-center gap-4">
        
        {/* Previous Button */}
        <button 
          disabled={current === 1}
          onClick={() => onPageChange(current - 1)}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-slate-900 hover:text-slate-900 disabled:opacity-30 transition-all"
        >
          <span className="material-symbols-outlined"><ChevronLeft/></span>
        </button>

        {/* Dynamic Page Numbers (Max 5) */}
        <div className="flex items-center gap-2">
          {pages.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-12 h-12 rounded-full text-xs font-bold transition-all ${
                current === pageNum 
                ? 'bg-slate-900 text-white shadow-xl scale-110' 
                : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              {pageNum.toString().padStart(2, '0')}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button 
          disabled={current === total}
          onClick={() => onPageChange(current + 1)}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-slate-900 hover:text-slate-900 disabled:opacity-30 transition-all"
        >
          <span className="material-symbols-outlined"><ChevronRight/></span>
        </button>
      </div>

      <p className="mt-8 text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">
        Page {current} of {total}
      </p>
    </div>
  );
};