
import React from 'react';
import { User } from '../types';

interface LayoutProps {
  user: User | null;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout, children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-emerald-800 text-white shadow-lg sticky top-0 z-50 border-b border-emerald-700/50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-500 p-2 rounded-xl shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-emerald-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter leading-none">AHDReLP</h1>
              <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest mt-1 hidden sm:block">
                Adara Heritage Digital Repository & Learning Platform
              </p>
            </div>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold">{user.name}</p>
                <p className="text-[10px] font-black text-emerald-200 uppercase tracking-tighter">{user.village} • {user.role}</p>
              </div>
              <button 
                onClick={onLogout}
                className="bg-emerald-700/50 hover:bg-emerald-600 px-4 py-2 rounded-xl text-xs font-bold transition-all border border-emerald-600/50 hover:border-emerald-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        {children}
      </main>
      
      <footer className="bg-slate-950 text-slate-500 py-10 border-t border-slate-900">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-bold text-slate-400">© 2025 Adara Heritage Digital Repository and Learning Platform (AHDReLP)</p>
          <p className="text-xs mt-2 italic text-slate-600 max-w-lg mx-auto leading-relaxed">
            A digitized sanctuary for the cultural soul of the Adara people. 
            Preserving history, language, and lineage for generations to come.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;