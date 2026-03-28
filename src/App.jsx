import { useEffect, useState } from "react";
import { asArray, safeExternalUrl } from "./utils/safe";

const sectionTitle = (tag, title, subtitle) => (
  <div className="section-head reveal">
    <span className="section-tag">{tag}</span>
    <h2>{title}</h2>
    {subtitle ? <p className="section-sub">{subtitle}</p> : null}
  </div>
);

const ExternalLink = ({ href, children, className = "" }) => {
  const safeHref = safeExternalUrl(href);
  return (
    <a
      href={safeHref}
      className={className}
      target="_blank"
      rel="noopener noreferrer external nofollow"
    >
      {children}
    </a>
  );
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/data.json", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unable to load data.");
        }
        return res.json();
      })
      .then((payload) => {
        if (active) {
          setData(payload);
        }
      })
      .catch(() => {
        if (active) {
          setLoadError("Unable to load website data. Please verify public/data.json");
        }
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!data?.brand) {
      return;
    }
    const root = document.documentElement;
    root.style.setProperty("--primary", data.brand.primary);
    root.style.setProperty("--secondary", data.brand.secondary);
    root.style.setProperty("--accent", data.brand.accent);
    root.style.setProperty("--dark", data.brand.dark);
    root.style.setProperty("--light", data.brand.light);
  }, [data]);

  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [data]);

  if (loadError) {
    return (
      <main>
        <section>
          <div className="container">
            <h1>Data Error</h1>
            <p>{loadError}</p>
          </div>
        </section>
      </main>
    );
  }

  if (!data) {
    return (
      <main>
        <section>
          <div className="container">
            <h1>Loading website...</h1>
          </div>
        </section>
      </main>
    );
  }

  const images = asArray(data.gallery?.images);
  const heroImage = data.gallery?.heroImage || images[0];
  const stats = asArray(data.heroStats);
  const currentYear = new Date().getFullYear();
  const instagramUrl = safeExternalUrl(data.social?.instagram);

  return (
    <>
      <div className="bg-orb orb-one" aria-hidden="true" />
      <div className="bg-orb orb-two" aria-hidden="true" />

      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#home">
            {data.leader?.name}
          </a>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            Menu
          </button>
          <nav className={`nav ${menuOpen ? "open" : ""}`}>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>
            <a href="#vision" onClick={() => setMenuOpen(false)}>
              Vision
            </a>
            <a href="#achievements" onClick={() => setMenuOpen(false)}>
              Achievements
            </a>
            <a href="#schemes" onClick={() => setMenuOpen(false)}>
              Schemes
            </a>
            <a href="#gallery" onClick={() => setMenuOpen(false)}>
              Gallery
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section id="home">
          <div className="container hero-grid">
            <div>
              <span className="section-tag reveal">{data.leader?.designation}</span>
              <h1 className="hero-title reveal">{data.leader?.name}</h1>
              <p className="hero-sub reveal">{data.leader?.constituency}</p>
              <p className="hero-sub reveal">
                <strong>{data.leader?.slogan}</strong>
              </p>
              <p className="hero-sub reveal">{data.leader?.bio}</p>
              <div className="hero-actions reveal">
                <a className="btn btn-primary" href="#contact">
                  Connect Now
                </a>
                <ExternalLink href={instagramUrl} className="btn btn-outline">
                  Instagram
                </ExternalLink>
              </div>
              <div className="stats">
                {stats.map((item) => (
                  <article key={item.label} className="stat reveal">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </article>
                ))}
              </div>
            </div>
            <div className="reveal">
              <img className="hero-photo" src={heroImage} alt={data.leader?.name} loading="eager" />
            </div>
          </div>
        </section>

        <section id="about">
          <div className="container">
            {sectionTitle("About Leader", "Leadership Rooted in Public Service")}
            <article className="card reveal">
              <p>{data.leader?.bio}</p>
            </article>
          </div>
        </section>

        <section id="vision">
          <div className="container">
            {sectionTitle("Vision & Mission", "Future-Ready Hinjewadi")}
            <div className="two-col">
              <article className="card reveal">
                <h3>Vision</h3>
                <p>{data.leader?.vision}</p>
              </article>
              <article className="card reveal">
                <h3>Mission</h3>
                <p>{data.leader?.mission}</p>
              </article>
            </div>
          </div>
        </section>

        <section id="achievements">
          <div className="container">
            {sectionTitle("Achievements", "Work That Creates Local Impact")}
            <div className="cards-grid">
              {asArray(data.achievements).map((item) => (
                <article key={item.title} className="card reveal">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p className="meta-line">{item.year}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="schemes">
          <div className="container">
            {sectionTitle("Government Schemes", "Citizen-Centric Support Programs")}
            <div className="cards-grid">
              {asArray(data.schemes).map((item) => (
                <article key={item.title} className="card reveal">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="development">
          <div className="container">
            {sectionTitle("Constituency Development", "Ground-Level Progress Overview")}
            <div className="cards-grid">
              {asArray(data.developmentWorks).map((item) => (
                <article key={item.category} className="card reveal">
                  <h3>{item.category}</h3>
                  <p>{item.description}</p>
                  <p className="meta-line">Status: {item.status}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="media">
          <div className="container">
            {sectionTitle("Media & News", "Latest Public Highlights")}
            <div className="list-layout">
              {asArray(data.media).map((item) => (
                <article key={`${item.title}-${item.date}`} className="list-item reveal">
                  <h3>{item.title}</h3>
                  <p>
                    {item.source} | {item.date}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="events">
          <div className="container">
            {sectionTitle("Events & Campaigns", "Meetings and Campaign Calendar")}
            <div className="list-layout">
              {asArray(data.events).map((item) => (
                <article key={`${item.title}-${item.date}`} className="list-item reveal">
                  <h3>{item.title}</h3>
                  <p>{item.date}</p>
                  <p>{item.location}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery">
          <div className="container">
            {sectionTitle("Gallery", "Work, Events, and Community Moments")}
            <div className="gallery-grid">
              {images.map((src, i) => (
                <img key={`${src}-${i}`} src={src} alt={`Gallery ${i + 1}`} className="reveal" loading="lazy" />
              ))}
            </div>
            <div className="video-wrap reveal">
              <video controls preload="metadata" playsInline>
                <source src={data.gallery?.video} type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        <section id="testimonials">
          <div className="container">
            {sectionTitle("Testimonials", "Voices from the Community")}
            <div className="cards-grid">
              {asArray(data.testimonials).map((item) => (
                <article key={item.name} className="card reveal">
                  <p>"{item.quote}"</p>
                  <p className="meta-line">{item.name}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="container">
            {sectionTitle("Contact & Connect", "Reach the Office")}
            <div className="two-col">
              <article className="card reveal">
                <h3>Office Address</h3>
                <p>{data.contact?.officeAddress}</p>
              </article>
              <article className="card reveal">
                <h3>Contact Details</h3>
                <p>
                  <strong>Phone:</strong> {data.contact?.phone}
                </p>
                <p>
                  <strong>Email:</strong> {data.contact?.email}
                </p>
                <p>
                  <strong>Instagram:</strong> <ExternalLink href={instagramUrl}>{instagramUrl}</ExternalLink>
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <p>
            {currentYear} {data.leader?.name}. All rights reserved.
          </p>
          <ExternalLink href={instagramUrl}>Instagram</ExternalLink>
        </div>
      </footer>
    </>
  );
}
