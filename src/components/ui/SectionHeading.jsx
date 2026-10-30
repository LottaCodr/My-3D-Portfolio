import Reveal from "./Reveal";

/**
 * The one section header, reused by every section.
 *
 * - `headingId` is wired to the parent <section aria-labelledby> so each
 *   landmark has a real accessible name (WCAG 1.3.1 / 2.4.6).
 * - The index + rule row gives long single-page documents a visible position
 *   marker, which was the strongest scannability finding in the research.
 */
export default function SectionHeading({
  eyebrow,
  index,
  title,
  lede,
  level = 2,
  align = "left",
  headingId,
  className = "",
  children,
}) {
  const Title = `h${level}`;
  const centered = align === "center";

  return (
    /* A plain div, not <header>: only the page banner should carry the
       `banner` landmark role, and a <header> per section adds four more. */
    <Reveal
      className={`max-w-3xl ${centered ? "mx-auto text-center" : ""} ${className}`}
    >
      {(eyebrow || index) && (
        <div
          className={`flex flex-wrap items-center gap-3 ${centered ? "justify-center" : ""}`}
        >
          {index && (
            <span className="mono text-[11px] tabular-nums text-faint">{index}</span>
          )}
          <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        </div>
      )}

      <Title id={headingId} className="mt-4 text-fg">
        {title}
      </Title>

      {lede && (
        <p className={`lede mt-5 ${centered ? "mx-auto" : ""}`}>{lede}</p>
      )}

      {children}
    </Reveal>
  );
}
