"use client";
import { useState, useEffect } from "react";
import { Zap } from "lucide-react";

export default function Toast() {
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const trigger = (e) => { setMsg(e.detail); setShow(true); setTimeout(() => setShow(false), 3000); };
    window.addEventListener("showToast", trigger);
    return () => window.removeEventListener("showToast", trigger);
  }, []);

  if (!show) return null;
  return (
    <div className="fixed bottom-10 right-10 z-[1000] bg-black border border-yellow-400/50 p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-right-10">
      <Zap className="text-yellow-400" size={20} fill="currentColor" />
      <span className="font-bold text-sm text-white">{msg}</span>
    </div>
  );
}