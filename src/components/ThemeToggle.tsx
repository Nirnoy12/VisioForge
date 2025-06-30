import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white dark:bg-slate-900 rounded-full shadow-lg transform transition-all duration-300 flex items-center justify-center ${
          isDark ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-slate-600" />
        ) : (
          <Sun className="w-3 h-3 text-yellow-500" />
        )}
      </div>
    </button>
  );
}