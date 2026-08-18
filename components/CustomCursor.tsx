"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Each trailing crumb chases the one before it with a progressively
// softer spring, producing a comet-tail effect behind the cursor.
const TRAIL = [
  { stiffness: 1100, damping: 55, size: 7 },
  { stiffness: 480, damping: 46, size: 6 },
  { stiffness: 260, damping: 40, size: 5 },
  { stiffness: 150, damping: 36, size: 4 },
];

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(true);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const s1x = useSpring(x, { stiffness: TRAIL[0].stiffness, damping: TRAIL[0].damping });
  const s1y = useSpring(y, { stiffness: TRAIL[0].stiffness, damping: TRAIL[0].damping });
  const s2x = useSpring(s1x, { stiffness: TRAIL[1].stiffness, damping: TRAIL[1].damping });
  const s2y = useSpring(s1y, { stiffness: TRAIL[1].stiffness, damping: TRAIL[1].damping });
  const s3x = useSpring(s2x, { stiffness: TRAIL[2].stiffness, damping: TRAIL[2].damping });
  const s3y = useSpring(s2y, { stiffness: TRAIL[2].stiffness, damping: TRAIL[2].damping });
  const s4x = useSpring(s3x, { stiffness: TRAIL[3].stiffness, damping: TRAIL[3].damping });
  const s4y = useSpring(s3y, { stiffness: TRAIL[3].stiffness, damping: TRAIL[3].damping });

  const trailPositions = [
    { sx: s1x, sy: s1y, size: TRAIL[0].size },
    { sx: s2x, sy: s2y, size: TRAIL[1].size },
    { sx: s3x, sy: s3y, size: TRAIL[2].size },
    { sx: s4x, sy: s4y, size: TRAIL[3].size },
  ];

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    let first = true;
    const move = (e: MouseEvent) => {
      if (first) {
        // snap straight to the real cursor position on the very
        // first event so it doesn't glide in from a corner
        x.jump(e.clientX);
        y.jump(e.clientY);
        first = false;
        setReady(true);
      } else {
        x.set(e.clientX);
        y.set(e.clientY);
      }
      setVisible(true);
    };
    window.addEventListener("mousemove", move);

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverEl = target.closest(
        "a, button, [data-cursor-hover], [data-cursor-label]"
      ) as HTMLElement | null;
      setHovering(!!hoverEl);
      setLabel(hoverEl?.dataset.cursorLabel ?? null);
    };
    window.addEventListener("mouseover", over);

    const down = () => setPressed(true);
    const up = () => setPressed(false);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    const leave = () => setVisible(false);
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.body.classList.remove("custom-cursor-active");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <motion.div
      animate={{ opacity: ready && visible ? 1 : 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* crumb comet trail */}
      {trailPositions.map((t, i) => (
        <motion.div
          key={i}
          className="pointer-events-none fixed top-0 left-0 z-[298] rounded-[50%_50%_40%_40%]"
          style={{
            x: t.sx,
            y: t.sy,
            translateX: "-50%",
            translateY: "-50%",
            width: t.size,
            height: t.size,
            background: "var(--gold)",
            opacity: 0.5 - i * 0.1,
          }}
        />
      ))}

      {/* core cursor: outer ring + inner dot (blended so it's visible on any bg) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[300] flex items-center justify-center mix-blend-difference"
        style={{ x: s1x, y: s1y, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            scale: hovering ? 2.6 : pressed ? 0.8 : 1,
            opacity: hovering ? 0.15 : 0.9,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute w-9 h-9 rounded-full border-[1.5px]"
          style={{ borderColor: "var(--cream)" }}
        />
        <motion.div
          animate={{ scale: hovering ? 0 : pressed ? 1.6 : 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="w-2.5 h-2.5 rounded-[50%_50%_40%_40%] bg-[var(--cream)]"
        />
      </motion.div>

      {/* hover label bubble — separate layer so its text stays crisp, not blended */}
      {label && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="pointer-events-none fixed top-0 left-0 z-[301] whitespace-nowrap text-[10px] font-bold uppercase tracking-[1px] px-2.5 py-1 rounded-full bg-[var(--gold)] text-[var(--ink)]"
          style={{
            x: s1x,
            y: s1y,
            translateX: "-50%",
            translateY: "26px",
          }}
        >
          {label}
        </motion.div>
      )}
    </motion.div>
  );
}
