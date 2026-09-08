import { SectionWrapper } from "../hoc";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { capabilities, profile, skillsPills } from "../constants";
import { Check, Spark } from "./ui/Icons";

function About() {
  return (
    <>
      <SectionHeading
        eyebrow="Introduction"
        title="I build software that survives real users."
        lede="5+ years shipping for hospitals, startups and brands — interfaces anyone can master on the first try, on infrastructure that holds up when third-party APIs don't."
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <Reveal className="space-y-6 text-[1.0625rem] leading-[1.75] text-muted">
          <p>
            I&apos;m full-stack but interface-first. Every project starts with
            someone stuck — a nurse who can&apos;t see the queue, an investor who
            can&apos;t read a listing — and ends with that task taking a fraction
            of the time.
          </p>
          <p>
            Typed end to end. Resilient by design. Accessible from day one — not
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
            </a>{" "}
            — AI styling from what you already own.
          </p>

          <ul className="flex flex-wrap gap-2 pt-2">
            {skillsPills.map((skill) => (
              <li key={skill} className="chip">
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="space-y-8">
          {capabilities.map((group) => (
            <div key={group.title}>
              <h3 className="mono flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-accent">
                <Spark width={14} height={14} />
                {group.title}
              </h3>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                    <Check
                      width={16}
                      height={16}
                      className="mt-0.5 flex-none text-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </>
  );
}

export default SectionWrapper(About, "about");
