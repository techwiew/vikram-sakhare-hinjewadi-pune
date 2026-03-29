import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
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

const riseVariant = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const popVariant = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const videoRef = useRef(null);

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

  const images = asArray(data?.gallery?.images);
  const heroImage = data?.gallery?.heroImage || images[0];
  const heroBannerImages = asArray(data?.heroBannerImages);
  const bannerImages = heroBannerImages.length > 0 ? heroBannerImages : images;
  const activeBannerImage = bannerImages[currentBannerIndex] || heroImage;
  const stats = asArray(data?.heroStats);
  const currentYear = new Date().getFullYear();
  const instagramUrl = safeExternalUrl(data?.social?.instagram);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!data) {
      return;
    }
    setCurrentBannerIndex(0);
  }, [data]);

  useEffect(() => {
    if (bannerImages.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [bannerImages]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.volume = 0.5;
          video.muted = false;
          const playPromise = video.play();
          if (playPromise?.catch) {
            playPromise.catch(() => {
              video.muted = true;
              video.play().catch(() => {});
            });
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [data]);

  useEffect(() => {
    const enableAudioOnInteraction = () => {
      const video = videoRef.current;
      if (!video) {
        return;
      }
      video.volume = 0.5;
      video.muted = false;
    };

    window.addEventListener("pointerdown", enableAudioOnInteraction, { once: true });
    window.addEventListener("keydown", enableAudioOnInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", enableAudioOnInteraction);
      window.removeEventListener("keydown", enableAudioOnInteraction);
    };
  }, []);

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

  return (
    <>
      <motion.div
        className="bg-orb orb-one"
        aria-hidden="true"
        animate={prefersReducedMotion ? undefined : { y: [0, -16, 0], scale: [1, 1.05, 1] }}
        transition={prefersReducedMotion ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="bg-orb orb-two"
        aria-hidden="true"
        animate={prefersReducedMotion ? undefined : { y: [0, 14, 0], scale: [1, 0.96, 1] }}
        transition={prefersReducedMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="bg-grid" aria-hidden="true" />

      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#home">
            <img
              className="brand-logo"
              src="/images/bjp-logo.png"
              alt="BJP logo"
              loading="eager"
            />
            <span>{data.leader?.name}</span>
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
          <motion.div
            className="container reveal"
            variants={riseVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="hero-banner-wrap">
              <motion.img
                key={currentBannerIndex}
                className="hero-banner"
                src={activeBannerImage}
                alt={`${data.leader?.name} banner ${currentBannerIndex + 1}`}
                loading="eager"
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.03 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <div className="hero-banner-overlay" aria-hidden="true" />
              {bannerImages.length > 1 ? (
                <div className="hero-banner-dots" aria-hidden="true">
                  {bannerImages.map((_, index) => (
                    <motion.span
                      key={`banner-dot-${index}`}
                      className={`hero-banner-dot ${index === currentBannerIndex ? "active" : ""}`}
                      animate={index === currentBannerIndex ? { scale: 1.06 } : { scale: 1 }}
                      transition={{ duration: 0.25 }}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </motion.div>
          <motion.div
            className="container hero-grid"
            variants={staggerVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={riseVariant}>
              <motion.h1 className="hero-title reveal" variants={riseVariant}>
                {data.leader?.name}
              </motion.h1>
              <motion.p className="hero-sub reveal" variants={riseVariant}>
                {data.leader?.constituency}
              </motion.p>
              <motion.p className="hero-sub reveal" variants={riseVariant}>
                <strong>{data.leader?.slogan}</strong>
              </motion.p>
              <motion.p className="hero-sub reveal" variants={riseVariant}>
                {data.leader?.bio}
              </motion.p>
              <motion.div className="hero-actions reveal" variants={riseVariant}>
                <a className="btn btn-primary" href="#contact">
                  Connect Now
                </a>
                <ExternalLink href={instagramUrl} className="btn btn-outline">
                  Instagram
                </ExternalLink>
              </motion.div>
              <motion.div className="stats" variants={staggerVariant}>
                {stats.map((item) => (
                  <motion.article key={item.label} className="stat reveal" variants={popVariant}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>
            <motion.div className="reveal" variants={riseVariant}>
              <motion.img
                className="hero-photo"
                src={heroImage}
                alt={data.leader?.name}
                loading="eager"
                initial={prefersReducedMotion ? false : { opacity: 0, x: 20, rotate: 1.3 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </section>

        <section id="about">
          <div className="container">
            {sectionTitle(
              "About Leader",
              "Leadership Rooted in Public Service",
            )}
            <article className="card reveal">
              <p>{data.leader?.bio}</p>
            </article>
          </div>
        </section>

        <section id="vision">
          <div className="container">
            {sectionTitle("Vision & Mission", "Future-Ready Hinjawad")}
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
                <motion.article
                  key={item.title}
                  className="card reveal"
                  variants={popVariant}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.18 }}
                >
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p className="meta-line">{item.year}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="schemes">
          <div className="container">
            {sectionTitle(
              "Government Schemes",
              "Citizen-Centric Support Programs",
            )}
            <div className="cards-grid">
              {asArray(data.schemes).map((item) => (
                <motion.article
                  key={item.title}
                  className="card reveal"
                  variants={popVariant}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.18 }}
                >
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="development">
          <div className="container">
            {sectionTitle(
              "Constituency Development",
              "Ground-Level Progress Overview",
            )}
            <div className="cards-grid">
              {asArray(data.developmentWorks).map((item) => (
                <motion.article
                  key={item.category}
                  className="card reveal"
                  variants={popVariant}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.18 }}
                >
                  <h3>{item.category}</h3>
                  <p>{item.description}</p>
                  <p className="meta-line">Status: {item.status}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery">
          <div className="container">
            {sectionTitle("Gallery", "Work, Events, and Community Moments")}
            <div className="gallery-grid">
              {images.map((src, i) => (
                <motion.img
                  key={`${src}-${i}`}
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="reveal"
                  loading="lazy"
                  variants={popVariant}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                />
              ))}
            </div>
            <div className="video-wrap reveal">
              <video
                ref={videoRef}
                controls
                preload="metadata"
                playsInline
                muted
              >
                <source src={data.gallery?.video} type="video/mp4" />
              </video>
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
                  <strong>Instagram:</strong>{" "}
                  <ExternalLink href={instagramUrl}>
                    {instagramUrl}
                  </ExternalLink>
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
