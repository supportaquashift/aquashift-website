# AQUASHIFT Website — Technical Documentation

This document explains how the project is built, how the files connect to each other, and where every external/technical dependency comes from. It's written for a developer (or an AI coding tool like Antigravity, Cursor, Claude Code, etc.) picking up the project cold.

For **brand, content, and design brief** (colors, copy tone, required sections, business rules), see [`CLAUDE.md`](CLAUDE.md) in the project root — that file is the original spec this site was built against. This document is the *technical* companion to it: not what the site should say, but how it's wired together.

---

## 1. What this is

A static marketing website for **AQUASHIFT**, a doorstep car wash service in Calicut (Kozhikode), Kerala. Single HTML page (`index.html`) with anchor-linked sections, plus three standalone legal pages.

**There is no build step, no framework, no npm, no bundler.** It's plain HTML + CSS + vanilla JavaScript, designed to be opened directly or served by any static file host. This was a deliberate choice (see `CLAUDE.md` §8) — fast load times for mobile visitors in Kerala, zero deployment complexity.

---

## 2. File structure

```
aquashift-website/
├── index.html                  # The entire site (single page, anchor-linked sections)
├── privacy-policy.html         # Standalone legal page
├── terms-and-conditions.html   # Standalone legal page
├── refund-policy.html          # Standalone legal page
├── robots.txt                  # Points crawlers to sitemap.xml
├── sitemap.xml                 # Lists the 4 real pages (home + 3 legal pages)
├── CLAUDE.md                   # Original design/content brief (brand colors, copy rules, requirements)
│
├── css/
│   ├── tokens.css              # Design tokens (colors, type scale, spacing, radii, shadows, motion) — loads FIRST
│   ├── styles.css              # All component/layout styles, organized by page section
│   └── animations.css          # Scroll-reveal system + keyframe animations + reduced-motion overrides
│
├── js/
│   ├── main.js                 # Site-wide behavior (nav, icon sprite loader, scroll reveal, WhatsApp float, FAQ, steps)
│   └── form.js                 # Contact form: validation + WhatsApp submission
│
├── assets/
│   ├── icons.svg                # SVG <symbol> sprite — every inline icon used across the site
│   ├── favicon.svg / .ico
│   ├── logo.svg / logo-white.svg / logo-mark.svg
│   ├── whatsapp-icon.png / instagram-icon.png
│   ├── images/                  # Gallery photos (JPG, some with WebP variants)
│   ├── video/                   # Hero background video (MP4 + WebM)
│   └── illustrations/           # (currently empty — reserved for future use)
│
├── brand-guidelines/            # Source brand assets (raw photos, logo PDF, hero video source)
│                                 # NOT referenced by the live site — this is a reference/source folder only
│
└── .claude/                     # Claude Code tooling config (skills) — not part of the website itself
```

**Nothing here requires `npm install`.** If your friend's IDE (Antigravity or otherwise) tries to run a package manager, there is no `package.json` — that's correct, not missing.

---

## 3. How the files connect (load order matters)

`index.html` is the root of everything. In `<head>`, in this order:

1. **Inline script** (line 4): adds a `js` class to `<html>`. This is a no-JS fallback switch — `animations.css` only hides `.reveal` elements *if* `.js` is present on `<html>`, so if JavaScript fails to load, content is never permanently invisible.
2. **Google Fonts** — `Sora` (headings) and `Manrope` (body), loaded via `<link>` from `fonts.googleapis.com`. This is the **one hard external network dependency** the page has for correct rendering (see §7).
3. **Three CSS files, in this exact order** (order matters — later files override earlier ones):
   - `css/tokens.css` — CSS custom properties only (`:root { --aq-blue: ...; }`). No selectors, no layout.
   - `css/styles.css` — everything else: layout, components, one `/* ============ SECTION ============ */` comment block per page section, in the same order the sections appear in `index.html`.
   - `css/animations.css` — the `.reveal` scroll-in system and keyframes.
4. **`<script type="application/ld+json">`** — a `LocalBusiness` schema.org block for SEO (see §6).

