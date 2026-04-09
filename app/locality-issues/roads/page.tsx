"use client";

import ComplaintForm from "@/components/ComplaintForm";
import { HardHat, Info, Construction, Map, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RoadsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 pb-16">
      <Link 
        href="/locality-issues" 
        className="inline-flex items-center gap-2 text-sm font-bold text-[#0A1F17]/40 transition hover:text-[#0A1F17]"
      >
        <ArrowLeft size={16} />
        Back to Hub
      </Link>

      <header className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <HardHat size={24} />
            </div>
            <p className="section-label !text-slate-800 font-bold">Engineering Wing</p>
          </div>
          <h1 className="title-lg text-[#0A1F17]">Roads & Pothole Repair</h1>
          <p className="max-w-xl text-body">
            Report deep potholes, broken dividers, or collapsed medians. Submissions are analyzed for safety urgency and routed to GHMC Road Maintenance units.
          </p>
        </div>

        <div className="flex gap-4">
           {[
             { label: "Pothole", icon: Construction, color: "text-amber-600" },
             { label: "Map Loc", icon: Map, color: "text-slate-600" }
           ].map(i => (
             <div key={i.label} className="glass-card flex flex-col items-center gap-2 rounded-2xl p-4 text-center">
                <i.icon size={20} className={i.color} />
                <p className="text-[10px] font-black uppercase tracking-widest">{i.label}</p>
             </div>
           ))}
        </div>
      </header>

      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
         <div className="space-y-8">
            <div className="rounded-[32px] bg-slate-900 p-8 text-white">
               <div className="flex items-center gap-3 mb-4">
                  <Info size={20} className="text-amber-300" />
                  <h3 className="font-bold">Urgency Detection:</h3>
               </div>
               <p className="text-sm text-slate-100/70 leading-relaxed">
                  Our AI engine prioritizes reports based on pothole depth and traffic volume. High-risk zones are flagged for 24-hour response teams.
               </p>
            </div>
            <ComplaintForm initialCategory="Roads" />
         </div>

         <div className="space-y-6">
            <div className="glass-card rounded-[32px] p-6 shadow-sm">
               <h4 className="font-bold text-[#0A1F17]">Road Condition Stats</h4>
               <p className="mt-1 text-xs text-[#3E4F45]/60">Zone: Greater Hyderabad</p>
               
               <div className="mt-6 space-y-4">
                  {[
                    { label: "Potholes Closed", val: "1,420", color: "text-emerald-700" },
                    { label: "Pending Repair", val: "85", color: "text-amber-700" },
                    { label: "Critical Zones", val: "12", color: "text-rose-700" }
                  ].map(s => (
                    <div key={s.label} className="flex items-center justify-between border-b border-[#0A1F17]/5 pb-3">
                       <span className="text-xs font-semibold text-[#3E4F45]/80">{s.label}</span>
                       <span className={`text-sm font-black ${s.color}`}>{s.val}</span>
                    </div>
                  ))}
               </div>

               <div className="mt-8 rounded-2xl bg-slate-50 p-4 border border-slate-200">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Safety Advisory</p>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                     Avoid taking photos while driving. Park safely before reporting road defects.
                  </p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
