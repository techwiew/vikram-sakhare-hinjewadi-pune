Got it — you already have a **solid base prompt** (very powerful actually 💯), but now we need to **specialize it for a political leader website** + include **Hostinger deployment + sitemap + political-specific sections**.

I’ll rewrite your prompt so you can directly paste it into **Codex agent in VS Code** 👇

---

# 🚀 UPDATED PROMPT (POLITICAL LEADER WEBSITE)

Use this exact prompt:

---

You are a **senior full-stack developer, political campaign strategist, UI/UX designer, and SEO expert**.

Your task is to generate a **fully dynamic, production-ready political leader website** using:

* Next.js (App Router)
* TypeScript
* Tailwind CSS

The entire website must be controlled via a single `data.json` file.

---

## 🎯 CONTEXT

We are building a **personal website for a political leader**.

Reference websites:

* [https://www.devendrafadnavis.in/](https://www.devendrafadnavis.in/)
* [https://www.murlidharmohol.org/](https://www.murlidharmohol.org/)

The website should reflect:

* Trust
* Leadership
* Public service
* Authority
* Transparency

---

## ⚠️ CLARIFICATION PROTOCOL (MANDATORY)

Before generating code:

1. Ask for missing details:

   * Leader Name
   * Party Name
   * Constituency
   * Vision / Mission
   * Achievements
   * Contact Details
   * Social Links
   * Brand Colors
2. Do NOT assume anything.
3. Use placeholders ONLY if user अनुमति देता है.

---

## 🧠 CORE OBJECTIVE

1. Convert input into structured `data.json`
2. Make `data.json` = **single source of truth**
3. Build full website using ONLY JSON values

---

## 🧩 POLITICAL WEBSITE REQUIRED SECTIONS

Add these **must-have sections**:

### 1. Hero Section

* Leader image
* Name + designation
* Constituency
* Strong slogan

### 2. About Leader

* Biography
* Political journey
* Education
* Values

### 3. Vision & Mission

* Future plans
* Development goals

### 4. Achievements

* Government work
* Projects completed
* Impact stats

### 5. Constituency Development

* Roads, water, schools, healthcare
* Before/After highlights

### 6. Media & News

* Press coverage
* Latest updates

### 7. Events / Campaigns

* Rallies
* Public meetings

### 8. Gallery

* Images from work/events

### 9. Testimonials

* Public feedback

### 10. Contact & Connect

* Office address
* Phone
* Email
* WhatsApp
* Volunteer form

### 11. Social Media Integration

* Twitter/X
* Facebook
* Instagram
* YouTube

---

## 🗂️ `data.json` STRUCTURE (EXTENDED)

Include everything from base system  plus:

### Political Fields

* leader:

  * name
  * designation
  * party
  * constituency
  * slogan
  * biography
  * vision
  * mission

* achievements:

  * title
  * description
  * year

* developmentWorks:

  * category (roads, water, etc.)
  * description
  * status

* media:

  * title
  * source
  * date
  * link

* events:

  * title
  * date
  * location

---

## 🎨 DESIGN GUIDELINES

* Clean political UI
* Strong typography
* Use **tricolor / party colors**
* Hero must look powerful
* Mobile-first design

---

## ⚙️ TECH STACK RULES

* Next.js App Router
* TypeScript
* Tailwind CSS
* Framer Motion (optional via flag)

---

## 🔒 STRICT RULES

* NO hardcoding
* EVERYTHING from `data.json`
* Images must come from JSON asset system
* Sections controlled via visibility flag

---

## 🔍 SEO REQUIREMENTS (IMPORTANT)

* Political SEO keywords:

  * "MLA in [city]"
  * "Leader in [constituency]"
* Generate:

  * meta tags
  * OpenGraph
  * Twitter meta
  * JSON-LD (Person + PoliticalCandidate)

---

## 📄 REQUIRED FILES

Generate:

### 1. sitemap.xml

Include:

* Home
* About
* Achievements
* Contact
* Media

### 2. robots.txt

### 3. favicon

---

## 🚀 HOSTINGER DEPLOYMENT (MANDATORY)

Prepare project for Hostinger:

### Option 1: Static Export

* next.config.js:

  * output: "export"

### Option 2: Node Hosting

Include:

* build scripts
* start scripts

### Include:

* `.env.example`
* deployment steps:

  * upload to Hostinger
  * build command
  * start command

---

## 📦 OUTPUT REQUIRED

1. Complete `data.json`
2. Full Next.js codebase
3. Tailwind config from JSON
4. sitemap.xml + robots.txt
5. All pages:

   * Home
   * About
   * Achievements
   * Contact
6. Deployment guide for Hostinger

---

## 🧠 FINAL GOAL

Create a **reusable political website engine** where:

👉 Only changing `data.json` creates a new leader website

---

# 💡 Pro Tip (important)

When you paste this in Codex, add **your first leader details** like:

> "Create website for BJP MLA from Pune with 10+ years experience..."

---

If you want next level 🔥
I can also:

* Create **ready `data.json` for Pune corporator**
* Design **UI layout (Figma-style breakdown)**
* Give **real pitch you can use with politicians**

Just tell me 👍
