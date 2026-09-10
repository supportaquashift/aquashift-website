# CLAUDE.md — AQUASHIFT Website Build Instructions

> Copy this entire file into your project root as `CLAUDE.md` (or paste it directly into a Claude / Claude Code chat) before asking Claude to build the site. It gives Claude everything it needs — brand identity, color system, content, structure, and tone — to produce a stunning, professional, on-brand website in one pass.

---

## 1. Project Overview

Build a modern, premium, mobile-first marketing website for **AQUASHIFT**, a doorstep car wash and car care service brand.

- **Legal entity:** WHS Auto Solution Private Limited
- **Brand name:** AQUASHIFT
- **Service:** Doorstep (at-home / at-office) car wash and car care services
- **Location / service area:** Calicut (Kozhikode), Kerala, India
- **Domain:** theaquashift.in
- **Positioning:** Convenient, trustworthy, high-quality car care that comes to the customer — no need to drive to a garage or wait in line. Premium but approachable, tech-enabled, water-and-shine themed.

The site should feel **clean, trustworthy, fast, and premium** — think "Apple-level polish meets a local water/auto-care brand." Avoid generic stock-template look. Use lots of whitespace, confident typography, subtle motion, and real service-oriented content (not lorem ipsum).

---

## 2. Core Requirements (non-negotiable)

These six requirements must all be satisfied in the final build:

1. **Custom design — not a template.** Do not use an off-the-shelf template look (no generic Bootstrap-starter or stock SaaS-landing-page feel). Every section should be laid out intentionally around the Aquashift water/wave motif, brand colors, and real content. Avoid clichés like a centered hero + 3 generic icon cards + copy-paste footer with no brand personality. Custom illustrations/shapes (waves, droplets, glossy car silhouette) should be built with CSS/SVG specifically for this brand, not pulled from a generic UI kit.
2. **Mobile responsive.** Fully responsive across phones, tablets, and desktops (test at 375px, 768px, 1024px, 1440px). Since most local customers will book from a phone, the mobile experience (nav, tap targets, WhatsApp/call buttons, forms) must be flawless — not just "doesn't break."
3. **WhatsApp booking integration.** A working `https://wa.me/919995566866` link (pre-filled with a friendly default message, e.g. `?text=Hi%20Aquashift%2C%20I%27d%20like%20to%20book%20a%20doorstep%20car%20wash`) must be reachable from: the header, the hero, a floating sticky WhatsApp button (mobile especially), the final CTA banner, and the footer.
4. **SEO-friendly pages.** Every page/section needs: descriptive `<title>` and meta description targeting "doorstep car wash Calicut," "car care Kozhikode," etc.; semantic heading hierarchy (one H1, logical H2/H3); descriptive alt text on all images; Open Graph + Twitter Card tags; a favicon; clean crawlable URLs; `LocalBusiness` JSON-LD structured data using the contact/address info in this doc; a `sitemap.xml` and `robots.txt`.
5. **Legal pages.** Include the following as real, linked pages (not placeholders left blank), written specifically for WHS Auto Solution Private Limited / Aquashift's doorstep car wash service:
   - **Privacy Policy** — what data is collected (name, phone, address/location, booking details), how it's used, whether it's shared with third parties, cookie usage if any, contact for data queries (supportaquashift.in@gmail.com).
   - **Terms & Conditions** — service booking terms, cancellation/rescheduling policy, liability for vehicle condition, payment terms, service guarantees/limitations.
   - **Refund / Cancellation Policy** — clear rules on cancellations, no-shows, and refunds for prepaid plans (if applicable).
     Link all three in the footer. Use clearly-marked placeholder clauses only where business-specific policy details (e.g. exact refund window) haven't been provided, and flag them as `[CONFIRM WITH OWNER]` rather than inventing definitive legal terms.
6. **Contact form.** A working contact/booking form (separate from the WhatsApp CTA) with fields: Name, Phone Number, Location/Address, Service Needed (dropdown: Exterior Wash, Interior Cleaning, Foam Wash, Wax & Polish, Membership Plan, Other), Preferred Date/Time, Message (optional). Include client-side validation (required fields, phone format). Note in the code/comments that backend wiring (e.g. email delivery via a form service, or an API endpoint) needs to be connected — don't silently fake a successful submission with no real handler; use a clearly commented placeholder submit handler (e.g. `// TODO: connect to form backend / email service`) and a genuine success/error UI state.

---

## 3. Brand Colors (extracted from official logo)

The logo uses a deep navy-to-blue palette evoking water, cleanliness, and trust. Use this exact palette — do not substitute generic "car wash blue."

