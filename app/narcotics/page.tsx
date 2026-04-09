"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  MapPin, 
  EyeOff, 
  Activity, 
  Camera, 
  Bot, 
  ArrowRight,
  Lock,
  AlertTriangle,
  SearchCode,
  Globe,
  Ghost,
  BarChart3,
  ChevronRight,
  ScanSearch
} from "lucide-react";
import ComplaintForm from "@/components/ComplaintForm";
import ContextualAI from "@/components/ContextualAI";

export default function NarcoticsPage() {
  const [activeView, setActiveView] = useState<"hub" | "report">("hub");

  const coreActions = [
    { id: "anonymous", title: "Anonymous Report", icon: Ghost, color: "bg-[#0A1F17] text-white", desc: "Anti-trace identity scrambling" },
    { id: "activity", title: "Report Drug Activity", icon: ScanSearch, color: "bg-white text-slate-900 border border-slate-100", desc: "Selling, usage, or storage storage" },
    { id: "evidence", title: "Upload Evidence", icon: Camera, color: "bg-white text-amber-600 border border-amber-100", desc: "Photos, 4K video, or voice logs" },
    { id: "track", title: "Track Case", icon: Activity, color: "bg-slate-50 text-slate-700", desc: "Live intelligence status sync" },
    { id: "risks", title: "High Risk Areas", icon: MapPin, color: "bg-amber-50 text-amber-900", desc: "View drug activity heatmaps" },
    { id: "ai", title: "AI Intelligence", icon: Bot, color: "bg-emerald-50 text-emerald-700", desc: "Suspicion detection & pattern analysis" }
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-12 pb-24">
      {/* HEADER: SECURE INTELLIGENCE PORT */}
      <header className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
               <ShieldCheck size={22} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-700">TGANB Intelligence Grid</p>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-[#0A1F17] md:text-6xl">
            Narcotics <br/> <span className="text-amber-600">Secure Report</span>
          </h1>
          <p className="max-w-2xl text-lg font-medium leading-relaxed text-[#3E4F45]/80">
            A hardened, anti-trace intelligence portal. Directly routed to the **Anti-Narcotics Bureau (TGANB)** with zero-knowledge encryption.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
           <div className="glass-card flex items-center gap-4 rounded-3xl bg-white/40 px-6 py-4 border border-[#0A1F17]/5">
              <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                 <Lock size={18} />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-[#0A1F17]/40">Privacy Protocol</p>
                 <p className="text-sm font-bold text-[#0A1F17]">Identity Scrambled</p>
              </div>
           </div>
        </div>
      </header>

      {/* SECURE CORE ACTIONS */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
         {coreActions.map((action) => (
           <button 
             key={action.id}
             onClick={() => action.id === "anonymous" || action.id === "activity" ? setActiveView("report") : null}
             className={`flex flex-col items-start gap-6 rounded-[40px] p-8 transition-all hover:-translate-y-1 hover:shadow-2xl active:scale-95 ${action.color}`}
           >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 shadow-sm backdrop-blur-md">
                 <action.icon size={28} />
              </div>
              <div className="text-left">
                 <h3 className="text-xl font-black tracking-tight">{action.title}</h3>
                 <p className="mt-2 text-xs font-semibold opacity-60 leading-relaxed">{action.desc}</p>
                 <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                    Open Channel <ChevronRight size={14} />
                 </div>
              </div>
           </button>
         ))}
      </section>

      {/* DYNAMIC CONTENT AREA */}
      <div className="soft-divider" />

      {activeView === "hub" && (
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
           <div className="space-y-8">
              <div className="glass-card rounded-[40px] p-8 md:p-12">
                 <h2 className="text-2xl font-black text-[#0A1F17]">Bureau Intelligence Infrastructure</h2>
                 <p className="mt-2 text-sm text-[#3E4F45]/60 font-medium tracking-tight">Direct link to Anti-Narcotics Bureau (TGANB)</p>
                 
                 <div className="mt-10 grid gap-8 sm:grid-cols-2">
                    {[
                      { title: "Anonymous Submission", status: "Anti-Trace", icon: Ghost },
                      { title: "Direct Routing", status: "Bureau Direct", icon: Globe },
                      { title: "Evidence Storage", status: "Encrypted", icon: Lock },
                      { title: "Risk Detection", status: "AI Active", icon: AlertTriangle },
                      { title: "Case Timeline", status: "Real-time", icon: BarChart3 }
                    ].map(feat => (
                      <div key={feat.title} className="flex items-center gap-4">
                         <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
                            <feat.icon size={22} />
                         </div>
                         <div>
                            <h4 className="text-sm font-bold text-[#0A1F17]">{feat.title}</h4>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#0A1F17]/40">{feat.status}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="glass-card flex items-center gap-6 rounded-[40px] bg-amber-600 p-8 text-white border-none shadow-2xl shadow-amber-900/10">
                 <div className="h-20 w-20 flex items-center justify-center rounded-full bg-white/10 shrink-0">
                    <AlertTriangle size={40} className="text-amber-200" />
                 </div>
                 <div>
                    <h3 className="text-xl font-black">Confidentiality Protocol</h3>
                    <p className="mt-2 text-sm text-amber-100/70 leading-relaxed">
                       Your identity is never logged. We use state-level zero-knowledge proofing to ensure your reporting is 100% anonymous.
                    </p>
                    <button className="mt-6 font-black uppercase text-[10px] tracking-[0.2em] underline decoration-amber-300 decoration-2 underline-offset-4">Legal Protection Policy</button>
                 </div>
              </div>
           </div>

           <aside className="space-y-6">
              <div className="glass-card rounded-[32px] p-8 border-l-4 border-amber-600">
                 <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#0A1F17]">
                    <SearchCode size={16} className="text-amber-600" />
                    Hotspot Analysis
                 </h4>
                 <div className="mt-8 space-y-6">
                    {[
                      { zone: "Public Parks - North", risk: "Elevated", last: "Reported 20m ago" },
                      { zone: "Warehouse District", risk: "Moderate", last: "Detected 2h ago" },
                      { zone: "Transit Terminals", risk: "Safe", last: "Audited" }
                    ].map(item => (
                      <div key={item.zone} className="flex items-center justify-between border-b border-[#0A1F17]/5 pb-4">
                         <div>
                            <p className="text-sm font-bold text-[#0A1F17]">{item.zone}</p>
                            <p className="text-[10px] font-bold text-[#3E4F45]/40">{item.last}</p>
                         </div>
                         <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase ${item.risk === "Safe" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                            {item.risk}
                         </span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="glass-card rounded-[32px] p-8 bg-[#0A1F17] text-white border-none">
                 <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-emerald-400">
                    <ShieldCheck size={16} />
                    Bureau Response
                 </h4>
                 <p className="mt-4 text-xs font-medium text-white/60 leading-relaxed">
                    "Intelligence gathered in Jubilee Hills successfully processed. Investigation in progress."
                 </p>
                 <div className="mt-6 flex h-1 w-full bg-white/10 overflow-hidden rounded-full">
                    <div className="h-full w-full bg-emerald-500 animate-pulse" />
                 </div>
              </div>
           </aside>
        </div>
      )}

      {activeView === "report" && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
           <button onClick={() => setActiveView("hub")} className="flex items-center gap-2 text-sm font-bold text-amber-600 hover:opacity-70">
              <SearchCode size={16} /> Back to Intelligence Hub
           </button>
           <div className="mx-auto max-w-3xl">
              <ComplaintForm initialCategory="Narcotics" />
           </div>
        </div>
      )}

      <ContextualAI 
        moduleName="Narcotics AI"
        initialMessage="I'm your secure Naras-Bureau assistant. All data is encrypted. Can I help you categorize a suspicious activity or explain our anti-trace reporting?"
        suggestions={["Anonymous reporting help", "What details are needed?", "Data privacy protocol", "Report suspicion"]}
      />
    </div>
  );
}