"use client";

import { FormEvent, useState } from "react";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedInUrl: "",
  portfolioUrl: "",
  position: "Senior Data Engineer",
  yearsExperience: "",
  startDate: "",
  salaryExpectation: "",
  legalAuthorization: "",
  visaSponsorship: "",
  resume: null as File | null,
};

export default function CareersApplyPage() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    if (!form.resume) {
      setStatus("error");
      setMessage("Please attach your resume (PDF or Word).");
      return;
    }

    const fd = new FormData();
    fd.append("fullName", form.fullName);
    fd.append("email", form.email);
    fd.append("phone", form.phone);
    fd.append("location", form.location);
    fd.append("linkedInUrl", form.linkedInUrl);
    if (form.portfolioUrl.trim()) fd.append("portfolioUrl", form.portfolioUrl.trim());
    fd.append("position", form.position);
    fd.append("yearsExperience", form.yearsExperience);
    fd.append("startDate", form.startDate);
    fd.append("salaryExpectation", form.salaryExpectation);
    fd.append("legalAuthorization", form.legalAuthorization);
    fd.append("visaSponsorship", form.visaSponsorship);
    fd.append("resume", form.resume);

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
      setMessage("Application submitted successfully. Our team will get back to you.");
      setForm(initialState);
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
    <main className="careers-layout">
      <section className="careers-hero apply-hero">
        <div className="careers-hero-inner">
          <a className="back-home-link" href="/careers">
            ← Back to Careers
          </a>
          <p className="eyebrow">Application Form</p>
          <h1>Apply for Senior Data Engineer</h1>
          <p className="careers-summary">
            Complete the form below and our team will review your application.
          </p>
        </div>
      </section>

      <section className="section careers-page">
        <form className="application-form" onSubmit={onSubmit}>
          <h2>Contact Info</h2>
          <div className="form-grid">
            <label>
              Full Name
              <input
                required
                value={form.fullName}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, fullName: event.target.value }))
                }
              />
            </label>
            <label>
              Email Address
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, email: event.target.value }))
                }
              />
            </label>
            <label>
              Phone Number
              <input
                required
                value={form.phone}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, phone: event.target.value }))
                }
              />
            </label>
            <label>
              Current Location / City
              <input
                required
                value={form.location}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, location: event.target.value }))
                }
              />
            </label>
          </div>

          <h2>Credentials</h2>
          <div className="form-grid">
            <label>
              Resume / CV (File Upload)
              <input
                required
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, resume: event.target.files?.[0] ?? null }))
                }
              />
            </label>
            <label>
              LinkedIn Profile URL
              <input
                required
                type="url"
                value={form.linkedInUrl}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, linkedInUrl: event.target.value }))
                }
              />
            </label>
            <label className="full-width">
              Portfolio / GitHub / Personal Site URL
              <input
                type="url"
                value={form.portfolioUrl}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, portfolioUrl: event.target.value }))
                }
              />
            </label>
          </div>

          <h2>Role Specifics</h2>
          <div className="form-grid">
            <label>
              Position Applying For
              <input
                required
                value={form.position}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, position: event.target.value }))
                }
              />
            </label>
            <label>
              Years of Relevant Experience
              <input
                required
                value={form.yearsExperience}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, yearsExperience: event.target.value }))
                }
              />
            </label>
            <label>
              Earliest Available Start Date
              <input
                required
                type="date"
                value={form.startDate}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, startDate: event.target.value }))
                }
              />
            </label>
            <label>
              Salary Expectations
              <input
                required
                value={form.salaryExpectation}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, salaryExpectation: event.target.value }))
                }
              />
            </label>
          </div>

          <h2>Logistics</h2>
          <div className="form-grid">
            <label>
              Are you legally authorized to work in your country?
              <select
                required
                value={form.legalAuthorization}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, legalAuthorization: event.target.value }))
                }
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>
            <label>
              Will you now or in the future require visa sponsorship?
              <select
                required
                value={form.visaSponsorship}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, visaSponsorship: event.target.value }))
                }
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>
          </div>

          <button type="submit" className="btn primary submit-button" disabled={status === "submitting"}>
            {status === "submitting" ? "Submitting..." : "Submit application"}
          </button>
          {message ? <p className="submit-message">{message}</p> : null}
        </form>
      </section>
    </main>
  );
}

