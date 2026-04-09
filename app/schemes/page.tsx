export default function SchemesPage() {
  const schemes = [
    {
      title: "Education Support",
      description: "Scholarship and academic assistance guidance for eligible students.",
    },
    {
      title: "Women Welfare",
      description: "Guidance for women-focused welfare and support schemes.",
    },
    {
      title: "Rural Development",
      description: "Information on rural support, self-employment, and local development schemes.",
    },
  ];

  return (
    <section className="glass-card rounded-[32px] p-8 md:p-10">
      <p className="section-label">Schemes</p>
      <h2 className="mt-3 text-3xl font-semibold text-[#0A1F17]">
        Government scheme guidance
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[#3E4F45]">
        Explore possible scheme categories and help users understand the next step.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {schemes.map((scheme) => (
          <div key={scheme.title} className="rounded-[24px] bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-[#0A1F17]">{scheme.title}</h3>
            <p className="mt-2 text-sm leading-7 text-[#3E4F45]">
              {scheme.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}