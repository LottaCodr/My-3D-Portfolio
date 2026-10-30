import { useReducedMotion } from "framer-motion";
import { logo } from "../assets";
import { navLinks, profile, socials } from "../constants";
import { scrollToSection, scrollToTop } from "../lib/navigate";
import { Button } from "./ui/button";
import { ArrowUp } from "./ui/Icons";

export default function Footer() {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  const go = (event, id) => {
    event.preventDefault();
    scrollToSection(id, { behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="border-t border-linesoft bg-raise/30">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-14">
          <div>
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="" aria-hidden="true" className="h-8 w-8" />
              <span className="text-[17px] font-bold tracking-tight text-fg">
                Mr.{" "}<span className="text-accent">Lotta</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Full-stack software engineer building web platforms, mobile apps
              and AI pipelines from {profile.location}.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-5 inline-flex min-h-[44px] items-center text-sm text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
            >
              {profile.email}
            </a>
            <p className="mt-4 inline-flex items-center gap-2 text-xs text-faint">
              <span className="live-dot" aria-hidden="true" />
              Available for new work
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="mono text-[10px] uppercase tracking-[0.16em] text-faint">
              Navigate
            </h2>
            <ul className="mt-3 space-y-0.5">
              {navLinks.map((nav) => (
                <li key={nav.id}>
                  <a
                    href={`#${nav.id}`}
                    onClick={(event) => go(event, nav.id)}
                    className="inline-flex min-h-[44px] items-center text-sm text-muted transition-colors hover:text-accent"
                  >
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mono text-[10px] uppercase tracking-[0.16em] text-faint">
              Elsewhere
            </h2>
            <ul className="mt-3 space-y-0.5">
              {socials.map((social) => {
                const external = !social.href.startsWith("mailto:");
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-flex min-h-[44px] items-center text-sm text-muted transition-colors hover:text-accent"
                    >
                      {social.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-linesoft pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-faint">
            © {year} {profile.name}. Built with React, Radix UI, Tailwind CSS
            and Three.js.
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2 self-start sm:self-auto"
            onClick={() => scrollToTop({ behavior: reduce ? "auto" : "smooth" })}
          >
            <ArrowUp width={16} height={16} />
            Back to top
          </Button>
        </div>
      </div>
    </footer>
  );
}
