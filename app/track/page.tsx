"use client";

import { useState } from "react";
import { getComplaintById } from "@/lib/helpers";

export default function TrackPage() {
  const [id, setId] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleTrack = () => {
    const found = getComplaintById(id.trim());
    setResult(found || "not-found");
  };

  return (
    <div className="space-y-8 py-10">
      <h1 className="title-lg">Track Complaint</h1>

      <div className="card-ios max-w-xl space-y-4">
        <input
          className="input-ios"
          placeholder="Enter complaint ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <button className="btn-primary" onClick={handleTrack}>
          Track
        </button>
      </div>

      {result && result !== "not-found" && (
        <div className="card-ios max-w-2xl space-y-3">
          <h2 className="font-semibold text-xl">{result.title}</h2>
          <p><strong>ID:</strong> {result.id}</p>
          <p><strong>Status:</strong> {result.status}</p>
          <p><strong>Priority:</strong> {result.priority}</p>
          <p><strong>Category:</strong> {result.category}</p>
          <p><strong>Location:</strong> {result.location}</p>
          <p><strong>Description:</strong> {result.description}</p>
        </div>
      )}

      {result === "not-found" && (
        <div className="card-ios max-w-xl">
          Complaint not found.
        </div>
      )}
    </div>
  );
}