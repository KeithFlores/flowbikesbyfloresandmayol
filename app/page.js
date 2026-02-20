"use client";
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Lock, Zap, Shield, Globe, Unlock, X, Plane, Truck, Eye, Settings, LogOut, AlertCircle } from 'lucide-react'; 
import BikeGrid from '../components/BikeGrid';
import MapView from '../components/MapView';   
import WeatherView from '../components/WeatherView';
import AdminPanel from '../components/AdminPanel';

// CONFIGURATION
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

  useEffect(() => {
    const session = localStorage.getItem('flow_admin_session');
    if (session === 'active') {
      setIsOwner(true);
    }
    // Route Guard
    if (filter === 'owner' && session !== 'active') {
      router.push('/?filter=home');
    }
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
    <div className="min-h-screen relative bg-[#050505]">
      <main className="max-w-7xl mx-auto px-6 py-10 pb-40">
        
        {/* --- 1. HOME TAB (FULL CONTENT RESTORED) --- */}
        {filter === 'home' && (
          <div className="max-w-5xl mx-auto py-10 animate-in fade-in duration-700">
            <div className="text-center mb-24">
              <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter mb-4 text-white leading-none">
                Flow <span className="text-yellow-400">Bikes</span>
              </h1>
              <div className="flex items-center justify-center gap-4">
                 <div className="h-[1px] w-12 bg-yellow-400/50"></div>
                 <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em]">Nation Wide Shipping • Davao City Sector</p>
                 <div className="h-[1px] w-12 bg-yellow-400/50"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-black uppercase text-white italic tracking-tighter">The Journey</h2>
                  <div className="h-1 w-20 bg-yellow-400"></div>
                </div>
                <p className="text-gray-400 text-base leading-relaxed">
                  Founded in 2022 in the heart of Davao City, <strong>Flow Bikes</strong> began as a local movement for riders who demand more from their gear.
                </p>
                <p className="text-gray-400 text-base leading-relaxed">
                  Today, we have established a robust logistics network that allows us to deliver the "Flow" experience to cyclists across the globe.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                    {[
                      { val: "4+", label: "Years Active" },
                      { val: "50+", label: "Custom Units" },
                      { val: "24/7", label: "Logistics" },
                      { val: "NATION", label: "Delivery" }
                    ].map((stat, i) => (
                      <div key={i} className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                        <p className="text-4xl font-black text-white italic">{stat.val}</p>
                        <p className="text-[9px] text-yellow-400 uppercase font-black tracking-widest mt-2">{stat.label}</p>
                      </div>
                    ))}
                </div>
              </div>

              <div className="glass-card p-10 rounded-[3rem] border border-white/5 bg-white/[0.02] space-y-10">
                <div className="space-y-2">
                  <h3 className="text-white font-black uppercase text-sm tracking-widest">Service Standards</h3>
                  <p className="text-gray-500 text-xs">How we get Flow Bikes to you.</p>
                </div>
                <div className="space-y-8">
                  {[
                    { Icon: Plane, title: "International Air Freight", desc: "Secure air-shipping with full tracking." },
                    { Icon: Shield, title: "Global Protection", desc: "Every order is double-boxed and insured." },
                    { Icon: Truck, title: "Local Door-to-Door", desc: "Premium doorstep delivery across Davao City." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <div className="p-3 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 shrink-0">
                        <item.Icon className="text-yellow-400" size={24}/>
                      </div>
                      <div>
                        <p className="text-white font-bold uppercase text-xs tracking-wider mb-1">{item.title}</p>
                        <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rider Archive Slider */}
            <div className="mt-20 overflow-hidden relative group w-full">
              <div className="flex flex-col items-center mb-12">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-400 mb-2">The Flow Community</p>
                <h2 className="text-white font-black uppercase italic text-2xl">Global Rider Archive</h2>
              </div>
              <div className="flex w-max gap-4 animate-infinite-slide-right">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-64 h-80 shrink-0 rounded-[2rem] overflow-hidden border border-white/5 bg-white/5 hover:border-yellow-400/30 transition-all">
                    <img src={`/buyers/pic${(i % 10) + 1}.png`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Flow Buyer" />
                  </div>
                ))}
              </div>
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>
            </div>
          </div>
        )}

        {/* --- 2. THE UNPREDICTABLE LOGIN GATE --- */}
        {filter === ADMIN_HASH && !isOwner && (
          <div className="max-w-sm mx-auto py-20 animate-in zoom-in duration-500">
            <div className="glass-card p-10 rounded-[3rem] border border-white/10 bg-[#0a0a0a] text-center">
              {isLockedOut ? (
                <div className="space-y-4">
                  <AlertCircle size={48} className="text-red-600 mx-auto mb-4" />
                  <h2 className="text-white font-black uppercase text-sm tracking-widest">Security Lock</h2>
                  <p className="text-gray-500 text-[10px]">Verification frozen.</p>
                </div>
              ) : (
                <form onSubmit={handleAdminLogin} className="space-y-6">
                  <Unlock size={32} className="text-yellow-400 mx-auto" />
                  <h2 className="text-white font-black uppercase text-[10px] tracking-[0.4em]">Owner Entry</h2>
                  <input 
                    type="password" autoFocus placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 text-center text-white font-bold outline-none focus:border-yellow-400 transition-all"
                    onChange={(e) => setPassInput(e.target.value)}
                  />
                  <button className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-yellow-400 transition-all">
                    Verify Identity
                  </button>
                  <p className="text-[9px] text-gray-600 uppercase font-black">{3 - attempts} Attempts Left</p>
                </form>
              )}
            </div>
          </div>
        )}

        {/* --- 3. OTHER TABS --- */}
        {filter === 'bikes' && <BikeGrid />}
        {filter === 'maps' && <MapView />}
        {filter === 'weather' && <WeatherView />}
        {filter === 'owner' && isOwner && <AdminPanel />}
      </main>

      {/* --- 🛡️ THE OWNER QUICK-ACCESS DOCK (Only visible when logged in) --- */}
      {isOwner && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-2 bg-black/80 backdrop-blur-2xl border border-white/10 p-2 rounded-full shadow-2xl animate-in slide-in-from-bottom-10">
          <button onClick={() => router.push('/?filter=bikes')} className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${filter === 'bikes' ? 'bg-yellow-400 text-black font-black' : 'text-gray-400 hover:text-white'}`}>
            <Eye size={16} /><span className="text-[10px] uppercase font-black hidden md:block">View Market</span>
          </button>
          <button onClick={() => router.push('/?filter=owner')} className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${filter === 'owner' ? 'bg-yellow-400 text-black font-black' : 'text-gray-400 hover:text-white'}`}>
            <Settings size={16} /><span className="text-[10px] uppercase font-black hidden md:block">Manage</span>
          </button>
          <div className="w-[1px] h-6 bg-white/10 mx-1"></div>
          <button onClick={() => { localStorage.removeItem('flow_admin_session'); window.location.reload(); }} className="p-3 text-gray-500 hover:text-red-500">
            <LogOut size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}><HomeContent /></Suspense>
  );
}