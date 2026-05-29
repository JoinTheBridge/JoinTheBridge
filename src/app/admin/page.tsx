"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase, type Application } from "@/lib/supabase";
import { ROLES, GROUP_COLORS, type RoleGroup } from "@/lib/roles";
import { RoleIcon } from "@/components/RoleIcon";

/* ─── Types ─────────────────────────────────────────────────────────────── */

type AuthState = "checking" | "unauthenticated" | "authenticated";
type AppStatus = Application["status"];

/* ─── Constants ─────────────────────────────────────────────────────────── */

const STATUS_OPTIONS: AppStatus[] = ["Pending", "Reviewed", "Accepted", "Rejected"];

const STATUS_COLORS: Record<AppStatus, string> = {
  Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Reviewed: "bg-blue-50 text-blue-700 border-blue-200",
  Accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rejected: "bg-red-50 text-red-700 border-red-200",
};

const ALL_ROLE_TITLES = ROLES.map((r) => r.title);

/* ─── CSV Export ────────────────────────────────────────────────────────── */

function exportCSV(apps: Application[]) {
  const headers = [
    "ID", "Name", "Email", "Phone", "Role", "State", "Subject",
    "Status", "Submitted", "Extra Answers",
  ];
  const rows = apps.map((a) => [
    a.id,
    a.full_name,
    a.email,
    a.phone ?? "",
    a.role_type,
    a.state,
    a.target_subject,
    a.status,
    new Date(a.created_at).toLocaleDateString(),
    JSON.stringify(a.extra_answers ?? {}),
  ]);
  const csv = [headers, ...rows]
    .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `bridge-applications-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      onSuccess();
    }
  }

  const inputCls =
    "w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none " +
    "focus:ring-2 focus:ring-brand-forest/30 focus:border-brand-forest transition-colors";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-brand-navy flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-brand-navy">Admin Access</h1>
          <p className="text-gray-500 text-sm mt-1">BRIDGE Internal Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="card p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-brand-navy mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@join-the-bridge.org"
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-navy mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputCls}
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Application Card ───────────────────────────────────────────────────── */

function AppCard({
  app,
  onStatusChange,
}: {
  app: Application;
  onStatusChange: (id: string, status: AppStatus) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const role = ROLES.find((r) => r.title === app.role_type);
  const group = (role?.group ?? "Education") as RoleGroup;
  const colors = GROUP_COLORS[group];

  const extraEntries = Object.entries(app.extra_answers ?? {}).filter(
    ([k]) => !["why_bridge", "heard_about"].includes(k)
  );
  const whyBridge = app.extra_answers?.why_bridge;
  const heardAbout = app.extra_answers?.heard_about;

  return (
    <div className="card p-5 flex flex-col gap-4">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-lg"><RoleIcon iconName={role?.icon} className="w-5 h-5" /></span>
            <h3 className="font-bold text-brand-navy text-base">{app.full_name}</h3>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_COLORS[app.status]}`}
            >
              {app.status}
            </span>
          </div>
          <p className="text-sm text-gray-500">{app.email}</p>
          {app.phone && <p className="text-sm text-gray-400">{app.phone}</p>}
        </div>

        {/* Status selector */}
        <select
          value={app.status}
          onChange={(e) => onStatusChange(app.id, e.target.value as AppStatus)}
          className="text-xs border border-gray-300 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-brand-forest/30 focus:border-brand-forest"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Meta pills */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span
          className={`px-2.5 py-1 rounded-full border font-medium ${colors.bg} ${colors.text} ${colors.border}`}
        >
          {app.role_type}
        </span>
        <span className="px-2.5 py-1 rounded-full border bg-gray-50 text-gray-600 border-gray-200">
          📍 {app.state}
        </span>
        <span className="px-2.5 py-1 rounded-full border bg-gray-50 text-gray-600 border-gray-200">
          📚 {app.target_subject}
        </span>
        <span className="px-2.5 py-1 rounded-full border bg-gray-50 text-gray-400 border-gray-200">
          {new Date(app.created_at).toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric",
          })}
        </span>
      </div>

      {/* Why bridge preview */}
      {whyBridge && (
        <p className="text-sm text-gray-600 italic line-clamp-2 border-l-2 border-brand-forest pl-3">
          &ldquo;{whyBridge}&rdquo;
        </p>
      )}

      {/* Expand/collapse button */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="text-xs text-brand-forest font-semibold hover:underline self-start"
      >
        {expanded ? "▲ Hide Details" : "▼ View Full Application"}
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-gray-100 pt-4 space-y-3">
          {heardAbout && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                How They Heard About Us
              </p>
              <p className="text-sm text-gray-700">{heardAbout}</p>
            </div>
          )}

          {whyBridge && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                Why BRIDGE?
              </p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{whyBridge}</p>
            </div>
          )}

          {extraEntries.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Role-Specific Answers
              </p>
              <div className="space-y-2">
                {extraEntries.map(([key, val]) => {
                  const question = role?.questions.find((q) => q.id === key);
                  const label = question?.label ?? key.replace(/_/g, " ");
                  const isUrl = question?.type === "url" || val?.startsWith("http");
                  return (
                    <div key={key} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs font-semibold text-gray-500 mb-0.5">{label}</p>
                      {isUrl && val ? (
                        <a
                          href={val}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-brand-forest hover:underline break-all"
                        >
                          {val}
                        </a>
                      ) : (
                        <p className="text-sm text-gray-800 whitespace-pre-wrap">{val || "—"}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Main Dashboard ────────────────────────────────────────────────────── */

export default function AdminDashboard() {
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* Filters */
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterState, setFilterState] = useState("");
  const [filterStatus, setFilterStatus] = useState<AppStatus | "">("");

  /* ── Auth check ── */
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthState(data.session ? "authenticated" : "unauthenticated");
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthState(session ? "authenticated" : "unauthenticated");
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  /* ── Fetch applications ── */
  const fetchApps = useCallback(async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase
      .from("applications_staging")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setApplications(data as Application[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authState === "authenticated") fetchApps();
  }, [authState, fetchApps]);

  /* ── Status update ── */
  async function handleStatusChange(id: string, newStatus: AppStatus) {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    await supabase.from("applications_staging").update({ status: newStatus }).eq("id", id);
  }

  /* ── Sign out ── */
  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  /* ── Auth gate ── */
  if (authState === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} className="opacity-25" />
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
          </svg>
          Loading…
        </div>
      </div>
    );
  }

  if (authState === "unauthenticated") {
    return <LoginForm onSuccess={() => setAuthState("authenticated")} />;
  }

  /* ── Filter logic ── */
  const filtered = applications.filter((a) => {
    const matchSearch =
      !searchQuery ||
      a.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = !filterRole || a.role_type === filterRole;
    const matchState = !filterState || a.state === filterState;
    const matchStatus = !filterStatus || a.status === filterStatus;
    return matchSearch && matchRole && matchState && matchStatus;
  });

  const allStates = [...new Set(applications.map((a) => a.state))].sort();

  /* ── Stats ── */
  const pending = applications.filter((a) => a.status === "Pending").length;
  const accepted = applications.filter((a) => a.status === "Accepted").length;
  const reviewed = applications.filter((a) => a.status === "Reviewed").length;

  /* ── Dashboard UI ── */
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-brand-navy text-white sticky top-0 z-50 shadow-lg">
        <div className="container-grid py-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-brand-forest-light text-xs font-semibold uppercase tracking-widest">
              Internal
            </p>
            <h1 className="text-xl font-bold text-white">Applications Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => exportCSV(filtered)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600 text-gray-300 text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export CSV
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="container-grid py-8 space-y-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Applications", value: applications.length, color: "text-brand-navy" },
            { label: "Pending Review", value: pending, color: "text-yellow-600" },
            { label: "Reviewed", value: reviewed, color: "text-blue-600" },
            { label: "Accepted", value: accepted, color: "text-emerald-600" },
          ].map((stat) => (
            <div key={stat.label} className="card p-4 text-center">
              <p className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filter bar */}
        <div className="card p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search by name or email…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/30 focus:border-brand-forest"
              />
            </div>

            {/* Role filter */}
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-forest/30 focus:border-brand-forest"
            >
              <option value="">All Roles</option>
              {ALL_ROLE_TITLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            {/* State filter */}
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-forest/30 focus:border-brand-forest"
            >
              <option value="">All States</option>
              {allStates.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Status filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as AppStatus | "")}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-forest/30 focus:border-brand-forest"
            >
              <option value="">All Statuses</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Filter summary */}
          <p className="text-xs text-gray-400 mt-3">
            Showing <span className="font-semibold text-gray-600">{filtered.length}</span> of{" "}
            <span className="font-semibold text-gray-600">{applications.length}</span> applications
            {(filterRole || filterState || filterStatus || searchQuery) && (
              <button
                onClick={() => {
                  setFilterRole("");
                  setFilterState("");
                  setFilterStatus("");
                  setSearchQuery("");
                }}
                className="ml-3 text-brand-forest hover:underline"
              >
                Clear filters
              </button>
            )}
          </p>
        </div>

        {/* Application list */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400 gap-3">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} className="opacity-25" />
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
            </svg>
            Loading applications…
          </div>
        ) : error ? (
          <div className="card p-6 text-center text-red-600">
            <p className="font-semibold mb-1">Error loading applications</p>
            <p className="text-sm text-red-400">{error}</p>
            <button onClick={fetchApps} className="mt-4 btn-secondary text-sm">
              Retry
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card p-12 text-center text-gray-400">
            <p className="text-4xl mb-3">📭</p>
            <p className="font-semibold text-gray-500">No applications match your filters.</p>
            <p className="text-sm mt-1">Try adjusting the filters above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filtered.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
