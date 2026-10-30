<p align="center">
  <img src="brand/logo.svg" alt="Mr. Lotta logo" width="96" height="96" />
</p>

<h1 align="center">Mr. Lotta: Full-Stack Software Engineer</h1>

<p align="center">
  React and TypeScript web platforms, mobile apps and AI pipelines.<br />
  15 shipped products, 9 of them live.
</p>

---

## What this is

A single-page portfolio, rebuilt twice against researched UX briefs. The research, the
audits and every decision behind the interface live in two documents:

| Document | What it covers |
| --- | --- |
| [`docs/ux-research.md`](docs/ux-research.md) | The 2026-09 audit: content integrity, verified links, contrast failures, mobile overflow, accessibility baseline |
| [`docs/ux-research-v2.md`](docs/ux-research-v2.md) | This pass: Figma community research, 2026 visual direction, Radix and shadcn component architecture, measured contrast, verification log |

Short version of the second pass:

| Area | Before | After |
| --- | --- | --- |
| Component layer | Hand-written classes per section | shadcn-style primitives in `src/components/ui`, styled with CVA and merged with `cn()` |
| Interactive behaviour | Bespoke where needed | Radix primitives for accordion, toggle group, dialog, tooltip, label, plus cmdk for the palette |
| Navigation | Four anchor links | Anchor links, active state, and a `Cmd/Ctrl+K` command palette over sections, projects and contact actions |
| Hero | Name, pitch, two buttons | Two-line type hierarchy, availability pill, single primary action, three-card bento on desktop, real metrics |
| Work | Filter buttons and cards | Radix ToggleGroup, visible result count, richer cards with status and featured badges |
| Case studies | Custom accordion | Radix Accordion inside one card, full WAI-ARIA keyboard model |
| Contact | Hand-rolled inputs | Label, input and textarea primitives, unchanged inline validation, copy-email with tooltip |
| Control boundaries | 1.59:1 border | `--border-control` at 3.29:1 or better on every surface |
| Em dashes | Present in copy, docs and assets | Zero, repo-wide |
| Deploy payload | 19 MB of unused 3D models in `public/` | Removed, `dist/` is 2.2 MB |

## Stack

