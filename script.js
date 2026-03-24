const app = document.getElementById("app");

const createSectionTitle = (tag, title, subtitle = "") => {
  return `
    <div class="section-head reveal">
      <span class="section-tag">${tag}</span>
      <h2>${title}</h2>
      ${subtitle ? `<p class="hero-sub">${subtitle}</p>` : ""}
    </div>
  `;
};

const toCards = (items, mapper) =>
  items
    .map((item) => `<article class="card reveal">${mapper(item)}</article>`)
    .join("");

const renderPage = (data) => {
  document.documentElement.style.setProperty("--primary", data.brand.primary);
  document.documentElement.style.setProperty("--secondary", data.brand.secondary);
  document.documentElement.style.setProperty("--accent", data.brand.accent);
  document.documentElement.style.setProperty("--dark", data.brand.dark);
  document.documentElement.style.setProperty("--light", data.brand.light);

  const heroImage = data.gallery.images[0];

  app.innerHTML = `
    <section id="home">
      <div class="container hero-grid">
        <div>
          <span class="section-tag reveal">${data.leader.designation}</span>
          <h1 class="hero-title reveal">${data.leader.name}</h1>
          <p class="hero-sub reveal">${data.leader.constituency}</p>
          <p class="hero-sub reveal"><strong>${data.leader.slogan}</strong></p>
          <p class="hero-sub reveal">${data.leader.bio}</p>
          <div class="hero-actions reveal">
            <a class="btn btn-primary" href="#contact">Connect Now</a>
            <a class="btn btn-outline" target="_blank" rel="noreferrer noopener" href="${data.social.instagram}">Instagram</a>
          </div>
          <div class="stats">
            ${data.heroStats
              .map(
                (stat) => `
                  <div class="stat reveal">
                    <strong>${stat.value}</strong>
                    <span>${stat.label}</span>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
        <div class="reveal">
          <img class="hero-photo" src="${heroImage}" alt="${data.leader.name}" />
        </div>
      </div>
    </section>

    <section id="about">
      <div class="container">
        ${createSectionTitle("About Leader", "Leadership Rooted in Public Service")}
        <div class="card reveal">
          <p>${data.leader.bio}</p>
        </div>
      </div>
    </section>

    <section id="vision">
      <div class="container">
        ${createSectionTitle("Vision & Mission", "Future-Ready Hinjewadi")}
        <div class="vision-layout">
          <article class="card reveal">
            <h3>Vision</h3>
            <p>${data.leader.vision}</p>
          </article>
          <article class="card reveal">
            <h3>Mission</h3>
            <p>${data.leader.mission}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="achievements">
      <div class="container">
        ${createSectionTitle("Achievements", "Work That Creates Local Impact")}
        <div class="cards-grid">
          ${toCards(
            data.achievements,
            (a) => `<h3>${a.title}</h3><p>${a.description}</p><p><strong>${a.year}</strong></p>`
          )}
        </div>
      </div>
    </section>

    <section id="schemes">
      <div class="container">
        ${createSectionTitle("Government Schemes", "Citizen-Centric Support Programs")}
        <div class="cards-grid">
          ${toCards(data.schemes, (s) => `<h3>${s.title}</h3><p>${s.description}</p>`)}
        </div>
      </div>
    </section>

    <section id="development">
      <div class="container">
        ${createSectionTitle("Constituency Development", "Ground-Level Progress Overview")}
        <div class="cards-grid">
          ${toCards(
            data.developmentWorks,
            (w) =>
              `<h3>${w.category}</h3><p>${w.description}</p><p><strong>Status:</strong> ${w.status}</p>`
          )}
        </div>
      </div>
    </section>

    <section id="media">
      <div class="container">
        ${createSectionTitle("Media & News", "Latest Public Highlights")}
        <div class="media-list">
          ${data.media
            .map(
              (item) => `
                <article class="list-item reveal">
                  <h3>${item.title}</h3>
                  <p>${item.source} | ${item.date}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>

    <section id="events">
      <div class="container">
        ${createSectionTitle("Events & Campaigns", "Meetings and Campaign Calendar")}
        <div class="event-list">
          ${data.events
            .map(
              (event) => `
                <article class="list-item reveal">
                  <h3>${event.title}</h3>
                  <p>${event.date}</p>
                  <p>${event.location}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>

    <section id="gallery">
      <div class="container">
        ${createSectionTitle("Gallery", "Work, Events, and Community Moments")}
        <div class="gallery-grid">
          ${data.gallery.images
            .map((imageSrc, i) => `<img class="reveal" src="${imageSrc}" alt="Gallery image ${i + 1}" />`)
            .join("")}
        </div>
        <div class="video-wrap reveal">
          <video controls muted playsinline>
            <source src="${data.gallery.video}" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>

    <section id="testimonials">
      <div class="container">
        ${createSectionTitle("Testimonials", "Voices from the Community")}
        <div class="cards-grid">
          ${toCards(
            data.testimonials,
            (testimonial) =>
              `<p>"${testimonial.quote}"</p><p><strong>${testimonial.name}</strong></p>`
          )}
        </div>
      </div>
    </section>

    <section id="contact">
      <div class="container">
        ${createSectionTitle("Contact & Connect", "Reach the Office")}
        <div class="contact-grid">
          <article class="contact-item reveal">
            <h3>Office Address</h3>
            <p>${data.contact.officeAddress}</p>
          </article>
          <article class="contact-item reveal">
            <h3>Contact Details</h3>
            <p><strong>Phone:</strong> ${data.contact.phone}</p>
            <p><strong>Email:</strong> ${data.contact.email}</p>
            <p><strong>Instagram:</strong> <a href="${data.social.instagram}" target="_blank" rel="noreferrer noopener">${data.social.instagram}</a></p>
          </article>
        </div>
      </div>
    </section>
  `;

  const footerText = document.getElementById("footerText");
  const instaLink = document.getElementById("instagramLink");
  footerText.textContent = `${new Date().getFullYear()} ${data.leader.name}. All rights reserved.`;
  instaLink.href = data.social.instagram;

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

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
};

fetch("data.json")
  .then((res) => res.json())
  .then(renderPage)
  .catch(() => {
    app.innerHTML = `
      <section>
        <div class="container">
          <h2>Unable to load website data.</h2>
          <p>Please make sure <strong>data.json</strong> is available in this folder.</p>
        </div>
      </section>
    `;
  });
