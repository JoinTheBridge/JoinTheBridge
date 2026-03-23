"use client";

import { useEffect, useState } from "react";
import { supabase, type Application } from "@/lib/supabase";

/* ─── Status Badge ─────────────────────────────────────────────────────── */

function StatusBadge({ status }: { status: Application["status"] }) {
  const styles: Record<Application["status"], string> = {
    Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Reviewed: "bg-blue-50 text-blue-700 border-blue-200",
    Accepted: "bg-green-50 text-green-700 border-green-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      {status}
    </span>
  );
}

/* ─── Dashboard ────────────────────────────────────────────────────────── */

export default function StaffDashboardPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterSubject, setFilterSubject] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  useEffect(() => {
    async function fetchApplications() {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
        setLoading(false);
        return;
      }

      setApplications((data as Application[]) || []);
      setLoading(false);
    }

    fetchApplications();
  }, []);

  /* Mark as reviewed */
  async function markReviewed(id: string) {
    const { error: updateError } = await supabase
      .from("applications")
      .update({ status: "Reviewed" })
      .eq("id", id);

    if (!updateError) {
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: "Reviewed" } : app
        )
      );
    }
  }

  /* Filtered results */
  const filtered = applications.filter((app) => {
    if (filterSubject !== "All" && app.target_subject !== filterSubject)
      return false;
    if (filterStatus !== "All" && app.status !== filterStatus) return false;
    return true;
  });

  /* Stats */
  const totalPending = applications.filter((a) => a.status === "Pending").length;
  const totalReviewed = applications.filter((a) => a.status === "Reviewed").length;

  return (
    <main>
      {/* Hero */}
      <section className="bg-brand-navy text-white">
        <div className="container-grid py-16">
          <p className="text-brand-forest-light font-semibold text-sm uppercase tracking-widest mb-3">
            Staff Only
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Application Dashboard
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            Review incoming volunteer and leadership applications. Filter by
            subject or status to manage your queue.
          </p>
        </div>
      </section>

      <div className="container-grid py-12">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="card p-5 text-center">
            <p className="text-3xl font-extrabold text-brand-navy">
              {applications.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Total Applications</p>
          </div>
          <div className="card p-5 text-center">
            <p className="text-3xl font-extrabold text-yellow-600">
              {totalPending}
            </p>
            <p className="text-sm text-gray-500 mt-1">Pending Review</p>
          </div>
          <div className="card p-5 text-center">
            <p className="text-3xl font-extrabold text-brand-forest">
              {totalReviewed}
            </p>
            <p className="text-sm text-gray-500 mt-1">Reviewed</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Subject
            </label>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-forest/30"
            >
              <option value="All">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="Literacy">Literacy</option>
              <option value="Economics">Economics</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-forest/30"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
            <p className="font-semibold">Failed to load applications</p>
            <p>{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-20 text-gray-400">
            <svg className="animate-spin h-8 w-8 mx-auto mb-4 text-brand-forest" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} className="opacity-25" />
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
            </svg>
            <p>Loading applications...</p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">
                      Name
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">
                      Role
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">
                      Subject
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">
                      State
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">
                      Status
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">
                      Date
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-12 text-center text-gray-400"
                      >
                        No applications found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((app) => (
                      <tr
                        key={app.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-brand-navy whitespace-nowrap">
                          {app.full_name}
                        </td>
                        <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                          {app.role_type}
                        </td>
                        <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                          {app.target_subject}
                        </td>
                        <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                          {app.state}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={app.status} />
                        </td>
                        <td className="px-6 py-4 text-gray-400 whitespace-nowrap">
                          {new Date(app.created_at).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" }
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {app.status === "Pending" && (
                            <button
                              onClick={() => markReviewed(app.id)}
                              className="text-sm font-semibold text-brand-forest hover:underline"
                            >
                              Mark Reviewed
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
