import Link from "next/link";
import { ModuleItem } from "@/types";

interface ModuleCardProps {
  item: ModuleItem;
  index: number;
}

export default function ModuleCard({ item, index }: ModuleCardProps) {
  return (
    <Link
      href={item.href}
      className="glass-card group rounded-[28px] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="module-icon">{String(index + 1).padStart(2, "0")}</div>
        <span className="rounded-full bg-[#EDF6EF] px-3 py-1 text-xs font-semibold text-[#0F5D46]">
          {item.tag}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-semibold text-[#0A1F17]">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#3E4F45]">{item.description}</p>

      <div className="mt-5 text-sm font-semibold text-[#0F5D46]">Open module →</div>
    </Link>
  );
}