| Role                 | Color Name     | Hex       | RGB            | Usage                                                       |
| -------------------- | -------------- | --------- | -------------- | ----------------------------------------------------------- |
| Primary / Brand Blue | Aquashift Blue | `#054AAB` | 5, 74, 171     | Primary buttons, links, key accents, icons                  |
| Deep Navy            | Aquashift Navy | `#01142F` | 1, 20, 47      | Headlines, dark sections, footer, nav background            |
| Rich Black           | Ink            | `#01040B` | 1, 4, 11       | Body text on light backgrounds (near-black, not pure black) |
| Secondary Blue       | Ocean Blue     | `#014498` | 1, 68, 152     | Gradients, hover states, secondary accents                  |
| Mid Accent           | Sky Steel      | `#5C89C8` | 92, 137, 200   | Secondary buttons, badges, chart/graphic accents            |
| Light Tint           | Pale Wash      | `#E8F0FB` | ~223, 232, 244 | Section backgrounds, cards, subtle dividers                 |
| Neutral Grey         | Slate          | `#59667A` | 89, 102, 119   | Secondary text, captions, muted UI                          |
| White                | Pure White     | `#FFFFFF` | 255, 255, 255  | Backgrounds, negative space, text on dark                   |

**Suggested gradient:** `linear-gradient(135deg, #054AAB 0%, #01142F 100%)` — use for hero backgrounds, CTA sections, and the water-drop/wave motifs.

**Design motif cues:** water droplet, wave/ripple curves, glossy/reflective surfaces (like a freshly washed car), subtle diagonal shine streaks. Use rounded corners (12–20px), soft shadows, and glassmorphism sparingly on cards over the navy gradient.

---

## 4. Typography

- **Headings:** A strong, modern geometric sans-serif — e.g. `Poppins`, `Outfit`, or `Sora` (Google Fonts). Bold weight (600–800) for headlines.
- **Body:** Clean, highly legible sans-serif — e.g. `Inter` or `Manrope`. Regular/Medium weight.
- Maintain a clear type scale (e.g. H1 48–64px desktop / 32–40px mobile, H2 32–40px, body 16–18px).
- Generous line-height (1.5–1.7 for body) and letter-spacing on all-caps labels (e.g. "AQUASHIFT" wordmark, section eyebrows).

---

## 5. Company & Contact Information

Use this exact information throughout the site (header, footer, contact page, schema markup):

- **Brand name:** AQUASHIFT
- **Legal name (footer/legal only):** WHS Auto Solution Private Limited
- **Phone:** +91 99955 66866 (make tappable `tel:` link)
- **Email:** supportaquashift.in@gmail.com (make tappable `mailto:` link)
- **WhatsApp booking:** +91 99955 66866 → `https://wa.me/919995566866` (use as primary CTA link; update if a separate WhatsApp business number is provided later)
- **Instagram:** link to AQUASHIFT's official Instagram profile (placeholder: `https://instagram.com/aquashift` — replace with real handle before launch)
- **Service area:** Calicut / Kozhikode, Kerala, India
- **Domain:** theaquashift.in

> **Note to Claude building the site:** Instagram URL and final WhatsApp number are placeholders — insert real links once provided; do not fabricate follower counts, reviews, or testimonials.

---

## 6. Site Structure / Pages

Build as a single well-organized page (with anchor navigation) OR a small multi-page site — recommend **single-page site with smooth-scroll sections** for a local service business, since it converts better and is simpler to maintain. Sections in order:

1. **Header / Navigation** — Logo, links (Home, Services, How It Works, Pricing, Gallery, Contact), sticky on scroll, prominent "Book on WhatsApp" button.
2. **Hero Section** — Bold headline (e.g. "Your Car, Freshly Washed — At Your Doorstep"), subheadline about convenience, primary CTA ("Book via WhatsApp") + secondary CTA ("Call Now"), hero image/graphic of a car being washed with water droplet motif, trust badges (e.g. "Doorstep Service", "Eco-friendly", "Trained Professionals").
3. **Trust Bar** — Small strip with quick trust indicators: service area, contact number, hours, "100% satisfaction" style badges.
4. **Services Section** — Grid/cards of services offered. Suggested service list (Claude: refine/expand naturally, keep realistic for a doorstep car care brand):
   - Exterior Car Wash
   - Interior Vacuum & Cleaning
   - Foam Wash / Deep Wash
   - Wax & Polish
   - Dashboard & Tyre Dressing
   - Car Sanitization / Odor Removal
   - Periodic Membership Plans (weekly/monthly)
     Each card: icon, title, 1–2 line description, "starting from ₹X" if pricing is provided later (otherwise "Contact for pricing").
