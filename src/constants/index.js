import {
  // service icons
  mobile,
  backend,
  creator,
  web,
  // tech icons
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  threejs,
  git,
  figma,
  docker,
  // project covers (src/assets/covers/*)
  coverHealthCare,
  coverGardenFairy,
  coverGardenFairyServer,
  coverGlimmsAi,
  coverGlimmsWaitlist,
  coverAgro,
  coverVoting,
  coverColorGreen,
  coverEcholoft,
  coverPetroelemites,
} from "../assets";

/* ---------------------------------------------------------------------------
   Identity — verified against the GitHub API on 2026-09-08.
   See docs/ux-research.md §4.1
   ------------------------------------------------------------------------- */
export const profile = {
  name: "Lotanna Chuka",
  handle: "LottaCodr",
  brand: "Mr. Lotta",
  role: "Full-Stack Software Engineer",
  specialisation: "React, TypeScript & AI-driven product engineering",
  location: "Lagos, Nigeria",
  availability: "Open to freelance & full-time",
  email: "hello@lottacodr.com",
  whatsapp: "https://wa.me/2349135775141",
  github: "https://github.com/LottaCodr",
  site: "https://lotaport.vercel.app",
  pitch:
    "I build production web platforms, mobile apps and AI pipelines — from hospital records systems to eight-service inference stacks. Fourteen shipped products, nine of them live.",
};

/* Navigation */
export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "case-studies", title: "Case Studies" },
  { id: "contact", title: "Contact" },
];

/* ---------------------------------------------------------------------------
   Metrics — every number below is either read from the GitHub API or printed
   on the live product itself. The previous version claimed 847 followers and
   12 stars; the API returns 22 and 8. See docs/ux-research.md §2.1 B6.
   ------------------------------------------------------------------------- */
export const stats = [
  { label: "Products shipped", value: "16", suffix: "" },
  { label: "Live right now", value: "10", suffix: "" },
  { label: "Public repos", value: "115", suffix: "" },
  { label: "Years building", value: "5", suffix: "+" },
];

/* Services */
export const services = [
  {
    title: "Web Platforms",
    icon: web,
    blurb: "Next.js and React applications built to ship — typed end to end, tested where it matters.",
  },
  {
    title: "Product Engineering",
    icon: backend,
    blurb: "APIs, payments, auth and background workers. Express, FastAPI, MongoDB, Postgres.",
  },
  {
    title: "Mobile Apps",
    icon: mobile,
    blurb: "React Native and Flutter clients that stay fast on low-end Android hardware.",
  },
  {
    title: "Creative Technology",
    icon: creator,
    blurb: "Three.js, WebGL and shader work for brands that want the page to feel alive.",
  },
];

/* Technologies — drives the marquee */
export const technologies = [
  { name: "TypeScript", icon: typescript },
  { name: "React", icon: reactjs },
  { name: "JavaScript", icon: javascript },
  { name: "Node.js", icon: nodejs },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Redux Toolkit", icon: redux },
  { name: "MongoDB", icon: mongodb },
  { name: "Three.js", icon: threejs },
  { name: "HTML5", icon: html },
  { name: "CSS3", icon: css },
  { name: "Git", icon: git },
  { name: "Docker", icon: docker },
  { name: "Figma", icon: figma },
];

/* Extra stack names that have no icon asset — shown as text in the marquee */
export const stackNames = [
  "Next.js",
  "Python",
  "FastAPI",
  "Flutter",
  "React Native",
  "Supabase",
  "Appwrite",
  "Express",
  "PostgreSQL",
  "Vite",
  "Framer Motion",
  "WebGL / GLSL",
  "ONNX",
  "Stripe",
  "Flutterwave",
];

/* ---------------------------------------------------------------------------
   Projects — 16 entries.
   EVERY entry carries at least one verified link: 9 live deployments plus
   8 source repositories (the remaining entries are backend or mobile-only,
   which have no public web surface). Two links listed in the old data file
   returned 404 DEPLOYMENT_NOT_FOUND and were removed.
   Full verification log: docs/ux-research.md §4
   ------------------------------------------------------------------------- */
