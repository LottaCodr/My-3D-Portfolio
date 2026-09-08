import { motion } from "framer-motion";
import { logo } from "../assets";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-[rgba(255,255,255,0.1)] bg-[rgba(10,10,15,0.8)] backdrop-blur">
      <motion.div
        variants={{ fadeIn: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { type: "spring", duration: 1 } } }}}
        className="max-w-7xl mx-auto px-6 text-center"
      >
        <div className="flex items-center justify-center gap-2.5 mb-5">
          <img src={logo} alt="Mr. Lotta logo" className="w-8 h-8 object-contain" />
          <p className="text-white text-[18px] font-bold">
            Mr. <span className="text-[#cfa96e]">Lotta</span>
          </p>
        </div>

        <p className="text-secondary text-sm mb-4">
          Built with passion for code and creativity. 2026.
        </p>
        <p className="text-xs text-secondary">
          Portfolio showcasing projects from LottaCodr&apos;s GitHub repository.
        </p>

        <div className="mt-8 flex justify-center gap-6">
          <a
            href="https://github.com/LottaCodr"
            className="text-secondary hover:text-[#cfa96e] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/lottacodr"
            className="text-secondary hover:text-[#cfa96e] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/lottacodr"
            className="text-secondary hover:text-[#cfa96e] transition-colors"
          >
            Twitter
          </a>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;