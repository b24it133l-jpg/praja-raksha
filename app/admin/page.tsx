"use client";

import { useEffect, useMemo, useState } from "react";
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  Users, 
  ShieldAlert, 
  CheckCircle2, 
  Activity,
  AlertTriangle,
  Clock,
  MoreHorizontal,
  ChevronRight,
  Zap,
  Globe,
  HeartPulse
} from "lucide-react";
import { Complaint, ComplaintCategory, ComplaintStatus } from "@/types";
import StatusChip from "@/components/StatusChip";
import PriorityChip from "@/components/PriorityChip";
import { getGrievances, logout } from "@/lib/actions";

export default function AdminPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  useEffect(() => {
    async function load() {
      try {
        const result = await getGrievances(1, 100); // Fetch top 100 for admin overview
        setComplaints(result.data as Complaint[]);
      } catch (error) {
        console.error("Failed to load grievances:", error);
      }
    }
    load();
  }, []);

  const stats = useMemo(() => {
    const total = complaints.length;
    const critical = complaints.filter((c) => c.priority === "Critical").length;
    const resolved = complaints.filter((c) => c.status === "Resolved").length;
    const inProgress = complaints.filter((c) => c.status === "In Progress" || c.status === "Assigned").length;
    
    return [
      { label: "Total Reports", value: total, icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
      { label: "Critical Priority", value: critical, icon: ShieldAlert, color: "text-red-600", bg: "bg-red-50" },
      { label: "Active Resolve", value: inProgress, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
      { label: "Fully Resolved", value: resolved, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
    ];
  }, [complaints]);

  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           c.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "All" || c.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [complaints, searchQuery, categoryFilter]);

  const categories = ["All", "Civic", "Women Safety", "Narcotics", "Sanitation", "Water", "Roads", "Street Lights", "Schemes", "Locality Issues"];

  return (
    <main className="main-shell min-h-screen">
      <header className="mb-10">
        <div className="flex items-center gap-3">
          <div className="module-icon">
            <Users size={24} />
          </div>
          <div>
            <p className="section-label">Central Control</p>
            <h1 className="title-lg text-[#0A1F17]">Admin Dashboard</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <p className="mt-4 max-w-2xl text-body">
            Monitor real-time safety reports, manage department routing, and oversee critical interventions across all sectors.
          </p>
          <button 
            onClick={() => logout()}
            className="rounded-xl border border-[#0A1F17]/10 px-6 py-2 text-xs font-bold hover:bg-[#0A1F17]/5 transition"
          >
            Terminal Logout
          </button>
        </div>
      </header>

      {/* Scaling Aware Stats Grid */}
      <div className="grid-cards cols-4 mb-10">
        <div className="glass-card flex flex-col justify-between rounded-[28px] p-6 border-l-4 border-emerald-500">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#708176]">Total Reports</p>
            <h3 className="mt-2 text-3xl font-black text-[#0A1F17]">{complaints.length}</h3>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-600">
             <Activity size={12} /> Live Sync
          </div>
        </div>

        <div className="glass-card flex flex-col justify-between rounded-[28px] p-6 bg-[#0A1F17] text-white border-none shadow-xl shadow-emerald-900/20">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Concurrent Load</p>
            <h3 className="mt-2 text-3xl font-black italic">14.2k</h3>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-300">
             <Zap size={12} /> Peak Ready: 100k+
          </div>
        </div>

        <div className="glass-card flex flex-col justify-between rounded-[28px] p-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#708176]">Edge Nodes</p>
            <h3 className="mt-2 text-3xl font-black text-[#0A1F17]">3 Active</h3>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-400">
             HYD / WGL / NZB
          </div>
        </div>

        <div className="glass-card flex flex-col justify-between rounded-[28px] p-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#708176]">SLA Compliance</p>
            <h3 className="mt-2 text-3xl font-black text-[#0A1F17]">98.4%</h3>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-600">
             <CheckCircle2 size={12} /> Target Met
          </div>
        </div>
      </div>

      {/* SHARED AI INTELLIGENCE GRID */}
      <section className="mb-10">
         <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <Zap size={20} />
               </div>
               <div>
                 <h3 className="text-xl font-black text-[#0A1F17]">Shared Intelligence Layer</h3>
                 <p className="text-[10px] font-bold text-[#3E4F45]/40 uppercase tracking-widest">Cross-Module Central Engine (SIL-v1)</p>
               </div>
            </div>
            <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase text-emerald-700">
               <Activity size={12} className="animate-pulse" /> Live Audit Sync
            </span>
         </div>

         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Auto-Routing Accuracy", value: "94.2%", stat: "+2.1%", icon: Activity },
              { label: "Duplicate Detection", value: "128", stat: "Saved 12h", icon: Search },
              { label: "Multilingual Latency", value: "42ms", stat: "Optimized", icon: Globe },
              { label: "Sentiment Index", value: "High", stat: "Positive", icon: HeartPulse }
            ].map((aiStat, i) => (
              <div key={i} className="glass-card rounded-3xl p-6 border-purple-600/5 hover:border-purple-600/20 transition-all">
                 <div className="flex items-center justify-between mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                       <aiStat.icon size={16} />
                    </div>
                    <span className="text-[10px] font-black text-purple-600">{aiStat.stat}</span>
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-[#0A1F17]/40">{aiStat.label}</p>
                 <h4 className="mt-1 text-2xl font-black text-[#0A1F17]">{aiStat.value}</h4>
              </div>
            ))}
         </div>
      </section>

      {/* Main Content Area */}
      <div className="glass-card overflow-hidden rounded-[32px]">
        {/* Controls */}
        <div className="flex flex-col gap-4 border-b border-[#0A1F17]/5 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-[#0A1F17]">Complaint Records</h2>
            <span className="rounded-full bg-[#0F5D46]/10 px-3 py-1 text-xs font-bold text-[#0F5D46]">
              {filteredComplaints.length} Records
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3E4F45]/50" size={18} />
              <input 
                type="text" 
                placeholder="Search by ID or Title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-[#0A1F17]/10 bg-white/50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-[#0F5D46]/50 focus:bg-white md:w-64"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3E4F45]/50" size={18} />
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none rounded-full border border-[#0A1F17]/10 bg-white/50 py-2.5 pl-10 pr-10 text-sm outline-none transition-all focus:border-[#0F5D46]/50 focus:bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#0A1F17]/[0.02] text-xs font-bold uppercase tracking-wider text-[#3E4F45]">
                <th className="px-6 py-4">Complaint ID</th>
                <th className="px-6 py-4">Report Details</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0A1F17]/5">
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-[#3E4F45]">
                      <AlertTriangle size={48} className="mb-4 opacity-20" />
                      <p className="text-lg font-medium">No complaints found</p>
                      <p className="text-sm opacity-60">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredComplaints.map((item) => (
                  <tr key={item.id} className="group transition-colors hover:bg-[#0A1F17]/[0.01]">
                    <td className="px-6 py-5">
                      <span className="font-mono text-xs font-semibold text-[#0F5D46]">
                        {item.id.slice(0, 8)}...
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div>
                        <p className="text-sm font-semibold text-[#0A1F17]">{item.title}</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-[#3E4F45]/70">
                          <Activity size={12} />
                          {item.location}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-medium text-[#3E4F45]">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <PriorityChip priority={item.priority} />
                    </td>
                    <td className="px-6 py-5">
                      <StatusChip status={item.status} />
                    </td>
                    <td className="px-6 py-5">
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#0A1F17]/10 bg-white transition-all hover:border-[#0F5D46] hover:text-[#0F5D46]">
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="bg-[#0A1F17]/[0.02] px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-[#3E4F45]/60 italic">
            * Data is synced with local nodes. Updates are reflected across the central grid immediately.
          </p>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#0A1F17]/30">
            © 2026 Charan Anumula — All Rights Reserved
          </p>
        </div>
      </div>
    </main>
  );
}