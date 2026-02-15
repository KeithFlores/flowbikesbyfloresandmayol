"use client";
import { useState, useEffect } from 'react';
import { Cloud, Sun, Wind, Droplets, Eye, BrainCircuit } from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export default function WeatherView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample data for the graph - fits the Davao vibe
  const graphData = [
    { time: '06:00', temp: 26 },
    { time: '09:00', temp: 29 },
    { time: '12:00', temp: 33 },
    { time: '15:00', temp: 31 },
    { time: '18:00', temp: 28 },
    { time: '21:00', temp: 26 },
  ];

  useEffect(() => {
    const KEY = "895284fb2d2c1ad3d92205a97260067e";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Davao&appid=${KEY}&units=metric`)
      .then(res => res.json())
      .then(json => {
        if (json.main) { setData(json); setLoading(false); }
        else throw new Error();
      })
      .catch(() => {
        setData({ main: { temp: 30, humidity: 72 }, weather: [{ description: "sunny" }], wind: { speed: 4.2 }, visibility: 10000 });
        setLoading(false);
      });
  }, []);

  // --- RE-IMPLEMENTING THE GREEN ADVICE BOX ---
  const getAIAdvice = (w) => {
    if (!w || !w.main) return null;
    const temp = w.main.temp;
    
    if (temp > 32) return { status: "HEAT ADVISORY", msg: "High temperature detected. Pace your ride and double hydration.", color: "text-orange-500", bg: "bg-orange-500/10" };
    return { status: "OPTIMAL", msg: "Clear skies and stable winds. Perfect conditions for a high-speed sector run.", color: "text-green-500", bg: "bg-green-500/10" };
  };

  if (loading || !data) return (
    <div className="p-20 flex flex-col items-center">
      <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-yellow-400 font-black italic uppercase tracking-widest text-[10px]">Syncing Sky...</p>
    </div>
  );

  const advice = getAIAdvice(data);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      
      {/* 1. TOP ADVICE BOX (Green/Yellow Dynamic) */}
      <div className={`p-6 rounded-[2rem] border border-white/10 ${advice.bg} flex items-center gap-6`}>
        <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
          <BrainCircuit className={advice.color} size={28} />
        </div>
        <div>
          <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${advice.color}`}>Rider Protocol: {advice.status}</span>
          <p className="text-white font-medium italic mt-1 leading-tight">"{advice.msg}"</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. INTERACTIVE GRAPH CARD */}
        <div className="lg:col-span-2 glass-card p-8 rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 relative group">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-yellow-400 text-[10px] font-black uppercase tracking-widest mb-1">Davao Sector</p>
              <h2 className="text-7xl font-black text-white italic tracking-tighter">{Math.round(data.main.temp)}°C</h2>
            </div>
            <Sun className="text-yellow-400/20 group-hover:rotate-90 transition-transform duration-1000" size={48} />
          </div>

          <div className="h-56 mt-4 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={graphData}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FACC15" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FACC15" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                {/* THE INTERACTIVE HOVER TOOLTIP */}
                <Tooltip 
                  cursor={{ stroke: '#FACC15', strokeWidth: 1, strokeDasharray: '5 5' }}
                  contentStyle={{ 
                    backgroundColor: '#000', 
                    border: '1px solid rgba(250,204,21,0.3)', 
                    borderRadius: '12px', 
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#fff',
                    fontStyle: 'italic'
                  }} 
                  itemStyle={{ color: '#FACC15' }}
                  formatter={(value) => [`${value}°C`, 'Temp']}
                />
                <Area 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="#FACC15" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorTemp)" 
                  activeDot={{ r: 6, fill: '#000', stroke: '#FACC15', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. QUICK STATS */}
        <div className="space-y-4">
          <div className="glass-card p-6 rounded-[2rem] border border-white/5 group hover:border-yellow-400/30 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Wind size={16} className="text-gray-500 group-hover:text-yellow-400" />
              <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest">Wind Velocity</p>
            </div>
            <p className="text-2xl font-black italic">{data.wind.speed} m/s</p>
          </div>

          <div className="glass-card p-6 rounded-[2rem] border border-white/5 group hover:border-yellow-400/30 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Droplets size={16} className="text-gray-500 group-hover:text-blue-400" />
              <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest">Humidity</p>
            </div>
            <p className="text-2xl font-black italic">{data.main.humidity}%</p>
          </div>

          <div className="glass-card p-6 rounded-[2rem] border border-white/5 group hover:border-yellow-400/30 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Eye size={16} className="text-gray-500 group-hover:text-cyan-400" />
              <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest">Visibility</p>
            </div>
            <p className="text-2xl font-black italic">{(data.visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>
      </div>
    </div>
  );
}