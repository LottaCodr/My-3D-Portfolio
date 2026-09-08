import { motion, useReducedMotion } from "framer-motion";

/**
 * Single entrance-animation primitive for the whole site.
 *
 * Framer Motion's `useReducedMotion()` is wired in here so *every* reveal in
 * the app collapses to a plain fade for users who asked their OS to reduce
 * motion — the CSS media query alone cannot reach inline transform animations.
 * See docs/ux-research.md §1.2 and §3.4.
 */
export default function Reveal({
  as = "div",
  children,
  delay = 0,
  y = 20,
  x = 0,
  className = "",
  once = true,
  ...rest
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  const hidden = reduce ? { opacity: 0 } : { opacity: 0, y, x };
  const show = {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: reduce ? 0.01 : 0.55,
      delay: reduce ? 0 : delay,
      ease: [0.22, 1, 0.36, 1],
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      variants={{ hidden, show }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
