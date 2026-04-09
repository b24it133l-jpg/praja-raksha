import { ComplaintPriority } from "@/types";

interface PriorityChipProps {
  priority: ComplaintPriority;
}

export default function PriorityChip({ priority }: PriorityChipProps) {
  const getClasses = () => {
    switch (priority) {
      case "Critical":
        return "bg-red-50 text-red-700 border-red-100";
      case "High":
        return "bg-orange-50 text-orange-700 border-orange-100";
      case "Medium":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Low":
        return "bg-slate-50 text-slate-700 border-slate-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getClasses()}`}
    >
      {priority}
    </span>
  );
}
