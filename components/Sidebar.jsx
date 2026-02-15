"use client";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Home, Map, CloudSun, Bike, X } from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get('filter');

  const menuItems = [
    { icon: <Home size={22}/>, label: 'Home', href: '/', active: !currentFilter },
    { icon: <Map size={22}/>, label: 'Maps', href: '/?filter=maps', active: currentFilter === 'maps' },
    { icon: <CloudSun size={22}/>, label: 'Weather', href: '/?filter=weather', active: currentFilter === 'weather' },
    { icon: <Bike size={22}/>, label: 'Bikes', href: '/?filter=bikes', active: currentFilter === 'bikes' },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-full w-64 bg-[#050505] border-r border-white/10 flex flex-col z-[70] transition-transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-8 flex items-center justify-between">
        <Link href="/" className="text-yellow-400 font-black text-2xl italic uppercase tracking-tighter">
          FLOW<span className="text-white">BIKES</span>
        </Link>
        <button onClick={() => setIsOpen(false)} className="lg:hidden text-white"><X /></button>
      </div>
      <nav className="flex-1 px-6 flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link key={item.label} href={item.href}
            className={`flex items-center gap-4 p-3 rounded-xl transition-all ${item.active ? 'bg-yellow-400 text-black font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            {item.icon} <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}