"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FLAVORS } from "@/lib/flavors";

const TOTAL_MS = 3100;

/** A small flavor can used purely for the burst animation — same
 *  original-illustration language as the rest of the site (body +
 *  foil lid), just simplified since it's only on screen briefly. */
function BurstCan({ color, dark }: { color: string; dark: string }) {
  return (
    <svg viewBox="0 0 60 100" className="w-10 h-auto drop-shadow-lg">
      <rect x="8" y="14" width="44" height="82" rx="16" fill={color} />
      <rect x="8" y="14" width="44" height="82" rx="16" fill="rgba(0,0,0,0.15)" />
      <rect x="8" y="40" width="44" height="4" fill={dark} opacity="0.6" />
      <ellipse cx="30" cy="14" rx="22" ry="7" fill="#E9E1CB" />
    </svg>
  );
}

export default function IntroSplash() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"idle" | "wobble" | "burst" | "fade">(
    "idle"
  );
  const [progress, setProgress] = useState(0);
  const scheduledRef = useRef(false);
  const startRef = useRef<number | null>(null);

  // drive a 0→100 counter across the whole intro timeline via rAF,
  // so the number feels tied to real elapsed time rather than steps
  useEffect(() => {
    if (!show) return;
    startRef.current = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const elapsed = now - (startRef.current ?? now);
      const pct = Math.min(100, Math.round((elapsed / TOTAL_MS) * 100));
      setProgress(pct);
      if (pct < 100) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [show]);

  useEffect(() => {
    setMounted(true);

    // React 18 dev mode runs effects twice (Strict Mode) to surface
    // bugs. Without this guard, the first run would schedule timers
    // and immediately mark the intro as "seen" in sessionStorage;
    // its own cleanup would then cancel those timers before they
    // fire, and the second run would see "seen" already set and
    // skip scheduling new ones — leaving the intro permanently
    // frozen on frame one. The ref makes scheduling happen exactly
    // once, and we deliberately return no cleanup so the phantom
    // dev-mode unmount can't cancel the timers we just started.
    if (scheduledRef.current) return;

    const seen = sessionStorage.getItem("pringles-intro-seen");
    if (seen) return;

    scheduledRef.current = true;
    sessionStorage.setItem("pringles-intro-seen", "1");
    setShow(true);
    document.body.style.overflow = "hidden";

    setTimeout(() => setPhase("wobble"), 500);
    setTimeout(() => setPhase("burst"), 1000);
    setTimeout(() => setPhase("fade"), 2100);
    setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, TOTAL_MS);
  }, []);

  if (!mounted) return null;

  const burst = phase === "burst" || phase === "fade";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "fade" ? 0 : 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[var(--ink)] overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="font-display font-bold text-2xl md:text-3xl text-[var(--cream)] mb-10 tracking-wide z-[2]"
          >
            Pringles<span style={{ color: "var(--gold)" }}>.</span>
          </motion.div>

          {/* the ORIGINAL can — everything erupts from here */}
          <div className="relative w-[90px] h-[160px]">
            <motion.div
              className="absolute inset-x-0 bottom-0 h-[128px] rounded-[46px/15px]"
              style={{ background: "var(--flavor)", transformOrigin: "bottom" }}
              initial={{ scaleY: 0.4, opacity: 0 }}
              animate={{
                scaleY: 1,
                opacity: 1,
                x:
                  phase === "wobble"
                    ? [0, -4, 4, -3, 3, 0]
                    : 0,
                rotate:
                  phase === "wobble" ? [0, -2, 2, -1.5, 1.5, 0] : 0,
              }}
              transition={{
                scaleY: { duration: 0.5, delay: 0.05, ease: "easeOut" },
                opacity: { duration: 0.5, delay: 0.05, ease: "easeOut" },
                x: { duration: 0.5, ease: "easeInOut" },
                rotate: { duration: 0.5, ease: "easeInOut" },
              }}
            />

            {/* lid pops off */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[32px] rounded-full z-[2]"
              style={{
                background:
                  "linear-gradient(180deg,#F4EDDC,#D9CBA3 60%,#B8A46F)",
              }}
              initial={{ y: 34, opacity: 0 }}
              animate={
                burst
                  ? { y: -220, opacity: 0, rotate: -50, x: -30 }
                  : { y: 0, opacity: 1, rotate: 0, x: 0 }
              }
              transition={{ duration: 0.55, ease: "backIn" }}
            />

            {/* flash / shockwave right as the lid pops */}
            <AnimatePresence>
              {burst && (
                <motion.div
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 3.2, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full"
                  style={{ background: "var(--gold)" }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* 6 flavor cans bursting outward from the opening */}
          {burst &&
            FLAVORS.map((f, i) => {
              const angle = (i / FLAVORS.length) * Math.PI * 2 - Math.PI / 2;
              const dist = 170 + (i % 2) * 30;
              return (
                <motion.div
                  key={f.name}
                  className="absolute z-[1]"
                  style={{ top: "42%", left: "50%" }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: 0 }}
                  animate={
                    phase === "fade"
                      ? {
                          x: Math.cos(angle) * dist,
                          y: Math.sin(angle) * dist,
                          opacity: 0,
                          scale: 0.6,
                        }
                      : {
                          x: Math.cos(angle) * dist * 0.55,
                          y: Math.sin(angle) * dist * 0.55,
                          opacity: 1,
                          scale: 1,
                          rotate: (i % 2 === 0 ? -1 : 1) * 18,
                        }
                  }
                  transition={{
                    duration: phase === "fade" ? 0.6 : 0.8,
                    delay: phase === "fade" ? 0 : i * 0.05,
                    ease: phase === "fade" ? "easeIn" : "backOut",
                  }}
                >
                  <div style={{ transform: "translate(-50%,-50%)" }}>
                    <BurstCan color={f.color} dark={f.dark} />
                  </div>
                </motion.div>
              );
            })}

          {/* crumb sparks */}
          {burst &&
            [...Array(14)].map((_, i) => {
              const angle = (i / 14) * Math.PI * 2;
              const dist = 60 + (i % 4) * 25;
              return (
                <motion.div
                  key={i}
                  className="absolute top-[42%] left-1/2 w-2 h-2 rounded-[50%_50%_40%_40%] z-[1]"
                  style={{ background: "var(--gold)" }}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist - 10,
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 0.9, delay: 0.05, ease: "easeOut" }}
                />
              );
            })}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: burst ? 0.55 : 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-[11px] tracking-[3px] uppercase text-[var(--cream)] z-[2]"
          >
            Six Flavors. One Pop.
          </motion.div>

          {/* live progress counter */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-[2]">
            <div className="font-display font-bold text-2xl text-[var(--cream)] tabular-nums">
              {progress}%
            </div>
            <div className="w-[160px] h-[3px] rounded-full bg-[var(--cream)]/15 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, var(--flavor), var(--gold))",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
