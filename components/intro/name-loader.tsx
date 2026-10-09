"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const NAME = "PRINCE";
const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Full-screen name intro — display-serif letters rising with a blur settle,
 * then the overlay fades and the hero plays underneath. Content stays SSR'd
 * below, so there's zero SEO cost. Skipped for reduced motion.
 */
export function NameLoader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          aria-hidden
          exit={{ opacity: 0, transition: { duration: 0.5, ease: EASE_EXPO } }}
          style={{ pointerEvents: done ? "none" : "auto" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
        >
          <p className="flex overflow-hidden" aria-label="Prince">
            {NAME.split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.55,
                  delay: 0.1 + i * 0.08,
                  ease: EASE_EXPO,
                }}
                className="text-display text-[clamp(3rem,12vw,5.5rem)] leading-none text-text-primary"
              >
                {letter}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.65 }}
              className="text-display text-[clamp(3rem,12vw,5.5rem)] leading-none text-accent"
            >
              .
            </motion.span>
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.75 }}
            className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-text-muted"
          >
            AI/ML Engineer
          </motion.p>
          <div className="mt-8 h-px w-40 overflow-hidden bg-border-subtle">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.0, delay: 0.15, ease: "easeInOut" }}
              onAnimationComplete={() => setDone(true)}
              className="h-full w-full origin-left bg-accent"
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
