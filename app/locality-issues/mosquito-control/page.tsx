"use client";

import ComplaintForm from "@/components/ComplaintForm";
import { Zap, Info, Bug, Trash2, ArrowLeft, HeartPulse } from "lucide-react";
import Link from "next/link";

export default function MosquitoControlPage() {
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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700">
              <Zap size={24} />
            </div>
            <p className="section-label !text-yellow-800 font-bold">Public Health Division</p>
          </div>
          <h1 className="title-lg text-[#0A1F17]">Sanitation & Mosquito Control</h1>
          <p className="max-w-xl text-body">
            Request anti-mosquito fogging, garbage collection, or stagnant water treatment. Reports are linked to the Public Health & Sanitation wing for immediate locality response.
          </p>
        </div>

        <div className="flex gap-4">
           {[
             { label: "Fogging", icon: Bug, color: "text-amber-600" },
             { label: "Garbage", icon: Trash2, color: "text-rose-600" }
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
            <div className="rounded-[32px] bg-yellow-500 p-8 text-[#0A1F17]">
               <div className="flex items-center gap-3 mb-4">
                  <HeartPulse size={20} className="text-[#0A1F17]" />
                  <h3 className="font-bold">Health Advisory:</h3>
               </div>
               <p className="text-sm font-medium text-[#0A1F17]/70 leading-relaxed">
                  Stagnant water in empty plots or construction sites is a primary breeding ground. Reporting these helps the municipality take preventive legal action and implement focal spraying.
               </p>
            </div>
            <ComplaintForm initialCategory="Locality Issues" />
         </div>

         <div className="space-y-6">
            <div className="glass-card rounded-[32px] p-6 shadow-sm">
               <h4 className="font-bold text-[#0A1F17]">Sanitation Metrics</h4>
               <p className="mt-1 text-xs text-[#3E4F45]/60">Department: Health & Sanitation</p>
               
               <div className="mt-6 space-y-4">
                  {[
                    { label: "Units Active", val: "28", color: "text-amber-700" },
                    { label: "Fogging Today", val: "12 Areas", color: "text-emerald-700" },
                    { label: "Complaints Open", val: "6", color: "text-rose-700" }
                  ].map(s => (
                    <div key={s.label} className="flex items-center justify-between border-b border-[#0A1F17]/5 pb-3">
                       <span className="text-xs font-semibold text-[#3E4F45]/80">{s.label}</span>
                       <span className={`text-sm font-black ${s.color}`}>{s.val}</span>
                    </div>
                  ))}
               </div>

               <div className="mt-8 rounded-2xl bg-white/50 p-4 border border-yellow-200">
                  <p className="text-[10px] text-yellow-700 font-bold uppercase tracking-widest">Citizen Tip</p>
                  <p className="mt-2 text-xs text-[#3E4F45]/80 leading-relaxed">
                     Proper waste segregation at the source speeds up garbage collection efforts significantly.
                  </p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
