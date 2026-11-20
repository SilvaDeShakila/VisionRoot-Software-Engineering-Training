export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex min-h-20 items-center justify-between border-b border-slate-200/80 bg-white/95 px-5 py-4 shadow-sm backdrop-blur sm:px-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Workspace
        </p>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
          Service Requests
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-lg text-slate-600"
        >
          ♧
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
        </div>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 ring-2 ring-blue-50">
            U
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">User</p>
            <p className="text-xs text-slate-500">Workspace Member</p>
          </div>
        </div>
      </div>
    </header>
  );
}
