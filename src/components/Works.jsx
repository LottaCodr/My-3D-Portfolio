import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Tilt } from "react-tilt";
import { SectionWrapper } from "../hoc";
import SectionHeading from "./ui/SectionHeading";
import { projects, projectFilters } from "../constants";
import { useIsTouch } from "../hooks/useMediaQuery";
import { ArrowUpRight, Github, Globe } from "./ui/Icons";

/* Deterministic 16:10 fallback tile for projects without a photographic cover.
   Real DOM text, so it stays selectable, translatable and screen-reader
   friendly — unlike the SVG-with-a-.png-extension placeholders it replaces. */
function CoverFallback({ name, category }) {
  const initials = name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const label = projectFilters.find((f) => f.id === category)?.label ?? category;

  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_28%_18%,rgba(207,169,110,0.20)_0%,transparent_58%),linear-gradient(160deg,#14141a_0%,#0a0a0f_100%)]"
    >
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(207,169,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(207,169,110,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(circle at 50% 50%, black, transparent 72%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, black, transparent 72%)",
        }}
      />
      <span className="serif relative text-[4.5rem] leading-none text-accent/85">
        {initials}
      </span>
      <span className="mono absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.18em] text-faint">
        {label}
      </span>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const reduce = useReducedMotion();
  const {
    name,
    tagline,
    description,
    tags,
    image,
    live_url,
    source_code_link,
    year,
    role,
    category,
    note,
  } = project;

  return (
    <motion.article
      layout={!reduce}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
      transition={{
        duration: reduce ? 0.01 : 0.45,
        delay: reduce ? 0 : Math.min(index * 0.05, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      /* `group` + no fixed width: the old `sm:w-[340px]` broke grid alignment.
         See docs/ux-research.md §2.1 B3 */
      className="group flex h-full flex-col"
    >
      <div className="card flex h-full flex-col overflow-hidden transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[var(--shadow-lift)]">
        {/* Reserved 16:10 box — matches the optimised cover ratio, so zero CLS. */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-cardhi">
          {image ? (
            <img
              src={image}
              alt={`${name} — product cover`}
              width={1600}
              height={1000}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <CoverFallback name={name} category={category} />
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <span className="mono absolute left-4 top-4 rounded-full border border-white/10 bg-bg/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-fg/90 backdrop-blur-sm">
            {year}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold leading-snug text-fg">{name}</h3>
          </div>

          <p className="mt-2 text-[15px] font-medium leading-snug text-accent">
            {tagline}
          </p>

          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
            {description}
          </p>

          {role && (
            <p className="mono mt-4 text-[11px] uppercase tracking-[0.12em] text-faint">
              {role}
            </p>
          )}

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <li key={tag} className="chip">
                {tag}
              </li>
            ))}
          </ul>

          {/* Links are ALWAYS rendered, never hover-gated — hover does not exist
              on touch. See docs/ux-research.md §1.2 */}
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-linesoft pt-5">
            {live_url ? (
              <a
                href={live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary flex-1 !min-h-[44px] !px-4 !text-[13px]"
              >
                <Globe width={16} height={16} />
                Live site
                <ArrowUpRight width={14} height={14} />
              </a>
            ) : (
              <span className="chip !border-accent/25 !bg-accent/10 !text-accent">
                {note ?? "Source only"}
              </span>
            )}

            <a
              href={source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} — view source on GitHub`}
              className="btn btn--ghost flex-1 !min-h-[44px] !px-4 !text-[13px]"
            >
              <Github width={16} height={16} />
              Code
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Works() {
  const [filter, setFilter] = useState("all");
  const isTouch = useIsTouch();

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  );

  const counts = useMemo(() => {
    const map = { all: projects.length };
    for (const p of projects) map[p.category] = (map[p.category] ?? 0) + 1;
    return map;
  }, []);

  return (
    <>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Selected work"
          title="Fifteen products. Nine of them live right now."
          lede="Every card below links somewhere real — a deployment you can click through, or the repository if the product has no public web surface."
        />
      </div>

      {/* Filters — full-bleed via the shell gutter token, never 100vw. */}
      <div className="bleed mt-10">
        <div
          role="group"
          aria-label="Filter projects by type"
          className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projectFilters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                className={`flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200 ${
                  active
                    ? "border-accent bg-accent text-[color:var(--on-accent)]"
                    : "border-line bg-white/[0.02] text-muted hover:border-accent/50 hover:text-fg"
                }`}
              >
                {f.label}
                <span
                  className={`tnum text-[11px] ${active ? "text-[color:var(--on-accent)]/70" : "text-faint"}`}
                >
                  {counts[f.id] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Announced to screen readers whenever the filter changes (WCAG 4.1.3) */}
      <p aria-live="polite" className="sr-only">
        Showing {visible.length} of {projects.length} projects.
      </p>

      <motion.div
        layout
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project, index) => (
            /* Pointer-driven 3D tilt is disabled on touch — it fights the scroll
               gesture and does nothing without a hover. */
            isTouch ? (
              <ProjectCard key={project.id} project={project} index={index} />
            ) : (
              <Tilt
                key={project.id}
                options={{ max: 6, scale: 1, speed: 600, perspective: 1200 }}
                className="h-full"
              >
                <ProjectCard project={project} index={index} />
              </Tilt>
            )
          ))}
        </AnimatePresence>
      </motion.div>

      <p className="mt-10 text-sm text-faint">
        Want the full list?{" "}
        <a
          href="https://github.com/LottaCodr?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
        >
          115 public repositories on GitHub
        </a>
        .
      </p>
    </>
  );
}

export default SectionWrapper(Works, "work");
