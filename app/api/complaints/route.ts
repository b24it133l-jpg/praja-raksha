import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Use established database singleton
    const complaint = await prisma.complaint.create({
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        location: body.location,
        isAnonymous: body.isAnonymous || false,
        priority: body.priority || "Medium",
        status: body.status || "Submitted",
        department: body.department || "General Administration",
      },
    });

    return NextResponse.json(complaint);
  } catch (error) {
    console.error("[API] Complaint Submission Failure:", error);
    return NextResponse.json({ error: "State Grid Rejection" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const complaints = await prisma.complaint.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(complaints);
  } catch (error) {
    return NextResponse.json({ error: "Data Retrieval Failure" }, { status: 500 });
  }
}