5. **How It Works** — 3–4 step process (e.g. 1. Book via WhatsApp/Call → 2. Choose slot & service → 3. Our expert arrives at your doorstep → 4. Sit back, pay after service). Use numbered visual steps.
6. **Why Aquashift / USPs** — Doorstep convenience, water conservation/eco-friendly methods, trained & verified staff, quality products, affordable pricing, flexible scheduling.
7. **Gallery / Before-After** — Placeholder image grid for before/after wash photos (use clearly labeled placeholder images; do not fabricate real customer photos).
8. **Pricing / Plans** (optional, only if data provided — otherwise use a "Get a custom quote" CTA instead of fake prices).
9. **Testimonials** — Use placeholder structure only if no real testimonials are supplied; label clearly as sample/placeholder content, or omit this section until real reviews are available. Do not invent fake customer names/quotes as if real.
10. **Service Area Map** — Calicut/Kozhikode coverage area, simple map embed or styled illustration.
11. **FAQ Section** — Common questions (booking process, areas covered, water source, payment methods, cancellation policy, safety of vehicle/keys).
12. **Final CTA Banner** — Strong closing call-to-action with WhatsApp + Call buttons on the navy gradient background.
13. **Contact Section** — The contact form described in Section 2.6, plus phone, email, WhatsApp, and service-area details side by side.
14. **Footer** — Logo, tagline, quick links, service list, contact details, legal company name (WHS Auto Solution Private Limited), Instagram icon link, copyright line, and links to the three legal pages: Privacy Policy, Terms & Conditions, Refund/Cancellation Policy (see Section 2.5).

**Additional standalone pages required:** `/privacy-policy`, `/terms-and-conditions`, and `/refund-policy` — each a real, readable page (not a modal or stub), linked from the footer on every page, with their own SEO title/meta description.

---

## 7. Content & Tone Guidelines

- Voice: **Warm, confident, efficient, local-friendly** — speaks like a trustworthy neighborhood expert with professional polish. Not overly corporate; not overly casual.
- Emphasize **convenience** ("we come to you"), **trust** (trained staff, quality care), and **local relevance** (Calicut/Kozhikode).
- Use clear, benefit-driven headlines rather than generic taglines.
- All copy should be original — do not copy text from competitor sites.
- Do NOT invent fake statistics, review counts, star ratings, or customer testimonials. If placeholder testimonials are used for layout purposes, clearly mark them as `[SAMPLE — replace with real testimonial]`.
- Keep pricing honest: if no pricing is supplied, use "Get a Free Quote" / "Contact for Pricing" instead of made-up numbers.

---

## 8. Technical / Build Instructions

- **Stack:** Plain HTML/CSS/JS (or React if the project calls for it) — prioritize fast load times and mobile performance, since most local customers will visit via phone.
- **Responsive:** Mobile-first design; test at 375px, 768px, 1024px, 1440px breakpoints.
- **Performance:** Optimize images (WebP where possible), lazy-load below-the-fold images, avoid heavy unused libraries.
- **Accessibility:** Sufficient color contrast (navy/blue on white passes AA), alt text on all images, semantic HTML, keyboard-navigable nav and forms.
- **SEO basics:** Proper `<title>` and meta description mentioning "doorstep car wash Calicut / Kozhikode," Open Graph tags, favicon from logo, structured data (LocalBusiness schema) using the contact info above.
- **CTAs:** Every major section should funnel toward the two primary actions: **WhatsApp booking** (`https://wa.me/919995566866`) and **Call now** (`tel:+919995566866`). Make these visually prominent (e.g. floating WhatsApp button on mobile).
- **Forms (if a contact form is included):** Simple Name, Phone, Location, Service Needed, Preferred Time fields — no backend assumptions unless specified; note that form submission wiring (email/API) needs to be connected separately.

---

## 9. Assets

- Use the AQUASHIFT logo (navy/blue wordmark with icon) provided separately — do not redraw or reinterpret the logo; place it as-is in the header (on light background) and use a white/light variant on the navy footer/dark sections if available.
- For hero and section imagery, use clean, high-quality automotive/car-wash-themed visuals (placeholder images are fine, clearly marked as such) until real photography is supplied.

---

## 10. What "Done" Looks Like

A visually cohesive, on-brand, fast-loading, mobile-optimized website that:

- Immediately communicates "doorstep car wash in Calicut/Kozhikode"
- Uses the exact Aquashift color palette and a premium water/shine visual motif
- Makes booking via WhatsApp or phone call effortless from any section
- Reads as a real, trustworthy local business — not a generic template
- Uses only accurate, provided information (no fabricated stats, reviews, or pricing)

---

### Quick-reference brand block (for pasting into design tools)

```
Brand: AQUASHIFT
Legal name: WHS Auto Solution Private Limited
Primary: #054AAB
Navy: #01142F
Ink: #01040B
Secondary Blue: #014498
Accent: #5C89C8
Tint: #E8F0FB
Slate: #59667A
Phone: +91 99955 66866
Email: supportaquashift.in@gmail.com
WhatsApp: https://wa.me/919995566866
Location: Calicut / Kozhikode, Kerala
Domain: theaquashift.in
```
