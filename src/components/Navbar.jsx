import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { navLinks, profile } from "../constants";
import { logo } from "../assets";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { scrollToSection, scrollToTop } from "../lib/navigate";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { ArrowUpRight, Close, Menu, Search } from "./ui/Icons";

const SECTION_IDS = navLinks.map((l) => l.id);

export default function Navbar({ onOpenCommand }) {
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
     strands the scroll-lock. WCAG 2.1.2, 2.4.3, 4.1.2.
     The sheet deliberately contains links only, so the trap has one
     unambiguous first and last stop. */
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
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

  const go = useCallback(
    (e, id) => {
      e.preventDefault();
      setOpen(false);
      scrollToSection(id, { behavior: reduce ? "auto" : "smooth" });
    },
    [reduce],
  );

  const linkClass = (id) =>
    cn(
      "relative inline-flex min-h-[44px] items-center px-1 text-sm font-medium transition-colors duration-200",
      activeId === id ? "text-fg" : "text-muted hover:text-fg",
    );

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
        className={cn(
          "fixed inset-x-0 top-0 safe-top transition-[z-index] duration-200",
          open ? "z-[70]" : "z-nav",
        )}
      >
        <div className="shell">
          <nav
            aria-label="Primary"
            className={cn(
              "mt-2.5 flex h-14 items-center justify-between gap-3 rounded-full border px-2.5 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
              open
                ? "border-transparent bg-transparent"
                : scrolled
                  ? "border-linesoft/80 bg-bg/75 shadow-card backdrop-blur-xl"
                  : "border-transparent bg-transparent",
            )}
          >
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop({ behavior: reduce ? "auto" : "smooth" });
              }}
              className="flex min-h-[44px] items-center gap-2.5 rounded-full pl-1 pr-2"
            >
              <img src={logo} alt="" aria-hidden="true" className="h-7 w-7" />
              <span className="text-[16px] font-bold tracking-tight text-fg">
                Mr.{" "}<span className="text-accent">Lotta</span>
              </span>
            </a>

            {/* Desktop */}
            <ul className="hidden items-center gap-7 md:flex">
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
                      className={cn(
                        "absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-accent transition-transform duration-300",
                        activeId === nav.id ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onOpenCommand}
                aria-label="Search this site"
                aria-keyshortcuts="Meta+k Control+k"
                className="inline-flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-transparent text-[13px] font-medium text-muted transition-colors hover:border-control hover:bg-white/[0.04] hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:w-auto lg:px-3"
              >
                <Search width={15} height={15} />
                <span className="hidden lg:inline">Search</span>
                <kbd className="kbd hidden lg:inline-flex">⌘K</kbd>
              </button>

              <Button asChild size="sm" className="hidden sm:inline-flex">
                <a href="#contact" onClick={(e) => go(e, "contact")}>
                  Hire me
                  <ArrowUpRight width={14} height={14} />
                </a>
              </Button>

              {/* Mobile toggle: a real <button>, 44px, with state exposed to AT */}
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
        </div>
      </header>

      {/* Mobile sheet: full-screen rather than a floating popover, so links are
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
            className="fixed inset-0 z-overlay flex flex-col overflow-y-auto bg-bg/[0.985] pt-[calc(var(--nav-h)+env(safe-area-inset-top))] backdrop-blur-xl md:hidden"
          >
            <div className="shell flex flex-1 flex-col justify-center py-8">
              <p className="eyebrow mb-6">Navigate</p>
              <ul>
                {navLinks.map((nav, i) => (
                  <li
                    key={nav.id}
                    className="border-b border-linesoft last:border-b-0"
                  >
                    <a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={`#${nav.id}`}
                      onClick={(e) => go(e, nav.id)}
                      aria-current={activeId === nav.id ? "true" : undefined}
                      className="flex min-h-[68px] items-center justify-between gap-4 text-[1.65rem] font-semibold text-fg"
                    >
                      <span>{nav.title}</span>
                      <span className="flex items-center gap-3 text-faint">
                        <span className="mono text-[11px] tabular-nums">
                          0{i + 1}
                        </span>
                        <ArrowUpRight width={18} height={18} />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <p className="eyebrow">Get in touch</p>
                <a
                  href={`mailto:${profile.email}`}
                  onClick={() => setOpen(false)}
                  className="mt-3 flex min-h-[44px] items-center text-lg font-medium text-accent underline decoration-accent/40 underline-offset-4"
                >
                  {profile.email}
                </a>
                <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted">
                  <span className="live-dot" aria-hidden="true" />
                  Available for new work
                </p>
              </div>
            </div>

            <div className="shell safe-bottom pb-6">
              <p className="mono text-[11px] uppercase tracking-[0.16em] text-faint">
                {profile.location}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
