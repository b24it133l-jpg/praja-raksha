"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Complaint } from "@/types";
import StatusChip from "./StatusChip";
import PriorityChip from "./PriorityChip";
import { Clock, MapPin, Tag, ArrowRight, Activity, ShieldCheck, Search } from "lucide-react";

export default function ComplaintList() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("praja-raksha-complaints");
    const parsed: Complaint[] = stored ? JSON.parse(stored) : [];
    setComplaints(parsed);
  }, []);

  if (complaints.length === 0) {
    return (
      <div className="glass-card flex flex-col items-center justify-center rounded-[40px] p-16 text-center shadow-xl border-dashed border-2 border-[#0A1F17]/5">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 text-slate-200">
           <Search size={40} />
        </div>
        <h2 className="text-2xl font-black text-[#0A1F17]">No Active Intelligence</h2>
        <p className="mt-2 max-w-xs text-sm font-medium leading-relaxed text-[#3E4F45]/40 italic">
          The forensic grid is currently clear. Be the first to report a grievance in your locality.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
           <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Activity size={18} className="animate-pulse" />
           </div>
           <div>
              <h2 className="text-xl font-black tracking-tight text-[#0A1F17]">Live Service Feed</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#0A1F17]/40">Real-time Grid Synchronization</p>
           </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase text-emerald-700">
           <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
           {complaints.length} Active Records
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {complaints.slice(0, 4).map((complaint) => (
          <div
            key={complaint.id}
            className="glass-card group relative flex flex-col justify-between overflow-hidden rounded-[36px] p-8 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95"
          >
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#0A1F17]/[0.02] transition-transform group-hover:scale-150" />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <p className="font-mono text-[10px] font-black uppercase tracking-widest text-emerald-700/60">
                   {complaint.id}
                </p>
                <PriorityChip priority={complaint.priority} />
              </div>

              <h3 className="mt-4 text-xl font-black leading-tight text-[#0A1F17] group-hover:text-emerald-700 transition-colors">
                {complaint.title}
              </h3>
              
              <p className="mt-3 line-clamp-2 text-xs font-medium leading-relaxed text-[#3E4F45]/60">
                {complaint.description}
              </p>
            </div>

            <div className="relative z-10 mt-8 space-y-4">
               <div className="flex flex-wrap gap-3">
                  <StatusChip status={complaint.status} />
                  <div className="flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-[#3E4F45]">
                    <Tag size={12} className="text-emerald-600" />
                    {complaint.category}
                  </div>
               </div>

               <div className="flex items-center justify-between pt-4 border-t border-[#0A1F17]/5">
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#3E4F45]/50">
                        <MapPin size={12} />
                        {complaint.location}
                     </div>
                     <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#3E4F45]/50">
                        <Clock size={12} />
                        {complaint.createdAt.split(',')[0]}
                     </div>
                  </div>
                  <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0A1F17] text-white opacity-0 transition-all group-hover:opacity-100 hover:bg-emerald-700">
                     <ArrowRight size={14} />
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
      
      {complaints.length > 4 && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/dashboard"
            className="group flex items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-[#0A1F17] shadow-xl transition-all hover:bg-[#0A1F17] hover:text-white"
          >
            Access Full Grid ({complaints.length} Records)
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </div>
  );
}