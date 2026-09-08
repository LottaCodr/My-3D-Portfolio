import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within, fireEvent, act } from "@testing-library/react";

import App from "../App";
import { projects, caseStudies, stats, socials, profile } from "../constants";

/* Vitest always runs from the project root, so cwd is the repo root. */
const SRC_DIR = resolve(process.cwd(), "src");

/* Strip comments before scanning source, so prose that discusses a forbidden
   pattern does not trip the check that enforces it. */
const stripComments = (src) =>
  src
    .replace(/\/\*[\s\S]*?\*\//g, "") // block + JSX comments
    .replace(/(^|[^:'"`])\/\/[^\n]*/g, "$1"); // line comments, not URLs

/* ---------------------------------------------------------------------------
 * Ground truth, established during the research pass on 2026-09-08.
 * Every URL was fetched; the two marked dead returned
 * `404 DEPLOYMENT_NOT_FOUND`. See docs/ux-research.md §4.
 * ------------------------------------------------------------------------- */
const VERIFIED_LIVE = new Set([
  "https://nile-valley-emr.vercel.app",
  "https://garden-fairy.vercel.app",
  "https://agro-investment-delta.vercel.app",
  "https://the-color-green.vercel.app",
  "https://echoloft-landing-page.vercel.app",
  "https://glimms-waitlist.vercel.app",
  "https://lwmp-alert-automation.vercel.app",
  "https://petroelemites-ltd.vercel.app",
  "https://lotaport.vercel.app",
]);

/* Owner-confirmed deployments that were NOT reachable when probed.
 *
 * Empty right now: the one former entry (petroelemites-beige) was replaced by
 * petroelemites-ltd.vercel.app, which was fetched and confirmed live on
 * 2026-09-08, so it graduated to VERIFIED_LIVE. The set stays here so the
 * distinction between \"someone loaded this page\" and \"the owner says this
 * is the URL\" is still enforceable. Re-probe before each deploy. */
const OWNER_CONFIRMED = new Set([]);

const KNOWN_DEAD = [
  "top-six-smoky.vercel.app",
  // Superseded: care-pulse-olive.vercel.app 301s to nile-valley-emr.vercel.app
  "care-pulse-olive.vercel.app",
  // Superseded: petroelemites-beige.vercel.app 404'd; replaced by petroelemites-ltd.vercel.app
  "petroelemites-beige.vercel.app",
];

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

/* ===========================================================================
 * 1. Data integrity
 * ======================================================================== */
describe("project data", () => {
  it("gives every project at least one link", () => {
    const unlinked = projects.filter(
      (p) => !p.source_code_link && !p.live_url,
    );
    expect(unlinked.map((p) => p.name)).toEqual([]);
  });

  it("gives every project a source repository", () => {
    for (const p of projects) {
      expect(p.source_code_link, `${p.name} is missing source_code_link`).toMatch(
        /^https:\/\/github\.com\/LottaCodr\//,
      );
    }
  });

  it("only ships live URLs that are verified reachable or owner-confirmed", () => {
    for (const p of projects) {
      if (!p.live_url) continue;
      expect(
        VERIFIED_LIVE.has(p.live_url) || OWNER_CONFIRMED.has(p.live_url),
        `${p.name} ships unverified live_url ${p.live_url}`,
      ).toBe(true);
    }
  });

  it("keeps the owner-confirmed (not fetched) set to exactly the known entries", () => {
    const shipped = projects
      .filter((p) => p.live_url && OWNER_CONFIRMED.has(p.live_url))
      .map((p) => p.name);
    // If this grows, a link is going out without anyone having loaded it.
    expect(shipped).toEqual([]);
  });

  it("ships no URL known to be dead", () => {
    const blob = JSON.stringify(projects) + JSON.stringify(caseStudies);
    for (const dead of KNOWN_DEAD) {
      expect(blob, `found dead host ${dead}`).not.toContain(dead);
    }
  });

  it("has unique ids and no duplicate projects", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);

    const repos = projects.map((p) => p.source_code_link);
    expect(new Set(repos).size, "duplicate repository in the grid").toBe(
      repos.length,
    );
  });

  it("gives every project a one-line impact tagline, not just a title", () => {
    for (const p of projects) {
      expect(p.tagline?.length, `${p.name} needs a tagline`).toBeGreaterThan(20);
    }
  });

  it("every project belongs to a filterable category", () => {
    const categories = new Set(["web", "mobile", "ai", "landing", "creative"]);
    for (const p of projects) {
      expect(categories.has(p.category), `${p.name} has bad category`).toBe(true);
    }
  });
});

describe("case studies", () => {
  it("stays in the 3-5 range the research recommends", () => {
    expect(caseStudies.length).toBeGreaterThanOrEqual(3);
    expect(caseStudies.length).toBeLessThanOrEqual(5);
  });

  it("leads with an outcome (Minto pyramid)", () => {
    for (const c of caseStudies) {
      expect(c.outcome?.length, `${c.title} needs an outcome`).toBeGreaterThan(15);
      expect(c.problem?.length).toBeGreaterThan(40);
      expect(c.constraints?.length).toBeGreaterThan(30);
      expect(c.decisions.length).toBeGreaterThanOrEqual(3);
      expect(c.result?.length).toBeGreaterThan(40);
    }
  });
});

describe("profile metrics", () => {
  it("does not repeat the invented follower/star counts", () => {
    const blob = JSON.stringify({ stats, profile });
    // The old About section claimed 847 followers and 12 stars; the GitHub API
    // returns 22 followers and 8 total stars. See docs/ux-research.md §2.1 B6
    expect(blob).not.toContain("847");
    expect(blob).not.toMatch(/Followers/);
  });

  it("only links to channels that are known to exist", () => {
    const handles = socials.map((s) => s.label);
    // GitHub profile has no `blog` and no `twitter_username`, so no
    // LinkedIn/Twitter links should be shipped. See §2.1 B10
    expect(handles).not.toContain("LinkedIn");
    expect(handles).not.toContain("Twitter");
  });
});

/* ===========================================================================
 * 2. Rendered accessibility & structure
 * ======================================================================== */
describe("rendered app", () => {
  it("mounts without throwing", () => {
    const { container } = render(<App />);
    expect(container.querySelector("#main")).toBeInTheDocument();
  });

  it("exposes a skip link as the first focusable element (WCAG 2.4.1)", () => {
    render(<App />);
    const skip = screen.getByRole("link", { name: /skip to main content/i });
    expect(skip).toHaveAttribute("href", "#main");
    expect(skip.className).toContain("skip-link");

    const focusables = document.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
    );
    expect(focusables[0]).toBe(skip);
  });

  it("has one <main>, a <header> and a <footer>", () => {
    const { container } = render(<App />);
    expect(container.querySelectorAll("main")).toHaveLength(1);
    expect(container.querySelectorAll("header")).toHaveLength(1);
    expect(container.querySelectorAll("footer")).toHaveLength(1);
  });

  it("has exactly one <h1>", () => {
    const { container } = render(<App />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });

  it("gives every image alt text (WCAG 1.1.1)", () => {
    const { container } = render(<App />);
    const missing = [...container.querySelectorAll("img")].filter(
      (img) => !img.hasAttribute("alt"),
    );
    expect(missing.map((i) => i.getAttribute("src"))).toEqual([]);
  });

  it("marks every external link noopener noreferrer", () => {
    const { container } = render(<App />);
    const bad = [...container.querySelectorAll('a[target="_blank"]')].filter(
      (a) => !/noopener/.test(a.getAttribute("rel") ?? ""),
    );
    expect(bad.map((a) => a.href)).toEqual([]);
  });

  it("contains no w-screen or 100vw (the old horizontal-scroll bug, §2.1 B2)", () => {
    const { container } = render(<App />);
    const html = container.innerHTML;
    expect(html).not.toMatch(/\bw-screen\b/);
    expect(html).not.toMatch(/100vw/);
  });

  it("keeps 100vw out of the source entirely", () => {
    // 100vw includes the scrollbar width, so it produces horizontal overflow
    // on desktop. The full-bleed filter row uses the .bleed gutter token.
    const offenders = [];
    const walk = (dir) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, entry.name);
        if (entry.isDirectory()) {
          if (entry.name === "__tests__") continue; // this file quotes the pattern
          walk(full);
        }
        else if (/\.(jsx?|css)$/.test(entry.name)) {
          const src = stripComments(readFileSync(full, "utf8"));
          if (/100vw|\bw-screen\b/.test(src)) offenders.push(full);
        }
      }
    };
    walk(SRC_DIR);
    expect(offenders).toEqual([]);
  });

  it("renders every project with a clickable link", () => {
    render(<App />);
    const articles = screen.getAllByRole("article");
    // 15 project cards; case studies are <article> too but live in another section
    expect(articles.length).toBeGreaterThanOrEqual(projects.length);

    const projectNames = projects.map((p) => p.name);
    for (const article of articles) {
      const heading = article.querySelector("h3");
      if (!heading || !projectNames.includes(heading.textContent.trim())) continue;

      const links = within(article).getAllByRole("link");
      expect(
        links.length,
        `${heading.textContent} has no links`,
      ).toBeGreaterThan(0);
      expect(
        links.some((a) => /^https?:\/\//.test(a.getAttribute("href") ?? "")),
        `${heading.textContent} has no http link`,
      ).toBe(true);
    }
  });

  it("gives the GitHub icon links accessible names", () => {
    render(<App />);
    const codeLinks = screen
      .getAllByRole("link")
      .filter((a) => /view source on GitHub/i.test(a.getAttribute("aria-label") ?? ""));
    expect(codeLinks.length).toBe(projects.length);
  });
});

