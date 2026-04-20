import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/admin-api";

type PageProps = { params: { id: string } };

export default async function AdminApplicationDetailPage({ params }: PageProps) {
  if (!(await isAdminRequest())) {
    redirect("/admin/login");
  }

  const app = await prisma.jobApplication.findUnique({
    where: { id: params.id },
  });

  if (!app) {
    notFound();
  }

  return (
    <main className="admin-detail-page">
      <p className="admin-detail-back">
        <Link href="/admin/applications">← All applications</Link>
      </p>
      <header className="admin-detail-header">
        <h1 className="admin-detail-title">{app.fullName}</h1>
        <p className="admin-detail-meta">
          Applied{" "}
          {app.createdAt.toLocaleString(undefined, {
            dateStyle: "full",
            timeStyle: "short",
          })}
        </p>
        <a
          className="btn primary admin-detail-resume"
          href={`/api/admin/applications/${app.id}/resume`}
        >
          Download resume ({app.resumeFileName})
        </a>
        {app.otherDocumentFileName ? (
          <a
            className="btn ghost admin-detail-resume secondary-resume-btn"
            href={`/api/admin/applications/${app.id}/other-document`}
          >
            Download supporting doc ({app.otherDocumentFileName})
          </a>
        ) : null}
      </header>

      <dl className="admin-detail-grid">
        <div>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${app.email}`}>{app.email}</a>
          </dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>{app.phone}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{app.location}</dd>
        </div>
        <div>
          <dt>LinkedIn</dt>
          <dd>
            <a href={app.linkedInUrl} target="_blank" rel="noreferrer">
              {app.linkedInUrl}
            </a>
          </dd>
        </div>
        <div className="admin-detail-span">
          <dt>Portfolio / other URL</dt>
          <dd>
            {app.portfolioUrl ? (
              <a href={app.portfolioUrl} target="_blank" rel="noreferrer">
                {app.portfolioUrl}
              </a>
            ) : (
              "—"
            )}
          </dd>
        </div>
        <div>
          <dt>Position</dt>
          <dd>{app.position}</dd>
        </div>
        <div>
          <dt>Role Slug</dt>
          <dd>{app.roleSlug || "—"}</dd>
        </div>
        <div>
          <dt>Years of experience</dt>
          <dd>{app.experienceBand || app.yearsExperience}</dd>
        </div>
        <div>
          <dt>Current CTC</dt>
          <dd>{app.currentCtc || "—"}</dd>
        </div>
        <div>
          <dt>Expected CTC</dt>
          <dd>{app.expectedCtc || app.salaryExpectation || "—"}</dd>
        </div>
        <div>
          <dt>Notice period</dt>
          <dd>{app.noticePeriod || app.startDate || "—"}</dd>
        </div>
        <div>
          <dt>Authorized to work</dt>
          <dd>{app.legalAuthorization || "—"}</dd>
        </div>
        <div>
          <dt>Visa sponsorship</dt>
          <dd>{app.visaSponsorship || "—"}</dd>
        </div>
      </dl>
    </main>
  );
}
