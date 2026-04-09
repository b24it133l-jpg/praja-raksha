import { ComplaintCategory, ComplaintPriority } from "@/types";

/**
 * PRODUCTION-GRADE PRIORITY ENGINE
 * Uses a weighted heuristic scoring system to determine complaint urgency.
 * This can be extended with external LLM analysis in production.
 */

interface TriggerGroup {
  keywords: string[];
  weight: number;
}

const CRITICAL_TRIGGERS: TriggerGroup = {
  keywords: ["attack", "harassment", "danger", "fire", "bleeding", "emergency", "suicide", "threat to life"],
  weight: 60,
};

const HIGH_TRIGGERS: TriggerGroup = {
  keywords: ["drug", "violence", "unsafe", "theft", "accident", "trapped", "broken line", "flood"],
  weight: 30,
};

const MEDIUM_TRIGGERS: TriggerGroup = {
  keywords: ["overflow", "broken", "damaged", "dark", "delay", "foul smell", "garbage", "leakage"],
  weight: 15,
};

export function getPriority(
  category: ComplaintCategory,
  description: string
): ComplaintPriority {
  const text = description.toLowerCase();
  let score = 0;

  // 1. Category weighting
  if (category === "Women Safety") score += 50;
  if (category === "Narcotics") score += 40;
  
  // 2. Keyword weight accumulation
  CRITICAL_TRIGGERS.keywords.forEach(kw => {
    if (text.includes(kw)) score += CRITICAL_TRIGGERS.weight;
  });

  HIGH_TRIGGERS.keywords.forEach(kw => {
    if (text.includes(kw)) score += HIGH_TRIGGERS.weight;
  });

  MEDIUM_TRIGGERS.keywords.forEach(kw => {
    if (text.includes(kw)) score += MEDIUM_TRIGGERS.weight;
  });

  // 3. Score normalization to Priority Levels
  if (score >= 60) return "Critical";
  if (score >= 40) return "High";
  if (score >= 20) return "Medium";
  
  return "Low";
}