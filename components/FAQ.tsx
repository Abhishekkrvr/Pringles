"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "Why is the can a tube instead of a bag?",
    a: "The cylinder keeps every chip the exact same saddle shape, stacked tight with almost no wasted air — so fewer break in transit and the flavor stays sealed in longer than a bag ever could.",
  },
  {
    q: "How many flavors are actually on this page?",
    a: "Six, end to end: Original, Sour Cream & Onion, Cheddar Cheese, BBQ, Pizza, and Salt & Vinegar. Scroll through the 3D ride above or jump straight to the grid to browse them all.",
  },
  {
    q: "Is this an official Pringles site?",
    a: "No — this is a fan-made concept build showcasing scroll-driven 3D animation with Next.js, GSAP, Framer Motion, and Lenis. All flavor descriptions are original text written for this demo.",
  },
  {
    q: "What's actually powering the animations?",
    a: "GSAP + ScrollTrigger drives the pinned 3D can rotation, Framer Motion handles entrance transitions and hover states, and Lenis smooths the scroll itself, synced into GSAP's own ticker.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 px-[6vw] bg-[var(--cream)]">
      <div className="max-w-[760px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div
            className="text-xs tracking-[3px] uppercase font-semibold mb-3"
            style={{ color: "var(--flavor-dark)" }}
          >
            Questions, Answered
          </div>
          <h2 className="font-display font-bold text-[clamp(30px,4.6vw,48px)] leading-[0.98] tracking-[-1px]">
            Before You Pop Another Tab
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-2xl border border-black/[.08] overflow-hidden bg-white/40"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                >
                  <span className="font-display font-semibold text-base md:text-lg">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-2xl leading-none"
                    style={{ color: "var(--flavor)" }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed opacity-70">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
