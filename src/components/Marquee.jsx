import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import { technologies, stackNames } from "../constants";

/**
 * Tech ticker.
 *
 * Replaces the old `Tech.jsx`: thirteen separate WebGL `BallCanvas` contexts,
 * each with its own RAF loop, which was exported but never even mounted
 * (docs/ux-research-v2.md §6). A single CSS marquee carries the same
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
      className="flex shrink-0 items-center gap-9 pr-9"
    >
      {items.map((item) => (
        <li
          key={item.key}
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-sm font-medium text-muted"
        >
          {item.icon && (
            <img
              src={item.icon}
              alt=""
              aria-hidden="true"
              width={18}
              height={18}
              className="h-[18px] w-[18px] object-contain opacity-75 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
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
      className="relative border-y border-linesoft bg-raise/30 py-4"
    >
      <div className="shell flex items-center gap-6">
        <p className="mono hidden shrink-0 items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-faint lg:flex">
          <span aria-hidden="true" className="live-dot" />
          Toolbox
        </p>

        {reduce ? (
          /* Static, scrollable fallback instead of an endless animation. */
          <div className="flex-1 overflow-x-auto scrollbar-none">
            <ul className="flex items-center gap-8 py-1">
              {items.map((item) => (
                <li
                  key={item.key}
                  className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-sm text-muted"
                >
                  {item.icon && (
                    <img
                      src={item.icon}
                      alt=""
                      width={18}
                      height={18}
                      className="h-[18px] w-[18px] object-contain"
                    />
                  )}
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mask-fade-x relative min-w-0 flex-1 overflow-hidden">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
              {row(false)}
              {row(true)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
