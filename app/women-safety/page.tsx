import ComplaintForm from "@/components/ComplaintForm";

export default function WomenSafetyPage() {
  return (
    <div className="space-y-6">
      <section className="glass-card rounded-[32px] p-8 md:p-10">
        <p className="section-label">Women Safety</p>
        <h2 className="mt-3 text-3xl font-semibold text-[#0A1F17]">
          Priority-first women safety reporting
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#3E4F45]">
          This module supports urgent reporting, safer submission, and sensitive incident handling.
        </p>
      </section>

      <ComplaintForm />
    </div>
  );
}