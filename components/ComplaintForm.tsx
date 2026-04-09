"use client";

import { useMemo, useState } from "react";
import { ComplaintCategory } from "@/types";
import { generateComplaintId, getCurrentDateTime } from "@/lib/helpers";
import { getDepartment } from "@/lib/routing";
import { getPriority } from "@/lib/priority";

const categories: ComplaintCategory[] = [
  "Civic",
  "Women Safety",
  "Narcotics",
  "Sanitation",
  "Water",
  "Roads",
  "Street Lights",
  "Schemes",
  "Locality Issues",
];

export default function ComplaintForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<ComplaintCategory>("Civic");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState<null | {
    id: string;
    department: string;
    priority: string;
    time: string;
  }>(null);

  const department = useMemo(() => getDepartment(category), [category]);
  const priority = useMemo(
    () => getPriority(category, description || title),
    [category, description, title]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newComplaint = {
      id: generateComplaintId(),
      department,
      priority,
      time: getCurrentDateTime(),
    };

    setSubmitted(newComplaint);

    setTitle("");
    setDescription("");
    setLocation("");
    setCategory("Civic");
    setIsAnonymous(false);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <form
        onSubmit={handleSubmit}
        className="glass-card rounded-[32px] p-8 shadow-sm"
      >
        <p className="section-label">Complaint Form</p>
        <h2 className="mt-3 text-3xl font-semibold text-[#0A1F17]">
          Submit a complaint
        </h2>
        <p className="mt-3 text-sm leading-7 text-[#3E4F45]">
          Fill in the complaint details. The system will estimate priority and
          route it to the most relevant department.
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#0A1F17]">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter complaint title"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#0A1F17]">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={5}
              placeholder="Explain the issue clearly"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0A1F17]">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0A1F17]">
                Location
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                placeholder="Enter area / locality"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
              />
            </div>
          </div>

          <label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            <span className="text-sm font-medium text-[#0A1F17]">
              Submit anonymously
            </span>
          </label>

          <button
            type="submit"
            className="gradient-button inline-flex rounded-full px-6 py-3 text-sm font-semibold transition"
          >
            Submit Complaint
          </button>
        </div>
      </form>

      <div className="glass-card rounded-[32px] p-8">
        <p className="section-label">Smart Preview</p>
        <h3 className="mt-3 text-2xl font-semibold text-[#0A1F17]">
          Routing and priority preview
        </h3>

        <div className="mt-8 space-y-4">
          <div className="rounded-[22px] bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-[#708176]">
              Suggested Department
            </p>
            <p className="mt-2 text-base font-semibold text-[#0A1F17]">
              {department}
            </p>
          </div>

          <div className="rounded-[22px] bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-[#708176]">
              Estimated Priority
            </p>
            <p className="mt-2 text-base font-semibold text-[#0A1F17]">
              {priority}
            </p>
          </div>

          <div className="rounded-[22px] bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-[#708176]">
              Anonymous
            </p>
            <p className="mt-2 text-base font-semibold text-[#0A1F17]">
              {isAnonymous ? "Yes" : "No"}
            </p>
          </div>

          {submitted && (
            <div className="rounded-[22px] bg-[#0F5D46] p-5 text-white shadow-lg">
              <p className="text-xs uppercase tracking-[0.18em] text-white/80">
                Submitted Successfully
              </p>
              <p className="mt-2 text-lg font-semibold">{submitted.id}</p>
              <p className="mt-2 text-sm text-white/90">
                Routed to {submitted.department}
              </p>
              <p className="mt-1 text-sm text-white/90">
                Priority: {submitted.priority}
              </p>
              <p className="mt-1 text-sm text-white/90">
                Time: {submitted.time}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}