"use client";

import ComplaintForm from "@/components/ComplaintForm";
import { Droplets, Info, Droplet, Waves, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function WaterSewagePage() {
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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <Droplets size={24} />
            </div>
            <p className="section-label !text-blue-800 font-bold">Maintenance Division</p>
          </div>
          <h1 className="title-lg text-[#0A1F17]">Water & Sewage Management</h1>
          <p className="max-w-xl text-body">
            Dedicated module for reporting water pipe bursts, contaminated supply, and sewage overflows. Alerts are routed to the HMWSSB specialized field teams.
          </p>
        </div>

        <div className="flex gap-4">
           {[
             { label: "Pipe Burst", icon: Droplet, color: "text-blue-600" },
             { label: "Sewage Leak", icon: Waves, color: "text-indigo-600" }
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
            <div className="rounded-[32px] bg-blue-900 p-8 text-white">
               <div className="flex items-center gap-3 mb-4">
                  <Info size={20} className="text-blue-300" />
                  <h3 className="font-bold">Before you submit:</h3>
               </div>
               <ul className="space-y-3 text-sm text-blue-100/70">
                  <li>• Ensure the exact door number or landmark is provided.</li>
                  <li>• Upload clear photos of the leak or overflow area.</li>
                  <li>• Mention if the issue is causing a public health concern.</li>
               </ul>
            </div>
            <ComplaintForm initialCategory="Water" />
         </div>

         <div className="space-y-6">
            <div className="glass-card rounded-[32px] p-6">
               <h4 className="font-bold text-[#0A1F17]">Service Statistics</h4>
               <p className="mt-1 text-xs text-[#3E4F45]/60">HMWSSB Region: Hyderabad Central</p>
               
               <div className="mt-6 space-y-4">
                  {[
                    { label: "Active Repairs", val: "14", color: "text-blue-700" },
                    { label: "Avg Resolution", val: "18 Hours", color: "text-emerald-700" },
                    { label: "Uptime", val: "99.2%", color: "text-[#0A1F17]" }
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
