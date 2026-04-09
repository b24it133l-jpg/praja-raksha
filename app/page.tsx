import HeroSection from "@/components/HeroSection";
import ModuleCard from "@/components/ModuleCard";
import TrackerCard from "@/components/TrackerCard";
import { modules, sampleComplaints, trackerSteps } from "@/lib/data";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-10 md:space-y-14">
      <HeroSection />

      <section className="space-y-6">
        <div>
          <p className="section-label">Core Modules</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[#0A1F17] md:text-4xl">
            Structured like a complete public-service ecosystem
          </h3>
        </div>

        <div className="grid-cards cols-3">
          {modules.map((item, index) => (
            <ModuleCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-card rounded-[32px] p-7 md:p-8">
          <p className="section-label">Live tracker preview</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[#0A1F17]">
            Complaint visibility that feels immediate and trustworthy
          </h3>

          <div className="mt-8 space-y-4">
            {sampleComplaints.map((item) => (
              <TrackerCard key={item.id} complaint={item} />
            ))}
          </div>
        </div>

        <div className="glass-card rounded-[32px] p-7 md:p-8">
          <p className="section-label">Process Logic</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[#0A1F17]">
            Smart routing and escalation structure
          </h3>

          <div className="mt-8 space-y-6">
            {trackerSteps.map((step) => (
              <div key={step.title} className="flex gap-4">
                <div className="timeline-dot" />
                <div>
                  <h4 className="text-base font-semibold text-[#0A1F17]">
                    {step.title}
                  </h4>
                  <p className="mt-1 text-sm leading-7 text-[#3E4F45]">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="soft-divider my-8" />

          <Link
            href="/ai-assistant"
            className="inline-flex rounded-full bg-[#10231A] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Open AI Assistant
          </Link>
        </div>
      </section>
    </div>
  );
}