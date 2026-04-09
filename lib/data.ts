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
];

export const civicCategories = [
  {
    title: "Roads & Streets",
    icon: "Road",
    subtitles: ["Potholes on Roads", "Damaged Roads", "No Footpath", "Waterlogging on Roads", "Dust Roads"]
  },
  {
    title: "Water Supply",
    icon: "Droplets",
    subtitles: ["No Water Supply", "Low Water Pressure", "Water Leakage", "Contaminated Water", "Irregular Water Supply"]
  },
  {
    title: "Drainage & Sewage",
    icon: "Activity",
    subtitles: ["Drainage Overflow", "Blocked Drainage", "Open Sewage Drain", "Bad Smell from Drains", "Water Stagnation"]
  },
  {
    title: "Garbage & Sanitation",
    icon: "Trash2",
    subtitles: ["Garbage Not Collected", "Overflowing Dustbins", "Garbage Dumping", "Burning Waste", "Dirty Streets"]
  },
  {
    title: "Street Lights",
    icon: "Zap",
    subtitles: ["Street Lights Not Working", "Dark Streets", "Broken Light Poles", "Flickering Lights"]
  },
  {
    title: "Air Pollution",
    icon: "Wind",
    subtitles: ["Dust Pollution", "Smoke from Burning Waste", "Construction Pollution", "Industrial Smoke"]
  },
  {
    title: "Noise Pollution",
    icon: "Volume2",
    subtitles: ["Loud Music / DJ Noise", "Traffic Noise", "Construction Noise", "Night Disturbance"]
  },
  {
    title: "Traffic & Transport",
    icon: "TrafficCone",
    subtitles: ["Traffic Congestion", "No Traffic Signals", "Illegal Parking", "Unsafe Road Crossing"]
  },
  {
    title: "Parks & Public Spaces",
    icon: "TreePine",
    subtitles: ["Park Not Maintained", "Broken Equipment", "Unsafe Park Area", "Dirty Public Spaces"]
  },
  {
    title: "Encroachment",
    icon: "UserMinus",
    subtitles: ["Illegal Construction", "Road Encroachment", "Land Encroachment", "Unauthorized Shops"]
  },
  {
    title: "Flooding / Rainwater",
    icon: "CloudRain",
    subtitles: ["Waterlogging", "Flooded Streets", "Poor Drainage System"]
  },
  {
    title: "Electricity Issues",
    icon: "Zap",
    subtitles: ["Power Cuts", "Transformer Issue", "Voltage Fluctuation", "Loose Electric Wires"]
  },
  {
    title: "Public Health",
    icon: "HeartPulse",
    subtitles: ["Mosquito Problem", "Stagnant Water", "Unhygienic Area", "Food Safety Issue"]
  },
  {
    title: "Land / Revenue",
    icon: "Map",
    subtitles: ["Land Dispute", "Survey Issue", "Property Record Issue"]
  },
  {
    title: "Rural / Panchayat",
    icon: "Home",
    subtitles: ["Village Road Problem", "Rural Water Issue", "Sanitation Issue in Village", "Lack of Facilities"]
  },
  {
    title: "Other",
    icon: "Plus",
    subtitles: ["Other Civic Issue"]
  }
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
];