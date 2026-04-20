"use client";

import { FormEvent, useState } from "react";

type Props = {
  roleTitle: string;
  roleSlug: string;
};

const defaultState = {
  fullName: "",
  phone: "",
  email: "",
  experienceBand: "",
  location: "",
  currentCtc: "",
  expectedCtc: "",
  noticePeriod: "",
  linkedInUrl: "",
  portfolioUrl: "",
  resume: null as File | null,
  otherDocument: null as File | null,
};

export function ApplyForm({ roleTitle, roleSlug }: Props) {
  const [form, setForm] = useState(defaultState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    if (!form.resume) {
      setStatus("error");
      setMessage("Please attach your resume (PDF).");
      return;
    }

    const fd = new FormData();
    fd.append("fullName", form.fullName);
    fd.append("phone", form.phone);
    fd.append("email", form.email);
    fd.append("experienceBand", form.experienceBand);
    fd.append("location", form.location);
    fd.append("currentCtc", form.currentCtc);
    fd.append("expectedCtc", form.expectedCtc);
    fd.append("noticePeriod", form.noticePeriod);
    fd.append("position", roleTitle);
    fd.append("roleSlug", roleSlug);
    if (form.linkedInUrl.trim()) fd.append("linkedInUrl", form.linkedInUrl.trim());
    if (form.portfolioUrl.trim()) fd.append("portfolioUrl", form.portfolioUrl.trim());
    fd.append("resume", form.resume);
    if (form.otherDocument) fd.append("otherDocument", form.otherDocument);

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        body: fd,
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Submission failed");
      }

      setStatus("success");
      setMessage("Application submitted successfully. Our HR team will review your profile.");
      setForm(defaultState);
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "Unable to submit right now. Please try again in a few minutes.",
      );
    }
  }

  return (
    <form className="application-form" onSubmit={onSubmit}>
      <h2>Personal Details</h2>
      <div className="form-grid">
        <label>
          Full Name *
          <input
            required
            value={form.fullName}
            onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
          />
        </label>
        <label>
          Mobile Number *
          <input
            required
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
          />
        </label>
        <label>
          Email *
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          />
        </label>
      </div>

      <h2>Job & Experience</h2>
      <div className="form-grid">
        <label>
          Role
          <input value={roleTitle} disabled />
        </label>
        <label>
          Years of Experience *
          <select
            required
            value={form.experienceBand}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, experienceBand: event.target.value }))
            }
          >
            <option value="">Select</option>
            <option value="fresher">Fresher</option>
            <option value="0-2-years">0–2 Years</option>
            <option value="above-2-years">Above 2 Years</option>
          </select>
        </label>
        <label>
          Current Location *
          <input
            required
            value={form.location}
            onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
          />
        </label>
      </div>

      <h2>Professional Details</h2>
      <div className="form-grid">
        <label>
          Current CTC
          <input
            value={form.currentCtc}
            onChange={(event) => setForm((prev) => ({ ...prev, currentCtc: event.target.value }))}
          />
        </label>
        <label>
          Expected CTC
          <input
            value={form.expectedCtc}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, expectedCtc: event.target.value }))
            }
          />
        </label>
        <label>
          Notice Period
          <select
            value={form.noticePeriod}
            onChange={(event) => setForm((prev) => ({ ...prev, noticePeriod: event.target.value }))}
          >
            <option value="">Select</option>
            <option value="immediate">Immediate</option>
            <option value="15-days">15 Days</option>
            <option value="30-days">30 Days</option>
            <option value="60-days">60 Days</option>
            <option value="90-days">90 Days</option>
          </select>
        </label>
        <label>
          LinkedIn URL
          <input
            type="url"
            value={form.linkedInUrl}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, linkedInUrl: event.target.value }))
            }
          />
        </label>
        <label>
          Portfolio / GitHub URL
          <input
            type="url"
            value={form.portfolioUrl}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, portfolioUrl: event.target.value }))
            }
          />
        </label>
      </div>

      <h2>Documents</h2>
      <div className="form-grid">
        <label>
          Resume (PDF) *
          <input
            required
            type="file"
            accept=".pdf"
            onChange={(event) =>
              setForm((prev) => ({ ...prev, resume: event.target.files?.[0] ?? null }))
            }
          />
        </label>
        <label>
          Other Documents
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={(event) =>
              setForm((prev) => ({ ...prev, otherDocument: event.target.files?.[0] ?? null }))
            }
          />
        </label>
      </div>

      <button type="submit" className="btn primary submit-button" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit application"}
      </button>
      {message ? <p className="submit-message">{message}</p> : null}
    </form>
  );
}
