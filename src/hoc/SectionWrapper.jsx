/**
 * Wraps a section in the shared shell + vertical rhythm and renders the
 * scroll-target anchor.
 *
 * The old version applied a `staggerContainer` variant that its children never
 * consumed, and mixed `styles.padding` with per-section `py-24` so spacing was
 * applied twice. Children now opt into animation explicitly via <Reveal />,
 * and spacing lives in exactly one place.
 */
const SectionWrapper = (Component, idName) =>
  function WrappedSection() {
    return (
      <section
        aria-labelledby={idName ? `${idName}-heading` : undefined}
        className="shell section relative"
      >
        {/* tabindex="-1": a programmatic focus target only. Navbar moves focus
            here after in-page navigation so keyboard and screen-reader users
            land in context; it never enters the Tab order. */}
        {idName && (
          <span className="hash-span" id={idName} tabIndex={-1}>
            &nbsp;
          </span>
        )}
        <Component />
      </section>
    );
  };

export default SectionWrapper;
