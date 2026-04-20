import { HeroTopBar } from "@/components/HeroTopBar";

export default function HomePage() {
  const services = [
    {
      title: "Automated Data Workflow Orchestration",
      image: "/service-1.png",
      description:
        "We design and implement automated workflows in Databricks to remove manual steps, boost efficiency, and ensure reliable, consistent data operations — freeing your team to focus on high-value tasks.",
    },
    {
      title: "Cost & Resource Optimization",
      image: "/service-3.png",
      description:
        "We help you maximize value from Databricks through proven cloud management practices. Lower costs, better resource utilization, and improved operational efficiency — all without sacrificing performance.",
    },
    {
      title: "Scalable Data Architecture",
      image: "/service-2.png",
      description:
        "We build secure, future-ready data architectures in Databricks that handle both structured and unstructured data. Scalable performance, robust reliability, and strong data trust are built in.",
    },
    {
      title: "AI Agents for Enterprise Workflows",
      image: "/service-4.png",
      description:
        "Design and deploy Agentic AI systems with guardrails, evaluation, and orchestration so business teams can automate decision-heavy workflows with confidence.",
    },
    {
      title: "RAG and Knowledge Intelligence",
      image: "/service-4.png",
      description:
        "Build production-ready Retrieval-Augmented Generation pipelines using governed enterprise data, vector search, and observability for trusted AI responses.",
    },
    {
      title: "EOR Portal and Global Hiring Enablement",
      image: "/service-1.png",
      description:
        "Enable foreign companies to hire and manage Indian talent through our EOR model covering payroll, compliance, taxation, and statutory operations end-to-end.",
    },
  ];

  const differentiators = [
    "Databricks-focused delivery with deep Spark, PySpark, and SQL expertise",
    "Cloud-ready data platforms built for GCP, AWS, and AI-first workloads",
    "Integrated EOR services to scale teams in India without payroll and compliance friction",
  ];

  const metrics = [
    { value: "50%", label: "faster development in a client migration program" },
    { value: "60%", label: "improvement in major transformation query processing" },
    { value: "20%", label: "cost reduction achieved in Databricks migration work" },
  ];

  return (
    <main className="page">
      <header className="hero">
        <div className="hero-overlay">
          <HeroTopBar />
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Enterprise Data & AI Solutions</p>
              <h1 className="hero-title">
                Build enterprise-grade Databricks platforms that power analytics, AI,
                and scale.
              </h1>
              <p className="lead">
                At Eassy Onboard, we help global teams design world-class data
                architectures on Databricks and drive business value through
                customized AI solutions.
              </p>
              <div className="hero-actions">
                <a href="#contact" className="btn primary">
                  Contact us
                </a>
                <a href="/careers" className="btn ghost">
                  View careers
                </a>
              </div>
            </div>

            <aside className="hero-panel">
              <img
                src="/databricks-white-copy.png"
                alt="Databricks Partner"
                className="partner-logo"
              />
              <p className="hero-panel-copy">
                Spark-native engineering, scalable data systems, and AI-ready
                architecture for modern product and platform teams.
              </p>
              <div className="metric-stack">
                {metrics.map((metric) => (
                  <div key={metric.value} className="metric-card">
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </header>

      <section id="services" className="section">
        <h2>Our Services</h2>
        <p className="section-intro">
          Transform your data journey with solutions that deliver clarity,
          performance, and sustainable growth.
        </p>
        <div className="grid">
          {services.map((service) => (
            <article className="card" key={service.title}>
              <img src={service.image} alt={service.title} className="service-icon" />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="why-us" className="section section-alt">
        <div className="section-heading">
          <p className="section-kicker">Why Eassy Onboard</p>
          <h2>From platform implementation to measurable business outcomes</h2>
        </div>
        <div className="value-grid">
          {differentiators.map((item, index) => (
            <article className="value-card" key={item}>
              <span className="value-badge">{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="section">
        <div className="split">
          <div className="content-card">
            <h2>About us</h2>
            <p>
              We are a team of Databricks Certified Data Engineers dedicated to
              empowering businesses and talent in the data-driven world. Our
              expertise spans across designing automated workflows, scalable
              architectures, optimized pipelines, and performance-tuned
              Databricks environments.
            </p>
            <p>
              Beyond enterprise solutions, we are committed to upskilling
              Indian talent through industry-aligned training, mentorship, and
              hands-on project experience.
            </p>
            <a href="/careers" className="text-link">
              Explore careers
            </a>
          </div>
          <img src="/about-team.png" alt="About Eassy Onboard team" className="about-image" />
        </div>
      </section>

      <section id="testimonials" className="section muted">
        <div className="section-heading">
          <p className="section-kicker">Customer Success</p>
          <h2>Client Testimonials</h2>
        </div>
        <div className="grid">
          <article className="card">
            <img src="/nikhil-jain.png" alt="Nikhil Jain" className="testimonial-logo" />
            <p>
              Eassy Onboard did not just help us migrate, they helped us evolve.
              They untangled legacy data complexities, optimized ETL pipelines,
              and introduced Python-based solutions for real-time geospatial
              data.
            </p>
            <p className="person">Nikhil Jain — Founder, Apnakhana</p>
          </article>
          <article className="card">
            <img
              src="/the-arena-group.jpg"
              alt="The Arena Group"
              className="testimonial-logo"
            />
            <p>
              Their team has demonstrated deep technical expertise and
              executional excellence across Databricks, GCP, and APIs, and
              helped advance our Agentic AI use cases with fine-tuned models.
            </p>
            <p className="person">
              Deeptanshu Kumar — Vice President, Data Engineering Arena Group
            </p>
          </article>
          <article className="card">
            <img
              src="/tomato-games.png"
              alt="Tomato Games"
              className="testimonial-logo"
            />
            <p>
              Eassy Onboard played a crucial role in our Databricks migration.
              Development time improved by nearly 50%, major query processing by
              about 60%, and costs reduced around 20%.
            </p>
            <p className="person">Mitesh Savaliya — CEO, Tomato Games</p>
          </article>
        </div>
      </section>

      <section id="contact" className="site-bottom-strip" aria-labelledby="bottom-contact-heading">
        <h2 id="bottom-contact-heading" className="visually-hidden">
          Contact
        </h2>
        <div className="bottom-strip-columns">
          <div className="bottom-strip-col">
            <h3 className="bottom-strip-heading">Connect</h3>
            <p className="bottom-strip-lead">
              Let&apos;s build your next data platform with confidence.
            </p>
            <div className="connect-channels" role="group" aria-label="Contact channels">
              <a
                href="https://www.linkedin.com/company/eassyonboardllp/?viewAsMember=true"
                target="_blank"
                rel="noreferrer"
                className="connect-channel-link"
                aria-label="Eassy Onboard on LinkedIn"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.94 8.5a1.56 1.56 0 1 1 0-3.12 1.56 1.56 0 0 1 0 3.12zM5.6 18.4h2.67V9.58H5.6V18.4zM10.03 9.58h2.56v1.2h.04c.36-.67 1.22-1.38 2.5-1.38 2.67 0 3.17 1.76 3.17 4.04v4.96h-2.67V14c0-1.06-.02-2.43-1.48-2.43-1.49 0-1.72 1.16-1.72 2.36v4.47h-2.67V9.58z" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                href="mailto:admin@eassyonboard.com?subject=Inquiry%20from%20Eassy%20Onboard%20website"
                className="connect-channel-link"
                aria-label="Email admin@eassyonboard.com"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25V6.75zm2.3-.25L12 11.14l6.7-4.64H5.3zm13.2 2.01-6.06 4.2a.75.75 0 0 1-.88 0L5.5 8.5v8.75c0 .25.2.45.45.45h12.1c.25 0 .45-.2.45-.45V8.5z" />
                </svg>
                <span>Email</span>
              </a>
            </div>
          </div>
          <div className="bottom-strip-col">
            <h3 className="bottom-strip-heading">Have a question?</h3>
            <p className="connect-query-text">
              Ask us about Databricks delivery, data architecture, or AI on your
              enterprise data — whether you&apos;re scoping a migration, a new pipeline,
              or a proof of concept. We&apos;ll get back to you with a thoughtful reply.
            </p>
            <a
              className="connect-query-cta"
              href="mailto:admin@eassyonboard.com?subject=New%20project%20discussion"
            >
              Send us a message
            </a>
          </div>
          <div className="bottom-strip-col">
            <h3 className="bottom-strip-heading">Headquarters</h3>
            <p className="bottom-strip-text">
              Plot No 37, Kanteshver Society, Katargam, Surat, Gujarat 395004, India
            </p>
          </div>
        </div>
      </section>

      <footer className="footer footer-site">
        <div className="footer-brand-block">
          <img
            src="/Logo-site-light.png"
            alt="Eassy Onboard LLP"
            className="footer-logo-single"
          />
          <p className="footer-brand-name">Eassy Onboard LLP</p>
          <p className="footer-brand-address">
            Plot No 37, Kanteshver Society, Katargam, Surat, Gujarat 395004, IN
          </p>
          <p className="footer-copyright">
            © {new Date().getFullYear()} Eassy Onboard LLP. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

