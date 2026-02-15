"use client";

import { Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import WeatherView from "../components/WeatherView";
import BikeGrid from "../components/BikeGrid";
import MapView from "../components/MapView";

/**
 * FlowContent handles the conditional rendering based on 
 * the URL search parameters (e.g., ?filter=weather)
 */
function FlowContent() {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');
  const searchQuery = searchParams.get('search');
  
  // Your API Keys
  const WEATHER_KEY = "f1cf44731d273d732652c749e741f19e";

  return (
    <div className="w-full animate-in fade-in duration-700">
      
      {/* Dynamic Header Section */}
      <header className="mb-12 border-l-4 border-yellow-400 pl-6">
        <p className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] mb-1">
          {searchQuery ? 'Search Protocol' : 'System Terminal'}
        </p>
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
          {searchQuery ? `Result: ${searchQuery}` : 
           filter === 'weather' ? 'Live Conditions' : 
           filter === 'maps' ? 'Route Tracker' : 
           'The Machine Shop'}
        </h1>
      </header>

      {/* Switching Logic: This decides which component to show */}
      <div className="min-h-[500px]">
        {/* 1. Weather View */}
        {filter === 'weather' && (
          <WeatherView apiKey={WEATHER_KEY} />
        )}

        {/* 2. Map View */}
        {filter === 'maps' && (
          <MapView />
        )}

        {/* 3. Default: Bike Grid (Machine Shop) */}
        {(!filter || filter === 'bikes' || filter === 'watchlist') && (
          <BikeGrid />
        )}
      </div>

      {/* Footer Branding */}
      <footer className="mt-20 pt-10 border-t border-white/5 flex justify-between items-center opacity-30 italic">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
          FlowBikes Engineering // v1.0.4
        </p>
        <div className="flex gap-4">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white/20 rounded-full"></div>
        </div>
      </footer>
    </div>
  );
}

/**
 * Root Home Component wrapped in Suspense.
 * Next.js requires useSearchParams to be inside a Suspense boundary.
 */
export default function Home() {
  return (
    <Suspense 
      fallback={
        <div className="flex flex-col items-center justify-center h-96">
          <div className="w-16 h-1 w-full max-w-[200px] bg-white/5 overflow-hidden rounded-full mb-4">
            <div className="h-full bg-yellow-400 w-1/3 animate-[loading_1.5s_infinite_linear]"></div>
          </div>
          <p className="text-yellow-400 font-black italic tracking-widest text-sm animate-pulse">
            LOADING_FLOW_SYSTEM...
          </p>
        </div>
      }
    >
      <FlowContent />
    </Suspense>
  );
}