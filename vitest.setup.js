import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

/* jsdom implements none of the browser APIs this app relies on for
   animation and responsive behaviour. Stubbing them lets the component tree
   actually mount, so the tests exercise real render paths. */

if (!window.matchMedia) {
  /* Query-aware stub: the suite runs in "touch device" mode so it exercises
     the mobile code path (no Tilt, static marquee) — that is the configuration
     the redesign most needs to guarantee. `prefers-reduced-motion` stays off
     so animation-dependent behaviour is still covered. */
  const TOUCH = "(hover: none), (pointer: coarse)";
  window.matchMedia = (query) => ({
    matches: query === TOUCH,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });
}

class MockIntersectionObserver {
  constructor(cb) {
    this.cb = cb;
    MockIntersectionObserver.instances.push(this);
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = () => [];
  root = null;
  rootMargin = "";
  thresholds = [];
}
MockIntersectionObserver.instances = [];
window.IntersectionObserver = MockIntersectionObserver;
globalThis.IntersectionObserver = MockIntersectionObserver;

window.ResizeObserver = class {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};

window.scroll = vi.fn();
window.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();
window.history.replaceState = vi.fn();

afterEach(() => cleanup());
