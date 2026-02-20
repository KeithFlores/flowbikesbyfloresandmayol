"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Weight, Box, Loader2, X, Facebook, Share2, Info, Zap } from 'lucide-react';

export default function BikeGrid() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBike, setSelectedBike] = useState(null); 

  useEffect(() => {
    const fetchBikes = async () => {
      const { data } = await supabase.from('bikes').select('*').order('created_at', { ascending: false });
      if (data) setBikes(data);
      setLoading(false);
    };
    fetchBikes();
  }, []);

 
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') setSelectedBike(null); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (loading) return (
    <div className="text-center py-20">
      <Loader2 className="w-6 h-6 text-yellow-400 animate-spin mx-auto mb-4" />
      <p className="text-yellow-400 tracking-[0.4em] text-[10px] uppercase font-black">Syncing Inventory...</p>
    </div>
  );

  return (
    <div className="relative">
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 px-2 md:px-0">
        {bikes.map((bike) => (
          <div 
            key={bike.id} 
            onClick={() => setSelectedBike(bike)} 
            className="glass-card rounded-[1.5rem] overflow-hidden border border-white/5 bg-black hover:border-yellow-400/40 transition-all duration-500 group flex flex-col cursor-pointer"
          >
          
            <div className="aspect-square relative overflow-hidden bg-white/5">
              <img 
                src={bike.image_url} 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                alt={bike.name} 
              />
              <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-yellow-400/10">
                <p className="text-yellow-400 text-[7px] font-black uppercase tracking-widest">{bike.type || 'UNIT'}</p>
              </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <div className="mb-3">
                <h3 className="text-[12px] md:text-sm font-black italic uppercase tracking-tighter leading-tight line-clamp-1 text-white group-hover:text-yellow-400 transition-colors">
                  {bike.name}
                </h3>
                <p className="text-yellow-400 text-[12px] md:text-sm font-black italic">
                  {bike.price}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-white/[0.03] p-2 rounded-lg flex items-center gap-1.5 border border-white/5">
                  <Box size={10} className="text-gray-500" />
                  <span className="text-[8px] font-bold uppercase text-gray-400 truncate tracking-tighter">
                    {bike.frame}
                  </span>
                </div>
                <div className="bg-white/[0.03] p-2 rounded-lg flex items-center gap-1.5 border border-white/5">
                  <Weight size={10} className="text-gray-500" />
                  <span className="text-[8px] font-bold uppercase text-gray-400 truncate tracking-tighter">
                    {bike.weight}
                  </span>
                </div>
              </div>

              <button 
                onClick={(e) => { e.stopPropagation(); window.open('https://www.facebook.com/people/Flow-Bikes/100071770333448/', '_blank'); }}
                className="w-full py-2 bg-yellow-400 text-black font-black uppercase text-[10px] rounded-full hover:bg-white transition-all text-center"
              >
                Contact Seller
              </button>
            </div>
          </div>
        ))}
      </div>

{selectedBike && (
  <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
    
   
    <button 
      onClick={() => setSelectedBike(null)}
      className="fixed top-6 right-6 text-white/40 hover:text-white transition-all z-[350] bg-black/20 p-2 rounded-full border border-white/10"
    >
      <X size={28} />
    </button>

   
    <div className="w-full max-w-6xl max-h-[90vh] overflow-y-auto lg:overflow-hidden bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-2xl">
      
     
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-full">
        
        
        <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-black/40 border-b lg:border-b-0 lg:border-r border-white/5 p-4">
          <img 
            src={selectedBike.image_url} 
            className="w-full h-full max-h-[70vh] object-contain"
            alt={selectedBike.name} 
          />
        </div>

       
        <div className="p-8 md:p-12 space-y-8 h-full flex flex-col justify-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-yellow-400">
              <Zap size={14} fill="currentColor" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em]">Flow Premium Build</p>
            </div>
            <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter leading-none">
              {selectedBike.name}
            </h2>
            <p className="text-3xl md:text-4xl font-black text-yellow-400 italic">
              {selectedBike.price}
            </p>
          </div>

         
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-2">Frame Set</p>
              <p className="text-white font-bold text-xs uppercase">{selectedBike.frame}</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-2">Weight</p>
              <p className="text-white font-bold text-xs uppercase">{selectedBike.weight}</p>
            </div>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-yellow-400/30 pl-4 italic">
            "Engineered for the Davao terrain, delivered to the world."
          </p>

         
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href="https://www.facebook.com/people/Flow-Bikes/100071770333448/" 
              target="_blank"
              className="flex-1 px-8 py-5 bg-yellow-400 text-black font-black uppercase tracking-widest text-[11px] rounded-full hover:bg-white transition-all flex items-center justify-center gap-3"
            >
              <Facebook size={16} fill="currentColor" /> Message Seller
            </a>
            <button 
               onClick={() => { navigator.share?.({ title: selectedBike.name, url: window.location.href }); }}
               className="p-5 bg-white/5 text-white rounded-full border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
)}
    </div>
  );
}