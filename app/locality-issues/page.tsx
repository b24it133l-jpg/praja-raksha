"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  MapPin, 
  ChevronRight, 
  Sparkles,
  Info,
  Search,
  CheckCircle2,
  Filter
} from "lucide-react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { civicCategories } from "@/lib/data";
import ComplaintForm from "@/components/ComplaintForm";
import ContextualAI from "@/components/ContextualAI";

export default function LocalityIssuesPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof civicCategories[0] | null>(null);
  const [selectedSubTitle, setSelectedSubTitle] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = civicCategories.filter(cat => 
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.subtitles.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const resetSelection = () => {
    setSelectedCategory(null);
    setSelectedSubTitle(null);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-12 pb-24">
      {/* Header Section */}
      <header className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A1F17] text-emerald-400">
              <Icons.Shield size={24} />
            </div>
            <p className="section-label !text-[#0A1F17] font-bold">Comprehensive Civic Hub</p>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-[#0A1F17] md:text-5xl lg:text-6xl">
            Locality Issues & <br/> <span className="text-emerald-700">Infrastructure</span>
          </h1>
          <p className="max-w-2xl text-lg text-[#3E4F45]/80 leading-relaxed font-medium">
             A professional-grade grievance system covering 15+ specialized categories. Report local failures directly to the relevant municipal or rural wings.
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center lg:w-auto">
           <div className="relative flex-grow lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3E4F45]/30" size={18} />
              <input 
                type="text" 
                placeholder="Search issue or sub-category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-[#0A1F17]/5 bg-white py-4 pl-12 pr-4 text-sm outline-none shadow-sm transition focus:border-emerald-600/30"
              />
           </div>
           <div className="hidden h-12 w-[1px] bg-[#0A1F17]/5 lg:block" />
           <div className="flex items-center gap-4 px-4">
              <div className="text-right">
                 <p className="text-[10px] font-black uppercase tracking-widest text-[#0A1F17]/40">Active Protocols</p>
                 <p className="text-sm font-bold text-emerald-700">62 Live Streams</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                 <Filter size={20} />
              </div>
           </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="grid gap-12 lg:grid-cols-[1fr_350px]">
        <div className="space-y-12">
          {selectedCategory ? (
            <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button 
                onClick={resetSelection}
                className="flex items-center gap-2 text-sm font-bold text-emerald-700 hover:opacity-70"
              >
                <ArrowLeft size={16} /> Back to Categories
              </button>

              <div className="glass-card flex flex-col gap-8 rounded-[40px] p-8 md:p-12">
                 <div className="flex items-center gap-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700">
                       {(() => {
                         // @ts-ignore
                         const IconComponent = Icons[selectedCategory.icon as keyof typeof Icons];
                         return IconComponent ? <IconComponent size={40} /> : <Icons.HelpCircle size={40} />;
                       })()}
                    </div>
                    <div>
                       <h2 className="text-3xl font-black text-[#0A1F17]">{selectedCategory.title}</h2>
                       <p className="text-sm font-medium text-[#3E4F45]/60">Select the specific issue from the suggestions below</p>
                    </div>
                 </div>

                 <div className="flex flex-wrap gap-3">
                    {selectedCategory.subtitles.map(sub => (
                       <button 
                        key={sub}
                        onClick={() => setSelectedSubTitle(sub)}
                        className={`rounded-2xl px-6 py-4 text-sm font-bold transition-all ${
                          selectedSubTitle === sub 
                            ? "bg-[#0A1F17] text-white shadow-xl" 
                            : "bg-white border border-[#0A1F17]/5 text-[#0A1F17] hover:bg-slate-50 shadow-sm"
                        }`}
                       >
                         {sub}
                       </button>
                    ))}
                 </div>

                 <div className="soft-divider" />

                 {selectedSubTitle && (
                    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-300">
                       <div className="flex items-start gap-4 rounded-2xl bg-emerald-50 p-6 border border-emerald-100">
                          <Icons.AlertCircle className="shrink-0 text-emerald-700" size={24} />
                          <div>
                             <h4 className="font-bold text-emerald-900">Submission Context: {selectedSubTitle}</h4>
                             <p className="mt-1 text-xs text-emerald-700/70 leading-relaxed font-medium">
                                Providing this specific detail helps our machine-learning routing engine assign your case to the 
                                specialized **{selectedCategory.title}** maintenance team with 100% precision.
                             </p>
                          </div>
                       </div>
                       <ComplaintForm initialCategory="Locality Issues" />
                    </div>
                 )}
              </div>
            </section>
          ) : (
            <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCategories.map((cat, idx) => (
                <button 
                  key={cat.title}
                  onClick={() => setSelectedCategory(cat)}
                  className="glass-card group flex items-start gap-5 rounded-[36px] p-7 transition-all hover:scale-[1.02] hover:shadow-2xl hover:bg-white active:scale-95"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all group-hover:bg-emerald-100 group-hover:text-emerald-700">
                     {(() => {
                        const IconComp = (Icons as any)[cat.icon];
                        return IconComp ? <IconComp size={24} /> : <Icons.HelpCircle size={24} />;
                     })()}
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-bold text-[#0A1F17] group-hover:text-emerald-700 transition-colors uppercase tracking-tight">{cat.title}</h3>
                    <p className="mt-2 text-[10px] font-semibold text-[#3E4F45]/40 leading-relaxed">
                      {cat.subtitles.length} specialised sub-categories for precision reporting.
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-[10px] font-black text-emerald-600 opacity-0 transition-opacity group-hover:opacity-100 uppercase tracking-widest">
                       Enter Module <ChevronRight size={12} />
                    </div>
                  </div>
                </button>
              ))}
            </section>
          )}
        </div>

        {/* Sidebar Info */}
        <aside className="space-y-6">
          <div className="glass-card rounded-[32px] p-8 border-l-4 border-emerald-500">
             <div className="flex items-center gap-3">
                <Sparkles size={20} className="text-emerald-600" />
                <h4 className="text-sm font-black uppercase tracking-[0.15em] text-[#0A1F17]">AI Suggested</h4>
             </div>
             <p className="mt-5 text-xs font-bold leading-relaxed text-[#3E4F45]/60">
                Our platform uses natural language processing to identify the core issue even if you're unsure of the category. 
             </p>
             <div className="mt-8 space-y-3">
                {selectedCategory ? selectedCategory.subtitles.slice(0, 3).map(sub => (
                  <div key={sub} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-[10px] font-bold text-[#0A1F17]">
                     <CheckCircle2 size={14} className="text-emerald-500" />
                     {sub}
                  </div>
                )) : (
                  <div className="rounded-2xl border-2 border-dashed border-slate-200 p-6 text-center">
                     <p className="text-[10px] font-black italic text-slate-300 uppercase">Select a module to see AI suggestions</p>
                  </div>
                )}
             </div>
          </div>

          <div className="glass-card rounded-[32px] p-8">
             <div className="flex items-center gap-3">
                <Info size={20} className="text-[#0A1F17]" />
                <h4 className="text-sm font-black uppercase tracking-[0.15em] text-[#0A1F17]">Protocol Stats</h4>
             </div>
             <div className="mt-8 space-y-6">
                {[
                  { label: "Active Records", val: "1.2k", stat: "Live" },
                  { label: "Avg Resolution", val: "48h", stat: "SLA" },
                  { label: "Precision", val: "100%", stat: "Verified" }
                ].map(item => (
                  <div key={item.label}>
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#708176]">{item.label}</span>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[8px] font-black text-emerald-700">{item.stat}</span>
                     </div>
                     <p className="mt-1 text-lg font-black text-[#0A1F17]">{item.val}</p>
                  </div>
                ))}
             </div>
          </div>
        </aside>
      </div>

      <ContextualAI 
        moduleName={selectedCategory ? `${selectedCategory.title} Intelligence` : "Civic Infrastructure"}
        initialMessage={selectedCategory 
          ? `I'm your specialized assistant for ${selectedCategory.title}. Can I help you choose a specific sub-category?` 
          : "Namaste! I'm the Civic AI. I can help navigate through the 15+ specialized reporting wings. What's on your mind?"}
        suggestions={selectedCategory ? selectedCategory.subtitles.slice(0, 3) : ["Report Pothole", "Water supply issue", "Grievance status"]}
      />
    </div>
  );
}