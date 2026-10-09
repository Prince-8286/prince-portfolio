"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const GLYPHS = "!<>-_/[]{}=+*^?#";

type ScrambleTextProps = {
  text: string;
  className?: string;
  /** ms per decrypt tick. */
  speed?: number;
};

/**
 * Decrypt-style reveal — real text renders until scrolled into view,
 * then glyphs settle left to right. DOM is written directly (no re-renders).
 */
export function ScrambleText({ text, className, speed = 28 }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!inView || reduced || !el) return;
    let frame = 0;
    const total = text.length * 2 + 8;
    const id = window.setInterval(() => {
      frame += 1;
      const settled = Math.floor((frame / total) * text.length);
      let s = "";
      for (let i = 0; i < text.length; i += 1) {
        const ch = text[i];
        if (ch === " " || ch === "·") s += ch;
        else if (i < settled) s += ch;
        else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      el.textContent = s;
      if (settled >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [inView, reduced, text, speed]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
