export function generateComplaintId() {
  const random = Math.floor(10000 + Math.random() * 90000);
  return `PRJ-${random}`;
}

export function getCurrentDateTime() {
  return new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatLabel(value: string) {
  return value.trim();
}

/**
 * Storage key for complaints
 */
const STORAGE_KEY = "praja-raksha-complaints";

/**
 * Retrieves complaints from localStorage
 */
export function getComplaints() {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Seeds numerical sample data if storage is empty
 */
export function seedComplaintsIfEmpty(samples: any[]) {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored || JSON.parse(stored).length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(samples));
  }
}

/**
 * AI-Driven Duplicate Detection Logic
 * Scans existing complaints for similar titles within the same category.
 */
export function findDuplicateComplaints(title: string, category: string, existing: any[]): any | null {
  if (!title || title.length < 5) return null;
  const normalizedTitle = title.toLowerCase();
  return existing.find(c => 
    c.category === category && 
    (c.title.toLowerCase().includes(normalizedTitle) || normalizedTitle.includes(c.title.toLowerCase()))
  ) || null;
}