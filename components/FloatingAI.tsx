"use client";

import { useState } from "react";
import { Bot, X, MessageSquare, SendHorizontal, Sparkles } from "lucide-react";

export default function FloatingAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Namaste! I'm the Praja Raksha AI. How can I help you navigate public services today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    
    // Simulating AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        text: "I've analyzed your query. If you're reporting a local issue like a pothole or water leak, I recommend the 'Locality Issues' module for the fastest resolution." 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-[24px] border border-[#0A1F17]/10 bg-white shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
          <header className="flex items-center justify-between bg-emerald-700 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                <Sparkles size={16} />
              </div>
              <h3 className="text-sm font-bold">AI Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-full p-1 hover:bg-white/10">
              <X size={18} />
            </button>
          </header>

          <div className="flex-grow space-y-4 overflow-y-auto p-4 scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "assistant" ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-xs shadow-sm ${
                  m.role === "assistant" ? "bg-emerald-50 text-emerald-900 border border-emerald-100" : "bg-emerald-700 text-white"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#0A1F17]/5 p-4">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask anything..." 
                className="w-full rounded-full border border-slate-200 py-3 pl-4 pr-12 text-xs outline-none focus:border-emerald-600/30"
              />
              <button 
                onClick={handleSend}
                className="absolute right-1 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
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
        className={`flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-110 active:scale-95 ${
          isOpen ? "bg-slate-800" : "bg-emerald-600 hover:bg-emerald-700"
        }`}
      >
        {isOpen ? <X size={24} /> : <div className="relative"><Bot size={28} /><span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-300"></span></span></div>}
      </button>
    </div>
  );
}