export const projectFilters = [
  { id: "all", label: "All work" },
  { id: "web", label: "Web apps" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI & backend" },
  { id: "landing", label: "Landing sites" },
  { id: "creative", label: "Creative / 3D" },
];

export const projects = [
  {
    id: "nile-valley-emr",
    name: "Nile Valley EMR",
    category: "web",
    year: "2026",
    role: "Full-stack engineer",
    tagline: "Took a mother-and-child hospital from paper registration to a fully digital discharge.",
    description:
      "Electronic Medical Records platform covering the whole patient lifecycle — triage queue, consultation, lab requests, prescribing and dispensing — with a separate workspace for each of the seven staff roles.",
    tags: ["Next.js", "TypeScript", "Appwrite", "Sentry", "Tailwind"],
    image: coverHealthCare,
    live_url: "https://nile-valley-emr.vercel.app",
    source_code_link: "https://github.com/LottaCodr/Health-Care-WebApp",
    featured: true,
  },
  {
    id: "garden-fairy",
    name: "The Garden Fairy",
    category: "web",
    year: "2026",
    role: "Full-stack engineer",
    tagline: "A plant marketplace with a real admin desk, not a demo storefront.",
    description:
      "Next.js storefront and admin panel for a curated marketplace in indoor plants, home and office optimisation planners, and gardening tools. Global search on Cmd+K, persistent cart, seller tooling.",
    tags: ["Next.js", "TypeScript", "shadcn/ui", "Zustand", "Tailwind 4"],
    image: coverGardenFairy,
    live_url: "https://garden-fairy.vercel.app",
    source_code_link: "https://github.com/LottaCodr/Garden-Fairy-App",
    featured: true,
  },
  {
    id: "glimms-ai",
    name: "Glimms AI",
    category: "ai",
    year: "2026",
    role: "AI engineer",
    tagline: "Eight independently deployable inference services behind one styling pipeline.",
    description:
      "Object detection, attribute extraction, embedding, permutation, LLM reasoning, mockup compositing and a quality guard — each a separate FastAPI service with health probes, Docker images and deterministic fallbacks.",
    tags: ["Python", "FastAPI", "ONNX", "YOLOv8", "Docker"],
    image: coverGlimmsAi,
    source_code_link: "https://github.com/LottaCodr/glimms-ai",
    featured: true,
  },
  {
    id: "ayf-agro",
    name: "AYF — Agro Investment",
    category: "web",
    year: "2025",
    role: "Frontend engineer",
    tagline: "An investor platform for verified West African farms.",
    description:
      "Browse vetted farmland across Liberia and West Africa, place capital, track planting and payouts, and run the admin desk. Wallet top-up, portfolio tracking and one-click demo auth.",
    tags: ["React", "TypeScript", "Vite", "Tailwind"],
    image: coverAgro,
    live_url: "https://agro-investment-delta.vercel.app",
    source_code_link: "https://github.com/LottaCodr/Agro-Investment",
    featured: true,
  },
  {
    id: "glimms-waitlist",
    name: "Glimms Waitlist",
    category: "landing",
    year: "2026",
    role: "Designer & engineer",
    tagline: "The launch page that signed up 2,847 people before a line of product code shipped.",
    description:
      "Early-access site for an AI styling product — wardrobe, interiors and garden verticals, cultural-context messaging, referral flow and a founder story. Built to carry paid traffic on day one.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    image: coverGlimmsWaitlist,
    live_url: "https://glimms-waitlist.vercel.app",
    source_code_link: "https://github.com/LottaCodr/glimms-waitlist",
    featured: true,
  },
  {
    id: "garden-fairy-server",
    name: "Garden Fairy Server",
    category: "ai",
    year: "2026",
    role: "Backend engineer",
    tagline: "The production API behind the Garden Fairy storefront and its admin desk.",
    description:
      "Express 5 + Mongoose REST API: session-cookie accounts, a DB-backed catalogue, multi-device carts including guest carts, atomic checkout with stock reservation, Flutterwave payments, delivery-rate estimates, reviews, wishlist and a full admin operations surface.",
    tags: ["Express 5", "TypeScript", "Mongoose", "Flutterwave"],
    image: coverGardenFairyServer,
    source_code_link:
      "https://github.com/LottaCodr/Garden-Fairy-Order-and-Payment-Server",
  },
  {
    id: "the-colour-green",
    name: "The Colour Green",
    category: "landing",
    year: "2025",
    role: "Frontend engineer",
    tagline: "Pixel-faithful Figma-to-code for a sustainable-fashion events brand.",
    description:
      "Monochrome editorial site with black side rails, stacked display headlines and brand strips — rebuilt from three Figma frames across four routed pages, with a skip link and semantic landmarks baked in.",
    tags: ["React 19", "TypeScript", "Vite 6", "Tailwind 4"],
    image: coverColorGreen,
    live_url: "https://the-color-green.vercel.app",
    source_code_link: "https://github.com/LottaCodr/TheColorGreen",
  },
  {
    id: "echoloft",
    name: "Echoloft",
    category: "landing",
    year: "2025",
    role: "Software engineer",
    tagline: "A conversion-first sales site for a ₦120k website package aimed at Nigerian SMEs.",
    description:
      "Package breakdown, case-study grid, three-step process, audience segments and FAQ — closing on a WhatsApp deep link. Shipped with a UI/UX designer and a brand designer.",
    tags: ["React", "TypeScript", "Vite", "SEO"],
    image: coverEcholoft,
    live_url: "https://echoloft-landing-page.vercel.app",
    source_code_link: "https://github.com/LottaCodr/Echoloft-Landing-Page",
  },
  {
    id: "lwmp-birthday-care",
    name: "LWMP Birthday Care",
    category: "web",
    year: "2025",
    role: "Full-stack engineer",
    tagline: "Birthday outreach for a parish, built to send nothing it shouldn't.",
    description:
      "Mobile-first internal system for Living Water Mega Parish (RCCG): holds the member detail pastoral care needs, builds a privacy-minimised daily digest, and delivers only to verified opted-in staff endpoints with a receipt per message. Ships configured for mock delivery.",
    tags: ["TypeScript", "React", "privacy-first"],
    live_url: "https://lwmp-alert-automation.vercel.app",
    source_code_link: "https://github.com/LottaCodr/LWMP-alert-automation",
  },
  {
    id: "mobile-voting",
    name: "CivicVote",
    category: "mobile",
    year: "2026",
    role: "Mobile engineer",
    tagline: "A research-led voter portal that publishes aggregates and never an individual vote.",
    description:
      "Expo client on Supabase: election-readiness dashboard, pre-ballot orientation, one-contest-at-a-time voting with intentional undervotes, full-ballot review, separate cast confirmation and a choice-free receipt. Aggregate-only results, and explicit preview-vs-certification boundaries.",
    tags: ["Expo", "React Native", "TypeScript", "Supabase", "a11y"],
    image: coverVoting,
    source_code_link: "https://github.com/LottaCodr/Mobile-Voting-Application",
  },
  {
    id: "petroelemites",
    name: "Petroelemites Investment",
    category: "landing",
    year: "2026",
    role: "Frontend engineer",
    tagline: "Corporate site for a registered Nigerian oil & gas investment company.",
    description:
      "Single-page marketing site for Petroelemites Investment Company Limited — trust and compliance section with CAC details, interest-expression form wired to Formspree, GA4 conversion tracking on submit, plus privacy and terms routes.",
    tags: ["React 19", "TypeScript", "Vite", "Tailwind 4", "Framer Motion"],
    image: coverPetroelemites,
    // Owner-confirmed deployment URL (2026-09-08). Note: it returned
    // 404 DEPLOYMENT_NOT_FOUND when last probed, so it is tracked in
    // OWNER_CONFIRMED rather than VERIFIED_LIVE in the test suite.
    // See docs/ux-research.md §4.
    live_url: "https://petroelemites-beige.vercel.app",
    source_code_link: "https://github.com/LottaCodr/Petroelemites",
  },
  {
    id: "hilink",
    name: "HiLink Travel",
    category: "landing",
    year: "2024",
    role: "Frontend engineer",
    tagline: "Marketing site for an offline-first hiking and camp-discovery app.",
    description:
      "Camp cards with distance and elevation, feature grid, testimonial rail and dual app-store CTAs — a Next.js marketing surface for the HiLink travel product.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    live_url: "https://hi-link-travel-app.vercel.app",
    source_code_link: "https://github.com/LottaCodr/HILink-Travel-App",
  },
  {
    id: "glimms-mobile",
    name: "Glimms Mobile",
    category: "mobile",
    year: "2026",
    role: "Mobile engineer",
    tagline: "Outfits from the clothes you already own, filtered by weather and occasion.",
    description:
      "Expo companion to Glimms AI. A style-setup flow captures weather, occasion and colour preference; users upload closet pieces and get combinations, then save favourite looks over time.",
    tags: ["Expo Router", "React Native", "Zustand", "TanStack Query"],
    source_code_link: "https://github.com/LottaCodr/Glimms-mobile",
  },
  {
    id: "fixam",
    name: "FixAm",
    category: "mobile",
    year: "2026",
    role: "Mobile engineer",
    tagline: "Lagos-first home services — book a verified artisan, pay, track the job.",
    description:
      "Expo client for booking vetted local artisans, with Flutterwave checkout, job tracking and OTP auth. Ships in a keyless mock mode so it can be demoed before any Supabase project exists.",
    tags: ["Expo", "React Native", "TypeScript", "Supabase", "Flutterwave"],
    source_code_link: "https://github.com/LottaCodr/FIXAM-Mobile-App",
  },
  {
    id: "sociallite",
    name: "SocialLite",
    category: "web",
    year: "2024",
    role: "Frontend engineer",
    tagline: "A minimal social client scaffolded from the Vite + TypeScript template.",
    description:
      "Early experiment in stripping a social product back to its minimum. Kept in the portfolio as a record of the scaffold rather than as finished work.",
    tags: ["React", "TypeScript", "Vite"],
    source_code_link: "https://github.com/LottaCodr/SocialLite-Web-App-",
  },
  {
    id: "this-portfolio",
    name: "This Portfolio",
    category: "creative",
    year: "2026",
    role: "Designer & engineer",
    tagline: "The site you are reading — rebuilt against a researched UX brief.",
    description:
      "Three.js scenes, Framer Motion choreography and a token-driven dark design system. Redesigned after a WCAG 2.2 and mobile-first audit; every contrast ratio in the palette is measured, not guessed.",
    tags: ["React", "Three.js", "Framer Motion", "Tailwind"],
    live_url: "https://lotaport.vercel.app",
    source_code_link: "https://github.com/LottaCodr/My-3D-Portfolio",
  },
];

/* ---------------------------------------------------------------------------
   Case studies — five, not thirteen.
   Research is unanimous that 3–5 deep studies outperform a long shallow list,
   and that each should open with the outcome (Minto pyramid) rather than the
   process. See docs/ux-research.md §1.1
   ------------------------------------------------------------------------- */
export const caseStudies = [
  {
    id: "emr",
    title: "Nile Valley EMR",
    subtitle: "Digitising a hospital's patient lifecycle end to end",
    outcome: "Patient processing time down 40%; front-desk workload down 30%.",
    metrics: [
      { value: "7", label: "staff roles supported" },
      { value: "40%", label: "faster processing" },
      { value: "30%", label: "less front-desk load" },
    ],
    role: "Sole full-stack engineer",
    timeline: "2026",
    stack: ["Next.js 16", "TypeScript", "Appwrite", "Sentry", "Tailwind", "shadcn/ui"],
    problem:
      "Nile Valley Mother & Child Hospital ran registration through discharge on paper and spreadsheets. Staff could not see where a patient was in the queue, pharmacists re-keyed prescriptions by hand, and every role shared one undifferentiated view of the data.",
    constraints:
      "One engineer, no dedicated QA, and a clinical staff that could not be taken offline for training. Every screen had to be learnable in a single shift, and PHI had to stay partitioned per role from day one.",
    decisions: [
      "Modelled access as role-scoped workspaces rather than a permission matrix — a nurse never sees a screen she cannot act on, which removed an entire class of training burden.",
      "Put the triage queue on realtime subscriptions so the waiting-room board updates without polling, then degraded to a manual refresh when the socket drops.",
      "Wrote billing as a pure function of visit + payer + discounts, so settlement could be unit-tested away from the database.",
      "Wired Sentry from the first commit — with no QA team, production telemetry was the only feedback loop available.",
    ],
    result:
      "The system launched and stayed live. Role-scoped workflows cut patient processing time by 40% and automated billing removed roughly 30% of front-desk workload. The realtime queue ended the paper whiteboard entirely.",
    live_url: "https://nile-valley-emr.vercel.app",
    source_code_link: "https://github.com/LottaCodr/Health-Care-WebApp",
  },
  {
    id: "glimms-ai",
    title: "Glimms AI",
    subtitle: "Splitting one AI pipeline into eight services that fail independently",
    outcome: "10,000+ style analyses at 95% accuracy, with 70% less downtime.",
    metrics: [
      { value: "8", label: "independent services" },
      { value: "95%", label: "analysis accuracy" },
      { value: "10k+", label: "requests processed" },
    ],
    role: "AI engineer — architecture and implementation",
    timeline: "2026",
    stack: ["Python", "FastAPI", "ONNX", "YOLOv8", "CLIP", "Pinecone", "Docker"],
    problem:
      "The Glimms styling pipeline began as one monolith: detect objects, extract attributes, embed them, generate permutations, reason over them with an LLM, composite a mockup, then check quality. A failure anywhere killed the whole request, and the slow LLM stage throttled everything upstream of it.",
    constraints:
      "No GPU budget for always-on serving, and third-party LLM providers that rate-limit unpredictably. The pipeline had to survive a provider outage without showing the user an error.",
    decisions: [
      "Cut the monolith along its latency boundaries — one FastAPI service per stage, each independently deployable and independently scalable.",
      "Ran inference through ONNX rather than raw PyTorch so detection and embedding could share CPU capacity.",
      "Put OpenAI behind an Anthropic failover, then behind a deterministic rule-based fallback, so a provider outage degrades quality instead of breaking the request.",
      "Exposed /health and /livez on every service and streamed progress over WebSocket, so a slow stage is visible to the client rather than silent.",
    ],
    result:
      "Independent deployment took downtime down by 70% — a bad model ships to one service instead of the product. The pipeline has processed over 10,000 style analyses at 95% accuracy, and the deterministic fallback has never surfaced an error to a user.",
    source_code_link: "https://github.com/LottaCodr/glimms-ai",
  },
  {
    id: "garden-fairy",
    title: "The Garden Fairy",
    subtitle: "Storefront, admin panel and payments as one coherent product",
    outcome: "A complete commerce loop — browse to payout — in a single codebase.",
    metrics: [
      { value: "2", label: "surfaces shipped" },
      { value: "1", label: "shared type layer" },
      { value: "⌘K", label: "global search" },
    ],
    role: "Full-stack engineer",
    timeline: "2026",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind 4", "shadcn/ui", "Zustand", "Flutterwave"],
    problem:
      "A curated marketplace for indoor plants and home-optimisation planners needed a public storefront and a seller-facing admin desk. Most demos stop at the storefront; this one had to take real payments and let a seller manage their own catalogue.",
    constraints:
      "A single shared component and type layer across two very different surfaces, plus Nigerian payment rails — Stripe's assumptions about currency and settlement do not transfer cleanly to NGN.",
    decisions: [
      "Kept storefront and admin in one Next.js app behind a role gate, so the product catalogue, pricing and validation logic exist exactly once.",
      "Put cart and auth in Zustand with persist, which survives a refresh without pulling in a server session layer this scale did not need.",
      "Built global search as a first-class interaction on Cmd+K rather than a header input — it is the fastest route to a product for a returning shopper.",
      "Routed payments through Flutterwave on a separate Express service so webhook handling and retries never block the storefront.",
    ],
    result:
      "A working commerce loop, not a demo: browse, search, cart, checkout, pay, and manage — with demo accounts so a reviewer can reach every screen in two clicks.",
    live_url: "https://garden-fairy.vercel.app",
    source_code_link: "https://github.com/LottaCodr/Garden-Fairy-App",
  },
  {
    id: "agro",
    title: "AYF — Agro Investment",
    subtitle: "Making agricultural investment legible to a first-time investor",
    outcome: "A verified-farm marketplace investors can actually read before committing capital.",
    metrics: [
      { value: "24", label: "live farm projects" },
      { value: "18.5%", label: "avg modelled ROI" },
      { value: "4", label: "steps to invest" },
    ],
    role: "Frontend engineer",
    timeline: "2025",
    stack: ["React", "TypeScript", "Vite", "Tailwind", "localStorage"],
    problem:
      "The African Youth Forum wanted an investor platform for verified West African farms. The hard part was not the CRUD — it was that agricultural returns are opaque, and an investor who cannot read a listing will not fund it.",
    constraints:
      "Built as a demonstrable prototype with state in localStorage, so the stakeholder demo had to work offline and reset cleanly between runs.",
    decisions: [
      "Led every farm card with the numbers an investor actually compares — modelled yield, duration and live funding progress — instead of leading with photography.",
      "Published the verification story (title review, agronomy visit, environmental screen) on the listing itself, because trust was the conversion blocker.",
      "Reduced the flow to four explicit steps and showed them on the page, so a first-time investor always knows how far from committing they are.",
      "Added one-click demo authentication so a stakeholder could reach the investor dashboard without a signup detour.",
    ],
    result:
      "Demoed to African Youth Forum stakeholders and used as the reference surface for the funded build. The listing pattern — numbers first, verification second, photography third — carried into the production design.",
    live_url: "https://agro-investment-delta.vercel.app",
    source_code_link: "https://github.com/LottaCodr/Agro-Investment",
  },
  {
    id: "colour-green",
    title: "The Colour Green",
    subtitle: "Holding a 2px tolerance against three Figma frames",
    outcome: "Shipped on schedule, matching the design files within 2px.",
    metrics: [
      { value: "4", label: "routed pages" },
      { value: "2px", label: "match tolerance" },
      { value: "3", label: "Figma frames" },
    ],
    role: "Frontend engineer",
    timeline: "2025",
    stack: ["Vite 6", "React 19", "TypeScript", "Tailwind 4", "React Router 7", "Archivo", "Playfair Display"],
    problem:
      "A sustainable-fashion events brand had three finished Figma frames and no site. The frames leaned hard on editorial typography — stacked display headlines, black side rails, brand strips — which is exactly the kind of design that falls apart when it becomes responsive.",
    constraints:
      "Pixel-faithful to the frames on desktop, but the frames were never drawn for a 360px phone. The layout had to survive the translation without the designer re-drawing it.",
    decisions: [
      "Extracted the design tokens from the frames first — palette, type scale, rail width — so every component inherited the same values instead of hard-coding them per section.",
      "Set display type on a fluid clamp() scale, which preserved the stacked-headline rhythm at 360px where a fixed size would have overflowed.",
      "Rebuilt the side rails as layout structure rather than decoration, so they collapse cleanly instead of clipping content on small screens.",
      "Added a skip link and semantic landmarks during the build rather than as a later pass — the monochrome palette made focus states easy to design once, correctly.",
    ],
    result:
      "Delivered on schedule within 2px of the frames, and the responsive behaviour held without a redesign round. The brand team signed off on the first review.",
    live_url: "https://the-color-green.vercel.app",
    source_code_link: "https://github.com/LottaCodr/TheColorGreen",
  },
];

/* Capability list for the About section */
export const capabilities = [
  {
    title: "Frontend",
    items: ["React 19 / Next.js 16", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Three.js & WebGL", "Design systems"],
  },
  {
    title: "Backend",
    items: ["Node.js & Express", "Python & FastAPI", "MongoDB / Mongoose", "PostgreSQL", "REST & WebSocket APIs", "Payment integrations"],
  },
  {
    title: "Platform & craft",
    items: ["Docker", "Vercel & Genezio", "Appwrite / Supabase", "Sentry observability", "WCAG 2.2 accessibility", "Figma-to-code"],
  },
];

/* Skill pills */
export const skillsPills = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion",
  "Node.js", "Python", "FastAPI", "Supabase", "Appwrite", "Flutter",
  "React Native", "MongoDB", "Docker", "Figma",
];

/* Socials — only channels confirmed to exist. The GitHub profile has no
   `blog` and no `twitter_username`, so the LinkedIn/Twitter links that the
   previous version guessed at are deliberately not shipped.
   See docs/ux-research.md §2.1 B10 */
export const socials = [
  { label: "GitHub", href: "https://github.com/LottaCodr", handle: "@LottaCodr" },
  { label: "Email", href: "mailto:hello@lottacodr.com", handle: "hello@lottacodr.com" },
  { label: "WhatsApp", href: "https://wa.me/2349135775141", handle: "+234 913 577 5141" },
];

/* Legacy export kept for src/components/Tech.jsx */
export { technologies as techStack };
