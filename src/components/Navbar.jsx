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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Body scroll-lock + Escape + focus management while the sheet is open.
     WCAG 2.1.2 (no keyboard trap) and 2.4.3 (focus order). */
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    // Move focus into the sheet once it has painted.
    requestAnimationFrame(() => firstLinkRef.current?.focus());

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = useCallback((e, id) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
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

      <header
        className={`fixed inset-x-0 top-0 z-nav safe-top transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled
            ? "border-b border-linesoft bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
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
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-overlay flex flex-col bg-bg/98 pt-nav backdrop-blur-xl md:hidden"
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
