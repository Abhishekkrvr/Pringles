"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * A handful of soft ambient dots drifting slowly in the background.
 * Purely decorative — adds depth/movement without competing with
 * the main scroll-driven can animation.
 */
export default function FloatingCrumbs({ count = 14 }: { count?: number }) {
  const crumbs = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 71) % 100,
        size: 5 + ((i * 13) % 14),
        delay: (i % 7) * 0.4,
        duration: 10 + ((i * 5) % 9),
        opacity: 0.08 + ((i * 3) % 5) * 0.03,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {crumbs.map((c) => (
        <motion.div
          key={c.id}
          className="absolute rounded-[50%_50%_40%_40%]"
          style={{
            left: `${c.left}%`,
            width: c.size,
            height: c.size,
            background: "var(--gold)",
            opacity: c.opacity,
          }}
          initial={{ y: "110vh", rotate: 0 }}
          animate={{ y: "-10vh", rotate: 180 }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
