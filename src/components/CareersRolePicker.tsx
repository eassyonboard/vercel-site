"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type RoleOption = {
  slug: string;
  title: string;
};

type Props = {
  roles: RoleOption[];
  defaultSlug: string;
};

export function CareersRolePicker({ roles, defaultSlug }: Props) {
  const router = useRouter();
  const [slug, setSlug] = useState(defaultSlug);

  function viewRole() {
    router.push(`/careers/${slug}`);
  }

  return (
    <div className="role-picker-card">
      <p className="job-sidebar-label">Select a role</p>
      <div className="role-picker-row">
        <select value={slug} onChange={(event) => setSlug(event.target.value)}>
          {roles.map((role) => (
            <option key={role.slug} value={role.slug}>
              {role.title}
            </option>
          ))}
        </select>
        <button type="button" className="btn primary" onClick={viewRole}>
          View JD
        </button>
      </div>
    </div>
  );
}
