import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./ui/command";
import { navLinks, profile, projects } from "../constants";
import { scrollToSection } from "../lib/navigate";
import { useCopyToClipboard } from "../lib/clipboard";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Globe,
  Mail,
  Search,
  Whatsapp,
  Github,
} from "./ui/Icons";

/**
 * Global command palette.
 *
 * Research finding: reviewers scan, and a keyboard-first palette makes every
 * section and every project equally reachable in one keystroke. It is a
 * discoverability tool first and a power-user shortcut second, which is why
 * the navbar also exposes a visible trigger.
 *
 * The palette is wrapped in a Radix Dialog, so focus trapping, Escape and
 * focus return are handled by the primitive. cmdk supplies the listbox
 * keyboard model and filtering.
 */
export default function CommandPalette({ open, onOpenChange }) {
  const reduce = useReducedMotion();
  const { copied, copy } = useCopyToClipboard();

  useEffect(() => {
    const onKey = (event) => {
      const key = event.key?.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const close = () => onOpenChange(false);

  /* Deferred actions run a tick after the dialog starts closing. That matters
     for in-page navigation: Radix restores focus to the trigger on close, so
     scrolling and focusing the destination first would lose that focus a
     moment later. External links and mailto stay synchronous so the browser
     still sees them inside the original user gesture and does not treat the
     new tab as a popup. */
  const run = (action, { defer = false } = {}) => () => {
    close();
    if (defer) window.setTimeout(action, 0);
    else action();
  };

  const go = (id) =>
    run(() => scrollToSection(id, { behavior: reduce ? "auto" : "smooth" }), {
      defer: true,
    });

  const openExternal = (href) => () => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const live = projects.filter((p) => p.live_url);
  const sourceOnly = projects.filter((p) => !p.live_url);

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Command menu"
      description="Search sections, projects and contact actions."
    >
      <CommandInput placeholder="Jump to a section, project or action" />

      <CommandList>
        <CommandEmpty>
          Nothing matches that. Try “work”, “contact”, “React” or a project name.
        </CommandEmpty>

        <CommandGroup heading="Navigate">
          {navLinks.map((link) => (
            <CommandItem
              key={link.id}
              value={`Go to ${link.title} ${link.id}`}
              onSelect={go(link.id)}
            >
              <ArrowUpRight width={16} height={16} />
              <span className="text-fg">{link.title}</span>
              <CommandShortcut>Section</CommandShortcut>
            </CommandItem>
          ))}
          <CommandItem
            value="Back to top home hero"
            onSelect={run(
              () => {
                window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
                window.history.replaceState(null, "", " ");
              },
              { defer: true },
            )}
          >
            <ArrowUp width={16} height={16} />
            <span className="text-fg">Back to top</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Contact">
          <CommandItem
            value={`Copy email address ${profile.email}`}
            onSelect={() => copy(profile.email)}
          >
            {copied ? (
              <Check width={16} height={16} className="text-success" />
            ) : (
              <Copy width={16} height={16} />
            )}
            <span className="text-fg">
              {copied ? "Email copied" : "Copy email address"}
            </span>
            <CommandShortcut>
              {copied ? profile.email : "Clipboard"}
            </CommandShortcut>
          </CommandItem>

          <CommandItem
            value={`Send an email ${profile.email}`}
            onSelect={run(() => {
              window.location.href = `mailto:${profile.email}`;
            })}
          >
            <Mail width={16} height={16} />
            <span className="text-fg">Send an email</span>
            <CommandShortcut>Mail app</CommandShortcut>
          </CommandItem>

          <CommandItem
            value={`Open GitHub profile ${profile.handle}`}
            onSelect={run(openExternal(profile.github))}
          >
            <Github width={16} height={16} />
            <span className="text-fg">GitHub profile</span>
            <CommandShortcut>@{profile.handle}</CommandShortcut>
          </CommandItem>

          <CommandItem
            value="Chat on WhatsApp"
            onSelect={run(openExternal(profile.whatsapp))}
          >
            <Whatsapp width={16} height={16} />
            <span className="text-fg">Chat on WhatsApp</span>
            <CommandShortcut>Urgent</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Live projects">
          {live.map((project) => (
            <CommandItem
              key={project.id}
              value={`${project.name} ${project.category} ${project.tags.join(" ")}`}
              onSelect={run(openExternal(project.live_url))}
            >
              <Globe width={16} height={16} />
              <span className="text-fg">{project.name}</span>
              <CommandShortcut>{project.year}</CommandShortcut>
              <ArrowUpRight width={14} height={14} className="ml-1" />
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Source only">
          {sourceOnly.map((project) => (
            <CommandItem
              key={project.id}
              value={`${project.name} ${project.category} ${project.tags.join(" ")}`}
              onSelect={run(openExternal(project.source_code_link))}
            >
              <Github width={16} height={16} />
              <span className="text-fg">{project.name}</span>
              <CommandShortcut>Repository</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

      </CommandList>

      <div className="flex items-center justify-between gap-3 border-t border-linesoft px-4 py-2.5 text-[11px] text-faint">
        <span className="inline-flex items-center gap-2">
          <Search width={13} height={13} />
          Type to filter
        </span>
        <span className="hidden items-center gap-2 sm:inline-flex">
          <kbd className="kbd">↑</kbd>
          <kbd className="kbd">↓</kbd>
          to move
          <kbd className="kbd ml-1">↵</kbd>
          to open
          <kbd className="kbd ml-1">Esc</kbd>
          to close
        </span>
      </div>

      {/* WCAG 4.1.3: announce the copy result without moving focus. */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied to the clipboard." : ""}
      </span>
    </CommandDialog>
  );
}
