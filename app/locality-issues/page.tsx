import ComplaintForm from "@/components/ComplaintForm";

export default function LocalityIssuesPage() {
  return (
    <div className="space-y-6">
      <section className="glass-card rounded-[32px] p-8 md:p-10">
        <p className="section-label">Locality Issues</p>
        <h2 className="mt-3 text-3xl font-semibold text-[#0A1F17]">
          Local civic issue management
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#3E4F45]">
          Report neighbourhood issues like sanitation, water leaks, roads, and street lights.
        </p>
      </section>

      <ComplaintForm />
    </div>
  );
}