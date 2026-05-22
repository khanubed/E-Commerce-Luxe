import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative flex items-center justify-between w-12 h-6 px-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all duration-500"
    >
      {/* The Slider Head */}
      <div className={`absolute w-4 h-4 bg-slate-900 dark:bg-amber-600 transition-transform duration-500 ${
        theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
      }`} />
      
      <Sun size={10} className="relative z-10 text-slate-400 dark:text-transparent" />
      <Moon size={10} className="relative z-10 text-transparent dark:text-white" />
    </button>
  );
};