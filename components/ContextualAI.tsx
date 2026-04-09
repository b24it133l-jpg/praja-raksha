"use client";

import { useState } from "react";
import { Bot, X, MessageSquare, SendHorizontal, Sparkles } from "lucide-react";

interface ContextualAIProps {
  moduleName: string;
  initialMessage: string;
  suggestions: string[];
}

export default function ContextualAI({ moduleName, initialMessage, suggestions }: ContextualAIProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: initialMessage }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const userMsg = { role: "user", text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    
    // Simulating context-aware AI response
    setTimeout(() => {
      let response = "I'm analyzing your request based on special module protocols.";
      if (moduleName === "Women Safety") {
         response = "All details shared here are confidential. I'm connecting your report directly to the Women Protection Cell. Is there anything else you want to add about the location?";
      } else if (moduleName === "Locality Issues") {
         response = "I've detected this issue might fall under GHMC maintenance. Do you have a photo of the site? It speeds up resolution by 40%.";
      } else if (moduleName === "Welfare Schemes") {
         response = "I can help you check eligibility for Indiramma Indlu. Do you have your White Ration Card details ready?";
      }

      setMessages(prev => [...prev, { role: "assistant", text: response }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-[24px] border border-[#0A1F17]/10 bg-white shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
          <header className="flex items-center justify-between bg-[#0A1F17] p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-slate-950">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest">{moduleName} AI</h3>
                <p className="text-[10px] text-emerald-400 font-bold">Specialized Protocol Active</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-full p-1 hover:bg-white/10">
              <X size={18} />
            </button>
          </header>

          <div className="flex-grow space-y-4 overflow-y-auto p-4 scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "assistant" ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-xs shadow-sm ${
                  m.role === "assistant" ? "bg-slate-50 text-slate-900 border border-slate-100" : "bg-[#0A1F17] text-white"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#0A1F17]/5 p-4 space-y-4">
            <div className="flex flex-wrap gap-2">
               {suggestions.map(s => (
                 <button 
                  key={s} 
                  onClick={() => handleSend(s)}
                  className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-700 hover:bg-emerald-100 transition"
                >
                  {s}
                </button>
               ))}
            </div>

            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask your query..." 
                className="w-full rounded-full border border-slate-200 py-3 pl-4 pr-12 text-xs outline-none focus:border-emerald-600/30"
              />
              <button 
                onClick={() => handleSend()}
                className="absolute right-1 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[#0A1F17] text-white hover:bg-black transition-colors"
              >
                <SendHorizontal size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0A1F17] text-white shadow-xl transition-all hover:scale-110 active:scale-95"
      >
        {isOpen ? <X size={24} /> : (
          <div className="flex flex-col items-center">
            <Sparkles size={24} className="text-emerald-400" />
            <span className="text-[8px] font-black uppercase tracking-tighter mt-1">Chat Support</span>
          </div>
        )}
      </button>
    </div>
  );
}
