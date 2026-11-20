"use client";

import { useState, type FormEvent } from "react";
import type { CreateRequestInput } from "../types/request";

interface CreateRequestFormProps {
  onCreate: (data: CreateRequestInput) => void;
}

export default function CreateRequestForm({
  onCreate,
}: CreateRequestFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] =
    useState<CreateRequestInput["category"]>("IT");
  const [priority, setPriority] =
    useState<CreateRequestInput["priority"]>("MEDIUM");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess(false);

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription) {
      setError("Please complete all required fields.");
      return;
    }

    if (trimmedTitle.length > 150) {
      setError("Title must not exceed 150 characters.");
      return;
    }

    onCreate({
      title: trimmedTitle,
      description: trimmedDescription,
      category,
      priority,
    });

    setTitle("");
    setDescription("");
    setCategory("IT");
    setPriority("MEDIUM");
    setSuccess(true);
  }

  return (
    <section
      id="new-request"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
    >
      <div className="mb-7 border-b border-slate-100 pb-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          New Submission
        </p>
        <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
          Create New Request
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Submit a service request by completing the form below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="request-title"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Request Title <span className="text-red-500">*</span>
          </label>
          <input
            id="request-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={150}
            required
            placeholder="Enter a short request title"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
          <p className="mt-2 text-right text-xs text-slate-400">
            {title.length}/150 characters
          </p>
        </div>

        <div>
          <label
            htmlFor="request-description"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="request-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            rows={4}
            placeholder="Describe the issue or service you need..."
            className="w-full resize-y rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="request-category"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="request-category"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as CreateRequestInput["category"])
              }
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              <option value="IT">IT</option>
              <option value="Facilities">Facilities</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="request-priority"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Priority <span className="text-red-500">*</span>
            </label>
            <select
              id="request-priority"
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value as CreateRequestInput["priority"])
              }
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
        </div>

        {error && (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        {success && (
          <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
            Request added to the current dashboard session.
          </p>
        )}

        <div className="flex justify-end border-t border-slate-100 pt-5">
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            Submit Request
          </button>
        </div>
      </form>
    </section>
  );
}
