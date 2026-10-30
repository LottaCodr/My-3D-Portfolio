import { SectionWrapper } from "../hoc";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { capabilities, profile, skillsPills } from "../constants";
import { Check, Spark } from "./ui/Icons";

/* Three statements a reviewer can scan in one pass. Each is a claim the rest
   of the page has to back up, which is the point: no adjectives without
   evidence elsewhere. */
const principles = [
  {
    title: "Outcome first",
    body: "Every build starts with the task that gets faster, not the screen that gets prettier.",
  },
  {
    title: "Typed end to end",
    body: "TypeScript across the boundary, so a renamed field breaks the build, not the user.",
  },
  {
    title: "Accessible by default",
    body: "Keyboard paths, contrast and reduced motion are designed in, never patched on.",
  },
];

function About({ headingId }) {
  return (
    <>
      <SectionHeading
        index="01"
        eyebrow="Introduction"
        headingId={headingId}
        title="I build software that survives real users."
        lede="Five years shipping for hospitals, startups and brands: interfaces anyone can master on the first try, on infrastructure that holds up when third-party APIs do not."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <Reveal className="space-y-6 text-[1.0625rem] leading-[1.75] text-muted">
          <p>
            I am full-stack but interface-first. Every project starts with
            someone stuck, a nurse who cannot see the queue, an investor who
            cannot read a listing, and ends with that task taking a fraction of
            the time.
          </p>
          <p>
            Typed end to end. Resilient by design. Accessible from day one, not
            as a cleanup pass.
          </p>
          <p>
            Based in {profile.location}, working remotely and building{" "}
            <a
              href="https://glimms-waitlist.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
            >
              Glimms
            </a>
            : AI styling from what you already own.
          </p>

          <ul className="flex flex-wrap gap-2 pt-2">
            {skillsPills.map((skill) => (
              <li key={skill}>
                <Badge variant="outline">{skill}</Badge>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="space-y-3">
          {capabilities.map((group) => (
            <Card key={group.title} className="p-5 sm:p-6">
              <h3 className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-accent">
                <Spark width={14} height={14} />
                {group.title}
              </h3>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-snug text-muted"
                  >
                    <Check
                      width={15}
                      height={15}
                      className="mt-0.5 flex-none text-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </Reveal>
      </div>

      <div className="mt-12 grid gap-3 sm:grid-cols-3">
        {principles.map((principle, index) => (
          <Reveal
            key={principle.title}
            delay={index * 0.06}
            className="rounded-lg border border-linesoft bg-white/[0.015] p-5"
          >
            <p className="mono text-[10px] uppercase tracking-[0.16em] text-faint">
              0{index + 1}
            </p>
            <h3 className="mt-2 text-base font-semibold text-fg">
              {principle.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {principle.body}
            </p>
          </Reveal>
        ))}
      </div>
    </>
  );
}

export default SectionWrapper(About, "about");
