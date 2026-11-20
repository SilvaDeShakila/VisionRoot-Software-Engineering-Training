"use client";

import { useState } from "react";
import type { RequestStatus, ServiceRequest } from "../types/request";

interface RequestListProps {
  requests: ServiceRequest[];
}

const statusLabels: Record<RequestStatus, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

const statusStyles: Record<RequestStatus, string> = {
  OPEN: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  IN_PROGRESS: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  RESOLVED: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  CLOSED: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
};

export default function RequestList({ requests }: RequestListProps) {
  const [selectedStatus, setSelectedStatus] = useState<RequestStatus | "ALL">("ALL");

  const filteredRequests =
    selectedStatus === "ALL"
      ? requests
      : requests.filter((request) => request.status === selectedStatus);

  return (
    <section
      id="requests"
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="flex flex-col gap-4 border-b border-slate-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-slate-900">
            Recent Requests
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            View and filter submitted service requests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="status-filter" className="text-sm font-medium text-slate-600">
            Status:
          </label>
          <select
            id="status-filter"
            value={selectedStatus}
            onChange={(event) =>
              setSelectedStatus(event.target.value as RequestStatus | "ALL")
            }
            className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          >
            <option value="ALL">All statuses</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="px-5 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
            ▤
          </div>
          <p className="mt-4 text-base font-semibold text-slate-800">
            No requests found
          </p>
          <p className="mt-2 text-sm text-slate-500">
            There are no requests matching the selected status.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Request</th>
                <th scope="col" className="px-5 py-4 font-semibold">Category</th>
                <th scope="col" className="px-5 py-4 font-semibold">Priority</th>
                <th scope="col" className="px-5 py-4 font-semibold">Status</th>
                <th scope="col" className="px-5 py-4 font-semibold">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="transition-colors hover:bg-blue-50/40">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-800">{request.title}</p>
                    <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
                      {request.description}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {request.category}
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-slate-700">
                      {request.priority}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[request.status]}`}>
                      {statusLabels[request.status]}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                    {new Date(request.created_at).toLocaleDateString("en-GB", { timeZone: "UTC" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
