"use client";

import { useEffect, useMemo, useState } from "react";
import { getComplaints, seedComplaintsIfEmpty } from "@/lib/helpers";
import { sampleComplaints } from "@/lib/data";
import { 
  BarChart3, 
  ShieldCheck, 
  AlertCircle, 
  Search,
  ChevronRight,
  Clock,
  MapPin,
  Activity
} from "lucide-react";
import StatusChip from "@/components/StatusChip";
import { Complaint } from "@/types";

export default function Dashboard() {
  const [data, setData] = useState<Complaint[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    seedComplaintsIfEmpty(sampleComplaints);
    setData(getComplaints());
  }, []);

  const stats = useMemo(() => {
    return [
      { 
        label: "My Reports", 
        value: data.length, 
        icon: BarChart3, 
        color: "text-emerald-600",
        bg: "bg-emerald-50"
      },
      { 
        label: "Resolved", 
        value: data.filter((item) => item.status === "Resolved").length, 
        icon: ShieldCheck, 
        color: "text-blue-600",
        bg: "bg-blue-50"
      },
      { 
        label: "In Progress", 
        value: data.filter((item) => item.status === "In Progress" || item.status === "Assigned").length, 
        icon: AlertCircle, 
        color: "text-amber-600",
        bg: "bg-amber-50"
      },
    ];
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter(c => 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  return (
    <div className="mx-auto max-w-5xl space-y-10 py-10">
      <header>
        <div className="flex items-center gap-3">
          <div className="module-icon">
            <Activity size={24} />
          </div>
          <div>
            <p className="section-label">Citizen Tracking</p>
            <h1 className="title-lg text-[#0A1F17]">Your Dashboard</h1>
          </div>
        </div>
        <p className="mt-4 text-body max-w-2xl">
          Track the progress of your submitted grievances, view official updates, and receive notifications about resolution milestones.
        </p>
      </header>

      {/* Metrics */}
      <div className="grid gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card flex items-center gap-5 rounded-[28px] p-6">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#3E4F45]/60">{stat.label}</p>
              <h2 className="text-3xl font-bold text-[#0A1F17]">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Complaints List Section */}
      <div className="glass-card overflow-hidden rounded-[32px]">
        <div className="flex flex-col gap-4 border-b border-[#0A1F17]/5 p-6 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold text-[#0A1F17]">Report History</h2>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3E4F45]/40" size={18} />
            <input 
              type="text" 
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[#0A1F17]/10 bg-white/50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-emerald-600/30 focus:bg-white md:w-64"
            />
          </div>
        </div>

        <div className="divide-y divide-[#0A1F17]/5 bg-white/20">
          {filteredData.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-body">No reports found.</p>
            </div>
          ) : (
            filteredData.map((c) => (
              <div key={c.id} className="group relative flex flex-col gap-4 p-6 transition-all hover:bg-white/40 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-[#0A1F17]/5 text-emerald-700 md:flex">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0A1F17] group-hover:text-emerald-800 transition-colors">
                      {c.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                      <p className="flex items-center gap-1 text-xs text-[#3E4F45]/70">
                        <MapPin size={12} />
                        {c.location}
                      </p>
                      <p className="text-xs font-mono font-medium text-emerald-600/60">
                        {c.id}
                      </p>
                      <p className="text-xs text-[#3E4F45]/50">
                        Submitted on {c.createdAt}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                  <StatusChip status={c.status} />
                  <button className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline">
                    View full timeline <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="bg-[#0A1F17]/[0.02] px-6 py-4">
          <p className="text-xs text-center text-[#3E4F45]/50 italic">
            All reports are processed under the Telangana State Public Service Delivery Guarantee Act.
          </p>
        </div>
      </div>
    </div>
  );
}