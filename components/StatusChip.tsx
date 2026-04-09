import { ComplaintStatus } from "@/types";

interface StatusChipProps {
  status: ComplaintStatus;
}

export default function StatusChip({ status }: StatusChipProps) {
  const getClasses = () => {
    switch (status) {
      case "Submitted":
        return "bg-blue-50 text-blue-700";
      case "Under Review":
        return "bg-amber-50 text-amber-700";
      case "Assigned":
        return "bg-purple-50 text-purple-700";
      case "In Progress":
        return "bg-green-50 text-green-700";
      case "Resolved":
        return "bg-emerald-50 text-emerald-700";
      case "Escalated":
        return "bg-red-50 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getClasses()}`}
    >
      {status}
    </span>
  );
}