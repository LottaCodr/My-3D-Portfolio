import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { navLinks, profile } from "../constants";
import { logo } from "../assets";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { Close, Menu } from "./ui/Icons";

const SECTION_IDS = navLinks.map((l) => l.id);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);
  const reduce = useReducedMotion();

  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* While the sheet is open it behaves as a modal dialog (WAI-ARIA dialog
     pattern): body scroll-lock, focus moved in, Tab trapped inside, Escape
     closes with focus returned to the trigger, background marked inert, and
     a resize up to desktop widths closes it before `md:hidden` hides it and
     strands the scroll-lock. WCAG 2.1.2, 2.4.3, 4.1.2. */
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    // Move focus into the sheet once it has painted.
    requestAnimationFrame(() => firstLinkRef.current?.focus());

    const main = document.getElementById("main");
    const footer = document.querySelector("footer");
    main?.toggleAttribute("inert", true);
    footer?.toggleAttribute("inert", true);

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      // Focus trap: keep Tab cycling inside the dialog.
      if (e.key === "Tab" && menuRef.current) {
        const items = menuRef.current.querySelectorAll(
          "a[href], button:not([disabled])",
        );
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);

    // `md:hidden` hides the sheet at >=768px — close it first so the
    // scroll-lock and inert flags never leak into the desktop layout.
    let mq = null;
    let onViewport = null;
    if (typeof window.matchMedia === "function") {
      mq = window.matchMedia("(min-width: 768px)");
      onViewport = (e) => {
        if (e.matches) setOpen(false);
      };
      if (mq.matches) setOpen(false);
      else if (typeof mq.addEventListener === "function") {
        mq.addEventListener("change", onViewport);
      } else if (typeof mq.addListener === "function") {
        mq.addListener(onViewport);
      }
    }

    return () => {
      document.body.style.overflow = overflow;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      document.removeEventListener("keydown", onKey);
      if (mq && onViewport) {
        if (typeof mq.removeEventListener === "function") {
          mq.removeEventListener("change", onViewport);
        } else if (typeof mq.removeListener === "function") {
          mq.removeListener(onViewport);
        }
      }
    };
  }, [open]);

  const go = useCallback((e, id) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    // Move keyboard + screen-reader focus to the section navigated to. The
    // anchor span carries tabindex="-1" so this is silent for mouse users and
    // orienting for everyone else. scrollIntoView already scrolled, so don't
    // scroll again.
    el.focus({ preventScroll: true });
    // Keep the URL shareable without a hard jump.
    window.history.replaceState(null, "", `#${id}`);
  }, [reduce]);

  const linkClass = (id) =>
    `relative inline-flex min-h-[44px] items-center px-1 text-[15px] font-medium transition-colors duration-200 ${
      activeId === id ? "text-fg" : "text-muted hover:text-fg"
    }`;

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      {/* While the sheet is open the header steps above it (z-70 over the
          sheet's z-60) so the logo and the close control stay visible and
          tappable; its own background drops out so the sheet reads as one
          continuous surface. */}
      <header
        className={`fixed inset-x-0 top-0 safe-top transition-[background-color,border-color,backdrop-filter] duration-300 ${
          open
            ? "z-[70] border-b border-transparent bg-transparent"
            : scrolled
              ? "z-nav border-b border-linesoft bg-bg/80 backdrop-blur-xl"
              : "z-nav border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="shell flex h-nav items-center justify-between gap-4"
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
              window.history.replaceState(null, "", " ");
            }}
            className="flex min-h-[44px] items-center gap-2.5 rounded-lg"
          >
            <img src={logo} alt="" aria-hidden="true" className="h-8 w-8" />
            <span className="text-[17px] font-bold tracking-tight text-fg">
              Mr.&nbsp;<span className="text-accent">Lotta</span>
            </span>
          </a>

          {/* Desktop */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((nav) => (
              <li key={nav.id}>
                <a
                  href={`#${nav.id}`}
                  onClick={(e) => go(e, nav.id)}
                  className={linkClass(nav.id)}
                  aria-current={activeId === nav.id ? "true" : undefined}
                >
                  {nav.title}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-accent transition-transform duration-300 ${
                      activeId === nav.id ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a href="#contact" onClick={(e) => go(e, "contact")} className="btn btn--primary hidden sm:inline-flex">
              Hire me
            </a>

            {/* Mobile toggle — a real <button>, 44px, with state exposed to AT */}
            <button
              ref={toggleRef}
              type="button"
              className="icon-btn md:hidden"
              aria-expanded={open}
              aria-haspopup="dialog"
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <Close /> : <Menu />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet — full-screen rather than a floating popover, so links are
          thumb-reachable and never clipped by the viewport. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-overlay flex flex-col overflow-y-auto bg-bg/98 pt-nav backdrop-blur-xl md:hidden"
          >
            <ul className="shell flex flex-1 flex-col justify-center gap-1">
              {navLinks.map((nav, i) => (
                <li key={nav.id} className="border-b border-linesoft last:border-0">
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={`#${nav.id}`}
                    onClick={(e) => go(e, nav.id)}
                    aria-current={activeId === nav.id ? "true" : undefined}
                    className="flex min-h-[64px] items-center justify-between text-2xl font-semibold text-fg"
                  >
                    {nav.title}
                    <span className="mono text-xs text-faint">
                      0{i + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="shell safe-bottom pb-8">
              <a
                href={`mailto:${profile.email}`}
                className="btn btn--primary btn--block btn--lg"
              >
                {profile.email}
              </a>
              <p className="mono mt-4 text-center text-xs text-faint">
                {profile.location}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
