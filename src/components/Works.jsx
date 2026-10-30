import { forwardRef, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Tilt } from "react-tilt";
import { SectionWrapper } from "../hoc";
import SectionHeading from "./ui/SectionHeading";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { projects, projectFilters } from "../constants";
import { useIsTouch } from "../hooks/useMediaQuery";
import { ArrowUpRight, Github, Globe } from "./ui/Icons";

/* Deterministic 16:10 fallback tile for projects without a photographic cover.
   Real DOM text, so it stays selectable, translatable and screen-reader
   friendly, unlike an SVG placeholder saved with a .png extension. */
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

const ProjectCard = forwardRef(function ProjectCard({ project, index }, ref) {
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
    featured,
    extra_links,
  } = project;

  return (
    <motion.article
      ref={ref}
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
         See docs/ux-research-v2.md §6 */
      className="group flex h-full flex-col"
    >
      <Card className="flex h-full flex-col overflow-hidden transition-[border-color,box-shadow,transform] duration-300 group-hover:-translate-y-1 group-hover:border-accent/35 group-hover:shadow-glow group-focus-within:border-accent/35">
        {/* Reserved 16:10 box: matches the optimised cover ratio, so zero CLS. */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-cardhi">
          {image ? (
            <img
              src={image}
              alt={`${name} product cover`}
              width={1600}
              height={1000}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <CoverFallback name={name} category={category} />
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/10 to-transparent" />

          <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
            <Badge
              size="sm"
              className="border-white/10 bg-bg/70 text-fg/90 backdrop-blur-sm"
            >
              {year}
            </Badge>
            {live_url ? (
              <Badge
                variant="success"
                size="sm"
                className="gap-1.5 bg-bg/70 backdrop-blur-sm"
              >
                <span className="live-dot" aria-hidden="true" />
                Live
              </Badge>
            ) : (
              <Badge size="sm" className="border-white/10 bg-bg/70 text-fg/90 backdrop-blur-sm">
                {note ?? "Source only"}
              </Badge>
            )}
          </div>

          {featured && (
            <div className="absolute bottom-4 left-4">
              <Badge variant="accent" size="sm">
                Featured
              </Badge>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold leading-snug text-fg">{name}</h3>
            <span className="mono mt-1 flex-none text-[10px] tabular-nums text-faint">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <p className="mt-2 text-[15px] font-medium leading-snug text-accent">
            {tagline}
          </p>

          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
            {description}
          </p>

          {role && (
            <p className="mono mt-4 text-[10px] uppercase tracking-[0.14em] text-faint">
              {role}
            </p>
          )}

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <li key={tag}>
                <Badge variant="muted">{tag}</Badge>
              </li>
            ))}
          </ul>

          {/* Multi-repo projects (a UI pass and its follow-up) advertise the
              companion repository rather than hiding it in prose. */}
          {extra_links?.length ? (
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {extra_links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] text-muted underline decoration-linesoft underline-offset-4 transition-colors hover:text-accent focus-visible:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

          {/* Links are ALWAYS rendered, never hover-gated: hover does not exist
              on touch. See docs/ux-research-v2.md §5 */}
          <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-linesoft pt-5">
            {live_url ? (
              <Button asChild size="default" className="flex-1 px-4 text-[13px]">
                <a href={live_url} target="_blank" rel="noopener noreferrer">
                  <Globe width={15} height={15} />
                  Live site
                  <ArrowUpRight width={14} height={14} />
                </a>
              </Button>
            ) : (
              <Badge variant="accent" className="min-h-[36px] flex-1 justify-center">
                {note ?? "Source only"}
              </Badge>
            )}

            <Button
              asChild
              variant="secondary"
              size="default"
              className="flex-1 px-4 text-[13px]"
            >
              <a
                href={source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name}: view source on GitHub`}
              >
                <Github width={15} height={15} />
                Code
              </a>
            </Button>
          </div>
        </div>
      </Card>
    </motion.article>
  );
});

function Works({ headingId }) {
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

  /* Keep exactly one filter active. Clicking the active chip is a no-op;
     clicking any other chip replaces the selection. */
  const onFilterChange = (next) => {
    const chosen = next.filter((id) => id !== filter);
    if (chosen.length > 0) setFilter(chosen[chosen.length - 1]);
  };

  return (
    <>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          headingId={headingId}
          title="Twenty products. Nine of them live right now."
          lede="Every card below links somewhere real: a deployment you can click through, or the repository if the product has no public web surface."
        />
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="-mx-1 overflow-x-auto px-1 pb-1 scrollbar-none">
          <ToggleGroup
            type="multiple"
            value={[filter]}
            onValueChange={onFilterChange}
            aria-label="Filter projects by type"
            className="gap-2"
          >
            {projectFilters.map((option) => (
              <ToggleGroupItem key={option.id} value={option.id}>
                {option.label}
                <span className="tnum text-[11px] opacity-70">
                  {counts[option.id] ?? 0}
                </span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <p className="tnum flex-none text-sm text-faint">
          Showing <span className="font-semibold text-fg">{visible.length}</span> of{" "}
          {projects.length}
        </p>
      </div>

      {/* Announced to screen readers whenever the filter changes (WCAG 4.1.3) */}
      <p aria-live="polite" className="sr-only">
        Showing {visible.length} of {projects.length} projects.
      </p>

      <motion.div
        layout
        className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project, index) => (
            /* Pointer-driven 3D tilt is disabled on touch: it fights the scroll
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
      </p>
    </>
  );
}

export default SectionWrapper(Works, "work");
