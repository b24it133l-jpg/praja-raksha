"use client";

import { useState } from "react";
import { 
  ShieldAlert, 
  ArrowRight, 
  Key, 
  UserCircle, 
  Globe,
  Lock,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [adminId, setAdminId] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = "/admin";
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950">
      {/* Dark Aesthetic Decor */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[20%] top-[-10%] h-[600px] w-[600px] rounded-full bg-emerald-900/20 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] h-[400px] w-[400px] rounded-full bg-blue-900/10 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <Link 
          href="/" 
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-white/40 transition hover:text-white"
        >
          <ChevronLeft size={16} />
          Back to Public Portal
        </Link>

        <div className="rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-3xl md:p-12 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <ShieldAlert size={32} />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white leading-tight">Official Authority <br/>Command Center</h1>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400/60">Restricted Access Module</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 pl-1">Officer Credentials</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  required
                  placeholder="OFFICER-ID-XXXX"
                  className="w-full rounded-2xl border border-white/5 bg-white/5 py-4 pl-12 pr-4 text-sm text-white outline-none transition-all focus:border-emerald-500/50 focus:bg-white/10"
                />
                <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 pl-1">Encryption Key</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-white/5 bg-white/5 py-4 pl-12 pr-4 text-sm text-white outline-none transition-all focus:border-emerald-500/50 focus:bg-white/10"
                />
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 p-4">
               <Globe size={16} className="text-emerald-500 shrink-0" />
               <p className="text-[10px] font-bold text-white/40 leading-relaxed uppercase tracking-wider">Session will be recorded via Govt-VPC IP: 172.16.8.1</p>
            </div>

            <button 
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-emerald-500 py-4 text-sm font-black uppercase tracking-widest text-slate-950 shadow-[0_5px_40px_rgba(16,185,129,0.3)] transition-all hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-950/20 border-t-slate-950" />
              ) : (
                <>
                  Establish Connection
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
           <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white/20">
              <Lock size={12} />
              AES-256
           </div>
           <div className="h-1 w-1 rounded-full bg-white/20" />
           <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white/20">
              TLS 1.3
           </div>
        </div>
      </div>
    </div>
  );
}
