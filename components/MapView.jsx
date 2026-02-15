"use client";
import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import { Navigation } from 'lucide-react'; // For the button icon
import "@maptiler/sdk/dist/maptiler-sdk.css";

export default function MapView() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  
  // Default to Davao if location is denied
  const defaultCenter = { lng: 125.6092, lat: 7.0707 };

  const locateUser = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setUserLocation({ lng: longitude, lat: latitude });

        // Fly the map to the user's location
        if (map.current) {
          map.current.flyTo({
            center: [longitude, latitude],
            zoom: 15,
            essential: true
          });

          // Add a special "Blue Dot" for the user
          new maptilersdk.Marker({ color: "#3b82f6" }) // Blue for user
            .setLngLat([longitude, latitude])
            .setPopup(new maptilersdk.Popup().setHTML("<b>You are here</b>"))
            .addTo(map.current);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location. Check your browser permissions.");
      }
    );
  };

  useEffect(() => {
    if (map.current) return; 

    maptilersdk.config.apiKey = '1qFUqUU7rcqjZBHWFpy8';

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS.DARK,
      center: [defaultCenter.lng, defaultCenter.lat],
      zoom: 13,
    });

    map.current.addControl(new maptilersdk.NavigationControl(), 'bottom-right');
  }, []);

  return (
    <div className="relative w-full h-[600px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl animate-in fade-in duration-700">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* HUD Overlay */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
        <div className="bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-yellow-400/20 shadow-xl">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full animate-ping ${userLocation ? 'bg-blue-400' : 'bg-yellow-400'}`}></div>
            <p className="text-yellow-400 text-[10px] font-black uppercase tracking-widest">
              {userLocation ? 'Live Signal' : 'GPS Standby'}
            </p>
          </div>
          <h3 className="text-white font-bold italic uppercase text-lg tracking-tighter">
             {userLocation ? 'Current Sector' : 'Davao City Hub'}
          </h3>
        </div>

        {/* LOCATE ME BUTTON */}
        <button 
          onClick={locateUser}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-black uppercase text-[10px] px-4 py-3 rounded-xl transition-all active:scale-95 shadow-lg tracking-widest"
        >
          <Navigation size={14} fill="black" />
          Initialize Live Locate
        </button>
      </div>

      {/* Speedometer Decoration */}
      <div className="absolute bottom-6 left-6 z-10 hidden md:block">
        <div className="w-24 h-24 rounded-full border-4 border-yellow-400/10 border-t-yellow-400 flex items-center justify-center bg-black/40 backdrop-blur-sm">
           <span className="text-white font-black italic text-xl">00</span>
           <span className="text-[8px] text-gray-500 ml-1 uppercase">km/h</span>
        </div>
      </div>
    </div>
  );
}