import { notFound } from "next/navigation";
import { getCareerRole } from "@/lib/careers-data";

type PageProps = {
  params: { role: string };
};

export default function CareerRolePage({ params }: PageProps) {
  const role = getCareerRole(params.role);
  if (!role) notFound();

  return (
    <main className="careers-layout">
      <section className="careers-hero">
        <div className="careers-hero-inner">
          <a className="back-home-link" href="/careers">
            ← Back to Careers
          </a>
          <p className="eyebrow">Careers</p>
          <h1>{role.title}</h1>
          <p className="careers-summary">{role.summary}</p>
          <div className="careers-tags">
            {role.tags.map((tag) => (
              <span key={tag} className={tag.toLowerCase() === "remote" ? "tag-remote" : ""}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section careers-page">
        <div className="careers-grid">
          <div className="careers-container">
            <h2>The Role</h2>
            {role.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <h2>{role.roleSectionTitle}</h2>
            <ul className="careers-list">
              {role.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            {role.successLooksLike?.length ? (
              <>
                <h2>What Success Looks Like</h2>
                <ul className="careers-list">
                  {role.successLooksLike.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}

            <h2>{role.mustHavesTitle || "You"}</h2>
            <ul className="careers-list">
              {role.mustHaves.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            {role.niceToHaves?.length ? (
              <>
                <h2>Nice to Have</h2>
                <ul className="careers-list">
                  {role.niceToHaves.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          <aside className="job-sidebar">
            <div className="job-sidebar-card">
              <p className="job-sidebar-label">Apply for this role</p>
              <h3>{role.title}</h3>
              <p>
                Complete the role-specific application form with your details and supporting
                documents.
              </p>
              <a className="btn primary job-apply" href={`/careers/${role.slug}/apply`}>
                Apply now
              </a>
            </div>

            <div className="job-sidebar-card">
              <p className="job-sidebar-label">Location</p>
              <p className="remote-highlight">Remote</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
