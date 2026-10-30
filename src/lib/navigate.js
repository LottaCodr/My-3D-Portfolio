/**
 * In-page navigation helpers shared by the navbar, footer and command palette.
 *
 * Scrolling and focus are deliberately separate: a mouse user gets a smooth
 * scroll, while a keyboard or screen-reader user additionally has focus moved
 * into the destination section so the next Tab continues from there. The URL
 * hash is replaced, never pushed, so the back button still means "leave the
 * site" rather than "step back through six scroll positions".
 */
export function scrollToSection(id, { behavior = "smooth", moveFocus = true } = {}) {
  if (typeof document === "undefined") return false;
  const el = document.getElementById(id);
  if (!el) return false;

  el.scrollIntoView({ behavior, block: "start" });
  if (moveFocus) el.focus({ preventScroll: true });
  if (typeof window !== "undefined" && window.history?.replaceState) {
    window.history.replaceState(null, "", `#${id}`);
  }
  return true;
}

export function scrollToTop({ behavior = "smooth" } = {}) {
  if (typeof window === "undefined") return;
  window.scrollTo({ top: 0, behavior });
  if (window.history?.replaceState) window.history.replaceState(null, "", " ");
}

/** True when a keyboard shortcut should be ignored because the user is typing. */
export function isTypingTarget(target) {
  if (!target || typeof target !== "object") return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable === true
  );
}
