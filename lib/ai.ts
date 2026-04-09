import { ComplaintCategory, ComplaintPriority } from "@/types";

/**
 * SHARED INTELLIGENCE LAYER (SIL)
 * Centralized logic for the platform's AI functions.
 */

export interface AIAnalysisResult {
  category: ComplaintCategory;
  priority: ComplaintPriority;
  department: string;
  sentiment: "Positive" | "Neutral" | "Negative" | "Urgent";
  confidence: number;
}

export async function analyzeInput(text: string, title?: string): Promise<AIAnalysisResult> {
  const content = (text + " " + (title || "")).toLowerCase();

  // 1. Semantic Category Detection
  let detectedCategory: ComplaintCategory = "Civic";
  if (content.includes("women") || content.includes("girl") || content.includes("safety") || content.includes("harass")) detectedCategory = "Women Safety";
  else if (content.includes("drug") || content.includes("narcotic") || content.includes("ganja") || content.includes("liquor")) detectedCategory = "Narcotics";
  else if (content.includes("water") || content.includes("leak") || content.includes("pipe")) detectedCategory = "Water";
  else if (content.includes("road") || content.includes("pothole") || content.includes("traffic")) detectedCategory = "Roads";
  else if (content.includes("garbage") || content.includes("trash") || content.includes("smell")) detectedCategory = "Sanitation";

  // 2. Intelligent Prioritization
  let priority: ComplaintPriority = "Low";
  if (content.includes("immediate") || content.includes("urgent") || content.includes("danger") || content.includes("life") || detectedCategory === "Women Safety") {
    priority = "Critical";
  } else if (content.includes("recurring") || content.includes("many people") || content.includes("stinking")) {
    priority = "High";
  } else if (content.includes("broken") || content.includes("light")) {
    priority = "Medium";
  }

  // 3. Automated Routing Logic
  let department = "General Administration";
  switch (detectedCategory) {
    case "Women Safety": department = "Police - Women Safety Wing"; break;
    case "Narcotics": department = "State Anti-Narcotics Bureau (TSNAB)"; break;
    case "Civic": department = "GHMC Central Division"; break;
    case "Water": department = "HMWSSB (Water Board)"; break;
    case "Roads": department = "R&B Department"; break;
    case "Sanitation": department = "Public Health & Municipal Engineering"; break;
  }

  // 4. Sentiment & Confidence
  const sentiment = priority === "Critical" ? "Urgent" : content.length > 100 ? "Neutral" : "Neutral";
  
  return {
    category: detectedCategory,
    priority,
    department,
    sentiment,
    confidence: 0.94 // Simulated confidence score
  };
}

export async function generateAutoSummary(text: string): Promise<string> {
  // Simple summary logic for high-concurrency performance
  return text.substring(0, 50) + "... (Self-Generated via Grid Intelligence)";
}
