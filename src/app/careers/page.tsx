export default function CareersPage() {
  const responsibilities = [
    "Design and evolve scalable, distributed data infrastructure across cloud platforms including GCP and AWS.",
    "Build and maintain real-time and batch data processing pipelines supporting AI/ML workloads, consumer applications, and analytics.",
    "Develop and manage integrations with third-party e-commerce platforms to expand the data ecosystem.",
    "Ensure data availability, reliability, and quality through monitoring and automated auditing.",
    "Partner with engineering, AI, and product teams on data solutions for business-critical needs.",
    "Mentor and support data engineers, establishing best practices and code quality standards.",
  ];

  const mustHaves = [
    "Bachelor's degree in Computer Science or a related field, or equivalent practical experience.",
    "5+ years of software development and data engineering experience with ownership of production-grade data infrastructure.",
    "Deep expertise scaling Spark, PySpark, and SQL in production, including Databricks or DataProc on GCP.",
    "Strong understanding of distributed computing and modern data modeling for scalable systems.",
    "Proficient in Python with experience implementing software engineering best practices.",
    "Hands-on experience with both relational and NoSQL systems including MySQL, MongoDB, and Elasticsearch.",
    "Strong communicator with experience influencing cross-functional stakeholders.",
  ];

  const niceToHaves = [
    "Experience with job orchestration and containerization tools such as Airflow and Docker.",
    "Experience working with vector stores and knowledge graphs.",
    "Experience working in early-stage, high-growth environments.",
    "Familiarity with MLOps pipelines and integrating ML models into data workflows.",
    "A proactive, problem-solving mindset with a passion for innovative solutions.",
  ];

  return (
    <main className="careers-layout">
      <section className="careers-hero">
        <div className="careers-hero-inner">
          <a className="back-home-link" href="/">
            ← Back to Home
          </a>
          <p className="eyebrow">Careers</p>
          <h1>Senior Data Engineer</h1>
          <p className="careers-summary">
            Join Eassy Onboard to architect high-performance batch and real-time data
            systems, mentor engineers, and accelerate analytics and AI initiatives on
            modern cloud platforms.
          </p>
          <div className="careers-tags">
            <span>Full-time</span>
            <span>Senior level</span>
            <span>Spark / PySpark / SQL</span>
            <span>GCP / AWS</span>
          </div>
        </div>
      </section>

      <section className="section careers-page">
        <div className="careers-grid">
          <div className="careers-container">
            <h2>The Role</h2>
            <p>
              We are seeking a Senior Data Engineer with deep expertise in
              Spark/PySpark/SQL to join our data team. This is a hands-on technical role
              for someone passionate about building scalable data systems, mentoring
              engineers, and shaping data strategy.
            </p>
            <p>
              You will architect systems that power high-performance batch and real-time
              data processing, enable advanced analytics, and accelerate our AI
              initiatives.
            </p>

            <h2>Key Responsibilities</h2>
            <ul className="careers-list">
              {responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>You</h2>
            <ul className="careers-list">
              {mustHaves.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Nice to Have</h2>
            <ul className="careers-list">
              {niceToHaves.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <aside className="job-sidebar">
            <div className="job-sidebar-card">
              <p className="job-sidebar-label">Apply for this role</p>
              <h3>Senior Data Engineer</h3>
              <p>
                If you enjoy building robust data platforms and working close to AI and
                product teams, we would love to hear from you.
              </p>
              <a className="btn primary job-apply" href="/careers/apply">
                Apply now
              </a>
            </div>

            <div className="job-sidebar-card">
              <p className="job-sidebar-label">What you&apos;ll work on</p>
              <ul className="job-mini-list">
                <li>Databricks and distributed data processing</li>
                <li>AI and ML-ready pipelines</li>
                <li>Cloud-native architecture across GCP and AWS</li>
                <li>Mentorship and engineering standards</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

