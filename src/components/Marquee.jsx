import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import { technologies, stackNames } from "../constants";

/**
 * Tech ticker.
 *
 * Replaces the old `Tech.jsx` — thirteen separate WebGL `BallCanvas` contexts,
 * each its own RAF loop, which was exported but never even mounted
 * (docs/ux-research.md §2.1 B9). A single CSS marquee carries the same
 * information for a fraction of the cost.
 *
 * Duplicated content is `aria-hidden` so screen readers read each item once.
 */
export default function Marquee() {
  const reduce = usePrefersReducedMotion();

  const items = [
    ...technologies.map((t) => ({ key: t.name, icon: t.icon, name: t.name })),
    ...stackNames.map((n) => ({ key: n, icon: null, name: n })),
  ];

  const row = (hidden) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {items.map((item) => (
        <li
          key={item.key}
          className="flex shrink-0 items-center gap-2.5 text-sm font-medium whitespace-nowrap text-muted"
        >
          {item.icon && (
            <img
              src={item.icon}
              alt=""
              aria-hidden="true"
              width={20}
              height={20}
              className="h-5 w-5 object-contain opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            />
          )}
          {item.name}
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label="Technologies I work with"
      className="relative border-y border-linesoft bg-raise/40 py-5"
    >
      {/* Edge fades so items dissolve instead of clipping */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent sm:w-28"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent sm:w-28"
      />

      {reduce ? (
        /* Static, scrollable fallback instead of an endless animation. */
        <div className="shell overflow-x-auto">
          <ul className="flex items-center gap-8 py-1">
            {items.map((item) => (
              <li
                key={item.key}
                className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-sm text-muted"
              >
                {item.icon && (
                  <img src={item.icon} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
                )}
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {row(false)}
          {row(true)}
        </div>
      )}
    </section>
  );
}
