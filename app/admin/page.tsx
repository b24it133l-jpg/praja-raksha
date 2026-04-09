"use client";

import { useEffect, useMemo, useState } from "react";

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

export default function AdminPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("praja-raksha-complaints");
    const parsed: Complaint[] = stored ? JSON.parse(stored) : [];
    setComplaints(parsed);
  }, []);

  const stats = useMemo(() => {
    const total = complaints.length;
    const womenSafety = complaints.filter((c) => c.category === "Women Safety").length;
    const narcotics = complaints.filter((c) => c.category === "Narcotics").length;
    const resolved = complaints.filter((c) => c.status === "Resolved").length;
    const emergency = complaints.filter((c) => c.urgency === "Emergency").length;

    return { total, womenSafety, narcotics, resolved, emergency };
  }, [complaints]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold text-green-900">Admin Dashboard</h1>
      <p className="mt-2 text-slate-600">
        Overview of complaint activity and safety priorities.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Total Complaints" value={stats.total} />
        <StatCard title="Women Safety" value={stats.womenSafety} />
        <StatCard title="Narcotics" value={stats.narcotics} />
        <StatCard title="Resolved" value={stats.resolved} />
        <StatCard title="Emergency" value={stats.emergency} />
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Recent Complaints</h2>

        {complaints.length === 0 ? (
          <p className="mt-4 text-slate-600">No complaint data available yet.</p>
        ) : (
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600">
                  <th className="py-3 pr-4">ID</th>
                  <th className="py-3 pr-4">Title</th>
                  <th className="py-3 pr-4">Category</th>
                  <th className="py-3 pr-4">Urgency</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3 pr-4">Location</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100">
                    <td className="py-3 pr-4">{item.id}</td>
                    <td className="py-3 pr-4">{item.title}</td>
                    <td className="py-3 pr-4">{item.category}</td>
                    <td className="py-3 pr-4">{item.urgency}</td>
                    <td className="py-3 pr-4">{item.status}</td>
                    <td className="py-3 pr-4">{item.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="mt-2 text-3xl font-bold text-green-900">{value}</h3>
    </div>
  );
}