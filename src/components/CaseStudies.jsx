import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import SectionHeading from "./ui/SectionHeading";
import { caseStudies } from "../constants";
import { ArrowUpRight, Github, Plus } from "./ui/Icons";

/* Minto-pyramid ordering: outcome first, then the decisions, then the process.
   Collapsed by default — the research is unanimous that reviewers scan, and
   thirteen fully-expanded studies on one page is the anti-pattern this
   replaces. See docs/ux-research.md §1.1 */

function CaseStudy({ study, index, open, onToggle }) {
  const reduce = useReducedMotion();
  const panelId = `case-study-panel-${study.id}`;
  const buttonId = `case-study-button-${study.id}`;

  return (
    <motion.article
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduce ? 0.01 : 0.5, delay: reduce ? 0 : index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`card overflow-hidden transition-colors duration-300 ${
        open ? "border-accent/35" : "hover:border-accent/25"
      }`}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full min-h-[44px] items-start gap-5 p-6 text-left sm:p-8"
        >
          <span className="mono mt-1.5 hidden flex-none text-xs text-faint sm:block">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-xl font-semibold text-fg sm:text-2xl">
              {study.title}
            </span>
            <span className="mt-1.5 block text-sm text-muted">
              {study.subtitle}
            </span>
            {/* The outcome leads, in the collapsed state — that is the whole
                point of the Minto structure. */}
            <span className="mt-4 flex items-start gap-2.5 border-l-2 border-accent pl-4 text-[15px] font-medium leading-snug text-accent">
              {study.outcome}
            </span>
          </span>

          <span
            aria-hidden="true"
            className={`mt-1 flex h-9 w-9 flex-none items-center justify-center rounded-full border transition-all duration-300 ${
              open
                ? "rotate-45 border-accent bg-accent text-[color:var(--on-accent)]"
                : "border-line text-muted"
            }`}
          >
            <Plus width={16} height={16} />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            key="content"
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-linesoft px-6 pb-8 pt-7 sm:px-8">
              {/* Metrics */}
              <dl className="grid grid-cols-3 gap-4 border-b border-linesoft pb-7">
                {study.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="sr-only">{m.label}</dt>
                    <dd>
                      <span className="tnum block text-2xl font-bold text-fg sm:text-3xl">
                        {m.value}
                      </span>
                      <span className="mt-1 block text-xs leading-snug text-muted">
                        {m.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
                {/* Left rail: role, timeline, stack */}
                <div className="space-y-6">
                  <div>
                    <h4 className="mono text-[11px] uppercase tracking-[0.16em] text-faint">
                      Role
                    </h4>
                    <p className="mt-2 text-sm text-fg">{study.role}</p>
                  </div>
                  <div>
                    <h4 className="mono text-[11px] uppercase tracking-[0.16em] text-faint">
                      Timeline
                    </h4>
                    <p className="mt-2 text-sm text-fg">{study.timeline}</p>
                  </div>
                  <div>
                    <h4 className="mono text-[11px] uppercase tracking-[0.16em] text-faint">
                      Stack
                    </h4>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {study.stack.map((s) => (
                        <li key={s} className="chip">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {study.live_url && (
                      <a
                        href={study.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--primary !min-h-[44px] !px-4 !text-[13px]"
                      >
                        Visit live
                        <ArrowUpRight width={14} height={14} />
                      </a>
                    )}
                    <a
                      href={study.source_code_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--ghost !min-h-[44px] !px-4 !text-[13px]"
                    >
                      <Github width={15} height={15} />
                      Source
                    </a>
                  </div>
                </div>

                {/* Right: problem → constraints → decisions → result */}
                <div className="space-y-7">
                  <div>
                    <h4 className="mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      The problem
                    </h4>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">
                      {study.problem}
                    </p>
                  </div>

                  <div>
                    <h4 className="mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      Constraints
                    </h4>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">
                      {study.constraints}
                    </p>
                  </div>

                  <div>
                    <h4 className="mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      Key decisions
                    </h4>
                    <ol className="mt-3 space-y-3">
                      {study.decisions.map((d, i) => (
                        <li key={i} className="flex gap-3.5 text-[15px] leading-relaxed text-muted">
                          <span className="mono mt-0.5 flex-none text-xs text-accent/70">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {d}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="rounded-lg border border-accent/20 bg-accent/[0.06] p-5">
                    <h4 className="mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      Outcome
                    </h4>
                    <p className="mt-3 text-[15px] leading-relaxed text-fg">
                      {study.result}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function CaseStudies() {
  /* First study open by default so the section never looks empty. */
  const [openId, setOpenId] = useState(caseStudies[0]?.id ?? null);

  return (
    <>
      <SectionHeading
        eyebrow="Case studies"
        title="Five builds, and what actually changed."
        lede="Each one opens with the outcome, then the constraints and the decisions behind it. Tap any study to read the full breakdown — problem, trade-offs, result."
      />

      <div className="mt-12 space-y-4">
        {caseStudies.map((study, index) => (
          <CaseStudy
            key={study.id}
            study={study}
            index={index}
            open={openId === study.id}
            onToggle={() => setOpenId((cur) => (cur === study.id ? null : study.id))}
          />
        ))}
      </div>
    </>
  );
}

export default SectionWrapper(CaseStudies, "case-studies");
