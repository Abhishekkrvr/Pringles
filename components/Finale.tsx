"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { FLAVORS } from "@/lib/flavors";

function MagneticButton() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 12 });
  const sy = useSpring(y, { stiffness: 150, damping: 12 });
  const [burstId, setBurstId] = useState(0);
  const [bursting, setBursting] = useState(false);

  const handleClick = () => {
    setBurstId((n) => n + 1);
    setBursting(true);
    setTimeout(() => setBursting(false), 700);
  };

  return (
    <div className="relative">
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, delay: 0.75 }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - rect.left - rect.width / 2) * 0.4);
          y.set((e.clientY - rect.top - rect.height / 2) * 0.4);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        onClick={handleClick}
        style={{ x: sx, y: sy }}
        data-cursor-label="Pop!"
        whileTap={{ scale: 0.95 }}
        className="relative mt-8 inline-flex items-center gap-[10px] px-[30px] py-4 rounded-full font-display font-bold text-[15px] tracking-wide bg-[var(--gold)] text-[var(--ink)]"
      >
        Find It Near You →
      </motion.button>

      <AnimatePresence>
        {bursting && (
          <div className="absolute inset-0 pointer-events-none" key={burstId}>
            {[...Array(12)].map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const dist = 70 + (i % 3) * 20;
              return (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-[50%_50%_40%_40%]"
                  style={{
                    background: FLAVORS[i % FLAVORS.length].color,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
                    opacity: 0,
                    scale: 0.4,
                    rotate: 180,
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


export default function Finale() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center bg-[var(--ink)] text-[var(--cream)] overflow-hidden px-[6vw]">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-display font-bold leading-[0.92] tracking-[-2px] text-[clamp(40px,9vw,110px)]"
      >
        Grab
        <br />
        The Stack
      </motion.h2>

      <div className="flex gap-2 my-11">
        {FLAVORS.map((f, i) => (
          <motion.div
            key={f.name}
            initial={{ y: 80, rotate: (i % 2 === 0 ? -1 : 1) * (10 + i * 2), opacity: 0 }}
            whileInView={{ y: 0, rotate: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.7,
              delay: 0.3 + i * 0.06,
              type: "spring",
              bounce: 0.5,
            }}
            animate={{ y: [0, -8, 0] }}
            style={{
              background: f.color,
              width: 46,
              height: 46,
              borderRadius: "50% 50% 46% 46%",
              boxShadow: "0 6px 14px rgba(0,0,0,.4)",
            }}
            className="[animation-delay:var(--d)]"
          />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 0.6, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="max-w-[420px] text-sm leading-[1.6]"
      >
        Six cans, six moods. Whichever one you scrolled past twice — that's
        the one you actually want.
      </motion.p>

      <MagneticButton />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 0.4, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-[60px] text-[11px] tracking-[2px] uppercase"
      >
        Fan-made concept experience · Next.js + GSAP + Framer Motion + Lenis
      </motion.div>
    </section>
  );
}
