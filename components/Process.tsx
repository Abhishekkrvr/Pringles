"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Sliced",
    desc: "Real potatoes, rice, wheat and corn, milled into a dough and rolled paper-thin — no whole-potato chip inconsistency here.",
  },
  {
    n: "02",
    title: "Shaped",
    desc: "Every piece is cut into that exact saddle curve — the hyperbolic paraboloid shape that makes stacking possible in the first place.",
  },
  {
    n: "03",
    title: "Fried & Seasoned",
    desc: "Cooked fast and hot, then dusted with flavor while still warm so the seasoning actually sticks instead of sliding off.",
  },
  {
    n: "04",
    title: "Stacked",
    desc: "Nested curve-into-curve down a tube — the same trick that gets more chips into less space and keeps every single one intact.",
  },
];

export default function Process() {
  return (
    <section className="relative py-28 px-[6vw] bg-[var(--cream)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-[560px]"
        >
          <div
            className="text-xs tracking-[3px] uppercase font-semibold mb-3"
            style={{ color: "var(--flavor-dark)" }}
          >
            From Potato To Pop
          </div>
          <h2 className="font-display font-bold text-[clamp(32px,5vw,56px)] leading-[0.98] tracking-[-1px]">
            How It Actually Gets Stacked
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6 }}
              className="relative p-7 rounded-3xl bg-white/50 border border-black/[.06] backdrop-blur-sm"
            >
              <div
                className="font-display font-bold text-[42px] leading-none mb-5 opacity-20"
                style={{ color: "var(--flavor)" }}
              >
                {step.n}
              </div>
              <h3 className="font-display font-semibold text-xl mb-3">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed opacity-70">{step.desc}</p>

              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-[var(--ink)]/15" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
