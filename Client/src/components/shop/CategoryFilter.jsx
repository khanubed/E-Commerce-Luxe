import React from "react";

const categoryGroups = {
  Fashion: [
    "mens-shirts", "mens-shoes", "mens-watches", "womens-bags",
    "womens-dresses", "womens-jewellery", "womens-shoes", "womens-watches",
    "tops", "sunglasses",
  ],
  "Personal Care": ["beauty", "fragrances", "skin-care"],
  Electronics: ["laptops", "smartphones", "tablets", "mobile-accessories"],
  "Home & Living": [
    "furniture", "home-decoration", "kitchen-accessories", "groceries",
  ],
  "Automotive & Sports": ["motorcycle", "vehicle", "sports-accessories"],
};

export const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="space-y-10 py-2">
      {Object.keys(categoryGroups).map((group) => (
        <div className="animate-in fade-in slide-in-from-left-2 duration-500 mb-4" key={group}>
          <h3 className="text-[16px] font-bolder uppercase text-slate-300 md:text-slate-900 mb-2 flex items-center gap-3">
            {group}
            <span className="h-[1px] flex-grow bg-slate-100"></span>
          </h3>

          <ul className="space-y-1">
            {categoryGroups[group].map((category) => {
              const isActive = activeCategory === category;

              return (
                <li key={category} className="relative flex items-center">
                  {/* Active Indicator Line */}
                  <div 
                    className={`absolute -left-4 w-1 h-4 bg-slate-400 md:bg-slate-900 rounded-full transition-all duration-500 ${
                      isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`} 
                  />
                  
                  <button
                    onClick={() => onCategoryChange(category)}
                    className={`text-[16px] capitalize transition-all duration-300 flex items-center w-full ${
                      isActive
                        ? "md:text-slate-900 text-slate-200 font-bold translate-x-1"
                        : "md:text-slate-700 text-slate-400 hover:text-slate-900 hover:translate-x-1"
                    }`}
                  >
                    {category.replaceAll("-", " ")}
                    
                    {/* Visual dot for active item */ }
                    {isActive && (
                      <span className="ml-2 w-1 h-1 rounded-full bg-slate-400 md:bg-slate-900 animate-pulse" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};