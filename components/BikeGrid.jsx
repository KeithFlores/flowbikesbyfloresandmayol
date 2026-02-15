"use client";
// Updated to use 'Bike' and 'Activity' for maximum compatibility
import { Bike, Activity, Zap, ChevronRight } from 'lucide-react';

const BIKES = [
  { id: 1, name: "Aero-Carbon Pro", weight: "6.8kg", stiffness: "High" },
  { id: 2, name: "Summit Ripper MTB", weight: "13.2kg", stiffness: "Medium" },
  { id: 3, name: "Urban Stealth", weight: "8.5kg", stiffness: "Low" },
];

export default function BikeGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {BIKES.map(bike => (
        <div key={bike.id} className="glass-card p-6 rounded-[2rem] hover:border-yellow-400 transition-all cursor-pointer group relative overflow-hidden">
          <div className="h-40 bg-black/40 rounded-2xl flex items-center justify-center mb-4">
            {/* Using Bike icon here */}
            <Bike size={48} className="text-white/10 group-hover:text-yellow-400 transition-colors duration-500" />
          </div>
          
          <h3 className="text-xl font-bold uppercase italic text-white group-hover:text-yellow-400 transition-colors">
            {bike.name}
          </h3>
          
          <div className="flex gap-4 mt-3 text-xs text-gray-500 font-mono">
            <span className="flex items-center gap-1">
                <Activity size={14} className="text-yellow-400" /> {bike.weight}
            </span>
            <span className="flex items-center gap-1">
                <Zap size={14} className="text-yellow-400" /> {bike.stiffness}
            </span>
          </div>

          <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="text-yellow-400" />
          </div>
        </div>
      ))}
    </div>
  );
}