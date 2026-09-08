import { useReducedMotion } from "framer-motion";
import { logo } from "../assets";
import { navLinks, profile, socials } from "../constants";
import { ArrowDown } from "./ui/Icons";

export default function Footer() {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  const go = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <footer className="border-t border-linesoft bg-raise/40">
      <div className="shell py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="" aria-hidden="true" className="h-8 w-8" />
              <span className="text-[17px] font-bold tracking-tight text-fg">
                Mr.&nbsp;<span className="text-accent">Lotta</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {profile.role} building web platforms, mobile apps and AI pipelines
              from {profile.location}.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-5 inline-flex min-h-[44px] items-center text-sm text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
            >
              {profile.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <h2 className="mono text-[11px] uppercase tracking-[0.16em] text-faint">
              Navigate
            </h2>
            <ul className="mt-4 space-y-1">
              {navLinks.map((nav) => (
                <li key={nav.id}>
                  <a
                    href={`#${nav.id}`}
                    onClick={(e) => go(e, nav.id)}
                    className="inline-flex min-h-[44px] items-center text-sm text-muted transition-colors hover:text-accent"
                  >
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mono text-[11px] uppercase tracking-[0.16em] text-faint">
              Elsewhere
            </h2>
            <ul className="mt-4 space-y-1">
              {socials.map((s) => {
                const external = !s.href.startsWith("mailto:");
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-flex min-h-[44px] items-center text-sm text-muted transition-colors hover:text-accent"
                    >
                      {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-linesoft pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-faint">
            © {year} {profile.name}. Built with React, Three.js and Tailwind.
          </p>
          <button
            type="button"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
            }
            className="inline-flex min-h-[44px] items-center gap-2 self-start text-sm text-muted transition-colors hover:text-accent sm:self-auto"
          >
            <ArrowDown width={16} height={16} className="rotate-180" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
