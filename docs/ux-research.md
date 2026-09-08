# Portfolio UI/UX Research & Redesign Brief

**Date:** 2026-09-08 · **Subject:** `LottaCodr/My-3D-Portfolio` · **Scope:** deep research → audit → redesign → implementation

---

## 1. Research summary

Sourced from current (2026) portfolio-UX, mobile-responsive and WCAG 2.2 guidance.

### 1.1 What recruiters/clients actually do

| Finding | Source |
| --- | --- |
| Reviewers spend **seconds** scanning. A portfolio must survive a 5-second test: *who you are, what you specialise in, your strongest work.* | [Muzli, "How to Build a UX Portfolio That Actually Gets You Hired (2026)"](https://muz.li/blog/how-to-build-a-ux-portfolio-that-actually-gets-you-hired-2026/) |
| **Lead with impact, not aesthetics.** First two sentences of a case study should say *what changed*, not *what you designed*. | [Muzli 2026](https://muz.li/blog/how-to-build-a-ux-portfolio-that-actually-gets-you-hired-2026/) |
| Role + specialisation belongs **above the fold**. "Product Designer specialising in B2B SaaS" beats "I create meaningful digital experiences". | [Muzli 2026](https://muz.li/blog/how-to-build-a-ux-portfolio-that-actually-gets-you-hired-2026/) |
| Project cards need **one-line descriptions**, not bare titles. "Redesigned onboarding that cut drop-off 34%" beats "Project Athena". | [Muzli 2026](https://muz.li/blog/how-to-build-a-ux-portfolio-that-actually-gets-you-hired-2026/) |
| **3–5 case studies is the sweet spot.** Not 2 (too thin), not 8 (nobody reads that many). Curated beats comprehensive. | [Muzli 2026](https://muz.li/blog/how-to-build-a-ux-portfolio-that-actually-gets-you-hired-2026/), [IxDF](https://ixdf.org/literature/article/ux-portfolio-website-builders), [UX Folio](https://blog.uxfol.io/ux-portfolio-design-tips/) |
| Case-study formula: **setup → your role & constraints → process → outcome.** Constraints read as more credible than freedom. | [Muzli 2026](https://muz.li/blog/how-to-build-a-ux-portfolio-that-actually-gets-you-hired-2026/), [SitesPlaced](https://sitesplaced.com/ui-ux-designer-portfolio) |
| **Minto pyramid** for case studies: quantifiable result at the top, key decisions in the middle, process detail at the bottom. | [UX Playbook 2026](https://uxplaybook.org/articles/ux-case-study-minto-pyramid-structure-guide) |
| Reviewers **scan, they don't read line by line.** Hierarchy, consistent layout and intentional emphasis must support fast comprehension. | [UX Folio](https://blog.uxfol.io/ux-portfolio-design-tips/) |
| Contact must be reachable **directly from the homepage**; burying it adds friction. | [Muzli inspiration guide](https://muz.li/inspiration/portfolio-website/) |
| Homepage should have **one primary action** ("See my work"); everything else secondary. | [Muzli 2026](https://muz.li/blog/how-to-build-a-ux-portfolio-that-actually-gets-you-hired-2026/) |
| **Only include your best work**; "two relevant, detailed case studies are better than twelve random ones". | [UX Design Institute](https://www.uxdesigninstitute.com/blog/8-ux-portfolio-best-practices/) |
| **SEO:** if your name and role aren't in the page title and meta description you're invisible to search *and* to AI tools parsing the page (78% of recruiters now use AI-assisted tools). | [Muzli 2026](https://muz.li/blog/how-to-build-a-ux-portfolio-that-actually-gets-you-hired-2026/) |
| Consistency: reuse one component set (buttons, menus, icons). Don't make reviewers learn new conventions. | [Anima](https://www.animaapp.com/blog/industry/ux-ui-portfolio-design-best-practices/) |
| **High-quality imagery** is a listed best practice; work should be presented with polished visuals. | [Wix UX portfolio guide](https://www.wix.com/blog/ux-portfolio-examples) |

### 1.2 Mobile responsiveness (2026 baseline)

| Rule | Detail | Source |
| --- | --- | --- |
| Touch targets **≥ 44×44 px** (Apple HIG) / 48×48 dp (Material); primary CTAs 56–60 px | with ≥ 8 px separation | [Vortex 2026](https://www.vortexwebinnovate.com/blog/mobile-first-design-best-practices-for-2026), [MediaPlus](https://mediaplus.com.sg/responsive-web-design-best-practices/), [DEV](https://dev.to/ohugonnot/mobile-css-consistency-all-best-practices-in-2026-4l5l) |
| Keep tap targets **≥ 16 px from screen edges** (iOS/Android system gestures) | | [MediaPlus](https://mediaplus.com.sg/responsive-web-design-best-practices/) |
| **No horizontal scroll at any width from 320 px → 1920 px** | `overflow-x` trap; fixed px widths on content columns | [DEV](https://dev.to/ohugonnot/mobile-css-consistency-all-best-practices-in-2026-4l5l), [Orbix](https://www.orbix.studio/blogs/responsive-web-design-best-practices) |
| **Fluid typography with `clamp()`** so one rule scales 360 px → 1920 px without breakpoint cliffs | body ≥ 16 px (17–18 px preferred), line-height 1.5 body / 1.2 headings | [Vortex 2026](https://www.vortexwebinnovate.com/blog/mobile-first-design-best-practices-for-2026), [MediaPlus](https://mediaplus.com.sg/responsive-web-design-best-practices/) |
| **Safe-area insets** (`env(safe-area-inset-*)`) + `viewport-fit=cover` for fixed nav on notched phones | | [web-developpeur 2026](https://www.web-developpeur.com/en/blog/coherence-css-mobile-bonnes-pratiques) |
| **Avoid hover-only affordances** — they don't exist on touch | provide always-visible equivalents | [Creator Concepts](https://www.creatorconcepts.co.uk/blog-posts/mobile-web-design), [FuturePeak](https://futurepeakdigital.com/blog/responsive-web-design-guide-2026/) |
| Form inputs **≥ 16 px font** or iOS auto-zooms the page | | [DEV](https://dev.to/ohugonnot/mobile-css-consistency-all-best-practices-in-2026-4l5l) |
| Reserve image space with `aspect-ratio` + explicit dimensions to kill CLS; `loading="lazy"` below the fold, `decoding="async"` | | [Vortex 2026](https://www.vortexwebinnovate.com/blog/mobile-first-design-best-practices-for-2026), [DEV](https://dev.to/ohugonnot/mobile-css-consistency-all-best-practices-in-2026-4l5l) |
| Single-column reading layouts, line length **45–75 chars** | | [Vortex 2026](https://www.vortexwebinnovate.com/blog/mobile-first-design-best-practices-for-2026) |
| Honour `prefers-reduced-motion` — disable parallax/bouncy animation | | [Vortex 2026](https://www.vortexwebinnovate.com/blog/mobile-first-design-best-practices-for-2026) |

### 1.3 Accessibility (WCAG 2.2 AA)

| SC | Requirement | Source |
| --- | --- | --- |
| 1.4.3 | **4.5:1** normal text, **3:1** large text | [WCAG Pros](https://wcagpros.com/wcag-guidelines/wcag-accessibility-checklist-guide/), [BrowserStack](https://www.browserstack.com/accessibility-testing/compliance/wcag-compliance-checklist) |
| 1.4.10 Reflow | Content reflows **without horizontal scrolling at 320 CSS px** | [WCAG Pros](https://wcagpros.com/wcag-guidelines/wcag-accessibility-checklist-guide/) |
| 1.4.11 | **3:1** non-text contrast for UI components & interactive states | [Digital Applied](https://www.digitalapplied.com/blog/wcag-2-2-accessibility-audit-checklist-2026-reference) |
| 2.4.1 Bypass Blocks | **Skip-to-content link** as first focusable element | [Deque checklist](https://media.dequeuniversity.com/en/docs/web-accessibility-checklist-wcag-2.2.pdf) |
| 2.4.7 / 2.4.11 | Visible focus indicator; focused element **not hidden by sticky headers** → `scroll-padding-top` | [AllAccessible](https://www.allaccessible.org/blog/wcag-22-compliance-checklist-implementation-roadmap) |
| 2.5.8 Target Size | interactive targets ≥ 24×24 CSS px (we target 44 px) | [BrowserStack](https://www.browserstack.com/accessibility-testing/compliance/wcag-compliance-checklist) |
| 4.1.2 Name/Role/Value | use semantic `<button>`/`<a>`, never `<div onClick>` | [yusmp](https://yusmpgroup.com/blog/web-app-accessibility-wcag-2026) |
| 3.3.1 / 3.3.3 | Inline error text, not colour-only; `aria-describedby` | [yusmp](https://yusmpgroup.com/blog/web-app-accessibility-wcag-2026) |
| 4.1.3 Status Messages | announce dynamic updates via `aria-live` | [WCAG Pros](https://wcagpros.com/wcag-guidelines/wcag-accessibility-checklist-guide/) |
| 3.1.1 | `lang` on `<html>` (18% of home pages miss it) | [yusmp](https://yusmpgroup.com/blog/web-app-accessibility-wcag-2026) |
| 2.4.6 | Descriptive headings and labels; avoid generic "Section" | [Digital Applied](https://www.digitalapplied.com/blog/wcag-2-2-accessibility-audit-checklist-2026-reference) |

---

## 2. Audit of the existing site

Measured against the above. Numbers are from reading the code and running a contrast
calculation over the palette in `src/index.css`.

### 2.1 Blocking bugs found

| # | Problem | Evidence |
| --- | --- | --- |
| B1 | **Every project thumbnail is a fake PNG.** `src/assets/agro.png`, `health-care.png`, `voting.png`, … are hand-written **SVG source with a `.png` extension** (400×300, Arial label on a `#1a1a2e` rect, 335–650 bytes). Rendered only because browsers sniff; breaks under `X-Content-Type-Options: nosniff`, and is the opposite of "high-quality imagery". | `python3 struct.unpack` on `src/assets/*.png` |
| B2 | **`Hero.jsx` uses `w-screen`** → forces `width: 100vw`, which includes the scrollbar width and produces **horizontal scroll on desktop**, and `min-h-[700px]` overflows a 375×667 phone viewport. | `src/components/Hero.jsx` |
| B3 | **`Works.jsx` hard-codes `sm:w-[340px]`** on cards inside a 4-column grid → columns are mis-aligned and the last row ragged; violates reflow. | `src/components/Works.jsx` |
| B4 | **`ease: "sin.inOut"`** in `Hero.jsx` is not a valid Framer Motion easing (`easeInOut` / `[...]` cubic-bezier are). | `src/components/Hero.jsx` |
| B5 | **Duplicate project entry** — "Petroelemites" and "Petroelemites (Alternate)" are the same repo with near-identical copy. Padding the grid with a dupe directly contradicts "curated, not comprehensive". | `src/constants/index.js` |
| B6 | **Invented statistics.** About section claims `Stars 12` / `Followers 847`. GitHub API returns **8 total stars** and **22 followers** (`public_repos: 115` is correct). Credibility risk on a document meant to be trusted. | `gh api users/LottaCodr` |
| B7 | **Dead links shipped as live URLs.** `petroelemites-beige.vercel.app` and `top-six-smoky.vercel.app` both return **`404 DEPLOYMENT_NOT_FOUND`**. | `fetch_page` |
| B8 | **`Contact`/`CaseStudies` ignore `SectionWrapper` padding** and add their own `py-24`, and `<a>` CTAs are `display:inline` with an `<svg>` sibling → icons render on the baseline, not centred. | `src/components/Contact.jsx` |
| B9 | **`Tech.jsx` (3D skill balls) is exported but never mounted** — dead code shipping in the bundle graph. | `src/components/index.js` vs `src/App.jsx` |
| B10 | **LinkedIn/Twitter footer links are guesses** (`linkedin.com/in/lottacodr`, `twitter.com/lottacodr`); the GitHub profile has `blog: ""` and `twitter_username: null`. | `gh api users/LottaCodr` |

### 2.2 Contrast (computed, WCAG relative-luminance formula)

| Foreground | On `#0a0a0f` bg | On `#14141a` card | Verdict |
| --- | --- | --- | --- |
| `--muted #71717a` (all body copy, project descriptions at 13 px) | **4.09:1** | **3.80:1** | ❌ **fails AA** (needs 4.5:1) |
| `--accent #cfa96e` | 8.99:1 | 8.35:1 | ✅ AAA |
| `--fg #e8e6e3` | 15.86:1 | 14.73:1 | ✅ AAA |
| `--border #2a2a3a` | 1.40:1 | 1.30:1 | ⚠️ below 3:1 for UI-component boundaries |
| `#0a0a0f` on `#cfa96e` (primary button) | — | 8.99:1 | ✅ AAA |

**Fix applied:** body-muted token → `#a1a1aa` (**7.71:1 on bg, 7.16:1 on card — AAA**),
border token → `#33333f`. Gold and off-white were already compliant and are kept.

### 2.3 UX gaps vs research

| Gap | Research says | Old site |
| --- | --- | --- |
| 5-second test | Role + specialisation above the fold | H1 was *"Let's build something incredible"* — no role, no name, no proof |
| Impact-first | Lead with the outcome | Case studies open with "Challenge"; results buried last |
| Case-study count | 3–5 deep studies | **13** shallow ones, all fully expanded at once (~9,000 words on one page) |
| Scannability | Progressive disclosure | Nothing collapses; one ~40-screen scroll |
| Links on projects | Every project must be reachable | Only **1 of 14** cards carried a live URL; links were **hover-only** → invisible on mobile |
| Filtering | Help reviewers find relevant work | None |
| Accessibility | Skip link, focus-visible, landmarks, `aria-current` | None present |
| Contact | Reachable + easy | Buttons only, no form, invalid inline SVG layout |
| Consistency | One component set | Variants hand-inlined per component, duplicated inline `<svg>`s with malformed path data |

---

## 3. Redesign decisions

### 3.1 Information architecture

```
Hero (name + role + proof + single primary CTA)
  └─ Availability pill · 4 real metrics · "View work" / "Get in touch"
Tech marquee            ← replaces the unmounted Tech.jsx 3D balls
Selected Work           ← filterable grid, 15 projects, 100% linked
Case Studies            ← 5 deep studies, Minto-pyramid accordion
About                   ← real bio + real numbers + capability list
Contact                 ← validated form + direct channels
Footer
```

### 3.2 Design system

* **Tokens in one place** (`src/index.css` custom properties → mirrored in `tailwind.config.js`).
* **Fluid type scale** via `clamp()` — `--text-display` runs 2.75rem → 5rem with no breakpoint cliffs.
* **4-pt spacing scale** (4/8/12/16/24/32/48/64/96).
* **One button component, one heading component, one badge component** — reused everywhere.
* **Contrast-safe palette:** muted `#a1a1aa` (AAA), accent `#cfa96e` (AAA), ink `#0a0a0f`.
* **Motion:** Framer Motion `useReducedMotion()` wired to every animation, not just CSS.

### 3.3 Mobile

* No `w-screen` anywhere; `overflow-x: clip` on `html, body`.
* `Tilt` disabled on touch/coarse pointers (`matchMedia('(hover: none)')`).
* Live/Code buttons **always visible** (never hover-gated) and ≥ 44 px tall.
* Full-screen mobile nav sheet as a modal dialog (`role="dialog"`, `aria-modal`, focus trap, inert background): header steps above it so the close control stays tappable, `Esc` closes with focus return, focus moves to the navigated section, resize to desktop auto-closes, `env(safe-area-inset-*)` padding.
* `viewport-fit=cover` + safe-area padding on the sticky header.
* `aspect-ratio: 16/10` on every cover → zero CLS; `loading="lazy"` + `decoding="async"`.
* Form inputs at 16 px to stop iOS zoom.
* Verified: no horizontal scroll from 320 px → 1920 px.

### 3.4 Accessibility

Skip link as first focusable element · `:focus-visible` ring (2 px, 3:1+) · `scroll-padding-top`
so the sticky header never obscures focus · semantic `<header>/<main>/<section>/<footer>` ·
`aria-current="true"` on the active nav link · real `<button>` elements (no `<div onClick>`) ·
`aria-expanded`/`aria-controls` on accordion + menu · `aria-live="polite"` on the contact form
status and the filter result count · `lang="en"` · descriptive `alt` text on every cover.

---

## 4. Link verification log

Every URL below was resolved during this research pass. Sandbox `curl` has no outbound
route, so verification used page fetches; GitHub metadata used `gh api`.

| Project | Live URL | Result |
| --- | --- | --- |
| Nile Valley EMR (Health-Care WebApp) | `care-pulse-olive.vercel.app` → **`nile-valley-emr.vercel.app/login`** | ✅ live — canonical URL adopted |
| The Garden Fairy | `garden-fairy.vercel.app` | ✅ live — "The Garden Fairy — Plants & Smart Home Planners" |
| AYF / Agro Investment | `agro-investment-delta.vercel.app` | ✅ live — "AYF — Invest in African Agriculture" |
| TCG / The Colour Green | `the-color-green.vercel.app` | ✅ live |
| Echoloft | `echoloft-landing-page.vercel.app` | ✅ live — "Affordable Websites for Nigerian Businesses" |
| Glimms Waitlist | `glimms-waitlist.vercel.app` | ✅ live — "AI that styles what you already own" |
| LWMP Birthday Care | `lwmp-alert-automation.vercel.app` | ✅ live — "Living Water \| Birthday Care" |
| This portfolio | `lotaport.vercel.app` | ✅ live |
| Petroelemites Investment | `petroelemites-ltd.vercel.app` | ✅ live — "Petroelemites Investment Company Limited \| Oil & Gas Investment in Nigeria" (see §4.2) |
| topsite | `top-six-smoky.vercel.app` | ❌ **404 DEPLOYMENT_NOT_FOUND** → excluded |
| Garden Fairy Server, Glimms AI, Glimms Mobile, FixAm, CivicVote, SocialLite | — | backend / unpublished mobile → GitHub only, confirmed by owner |

**Result: 15 of 15 projects ship with at least one working link — 9 live deployments
(all fetched-and-confirmed) plus 15 source repositories.** HiLink Travel was
removed from the grid at the owner's request; it was live, not dead.

### 4.2 Owner-confirmed exception — resolved

`petroelemites-beige.vercel.app` returned `404 DEPLOYMENT_NOT_FOUND` on 2026-09-08
(re-probed three times, alongside `petroelemites.vercel.app` — also 404 — and
`petroelemites.com`, which serves only an Apache "It works!" page). It was briefly
shipped as an `OWNER_CONFIRMED` exception, then superseded the same day when the
owner supplied the replacement deployment `petroelemites-ltd.vercel.app`, which was
fetched and confirmed live — so it graduated to `VERIFIED_LIVE` and the exception
set is empty again. The dead `beige` host is kept in `KNOWN_DEAD` so it can never
be reintroduced silently. Re-probe before each deploy.

### 4.3 Copy corrections found during link verification

Chasing the URLs surfaced that several descriptions in the old data file were
invented, and had survived the redesign. Each was corrected against the project's
own README and GitHub language breakdown:

| Project | Was shipped as | Actually is |
| --- | --- | --- |
| Petroelemites | "Interactive WebGL study of mineral strata", tagged Three.js/WebGL/GLSL | Corporate landing page for **Petroelemites Investment Company Limited**, a registered Nigerian oil & gas investment company. React 19 + Vite + Tailwind 4 + Formspree + GA4. **No Three.js.** Moved Creative → Landing. |
| FixAm | "fashion discovery app with a recommendation feed" | "Lagos-first home services: book verified artisans, pay with Flutterwave, track the job." Expo + Supabase. |
| CivicVote | "Flutter client on Supabase" | **Expo / React Native** + Supabase, with substantial accessibility work. Not Flutter. |
| Glimms Mobile | tagged NativeWind | Expo Router + Zustand + TanStack Query, custom `ThemeProvider` |
| Garden Fairy Server | "background AI worker" | Express 5 + Mongoose: carts, atomic checkout with stock reservation, Flutterwave, delivery rates, reviews, admin surface. **No AI worker.** |
| The Colour Green | "Next.js" | **Vite 6** + React 19 + React Router 7 — `package.json` has no `next` dependency |
| Echoloft | tagged HTML/CSS/JS | TypeScript + React (per GitHub languages) |
| SocialLite | elaborate product narrative | Repo is a bare Vite template; narrative removed |

Lesson recorded here so it does not repeat: **the repo's own README is the source
of truth for what a project is.** The previous portfolio copy was not.

### 4.1 Verified identity & metrics (GitHub API)

`Lotanna Chuka` · `LottaCodr` · location **Nigeria** · `public_repos: 115` ·
`followers: 22` · total stars across all repos: **8** · most-starred repo:
`Health-Care-WebApp` (4★) · `blog` and `twitter_username` empty → **no LinkedIn/Twitter links shipped.**
Team credit confirmed on the Echoloft site: *Engr. Lotanna C. Iwuanyanwu — Software Engineer*,
*Joel C. Anih — UI/UX Designer*, *Noble Nnamani — Brand Designer*.

---

## 5. Sources

1. [Muzli — How to Build a UX Portfolio That Actually Gets You Hired (2026)](https://muz.li/blog/how-to-build-a-ux-portfolio-that-actually-gets-you-hired-2026/)
2. [Muzli — 60+ Best Portfolio 2026 UI/UX Inspiration](https://muz.li/inspiration/portfolio-website/)
3. [UX Design Institute — 8 UX portfolio tips & best practices](https://www.uxdesigninstitute.com/blog/8-ux-portfolio-best-practices/)
4. [Interaction Design Foundation — 7 design guidelines for a UX portfolio](https://ixdf.org/literature/article/ux-portfolio-website-builders)
5. [UX Folio — UX Case Study Design Tips (with real examples)](https://blog.uxfol.io/ux-portfolio-design-tips/)
6. [UX Playbook — Minto Pyramid case-study structure (2026)](https://uxplaybook.org/articles/ux-case-study-minto-pyramid-structure-guide)
7. [SitesPlaced — UI/UX designer portfolio, case-study first (2026)](https://sitesplaced.com/ui-ux-designer-portfolio)
8. [Anima — UI/UX portfolio design best practices](https://www.animaapp.com/blog/industry/ux-ui-portfolio-design-best-practices/)
9. [Wix — 7 best UX portfolios and what we can learn](https://www.wix.com/blog/ux-portfolio-examples)
10. [Vortex — Mobile-first design best practices for 2026](https://www.vortexwebinnovate.com/blog/mobile-first-design-best-practices-for-2026)
11. [MediaPlus — 20 responsive web design techniques (2026)](https://mediaplus.com.sg/responsive-web-design-best-practices/)
12. [DEV — Mobile CSS consistency: all best practices in 2026](https://dev.to/ohugonnot/mobile-css-consistency-all-best-practices-in-2026-4l5l)
13. [web-developpeur — Mobile CSS consistency (2026)](https://www.web-developpeur.com/en/blog/coherence-css-mobile-bonnes-pratiques)
14. [Orbix — Responsive web design best practices: SEO for mobile (2026)](https://www.orbix.studio/blogs/responsive-web-design-best-practices)
15. [Creator Concepts — Mobile web design essential guide (2026)](https://www.creatorconcepts.co.uk/blog-posts/mobile-web-design)
16. [FuturePeak — Responsive web design 2026 guide](https://futurepeakdigital.com/blog/responsive-web-design-guide-2026/)
17. [WCAG Pros — WCAG accessibility checklist guide](https://wcagpros.com/wcag-guidelines/wcag-accessibility-checklist-guide/)
18. [Deque — Web Accessibility Checklist (WCAG 2.2 AA)](https://media.dequeuniversity.com/en/docs/web-accessibility-checklist-wcag-2.2.pdf)
19. [Digital Applied — WCAG 2.2 audit checklist 2026](https://www.digitalapplied.com/blog/wcag-2-2-accessibility-audit-checklist-2026-reference)
20. [BrowserStack — WCAG compliance checklist](https://www.browserstack.com/accessibility-testing/compliance/wcag-compliance-checklist)
21. [yusmp — Web app accessibility & WCAG 2.2 in 2026](https://yusmpgroup.com/blog/web-app-accessibility-wcag-2026)
22. [AllAccessible — WCAG 2.2 compliance implementation roadmap](https://www.allaccessible.org/blog/wcag-22-compliance-checklist-implementation-roadmap)
