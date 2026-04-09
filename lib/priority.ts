import { ComplaintCategory, ComplaintPriority } from "@/types";

export function getPriority(
  category: ComplaintCategory,
  description: string
): ComplaintPriority {
  const text = description.toLowerCase();

  if (
    category === "Women Safety" ||
    text.includes("urgent") ||
    text.includes("danger") ||
    text.includes("attack") ||
    text.includes("harassment") ||
    text.includes("emergency")
  ) {
    return "Critical";
  }

  if (
    category === "Narcotics" ||
    text.includes("drug") ||
    text.includes("unsafe") ||
    text.includes("violence") ||
    text.includes("threat")
  ) {
    return "High";
  }

  if (
    text.includes("broken") ||
    text.includes("overflow") ||
    text.includes("damaged") ||
    text.includes("dark")
  ) {
    return "Medium";
  }

  return "Low";
}