"use client";

import { motion } from "framer-motion";

const LINKS = [
  { label: "The Ride", href: "#stage" },
  { label: "Lineup", href: "#lineup" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[5vw] py-6 text-white mix-blend-difference"
    >
      <a href="#" className="font-display font-bold text-xl tracking-wide pointer-events-auto">
        Pringles<span className="text-gold">.</span>
      </a>

      <div className="hidden md:flex items-center gap-8 pointer-events-auto">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[11px] tracking-[3px] uppercase opacity-85 hover:opacity-100 transition-opacity"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="md:hidden text-[11px] tracking-[3px] uppercase opacity-85 pointer-events-none">
        Once You Pop
      </div>
    </motion.nav>
  );
}
