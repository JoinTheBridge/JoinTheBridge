"use client";

import { useState, useCallback, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { RoleIcon } from "@/components/RoleIcon";
import { supabase, type ApplicationInsert } from "@/lib/supabase";
import type { RoleConfig } from "@/lib/roles";

/* ─── Constants ────────────────────────────────────────────────────────── */

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

const HEAR_ABOUT_OPTIONS = [
  "Social Media",
  "Friend or Family",
  "School / University",
  "Community Event",
  "Google Search",
  "Other",
];

const SUBJECTS = ["Mathematics", "Science", "Literacy", "Economics", "Not Applicable"] as const;

type FormStatus = "idle" | "loading" | "success" | "error";
type Step = 1 | 2;

interface PersonalInfo {
  full_name: string;
  email: string;
  phone: string;
  state: string;
  target_subject: string;
  why_bridge: string;
  heard_about: string;
}

/* ─── Input Styles ──────────────────────────────────────────────────────── */

const inputCls =
  "w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 " +
  "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-forest/30 " +
  "focus:border-brand-forest transition-colors bg-white";

const labelCls = "block text-sm font-semibold text-brand-navy mb-1.5";

/* ─── Component ────────────────────────────────────────────────────────── */

interface Props {
  role: RoleConfig;
}

export default function ApplicationForm({ role }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  /* ── Personal info state (step 1) ── */
  const [personal, setPersonal] = useState<PersonalInfo>({
    full_name: "",
    email: "",
    phone: "",
    state: "",
    target_subject: "",
    why_bridge: "",
    heard_about: "",
  });

  /* ── Extra answers state (step 2) ── */
  const [extras, setExtras] = useState<Record<string, string>>(() =>
    Object.fromEntries(role.questions.map((q) => [q.id, ""]))
  );

  const updatePersonal = useCallback(
    (field: keyof PersonalInfo, value: string) =>
      setPersonal((prev) => ({ ...prev, [field]: value })),
    []
  );

  const updateExtra = useCallback(
    (id: string, value: string) =>
      setExtras((prev) => ({ ...prev, [id]: value })),
    []
  );

  /* ── Step 1 validation ── */
  function validateStep1(): boolean {
    return !!(
      personal.full_name.trim() &&
      personal.email.trim() &&
      personal.state &&
      personal.target_subject &&
      personal.why_bridge.trim()
    );
  }

  function handleNext(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validateStep1()) setStep(2);
  }

  /* ── Final submit ── */
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const payload: ApplicationInsert = {
      full_name: personal.full_name,
      email: personal.email,
      phone: personal.phone || undefined,
      state: personal.state,
      role_type: role.title,
      target_subject: personal.target_subject as ApplicationInsert["target_subject"],
      extra_answers: {
        why_bridge: personal.why_bridge,
        heard_about: personal.heard_about,
        ...extras,
      },
    };

    const { error } = await supabase.from("applications_staging").insert(payload);

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
      return;
    }

    setStatus("success");
  }

  /* ── Success ── */
  if (status === "success") {
    return (
      <div className="card p-10 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-brand-forest"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-brand-navy mb-2">
          Application Submitted!
        </h3>
        <p className="text-gray-500 mb-2">
          Thanks for applying for <span className="font-semibold text-brand-navy">{role.title}</span>.
        </p>
        <p className="text-gray-500 mb-8">
          Our team will review your application and reach out within 48 hours.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => router.push("/volunteer")}
            className="btn-primary"
          >
            View All Roles
          </button>
          <button
            onClick={() => {
              setStatus("idle");
              setStep(1);
              setPersonal({
                full_name: "", email: "", phone: "", state: "",
                target_subject: "", why_bridge: "", heard_about: "",
              });
              setExtras(Object.fromEntries(role.questions.map((q) => [q.id, ""])));
            }}
            className="btn-secondary"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  /* ── Progress bar ── */
  const progressPct = step === 1 ? 50 : 100;

  return (
    <div className="card overflow-hidden">
      {/* Progress header */}
      <div className="bg-brand-navy px-6 py-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-brand-forest-light text-xs font-semibold uppercase tracking-widest mb-0.5">
              Step {step} of 2
            </p>
            <h3 className="text-white font-bold text-lg">
              {step === 1 ? "Personal Information" : "Role-Specific Questions"}
            </h3>
          </div>
          <span className="text-2xl"><RoleIcon iconName={role.icon} className="w-6 h-6" /></span>
        </div>
        {/* Progress bar */}
        <div className="w-full bg-white/20 rounded-full h-1.5">
          <div
            className="bg-brand-forest-light h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* ── STEP 1 ── */}
        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-5">
            {/* Name / Email side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="full_name"
                  type="text"
                  required
                  value={personal.full_name}
                  onChange={(e) => updatePersonal("full_name", e.target.value)}
                  placeholder="Jane Smith"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={personal.email}
                  onChange={(e) => updatePersonal("email", e.target.value)}
                  placeholder="you@example.com"
                  className={inputCls}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className={labelCls}>Phone Number</label>
              <input
                id="phone"
                type="tel"
                value={personal.phone}
                onChange={(e) => updatePersonal("phone", e.target.value)}
                placeholder="(555) 000-0000"
                className={inputCls}
              />
            </div>

            {/* State / Subject side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  id="state"
                  required
                  value={personal.state}
                  onChange={(e) => updatePersonal("state", e.target.value)}
                  className={inputCls}
                >
                  <option value="">Select your state</option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>
                  Preferred Subject Area <span className="text-red-500">*</span>
                </label>
                <select
                  id="target_subject"
                  required
                  value={personal.target_subject}
                  onChange={(e) => updatePersonal("target_subject", e.target.value)}
                  className={inputCls}
                >
                  <option value="">Select a subject</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Why BRIDGE */}
            <div>
              <label className={labelCls}>
                Why do you want to join BRIDGE? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="why_bridge"
                required
                rows={4}
                value={personal.why_bridge}
                onChange={(e) => updatePersonal("why_bridge", e.target.value)}
                placeholder="Tell us what motivates you to volunteer with BRIDGE..."
                className={inputCls + " resize-none"}
              />
            </div>

            {/* Heard about */}
            <div>
              <label className={labelCls}>How did you hear about us?</label>
              <select
                id="heard_about"
                value={personal.heard_about}
                onChange={(e) => updatePersonal("heard_about", e.target.value)}
                className={inputCls}
              >
                <option value="">Select an option</option>
                {HEAR_ABOUT_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button type="submit" className="btn-primary w-full justify-center">
                Continue to Role Questions
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </form>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <p className="text-sm text-gray-500 -mt-1 mb-2">
              These questions are specific to the{" "}
              <span className="font-semibold text-brand-navy">{role.title}</span> role.
            </p>

            {role.questions.map((q) => (
              <div key={q.id}>
                <label htmlFor={q.id} className={labelCls}>
                  {q.label}{" "}
                  {q.required && <span className="text-red-500">*</span>}
                </label>
                {q.hint && (
                  <p className="text-xs text-gray-400 mb-1.5">{q.hint}</p>
                )}

                {q.type === "textarea" ? (
                  <textarea
                    id={q.id}
                    required={q.required}
                    rows={4}
                    value={extras[q.id] ?? ""}
                    onChange={(e) => updateExtra(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    className={inputCls + " resize-none"}
                  />
                ) : q.type === "select" && q.options ? (
                  <select
                    id={q.id}
                    required={q.required}
                    value={extras[q.id] ?? ""}
                    onChange={(e) => updateExtra(q.id, e.target.value)}
                    className={inputCls}
                  >
                    <option value="">Select an option</option>
                    {q.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={q.id}
                    type={q.type}
                    required={q.required}
                    value={extras[q.id] ?? ""}
                    onChange={(e) => updateExtra(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    className={inputCls}
                    min={q.type === "number" ? 0 : undefined}
                  />
                )}
              </div>
            ))}

            {/* Error */}
            {status === "error" && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                <p className="font-semibold">Submission failed</p>
                <p>{errorMsg || "Please try again later."}</p>
              </div>
            )}

            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-secondary flex-1 justify-center"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary flex-1 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
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
        )}
      </div>
    </div>
  );
}