- [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- [Radix Primitives](https://www.radix-ui.com/primitives) for accessible behaviour
- [shadcn/ui](https://ui.shadcn.com/) conventions: owned component source, CVA variants, `cn()`
- [cmdk](https://cmdk.paco.me/) for the command palette
- [Tailwind CSS v3](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) for animation
- [Three.js](https://threejs.org/) via [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) and [drei](https://github.com/pmndrs/drei)
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) for the test suite

## Getting started

```bash
npm install
npm run dev        # local dev server, bound to 0.0.0.0
npm run build      # production build, output in dist/
npm run preview    # serve the production build
npm run lint       # eslint, zero warnings allowed
npm test           # 39 tests: data integrity, a11y, structure, interaction, command palette
```

## Design system

Tokens are declared once as custom properties in [`src/index.css`](src/index.css) and
mirrored in [`tailwind.config.js`](tailwind.config.js). Every foreground/background pair
was computed with the WCAG relative-luminance formula and is recorded in
[`docs/ux-research-v2.md`](docs/ux-research-v2.md) §4.

| Token | Value | On `--bg` |
| --- | --- | --- |
| `--fg` | `#e8e6e3` | 15.86:1, AAA |
| `--muted` | `#a1a1aa` | 7.71:1, AAA |
| `--faint` | `#85858f` | 5.41:1, AA |
| `--accent` | `#cfa96e` | 8.99:1, AAA |
| `--border-control` | `#6b6b78` | 3.76:1, passes 1.4.11 |
| `--success` | `#7fd99a` | 11.56:1, AAA |
| `--danger` | `#f0a1a1` | 9.70:1, AAA |

Two border tokens, on purpose. `--border` and `--border-soft` are decorative hairlines for
card grouping and section rules. `--border-control` is the boundary of an interactive
control, where WCAG 1.4.11 requires at least 3:1 against the adjacent surface.

Type is fluid (`clamp()`), so one rule scales from 360px to 1920px with no breakpoint
cliffs. Spacing is a 4pt scale. Motion uses one easing curve,
`cubic-bezier(.22, 1, .36, 1)`, and collapses to a fade under `prefers-reduced-motion`.

### Component architecture

```
src/components/ui/     shadcn-style primitives, generic and content-free
  button.jsx  badge.jsx  card.jsx  accordion.jsx  dialog.jsx  tooltip.jsx
  command.jsx input.jsx  textarea.jsx  label.jsx  toggle-group.jsx
  Icons.jsx  Reveal.jsx  SectionHeading.jsx
src/components/        portfolio compositions (Hero, Works, CaseStudies, Contact, ...)
src/lib/               cn(), clipboard, in-page navigation
```

Primitives own appearance and interaction states. Compositions own content and layout.
`cn()` merges any call-site `className` last, so overriding a primitive never needs a
specificity fight.

## Keyboard

| Key | Action |
| --- | --- |
| `Cmd/Ctrl + K` | Open the command palette |
| `Esc` | Close the palette or the mobile menu, focus returns to the trigger |
| `Tab` | Trapped inside the mobile sheet and the palette |
| `Up` / `Down`, `Home` / `End` | Move between case studies |
| `Enter` / `Space` | Open or close the focused case study |

## Mobile

- No `w-screen` or `100vw` anywhere, enforced by a test that scans the source.
- `Tilt` disabled on `(hover: none), (pointer: coarse)`.
- Live and Code actions always rendered, never hover-gated, at least 44px tall.
- Full-screen nav sheet with scroll lock, `Esc` to close and focus return.
- `viewport-fit=cover` plus `env(safe-area-inset-*)` on the sticky header.
- `aspect-ratio: 16/10` on every cover, so zero layout shift on image load.
- Form inputs at 16px to stop iOS auto-zoom.

## Accessibility

Skip link as the first focusable element, `:focus-visible` rings, `scroll-padding-top` so
the floating header never obscures focus, semantic landmarks with real accessible names,
`aria-current` on the active nav link, `aria-expanded`/`aria-controls` on the accordion and
menu, `aria-live` on the filter count, form status and clipboard confirmations, and
`prefers-reduced-motion` honoured in both CSS and Framer Motion.

## Project assets

Covers live in [`src/assets/covers/`](src/assets/covers/) as WebP. To add one, drop a PNG
into that folder and run:

```bash
npm i --no-save sharp
node scripts/optimize-covers.mjs
```

It resizes to 1600x1000, re-encodes to WebP at around 45 KB, and removes the PNG. Projects
with no cover render a deterministic monogram tile instead of a placeholder image.

### Link policy

Every project entry carries a `source_code_link`, and a `live_url` only when that URL has
been confirmed reachable. Two URLs in an earlier version returned
`404 DEPLOYMENT_NOT_FOUND` and were removed rather than shipped as dead links. The
verification log is in [`docs/ux-research.md`](docs/ux-research.md) §4. Re-run it before
adding a deployment link.

## Brand and logo

The logo is a gold (`#cfa96e`) rounded tile carrying a geometric "L" monogram plus a
square accent. Masters live in [`brand/`](brand/):

| File | Purpose |
| ---- | ------- |
| `brand/logo.svg` | Vector mark, source of truth for the favicon and navbar/footer logo |
| `brand/og-image.svg` | Social and Open Graph card master |
| `brand/build-assets.mjs` | Regenerates the derived PNGs and `site.webmanifest` |

```bash
npm i --no-save @resvg/resvg-js @fontsource/inter
node brand/build-assets.mjs
```

## Copy rules

No em dashes, anywhere: not in interface copy, not in comments, not in documentation, not
in generated brand assets. Use a colon, a comma, parentheses or a full stop, whichever the
sentence actually needs. Ranges use plain hyphens.

## Deployment

Configured for [Genezio](https://genezio.com/), see `genezio.yaml` (`publish: dist`). Live
at <https://lotaport.vercel.app>.
