import Reveal from "./Reveal";

/**
 * The one section header, reused by every section.
 * Heading levels are explicit so the document outline stays correct
 * (WCAG 2.4.6 Headings and Labels).
 */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  level = 2,
  align = "left",
  className = "",
}) {
  const Title = `h${level}`;
  const centered = align === "center";

  return (
    /* A plain div, not <header>: only the page banner should carry the
       `banner` landmark role, and a <header> per section adds four more. */
    <Reveal
      className={`max-w-3xl ${centered ? "mx-auto text-center" : ""} ${className}`}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Title className="mt-3 text-fg">{title}</Title>
      {lede && (
        <p className={`lede mt-5 ${centered ? "mx-auto" : ""}`}>{lede}</p>
      )}
    </Reveal>
  );
}
