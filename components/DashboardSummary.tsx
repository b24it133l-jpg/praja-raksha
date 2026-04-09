import { DashboardStat } from "@/types";

interface DashboardSummaryProps {
  stats: DashboardStat[];
}

export default function DashboardSummary({ stats }: DashboardSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-[22px] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
        >
          <p className="text-2xl font-semibold text-[#0A1F17]">{item.value}</p>
          <p className="mt-1 text-sm text-[#3E4F45]">{item.label}</p>
        </div>
      ))}
    </div>
  );
}