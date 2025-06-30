import React from 'react';
import { Sparkles } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-slate-200/60 dark:border-slate-700/60 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-500 dark:via-indigo-500 dark:to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  VisioForge
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">AI Art Studio</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="font-medium">Free Forever</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-medium">No Signup</span>
              </div>
            </div>
            
            <ThemeToggle />
            
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              100% FREE
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}