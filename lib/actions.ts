"use server";

import prisma from "./db";
import { ComplaintCategory } from "@/types";
import { getPriority } from "./priority";
import { getDepartment } from "./routing";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function submitGrievance(formData: {
  title: string;
  description: string;
  category: ComplaintCategory;
  location: string;
  email?: string;
  isAnonymous: boolean;
}) {
  console.log(`[Backend] Processing Grievance: ${formData.title}`);

  // 1. Backend Validation
  if (formData.description.length < 20) {
    throw new Error("Detailed narrative must be at least 20 characters.");
  }

  // 2. Intelligent Determination
  const priority = getPriority(formData.category, formData.description);
  const department = getDepartment(formData.category, formData.title);

  // 3. Database Persistence
  try {
    const complaint = await prisma.complaint.create({
      data: {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        email: formData.email,
        isAnonymous: formData.isAnonymous,
        priority: priority,
        status: "Submitted",
        department: department,
      },
    });

    console.log(`[Backend] Success: Saved record ${complaint.id}`);
    
    // Convert DateTime to string for client-side serialization if needed
    return {
      ...complaint,
      createdAt: complaint.createdAt.toISOString(),
      updatedAt: complaint.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error("[Backend] Persistence Error:", error);
    throw new Error("Failed to record grievance in state grid.");
  }
}

export async function getGrievances(page: number = 1, pageSize: number = 20) {
  try {
    const skip = (page - 1) * pageSize;
    
    const [complaints, totalCount] = await Promise.all([
      prisma.complaint.findMany({
        orderBy: { createdAt: "desc" },
        skip: skip,
        take: pageSize,
      }),
      prisma.complaint.count()
    ]);

    return {
      data: complaints.map((c: any) => ({
        ...c,
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
      })),
      pagination: {
        total: totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize)
      }
    };
  } catch (error) {
    console.error("[CRITICAL] State Grid Connectivity Loss:", error);
    throw new Error("System is currently unable to reach the central database.");
  }
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.password !== password) {
    throw new Error("Invalid credentials system-wide rejection.");
  }

  // Set session cookie (Basic Implementation)
  const cookieStore = await cookies();
  cookieStore.set("praja_raksha_session", JSON.stringify({
    id: user.id,
    role: user.role,
    name: user.name
  }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });

  // Redirect based on role
  if (user.role === "ADMIN") redirect("/admin");
  if (user.role === "DEVELOPER") redirect("/developer"); 
  
  redirect("/");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("praja_raksha_session");
  redirect("/login");
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("praja_raksha_session");
  return session ? JSON.parse(session.value) : null;
}
