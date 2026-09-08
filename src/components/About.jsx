import { SectionWrapper } from "../hoc";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { capabilities, profile, services, skillsPills } from "../constants";
import { Check, Spark } from "./ui/Icons";

function About() {
  return (
    <>
      <SectionHeading
        eyebrow="Introduction"
        title="I ship software that has to survive contact with real users."
        lede="Five years of building for hospitals, farmers, fashion brands and church communities. The through-line is the same each time: a system that a non-technical person can use on their first attempt, running on infrastructure that does not fall over when the third-party API has a bad day."
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <Reveal className="space-y-6 text-[1.0625rem] leading-[1.75] text-muted">
          <p>
            I work full-stack, but I start at the interface. Most of my projects
            began with someone who could not complete a task — a nurse who could
            not see the queue, an investor who could not read a farm listing, a
            parish administrator re-keying phone numbers by hand — and ended with
            that task taking a quarter of the time.
          </p>
          <p>
            That bias shapes the engineering. I type everything end to end because
            a runtime surprise in a clinical workflow is not an inconvenience. I
            write deterministic fallbacks into AI pipelines because a provider
            outage should degrade quality, not break a request. And I treat
            accessibility as a build step rather than a cleanup pass, because
            retrofitting focus states onto a monochrome design is harder than
            designing them once.
          </p>
          <p>
            Currently based in {profile.location}, working with teams remotely and
            building{" "}
            <a
              href="https://glimms-waitlist.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
            >
              Glimms
            </a>{" "}
            — an AI styling product that generates outfits, room layouts and garden
            plans from what people already own.
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

      {/* Services */}
      <div className="mt-20">
        <h3 className="mono text-xs uppercase tracking-[0.16em] text-faint">
          How I can help
        </h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal
              as="li"
              key={service.title}
              delay={i * 0.06}
              className="card group p-6 transition-colors duration-300 hover:border-accent/40"
            >
              <img
                src={service.icon}
                alt=""
                aria-hidden="true"
                width={36}
                height={36}
                className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <h4 className="mt-5 text-base font-semibold text-fg">
                {service.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {service.blurb}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SectionWrapper(About, "about");
