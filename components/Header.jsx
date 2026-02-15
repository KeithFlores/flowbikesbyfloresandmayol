"use client";
import { Search, Bell, User, Menu } from 'lucide-react';

export default function Header({ onMenuClick }) {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-20 bg-black/80 backdrop-blur-xl border-b border-white/10 z-[100]">
      <div className="h-full px-6 flex items-center justify-between gap-4">
        <button onClick={onMenuClick} className="lg:hidden text-yellow-400"><Menu /></button>
        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input type="text" placeholder="Search FlowBikes..." className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-12 text-sm text-white focus:ring-1 focus:ring-yellow-400 outline-none" />
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <Bell size={20} />
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold"><User size={20}/></div>
        </div>
      </div>
    </header>
  );
}