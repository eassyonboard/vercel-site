export default function HomePage() {
  return (
    <main className="page">
      <header className="hero">
        <div className="hero-content">
          <p className="eyebrow">EassyOnboard LLP</p>
          <h1>Onboarding made effortless for modern teams.</h1>
          <p className="lead">
            We help organizations design and automate delightful onboarding
            experiences, from paperwork to first-week productivity.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn primary">
              Talk to us
            </a>
            <a href="#services" className="btn ghost">
              Explore services
            </a>
          </div>
        </div>
        <div className="hero-media">
          <div className="hero-card">
            <p className="hero-card-title">AI-powered workflows</p>
            <p className="hero-card-body">
              Structure repeatable onboarding journeys that scale with every
              new hire.
            </p>
          </div>
        </div>
      </header>

      <section id="services" className="section">
        <h2>What we do</h2>
        <p className="section-intro">
          Partner with us to transform your onboarding into a strategic
          advantage.
        </p>
        <div className="grid">
          <article className="card">
            <h3>Onboarding strategy & design</h3>
            <p>
              Define clear journeys for different roles, with the right
              milestones, communications, and hand-offs.
            </p>
          </article>
          <article className="card">
            <h3>Process automation</h3>
            <p>
              Integrate your HR, IT, and collaboration tools so onboarding
              runs on autopilot.
            </p>
          </article>
          <article className="card">
            <h3>Analytics & insights</h3>
            <p>
              Track completion, satisfaction, and ramp-up speed with
              actionable dashboards.
            </p>
          </article>
        </div>
      </section>

      <section id="about" className="section muted">
        <div className="split">
          <div>
            <h2>About EassyOnboard LLP</h2>
            <p>
              We are a team of consultants and technologists focused
              exclusively on solving onboarding for growing companies. From
              startups to enterprises, we bring battle-tested playbooks and
              modern tooling.
            </p>
            <p>
              Our approach combines human-centered design with automation so
              every new hire feels welcomed, empowered, and productive from
              day one.
            </p>
          </div>
          <div className="info-panel">
            <p className="stat">
              <span>90%</span>+ completion rates for onboarding journeys
            </p>
            <p className="stat">
              <span>50%</span> faster time-to-productivity on average
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <h2>Let&apos;s get started</h2>
        <p className="section-intro">
          Tell us a bit about your team and we&apos;ll get back within one
          business day.
        </p>
        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="field-group">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" placeholder="Your name" />
          </div>
          <div className="field-group">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" placeholder="Company name" />
          </div>
          <div className="field-group">
            <label htmlFor="email">Work email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
            />
          </div>
          <div className="field-group full">
            <label htmlFor="message">How can we help?</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Share a bit about your current onboarding challenges."
            />
          </div>
          <button className="btn primary" type="submit">
            Submit
          </button>
        </form>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} EassyOnboard LLP. All rights reserved.</p>
      </footer>
    </main>
  );
}

