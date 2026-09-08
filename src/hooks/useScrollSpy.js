import { useEffect, useState } from "react";

/**
 * Tracks which section id is currently in view so the navbar can mark the
 * active link with `aria-current` (WCAG 4.1.2 Name/Role/Value).
 *
 * IntersectionObserver rather than a scroll handler: no layout thrash, and it
 * keeps working when sections change height as accordions open.
 *
 * @param {string[]} ids section ids, in document order
 * @returns {string} the id currently occupying the reading position
 */
export function useScrollSpy(ids, { rootMargin = "-45% 0px -50% 0px" } = {}) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const visible = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }
        if (visible.size === 0) return;
        // Highest intersection ratio wins; document order breaks ties so the
        // highlighted link never jumps backwards while scrolling down.
        const best = [...visible.entries()].sort((a, b) => {
          if (b[1] !== a[1]) return b[1] - a[1];
          return ids.indexOf(a[0]) - ids.indexOf(b[0]);
        })[0];
        setActiveId(best[0]);
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    nodes.forEach((n) => observer.observe(n));

    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return activeId;
}
