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