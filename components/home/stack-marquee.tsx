"use client";

import { motion, useReducedMotion } from "framer-motion";
import { skillNodes } from "@/content/skills";

export function StackMarquee() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="relative z-[1] mt-12 border-y border-border-subtle py-4 md:mt-16">
        <p className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
          {skillNodes.map((s) => (
            <span key={s.id}>{s.label}</span>
          ))}
        </p>
      </div>
    );
  }

  const doubled = [...skillNodes, ...skillNodes];

  return (
    <div
      className="relative z-[1] mt-12 overflow-hidden border-y border-border-subtle py-4 md:mt-16"
      aria-label="Tech stack"
    >
      <motion.div
        className="flex w-max items-center gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((s, i) => (
          <span
            key={`${s.id}-${i}`}
            aria-hidden={i >= skillNodes.length}
            className="flex items-center gap-8 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-text-muted"
          >
            {s.label}
            <span aria-hidden className="text-[0.6rem] text-accent">
              ◆
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
