"use client";

import { useState } from "react";
import { 
  Bot, 
  User, 
  Sparkles, 
  SendHorizontal, 
  Info,
  ChevronRight,
  MessageSquareShare,
  Zap,
  Activity,
  ShieldCheck,
  Globe
} from "lucide-react";
import { analyzeInput, AIAnalysisResult } from "@/lib/ai";

interface Message {
  role: "user" | "assistant";
  text: string;
  analysis: AIAnalysisResult | null;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Namaste! I am the Praja Raksha Shared Intelligence Layer (SIL). I can analyze your grievances, identify departments, and provide emergency guidance. How can I assist you?",
      analysis: null
    }
  ]);
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", text: input, analysis: null };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsAnalyzing(true);

    try {
      const result = await analyzeInput(input);
      const assistantMessage: Message = {
        role: "assistant",
        text: `Analysis complete. I've classified this as a **${result.category}** issue. Due to its nature, I've assigned it **${result.priority}** priority and routed it to **${result.department}**.`,
        analysis: result
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant" as const, text: "I encountered a synchronization error in the state grid. Please try again.", analysis: null }]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-12">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <Sparkles size={18} />
            </div>
            <p className="section-label">Unified Intelligence Layer</p>
          </div>
          <h1 className="title-lg mt-2 text-[#0A1F17]">AI Command Assistant</h1>
        </div>
        
        <div className="flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
          <Activity size={14} className="animate-pulse" />
          <span>Central Engine Live</span>
        </div>
      </header>

      <section className="glass-card flex flex-col overflow-hidden rounded-[40px] shadow-2xl border-white/40">
        {/* Chat Area */}
        <div className="flex-grow space-y-6 p-6 md:p-10 bg-white/20 backdrop-blur-sm min-h-[500px] max-h-[600px] overflow-y-auto custom-scrollbar">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-4 ${message.role === "assistant" ? "flex-row" : "flex-row-reverse"}`}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl shadow-sm ${
                message.role === "assistant" ? "bg-white text-emerald-700 border border-emerald-100" : "bg-[#0A1F17] text-white"
              }`}>
                {message.role === "assistant" ? <Bot size={20} /> : <User size={20} />}
              </div>
              
              <div
                className={`max-w-[85%] rounded-[28px] px-6 py-5 shadow-sm ${
                  message.role === "assistant"
                    ? "bg-white text-[#0A1F17] rounded-tl-none border border-emerald-50/50"
                    : "bg-[#0A1F17] text-white rounded-tr-none"
                }`}
              >
                <div className="text-sm leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: message.text.replace(/\*\*(.*?)\*\*/g, '<b class="text-emerald-700">$1</b>') }} />
                
                {message.analysis && (
                  <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                     <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-[8px] font-black uppercase text-slate-400">Routed Dept</p>
                        <p className="text-[10px] font-bold text-[#0A1F17] mt-1">{message.analysis.department}</p>
                     </div>
                     <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-[8px] font-black uppercase text-slate-400">Confidence</p>
                        <p className="text-[10px] font-bold text-[#0A1F17] mt-1">{(message.analysis.confidence * 100).toFixed(0)}% AI Logic</p>
                     </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isAnalyzing && (
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs animate-pulse">
               <Zap size={14} /> SIL Engine is analyzing your intent...
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-100 bg-white p-6 md:px-10">
          <div className="relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Report an incident or ask about a scheme..."
              disabled={isAnalyzing}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50/50 py-5 pl-8 pr-16 text-sm outline-none transition-all focus:border-emerald-600/30 focus:bg-white"
            />
            <button 
              onClick={handleSend}
              disabled={isAnalyzing}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-xl transition hover:bg-emerald-800 disabled:opacity-50"
            >
              <SendHorizontal size={20} />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-6">
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#0A1F17]/40">
                <ShieldCheck size={14} className="text-emerald-600" /> Secure Protocol
             </div>
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#0A1F17]/40">
                <Globe size={14} className="text-blue-600" /> Multi-Dialect Support
             </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass-card flex items-start gap-4 rounded-[40px] p-8">
          <div className="h-12 w-12 shrink-0 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <MessageSquareShare size={24} />
          </div>
          <div>
            <h4 className="text-lg font-black text-[#0A1F17]">Forensic Structuring</h4>
            <p className="mt-2 text-xs text-[#3E4F45]/60 font-medium leading-relaxed">The SIL engine automatically formats your raw input into a professional, evidence-backed narrative for faster departmental resolution.</p>
          </div>
        </div>
        <div className="glass-card flex items-start gap-4 rounded-[40px] p-8">
          <div className="h-12 w-12 shrink-0 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Zap size={24} />
          </div>
          <div>
            <h4 className="text-lg font-black text-[#0A1F17]">Proactive Detection</h4>
            <p className="mt-2 text-xs text-[#3E4F45]/60 font-medium leading-relaxed">Advanced sentiment indexing and keyword triggers identify emergency situations (like SOS needs) even before you finish typing.</p>
          </div>
        </div>
      </div>
    </div>
  );
}