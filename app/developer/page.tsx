"use client";

import { useEffect, useState } from "react";
import { 
  Terminal, 
  Cpu, 
  Database, 
  Zap, 
  Code2, 
  Activity, 
  ShieldCheck,
  Package,
  Server,
  Network
} from "lucide-react";
import { logout } from "@/lib/actions";

export default function DeveloperPortal() {
  const [uptime, setUptime] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => setUptime(prev => prev + 1), 1000);
    
    // Simulating system events
    const initialLogs = [
      "[SYSTEM] Booting State Grid Orchestrator v4.2.0-stable...",
      "[AUTH] Admin session initialized via Secure JWT.",
      "[ENGINE] AI Sentiment Analyzer ready on Edge Node HYD-1.",
      "[DB] Prisma 7 hydrated. Connection pool: 12/20.",
      "[ROUTING] Dynamic department matrix loaded.",
    ];
    setLogs(initialLogs);

    const logInterval = setInterval(() => {
      const newLogs = [
        `[TRAFFIC] Inbound request from Node-${Math.floor(Math.random() * 100)}`,
        `[LOG] Cache hit for department routing table.`,
        `[DB] Atomic transaction completed in ${Math.floor(Math.random() * 50)}ms`,
      ];
      setLogs(prev => [newLogs[Math.floor(Math.random() * newLogs.length)], ...prev].slice(0, 10));
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, []);

  const formatUptime = (s: number) => {
    const hrs = Math.floor(s / 3600).toString().padStart(2, '0');
    const mins = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const secs = (s % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <main className="min-h-screen bg-[#0A1F17] text-emerald-400 p-6 md:p-12 font-mono selection:bg-emerald-500/30">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Code2 className="text-emerald-500" size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/60">System Architect Console</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Developer Portal</h1>
        </div>

        <div className="flex items-center gap-6">
           <div className="text-right">
              <p className="text-[10px] uppercase text-emerald-500/40">Engine Uptime</p>
              <p className="text-xl font-bold text-white uppercase">{formatUptime(uptime)}</p>
           </div>
           <button 
             onClick={() => logout()}
             className="rounded-xl border border-emerald-500/20 px-6 py-2 text-xs font-bold hover:bg-emerald-500/10 transition"
           >
             Terminate Session
           </button>
        </div>
      </header>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3 mb-8">
        {/* Core Stats */}
        <div className="glass-card bg-emerald-950/20 border-emerald-500/10 p-6 rounded-[32px]">
           <div className="flex items-center justify-between mb-6">
              <Cpu size={24} className="text-emerald-500" />
              <span className="text-[10px] font-bold px-2 py-1 bg-emerald-500/10 rounded-full">Primary Cluster</span>
           </div>
           <p className="text-[10px] uppercase text-emerald-500/40 mb-1">Compute Load</p>
           <div className="h-2 w-full bg-emerald-950 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-emerald-400 w-[14%] animate-pulse" />
           </div>
           <div className="flex justify-between text-xs">
              <span className="text-white font-bold">14.2%</span>
              <span className="text-emerald-500/60 text-[10px]">Optimized</span>
           </div>
        </div>

        <div className="glass-card bg-emerald-950/20 border-emerald-500/10 p-6 rounded-[32px]">
           <div className="flex items-center justify-between mb-6">
              <Database size={24} className="text-emerald-500" />
              <span className="text-[10px] font-bold px-2 py-1 bg-emerald-500/10 rounded-full">SQL Layer</span>
           </div>
           <p className="text-[10px] uppercase text-emerald-500/40 mb-1">Prisma Transactions</p>
           <h3 className="text-2xl font-bold text-white italic">24.2 ms <span className="text-xs non-italic text-emerald-500/40">avg</span></h3>
           <p className="mt-2 text-[10px] text-emerald-500/60 leading-relaxed font-bold uppercase">
              Connection Pool: Healthy <br/>
              Isolated Modules: Active
           </p>
        </div>

        <div className="glass-card bg-emerald-950/20 border-emerald-500/10 p-6 rounded-[32px]">
           <div className="flex items-center justify-between mb-6">
              <Zap size={24} className="text-emerald-500" />
              <span className="text-[10px] font-bold px-2 py-1 bg-emerald-500/10 rounded-full">AI Logic</span>
           </div>
           <p className="text-[10px] uppercase text-emerald-500/40 mb-1">Sentiment Accuracy</p>
           <h3 className="text-2xl font-bold text-white italic text-shadow-glow">99.8%</h3>
           <p className="mt-2 text-[10px] text-emerald-500/60 leading-relaxed font-bold uppercase">
              Models: GPT-4o / RoBERTa-TS <br/>
              Status: Inferencing
           </p>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
         {/* System Logs */}
         <div className="glass-card bg-black/40 border-emerald-500/10 rounded-[32px] p-8 flex flex-col h-[400px]">
            <div className="flex items-center gap-3 mb-6">
               <Terminal size={20} className="text-emerald-500" />
               <h2 className="text-sm font-black uppercase tracking-widest text-[#F4FAF6]">Live Kernel Stream</h2>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-emerald-500/20">
               {logs.map((log, i) => (
                 <div key={i} className={`text-xs ${i === 0 ? "text-emerald-400" : "text-emerald-700"} animate-in fade-in slide-in-from-left-2`}>
                   <span className="opacity-40 italic">[{new Date().toLocaleTimeString()}]</span> {log}
                 </div>
               ))}
            </div>
         </div>

         {/* Module Integrity */}
         <div className="glass-card bg-emerald-950/20 border-emerald-500/10 rounded-[32px] p-8">
            <div className="flex items-center gap-3 mb-10">
               <Package size={20} className="text-emerald-500" />
               <h2 className="text-sm font-black uppercase tracking-widest text-[#F4FAF6]">Module Integrity Matrix</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
               {[
                 { label: "Women Safety Auth", status: "Operational", icon: ShieldCheck },
                 { label: "Narcotics Routing", status: "Operational", icon: Activity },
                 { label: "Grievance Pipeline", status: "Operational", icon: Server },
                 { label: "Public API Gateway", status: "Operational", icon: Network }
               ].map((mod, i) => (
                 <div key={i} className="flex flex-col gap-2 p-4 rounded-2xl bg-black/20 border border-emerald-500/5">
                    <mod.icon size={16} className="text-emerald-500/40" />
                    <p className="text-[10px] font-bold text-white">{mod.label}</p>
                   <div className="flex items-center gap-2">
                       <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-[8px] uppercase tracking-widest text-emerald-500">{mod.status}</span>
                    </div>
                 </div>
               ))}
            </div>

            <div className="mt-12 flex justify-end">
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500/20">
                  Authority: Charan Anumula — All Rights Reserved
               </p>
            </div>
         </div>
      </div>
    </main>
  );
}
