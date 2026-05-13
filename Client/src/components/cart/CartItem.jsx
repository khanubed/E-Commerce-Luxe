import { Minus, Plus, Trash2 } from "lucide-react";

export const CartItem = ({ item, onUpdate, onRemove }) => (
  <div className="flex flex-col sm:flex-row gap-8 p-6 bg-white rounded-2xl border border-slate-50 shadow-sm hover:shadow-md transition-all duration-300 group">
    <div className="w-full sm:w-40 h-32 overflow-hidden rounded-xl bg-slate-100">
      <img 
        src={item.thumbnail} // Changed from item.image to match API
        alt={item.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
      />
    </div>
    
    <div className="flex-1 flex flex-col justify-between py-1">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">{item.brand || 'Artisan Series'}</p>
        </div>
        <span className="text-lg font-bold text-slate-900">${(item.price * item.quantity).toLocaleString()}</span>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center bg-slate-50 border border-slate-100 rounded-full px-4 py-2 gap-6">
          <button 
            onClick={() => onUpdate(item.id, -1, item.quantity)} 
            disabled={item.quantity <= 1}
            className="text-slate-400 hover:text-slate-900 transition-colors disabled:opacity-20"
          >
            <Minus size={16} />
          </button>
          <span className="text-sm font-bold text-slate-900">{item.quantity}</span>
          <button 
            onClick={() => onUpdate(item.id, 1, item.quantity)} 
            className="text-slate-400 hover:text-slate-900 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>

        <button 
          onClick={() => onRemove(item.id)}
          className="text-slate-300 hover:text-red-500 transition-colors flex items-center gap-2 group/btn"
        >
          <Trash2 size={16} />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover/btn:opacity-100 transition-opacity">Remove</span>
        </button>
      </div>
    </div>
  </div>
);