import { Complaint, ComplaintStatus, ComplaintPriority } from "./index";

export interface Department {
  id: string;
  name: string;
  headName: string;
  totalPersonnel: number;
  activeComplaints: number;
  resolutionRate: number; // percentage
}

export interface AdminStats {
  totalComplaints: number;
  resolvedComplaints: number;
  pendingComplaints: number;
  escalatedComplaints: number;
  avgResolutionTime: number; // in hours
  departmentWiseDistribution: Record<string, number>;
}

export interface UserRole {
  id: string;
  name: string;
  role: "CITIZEN" | "OFFICER" | "ADMIN" | "FIELD_AGENT";
  departmentId?: string;
}

export interface AuditLog {
  id: string;
  complaintId: string;
  action: string;
  actorId: string;
  timestamp: string;
  metadata?: Record<string, any>;
}
