import { Minus, Plus, Trash2 } from "lucide-react";

export const CartItem = ({ item, onUpdate, onRemove }) => (
  <div className="flex flex-col sm:flex-row gap-10 py-10 bg-white border-b border-slate-100 hover:bg-slate-50/50 transition-colors duration-500 group">
    
    {/* 1. ARCHITECTURAL IMAGE BOX */}
    <div className="w-full sm:w-32 aspect-square  h-32 overflow-hidden bg-slate-50 relative">
      <div className="absolute top-4   left-4 z-10 bg-white/90 px-2 py-1">
         <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-900">
           ID: {item.id.toString().padStart(4, '0')}
         </span>
      </div>
      <img 
        src={item.thumbnail} 
        alt={item.title} 
        className="w-full h-full   object-contain grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out" 
      />
    </div>
    
    <div className="flex-1 flex flex-col justify-between">
      {/* 2. HEADER SECTION */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
            {item.title}
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              {item.brand || 'Artisan Series'}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-200"></span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Stock Verified
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-sm font-black text-slate-900">
            ${(item.price * item.quantity).toLocaleString()}
          </p>
          <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">
            MSRP Unit: ${item.price}
          </p>
        </div>
      </div>

      {/* 3. UTILITY CONTROLS */}
      <div className="flex items-end justify-between mt-8">
        
        {/* QUANTITY PICKER: Sharp & Linear */}
        <div className="flex items-center border border-slate-950 px-1 py-1">
          <button 
            onClick={() => onUpdate(item.id, -1, item.quantity)} 
            disabled={item.quantity <= 1}
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors disabled:opacity-10"
          >
            <Minus size={14} strokeWidth={3} />
          </button>
          
          <span className="w-10 text-center text-[12px] font-black text-slate-900">
            {item.quantity.toString().padStart(2, '0')}
          </span>
          
          <button 
            onClick={() => onUpdate(item.id, 1, item.quantity)} 
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
          >
            <Plus size={14} strokeWidth={3} />
          </button>
        </div>

        {/* REMOVE ACTION: Pure Textual */}
        <button 
          onClick={() => onRemove(item.id)}
          className="pb-1 border-b-2 border-transparent hover:border-red-500 text-slate-300 hover:text-red-500 transition-all duration-300 flex items-center gap-3 group/btn"
        >
          <Trash2 size={14} strokeWidth={2.5} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
            Remove Item
          </span>
        </button>
      </div>
    </div>
  </div>
);