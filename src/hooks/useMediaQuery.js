import { useEffect, useState } from "react";

/**
 * Subscribe to a CSS media query. SSR-safe: returns `fallback` on first paint.
 *
 * Used to switch off hover-only and pointer-driven effects on touch devices —
 * `Tilt`, cursor parallax, hover reveals. See docs/ux-research.md §1.2
 * ("Avoid hover-dependent features that cannot function on touchscreens").
 */
export function useMediaQuery(query, fallback = false) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return fallback;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True when the device has no hover-capable primary pointer (phones, tablets). */
export const useIsTouch = () => useMediaQuery("(hover: none), (pointer: coarse)", false);

/** True when the user asked the OS to reduce motion. */
export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)", false);
