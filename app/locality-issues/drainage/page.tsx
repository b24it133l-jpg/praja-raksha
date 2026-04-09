"use client";

import ComplaintForm from "@/components/ComplaintForm";
import { Activity, Info, Droplets, Trash2, ArrowLeft, Wind } from "lucide-react";
import Link from "next/link";

export default function DrainagePage() {
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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Activity size={24} />
            </div>
            <p className="section-label !text-emerald-800 font-bold">Drainage & Desilting</p>
          </div>
          <h1 className="title-lg text-[#0A1F17]">Drainage Systems</h1>
          <p className="max-w-xl text-body">
            Report blocked drains, manhole damage, or desilting requirements. Routine and emergency maintenance is handled by the Centralized Canal Command.
          </p>
        </div>

        <div className="flex gap-4">
           {[
             { label: "Blocked", icon: Trash2, color: "text-rose-600" },
             { label: "Overflow", icon: Droplets, color: "text-emerald-600" }
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
            <div className="rounded-[32px] bg-emerald-900 p-8 text-white">
               <div className="flex items-center gap-3 mb-4">
                  <Wind size={20} className="text-emerald-300" />
                  <h3 className="font-bold">Monsoon Alert:</h3>
               </div>
               <p className="text-sm text-emerald-100/70 leading-relaxed">
                  During monsoon periods, drainage reports are classified as **Critical** by default to prevent urban flooding. Please mention if there is stagnant water near residential entrances.
               </p>
            </div>
            <ComplaintForm initialCategory="Locality Issues" />
         </div>

         <div className="space-y-6">
            <div className="glass-card rounded-[32px] p-6">
               <h4 className="font-bold text-[#0A1F17]">System Health</h4>
               <p className="mt-1 text-xs text-[#3E4F45]/60">Drainage Network: TG-Civic Net</p>
               
               <div className="mt-6 space-y-4">
                  {[
                    { label: "Desilting Active", val: "Yes", color: "text-emerald-700" },
                    { label: "Manholes Fixed", val: "42", color: "text-emerald-700" },
                    { label: "Pending Blocks", val: "5", color: "text-amber-700" }
                  ].map(s => (
                    <div key={s.label} className="flex items-center justify-between border-b border-[#0A1F17]/5 pb-3">
                       <span className="text-xs font-semibold text-[#3E4F45]/80">{s.label}</span>
                       <span className={`text-sm font-black ${s.color}`}>{s.val}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
