<div align="center">

  # 💧 AQUASHIFT — Premium Doorstep Car Care

  **Official Web Repository for [theaquashift.in](https://www.theaquashift.in/)**  
  *Operated by WHS Auto Solution Private Limited — Calicut (Kozhikode), Kerala, India*

  [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
  [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
  [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  [![WhatsApp](https://img.shields.io/badge/WhatsApp_Booking-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/919995566866?text=Hi%20Aquashift%2C%20I%27d%20like%20to%20book%20a%20doorstep%20car%20wash)
  [![Status](https://img.shields.io/badge/Status-Active_Production-054AAB?style=for-the-badge)](#)

  <br />

  <a href="https://www.theaquashift.in/"><strong>Explore the Live Website »</strong></a>

  <br />
  <br />
</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Services & Pricing Overview](#-services--pricing-overview)
- [Getting Started (Running Locally)](#-getting-started-running-locally)
- [Repository Structure](#-repository-structure)
- [SEO & Legal Compliance](#-seo--legal-compliance)
- [Deployment](#-deployment)
- [Business Information](#-business-information)
- [License](#-license)

---

## 🚘 Overview

**AQUASHIFT** provides professional, doorstep car wash and car care services delivered right to the customer's home or office across Calicut (Kozhikode). 

This repository contains the complete production static codebase designed for lightning-fast mobile load times, modern water/shine visual aesthetics, and an effortless 1-tap WhatsApp booking workflow.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 📱 **Mobile-First Responsive Design** | Custom CSS layout tested across 375px mobile, tablet, and desktop breakpoints. |
| 💬 **WhatsApp Booking Engine** | Instant link generation (`wa.me/919995566866`) with pre-filled service selection and details. |
| 🎥 **Cinematic Video Hero** | Auto-playing background video with scrim overlays and fallback for reduced-motion preferences. |
| ⚡ **Dynamic Icon Sprite Engine** | Asynchronous loading of runtime SVG `<symbol>` sprite (`assets/icons.svg`). |
| 🏷️ **Transparent Pricing & Plans** | 5 core wash package tiers + 4 recurring monthly subscription plans. |
| 📜 **Legal Compliance** | Fully written Privacy Policy, Terms & Conditions, and Refund Policy pages. |
| 🚀 **Zero Dependencies** | Pure native HTML5, CSS3, and ES6 JavaScript — zero npm dependencies or framework overhead. |

---

## 🛠️ Tech Stack

- **Markup:** HTML5 (Semantic elements, accessibility attributes)
- **Styling:** CSS3 (Vanilla CSS Variables, CSS Grid, Flexbox, smooth transitions)
- **Scripting:** Vanilla JavaScript (ES6+ IIFE modules)
- **Icons:** Custom inline SVG `<symbol>` sprite
- **Typography:** `Sora` (Headings) and `Manrope` (Body) via Google Fonts

---

## 🏷️ Services & Pricing Overview

| Package Tier | Hatchback | Mid-size SUV | Full-size SUV | Key Services |
| :--- | :---: | :---: | :---: | :--- |
| **Aqua Rapid Wash** | ₹299 | ₹399 | ₹499 | Foam wash, hand dry, tyre dressing, glass clean |
| **Aqua Essential Wash** | ₹499 | ₹699 | ₹799 | Rapid wash + interior vacuum, trunk vacuum, underbody wash |
| **Aqua Premium Wash** | ₹899 | ₹999 | ₹1,199 | Essential wash + door pad polish, interior steam, air freshener |
| **Aqua Diamond Wash** | ₹1,499 | ₹1,699 | ₹1,999 | Premium wash + A/C vent steam, upholstery clean, ceramic hand wax |
| **Aqua Signature Wash** | ₹3,799 | ₹3,999 | ₹4,299 | Diamond wash + engine steam clean, roof clean, full ceramic coat |

---

## 🚀 Getting Started (Running Locally)

Because the site dynamically fetches `assets/icons.svg` at runtime using JavaScript `fetch()`, web browsers restrict this under `file://` protocol. **A local HTTP server is required for full icon rendering.**

### 1️⃣ Option A: Using Python (Built-in)

Navigate into the repository directory and run:

```bash
cd aquashift-website
python -m http.server 8080
```

Open your browser and navigate to:  
👉 **`http://localhost:8080/`**

---

### 2️⃣ Option B: Using Node.js (`npx serve`)

```bash
cd aquashift-website
npx serve .
```

Open your browser at the local port displayed in your terminal (e.g., `http://localhost:3000/`).

---

## 📁 Repository Structure

```
aquashift-website/
├── index.html                  # Main single-page landing page & anchor sections
├── services.html               # Comprehensive service catalog & itemized pricing
├── privacy-policy.html         # Legal Privacy Policy page
├── terms-and-conditions.html   # Legal Terms & Conditions page
├── refund-policy.html          # Legal Refund & Cancellation Policy page
├── sitemap.xml                 # XML Sitemap for search engines
├── robots.txt                  # Crawl directives pointing to sitemap.xml
├── CLAUDE.md                   # Brand guidelines, color tokens & design specs
├── PROJECT-DOCUMENTATION.md    # Developer reference & file linkage architecture
├── README.md                   # Project GitHub documentation
│
├── css/
│   ├── tokens.css              # Design tokens (colors, fluid font scale, spacing, shadows)
│   ├── styles.css              # Layout & section-by-section component styling
│   └── animations.css          # Scroll-reveal transitions & keyframe rules
│
├── js/
│   ├── main.js                 # UI logic: SVG sprite loader, sticky nav, drawer, FAQ accordion
│   └── form.js                 # Client-side validation & WhatsApp submission handler
│
└── assets/
    ├── icons.svg               # SVG <symbol> icon sprite (~22 vector icons)
    ├── favicon.svg / .ico      # Multi-format favicon assets
    ├── logo*.svg / .png        # Official AQUASHIFT brand logo assets
    ├── images/                 # Optimized gallery photos (JPG & WebP)
    └── video/                  # Hero background cinematic video (MP4 & WebM)
```

---

## 🌐 SEO & Legal Compliance

- **Schema.org:** Embedded `LocalBusiness` JSON-LD structured data for Google Search rich results.
- **OpenGraph & Twitter Cards:** Configured meta tags for rich link previews when sharing on social media or messaging platforms.
- **Legal Alignment:** Standalone legal pages written for **WHS Auto Solution Private Limited**.

---

## 📦 Deployment

This repository is 100% static and requires **no build step**. Deploy directly to any static web host:

- **GitHub Pages:** Enable GitHub Pages in repository settings pointing to the `main` branch.
- **Cloudflare Pages / Vercel / Netlify:** Import repository `supportaquashift/aquashift-website` with output directory `/` and no build command.

---

## 📞 Business & Contact Information

- **Brand Name:** AQUASHIFT
- **Legal Entity:** WHS Auto Solution Private Limited
- **Phone:** [+91 99955 66866](tel:+919995566866)
- **Email:** supportaquashift.in@gmail.com
- **WhatsApp:** [Book Service on WhatsApp](https://wa.me/919995566866)
- **Instagram:** [@aquashift_care](https://instagram.com/aquashift_care)
- **Service Location:** Calicut (Kozhikode), Kerala, India
- **Official Domain:** [theaquashift.in](https://www.theaquashift.in)

---

<div align="center">
  <sub>© 2026 WHS Auto Solution Private Limited. All rights reserved.</sub>
</div>
