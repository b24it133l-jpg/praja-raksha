"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  ArrowRight, 
  Mail, 
  Lock, 
  Fingerprint, 
  ChevronLeft,
  Smartphone
} from "lucide-react";
import Link from "next/link";
import { login } from "@/lib/actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      alert(err.message || "Authentication rejected.");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F4FAF6]">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-100/50 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-200/30 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <Link 
          href="/" 
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#0A1F17]/60 transition hover:text-[#0A1F17]"
        >
          <ChevronLeft size={16} />
          Back to Portal
        </Link>

        <div className="glass-card shadow-2xl rounded-[40px] p-8 md:p-10 border border-white/40">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0A1F17] text-emerald-400 shadow-xl shadow-emerald-900/10">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-[#0A1F17]">National Security Grid</h1>
            <p className="mt-2 text-sm text-[#3E4F45]/60">Authorized Personnel: Admin / Developer</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-[#0A1F17]/40 pl-1">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="charananumula12@gmail.com"
                  className="w-full rounded-2xl border border-slate-200 bg-white/50 py-4 pl-12 pr-4 text-sm outline-none transition-all focus:border-emerald-600/30 focus:bg-white"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3E4F45]/30" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-[#0A1F17]/40 pl-1">Security Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-200 bg-white/50 py-4 pl-12 pr-4 text-sm outline-none transition-all focus:border-emerald-600/30 focus:bg-white"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3E4F45]/30" size={18} />
              </div>
            </div>

            <button 
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#0A1F17] py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-black active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              ) : (
                <>
                  Establish Secure Session
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative mb-8 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#3E4F45]/30">
              <span className="relative z-10 bg-white px-4 italic">Internal Access Protocols</span>
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200" />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                  <Fingerprint size={20} className="text-[#0A1F17]/20" />
                  <span className="text-[10px] font-bold uppercase text-[#0A1F17]/40">Biometrics</span>
               </div>
               <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                  <Smartphone size={20} className="text-[#0A1F17]/20" />
                  <span className="text-[10px] font-bold uppercase text-[#0A1F17]/40">T-Pass</span>
               </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] text-[#3E4F45]/40 font-black uppercase tracking-[0.2em] leading-relaxed">
          © 2026 Charan Anumula — All Rights Reserved <br/>
          Secured by National Security Grid Auth
        </p>
      </div>
    </div>
  );
}
