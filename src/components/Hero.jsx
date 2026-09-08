import { Suspense, lazy } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile, stats } from "../constants";
import { AvailabilityPill } from "./ui/Badge";
import { ArrowDown, ArrowRight, Pin } from "./ui/Icons";

/* The starfield costs ~250 KB of Three.js. Lazy-mount it after first paint so
   the hero text is never waiting on WebGL. */
const StarsCanvas = lazy(() => import("./canvas/Stars"));

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.01 : 0.7, delay: reduce ? 0 : delay, ease },
  });

  return (
    /* `100svh` — not `100vh` — so mobile browser chrome doesn't push the CTA
       off-screen. No `w-screen` anywhere: that was the source of the old
       horizontal-scroll bug. See docs/ux-research.md §2.1 B2 */
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-nav"
    >
      <Suspense fallback={null}>
        <StarsCanvas />
      </Suspense>

      {/* Ambient gold wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(207,169,110,0.16) 0%, transparent 62%)",
        }}
      />
      <div aria-hidden="true" className="noise-overlay absolute inset-0" />

      <div className="shell relative py-16 sm:py-20">
        <motion.div {...rise(0.05)}>
          <AvailabilityPill text={profile.availability} />
        </motion.div>

        {/* The 5-second test: name, then role, then proof. */}
        <motion.h1
          id="hero-title"
          className="mt-7 max-w-[16ch] text-fg"
          {...rise(0.12)}
        >
          {profile.name}.{" "}
          <span className="serif italic font-normal text-accent">
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
          <a href="#work" className="btn btn--primary btn--lg group">
            See selected work
            <ArrowRight
              className="transition-transform duration-300 group-hover:translate-x-1"
              width={18}
              height={18}
            />
          </a>
          <a href="#contact" className="btn btn--ghost btn--lg">
            Get in touch
          </a>
        </motion.div>

        <motion.dl
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-linesoft pt-8 sm:grid-cols-4"
          {...rise(0.36)}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="tnum block text-3xl font-bold tracking-tight text-fg sm:text-[2.5rem]">
                  {s.value}
                  {s.suffix && <span className="text-accent">{s.suffix}</span>}
                </span>
                <span className="mt-1 block text-sm text-muted">{s.label}</span>
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-faint"
          {...rise(0.44)}
        >
          <span className="inline-flex items-center gap-1.5">
            <Pin width={16} height={16} />
            {profile.location}
          </span>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            github.com/{profile.handle}
          </a>
        </motion.div>
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
