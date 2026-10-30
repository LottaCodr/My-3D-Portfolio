import { Suspense, lazy } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile, stats } from "../constants";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";
import { useCopyToClipboard } from "../lib/clipboard";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Pin,
  Spark,
} from "./ui/Icons";

/* The starfield costs a large share of the Three.js payload. Lazy-mount it
   after first paint so the hero text is never waiting on WebGL. */
const StarsCanvas = lazy(() => import("./canvas/Stars"));

const ease = [0.22, 1, 0.36, 1];

const focusAreas = [
  "React 19 and TypeScript",
  "Design systems that scale",
  "AI product surfaces",
];

function NowBuilding() {
  return (
    <a
      href="https://glimms-waitlist.vercel.app"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-lg border border-control bg-card p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-glow"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="eyebrow">Now building</p>
        <ArrowUpRight
          width={16}
          height={16}
          className="flex-none text-faint transition-colors group-hover:text-accent"
        />
      </div>

      <p className="mt-4 text-xl font-semibold tracking-tight text-fg">Glimms</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        AI styling built from the wardrobe, home and garden you already own.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Badge variant="success" size="sm" className="gap-1.5 normal-case tracking-normal">
          <span className="live-dot" aria-hidden="true" />
          Live
        </Badge>
        <Badge variant="muted" size="sm" className="normal-case tracking-normal">
          Waitlist
        </Badge>
      </div>
    </a>
  );
}

function FocusCard() {
  return (
    <div className="rounded-lg border border-linesoft bg-card p-5">
      <p className="eyebrow">Focus</p>
      <ul className="mt-4 space-y-2.5 text-sm text-muted">
        {focusAreas.map((area) => (
          <li key={area} className="flex items-start gap-2.5">
            <Spark width={13} height={13} className="mt-1 flex-none text-accent" />
            {area}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BaseCard() {
  return (
    <div className="rounded-lg border border-linesoft bg-card p-5">
      <p className="eyebrow">Based in</p>
      <p className="mt-4 flex items-center gap-2 text-sm font-medium text-fg">
        <Pin width={14} height={14} className="flex-none text-accent" />
        {profile.location}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        UTC+1, overlapping with GMT, CET and US East.
      </p>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const { copied, copy } = useCopyToClipboard();

  const rise = (delay) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.01 : 0.7, delay: reduce ? 0 : delay, ease },
  });

  return (
    /* `100svh`, not `100vh`, so mobile browser chrome does not push the CTA
       off-screen. No `w-screen` anywhere: that was the source of the old
       horizontal-scroll bug. See docs/ux-research-v2.md §6 */
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-[calc(var(--nav-h)+env(safe-area-inset-top))]"
    >
      <Suspense fallback={null}>
        <StarsCanvas />
      </Suspense>

      {/* Atmosphere: one warm light source, a blueprint grid that dissolves,
          and film grain. All decorative, all pointer-transparent. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(207,169,110,0.16) 0%, transparent 62%)",
          }}
        />
        <div className="grid-lines mask-radial absolute inset-0 opacity-60" />
        <div className="noise-overlay absolute inset-0" />
      </div>

      <div className="shell relative w-full py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-center lg:gap-16">
          {/* The 5-second test: who, what, proof, one primary action. */}
          <div>
            <motion.div
              className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm"
              {...rise(0.06)}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-success/25 bg-success/[0.08] px-3 py-1.5 text-xs font-medium text-success">
                <span className="live-dot" aria-hidden="true" />
                Available for new work
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                <Pin width={14} height={14} className="text-accent" />
                {profile.location}
              </span>
              <span className="mono text-[11px] text-faint">UTC+1</span>
            </motion.div>

            <motion.h1
              id="hero-title"
              className="mt-6 max-w-[19ch] text-fg"
              {...rise(0.12)}
            >
              <span className="block">{profile.name}.</span>
              <span className="serif mt-1 block text-[0.56em] font-normal italic leading-[1.06] text-accent">
                {profile.role}
              </span>
            </motion.h1>

            <motion.p className="lede mt-6" {...rise(0.2)}>
              {profile.pitch}
            </motion.p>

            <motion.div
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              {...rise(0.28)}
            >
              {/* One primary action; everything else is secondary. */}
              <Button asChild size="lg" className="group">
                <a href="#work">
                  See selected work
                  <ArrowRight
                    width={18}
                    height={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="#contact">Get in touch</a>
              </Button>
            </motion.div>

            <motion.div
              className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-faint"
              {...rise(0.36)}
            >
              <span>Replies within 24 hours</span>
              <span aria-hidden="true">·</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                github.com/{profile.handle}
              </a>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => copy(profile.email)}
                    aria-label={`Copy email address, ${profile.email}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-control text-faint transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {copied ? (
                      <Check width={15} height={15} className="text-success" />
                    ) : (
                      <Copy width={15} height={15} />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {copied ? "Copied to clipboard" : "Copy email address"}
                </TooltipContent>
              </Tooltip>
              <span role="status" aria-live="polite" className="sr-only">
                {copied ? "Email address copied to the clipboard." : ""}
              </span>
            </motion.div>
          </div>

          {/* Supporting bento, desktop only: on a phone these would push the
              actual 5-second test below the fold. */}
          <motion.div
            className="hidden gap-3 lg:grid"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.7, delay: reduce ? 0 : 0.3, ease }}
          >
            <NowBuilding />
            <div className="grid gap-3 sm:grid-cols-2">
              <FocusCard />
              <BaseCard />
            </div>
          </motion.div>
        </div>

        <motion.dl
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-linesoft pt-8 sm:mt-16 sm:grid-cols-4"
          {...rise(0.44)}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="tnum block text-[2rem] font-bold tracking-tight text-fg sm:text-[2.5rem]">
                  {stat.value}
                  {stat.suffix && <span className="text-accent">{stat.suffix}</span>}
                </span>
                <span className="mt-1 block text-sm text-muted">{stat.label}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {!reduce && (
        <motion.a
          href="#about"
          aria-label="Scroll to the About section"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint transition-colors hover:text-accent sm:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <span className="mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown width={16} height={16} />
          </motion.span>
        </motion.a>
      )}
    </section>
  );
}