/* ===========================================================================
 * 3. Interaction
 * ======================================================================== */
describe("work filters", () => {
  it("narrows the grid and announces the count", () => {
    render(<App />);

    const mobileBtn = screen.getByRole("button", { name: /^Mobile/i });
    expect(mobileBtn).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(mobileBtn);
    expect(mobileBtn).toHaveAttribute("aria-pressed", "true");

    expect(screen.getByText(/Showing 3 of 15 projects/i)).toBeInTheDocument();

    const allBtn = screen.getByRole("button", { name: /^All work/i });
    fireEvent.click(allBtn);
    expect(screen.getByText(/Showing 15 of 15 projects/i)).toBeInTheDocument();
  });
});

describe("case study accordion", () => {
  it("expands and collapses with correct ARIA state", () => {
    render(<App />);
    const first = screen.getByRole("button", {
      name: new RegExp(caseStudies[0].title),
    });
    // Open by default so the section is never empty
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveAttribute("aria-controls");

    fireEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(
      document.getElementById(first.getAttribute("aria-controls")),
    ).toBeInTheDocument();
  });
});

describe("mobile navigation", () => {
  it("toggles the sheet and exposes state to assistive tech", () => {
    render(<App />);
    const toggle = screen.getByRole("button", { name: /open menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", "mobile-menu");

    fireEvent.click(toggle);
    expect(screen.getByRole("button", { name: /close menu/i })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(document.getElementById("mobile-menu")).toBeInTheDocument();

    // Escape closes the sheet and returns focus to the trigger.
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.getByRole("button", { name: /open menu/i })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    // AnimatePresence keeps the node for the exit transition, so assert on the
    // state that matters rather than on immediate removal.
    expect(document.body.style.overflow).toBe("");
  });

  it("exposes the open menu as a modal dialog with an inert background", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

    const menu = screen.getByRole("dialog", { name: /menu/i });
    expect(menu).toHaveAttribute("id", "mobile-menu");
    expect(menu).toHaveAttribute("aria-modal", "true");
    expect(document.getElementById("main")).toHaveAttribute("inert");
  });

  it("traps Tab focus inside the open menu", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

    const menu = screen.getByRole("dialog", { name: /menu/i });
    const stops = within(menu).getAllByRole("link");
    expect(stops.length).toBeGreaterThan(1);

    // Tab on the last stop wraps to the first …
    stops[stops.length - 1].focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(stops[0]);

    // … and Shift+Tab on the first stop wraps to the last.
    stops[0].focus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(stops[stops.length - 1]);
  });

  it("closes the menu when the viewport grows to desktop width", () => {
    // Without this, `md:hidden` hides the sheet while the scroll-lock and
    // inert flags leak into the desktop layout.
    const listeners = [];
    const spy = vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: (_type, cb) => listeners.push([query, cb]),
      removeEventListener: (_type, cb) => {
        const i = listeners.findIndex(([q, fn]) => q === query && fn === cb);
        if (i >= 0) listeners.splice(i, 1);
      },
      addListener: (cb) => listeners.push([query, cb]),
      removeListener: (cb) => {
        const i = listeners.findIndex(([q, fn]) => q === query && fn === cb);
        if (i >= 0) listeners.splice(i, 1);
      },
      dispatchEvent: () => false,
    }));
    try {
      render(<App />);
      fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
      expect(document.getElementById("mobile-menu")).toBeInTheDocument();

      // Simulate crossing the md breakpoint upward. Only the navbar's
      // listener fires — other queries (e.g. the touch detection in Works)
      // must not be disturbed.
      act(() => {
        for (const [query, cb] of [...listeners]) {
          if (query === "(min-width: 768px)") cb({ matches: true });
        }
      });

      expect(screen.getByRole("button", { name: /open menu/i })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
      expect(document.body.style.overflow).toBe("");
      expect(document.getElementById("main")).not.toHaveAttribute("inert");
    } finally {
      spy.mockRestore();
    }
  });
});

describe("contact form", () => {
  it("rejects an empty submission with inline, announced errors", () => {
    render(<App />);
    const form = document.querySelector("form");

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByText(/Please tell me what to call you/i)).toBeInTheDocument();
    expect(screen.getByText(/email address is required/i)).toBeInTheDocument();
    expect(form.querySelector("#name")).toHaveAttribute("aria-invalid", "true");
    expect(form.querySelector("#name")).toHaveAttribute(
      "aria-describedby",
      "name-error",
    );
  });

  it("rejects a malformed email address", () => {
    render(<App />);
    fireEvent.change(document.querySelector("#name"), {
      target: { value: "Ada" },
    });
    fireEvent.change(document.querySelector("#email"), {
      target: { value: "not-an-email" },
    });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(screen.getByText(/doesn't look right/i)).toBeInTheDocument();
  });

  it("associates every input with a visible label (WCAG 3.3.2)", () => {
    render(<App />);
    expect(screen.getByLabelText(/^Your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/What are you building/i)).toBeInTheDocument();
  });
});
