"use client";
import { useState, useEffect } from 'react';
import { Cloud, Sun, Wind, Droplets, Eye, BrainCircuit, Navigation } from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer, CartesianGrid, XAxis } from 'recharts';

export default function WeatherView({ apiKey }) {
  const [data, setData] = useState(null);
  
  // Simulated trend data for the graph
  const graphData = [
    { time: '06:00', temp: 24 },
    { time: '09:00', temp: 27 },
    { time: '12:00', temp: 31 },
    { time: '15:00', temp: 32 },
    { time: '18:00', temp: 29 },
    { time: '21:00', temp: 26 },
  ];

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Davao&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(setData);
  }, [apiKey]);

  const getAIAdvice = (weather) => {
    const temp = weather.main.temp;
    const condition = weather.weather[0].main.toLowerCase();
    const wind = weather.wind.speed;

    if (condition.includes('rain')) return { status: "CRITICAL", msg: "Rain detected. Expect slippery corners. Use lower tire pressure.", color: "text-red-500", bg: "bg-red-500/10" };
    if (wind > 8) return { status: "CAUTION", msg: "High winds. Watch for side-gusts between buildings.", color: "text-orange-500", bg: "bg-orange-500/10" };
    if (temp > 32) return { status: "ADVISORY", msg: "Extreme heat. Pace yourself and double your water intake.", color: "text-yellow-500", bg: "bg-yellow-500/10" };
    return { status: "OPTIMAL", msg: "Clear skies. Great day to push for a new personal record!", color: "text-green-500", bg: "bg-green-500/10" };
  };

  if (!data) return <div className="p-10 text-yellow-400 animate-pulse font-black italic text-center uppercase tracking-widest">Syncing Satellite...</div>;

  const advice = getAIAdvice(data);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      
      {/* 1. AI ADVICE HEADER */}
      <div className={`p-6 rounded-[2rem] border border-white/10 ${advice.bg} flex items-center gap-6`}>
        <div className={`p-4 rounded-2xl bg-black/20 border border-white/5`}>
          <BrainCircuit className={advice.color} size={32} />
        </div>
        <div>
          <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${advice.color}`}>Rider Protocol: {advice.status}</span>
          <p className="text-white font-medium italic mt-1 leading-tight">"{advice.msg}"</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 2. MAIN TEMP & GRAPH CARD */}
        <div className="lg:col-span-2 glass-card p-8 rounded-[2.5rem] relative overflow-hidden group">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-yellow-400 text-[10px] font-black uppercase tracking-widest mb-1">Davao Sector</p>
              <h2 className="text-7xl font-black text-white italic tracking-tighter">{Math.round(data.main.temp)}°C</h2>
              <p className="text-gray-400 mt-2 font-bold uppercase flex items-center gap-2">
                <Sun size={14} className="text-yellow-400" /> {data.weather[0].description}
              </p>
            </div>
            <div className="hidden sm:block opacity-20 group-hover:opacity-100 transition-opacity duration-700">
                <Cloud size={60} className="text-white" />
            </div>
          </div>

          {/* THE GRAPH (Ensured visibility with h-48) */}
          <div className="h-48 mt-8 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={graphData}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FACC15" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#FACC15" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #FACC15', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="#FACC15" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorTemp)" 
                  style={{ filter: "drop-shadow(0px 0px 8px rgba(250, 204, 21, 0.5))" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. QUICK STATS STACK */}
        <div className="space-y-4">
          <div className="glass-card p-6 rounded-[2rem] flex items-center gap-4 border-l-4 border-yellow-400">
            <Wind className="text-yellow-400" size={24}/>
            <div>
                <p className="text-gray-500 text-[10px] uppercase font-black">Wind Speed</p>
                <p className="text-xl font-bold">{data.wind.speed} m/s</p>
            </div>
          </div>
          <div className="glass-card p-6 rounded-[2rem] flex items-center gap-4">
            <Droplets className="text-yellow-400" size={24}/>
            <div>
                <p className="text-gray-500 text-[10px] uppercase font-black">Humidity</p>
                <p className="text-xl font-bold">{data.main.humidity}%</p>
            </div>
          </div>
          <div className="glass-card p-6 rounded-[2rem] flex items-center gap-4">
            <Eye className="text-yellow-400" size={24}/>
            <div>
                <p className="text-gray-500 text-[10px] uppercase font-black">Visibility</p>
                <p className="text-xl font-bold">{(data.visibility/1000).toFixed(1)} km</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}