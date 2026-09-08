import { Tilt } from "react-tilt";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { github } from "../assets";

import { motion } from "framer-motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_url,
}) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className="group relative"
    >
      <Tilt
        options={{ max: 25, scale: 1, speed: 400 }}
        className="bg-tertiary p-6 rounded-2xl sm:w-[340px] w-full gradient-card hover:shadow-xl transition-shadow"
      >
        <div className="relative w-full h-[220px] overflow-hidden rounded-2xl group-hover:opacity-90 transition-opacity">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />
          <div
            className="absolute inset-0 flex justify-end m-3 card-img_hover"
          >
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-[rgba(255,255,255,0.1)]"
            >
              <img
                src={github}
                alt="github"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
            {live_url && (
              <div
                onClick={() => window.open(live_url, "_blank")}
                className="absolute top-3 left-3 w-10 h-10 rounded-full bg-[rgba(207,169,110,0.2)] flex justify-center items-center cursor-pointer hover:bg-[rgba(207,169,110,0.3)] transition-colors"
              >
                <svg
                  className="w-4 h-4 text-[#cfa96e]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 7l10 5 2 12-2 12-2 12-10 5-10 5-10-5z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[20px]">{name}</h3>
          <p className="mt-2 text-secondary text-[13px] leading-relaxed">{description}</p>
        </div>
      </Tilt>

      {/* ✅ Added flex flex-wrap to tags container */}
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag.name}
            className={`text-[12px] ${tag.color} opacity-80`}
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Works = () => {
  return (
    <section className="py-24 md:py-32">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}> My Projects</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px] mb-16"
      >
        As an experienced software developer, I have worked on a diverse range
        of projects that showcase my ability to create innovative, efficient,
        and user-centric solutions. Below is an overview of the types of
        projects I have developed and contributed to, highlighting key
        features and technologies used.
      </motion.p>

      <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            {...project}
          />
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Works, "work");