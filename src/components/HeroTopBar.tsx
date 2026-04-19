export function HeroTopBar() {
  return (
    <div className="hero-topbar">
      <img
        src="/Logo-site-light.png"
        alt="Eassy Onboard LLP"
        className="site-logo"
      />
      <nav className="top-nav" aria-label="Primary">
        <a href="#services">Services</a>
        <a href="#why-us">Why Us</a>
        <a href="#about">About</a>
        <a href="#testimonials">Testimonials</a>
        <a href="#contact">Contact</a>
        <a href="/careers">Careers</a>
      </nav>
    </div>
  );
}
