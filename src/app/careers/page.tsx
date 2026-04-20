import { CareersRolePicker } from "@/components/CareersRolePicker";
import { CAREER_ROLES } from "@/lib/careers-data";

export default function CareersPage() {
  return (
    <main className="careers-layout">
      <section className="careers-hero">
        <div className="careers-hero-inner">
          <a className="back-home-link" href="/">
            ← Back to Home
          </a>
          <p className="eyebrow">Careers</p>
          <h1>Open roles at Eassy Onboard</h1>
          <p className="careers-summary">
            Explore current openings and choose a role to view the full job
            description and apply.
          </p>
          <div className="careers-tags">
            <span>Full-time</span>
            <span>Product + Data + AI</span>
          </div>
        </div>
      </section>

      <section className="section careers-page">
        <div className="careers-grid careers-grid-overview">
          <div className="careers-container">
            <h2>Choose your role</h2>
            <p>
              Select any role below to view the JD and submit your application.
            </p>
            <div className="open-roles-list">
              {CAREER_ROLES.map((role) => (
                <article key={role.slug} className="open-role-card">
                  <div className="open-role-head">
                    <h3>{role.title}</h3>
                  </div>
                  <p>{role.summary}</p>
                  <div className="open-role-actions">
                    <a className="btn ghost" href={`/careers/${role.slug}`}>
                      View JD
                    </a>
                    <a className="btn primary" href={`/careers/${role.slug}/apply`}>
                      Apply now
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="job-sidebar">
            <CareersRolePicker
              roles={CAREER_ROLES.map((role) => ({
                slug: role.slug,
                title: role.title,
              }))}
              defaultSlug={CAREER_ROLES[0].slug}
            />
            <div className="job-sidebar-card">
              <p className="job-sidebar-label">How to apply</p>
              <ul className="job-mini-list">
                <li>Select role from dropdown</li>
                <li>Read role-specific JD</li>
                <li>Submit details + resume</li>
                <li>Our team will review and contact shortlisted candidates</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

