"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 1967, suffix: "", label: "The year the stack began", isYear: true },
  { value: 180, suffix: "+", label: "Countries snacking right now" },
  { value: 6, suffix: "", label: "Flavors on this very page" },
  { value: 42, suffix: "%", label: "Curve angle, precisely engineered" },
];

function Counter({
  value,
  suffix,
  isYear,
}: {
  value: number;
  suffix: string;
  isYear?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: isYear ? 1900 : 0 };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            if (el) el.textContent = Math.round(obj.val).toString();
          },
        });
      },
    });

    return () => trigger.kill();
  }, [value, isYear]);

  return (
    <span className="tabular-nums">
      <span ref={ref}>{isYear ? 1900 : 0}</span>
      {suffix}
    </span>
  );
}

export default function StatsBand() {
  return (
    <section className="relative py-24 px-[6vw] bg-[var(--paper)]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <div className="font-display font-bold text-[clamp(36px,5vw,58px)] leading-none text-[var(--flavor-dark)]">
              <Counter value={s.value} suffix={s.suffix} isYear={s.isYear} />
            </div>
            <p className="mt-3 text-sm opacity-70 max-w-[180px] mx-auto md:mx-0">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
