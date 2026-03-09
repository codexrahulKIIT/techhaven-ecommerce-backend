// frontend/app/admin/b2b/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getAllB2BRequests, updateB2BRequestStatus } from "@/lib/b2b";
import { B2BRequest } from "@/types";

export default function AdminB2BPage() {
  const [requests, setRequests] = useState<B2BRequest[]>([]);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    const data = await getAllB2BRequests();
    setRequests(data);
  }

  async function handleStatusChange(id: string, status: string) {
    await updateB2BRequestStatus(id, status);
    loadRequests();
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage B2B Requests</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Company</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Details</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td className="p-2 border">{req.company}</td>
              <td className="p-2 border">{req.email}</td>
              <td className="p-2 border">{req.details}</td>
              <td className="p-2 border">{req.status}</td>
              <td className="p-2 border">
                <select
                  value={req.status}
                  onChange={(e) => handleStatusChange(req.id, e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
