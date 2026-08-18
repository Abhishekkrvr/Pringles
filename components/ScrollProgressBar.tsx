"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[150]"
    >
      <div
        className="h-full w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--flavor), var(--gold))",
        }}
      />
    </motion.div>
  );
}
