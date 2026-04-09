export type ComplaintStatus =
  | "Submitted"
  | "Under Review"
  | "Assigned"
  | "In Progress"
  | "Resolved"
  | "Escalated";

export type ComplaintPriority = "Low" | "Medium" | "High" | "Critical";

export type ComplaintCategory =
  | "Civic"
  | "Women Safety"
  | "Narcotics"
  | "Sanitation"
  | "Water"
  | "Roads"
  | "Street Lights"
  | "Schemes"
  | "Locality Issues";

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  location: string;
  isAnonymous: boolean;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  department: string;
  createdAt: string;
  updatedAt: string;
  evidenceUrls?: string[];
}

export interface ModuleItem {
  title: string;
  description: string;
  href: string;
  tag: string;
}

export interface DashboardStat {
  label: string;
  value: string;
}

export interface TimelineStep {
  title: string;
  text: string;
}