# UI/UX research and upgrade brief, v2

**Date:** 2026-10-30 · **Subject:** `LottaCodr/My-3D-Portfolio` · **Scope:** Figma-community design-system research, UI/UX audit, component architecture upgrade, implementation record.

This is the second research pass. The first one (`docs/ux-research.md`, dated 2026-09-08)
established the content, accessibility and link-integrity baseline. This pass is about
**craft**: how the best Figma community files are actually built, what the 2026 UI
consensus looks like, and how to move the site from "well-organised custom CSS" to a
**token-driven, primitive-backed component system** without losing any of the
accessibility work already done.

---

## 1. Method

Three source groups, reviewed on 2026-10-30:

| Group | What was read | Why |
| --- | --- | --- |
| Figma community files and the writing around them | Untitled UI, the shadcn/ui Figma kit, the Radix UI Themes kit, Airfolio, Picto, Kevin, Onaport, Dossier | To extract the structural conventions that make community files work: variables, auto layout, component properties, responsive frames |
| Component and primitive documentation | shadcn/ui docs (Accordion pattern), Radix Primitives (zero styles, customisation), cmdk, Vercel's shadcn vs Radix comparison | To choose the right layer for behaviour versus styling |
| 2026 trend and portfolio research | Inspire Fusion, Empire UI (portfolio hero layouts), MySeera (developer portfolio templates), Sayenko, plus the 2026 portfolio and WCAG material already cited in v1 | To separate durable patterns from fashion |

Everything below is traced to an implementation in this repository. Statements without a
code reference are either source findings or explicit non-goals.

---

## 2. What the best Figma community files actually do

Six conventions show up in nearly every file rated "professional" rather than "pretty".
Each one is quoted below with what changed here as a result.

### 2.1 Variables first, styles second

