"use client";

import { useEffect, useMemo, useState } from "react";
import { getComplaints, seedComplaintsIfEmpty } from "@/lib/helpers";
import { sampleComplaints } from "@/lib/data";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    seedComplaintsIfEmpty(sampleComplaints);
    setData(getComplaints());
  }, []);

  const stats = useMemo(() => {
    return {
      total: data.length,
      priority: data.filter((item) => item.status === "Priority").length,
      womenSafety: data.filter((item) => item.category === "Women Safety").length,
      narcotics: data.filter((item) => item.category === "Narcotics").length,
    };
  }, [data]);

  return (
    <div className="space-y-8 py-10">
      <h1 className="title-lg">Dashboard</h1>

      <div className="grid-safe grid-safe-3">
        <div className="card-ios">
          <p className="text-body">Total Complaints</p>
          <h2 className="text-3xl font-semibold mt-2">{stats.total}</h2>
        </div>

        <div className="card-ios">
          <p className="text-body">Priority Cases</p>
          <h2 className="text-3xl font-semibold mt-2">{stats.priority}</h2>
        </div>

        <div className="card-ios">
          <p className="text-body">Women Safety</p>
          <h2 className="text-3xl font-semibold mt-2">{stats.womenSafety}</h2>
        </div>

        <div className="card-ios">
          <p className="text-body">Narcotics Reports</p>
          <h2 className="text-3xl font-semibold mt-2">{stats.narcotics}</h2>
        </div>
      </div>

      <div className="card-ios">
        <h2 className="font-semibold text-xl">Complaints List</h2>

        <div className="mt-5 space-y-4">
          {data.map((c) => (
            <div key={c.id} className="border-b border-slate-200 pb-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">{c.title}</p>
                  <p className="text-body text-sm">{c.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{c.status}</p>
                  <p className="text-body text-sm">{c.id}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}