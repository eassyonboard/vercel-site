"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Props = { configError: boolean };

export function LoginForm({ configError }: Props) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setStatus("error");
        setMessage(data.error || "Login failed");
        return;
      }
      router.push("/admin/applications");
      router.refresh();
    } catch {
      setStatus("error");
      setMessage("Network error");
    }
  }

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <h1 className="admin-login-title">Applications admin</h1>
        <p className="admin-login-hint">Sign in with the team password to review submissions.</p>
        {configError ? (
          <p className="admin-login-alert">
            Server is missing <code>AUTH_SECRET</code> (16+ characters). Set env vars and redeploy.
          </p>
        ) : null}
        <form className="admin-login-form" onSubmit={onSubmit}>
          <label className="admin-login-label">
            Password
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="admin-login-input"
            />
          </label>
          <button type="submit" className="btn primary admin-login-submit" disabled={status === "loading"}>
            {status === "loading" ? "Signing in…" : "Sign in"}
          </button>
          {message ? <p className="admin-login-error">{message}</p> : null}
        </form>
        <p className="admin-login-back">
          <a href="/">← Back to site</a>
        </p>
      </div>
    </main>
  );
}
