"use client";
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Lock, Zap, Shield, Globe, Unlock, X, Plane, Truck } from 'lucide-react'; 
import BikeGrid from '../components/BikeGrid';
import MapView from '../components/MapView';   
import WeatherView from '../components/WeatherView';
import AdminPanel from '../components/AdminPanel';

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const filter = searchParams.get('filter') || 'home'; 
  const [hasEntered, setHasEntered] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [showPassPrompt, setShowPassPrompt] = useState(false);
  const [passInput, setPassInput] = useState('');

  useEffect(() => {
    const session = localStorage.getItem('flow_admin_session');
    if (session === 'active') {
      setIsOwner(true);
    }
  }, []);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (passInput === 'FLOW_DAVAO_2026') {
      localStorage.setItem('flow_admin_session', 'active');
      setIsOwner(true);
      setShowPassPrompt(false);
      router.push('/?filter=owner');
    } else {
      alert('ACCESS DENIED');
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
      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {filter === 'home' && (
          <div className="max-w-5xl mx-auto py-10 animate-in fade-in duration-700">
            {/* --- HERO BRANDING --- */}
            <div className="text-center mb-24">
              <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter mb-4 text-white">
                Flow <span className="text-yellow-400">Bikes</span>
              </h1>
              <div className="flex items-center justify-center gap-4">
                 <div className="h-[1px] w-12 bg-yellow-400/50"></div>
                 <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em]">Nation Wide Shipping • Davao City Sector</p>
                 <div className="h-[1px] w-12 bg-yellow-400/50"></div>
              </div>
            </div>

            {/* --- INFO SECTION --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-black uppercase text-white italic tracking-tighter">The Journey</h2>
                  <div className="h-1 w-20 bg-yellow-400"></div>
                </div>
                
                <p className="text-gray-400 text-base leading-relaxed">
                  Founded in 2022 in the heart of Davao City, <strong>Flow Bikes</strong> began as a local movement for riders who demand more from their gear. What started as a local shop has quickly expanded into a worldwide operation.
                </p>

                <p className="text-gray-400 text-base leading-relaxed">
                  Today, we are proud to announce that our builds are no longer restricted to local roads. We have established a robust logistics network that allows us to deliver the "Flow" experience to cyclists across the globe.
                </p>

                {/* --- STATS GRID (RESTORED TO OLD STYLE) --- */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                        <p className="text-4xl font-black text-white italic">4+</p>
                        <p className="text-[9px] text-yellow-400 uppercase font-black tracking-widest mt-2">Years Active</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                        <p className="text-4xl font-black text-white italic">50+</p>
                        <p className="text-[9px] text-yellow-400 uppercase font-black tracking-widest mt-2">Custom Units</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                        <p className="text-4xl font-black text-white italic">24/7</p>
                        <p className="text-[9px] text-yellow-400 uppercase font-black tracking-widest mt-2">Logistics Support</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                        <p className="text-4xl font-black text-white italic">NATION</p>
                        <p className="text-[9px] text-yellow-400 uppercase font-black tracking-widest mt-2">Wide Delivery</p>
                    </div>
                </div>
              </div>

              {/* Service Details Card */}
              <div className="glass-card p-10 rounded-[3rem] border border-white/5 bg-white/[0.02] space-y-10">
                <div className="space-y-2">
                  <h3 className="text-white font-black uppercase text-sm tracking-widest">Service Standards</h3>
                  <p className="text-gray-500 text-xs">How we get Flow Bikes to you.</p>
                </div>

                <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                    <div className="p-3 rounded-2xl bg-yellow-400/10 border border-yellow-400/20">
                      <Plane className="text-yellow-400" size={24}/>
                    </div>
                    <div>
                      <p className="text-white font-bold uppercase text-xs tracking-wider mb-1">International Air Freight</p>
                      <p className="text-gray-500 text-xs leading-relaxed">Secure air-shipping options for our international clients with full tracking.</p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start">
                    <div className="p-3 rounded-2xl bg-yellow-400/10 border border-yellow-400/20">
                      <Shield className="text-yellow-400" size={24}/>
                    </div>
                    <div>
                      <p className="text-white font-bold uppercase text-xs tracking-wider mb-1">Global Protection</p>
                      <p className="text-gray-500 text-xs leading-relaxed">Every international order is double-boxed and insured for transit.</p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start">
                    <div className="p-3 rounded-2xl bg-yellow-400/10 border border-yellow-400/20">
                      <Truck className="text-yellow-400" size={24}/>
                    </div>
                    <div>
                      <p className="text-white font-bold uppercase text-xs tracking-wider mb-1">Local Door-to-Door</p>
                      <p className="text-gray-500 text-xs leading-relaxed">Maintaining our roots with premium doorstep delivery across Davao City.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- MOVING PICTURES SLIDER --- */}
            <div className="mt-20 overflow-hidden relative group w-full">
              <div className="flex flex-col items-center mb-12">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-400 mb-2">The Flow Community</p>
                <h2 className="text-white font-black uppercase italic text-2xl">Global Rider Archive</h2>
              </div>
              
              <div className="flex w-max gap-4 animate-infinite-slide-right">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-64 h-80 shrink-0 rounded-[2rem] overflow-hidden border border-white/5 bg-white/5 hover:border-yellow-400/30 transition-all">
                    <img 
                      src={`/buyers/pic${(i % 10) + 1}.png`} 
                      className="w-full h-full object-cover" 
                      alt="Flow Buyer" 
                    />
                  </div>
                ))}
              </div>
              
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>
            </div>
          </div>
        )}

        {filter === 'bikes' && <BikeGrid />}
        {filter === 'maps' && <MapView />}
        {filter === 'weather' && <WeatherView />}
        {isOwner && filter === 'owner' && <AdminPanel />}
      </main>

      {/* --- SECRET LOCK BUTTON --- */}
      {!isOwner && (
        <button 
          onClick={() => setShowPassPrompt(true)}
          className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/5 transition-all z-50 cursor-pointer group"
        >
          <Lock size={14} className="group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* --- PASSWORD MODAL --- */}
      {showPassPrompt && (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="w-full max-w-sm glass-card p-10 rounded-[3rem] border border-white/10 relative text-center">
            <button onClick={() => setShowPassPrompt(false)} className="absolute top-8 right-8 text-gray-500 hover:text-white"><X size={20} /></button>
            <Unlock size={32} className="text-yellow-400 mx-auto mb-6" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] mb-8 text-white">Owner Access</h2>
            <form onSubmit={handleAdminLogin}>
              <input 
                autoFocus type="password" placeholder="SECRET KEY" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-center text-xs tracking-[0.3em] font-bold text-white mb-4 outline-none focus:border-yellow-400/50 transition-all"
                onChange={(e) => setPassInput(e.target.value)}
              />
              <button type="submit" className="w-full bg-white text-black py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-yellow-400 transition-all">Initialize</button>
            </form>
          </div>
        </div>
      )}

      {isOwner && (
        <button 
          onClick={() => { localStorage.removeItem('flow_admin_session'); window.location.reload(); }}
          className="fixed bottom-6 right-6 text-[10px] text-gray-600 font-bold uppercase hover:text-red-500 transition-all z-50 px-4 py-2 bg-black/50 backdrop-blur rounded-full border border-white/5"
        >
          Logout Admin
        </button>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}><HomeContent /></Suspense>
  );
}