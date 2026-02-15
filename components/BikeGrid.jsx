"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Weight, Box, MessageSquare, Loader2 } from 'lucide-react';

export default function BikeGrid() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBikes = async () => {
      const { data } = await supabase.from('bikes').select('*').order('created_at', { ascending: false });
      if (data) setBikes(data);
      setLoading(false);
    };
    fetchBikes();
  }, []);

  if (loading) return <div className="text-center py-20 text-yellow-400 tracking-[0.4em] text-[10px] animate-pulse">SYNCING...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {bikes.map((bike) => (
        <div key={bike.id} className="glass-card rounded-[2.5rem] overflow-hidden border border-white/5 bg-black hover:border-yellow-400/20 transition-all duration-500 group">
          <div className="h-80 relative overflow-hidden">
            <img src={bike.image_url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
          </div>
          <div className="p-8">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2">{bike.name}</h3>
            <p className="text-yellow-400 text-2xl font-black italic mb-8">{bike.price}</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 p-4 rounded-xl flex items-center gap-3">
                <Box size={14} className="text-gray-400" />
                <span className="text-[10px] font-black uppercase text-gray-300">{bike.frame}</span>
              </div>
              <div className="bg-white/5 p-4 rounded-xl flex items-center gap-3">
                <Weight size={14} className="text-gray-400" />
                <span className="text-[10px] font-black uppercase text-gray-300">{bike.weight}</span>
              </div>
            </div>
            <a href={`https://wa.me/639123456789?text=Inquiry:${bike.name}`} className="flex justify-center items-center gap-3 w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-yellow-400 transition-all">
              <MessageSquare size={14} /> Contact Specialist
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}