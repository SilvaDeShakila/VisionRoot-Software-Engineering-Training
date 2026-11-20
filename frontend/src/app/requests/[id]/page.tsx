"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { requestService } from "@/features/requests/services/request-service";
import type {
  RequestStatus,
  ServiceRequest,
} from "@/features/requests/types/request";

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

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function RequestDetailsContent() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [selectedStatus, setSelectedStatus] =
    useState<RequestStatus>("OPEN");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isActive = true;

    async function loadRequest() {
      setIsLoading(true);
      setError("");

      try {
        const result = await requestService.getById(id);

        if (isActive) {
          setRequest(result);
          setSelectedStatus(result.status);
        }
      } catch (err) {
        if (isActive) {
          setRequest(null);
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load request details."
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadRequest();

    return () => {
      isActive = false;
    };
  }, [id, reloadKey]);

  async function handleStatusUpdate() {
    if (!request || isUpdating || selectedStatus === request.status) {
      return;
    }

    setIsUpdating(true);
    setUpdateError("");
    setUpdateSuccess("");

    try {
      const updatedRequest = await requestService.updateStatus(
        request.id,
        selectedStatus
      );

      setRequest(updatedRequest);
      setSelectedStatus(updatedRequest.status);
      setUpdateSuccess("Request status updated successfully.");
    } catch (err) {
      setUpdateError(
        err instanceof Error
          ? err.message
          : "Unable to update request status. Please try again."
      );
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] md:flex">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="mx-auto w-full max-w-[1200px] flex-1 space-y-6 p-5 sm:p-8 lg:p-10">
          <div>
            <Link
              href="/#requests"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 transition hover:text-blue-900"
            >
              <span aria-hidden="true">&larr;</span>
              Back to Requests
            </Link>

            <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
              Request Details
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              View the information and current status of this service request.
            </p>
          </div>

          {isLoading ? (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-sm text-slate-600">
                Loading request details...
              </p>
            </div>
          ) : error ? (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-white p-6 shadow-sm"
            >
              <h2 className="font-semibold text-red-700">
                Unable to load request
              </h2>

              <p className="mt-2 text-sm text-slate-600">{error}</p>

              <button
                type="button"
                onClick={() => setReloadKey((current) => current + 1)}
                className="mt-5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
              >
                Try Again
              </button>
            </div>
          ) : request ? (
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
              <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Service Request
                  </p>

                  <h2 className="mt-2 break-words text-xl font-bold text-slate-900 sm:text-2xl">
                    {request.title}
                  </h2>

                  <p className="mt-2 break-all text-xs text-slate-400">
                    ID: {request.id}
                  </p>
                </div>

                <span
                  className={`inline-flex w-fit shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold ${statusStyles[request.status]}`}
                >
                  {statusLabels[request.status]}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 border-b border-slate-100 py-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-500">Category</p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {request.category}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Priority</p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {request.priority}
                  </p>
                </div>
              </div>

              <div className="border-b border-slate-100 py-6">
                <h3 className="font-semibold text-slate-900">Description</h3>
                <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-slate-600">
                  {request.description}
                </p>
              </div>

              <div className="border-b border-slate-100 py-6">
                <h3 className="font-semibold text-slate-900">
                  Update Request Status
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Select a new status for this service request.
                </p>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <label htmlFor="request-status" className="sr-only">
                    New request status
                  </label>
                  <select
                    id="request-status"
                    value={selectedStatus}
                    disabled={isUpdating}
                    onChange={(event) => {
                      setSelectedStatus(event.target.value as RequestStatus);
                      setUpdateError("");
                      setUpdateSuccess("");
                    }}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60 sm:max-w-xs"
                  >
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="CLOSED">Closed</option>
                  </select>

                  <button
                    type="button"
                    onClick={handleStatusUpdate}
                    disabled={
                      isUpdating || selectedStatus === request.status
                    }
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isUpdating ? "Updating..." : "Update Status"}
                  </button>
                </div>

                {updateError && (
                  <p
                    role="alert"
                    className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                  >
                    {updateError}
                  </p>
                )}

                {updateSuccess && (
                  <p
                    role="status"
                    className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700"
                  >
                    {updateSuccess}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-500">Created At</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {formatDate(request.createdAt)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Last Updated</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {formatDate(request.updatedAt)}
                  </p>
                </div>
              </div>
            </section>
          ) : null}

          <div className="text-center text-xs text-slate-400">
            VisionRoot Service Request Management
          </div>
        </main>
      </div>
    </div>
  );
}

export default function RequestDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F1F5F9] p-8 text-center text-slate-600">
          Loading request details...
        </div>
      }
    >
      <RequestDetailsContent />
    </Suspense>
  );
}