Untitled UI is described as the benchmark because colour, spacing, radius, typography and
effects are Figma **Variables**, not static styles; that is what makes theme switching and
one-file re-branding possible. The 2026 guidance is blunt: "any UI kit that still uses
static color styles instead of Figma Variables is already outdated" ([Muzli, best Figma UI
kits 2026](https://muz.li/blog/best-figma-ui-kits-and-design-systems-for-2026/),
[UI Things](https://uithings.com/free-figma-ui-kits)).

**Adopted:** tokens were already custom properties, so the work was to make them
*complete*: a control-border token, a status pair, a focus ring, translucent surface
tokens, and an elevation scale. One declaration site (`src/index.css`), mirrored in
`tailwind.config.js`, and nothing hard-coded in a component.

### 2.2 Auto layout is a spacing contract

Auto Layout is how a Figma file survives editing. Its code equivalent is a single spacing
scale plus one `shell` / `section` rhythm. The old file had one place for this and it was
right; it was left intact.

**Adopted:** 4pt spacing scale, fluid `--space-section` with `clamp()`, and every new
surface composed from the same `Card`, `Button` and `Badge` primitives rather than
re-declared per section.

### 2.3 Dark mode is a system, not an inversion

The 2026 Figma guidance separates kits that treat dark mode as "a full variable mode with
its own contrast ratios, elevation values and color mappings" from kits that invert
colours ([Muzli](https://muz.li/blog/best-figma-ui-kits-and-design-systems-for-2026/)).
This site is dark-first by identity, so the useful part of that finding is *elevation*:
surfaces step `#0a0a0f` (page) to `#14141a` (card) to `#1a1a23` (raised), and shadows do
the work that borders would do in a light theme.

**Adopted:** three surface levels, a `--surface` / `--surface-hover` pair for translucent
layers, and a `shadow-glow` used only on hover of an interactive card.

### 2.4 Responsive frames, not one desktop artboard

Community portfolio templates that are rated well (Airfolio, Picto, Kevin, Onaport) ship
mobile and tablet frames; the failure mode called out repeatedly is a desktop-only file
left for the developer to interpret ([TNC Flow, best Figma portfolio
templates](https://tncflow.com/best-figma-portfolio-templates/)). Kevin's listing is
specific about the inventory: 99+ components, 32+ sections, 180+ font styles, 60+ colour
styles ([Figma Community](https://www.figma.com/community/file/1271767603134076458/kevin-personal-portfolio-website-figma-template-community)).

**Adopted:** every new section has a defined mobile composition, not a squeezed desktop
one. The hero's supporting bento is desktop-only by design, because on a phone those cards
would push the actual five-second test below the fold.

### 2.5 Bento for scanning, not for decoration

Bento grids are the most widely adopted layout pattern of 2026 precisely because they
match scanning rather than reading, and CSS subgrid made them practical
([Inspire Fusion](https://www.inspirefusion.com/web-design-inspiration-trends-2026/),
[Sayenko](https://www.sayenkodesign.com/web-design-trends-2026-whats-worth-using-on-your-business-website/)).
The portfolio-specific version is a hero with three to six cards where each card earns its
place: name and role, availability, stack, current build ([Empire UI, portfolio hero
layouts](https://empire-ui.com/blog/portfolio-hero-designs)). The same source is clear that
"a card that just shows your city or a quote from someone on LinkedIn is wasting valuable
real estate".

**Adopted:** a hero bento with exactly three cards, each carrying information a reviewer
needs: what is being built now (with a live badge), the technical focus, and the working
timezone. No decorative tiles.

### 2.6 Editorial typography does the differentiating

The 2026 trend coverage is consistent that oversized, expressive display type is now the
primary identity tool, after years of neutral Inter-and-Roboto sameness
([Sayenko](https://www.sayenkodesign.com/web-design-trends-2026-whats-worth-using-on-your-business-website/),
[Inspire Fusion](https://www.inspirefusion.com/web-design-inspiration-trends-2026/)).

**Adopted:** the existing pairing was kept (Inter for UI, Instrument Serif italic for the
role line, JetBrains Mono for labels) because it is already the strongest part of the
identity. What changed is hierarchy: the name and role are now two distinct lines at
different scales instead of one sentence, and every section opens with an index, a rule
and an eyebrow.

---

## 3. Component architecture: why shadcn plus Radix, and where each belongs

The 2026 consensus is stable. **Radix supplies behaviour** (ARIA, focus management,
keyboard model) and **shadcn supplies an ownership model** (the component source lives in
this repository, styled with Tailwind and CVA), with `cn()` merging call-site overrides
([Vercel, shadcn/ui vs Radix UI](https://vercel.com/i/shadcn-vs-radix),
[DesignRevision](https://designrevision.com/blog/shadcn-ui-guide)). Radix Primitives ship
zero styles: semantic HTML, ARIA attributes, data attributes and event handlers, with
styling left entirely to the project
([Radix customisation docs](https://www.mintlify.com/radix-ui/primitives/concepts/customization)).

That split decides every choice below.

| Primitive | Used in | Why this one |
| --- | --- | --- |
| `@radix-ui/react-accordion` | Case studies | WAI-ARIA accordion keyboard model (Up/Down/Home/End, Enter/Space), correct heading/region wiring, and a published `--radix-accordion-content-height` so the open/close animation needs no measured pixels ([shadcn accordion](https://ui.shadcn.com/docs/components/radix/accordion)) |
| `@radix-ui/react-toggle-group` | Work filters | Renders items as real buttons with `aria-pressed`, so the visual pressed state and the announced state cannot drift |
| `@radix-ui/react-dialog` | Command palette | Focus trap, Escape, focus return and background inerting are primitive concerns, not bespoke code |
| `@radix-ui/react-tooltip` | Copy-email controls | Supplementary labels only; every trigger also has an accessible name, so touch and screen-reader users lose nothing |
| `@radix-ui/react-label` | Contact form | A real `for`/`id` pair and a clickable label, not a styled span |
| `@radix-ui/react-slot` | `Button asChild` | Lets an `<a>` inherit button styling without nesting interactive elements |
| `cmdk` | Command palette list | Headless listbox: arrow keys, `aria-activedescendant`, filtering ([cmdk guide](https://codingdunia.com/ui-components/cmdk/)) |
| `class-variance-authority`, `clsx`, `tailwind-merge` | Every primitive | Variants as data plus conflict-free `className` composition |

### 3.1 The deliberate exception: the mobile menu

The mobile sheet stays hand-built. It implements the WAI-ARIA dialog pattern directly
(scroll lock, focus moved in, Tab trapped, Escape closes with focus return, background
`inert`), and its behaviour is covered by four tests, including a `matchMedia` resize test
that closes the sheet before `md:hidden` can strand the scroll lock. Swapping in a Radix
Dialog here would have replaced tested behaviour with untested behaviour for no user-facing
gain. Radix is used where it adds a keyboard model this project did not already implement.

### 3.2 Shape language: pills are a deliberate rarity

The community kits reviewed lean on fully rounded controls, which is why pill-shaped
buttons now read as the default of a generic component library rather than as a decision.
The portfolio templates that hold up are more editorial: rectangular tags, squared
controls, generous card radii, and a single full-width piece of chrome. The shape scale
below replaces the previous "everything is a pill" approach.

| Surface | Radius | Rationale |
| --- | --- | --- |
| Tag / badge | 6px | Reads as a label, not a button, so status chips stop competing with actions |
| Button, input, toggle, icon button, accordion indicator | 10px | Soft rectangle: unmistakably pressable without the capsule silhouette |
| Tooltip, keyboard hint | 4 to 6px | Small surfaces look wrong with large radii |
| Card, panel | 14 to 20px | The one place generous curvature is earned |
| Dots and progress lines | 999px | A dot has to be round; nothing else does |

Two consequences worth calling out. The floating capsule navbar is now a full-width bar
with a hairline border and blur on scroll, which is calmer over a full-bleed hero. The hero
availability marker is plain text with a status dot instead of a bordered pill, so the
primary call to action is the only button-shaped object in the fold.

### 3.3 File layout

```
src/
  components/
    ui/            shadcn-style primitives (owned source, never imported from a package)
      button.jsx  badge.jsx  card.jsx  accordion.jsx  dialog.jsx  tooltip.jsx
      command.jsx input.jsx  textarea.jsx  label.jsx  toggle-group.jsx
      Icons.jsx  Reveal.jsx  SectionHeading.jsx
    Navbar.jsx  Hero.jsx  About.jsx  Works.jsx  CaseStudies.jsx  Contact.jsx
    CommandPalette.jsx  Footer.jsx  Marquee.jsx  ScrollProgress.jsx
  lib/           cn(), clipboard, in-page navigation
  hoc/           SectionWrapper
```

Primitives under `components/ui` stay generic and unopinionated about content. Anything
that knows about the portfolio (a project card, a case study, the palette's command list)
lives one level up.

---

## 4. Design tokens and measured contrast

Computed with the WCAG relative-luminance formula against the three real surfaces.
`--bg #0a0a0f`, `--card #14141a`, `--card-hi #1a1a23`.

| Token | Value | On bg | On card | On card-hi | Verdict |
| --- | --- | --- | --- | --- | --- |
| `--fg` | `#e8e6e3` | 15.86:1 | 14.73:1 | 13.86:1 | AAA |
| `--muted` | `#a1a1aa` | 7.71:1 | 7.16:1 | 6.74:1 | AAA |
| `--faint` | `#85858f` | 5.41:1 | 5.02:1 | 4.73:1 | AA |
| `--accent` | `#cfa96e` | 8.99:1 | 8.35:1 | 7.86:1 | AAA |
| `--success` | `#7fd99a` | 11.56:1 | 10.74:1 | 10.11:1 | AAA |
| `--danger` | `#f0a1a1` | 9.70:1 | 9.01:1 | 8.49:1 | AAA |
| `--on-accent` | `#0a0a0f` on `--accent` | 8.99:1 | n/a | n/a | AAA |
| `--border-control` | `#6b6b78` | 3.76:1 | 3.49:1 | 3.29:1 | Passes 1.4.11 |

**The new token that matters:** `--border-control`. The previous border (`#33333f`) is
1.59:1 against the page. That is fine for a decorative hairline, but WCAG 1.4.11 requires
3:1 for the visual information that identifies a user interface component. Every outlined
control (text input, textarea, secondary and outline buttons, toggle chips, icon buttons,
accordion indicator, full-card links) now uses `--border-control`; card grouping and
section rules keep the low-contrast hairline, and the distinction is named in the token
comment so it does not drift.

Focus is a 2px accent ring with a 3px offset everywhere, including inside Radix
primitives, where the shared `:focus-visible` style is left in place instead of being
outlined away.

---

## 5. Findings, mapped to changes

### 5.1 Hero

| Finding | Before | Now |
| --- | --- | --- |
| Five-second test: name, role, proof, one primary action | Name and role ran together in one sentence | Two-line typographic hierarchy, availability pill, one primary CTA, one secondary, response-time and timezone proof |
| Bento is scannable, but only if every tile earns its place | No supporting information near the fold | Three cards: Now building (Glimms, live badge), Focus, Based in |
| The page should survive a phone | Right column would crowd the fold | Supporting cards are `hidden lg:grid`; mobile keeps name, role, pitch, CTAs and real stats |
| Copy-to-clipboard is a low-friction contact path | Only a mailto link | Hero and contact both expose a copy control with a Radix tooltip and an `aria-live` confirmation |

### 5.2 Navigation and command palette

| Finding | Before | Now |
| --- | --- | --- |
| Reviewers scan; every destination should be one action away | Four nav links | Same links plus a command palette on `Cmd/Ctrl+K`, reachable from a visible navbar trigger |
| Power users expect `Cmd+K` to be global and forgiving | No keyboard route | Palette filters sections, live projects, source-only repositories, copy-email, GitHub and WhatsApp ([cmdk](https://codingdunia.com/ui-components/cmdk/)) |
| Navigation must announce position | Underline only | `aria-current` retained, active state now has both colour and geometry, and section landmarks got the `aria-labelledby` id they were missing |

### 5.3 Selected work

| Finding | Before | Now |
| --- | --- | --- |
| Filters are a control, so they need control semantics | Native buttons with `aria-pressed` | Radix ToggleGroup, still `aria-pressed`, now with roving state and one source of truth |
| Result count should be visible, not only announced | Screen-reader-only count | Visible "Showing 15 of 15" plus the existing live region |
| Cards scan as a set | Mixed internal spacing | shadcn `Card` with reserved 16:10 cover, year and live badges, featured badge, index, tag badges, always-visible actions |
| Hover is not an interaction on touch | Tilt already disabled on coarse pointers | Unchanged, and the tilt wrapper now preserves the card ref for layout animation |

### 5.4 Case studies

| Finding | Before | Now |
| --- | --- | --- |
| Reviewers read one study, not five | Custom accordion with a hand-written focus model | Radix Accordion inside one Card: one open at a time, full WAI-ARIA keyboard model, height animation from the primitive's CSS variable |
| Outcome must lead | Outcome in the collapsed trigger | Kept, now with a visible metrics row as the first thing inside the panel |

### 5.5 Contact

| Finding | Before | Now |
| --- | --- | --- |
| Inline validation is not optional | Hand-rolled inputs | `Input`, `Textarea` and Radix `Label` primitives with `aria-invalid` styling and unchanged error copy |
| Errors must never be colour-only | Icon plus text | Icon plus text, `aria-describedby`, focus moved to the first invalid field |
| Status must be announced without stealing focus | `aria-live` line | Kept, plus a copy-email confirmation in a separate live region |

### 5.6 Copy policy

Every em dash in the repository, documentation and generated assets was removed. Colons,
commas, parentheses and full stops replace them, chosen per sentence rather than by a
global find and replace. Ranges that used en dashes are now plain hyphens. The rule going
forward: **no em dashes anywhere in shipped copy, comments or docs.**

---

## 6. Accessibility contract

Target: WCAG 2.2 AA, with the following specifics enforced in code and tests.

| Requirement | Implementation |
| --- | --- |
| 2.4.1 Bypass blocks | Skip link is the first focusable element, asserted by a test |
| 1.4.3 / 1.4.11 | Every foreground pair measured in §4; interactive boundaries use `--border-control` |
| 2.4.7 / 2.4.11 | Shared `:focus-visible` ring, `scroll-padding-top` under the floating nav |
| 2.5.8 Target size | 44px minimum on all controls; icon buttons are 44x44 |
| 4.1.2 Name, role, value | Radix roles and states; no `div` click handlers |
| 4.1.3 Status messages | Filter count, form status, copy confirmations are live regions |
| 1.3.1 / 2.4.6 | Every section landmark has the heading id it advertises; one `h1`; explicit heading levels |
| Reduced motion | CSS media query plus Framer Motion `useReducedMotion` on every animation, and accordion height animation degrades under the same rule |

Keyboard routes worth knowing: `Cmd/Ctrl+K` opens the palette, `Esc` closes palette and
mobile sheet, arrow keys and `Home`/`End` work inside the accordion, `Tab` is trapped in
the mobile sheet and restored to its trigger on close.

---

## 7. Motion and performance

* **One easing curve.** `cubic-bezier(.22, 1, .36, 1)` for entrances, 200ms for state
  changes. Nothing bounces.
* **Radix data attributes drive animation.** Accordion uses
  `--radix-accordion-content-height`; the dialog animates the independent `scale` property
  so it never fights the `translate` used for centring.
* **Heavy work stays lazy.** Three.js is a 220 kB gzipped chunk fetched only when the hero
  canvas mounts.
* **Vendor chunks are split by change frequency** (`react`, `motion`, `ui`, `three`) so a
  portfolio copy edit does not invalidate the framework chunk in visitors' caches.
* **Dead assets removed.** `public/` carried 19 MB of unreferenced Sketchfab models
  (`planet/`, `desktop_pc/`) left over from the original template. They were copied into
  every deployment and downloaded by nobody. Removing them takes `dist/` from 21 MB to
  2.2 MB. They remain in git history at commit `bef0727` if the 3D work resumes.
* **Hover effects are additive.** No information or action depends on hover.

---

## 8. What was deliberately rejected

| Idea | Why not |
| --- | --- |
| Light mode toggle | The identity is dark-first and gold. A light mode needs its own contrast pass and elevation system, not an inversion, which the Figma research is explicit about ([Muzli](https://muz.li/blog/best-figma-ui-kits-and-design-systems-for-2026/)). Recorded as future work, not faked. |
| Testimonials section | No real quotes exist. Inventing them would repeat the credibility problem the v1 audit fixed. |
| 3D tilt on every surface | Fights touch scrolling and adds nothing on a phone, which is most of the traffic. Tilt stays on project cards, pointer devices only. |
| Scroll hijacking or pinned horizontal sections | The content is a document. Reviewers scan it; stolen scroll is hostile. |
| More sections | The 2026 guidance is "fewer sections, more depth" ([MySeera](https://myseera.com/blog/best-developer-portfolio-templates-2026)). Five sections is the ceiling. |
| Removing the marquee | It is one CSS animation carrying stack information. Cheap, and it demonstrates the tech without a heavy WebGL scene. |

---

## 9. Verification

| Check | Result |
| --- | --- |
| `npm test` | 39 tests pass: data integrity, rendered accessibility, mobile dialog behaviour, contact validation, filter interaction, accordion state, command palette open/filter/copy/close |
| `npm run lint` | Clean, `--max-warnings 0` |
| `npm run build` | Clean, no chunk-size warning, vendors split into `react` / `motion` / `ui` / lazy `three` |
| `w-screen` / `100vw` scan | Zero occurrences in source, enforced by a test |
| Em dash scan | Zero occurrences anywhere in the repository, including the removed binary assets |
| Deploy payload | `dist/` is 2.2 MB, down from 21 MB of mostly unused 3D models |

---

## 10. Sources

1. [Muzli: Best Figma UI Kits and Design Systems for 2026](https://muz.li/blog/best-figma-ui-kits-and-design-systems-for-2026/)
2. [UI Things: 10 Best Free Figma UI Kits for 2026](https://uithings.com/free-figma-ui-kits)
3. [Line25: Free Figma Templates and UI Kits 2026](https://line25.com/articles/free-figma-templates-ui-kits-2026/)
4. [TNC Flow: Best Figma Portfolio Templates (2026)](https://tncflow.com/best-figma-portfolio-templates/)
5. [Figma Community: Kevin personal portfolio template](https://www.figma.com/community/file/1271767603134076458/kevin-personal-portfolio-website-figma-template-community)
6. [shadcn/ui for Figma kit overview](https://www.shadcndesign.com/blog/best-ui-kits-in-2025)
7. [Vercel: shadcn/ui vs Radix UI](https://vercel.com/i/shadcn-vs-radix)
8. [DesignRevision: shadcn UI complete guide (2026)](https://designrevision.com/blog/shadcn-ui-guide)
9. [Dualite: best React UI libraries in 2026](https://dualite.dev/blogs/best-react-ui-libraries)
10. [Radix Primitives: customisation and zero styles](https://www.mintlify.com/radix-ui/primitives/concepts/customization)
11. [shadcn/ui: Accordion](https://ui.shadcn.com/docs/components/radix/accordion)
12. [cmdk: component library guide](https://codingdunia.com/ui-components/cmdk/)
13. [Inspire Fusion: web design trends 2026](https://www.inspirefusion.com/web-design-inspiration-trends-2026/)
14. [Sayenko: web design trends 2026](https://www.sayenkodesign.com/web-design-trends-2026-whats-worth-using-on-your-business-website/)
15. [Empire UI: portfolio hero layouts for developers in 2026](https://empire-ui.com/blog/portfolio-hero-designs)
16. [MySeera: developer portfolio templates 2026](https://myseera.com/blog/best-developer-portfolio-templates-2026)
17. [Muzli: How to build a UX portfolio that gets you hired (2026)](https://muz.li/blog/how-to-build-a-ux-portfolio-that-actually-gets-you-hired-2026/)
18. [UX Playbook: Minto pyramid case-study structure](https://uxplaybook.org/articles/ux-case-study-minto-pyramid-structure-guide)
19. [Deque: Web Accessibility Checklist (WCAG 2.2 AA)](https://media.dequeuniversity.com/en/docs/web-accessibility-checklist-wcag-2.2.pdf)
20. [Digital Applied: WCAG 2.2 audit checklist 2026](https://www.digitalapplied.com/blog/wcag-2-2-accessibility-audit-checklist-2026-reference)
