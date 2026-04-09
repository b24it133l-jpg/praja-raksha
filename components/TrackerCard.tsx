import { Complaint } from "@/types";
import StatusChip from "./StatusChip";

interface TrackerCardProps {
  complaint: Complaint;
}

export default function TrackerCard({ complaint }: TrackerCardProps) {
  return (
    <div className="rounded-[24px] border border-white/50 bg-white/70 p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5A6A61]">
            Ticket {complaint.id}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-[#0A1F17]">
            {complaint.title}
          </h3>
          <p className="mt-2 text-sm leading-7 text-[#3E4F45]">
            {complaint.description}
          </p>
        </div>

        <StatusChip status={complaint.status} />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#708176]">Department</p>
          <p className="mt-1 text-sm font-medium text-[#0A1F17]">{complaint.department}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#708176]">Priority</p>
          <p className="mt-1 text-sm font-medium text-[#0A1F17]">{complaint.priority}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#708176]">Updated</p>
          <p className="mt-1 text-sm font-medium text-[#0A1F17]">{complaint.updatedAt}</p>
        </div>
      </div>
    </div>
  );
}