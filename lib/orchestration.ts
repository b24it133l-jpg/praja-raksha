"use server";

import { Complaint, ComplaintCategory, ComplaintPriority } from "@/types";
import prisma from "./db";
import { analyzeInput } from "./ai";
import { sendEmail, emailTemplates } from "./mailer";

/**
 * GOVERNMENT-GRADE ORCHESTRATION ENGINE
 * Manages the high-fidelity pipeline from Citizen Submission to Departmental Queue.
 */

/**
 * Processes a raw grievance through the full state intelligence pipeline.
 * This is a Server Action.
 */
export async function processGrievance(raw: {
  title: string;
  description: string;
  category: ComplaintCategory;
  location: string;
  email?: string;
  isAnonymous: boolean;
}): Promise<Complaint> {
  console.log(`[Orchestration] Incoming Grievance: ${raw.title}`);

  // 1. SHARED INTELLIGENCE LAYER ANALYSIS
  const analysis = await analyzeInput(raw.description, raw.title);

  const priority = analysis.priority;
  const department = analysis.department;
  const finalCategory = raw.category || analysis.category;

  // 4. Database Persistence
  try {
    const complaint = await prisma.complaint.create({
      data: {
        title: raw.title,
        description: raw.description,
        category: raw.category,
        location: raw.location,
        email: raw.email,
        isAnonymous: raw.isAnonymous,
        priority: priority,
        status: "Submitted",
        department: department,
      },
    });

    // Send Brevo Notification (Non-blocking)
    if (raw.email && !raw.isAnonymous) {
      const template = emailTemplates.complaintAcknowledged("Citizen", complaint.id, complaint.title);
      sendEmail({
        to: raw.email,
        ...template
      });
    }

    // 5. Queue Transfer (Simulated handover to Departmental Terminal)
    await transferToDepartmentQueue(complaint.id, department);

    console.log(`[Orchestration] Protocol Completed for ${complaint.id}`);

    return {
      ...complaint,
      category: complaint.category as ComplaintCategory,
      priority: complaint.priority as ComplaintPriority,
      status: complaint.status as any,
      createdAt: complaint.createdAt.toISOString(),
      updatedAt: complaint.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error("[Orchestration] Critical failure in State Grid persistence:", error);
    throw new Error("Internal Persistence Failure. Please try again.");
  }
}

async function transferToDepartmentQueue(id: string, dept: string) {
  console.log(`[Orchestration] Transferring record ${id} to ${dept} secure queue...`);
  await new Promise(resolve => setTimeout(resolve, 800));
  return true;
}
