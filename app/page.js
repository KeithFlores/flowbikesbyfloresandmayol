"use client";
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Lock, Zap, Shield, Globe, Unlock, X, Plane, Truck, Eye, Settings, LogOut, AlertCircle } from 'lucide-react'; 
import BikeGrid from '../components/BikeGrid';
import MapView from '../components/MapView';   
import WeatherView from '../components/WeatherView';
import AdminPanel from '../components/AdminPanel';

const ADMIN_HASH = "v0_df_9921_auth"; 

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const filter = searchParams.get('filter') || 'home'; 
  
  const [hasEntered, setHasEntered] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);

  // --- 📱 MOBILE VANISH LOGIC ---
  useEffect(() => {
    const checkMobile = () => {
      // If mobile screen AND filter is 'home', vanish the tab by switching to 'bikes'
      if (window.innerWidth < 1024 && filter === 'home') {
        router.replace('/?filter=bikes');
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [filter, router]);

  useEffect(() => {
    const session = localStorage.getItem('flow_admin_session');
    if (session === 'active') setIsOwner(true);
    if (filter === 'owner' && session !== 'active') router.push('/?filter=home');
  }, [filter, router]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (isLockedOut) return;
    if (passInput === 'FLOW_DAVAO_2026') {
      localStorage.setItem('flow_admin_session', 'active');
      setIsOwner(true);
      router.push('/?filter=owner');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 3) setIsLockedOut(true);
      else alert(`ACCESS DENIED. ${3 - newAttempts} attempts left.`);
    }
  };

  if (!hasEntered) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
        <p className="text-yellow-400 font-black uppercase tracking-[0.5em] text-[10px] mb-4">Davao City</p>
        <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-white uppercase mb-8">FLOW<span className="text-yellow-400">BIKES</span></h1>
        <button onClick={() => setHasEntered(true)} className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-yellow-400 transition-all cursor-pointer">
          Enter Site <Zap size={16} className="inline ml-2" fill="currentColor" />
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-[#050505] overflow-x-hidden">
      <main className="max-w-7xl mx-auto px-6 py-10 pb-40">
        
        {/* --- 🏠 HOME TAB (DESKTOP ONLY - CENTERED) --- */}
        {filter === 'home' && (
          <div className="hidden lg:block max-w-5xl mx-auto py-10 animate-in fade-in duration-700">
            {/* Header Centered */}
            <div className="text-center mb-24">
              <h1 className="text-8xl xl:text-9xl font-black italic uppercase tracking-tighter mb-4 text-white leading-none">
                Flow <span className="text-yellow-400">Bikes</span>
              </h1>
              <div className="flex items-center justify-center gap-4 opacity-50">
                 <div className="h-[1px] w-12 bg-yellow-400"></div>
                 <p className="text-white text-[10px] font-black uppercase tracking-[0.5em]">Nation Wide Shipping • 2026</p>
                 <div className="h-[1px] w-12 bg-yellow-400"></div>
              </div>
            </div>

            {/* Grid Centered */}
            <div className="grid grid-cols-2 gap-16 items-start mb-32">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-black uppercase text-white italic tracking-tighter">The Journey</h2>
                  <div className="h-1 w-20 bg-yellow-400"></div>
                </div>
                <p className="text-gray-400 text-base leading-relaxed">
                  Founded in 2022 in the heart of Davao City, <strong>Flow Bikes</strong> began as a local movement for riders who demand more from their gear.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                    {[{ v: "4+", l: "Years" }, { v: "50+", l: "Units" }].map((stat, i) => (
                      <div key={i} className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                        <p className="text-4xl font-black text-white italic">{stat.v}</p>
                        <p className="text-[9px] text-yellow-400 uppercase font-black tracking-widest mt-2">{stat.label}</p>
                      </div>
                    ))}
                </div>
              </div>

              <div className="glass-card p-10 rounded-[3rem] border border-white/5 bg-white/[0.02] space-y-10">
                <h3 className="text-white font-black uppercase text-sm tracking-widest">Service Standards</h3>
                <div className="space-y-8">
                  {[{ Icon: Plane, t: "Air Freight" }, { Icon: Shield, t: "Protection" }].map((item, i) => (
                    <div key={i} className="flex gap-6 items-center">
                      <div className="p-3 rounded-2xl bg-yellow-400/10 shrink-0">
                        <item.Icon className="text-yellow-400" size={24}/>
                      </div>
                      <p className="text-white font-bold uppercase text-[10px] tracking-widest">{item.t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rider Archive Slider (Original Color) */}
            <div className="mt-20 overflow-hidden relative group w-full">
              <div className="flex w-max gap-4 animate-infinite-slide-right">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-64 h-80 shrink-0 rounded-[2rem] overflow-hidden border border-white/5">
                    <img src={`/buyers/pic${(i % 10) + 1}.png`} className="w-full h-full object-cover" alt="Flow" />
                  </div>
                ))}
              </div>
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10"></div>
            </div>
          </div>
        )}

        {/* --- OTHER TABS --- */}
        <div className="w-full">
            {filter === 'bikes' && <BikeGrid />}
            {filter === 'maps' && <MapView />}
            {filter === 'weather' && <WeatherView />}
            {filter === 'owner' && isOwner && <AdminPanel />}
        </div>

        {/* LOGIN GATE */}
        {filter === ADMIN_HASH && !isOwner && (
          <div className="max-w-sm mx-auto py-20 text-center">
             <form onSubmit={handleAdminLogin} className="glass-card p-10 rounded-[3rem] border border-white/10 bg-[#0a0a0a] space-y-6">
                <Unlock size={32} className="text-yellow-400 mx-auto" />
                <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 text-center text-white" onChange={(e) => setPassInput(e.target.value)} />
                <button className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-xs">Verify</button>
             </form>
          </div>
        )}
      </main>

      {/* OWNER DOCK */}
      {isOwner && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-2 bg-black/80 backdrop-blur-2xl border border-white/10 p-2 rounded-full shadow-2xl">
          <button onClick={() => router.push('/?filter=bikes')} className={`px-6 py-3 rounded-full flex items-center gap-2 ${filter === 'bikes' ? 'bg-yellow-400 text-black font-black' : 'text-gray-400'}`}>
            <Eye size={16} /><span className="text-[10px] uppercase font-black hidden md:block">Market</span>
          </button>
          <button onClick={() => router.push('/?filter=owner')} className={`px-6 py-3 rounded-full flex items-center gap-2 ${filter === 'owner' ? 'bg-yellow-400 text-black font-black' : 'text-gray-400'}`}>
            <Settings size={16} /><span className="text-[10px] uppercase font-black hidden md:block">Admin</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return <Suspense fallback={null}><HomeContent /></Suspense>;
}