import ComplaintForm from "@/components/ComplaintForm";

export default function NarcoticsPage() {
  return (
    <div className="space-y-6">
      <section className="glass-card rounded-[32px] p-8 md:p-10">
        <p className="section-label">Narcotics</p>
        <h2 className="mt-3 text-3xl font-semibold text-[#0A1F17]">
          Confidential narcotics reporting
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#3E4F45]">
          This module is focused on suspicious drug activity, confidential reporting, and safer escalation.
        </p>
      </section>

      <ComplaintForm />
    </div>
  );
}