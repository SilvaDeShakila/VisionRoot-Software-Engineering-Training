"use client";

import { useState } from "react";

const navigationItems = [
  { label: "Overview", href: "#overview", icon: "O" },
  { label: "All Requests", href: "#requests", icon: "R" },
  { label: "Create Request", href: "#new-request", icon: "+" },
];

function NavigationLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ul className="space-y-2">
      {navigationItems.map((item, index) => (
        <li key={item.label}>
          <a
            href={item.href}
            aria-current={index === 0 ? "page" : undefined}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
              index === 0
                ? "bg-blue-600 text-white shadow-sm"
                : "text-white hover:bg-white/10"
            }`}
          >
            <span aria-hidden="true" className="w-5 text-center text-lg">
              {item.icon}
            </span>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile header */}
      <div className="flex h-16 items-center justify-between bg-[#1E3A8A] px-5 text-white md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl font-bold text-[#1E3A8A]">
            S
          </div>
          <div>
            <h1 className="text-lg font-bold">Service Desk</h1>
            <p className="text-xs text-blue-200">Request Management</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/20 hover:bg-white/10"
        >
          <span className="h-0.5 w-5 rounded bg-white" />
          <span className="h-0.5 w-5 rounded bg-white" />
          <span className="h-0.5 w-5 rounded bg-white" />
        </button>
      </div>

      {/* Mobile drawer backdrop */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* Mobile slide-in drawer */}
      <aside
        aria-label="Mobile sidebar"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col bg-[#1E3A8A] text-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl font-bold text-[#1E3A8A]">
              S
            </div>
            <div>
              <h1 className="text-lg font-bold">Service Desk</h1>
              <p className="text-xs text-blue-200">Request Management</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-2xl text-white hover:bg-white/10"
          >
            ×
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="flex-1 px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-blue-300">
            Workspace
          </p>
          <NavigationLinks onNavigate={() => setIsOpen(false)} />
        </nav>

        <div className="border-t border-white/10 p-5">
          <p className="text-xs font-medium text-blue-100">
            Internal Service Management
          </p>
          <p className="mt-1 text-xs text-blue-300">Training Project</p>
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-64 shrink-0 flex-col bg-[#1E3A8A] text-white md:sticky md:top-0 md:flex">
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl font-bold text-[#1E3A8A] shadow-sm">
            S
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Service Desk</h1>
            <p className="text-xs text-blue-200">Request Management</p>
          </div>
        </div>

        <nav aria-label="Main navigation" className="flex-1 px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-blue-300">
            Workspace
          </p>
          <NavigationLinks />
        </nav>

        <div className="border-t border-white/10 p-5">
          <p className="text-xs font-medium text-blue-100">
            Internal Service Management
          </p>
          <p className="mt-1 text-xs text-blue-300">Training Project</p>
        </div>
      </aside>
    </>
  );
}
