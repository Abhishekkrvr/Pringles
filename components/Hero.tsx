"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { FLAVORS } from "@/lib/flavors";

/** Original hero can illustration — same construction language as the
 *  rest of the site (gradient body, foil lid, pull-tab). Not product
 *  photography or trademarked artwork. */
function HeroCan() {
  return (
    <svg viewBox="0 0 200 380" className="w-full h-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.35)]">
      <defs>
        <linearGradient id="heroBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0,0,0,0.5)" />
          <stop offset="20%" stopColor="rgba(0,0,0,0.1)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="72%" stopColor="rgba(0,0,0,0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.45)" />
        </linearGradient>
        <linearGradient id="heroLid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F4EDDC" />
          <stop offset="55%" stopColor="#D9CBA3" />
          <stop offset="100%" stopColor="#B8A46F" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="370" rx="60" ry="10" fill="rgba(0,0,0,0.3)" />
      <rect x="30" y="48" width="140" height="304" rx="42" fill="var(--flavor)" />
      <rect x="30" y="48" width="140" height="304" rx="42" fill="url(#heroBody)" />
      <rect x="30" y="132" width="140" height="9" fill="var(--flavor-dark)" opacity="0.55" />
      <rect x="30" y="272" width="140" height="9" fill="var(--flavor-dark)" opacity="0.55" />
      <rect x="98" y="54" width="4" height="292" fill="rgba(255,255,255,0.2)" />
      <ellipse cx="100" cy="48" rx="70" ry="24" fill="url(#heroLid)" />
      <ellipse cx="100" cy="48" rx="70" ry="24" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
      <ellipse cx="100" cy="44" rx="50" ry="15" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" strokeDasharray="4 5" />
      <rect x="82" y="18" width="36" height="13" rx="6.5" fill="#EDEADF" stroke="rgba(0,0,0,0.15)" />
    </svg>
  );
}

export default function Hero() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const tween = gsap.to(el, {
      xPercent: -50,
      duration: 22,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-10 px-[6vw] overflow-hidden">
      {/* diagonal color wash background instead of a plain centered blob */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, var(--paper) 0%, var(--cream) 45%, var(--cream) 100%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="pointer-events-none absolute -right-[10%] top-[8%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full blur-[20px]"
        style={{
          background:
            "radial-gradient(circle, var(--flavor-soft), transparent 68%)",
        }}
      />

      <div className="relative z-[2] flex-1 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-10">
        {/* LEFT — copy + CTA */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[4px] uppercase font-semibold mb-5"
            style={{ color: "var(--flavor-dark)" }}
          >
            A Scroll-Powered Flavor Ride
          </motion.div>

          <h1 className="font-display font-bold leading-[0.92] tracking-[-2px] text-[clamp(44px,7.5vw,96px)]">
            <motion.span
              initial={{ y: "120%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="block overflow-hidden"
            >
              <span className="block">Six Cans.</span>
            </motion.span>
            <motion.span
              initial={{ y: "120%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block overflow-hidden"
            >
              <span className="block text-[var(--flavor)]">One Wild Ride.</span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 0.82, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-6 text-[clamp(15px,1.6vw,19px)] max-w-[440px]"
          >
            One perfectly curved chip, six flavors, and a can that spins in
            full 3D as you scroll. Pop the tab and see where it takes you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-9 flex items-center gap-5 flex-wrap"
          >
            <a
              href="#stage"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-display font-bold text-sm tracking-wide bg-[var(--ink)] text-[var(--cream)] hover:bg-[var(--flavor-dark)] transition-colors"
            >
              Start The Ride ↓
            </a>
            <a
              href="#lineup"
              className="text-sm font-semibold underline underline-offset-4 opacity-70 hover:opacity-100 transition-opacity"
            >
              Browse all flavors
            </a>
          </motion.div>
        </div>

        {/* RIGHT — big illustrated can with floating chips */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center"
        >
          <div className="w-[62%] max-w-[280px]">
            <HeroCan />
          </div>

          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-[50%_50%_40%_40%]"
              style={{
                width: 10 + (i % 3) * 6,
                height: 10 + (i % 3) * 6,
                background: "var(--gold)",
                left: `${15 + i * 16}%`,
                top: `${10 + (i % 2) * 65}%`,
              }}
              animate={{ y: [0, -14, 0], rotate: [0, 180, 360] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* MARQUEE — auto-scrolling flavor names strip */}
      <div className="relative z-[2] mt-16 border-y border-[var(--ink)]/10 py-4 overflow-hidden">
        <div ref={marqueeRef} className="flex whitespace-nowrap w-max">
          {[...FLAVORS, ...FLAVORS].map((f, i) => (
            <span
              key={i}
              className="font-display font-semibold text-base md:text-lg mx-6 flex items-center gap-6 opacity-70"
            >
              {f.name}
              <span style={{ color: "var(--flavor)" }}>●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
