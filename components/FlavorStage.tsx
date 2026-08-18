"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FLAVORS } from "@/lib/flavors";

gsap.registerPlugin(ScrollTrigger);

function pad(n: number) {
  return n < 10 ? "0" + n : "" + n;
}

export default function FlavorStage() {
  const stagePinRef = useRef<HTMLDivElement>(null);
  const canRigRef = useRef<HTMLDivElement>(null);
  const canStageRef = useRef<HTMLDivElement>(null);
  const canLabelRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const N = FLAVORS.length;
  const active = FLAVORS[activeIndex];

  // Main pinned scroll sequence: spins the can continuously on the
  // Y axis. The label is counter-rotated by the same amount so it
  // always faces the viewer instead of mirroring/flipping — like a
  // sticker on a turntable rather than paint fixed to the surface.
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!stagePinRef.current || !canRigRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: stagePinRef.current,
        start: "top top",
        end: () => "+=" + window.innerHeight * N * 1.1,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const idx = Math.min(N - 1, Math.floor(progress * N));
          setActiveIndex((prev) => (prev !== idx ? idx : prev));

          const totalRotation = progress * 360 * N * 0.5;
          const breathe = 0.92 + Math.sin(progress * Math.PI) * 0.14;

          gsap.set(canRigRef.current, {
            rotateY: totalRotation,
            scale: breathe,
          });

          // The label rotates WITH the can now (it's nested inside
          // canRig, see JSX) so it genuinely reads as printed on the
          // surface. We only fade it out as the can turns edge-on —
          // by the time it would start mirroring past 90°, opacity
          // has already reached 0, so the flipped text is never
          // actually visible, same as a real can you can only read
          // face-on.
          const facing = Math.cos((totalRotation * Math.PI) / 180);
          gsap.set(canLabelRef.current, {
            opacity: Math.max(0, facing) ** 1.6,
          });

          // Light sweep glides across the can, reacting to how
          // "front-on" the can currently is.
          gsap.set(sweepRef.current, {
            opacity: Math.max(0, facing) * 0.55,
            xPercent: facing * 40,
          });
        },
      });

      return () => trigger.kill();
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [N]);

  // Hover micro-tilt + magnetic glow (desktop delight)
  useEffect(() => {
    const el = canStageRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(canRigRef.current, {
        rotateZ: px * 5,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(glowRef.current, {
        x: px * 60,
        y: py * 60,
        duration: 0.6,
        ease: "power2.out",
      });
    };
    const handleLeave = () => {
      gsap.to(canRigRef.current, {
        rotateZ: 0,
        duration: 0.8,
        ease: "elastic.out(1,0.5)",
      });
      gsap.to(glowRef.current, { x: 0, y: 0, duration: 0.8, ease: "power2.out" });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Push active flavor colors onto CSS variables for the can gradient
  useEffect(() => {
    gsap.to(document.documentElement, {
      duration: 0.5,
      "--flavor": active.color,
      "--flavor-dark": active.dark,
      ease: "power2.out",
    });
  }, [active]);

  // Clicking a nav dot jumps the scroll position to that flavor's
  // slice of the pinned sequence.
  const jumpToFlavor = (i: number) => {
    const trigger = ScrollTrigger.getAll().find(
      (t) => t.trigger === stagePinRef.current
    );
    if (!trigger) return;
    const targetProgress = (i + 0.5) / N;
    const scrollTarget =
      trigger.start + targetProgress * (trigger.end - trigger.start);
    window.scrollTo({ top: scrollTarget, behavior: "smooth" });
  };

  return (
    <section id="stage" className="relative bg-[var(--cream)]">
      <div
        ref={stagePinRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        {/* ambient flavor-colored glow wash, shifts with active flavor */}
        <div
          className="pointer-events-none absolute inset-0 transition-[background] duration-700"
          style={{
            background:
              "radial-gradient(60% 50% at 30% 50%, color-mix(in srgb, var(--flavor) 22%, transparent), transparent 70%)",
          }}
        />

        {/* faint giant flavor name watermark in the background, for depth */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.name + "-watermark"}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 0.05, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center font-display font-bold uppercase select-none whitespace-nowrap"
            style={{ fontSize: "min(22vw,300px)", color: "var(--flavor)" }}
          >
            {active.name}
          </motion.div>
        </AnimatePresence>

        {/* progress rail — clickable, jumps to that flavor */}
        <div className="hidden md:flex flex-col gap-[14px] fixed right-6 top-1/2 -translate-y-1/2 z-[90]">
          {FLAVORS.map((f, i) => (
            <button
              key={f.name}
              aria-label={`Jump to ${f.name}`}
              onClick={() => jumpToFlavor(i)}
              className="group relative flex items-center justify-end"
            >
              <span
                className="pointer-events-none absolute right-5 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[1px] opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--ink)] text-[var(--cream)] px-2 py-1 rounded"
              >
                {f.name}
              </span>
              <span
                className="w-2 h-2 rounded-full transition-transform duration-300"
                style={{
                  background:
                    i === activeIndex ? "var(--flavor)" : "rgba(36,20,8,.25)",
                  transform: i === activeIndex ? "scale(1.6)" : "scale(1)",
                }}
              />
            </button>
          ))}
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-[4vw] w-[min(1200px,92vw)] h-full">
          {/* CAN */}
          <div
            ref={canStageRef}
            className="relative h-full flex items-center justify-center"
            style={{ perspective: "1400px" }}
          >
            {/* magnetic glow that follows the cursor */}
            <div
              ref={glowRef}
              className="pointer-events-none absolute w-[380px] h-[380px] rounded-full blur-[60px] opacity-60"
              style={{ background: "var(--flavor)" }}
            />

            <div
              ref={canRigRef}
              className="relative w-[220px] h-[420px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute -bottom-[38px] left-1/2 -translate-x-1/2 w-[70%] h-[26px] rounded-full blur-[4px] bg-[radial-gradient(ellipse,rgba(0,0,0,.35),transparent_70%)]" />

              <div className="can-body absolute inset-0 rounded-[110px/26px] overflow-hidden">
                <div className="absolute left-0 right-0 h-[14px] top-[64px] bg-black/[.18]" />
                <div className="absolute left-0 right-0 h-[14px] bottom-[64px] bg-black/[.18]" />

                {/* seam highlight down the middle, like rolled tin */}
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] bg-white/[.18]" />

                {/* base shading for depth at the bottom */}
                <div className="absolute inset-x-0 bottom-0 h-[70px] bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,.45),transparent_75%)]" />

                {/* metal grain texture + fixed glass reflection streak */}
                <div className="can-grain absolute inset-0 pointer-events-none" />
                <div className="can-reflection absolute inset-0 pointer-events-none" />

                {/* traveling light sweep — reacts to rotation instead of the text */}
                <div
                  ref={sweepRef}
                  className="absolute inset-y-0 -left-1/4 w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                  style={{ opacity: 0 }}
                />
              </div>

              <div className="absolute -top-[22px] left-[6px] right-[6px] h-[44px] rounded-full shadow-[0_6px_14px_rgba(0,0,0,.3)] bg-[linear-gradient(180deg,#ECE3CF,#C9BB94_70%,#A99A6C)]">
                <div className="absolute inset-2 rounded-full border-2 border-dashed border-black/[.18]" />
                {/* foil pull-tab */}
                <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-[34px] h-[13px] rounded-full bg-[#EDEADF] border border-black/[.15] shadow-sm" />
              </div>

              {/* LABEL — rotates WITH the can (nested here, inheriting
                  canRig's rotateY) so it genuinely reads as printed
                  on the surface. It sits OUTSIDE can-body's
                  overflow:hidden so it's never clipped, and its
                  opacity is driven by facing (see onUpdate above) so
                  it fades out before it would ever mirror. */}
              <div
                ref={canLabelRef}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-[14px] text-white pointer-events-none"
              >
                <div className="font-display font-bold text-[26px] leading-tight tracking-wide whitespace-nowrap" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.45)" }}>
                  Pringles<span style={{ color: "var(--gold)" }}>.</span>
                </div>
                <div className="w-8 h-[2px] rounded-full bg-white/40 my-2" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.name + "-tag"}
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="text-[12px] font-semibold tracking-[1px] uppercase bg-white/[.16] px-[14px] py-[6px] rounded-full backdrop-blur-[2px] min-h-[26px] max-w-full flex items-center justify-center text-center leading-tight"
                  >
                    {active.name}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ambient crumb particles for depth */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="crumb absolute"
                  style={{
                    width: `${4 + (i % 5) * 2}px`,
                    height: `${4 + (i % 5) * 2}px`,
                    left: `${(i * 37) % 100}%`,
                    top: `${60 + ((i * 53) % 120)}px`,
                    opacity: 0.15 + (i % 4) * 0.1,
                  }}
                />
              ))}
            </div>
          </div>

          {/* TEXT PANEL */}
          <div className="relative z-[2]">
            <div
              className="text-[13px] tracking-[3px] font-semibold uppercase mb-[14px]"
              style={{ color: "var(--flavor-dark)" }}
            >
              {pad(activeIndex + 1)} / {pad(N)}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <h2 className="font-display font-bold leading-[0.95] tracking-[-1px] text-[clamp(38px,5.4vw,74px)] mb-5 flex flex-wrap">
                  {active.name.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20, rotate: 4 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.03 * i,
                        ease: "easeOut",
                      }}
                      className="inline-block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </h2>
                <p className="text-[16px] leading-[1.6] max-w-[460px] opacity-[.82] mb-[26px]">
                  {active.desc}
                </p>
                <div className="flex flex-wrap gap-[10px]">
                  {active.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                      whileHover={{ scale: 1.06, backgroundColor: "var(--flavor)", color: "#fff" }}
                      className="text-[11px] tracking-[1.5px] uppercase font-semibold px-[14px] py-[8px] rounded-full border-[1.4px] border-[var(--ink)] cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-[30px] flex items-center gap-3">
              <span className="text-[11px] tracking-[2px] uppercase opacity-60">
                Heat
              </span>
              <div className="flex-1 h-[6px] max-w-[160px] rounded bg-black/[.12] overflow-hidden">
                <motion.div
                  className="h-full rounded"
                  style={{ background: "var(--flavor)" }}
                  animate={{ width: `${active.heat}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
