import type { ServiceRequest } from "../types/request";

interface SummaryCardsProps {
  requests: ServiceRequest[];
}

export default function SummaryCards({ requests }: SummaryCardsProps) {
  const cards = [
    {
      label: "Total Requests",
      value: requests.length,
      icon: "▤",
      accent: "bg-blue-50 text-blue-700",
      border: "border-l-blue-500",
    },
    {
      label: "Open Requests",
      value: requests.filter((request) => request.status === "OPEN").length,
      icon: "◷",
      accent: "bg-amber-50 text-amber-700",
      border: "border-l-amber-500",
    },
    {
      label: "In Progress",
      value: requests.filter((request) => request.status === "IN_PROGRESS").length,
      icon: "↗",
      accent: "bg-indigo-50 text-indigo-700",
      border: "border-l-indigo-500",
    },
    {
      label: "Resolved",
      value: requests.filter((request) => request.status === "RESOLVED").length,
      icon: "✓",
      accent: "bg-emerald-50 text-emerald-700",
      border: "border-l-emerald-500",
    },
  ];

  return (
    <section
      aria-label="Request summary"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
    >
      {cards.map((card) => (
        <article
          key={card.label}
          className={`rounded-xl border border-slate-200 border-l-4 ${card.border} bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-500">
              {card.label}
            </p>
            <span
              aria-hidden="true"
              className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${card.accent}`}
            >
              {card.icon}
            </span>
          </div>

          <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
            {card.value}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Service request overview
          </p>
        </article>
      ))}
    </section>
  );
}
