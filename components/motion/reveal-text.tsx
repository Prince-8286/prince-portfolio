"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

type RevealTextProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/** Masked line rise — titles slide up from an overflow mask on scroll in. */
export function RevealText({ children, className, delay = 0 }: RevealTextProps) {
  const reduced = useReducedMotion();

  if (reduced) return <span className={className}>{children}</span>;

  return (
    <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
      <motion.span
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.7, delay, ease: EASE_EXPO }}
        className={className}
      >
        {children}
      </motion.span>
    </span>
  );
}
