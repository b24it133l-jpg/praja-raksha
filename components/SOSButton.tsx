"use client";

import { useState, useCallback } from "react";
import { AlertCircle, MapPin, Phone, Send, Loader2 } from "lucide-react";

export default function SOSButton() {
  const [isActivating, setIsActivating] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const activateSOS = useCallback(() => {
    setIsActivating(true);
    
    // Simulate high-priority alerting pipeline
    setTimeout(() => {
      setIsActivating(false);
      setIsSent(true);
      
      // Real-world would trigger geolocation.getCurrentPosition and hit emergency endpoints
      alert("🚨 EMERGENCY ALERT TRANSMITTED: Local Police and Women Safety Wing have been notified with your live coordinates.");
    }, 2000);
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-[100]">
      {!isSent ? (
        <button
          onClick={activateSOS}
          disabled={isActivating}
          className={`group relative flex h-20 w-20 items-center justify-center rounded-full bg-rose-600 text-white shadow-[0_0_50px_rgba(225,29,72,0.4)] transition-all hover:scale-110 active:scale-95 ${isActivating ? "animate-ping" : "animate-pulse"}`}
        >
          <div className="absolute inset-0 rounded-full border-4 border-rose-400 opacity-20 animate-ping" />
          {isActivating ? <Loader2 className="animate-spin" size={32} /> : <AlertCircle size={32} />}
          <span className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-rose-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white scale-0 group-hover:scale-100 transition-transform">
            Instant SOS
          </span>
        </button>
      ) : (
        <div className="flex items-center gap-3 rounded-2xl bg-emerald-600 px-6 py-4 text-white shadow-2xl animate-in slide-in-from-left-8">
           <MapPin size={24} className="animate-bounce" />
           <div>
              <p className="text-xs font-black uppercase tracking-widest">Live Tracking Active</p>
              <p className="text-[10px] opacity-80">Patrol unit dispatched.</p>
           </div>
        </div>
      )}
    </div>
  );
}
