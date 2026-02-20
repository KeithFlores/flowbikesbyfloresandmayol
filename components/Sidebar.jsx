"use client";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Home, Map, CloudSun, Bike, X } from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get('filter');

  const menuItems = [
    // Added 'mobileHide' property to Home
    { icon: <Home size={18}/>, label: 'Home', href: '/', active: !currentFilter, mobileHide: true },
    { icon: <Map size={18}/>, label: 'Maps', href: '/?filter=maps', active: currentFilter === 'maps' },
    { icon: <CloudSun size={18}/>, label: 'Weather', href: '/?filter=weather', active: currentFilter === 'weather' },
    { icon: <Bike size={18}/>, label: 'Bikes', href: '/?filter=bikes', active: currentFilter === 'bikes' },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-full w-64 bg-[#050505] border-r border-white/10 flex flex-col z-[70] transition-transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-8 flex items-center justify-between">
        <Link href="/" className="text-yellow-400 font-black text-xl italic uppercase tracking-tighter">
          FLOW<span className="text-white">BIKES</span>
        </Link>
        <button onClick={() => setIsOpen(false)} className="lg:hidden text-white"><X size={20}/></button>
      </div>
      
      <nav className="flex-1 px-6 flex flex-col gap-1">
        {menuItems.map((item) => (
          <Link 
            key={item.label} 
            href={item.href}
            onClick={() => setIsOpen(false)}
            // 'hidden lg:flex' applied if mobileHide is true, otherwise 'flex'
            className={`${item.mobileHide ? 'hidden lg:flex' : 'flex'} items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
              item.active 
                ? 'bg-yellow-400 text-black font-bold shadow-[0_0_20px_rgba(250,204,21,0.2)]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className={item.active ? 'text-black' : ''}>{item.icon}</span>
            <span className="text-[11px] uppercase font-black italic tracking-[0.2em]">{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="p-8 border-t border-white/5">
        <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.3em]">Davao Sector / 2026</p>
      </div>
    </aside>
  );
}