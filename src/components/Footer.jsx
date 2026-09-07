import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-[rgba(255,255,255,0.1)] bg-[rgba(10,10,15,0.8)] backdrop-blur">
      <motion.div
        variants={{ fadeIn: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { type: "spring", duration: 1 } } }}}
        className="max-w-7xl mx-auto px-6 text-center"
      >
        <p className="text-secondary text-sm mb-4">
          Built with passion for code and creativity. 2026.
        </p>
        <p className="text-xs text-muted-foreground">
          Portfolio showcasing projects from LottaCodr\'s GitHub repository.
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