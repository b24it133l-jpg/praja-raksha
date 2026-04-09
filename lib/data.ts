import { Complaint, DashboardStat, ModuleItem, TimelineStep } from "@/types";

export const modules: ModuleItem[] = [
  {
    title: "Citizen Complaints",
    description:
      "Submit public grievances related to roads, drainage, sanitation, water, and civic issues.",
    href: "/complaints",
    tag: "Core",
  },
  {
    title: "Women Safety",
    description:
      "Priority-first module for harassment, unsafe zones, urgent safety concerns, and anonymous reporting.",
    href: "/women-safety",
    tag: "Priority",
  },
  {
    title: "Narcotics Reporting",
    description:
      "Confidential reporting for suspicious drug activity with safer escalation logic.",
    href: "/narcotics",
    tag: "Secure",
  },
  {
    title: "Locality Issues",
    description:
      "Report recurring neighbourhood issues like garbage overflow, leaks, roads, and lighting failures.",
    href: "/locality-issues",
    tag: "Community",
  },
  {
    title: "Scheme Guidance",
    description:
      "Help citizens explore government schemes and understand possible eligibility paths.",
    href: "/schemes",
    tag: "Support",
  },
  {
    title: "AI Assistant",
    description:
      "A guided support layer to help users choose modules and frame complaints clearly.",
    href: "/ai-assistant",
    tag: "Smart",
  },
];

export const stats: DashboardStat[] = [
  { label: "Complaint categories", value: "25+" },
  { label: "Escalation-ready workflows", value: "6" },
  { label: "Status visibility", value: "Live" },
];

export const trustHighlights: string[] = [
  "Anonymous reporting support",
  "Real-time complaint tracking",
  "Priority escalation paths",
  "Evidence-ready submissions",
  "Department-based routing",
  "Citizen-first transparency",
];

export const trackerSteps: TimelineStep[] = [
  {
    title: "1. Intake",
    text: "User submits complaint with category, location, description, and anonymity preference.",
  },
  {
    title: "2. Classification",
    text: "System determines likely category, urgency, and responsible department.",
  },
  {
    title: "3. Assignment",
    text: "Complaint is routed to the relevant public-service desk.",
  },
  {
    title: "4. Tracking",
    text: "Citizen can view status, timestamps, and complaint progress.",
  },
  {
    title: "5. Escalation",
    text: "If action is delayed, the complaint can be escalated automatically.",
  },
];

export const sampleComplaints: Complaint[] = [
  {
    id: "PRJ-20481",
    title: "Street lights not working near market road",
    description: "Three poles are not working and the area becomes unsafe at night.",
    category: "Street Lights",
    location: "Hanamkonda",
    isAnonymous: false,
    priority: "High",
    status: "In Progress",
    department: "Electricity Maintenance Wing",
    createdAt: "09 Apr 2026, 08:10 PM",
    updatedAt: "09 Apr 2026, 08:42 PM",
  },
  {
    id: "PRJ-20457",
    title: "Unsafe harassment-prone area near bus stop",
    description: "The area feels unsafe in the evenings and needs immediate attention.",
    category: "Women Safety",
    location: "Warangal",
    isAnonymous: true,
    priority: "Critical",
    status: "Under Review",
    department: "Women Protection Cell",
    createdAt: "09 Apr 2026, 06:25 PM",
    updatedAt: "09 Apr 2026, 06:33 PM",
  },
];