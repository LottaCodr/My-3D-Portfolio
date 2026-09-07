import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { caseStudies } from "../constants";

const CaseStudy = ({ study }) => {
  return (
    <motion.div
      key={study.id}
      variants={{
        fadeInUp: {
          hidden: { y: 30, opacity: 0 },
          show: { y: 0, opacity: 1, transition: { type: "spring", delay: study.id * 0.1, duration: 0.8 } },
        },
      }}
    >
      <div className="gradient-card p-8 rounded-2xl border border-[rgba(255,255,255,0.05)] mb-16">
        <h3 className="text-xl font-bold text-white mb-4">{study.title}</h3>

        {study.challenge && (
          <div className="mb-6">
            <h4 className="text-orange-40 text-sm font-medium mb-2">Challenge</h4>
            <p className="text-secondary text-base leading-relaxed">{study.challenge}</p>
          </div>
        )}

        {study.approach && (
          <div className="mb-6">
            <h4 className="text-orange-40 text-sm font-medium mb-2">Approach</h4>
            <p className="text-secondary text-base leading-relaxed">{study.approach}</p>
          </div>
        )}

        {study.build && (
          <div className="mb-6">
            <h4 className="text-orange-40 text-sm font-medium mb-2">Build</h4>
            <p className="text-secondary text-base leading-relaxed">{study.build}</p>
          </div>
        )}

        {study.result && (
          <div>
            <h4 className="text-orange-40 text-sm font-medium mb-2">Result</h4>
            <p className="text-secondary text-base leading-relaxed">{study.result}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const CaseStudies = () => {
  return (
    <section className="py-24 md:py-32">
      <motion.div
        variants={{
          hidden: { y: -50, opacity: 0 },
          show: { y: 0, opacity: 1, transition: { type: "spring", duration: 1.25 } },
        }}
      >
        <p className="text-secondary text-sm">Case Studies</p>
        <h2 className="text-2xl font-bold text-white">Case Studies.</h2>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {caseStudies.map((study) => (
          <CaseStudy key={study.id} study={study} />
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(CaseStudies, "case-studies");