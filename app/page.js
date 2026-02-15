"use client";
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Lock, Zap } from 'lucide-react';
import BikeGrid from '../components/BikeGrid';
import MapView from '../components/MapView';   
import WeatherView from '../components/WeatherView';
import AdminPanel from '../components/AdminPanel';

function HomeContent() {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || 'home'; 
  const [hasEntered, setHasEntered] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passInput, setPassInput] = useState("");

  if (!hasEntered) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
        <p className="text-yellow-400 font-black italic uppercase tracking-[0.5em] text-[10px] mb-4">Davao City Sector</p>
        <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-white uppercase mb-8">FLOW<span className="text-yellow-400">BIKES</span></h1>
        <button onClick={() => setHasEntered(true)} className="group px-12 py-5 bg-white text-black font-black italic uppercase tracking-widest text-xs rounded-full hover:bg-yellow-400 transition-all">
          Initiate System <Zap size={16} className="inline ml-2" fill="currentColor" />
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-in fade-in duration-1000">
      <main>
        {(filter === 'home' || filter === 'bikes') && (
          <div className="space-y-10">
            {isOwner && <AdminPanel />}
            <h1 className="text-6xl font-black italic tracking-tighter uppercase border-l-4 border-yellow-400 pl-6">Marketplace</h1>
            <BikeGrid />
          </div>
        )}
        {filter === 'maps' && <MapView />}
        {filter === 'weather' && <WeatherView />}
      </main>

      {/* SECRET TRIGGER: Bottom right, invisible until hovered */}
      <button onClick={() => setShowLoginModal(true)} className="fixed bottom-4 right-4 opacity-0 hover:opacity-100 transition-opacity">
        <Lock size={12} className="text-yellow-400" />
      </button>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[200] backdrop-blur-xl">
          <div className="bg-[#0A0A0A] p-10 rounded-[3rem] border border-white/10 w-80">
            <input type="password" autoFocus className="w-full bg-white/5 border border-white/10 p-4 rounded-xl mb-4 text-center text-yellow-400 font-black outline-none" placeholder="ACCESS KEY" onChange={(e) => setPassInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (passInput === "FLOW_DAVAO_2026" ? setIsOwner(true) & setShowLoginModal(false) : alert("Denied"))} />
            <button onClick={() => passInput === "FLOW_DAVAO_2026" ? setIsOwner(true) & setShowLoginModal(false) : alert("Denied")} className="w-full bg-yellow-400 text-black font-black py-4 rounded-xl uppercase italic">Unlock</button>
          </div>
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