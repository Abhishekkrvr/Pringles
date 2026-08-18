"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FLAVORS } from "@/lib/flavors";

/** Original stylized can illustration (not product photography — the
 *  actual Pringles logo/mascot is trademarked, so this is an
 *  independent illustration built to read as "a chip can" through
 *  proportion, metallic shading and a foil lid, without copying any
 *  copyrighted artwork). */
function MiniCan({ color, dark }: { color: string; dark: string }) {
  const uid = color.replace("#", "");
  return (
    <svg
      viewBox="0 0 140 260"
      className="absolute -bottom-3 -right-2 w-[64%] h-auto drop-shadow-[0_18px_24px_rgba(0,0,0,0.45)]"
      style={{ opacity: 0.95 }}
    >
      <defs>
        <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0,0,0,0.55)" />
          <stop offset="18%" stopColor="rgba(0,0,0,0.15)" />
          <stop offset="38%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="52%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="70%" stopColor="rgba(0,0,0,0.1)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
        </linearGradient>
        <linearGradient id={`lid-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F4EDDC" />
          <stop offset="55%" stopColor="#D9CBA3" />
          <stop offset="100%" stopColor="#B8A46F" />
        </linearGradient>
        <radialGradient id={`base-${uid}`} cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.5)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="30%" stopColor="rgba(255,255,255,0)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="53%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="65%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id={`grain-${uid}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <clipPath id={`clip-${uid}`}>
          <rect x="22" y="34" width="96" height="206" rx="30" />
        </clipPath>
      </defs>

      {/* ground shadow */}
      <ellipse cx="70" cy="252" rx="42" ry="8" fill="rgba(0,0,0,0.35)" />

      {/* body */}
      <rect x="22" y="34" width="96" height="206" rx="30" fill={color} />
      <rect x="22" y="34" width="96" height="206" rx="30" fill={`url(#body-${uid})`} />

      <g clipPath={`url(#clip-${uid})`}>
        {/* fine metal grain */}
        <rect x="22" y="34" width="96" height="206" filter={`url(#grain-${uid})`} opacity="0.14" style={{ mixBlendMode: "overlay" }} />
        {/* diagonal glass reflection */}
        <rect x="22" y="34" width="96" height="206" fill={`url(#glass-${uid})`} />
      </g>

      {/* embossed bands */}
      <rect x="22" y="94" width="96" height="7" fill={dark} opacity="0.55" />
      <rect x="22" y="186" width="96" height="7" fill={dark} opacity="0.55" />

      {/* base shading */}
      <rect x="22" y="200" width="96" height="40" rx="30" fill={`url(#base-${uid})`} />

      {/* seam highlight down the middle */}
      <rect x="68" y="40" width="4" height="196" fill="rgba(255,255,255,0.2)" />

      {/* foil lid */}
      <ellipse cx="70" cy="34" rx="48" ry="17" fill={`url(#lid-${uid})`} />
      <ellipse
        cx="70"
        cy="34"
        rx="48"
        ry="17"
        fill="none"
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="1.5"
      />
      <ellipse
        cx="70"
        cy="31"
        rx="34"
        ry="10"
        fill="none"
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      {/* pull tab */}
      <rect x="58" y="14" width="24" height="9" rx="4.5" fill="#EDEADF" stroke="rgba(0,0,0,0.15)" />
    </svg>
  );
}

/** Original stylized chip icon — a simple saddle-curve shape. */
function ChipIcon() {
  return (
    <svg
      viewBox="0 0 60 40"
      className="absolute top-5 right-5 w-9 h-auto opacity-70"
    >
      <path
        d="M4 20 Q20 4 30 20 Q40 36 56 20 Q40 8 30 20 Q20 32 4 20 Z"
        fill="rgba(255,255,255,0.9)"
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function FlavorGrid() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="lineup" className="relative py-28 px-[6vw] bg-[var(--ink)] text-[var(--cream)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-end justify-between flex-wrap gap-4"
        >
          <div>
            <div className="text-xs tracking-[3px] uppercase font-semibold mb-3 text-[var(--gold)]">
              The Full Lineup
            </div>
            <h2 className="font-display font-bold text-[clamp(32px,5vw,56px)] leading-[0.98] tracking-[-1px]">
              Pick Your Fighter
            </h2>
          </div>
          <p className="text-sm opacity-60 max-w-[280px]">
            Scroll back up for the full 3D ride, or just browse the whole
            stack right here.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {FLAVORS.map((f, i) => (
            <motion.a
              href="#stage"
              data-cursor-label="View Flavor"
              key={f.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ y: -8 }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden flex flex-col justify-end p-5 cursor-pointer"
              style={{
                background: `linear-gradient(160deg, ${f.color}, ${f.dark})`,
              }}
            >
              {/* decorative illustration layer */}
              <motion.div
                className="absolute inset-0"
                animate={{ y: hovered === i ? -6 : 0, scale: hovered === i ? 1.04 : 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <MiniCan color={f.color} dark={f.dark} />
              </motion.div>
              <ChipIcon />

              <motion.div
                className="absolute inset-0"
                animate={{
                  opacity: hovered === i ? 0.25 : 0,
                }}
                style={{
                  background:
                    "linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent)",
                }}
              />

              {/* readability gradient so text stays legible over the can art */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

              <div
                className="absolute top-4 left-4 text-[11px] font-semibold tracking-[2px] uppercase opacity-70 z-[1]"
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-[1]">
                <span className="text-sm">→</span>
              </div>

              <h3 className="font-display font-bold text-lg md:text-xl leading-tight relative z-[1]">
                {f.name}
              </h3>
              <div className="mt-2 flex flex-wrap gap-1.5 relative z-[1]">
                {f.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-semibold tracking-[1px] uppercase px-2 py-1 rounded-full bg-white/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
