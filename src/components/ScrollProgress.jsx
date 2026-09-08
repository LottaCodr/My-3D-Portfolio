import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * Thin reading-progress bar pinned under the header.
 * Gives a long single-page document a sense of position, which the research
 * calls out as a scannability aid. Spring-smoothed, and hidden entirely for
 * users who prefer reduced motion.
 */
export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-progress h-[2px] origin-left bg-gradient-to-r from-accent via-accentsoft to-accent"
    />
  );
}
