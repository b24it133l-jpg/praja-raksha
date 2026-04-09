"use client";

import { useState, useEffect } from "react";
import { 
  ShieldAlert, 
  MapPin, 
  UserX, 
  Activity, 
  PhoneCall, 
  Search, 
  Bot, 
  ArrowRight,
  HeartPulse,
  Share2,
  Lock,
  MessageSquare,
  AlertCircle,
  GanttChartSquare,
  Flame,
  ChevronRight,
  Wifi,
  Radio,
  X
} from "lucide-react";
import ComplaintForm from "@/components/ComplaintForm";
import ContextualAI from "@/components/ContextualAI";

export default function WomenSafetyPage() {
  const [activeView, setActiveView] = useState<"hub" | "report" | "sos" | "map">("hub");
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [sosTimer, setSosTimer] = useState(5);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSOSActive && sosTimer > 0) {
      interval = setInterval(() => setSosTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isSOSActive, sosTimer]);

  const coreActions = [
    { id: "sos", title: "SOS Emergency", icon: ShieldAlert, color: "bg-rose-600 text-white shadow-rose-200", desc: "One-tap alert & live location share" },
    { id: "report", title: "Report Incident", icon: MapPin, color: "bg-white text-rose-600 border border-rose-100", desc: "Harassment, stalking or misconduct" },
    { id: "anonymous", title: "Anonymous Report", icon: UserX, color: "bg-[#0A1F17] text-white", desc: "Identity encryption & secure intake" },
    { id: "track", title: "Track Complaint", icon: Activity, color: "bg-white text-slate-700 border border-slate-100", desc: "Live resolution & timeline sync" },
    { id: "map", title: "Unsafe Areas", icon: Search, color: "bg-white text-rose-600 border border-rose-100", desc: "Mark hotspots & view heatmaps" },
    { id: "ai", title: "AI Assistance", icon: Bot, color: "bg-emerald-50 text-emerald-700", desc: "Protocol guidance & emergency detection" }
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-12 pb-24">
      {/* SOS OVERLAY */}
      {isSOSActive && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-rose-950/90 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="w-full max-w-sm px-6 text-center text-white">
              <div className="relative mx-auto mb-10 h-40 w-40">
                 <div className="absolute inset-0 animate-ping rounded-full bg-rose-500 opacity-20" />
                 <div className="absolute inset-4 animate-ping rounded-full bg-rose-500 opacity-40 delay-300" />
                 <div className="relative flex h-full w-full items-center justify-center rounded-full bg-rose-600 shadow-[0_0_60px_rgba(225,29,72,0.5)]">
                    {sosTimer > 0 ? (
                       <span className="text-6xl font-black">{sosTimer}</span>
                    ) : (
                       <Radio size={64} className="animate-pulse" />
                    )}
                 </div>
              </div>

              {sosTimer > 0 ? (
                 <div className="space-y-4">
                    <h2 className="text-3xl font-black uppercase tracking-tight">Initiating SOS</h2>
                    <p className="text-sm font-medium text-rose-200 opacity-80">
                       Broadcasting live location to SHE Teams & trusted contacts in {sosTimer} seconds.
                    </p>
                    <button 
                      onClick={() => { setIsSOSActive(false); setSosTimer(5); }}
                      className="mt-8 rounded-full border-2 border-white/20 px-8 py-3 text-sm font-black uppercase tracking-widest hover:bg-white/10"
                    >
                      Cancel Alert
                    </button>
                 </div>
              ) : (
                 <div className="space-y-6 animate-in zoom-in-95 duration-500">
                    <div className="flex items-center justify-center gap-3 rounded-2xl bg-white/10 py-4">
                       <Wifi size={18} className="text-emerald-400 animate-pulse" />
                       <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Live Signal: Active</span>
                    </div>
                    <div className="space-y-2">
                       <h2 className="text-3xl font-black uppercase tracking-tight">Emergency Active</h2>
                       <p className="text-sm text-rose-100 font-medium">Police Command Center has intercepted your signal.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <button className="flex flex-col items-center gap-2 rounded-3xl bg-white/10 p-4 hover:bg-white/20 transition">
                          <PhoneCall size={24} />
                          <span className="text-[10px] font-black uppercase">Call 100</span>
                       </button>
                       <button className="flex flex-col items-center gap-2 rounded-3xl bg-white p-4 text-rose-950 font-bold hover:bg-rose-50 transition">
                          <MessageSquare size={24} />
                          <span className="text-[10px] font-black uppercase">Live Chat</span>
                       </button>
                    </div>
                    <button 
                      onClick={() => { setIsSOSActive(false); setSosTimer(5); }}
                      className="mt-10 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/5 py-3 text-xs font-bold text-white/40 hover:text-white"
                    >
                      <X size={16} /> Stop Tracking
                    </button>
                 </div>
              )}
           </div>
        </div>
      )}

      {/* HEADER: COMMAND CENTER MODE */}
      <header className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-4 w-4">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
               <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-600" />
            </span>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-rose-700">Priority Shield Active</p>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-[#0A1F17] md:text-6xl">
            Women Safety <br/> <span className="text-rose-600">Command Center</span>
          </h1>
          <p className="max-w-2xl text-lg font-medium leading-relaxed text-[#3E4F45]/80">
            A state-monitored high-priority module. Every report is audited in real-time by the **Telangana Women Protection Cell**.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
           <button 
            onClick={() => setIsSOSActive(true)}
            className="flex items-center gap-3 rounded-2xl bg-rose-600 px-8 py-5 text-sm font-black uppercase tracking-widest text-white shadow-2xl shadow-rose-200 transition-all hover:bg-rose-700 active:scale-95 animate-pulse"
           >
              <ShieldAlert size={20} />
              Trigger SOS
           </button>
           <button className="flex items-center gap-3 rounded-2xl bg-white border border-[#0A1F17]/10 px-8 py-5 text-sm font-black uppercase tracking-widest text-[#0A1F17] transition-all hover:bg-slate-50 active:scale-95">
              <Share2 size={20} />
              Share Live Location
           </button>
        </div>
      </header>

      {/* CORE FEATURE GRID */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
         {coreActions.map((action) => (
           <button 
             key={action.id}
             onClick={() => {
                if(action.id === "sos") setIsSOSActive(true);
                else if(action.id === "report" || action.id === "anonymous") setActiveView("report");
             }}
             className={`flex flex-col items-start gap-6 rounded-[40px] p-8 transition-all hover:-translate-y-1 hover:shadow-2xl active:scale-95 ${action.color}`}
           >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 shadow-sm backdrop-blur-md">
                 <action.icon size={28} />
              </div>
              <div className="text-left">
                 <h3 className="text-xl font-black tracking-tight">{action.title}</h3>
                 <p className="mt-2 text-xs font-semibold opacity-60 leading-relaxed">{action.desc}</p>
                 <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                    Enter Service <ChevronRight size={14} />
                 </div>
              </div>
           </button>
         ))}
      </section>

      {/* DYNAMIC VIEW AREA */}
      <div className="soft-divider" />

      {activeView === "hub" && (
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
           <div className="space-y-8">
              <div className="glass-card rounded-[40px] p-8 md:p-12">
                 <h2 className="text-2xl font-black text-[#0A1F17]">Service Infrastructure</h2>
                 <p className="mt-2 text-sm text-[#3E4F45]/60 font-medium">Core 5 MVP Protocol Active</p>
                 
                 <div className="mt-10 grid gap-8 sm:grid-cols-2">
                    {[
                      { title: "One-Tap SOS", status: "Active", icon: ShieldAlert },
                      { title: "Report Incident", status: "Encrypted", icon: MapPin },
                      { title: "Anonymous Portal", status: "Enabled", icon: Lock },
                      { title: "Live Tracking", status: "2s Latency", icon: Activity },
                      { title: "Case Timeline", status: "Verified", icon: GanttChartSquare }
                    ].map(feat => (
                      <div key={feat.title} className="flex items-center gap-4">
                         <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
                            <feat.icon size={22} />
                         </div>
                         <div>
                            <h4 className="text-sm font-bold text-[#0A1F17]">{feat.title}</h4>
                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">{feat.status}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="glass-card flex items-center gap-6 rounded-[40px] bg-rose-600 p-8 text-white border-none shadow-2xl shadow-rose-200">
                 <div className="h-20 w-20 flex items-center justify-center rounded-full bg-white/10 shrink-0">
                    <HeartPulse size={40} className="text-rose-200" />
                 </div>
                 <div>
                    <h3 className="text-xl font-black">Bharosa Center Integration</h3>
                    <p className="mt-2 text-sm text-rose-100/70 leading-relaxed">
                       Integrated 24/7 support for survivors of violence. Direct VOIP link to SHE Teams and NGO volunteers.
                    </p>
                    <button className="mt-6 font-black uppercase text-[10px] tracking-[0.2em] underline decoration-rose-300 decoration-2 underline-offset-4">Read Safety Manual</button>
                 </div>
              </div>
           </div>

           <aside className="space-y-6">
              <div className="glass-card rounded-[32px] p-8">
                 <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#0A1F17]">
                    <Flame size={16} className="text-rose-600" />
                    Heatmap Trends
                 </h4>
                 <div className="mt-8 space-y-6">
                    {[
                      { zone: "Ameerpet Metro", risk: "Low", last: "2h ago" },
                      { zone: "Secunderabad", risk: "Moderate", last: "1h ago" },
                      { zone: "HITEC City", risk: "Safe", last: "Live" }
                    ].map(item => (
                      <div key={item.zone} className="flex items-center justify-between border-b border-[#0A1F17]/5 pb-4">
                         <div>
                            <p className="text-sm font-bold text-[#0A1F17]">{item.zone}</p>
                            <p className="text-[10px] font-bold text-[#3E4F45]/40">{item.last}</p>
                         </div>
                         <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase ${item.risk === "Safe" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                            {item.risk}
                         </span>
                      </div>
                    ))}
                 </div>
                 <button className="mt-8 w-full rounded-2xl bg-slate-50 py-3 text-xs font-black uppercase tracking-widest text-[#0A1F17] hover:bg-slate-100 transition">View Full Map</button>
              </div>

              <div className="glass-card rounded-[32px] p-8 bg-[#0A1F17] text-white border-none">
                 <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-emerald-400">
                    <AlertCircle size={16} />
                    Emergency Broadcast
                 </h4>
                 <p className="mt-4 text-xs font-medium text-white/60 leading-relaxed">
                    "Visibility check in Banjara Hills Road No. 12 improved. Street lighting restored."
                 </p>
                 <div className="mt-6 flex h-1 w-full bg-white/10 overflow-hidden rounded-full">
                    <div className="h-full w-2/3 bg-emerald-500" />
                 </div>
              </div>
           </aside>
        </div>
      )}

      {activeView === "report" && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
           <button onClick={() => setActiveView("hub")} className="flex items-center gap-2 text-sm font-bold text-rose-600 hover:opacity-70">
              <PhoneCall size={16} /> Back to Command Hub
           </button>
           <div className="mx-auto max-w-3xl">
              <ComplaintForm initialCategory="Women Safety" />
           </div>
        </div>
      )}

      <ContextualAI 
        moduleName="Safety AI"
        initialMessage="I'm monitoring the environment for safety keywords. How can I help you today? You can say 'SOS' or 'Unsafe' to trigger emergency protocols."
        suggestions={["One-tap SOS guide", "Report stalking", "Share live location", "Anonymous tips"]}
      />
    </div>
  );
}