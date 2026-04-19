import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/admin-api";
import { AdminLogoutButton } from "./AdminLogoutButton";

export default async function AdminApplicationsPage() {
  if (!(await isAdminRequest())) {
    redirect("/admin/login");
  }

  const applications = await prisma.jobApplication.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <main className="admin-apps-page">
      <header className="admin-apps-header">
        <div>
          <h1 className="admin-apps-title">Job applications</h1>
          <p className="admin-apps-sub">
            {applications.length} submission{applications.length === 1 ? "" : "s"} (newest first)
          </p>
        </div>
        <AdminLogoutButton />
      </header>

      <div className="admin-apps-table-wrap">
        <table className="admin-apps-table">
          <thead>
            <tr>
              <th>Submitted</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Resume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {applications.map((row) => (
              <tr key={row.id}>
                <td className="admin-apps-date">
                  {row.createdAt.toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td>{row.fullName}</td>
                <td>
                  <a href={`mailto:${row.email}`}>{row.email}</a>
                </td>
                <td>{row.position}</td>
                <td>
                  <a
                    className="admin-apps-download"
                    href={`/api/admin/applications/${row.id}/resume`}
                  >
                    {row.resumeFileName}
                  </a>
                  <span className="admin-apps-size">
                    {" "}
                    ({Math.round(row.resumeSizeBytes / 1024)} KB)
                  </span>
                </td>
                <td>
                  <Link className="admin-apps-view" href={`/admin/applications/${row.id}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {applications.length === 0 ? (
          <p className="admin-apps-empty">No applications yet.</p>
        ) : null}
      </div>
    </main>
  );
}
