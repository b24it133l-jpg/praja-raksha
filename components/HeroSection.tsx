import Link from "next/link";
import DashboardSummary from "./DashboardSummary";
import { stats, trustHighlights } from "@/lib/data";

export default function HeroSection() {
  return (
    <section className="hero-grid items-start">
      <div className="glass-card rounded-[32px] p-6 md:p-10">
        <p className="section-label">Citizen-first governance experience</p>

        <h2 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-[#0A1F17] md:text-6xl">
          An iOS-inspired public service platform built for clarity, trust, and action.
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-7 text-[#3E4F45] md:text-lg">
          Praja Raksha brings grievance reporting, women safety, locality issue
          management, scheme support, and intelligent guidance into one premium
          citizen experience for Telangana.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/complaints"
            className="gradient-button inline-flex rounded-full px-6 py-3 text-sm font-semibold transition"
          >
            Raise Complaint
          </Link>

          <Link
            href="/dashboard"
            className="secondary-button inline-flex rounded-full px-6 py-3 text-sm font-semibold transition"
          >
            Open Dashboard
          </Link>
        </div>

        <div className="mt-10">
          <DashboardSummary stats={stats} />
        </div>
      </div>
      <div className="glass-card glow-green overflow-hidden rounded-[32px] self-start">
        <div className="bg-gradient-to-br from-[#063D2E] via-[#0F5D46] to-[#1C8C66] p-7 text-white shadow-[0_25px_80px_rgba(6,61,46,0.5)] md:p-8">
          <p className="text-[0.74rem] font-semibold uppercase tracking-[0.26em] text-white/80">
            Platform Highlights
          </p>

          <div className="mt-5 space-y-3">
            {trustHighlights.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white/95 backdrop-blur-md"
              >
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="p-7 md:p-8">
          <h3 className="text-2xl font-semibold text-[#0A1F17]">
            Built for public confidence.
          </h3>
          <p className="mt-3 text-sm leading-7 text-[#3E4F45] md:text-base">
            The system is designed to feel calm, premium, transparent, and highly
            usable across complaints, tracking, guidance, and urgent citizen workflows.
          </p>
        </div>
      </div>
    </section>
  );
}