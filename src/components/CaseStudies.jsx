import { useState } from "react";
import { SectionWrapper } from "../hoc";
import SectionHeading from "./ui/SectionHeading";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { caseStudies } from "../constants";
import { ArrowUpRight, Github, Plus } from "./ui/Icons";

/* Minto-pyramid ordering: outcome first, then the decisions, then the process.
   One study opens at a time, because the research is unanimous that reviewers
   scan, and five fully-expanded studies on one page is the anti-pattern this
   replaces. See docs/ux-research-v2.md §2 */

function CaseStudyItem({ study, index }) {
  return (
    <AccordionItem
      value={study.id}
      className="border-linesoft px-5 transition-colors data-[state=open]:bg-white/[0.015] sm:px-7"
    >
      <AccordionTrigger
        className="py-6"
        indicator={
          <span
            aria-hidden="true"
            className="mt-1 flex h-9 w-9 flex-none items-center justify-center rounded-full border border-control text-muted transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:border-accent group-data-[state=open]:bg-accent group-data-[state=open]:text-[color:var(--on-accent)]"
          >
            <Plus width={16} height={16} />
          </span>
        }
      >
        <span className="mono mt-1.5 hidden flex-none text-[11px] tabular-nums text-faint sm:block">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-xl font-semibold text-fg sm:text-2xl">
            {study.title}
          </span>
          <span className="mt-1.5 block text-sm leading-relaxed text-muted">
            {study.subtitle}
          </span>
          {/* The outcome leads in the collapsed state: that is the whole point
              of the Minto structure. */}
          <span className="mt-4 flex items-start gap-2.5 border-l-2 border-accent pl-4 text-[15px] font-medium leading-snug text-accent">
            {study.outcome}
          </span>
        </span>
      </AccordionTrigger>

      <AccordionContent>
        <div className="pb-9 pt-1">
          {/* Metrics */}
          <dl className="grid grid-cols-3 gap-4 border-b border-linesoft pb-7">
            {study.metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <span className="tnum block text-2xl font-bold text-fg sm:text-3xl">
                    {metric.value}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-muted">
                    {metric.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
            {/* Left rail: role, timeline, stack */}
            <div className="space-y-6">
              <div>
                <h4 className="mono text-[10px] uppercase tracking-[0.16em] text-faint">
                  Role
                </h4>
                <p className="mt-2 text-sm text-fg">{study.role}</p>
              </div>
              <div>
                <h4 className="mono text-[10px] uppercase tracking-[0.16em] text-faint">
                  Timeline
                </h4>
                <p className="mt-2 text-sm text-fg">{study.timeline}</p>
              </div>
              <div>
                <h4 className="mono text-[10px] uppercase tracking-[0.16em] text-faint">
                  Stack
                </h4>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {study.stack.map((tech) => (
                    <li key={tech}>
                      <Badge variant="muted">{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {study.live_url && (
                  <Button asChild size="default" className="px-4 text-[13px]">
                    <a
                      href={study.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${study.title}: open the live site`}
                    >
                      Visit live
                      <ArrowUpRight width={14} height={14} />
                    </a>
                  </Button>
                )}
                <Button
                  asChild
                  variant="secondary"
                  size="default"
                  className="px-4 text-[13px]"
                >
                  <a
                    href={study.source_code_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${study.title}: source repository on GitHub`}
                  >
                    <Github width={15} height={15} />
                    Source
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: problem, constraints, decisions, result */}
            <div className="space-y-7">
              <div>
                <h4 className="mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  The problem
                </h4>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {study.problem}
                </p>
              </div>

              <div>
                <h4 className="mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  Constraints
                </h4>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {study.constraints}
                </p>
              </div>

              <div>
                <h4 className="mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  Key decisions
                </h4>
                <ol className="mt-3 space-y-3">
                  {study.decisions.map((decision, i) => (
                    <li
                      key={i}
                      className="flex gap-3.5 text-[15px] leading-relaxed text-muted"
                    >
                      <span className="mono mt-0.5 flex-none text-[11px] text-accent/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {decision}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-md border border-accent/20 bg-accent/[0.06] p-5">
                <h4 className="mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  Outcome
                </h4>
                <p className="mt-3 text-[15px] leading-relaxed text-fg">
                  {study.result}
                </p>
              </div>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function CaseStudies({ headingId }) {
  /* First study open by default so the section never looks empty. */
  const [openId, setOpenId] = useState(caseStudies[0]?.id ?? "");

  return (
    <>
      <SectionHeading
        index="03"
        eyebrow="Case studies"
        headingId={headingId}
        title="Five builds, and what actually changed."
        lede="Each one opens with the outcome, then the constraints and the decisions behind it. Open any study for the full breakdown: problem, trade-offs, result."
      />

      <Card className="mt-12 overflow-hidden">
        <Accordion
          type="single"
          collapsible
          value={openId}
          onValueChange={setOpenId}
        >
          {caseStudies.map((study, index) => (
            <CaseStudyItem key={study.id} study={study} index={index} />
          ))}
        </Accordion>
      </Card>
    </>
  );
}

export default SectionWrapper(CaseStudies, "case-studies");
