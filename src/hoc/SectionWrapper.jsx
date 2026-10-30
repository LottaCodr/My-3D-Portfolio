/**
 * Wraps a section in the shared shell + vertical rhythm and renders the
 * scroll-target anchor.
 *
 * The wrapped component receives `sectionId` and `headingId` so it can label
 * its own heading. The previous version set `aria-labelledby="${id}-heading"`
 * without any element carrying that id, which left every section landmark
 * unnamed.
 *
 * Children opt into animation explicitly via <Reveal />, and spacing lives in
 * exactly one place.
 */
const SectionWrapper = (Component, idName) => {
  function WrappedSection(props) {
    const headingId = idName ? `${idName}-heading` : undefined;

    return (
      <section
        aria-labelledby={headingId}
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
        <Component sectionId={idName} headingId={headingId} {...props} />
      </section>
    );
  }

  WrappedSection.displayName = `SectionWrapper(${Component.displayName || Component.name || "Component"})`;

  return WrappedSection;
};

export default SectionWrapper;
