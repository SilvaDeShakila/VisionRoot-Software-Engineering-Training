"use client";

import { useEffect, useState } from "react";
import type { CreateRequestInput, ServiceRequest } from "../types/request";
import { requestService } from "../services/request-service";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import SummaryCards from "./summary-cards";
import RequestList from "./request-list";
import CreateRequestForm from "./create-request-form";

export default function Dashboard() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isActive = true;

    async function loadRequests() {
      setIsLoading(true);
      setLoadError("");

      try {
        const response = await requestService.getAll();

        if (isActive) {
          setRequests(response.data);
        }
      } catch (error) {
        if (isActive) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "Unable to load service requests.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadRequests();

    return () => {
      isActive = false;
    };
  }, [reloadKey]);

  async function handleCreateRequest(data: CreateRequestInput): Promise<void> {
    const createdRequest = await requestService.create(data);

    setRequests((currentRequests) => [
      createdRequest,
      ...currentRequests,
    ]);
  }

  return (
    <div id="overview" className="min-h-screen bg-[#F1F5F9] md:flex">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="mx-auto w-full max-w-[1600px] flex-1 space-y-8 p-5 sm:p-8 lg:p-10">
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] p-6 text-white shadow-md sm:p-8">
            <div className="relative z-10 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">
                Dashboard Overview
              </p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Welcome to Service Desk
              </h1>
              <p className="mt-3 text-sm leading-6 text-blue-100 sm:text-base">
                Manage and track internal service requests from one place.
              </p>
            </div>
            <div
              aria-hidden="true"
              className="absolute -right-12 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-28 right-36 h-64 w-64 rounded-full bg-white/5"
            />
          </section>

          <SummaryCards requests={requests} />

          {isLoading ? (
            <section
              aria-live="polite"
              className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center shadow-sm"
            >
              <p className="text-sm font-medium text-slate-600">
                Loading service requests...
              </p>
            </section>
          ) : loadError ? (
            <section
              role="alert"
              className="rounded-2xl border border-red-200 bg-white px-5 py-10 text-center shadow-sm"
            >
              <p className="font-semibold text-red-700">
                Unable to load service requests
              </p>
              <p className="mt-2 text-sm text-slate-600">{loadError}</p>
              <button
                type="button"
                onClick={() => setReloadKey((current) => current + 1)}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                Try Again
              </button>
            </section>
          ) : (
            <RequestList requests={requests} />
          )}

          <CreateRequestForm onCreate={handleCreateRequest} />

          <footer className="border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
            Service Desk Management System · Training Project
          </footer>
        </main>
      </div>
    </div>
  );
}
