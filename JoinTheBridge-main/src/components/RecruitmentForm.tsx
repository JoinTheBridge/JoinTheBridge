"use client";

import { useState, type FormEvent } from "react";
import { supabase, type ApplicationInsert } from "@/lib/supabase";

/* ─── Constants ────────────────────────────────────────────────────────── */

const SUBJECTS = ["Mathematics", "Science", "Literacy", "Economics"] as const;

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
] as const;

/* ─── Component ────────────────────────────────────────────────────────── */

type FormStatus = "idle" | "loading" | "success" | "error";

export default function RecruitmentForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);

    const payload: ApplicationInsert = {
      full_name: formData.get("full_name") as string,
      email: formData.get("email") as string,
      role_type: formData.get("role_type") as ApplicationInsert["role_type"],
      target_subject: formData.get("target_subject") as ApplicationInsert["target_subject"],
      state: formData.get("state") as string,
    };

    const { error } = await supabase.from("applications").insert(payload);

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
      return;
    }

    setStatus("success");
    (e.target as HTMLFormElement).reset();
  }

  /* ── Success State ── */
  if (status === "success") {
    return (
      <div className="card p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-brand-forest">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-brand-navy mb-2">
          Application Submitted
        </h3>
        <p className="text-gray-500 mb-6">
          Thank you for your interest in BRIDGE. Our team will review your
          application and reach out within 48 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn-secondary text-sm"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <form onSubmit={handleSubmit} className="card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
        <div className="w-2.5 h-2.5 rounded-full bg-brand-forest" />
        <h3 className="text-lg font-bold text-brand-navy">
          Volunteer Application
        </h3>
      </div>

      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="full_name" className="block text-sm font-semibold text-brand-navy mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            required
            placeholder="Enter your full name"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-forest/30 focus:border-brand-forest transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-brand-navy mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-forest/30 focus:border-brand-forest transition-colors"
          />
        </div>

        {/* Role Type & Subject — side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="role_type" className="block text-sm font-semibold text-brand-navy mb-1.5">
              Role Type <span className="text-red-500">*</span>
            </label>
            <select
              id="role_type"
              name="role_type"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-forest/30 focus:border-brand-forest transition-colors"
            >
              <option value="">Select a role</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Head of Subject">Head of Subject</option>
            </select>
          </div>

          <div>
            <label htmlFor="target_subject" className="block text-sm font-semibold text-brand-navy mb-1.5">
              Target Subject <span className="text-red-500">*</span>
            </label>
            <select
              id="target_subject"
              name="target_subject"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-forest/30 focus:border-brand-forest transition-colors"
            >
              <option value="">Select a subject</option>
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* State */}
        <div>
          <label htmlFor="state" className="block text-sm font-semibold text-brand-navy mb-1.5">
            State <span className="text-red-500">*</span>
          </label>
          <select
            id="state"
            name="state"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-forest/30 focus:border-brand-forest transition-colors"
          >
            <option value="">Select your state</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Error */}
      {status === "error" && (
        <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          <p className="font-semibold">Submission failed</p>
          <p>{errorMsg || "Please try again later."}</p>
        </div>
      )}

      {/* Submit */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} className="opacity-25" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
              </svg>
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
        </button>
      </div>
    </form>
  );
}
