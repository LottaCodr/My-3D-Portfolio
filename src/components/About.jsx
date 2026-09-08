import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { skillsPills, stats } from "../constants";
import { styles } from "../styles";

const About = () => {
  return (
    <section className="relative py-24 md:py-32">
      <motion.div variants={{ textVariant: { hidden: { y: -50, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring", duration: 1.25 } } } }}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={{ fadeIn: { hidden: { x: 100, opacity: 0 }, show: { x: 0, opacity: 1, transition: { type: "spring", delay: 0.1, duration: 1 } } }}}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] mb-16"
      >
        I am an experienced software developer with a passion for creating efficient,
        scalable, and user-friendly applications. Over the years, I have honed my
        skills in various programming languages and frameworks, allowing me to tackle
        a wide range of development challenges. My journey has taken me through
        health-care systems, AI pipelines, investment platforms, and creative
        technologies, each project adding new dimensions to my approach to
        problem-solving and code craftsmanship.
      </motion.p>

      <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={{ fadeInUp: { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring", delay: index * 0.1, duration: 0.8 } } }}}
            className="flex flex-col items-start text-left"
          >
            <div
              className="w-12 h-12 rounded-xl bg-[rgba(207,169,110,0.1)] flex items-center justify-center mb-3"
            >
              <svg
                className="w-6 h-6 text-[#cfa96e]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2v4l2 12-2 12-4-4 2-12 4 4 2 12" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-[#cfa96e]">{stat.value}</p>
            <p className="text-secondary text-sm mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
        {skillsPills.map((skill, index) => (
          <motion.span
            key={skill}
            variants={{
              scaleIn: {
                hidden: { scale: 0, opacity: 0 },
                show: { scale: 1, opacity: 1, transition: { type: "spring", delay: index * 0.05, duration: 0.5 } },
              },
            }}
            className="inline-flex items-center rounded-full bg-[rgba(207,169,110,0.1)] px-4 py-2 text-sm text-[#cfa96e] font-medium mx-1 mb-1"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(About, 'about');