At the bottom of `<body>`:
```html
<script src="js/main.js?v=2" defer></script>
<script src="js/form.js?v=2" defer></script>
```
Both are `defer`red, so they execute after the DOM parses but before `DOMContentLoaded`. `main.js` runs first and sets up the icon sprite, nav, and reveal system; `form.js` runs second and only does anything if it finds `#contactForm` on the page (it no-ops harmlessly on the legal pages, which don't have a form).

### The `?v=N` query strings — read this before editing CSS/JS

Every `<link>` and `<script>` tag for local CSS/JS has a `?v=4` / `?v=2` style cache-busting suffix. **This project has no build tool to auto-hash filenames, so the version number is manual.** If you edit `css/styles.css` or `js/main.js`/`js/form.js` and the change doesn't appear in the browser, **bump the version number in `index.html`** (e.g. `styles.css?v=4` → `styles.css?v=5`). This bit a previous session hard — the server was serving the updated file correctly, but browsers kept the old one cached because the URL hadn't changed. All three CSS files share one version number; both JS files share another. Keep it that way (change all three CSS `?v=` together, both JS `?v=` together) rather than tracking them independently — simpler to reason about.

---

## 4. CSS architecture

### `tokens.css` — the single source of truth for design values
Every color, font, spacing value, radius, shadow, and animation timing used anywhere in the CSS is defined once here as a custom property and referenced everywhere else via `var(--name)`. Never hardcode a hex color or a `px` spacing value directly in `styles.css` — add or reuse a token instead. Key groups:
- `--aq-blue`, `--aq-navy`, `--aq-ink`, `--aq-ocean`, `--aq-sky`, `--aq-pale`, `--aq-slate` — brand palette (documented in `CLAUDE.md` §3)
- `--font-display` (Sora), `--font-body` (Manrope), and a `--fs-*` type scale using `clamp()` for fluid responsive sizing
- `--space-*` spacing scale, `--radius-*`, `--shadow-*`, `--ease-*` / `--dur-*` motion tokens

### `styles.css` — organized by section, in page order
Search for `/* ============ SECTION NAME ============ */` comments to jump to any part. Current sections top to bottom: Header, Cinematic Video Hero, Trust Bar, Services, How It Works, USP, Gallery, Pricing, Service Area, FAQ, Final CTA Banner, Contact, Footer, WhatsApp Float, Legal Pages. This ordering mirrors `index.html` exactly, so if you're editing a section, the CSS for it is in the same relative position in both files.

Layout patterns used throughout: CSS Grid for card/feature layouts, flexbox for one-dimensional rows, `.container` (max-width wrapper, see top of file) for consistent page margins, and a `.section` / `.section--tint` (light blue bg) / `.section--dark` (navy bg) modifier system for alternating section backgrounds.

### `animations.css` — scroll reveal
Any element with class `.reveal` starts hidden/offset and animates in via the `.is-visible` class, which `main.js` adds through an `IntersectionObserver` (see §5). This is CSS-driven, not JS-animated — JS only toggles a class. Respects `prefers-reduced-motion` (see the media query at the bottom of the file).

---

## 5. JavaScript architecture

Both files are plain IIFEs (`(function () { "use strict"; ... })();`) — no modules, no bundler, so they just need to be loaded as plain `<script>` tags in the right order. No global variables leak outside them.

### `main.js` — site-wide behavior, several independent features in one file:

| Feature | What it does |
|---|---|
| **Icon sprite loader** | `fetch("assets/icons.svg")` on page load, injects the raw SVG into `#iconSpriteRoot` (a hidden div at the bottom of `<body>`). This is why every icon in the HTML is written as `<svg><use href="#icon-name"></use></svg>` — the actual `<symbol>` definitions only exist in `assets/icons.svg` and get pulled into the DOM at runtime. **If icons aren't rendering, check that this fetch succeeded** (it needs the page served over HTTP, not opened as a `file://` URL — see §9). |
| **Sticky header** | Adds `.is-scrolled` to `#header` past 12px of scroll, for a shadow/background change. |
| **Mobile nav drawer** | Opens/closes `#navDrawer` via the hamburger button, backdrop click, or Escape key. |
| **Scroll reveal** | `IntersectionObserver` watches every `.reveal` element and adds `.is-visible` once it's ~15% in view, then stops observing it (one-shot). Falls back to instantly-visible if `IntersectionObserver` isn't supported. |
| **Floating WhatsApp button** | Hidden while the hero's own WhatsApp button is on screen (avoids two competing WhatsApp CTAs on first paint), shown once the visitor scrolls past it. Independently dismissible tooltip. |
| **Reduced-motion hero video** | If `prefers-reduced-motion: reduce`, the hero video is paused on its first frame instead of autoplaying/looping. |
| **How It Works step indicator** | Clickable/keyboard-navigable numbered steps (`data-state="active/completed/inactive"`), purely visual — never hides the step content, so it degrades gracefully without JS. |
| **FAQ accordion** | Click a `.faq__q` button to expand its answer; closes any other open answer first (single-open accordion). |

### `form.js` — contact form only, no-ops if `#contactForm` isn't on the page

1. **Client-side validation** — required-field and phone-format (`/^[6-9]\d{9}$/`, i.e. a 10-digit Indian mobile number) checks, with per-field error messages shown/hidden via a `.has-error` class on the field wrapper. Validates on blur and on input-after-error.
2. **On submit** (if all fields valid): builds a plain-text summary of the form (name, phone, location, service, date/time, optional message) and opens it as a pre-filled WhatsApp message:
   ```js
   var waUrl = "https://wa.me/919995566866?text=" + encodeURIComponent(lines.join("\n"));
   window.open(waUrl, "_blank", "noopener");
   ```
   **There is no server, no API call, no email service.** The "submission" is entirely client-side — it just opens WhatsApp Web/app with the message ready to send. The user still has to hit send on the WhatsApp side. This was a deliberate choice over email (see decision note below) because it needs zero backend, zero third-party account, and matches how every other CTA on the site already works.
   - Success state: status message + `form.reset()`.
   - If you ever want to add a real backend (e.g. so bookings land in a database or trigger an email) alongside or instead of the WhatsApp flow, this is the one function to change — nothing else in the codebase assumes a particular submission mechanism.

---

## 6. SEO & structured data

- **Meta tags**: title, description, canonical URL, Open Graph (`og:*`) and Twitter Card tags, all in `<head>`.
- **JSON-LD** (`<script type="application/ld+json">` in `<head>`): a `schema.org/LocalBusiness` block with the legal name, phone, email, address, service area, and Instagram link. This is what lets Google show rich business info in search results — keep it in sync if contact details change.
- **`sitemap.xml`**: lists the home page and the three legal pages. If you ever split the single-page site into real multi-page routes, add them here.
- **`robots.txt`**: allows all crawlers, points to the sitemap.
- **Per-page `<title>`/meta description**: `index.html` and each of the three legal `.html` files have their own, matching CLAUDE.md's SEO requirements.

---

## 7. External connections (everything that talks to the outside world)

| What | Where | Type |
|---|---|---|
| **Google Fonts** (`fonts.googleapis.com`, `fonts.gstatic.com`) | `index.html` `<head>` | Hard dependency — page needs internet access for correct typography. Falls back to `system-ui` per the `--font-*` token stacks if unreachable. |
| **WhatsApp** (`wa.me/919995566866`) | Dozens of `<a>` links across every section, plus the contact form's JS-generated URL | The site's primary conversion channel. Every "Book on WhatsApp" button/link uses the same phone number with a pre-filled `?text=` message. |
| **Phone** (`tel:+919995566866` and two more numbers for named staff) | Trust bar, contact section, footer | Native tel: links, no external service. |
| **Email** (`mailto:supportaquashift.in@gmail.com`) | Contact section, footer | Native mailto: link, no external service. |
| **Instagram** (`instagram.com/aquashift_care`) | Footer icon link | Just a link, no API/embed. |
| **Google Maps** | `<iframe src="https://maps.google.com/maps?q=Kozhikode...">` in the Service Area section | Embedded map, no API key needed (uses the public embed URL format). |
| **Icon sprite** (`assets/icons.svg`) | Fetched by `main.js` at runtime | Local file, not external, but it IS a network request (`fetch`) — see §9 for why this means you can't just double-click `index.html`. |

There is **no analytics**, **no CRM integration**, **no payment gateway**, and **no backend API** anywhere in the codebase. Every "integration" in this project is either a `tel:`/`mailto:`/`wa.me` link or a static embed.

---

## 8. Assets

- **`assets/images/`** — gallery photos. `gallery-exterior-wash.jpg` has a `.webp` sibling served via `<picture>` for smaller file size; the other three gallery images (foam, wax, interior) are JPG only. If optimizing further, converting those three to WebP with `<picture>` fallbacks (matching the exterior-wash pattern) would be the next win.
- **`assets/video/hero.mp4` + `hero.webm`** — the cinematic hero background video, both formats provided via `<source>` for browser compatibility, ~2.1–2.2MB each.
- **`brand-guidelines/`** — this folder holds the *source* photos, the brand PDF, and an alternate hero video used during design/content work. **Nothing in the live site references this folder** — it's a working/reference folder, safe to exclude from a deploy but worth keeping if your friend needs the original source images to make new crops/edits.
- **Icon sprite** (`assets/icons.svg`) — one file, ~22 `<symbol>` definitions (menu, close, phone, chevron, arrow, droplet, shine, shield, check, pin, clock, users, leaf, calendar, car, vacuum, foam, wax, tyre, spray, mail, star). To add a new icon: add a `<symbol id="icon-name" viewBox="...">...</symbol>` to this file, then reference it anywhere as `<svg class="icon" width="20" height="20"><use href="#icon-name"></use></svg>`.

---

## 9. Running the project locally

**You cannot just double-click `index.html` and open it as a `file://` URL** — the icon sprite loader in `main.js` uses `fetch()`, which browsers block for local files under the `file://` protocol (CORS). You need an actual local HTTP server. Any of these work, from the project root:

```bash
# Python (built into most systems)
python -m http.server 8080

# Node, if installed
npx serve .

# PHP, if installed
php -S localhost:8080
```

Then visit `http://localhost:8080/`. No install step, no dependencies to fetch — the server is purely for serving static files correctly (and for a live-reload-free preview).

---

## 10. Deployment

Because this is 100% static files with zero server-side logic, it can be deployed to **any** static host with no configuration beyond "point it at this folder": Netlify, Vercel, GitHub Pages, Cloudflare Pages, or traditional shared hosting (cPanel, etc.) via FTP. There is no build command to run — deploy the repository as-is. Just make sure the host serves `index.html` at the root and preserves the `assets/`, `css/`, `js/` folder structure exactly as-is (relative paths are used throughout, no absolute `/` paths, except within `sitemap.xml`/`robots.txt`/JSON-LD/OG tags which correctly hardcode `https://www.theaquashift.in/...`).

---

## 11. Known gaps / things flagged as unfinished

These are intentional, clearly-marked incomplete items — not bugs:

- **FAQ answers**: two answers (water source, payment methods) contain `<em>[CONFIRM WITH OWNER: ...]</em>` placeholder text per `CLAUDE.md`'s instruction not to invent specific business policy details. Replace with real answers once confirmed with the business owner.
- **Contact form**: intentionally WhatsApp-only, no backend/email (see §5). If real lead-capture into a database or CRM is ever needed, that's the one place to extend.
- **`assets/illustrations/`**: empty folder, currently unused.
- **Testimonials section**: not present on the site at all — `CLAUDE.md` explicitly says to omit it rather than invent fake reviews until real ones are supplied.
- **Pricing**: real prices from the business owner ARE wired in (see the Pricing section of `index.html`) — this is not a placeholder anymore.

---

## 12. Quick reference: "I want to change X, where do I look?"

| I want to... | Edit this |
|---|---|
| Change a color, font size, spacing, or shadow globally | `css/tokens.css` |
| Change how a specific section looks | `css/styles.css`, find the matching `/* ==== SECTION ==== */` comment |
| Change page copy, add/remove a section, change an image reference | `index.html` |
| Change the WhatsApp number everywhere | Find/replace `919995566866` across `index.html` and `js/form.js` (also update `CLAUDE.md` and the JSON-LD `telephone` field) |
| Add/change pricing | The `#pricing` section in `index.html` — see the `.pricing-card` markup pattern |
| Add a new icon | `assets/icons.svg` (add a `<symbol>`), then reference via `<use href="#icon-yourname">` |
| Change scroll-reveal behavior | `css/animations.css` (visual) + `js/main.js` (`IntersectionObserver` block, behavior) |
| Change form validation rules or the WhatsApp message format | `js/form.js` |
| Change legal page content | `privacy-policy.html`, `terms-and-conditions.html`, `refund-policy.html` (each is a fully standalone HTML file, not templated) |
| **After any CSS/JS edit that doesn't seem to show up** | Bump the `?v=N` query string on the relevant `<link>`/`<script>` tags in `index.html` — see §3 |
