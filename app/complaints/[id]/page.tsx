"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Complaint = {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  urgency: string;
  anonymous: boolean;
  status: string;
  createdAt: string;
};

const steps = [
  "Submitted",
  "Under Review",
  "Assigned",
  "In Progress",
  "Resolved",
];

export default function ComplaintDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [complaint, setComplaint] = useState<Complaint | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("praja-raksha-complaints");
    const parsed: Complaint[] = stored ? JSON.parse(stored) : [];
    const found = parsed.find((item) => item.id === id) || null;
    setComplaint(found);
  }, [id]);

  if (!complaint) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-2xl font-bold text-green-900">Complaint Not Found</h1>
        <p className="mt-2 text-slate-600">
          No complaint found for this ID.
        </p>
      </main>
    );
  }

  const activeIndex = steps.indexOf(complaint.status);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-green-900">{complaint.title}</h1>
        <p className="mt-2 text-sm text-slate-500">{complaint.id}</p>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <p><span className="font-medium">Category:</span> {complaint.category}</p>
          <p><span className="font-medium">Urgency:</span> {complaint.urgency}</p>
          <p><span className="font-medium">Location:</span> {complaint.location}</p>
          <p><span className="font-medium">Anonymous:</span> {complaint.anonymous ? "Yes" : "No"}</p>
          <p><span className="font-medium">Status:</span> {complaint.status}</p>
          <p>
            <span className="font-medium">Created:</span>{" "}
            {new Date(complaint.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-slate-900">Description</h2>
          <p className="mt-2 text-slate-700">{complaint.description}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900">Status Tracker</h2>

          <div className="mt-4 grid gap-3 md:grid-cols-5">
            {steps.map((step, index) => {
              const isActive = index <= activeIndex || complaint.status === step;

              return (
                <div
                  key={step}
                  className={`rounded-xl border p-3 text-center text-sm font-medium ${
                    isActive
                      ? "border-green-700 bg-green-50 text-green-800"
                      : "border-slate-200 bg-slate-50 text-slate-500"
                  }`}
                >
                  {step}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}