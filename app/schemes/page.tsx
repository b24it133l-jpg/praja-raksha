"use client";

import ContextualAI from "@/components/ContextualAI";
import { Info, BookOpen, Users, Tractor, Building2, ExternalLink, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SchemesPage() {
  const categories = [
    {
      title: "Farmer Welfare",
      count: "12 Schemes",
      icon: Tractor,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      schemes: ["Rythu Bharosa", "Crop Insurance", "Farm Mechanization"]
    },
    {
      title: "Education & Youth",
      count: "8 Schemes",
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-50",
      schemes: ["Overseas Scholarship", "Post-Matric Assistance", "Study Rooms"]
    },
    {
      title: "Social Welfare",
      count: "15 Schemes",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
      schemes: ["Aasara Pensions", "Kalyana Lakshmi", "Self-Help Groups"]
    },
    {
      title: "Housing & Urban",
      count: "5 Schemes",
      icon: Building2,
      color: "text-amber-600",
      bg: "bg-amber-50",
      schemes: ["Indiramma Indlu", "Double Bedroom Housing", "PM AY"]
    }
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-12 pb-16">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <Info size={24} />
          </div>
          <p className="section-label !text-blue-800 font-bold">Welfare Directory</p>
        </div>
        <h1 className="title-lg text-[#0A1F17]">Government Welfare Schemes</h1>
        <p className="max-w-2xl text-body">
          Explore comprehensive information on state and central government schemes tailored for the people of Telangana. Get guidance on eligibility, application processes, and tracking.
        </p>
      </header>

      {/* Categories Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <div key={cat.title} className="glass-card flex flex-col rounded-[32px] p-6 hover:bg-white/80 transition-all">
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${cat.bg} ${cat.color}`}>
              <cat.icon size={26} />
            </div>
            <h3 className="text-lg font-bold text-[#0A1F17]">{cat.title}</h3>
            <p className="mt-1 text-xs font-medium text-[#3E4F45]/60">{cat.count}</p>
            
            <ul className="mt-6 space-y-3 flex-grow">
              {cat.schemes.map((s) => (
                <li key={s} className="flex items-center gap-2 text-xs font-semibold text-[#3E4F45]/80">
                  <ChevronRight size={14} className="text-blue-400" />
                  {s}
                </li>
              ))}
            </ul>
            
            <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-white/50 border border-[#0A1F17]/5 py-3 text-xs font-bold text-[#0A1F17] transition hover:bg-white hover:shadow-sm">
              Explore More <ExternalLink size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Featured Insight */}
      <section className="glass-card relative overflow-hidden rounded-[40px] p-8 md:p-12 bg-white/40 border border-[#0A1F17]/5 shadow-none">
        <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <span className="rounded-full bg-blue-600 px-4 py-1 text-[0.65rem] font-black uppercase text-white">Eligibility Check</span>
            <h2 className="text-3xl font-bold leading-tight text-[#0A1F17] md:text-4xl">
              Confused about <br/>scheme criteria?
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-[#3E4F45]/70">
              Our specialized Welfare AI can help you prepare documentation and verify your eligibility for state policies like Indiramma Indlu and Rythu Bharosa.
            </p>
          </div>
          
          <div className="hidden h-64 w-64 md:block">
            <div className="h-full w-full rounded-full bg-blue-50 flex items-center justify-center border border-blue-100/50">
              <Info size={120} className="text-blue-600/10" />
            </div>
          </div>
        </div>
      </section>

      <ContextualAI 
        moduleName="Welfare Schemes"
        initialMessage="I can help you navigate welfare schemes. Are you looking for education, housing, or agricultural support?"
        suggestions={["Check Indiramma Indlu", "Rythu Bharosa help", "White card eligibility"]}
      />
    </div>
  );
}