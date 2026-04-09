import ModuleCard from "@/components/ModuleCard";
import TrackerCard from "@/components/TrackerCard";
import DashboardSummary from "@/components/DashboardSummary";
import { modules, sampleComplaints, trackerSteps, stats, trustHighlights } from "@/lib/data";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Zap, Search, Fingerprint } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Body: THE IDENTITY SECTION */}
      <section className="relative overflow-hidden rounded-[50px] bg-[#0A1F17] py-20 px-8 text-white md:py-32 md:px-16 lg:px-24">
        {/* Background Decor */}
        <div className="absolute right-0 top-0 h-full w-full opacity-20">
             <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-500 blur-[120px]" />
             <div className="absolute bottom-[-20%] left-[-10%] h-[400px] w-[400px] rounded-full bg-emerald-700 blur-[150px]" />
        </div>

        <div className="relative z-10 flex flex-col gap-12 lg:flex-row lg:items-center">
          <div className="flex-grow space-y-8">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-emerald-500/20 px-4 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.2em] text-emerald-400 border border-emerald-500/30">
                GOVT OF TELANGANA
              </span>
              <div className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <h1 className="text-6xl font-black tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85]">
              PRAJA <br/> 
              <span className="text-emerald-500">RAKSHA</span>
            </h1>

            <p className="max-w-xl text-lg font-medium leading-relaxed text-emerald-50/60 md:text-xl">
              A unified, AI-powered public service ecosystem. Built to transform citizen grievance reporting into immediate administrative action with professional transparency.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/complaints"
                className="flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-[#0A1F17] transition hover:scale-105 active:scale-95"
              >
                Raise Current Grievance
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/ai-assistant"
                className="flex items-center gap-2 rounded-2xl bg-white/10 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/20 active:scale-95 border border-white/10"
              >
                Talk to Assistant
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:w-[450px]">
             {trustHighlights.slice(0, 4).map((point, index) => (
                <div key={index} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                   <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                      {index === 0 ? <Zap size={20}/> : index === 1 ? <Search size={20}/> : index === 2 ? <ShieldCheck size={20}/> : <Fingerprint size={20}/>}
                   </div>
                   <p className="text-xs font-bold leading-relaxed text-white/80">{point}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* 2. CORE MODULES SECTION */}
      <section className="space-y-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="section-label">Service Infrastructure</p>
            <h2 className="title-lg text-[#0A1F17]">Core Functional Modules</h2>
            <p className="max-w-2xl text-body">
               Praja Raksha is architected as a complete public-service ecosystem, ensuring every citizen need is met with specialized departmental routing.
            </p>
          </div>
          <Link href="/schemes" className="flex items-center gap-2 text-sm font-bold text-emerald-700 hover:underline">
             View welfare directory <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid-cards cols-3">
          {modules.map((item, index) => (
            <ModuleCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </section>

      {/* 3. Operational Insights */}
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-card flex flex-col justify-between rounded-[40px] p-8 md:p-12 overflow-hidden relative">
          <div className="relative z-10 text-center md:text-left">
            <p className="section-label">State-wide Metrics</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0A1F17] md:text-4xl">
              Platform Analytics <br/>& Public Activity
            </h2>
            <div className="mt-10">
              <DashboardSummary stats={stats} />
            </div>
          </div>
          {/* Background Highlight */}
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-50 opacity-50" />
        </div>

        <div className="glass-card flex flex-col justify-between rounded-[40px] p-8 md:p-12 bg-emerald-900 text-white border-none">
          <div className="space-y-8">
            <div className="space-y-2">
               <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-emerald-400">Process Logic</p>
               <h3 className="text-2xl font-bold md:text-3xl">Smart Routing & <br/>Escalation Hierarchy</h3>
            </div>

            <div className="space-y-6">
              {trackerSteps.map((step, i) => (
                <div key={step.title} className="flex gap-5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-black text-emerald-400 border border-white/10 transition hover:scale-110">
                    0{i + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{step.title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-emerald-50/60">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-10">
            <Link
              href="/dashboard"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white/10 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Access Global Status Ledger
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Live Tracker Sample */}
      <section className="glass-card rounded-[40px] p-8 md:p-12">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="section-label">Public Accountability</p>
              <h2 className="mt-2 text-2xl font-bold text-[#0A1F17] md:text-3xl">Active Resolution Feed</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
               <ShieldCheck size={16} />
               Verified live activity
            </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sampleComplaints.slice(0, 3).map((item) => (
            <TrackerCard key={item.id} complaint={item} />
          ))}
        </div>
      </section>
    </div>
  );
}