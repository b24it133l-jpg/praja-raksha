"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

export default function ComplaintList() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("praja-raksha-complaints");
    const parsed: Complaint[] = stored ? JSON.parse(stored) : [];
    setComplaints(parsed);
  }, []);

  if (complaints.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800">Recent Complaints</h2>
        <p className="mt-3 text-slate-600">No complaints submitted yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-800">Recent Complaints</h2>

      <div className="mt-5 space-y-4">
        {complaints.map((complaint) => (
          <div
            key={complaint.id}
            className="rounded-xl border border-slate-200 p-4 transition hover:border-green-300"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {complaint.title}
                </h3>
                <p className="text-sm text-slate-500">{complaint.id}</p>
              </div>

              <span className="inline-flex w-fit rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                {complaint.status}
              </span>
            </div>

            <p className="mt-3 text-slate-700">{complaint.description}</p>

            <div className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-4">
              <p><span className="font-medium">Category:</span> {complaint.category}</p>
              <p><span className="font-medium">Urgency:</span> {complaint.urgency}</p>
              <p><span className="font-medium">Location:</span> {complaint.location}</p>
              <p>
                <span className="font-medium">Anonymous:</span>{" "}
                {complaint.anonymous ? "Yes" : "No"}
              </p>
            </div>

            <div className="mt-4">
              <Link
                href={`/complaints/${complaint.id}`}
                className="text-sm font-medium text-green-800 hover:underline"
              >
                View details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}