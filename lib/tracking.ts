import { ComplaintStatus } from "@/types";

/**
 * PRODUCTION-GRADE TRACKING ENGINE
 * Manages the state machine for complaint lifecycles and automated escalations.
 */

export interface StatusTransition {
  from: ComplaintStatus;
  to: ComplaintStatus;
  allowedRoles: string[];
}

const TRANSITIONS: StatusTransition[] = [
  { from: "Submitted", to: "Under Review", allowedRoles: ["SYSTEM", "OFFICER"] },
  { from: "Under Review", to: "Assigned", allowedRoles: ["OFFICER"] },
  { from: "Assigned", to: "In Progress", allowedRoles: ["FIELD_AGENT"] },
  { from: "In Progress", to: "Resolved", allowedRoles: ["FIELD_AGENT", "OFFICER"] },
  { from: "Assigned", to: "Escalated", allowedRoles: ["SYSTEM", "OFFICER"] },
  { from: "In Progress", to: "Escalated", allowedRoles: ["SYSTEM", "OFFICER"] },
];

export class TrackingEngine {
  /**
   * Validates if a status change is permissible
   */
  static isValidTransition(from: ComplaintStatus, to: ComplaintStatus, roles: string[]): boolean {
    return TRANSITIONS.some(t => 
      t.from === from && 
      t.to === to && 
      t.allowedRoles.some(role => roles.includes(role))
    );
  }

  /**
   * Automated escalation logic based on time elapsed without status change
   */
  static shouldAutoEscalate(currentStatus: ComplaintStatus, lastUpdated: Date): boolean {
    const hoursElapsed = (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60);
    
    // Configurable thresholds for different statuses
    const thresholds: Partial<Record<ComplaintStatus, number>> = {
      "Submitted": 24, // 1 day
      "Under Review": 48, // 2 days
      "Assigned": 72, // 3 days
      "In Progress": 120, // 5 days
    };

    return (thresholds[currentStatus] || Infinity) < hoursElapsed;
  }
}
