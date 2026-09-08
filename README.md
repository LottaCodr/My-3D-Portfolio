<p align="center">
  <img src="brand/logo.svg" alt="Mr. Lotta logo" width="96" height="96" />
</p>

<h1 align="center">Mr. Lotta — Full-Stack Software Engineer</h1>

<p align="center">
  React and TypeScript web platforms, mobile apps and AI pipelines.<br />
  16 shipped products, 10 of them live.
</p>

---

## What this is

A single-page portfolio rebuilt in September 2026 against a researched UX brief.
The research, the audit of the previous design, and every decision made from it
live in **[`docs/ux-research.md`](docs/ux-research.md)** — read that first if you
want to know *why* something looks the way it does.

Short version of what changed:

| Area | Before | After |
| --- | --- | --- |
| Hero | "Let's build something incredible" | Name, role and specialisation above the fold |
| Project links | 1 of 14 cards had a live URL, hover-only | 16 of 16 cards linked, always visible |
| Live URLs | 2 of 9 returned `404 DEPLOYMENT_NOT_FOUND` | 9 fetched-and-confirmed + 1 owner-confirmed |
| Thumbnails | SVG source saved with a `.png` extension | real WebP covers, 1600×1000, ~45 KB each |
| Copy | invented descriptions (Petroelemites as "WebGL art", FixAm as "fashion", CivicVote as "Flutter") | every project re-checked against its own README |
| Case studies | 13 shallow ones, all expanded | 5 deep ones, outcome-first accordion |
| Body-text contrast | `#71717a` → **4.09:1 (fails AA)** | `#a1a1aa` → **7.71:1 (AAA)** |
| Stats | 847 followers, 12 stars (invented) | real GitHub API numbers |
| Mobile | `w-screen` overflow, 700px hero, 340px fixed cards | no overflow 320px → 1920px |
| Accessibility | none | skip link, focus rings, ARIA, landmarks, reduced motion |

## Stack

- [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- [Three.js](https://threejs.org/) via [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) / [drei](https://github.com/pmndrs/drei)
- [Framer Motion](https://www.framer.com/motion/) for animation
- [Tailwind CSS v3](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) for the test suite

## Getting started

```bash
npm install
npm run dev        # local dev server (bound to 0.0.0.0)
npm run build      # production build → dist/
npm run preview    # serve the production build
npm run lint       # eslint
npm test           # 27 tests: data integrity, a11y, interaction
```

## Design system

Design tokens are declared once as custom properties in
[`src/index.css`](src/index.css) and mirrored in
[`tailwind.config.js`](tailwind.config.js). Contrast ratios for every
foreground/background pair were computed with the WCAG relative-luminance
formula and are recorded in [`docs/ux-research.md`](docs/ux-research.md) §2.2.

| Token | Value | On `--bg` |
| --- | --- | --- |
| `--fg` | `#e8e6e3` | 15.86:1 — AAA |
| `--muted` | `#a1a1aa` | 7.71:1 — AAA |
| `--faint` | `#85858f` | 5.02:1 — AA |
| `--accent` | `#cfa96e` | 8.99:1 — AAA |

Type is fluid (`clamp()`) so a single rule scales from 360px to 1920px with no
breakpoint cliffs. Spacing is a 4pt scale. One button component, one section
heading, one chip — reused everywhere rather than re-inlined per section.

## Mobile

- No `w-screen` or `100vw` anywhere — enforced by a test that scans the source.
- `Tilt` disabled on `(hover: none), (pointer: coarse)`.
- Live/Code buttons always rendered, never hover-gated, ≥ 44px tall.
- Full-screen nav sheet with scroll-lock, `Esc` to close and focus return.
- `viewport-fit=cover` + `env(safe-area-inset-*)` on the sticky header.
- `aspect-ratio: 16/10` on every cover, so zero layout shift on image load.
- Form inputs at 16px to stop iOS auto-zoom.

## Accessibility

Skip link as the first focusable element · `:focus-visible` rings ·
`scroll-padding-top` so the sticky header never obscures focus · semantic
landmarks · `aria-current` on the active nav link · `aria-expanded`/`aria-controls`
on the accordion and menu · `aria-live` on the filter count and form status ·
`prefers-reduced-motion` honoured in both CSS and Framer Motion.

## Project assets

Covers live in [`src/assets/covers/`](src/assets/covers/) as WebP. To add one,
drop a PNG into that folder and run:

```bash
npm i --no-save sharp
node scripts/optimize-covers.mjs
```

It resizes to 1600×1000, re-encodes to WebP at ~45 KB, and removes the PNG.
Projects with no cover render a deterministic monogram tile instead of a
placeholder image.

### Link policy

Every project entry carries a `source_code_link`, and a `live_url` **only when
that URL has been confirmed reachable**. Two URLs in the previous version
returned `404 DEPLOYMENT_NOT_FOUND` and were removed rather than shipped as
dead links. The verification log is in
[`docs/ux-research.md`](docs/ux-research.md) §4 — re-run it before adding a
deployment link.

## Brand & logo

The logo is a gold (`#cfa96e`) rounded tile carrying a geometric "L" monogram
plus an aligned square accent. Masters live in [`brand/`](brand/):

| File | Purpose |
| ---- | ------- |
| `brand/logo.svg` | Vector mark — source of truth for the favicon & navbar/footer logo |
| `brand/og-image.svg` | Social / Open Graph card master |
| `brand/build-assets.mjs` | Regenerates the derived PNGs + `site.webmanifest` |

```bash
npm i --no-save @resvg/resvg-js @fontsource/inter
node brand/build-assets.mjs
```

## Deployment

Configured for [Genezio](https://genezio.com/) — see `genezio.yaml`
(`publish: dist`). Live at <https://lotaport.vercel.app>.
