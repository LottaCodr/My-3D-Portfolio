import { motion } from "framer-motion";
import { styles, noiseOverlay } from "../styles";

const Hero = () => {
  return (
    <section
      className="relative w-screen h-[100vh] min-h-[700px] flex items-center justify-center"
    >
      <div
        className={`${styles.paddingX} absolute inset-0 top-[80px] max-w-7xl mx-auto flex flex-col items-start gap-5`}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.1 }}
        >
          <div className="w-5 h-5 rounded-full bg-[#cfa96e]" />
        </motion.div>

        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-white mb-4"
        >
          Let&apos;s build something incredible
        </h1>
        <p
          className="text-[#cfa96e] text-lg sm:text-xl mb-8 max-w-2xl line-clamp-3"
        >
          From developing robust web platforms and engaging mobile apps to creating
          mesmerizing animations, stunning graphics, and dynamic brand identities,
          I bring your vision to life with seamless FrontEnd and BackEnd solutions.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#work"
            className="group relative px-8 py-4 text-[#0a0a0f] bg-[#cfa96e] text-[#0a0a0f] font-medium rounded-full transition-all duration-300 hover:bg-[#a78755] hover:text-[#0a0a0f]"
          >
            View Work
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#about"
            className="group relative px-8 py-4 border border-[#cfa96e] text-[#cfa96e] font-medium rounded-full transition-all duration-300 group-hover:bg-[#0a0a0f] group-hover:text-[#0a0a0f]"
          >
            About Me
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Noise texture overlay */}
      <div
        className={`${noiseOverlay} absolute inset-0 pointer-events-none z-10`}
      />

      {/* Floating abstract shape */}
      <motion.div
        className="absolute -bottom-8 -right-8 w-96 h-96 bg-[radial-gradient(circle_at_30%_30%,rgba(207,169,110,0.15)_0%,transparent_50%)] opacity-20 blur-lg"
        animate={{ x: [0, -20], y: [0, 20], opacity: [1, 0.8] }}
        transition={{ duration: 20, repeat: Infinity, ease: "sin.inOut" }}
      />
    </section>
  );
};

export default Hero;