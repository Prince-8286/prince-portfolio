"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";

const COPPER = "#D4A574";

// Fires once, right after the client takes over. The server never runs it,
// so server HTML and the first client render always agree (docked bird).
function subscribe(onMount: () => void) {
  const id = window.requestAnimationFrame(() => onMount());
  return () => window.cancelAnimationFrame(id);
}

/**
 * Hand-drawn copper swift — side profile, two wings flapping in opposite
 * phase. Line-art matches the Obsidian Ledger aesthetic.
 */
function FlyingBird({ flap }: { flap: boolean }) {
  const wingAnim = flap
    ? { rotate: [6, -34, 6] }
    : undefined;
  const wingTransition = flap
    ? { duration: 0.45, repeat: Infinity, ease: "easeInOut" as const }
    : undefined;

  return (
    <svg
      viewBox="0 0 96 64"
      aria-hidden
      className="h-16 w-16 overflow-visible drop-shadow-[0_0_12px_rgba(212,165,116,0.35)]"
    >
      {/* far wing — dimmer, phase-shifted */}
      <motion.path
        d="M44 38 C38 48 30 52 20 52"
        fill="none"
        stroke={COPPER}
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.45}
        style={{ transformBox: "fill-box", transformOrigin: "100% 0%" }}
        animate={flap ? { rotate: [-6, 22, -6] } : undefined}
        transition={
          flap
            ? { duration: 0.45, repeat: Infinity, ease: "easeInOut", delay: 0.22 }
            : undefined
        }
      />
      {/* tail */}
      <path
        d="M24 42 L8 38 M24 45 L10 49"
        fill="none"
        stroke={COPPER}
        strokeWidth={3}
        strokeLinecap="round"
      />
      {/* body */}
      <path
        d="M20 44 Q38 30 58 36 Q70 40 80 34"
        fill="none"
        stroke={COPPER}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <path
        d="M58 36 Q62 46 54 50 Q40 54 28 48"
        fill="none"
        stroke={COPPER}
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.8}
      />
      {/* head */}
      <circle cx={66} cy={30} r={7} fill="none" stroke={COPPER} strokeWidth={3} />
      {/* beak */}
      <path d="M73 28 L85 31 L73 34 Z" fill={COPPER} />
      {/* eye */}
      <circle cx={67.5} cy={28.5} r={1.6} fill={COPPER} />
      {/* near wing — the flapper, pivoting at the shoulder */}
      <motion.path
        d="M46 34 C38 20 28 12 14 10"
        fill="none"
        stroke={COPPER}
        strokeWidth={4}
        strokeLinecap="round"
        style={{ transformBox: "fill-box", transformOrigin: "100% 100%" }}
        animate={wingAnim}
        transition={wingTransition}
      />
      <motion.path
        d="M46 34 C40 26 34 20 26 17"
        fill="none"
        stroke={COPPER}
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.7}
        style={{ transformBox: "fill-box", transformOrigin: "100% 100%" }}
        animate={wingAnim}
        transition={wingTransition}
      />
    </svg>
  );
}

export function BirdLauncher({ onToggle }: { onToggle: () => void }) {
  const reduced = useReducedMotion();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  // Desktop-class viewport? Decided once, client-side only.
  const [desktop] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(pointer: fine)").matches &&
      window.innerWidth >= 768
    );
  });
  const fly = mounted && !reduced && desktop;

  // Organic curved flight: layered sine wander + banking into turns.
  // Motion values bypass React renders — 60fps with zero re-render cost.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const bank = useMotionValue(0);

  useEffect(() => {
    if (!fly) return;
    let raf = 0;
    let w = window.innerWidth;
    let h = window.innerHeight;
    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    let t = Math.random() * 100;
    let prevX = 0;
    let first = true;
    const step = () => {
      t += 1 / 60;
      const nx =
        w / 2 +
        w * 0.3 * Math.sin(((2 * Math.PI) / 26) * t) +
        w * 0.06 * Math.sin(((2 * Math.PI) / 17) * t + 1.3);
      const ny =
        h * 0.42 +
        h * 0.24 * Math.sin(((2 * Math.PI) / 31) * t + 0.7) +
        h * 0.05 * Math.sin(((2 * Math.PI) / 13) * t);
      x.set(nx - w / 2);
      y.set(ny - h / 2);
      if (first) {
        prevX = nx;
        first = false;
      } else {
        const vx = (nx - prevX) * 60;
        prevX = nx;
        bank.set(Math.max(-16, Math.min(16, vx * 0.12)));
      }
      raf = window.requestAnimationFrame(step);
    };
    raf = window.requestAnimationFrame(step);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [fly, x, y, bank]);

  const button = (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Chat with Prince's AI"
      title="Ask Prince's AI"
      className="pointer-events-auto rounded-full p-1 transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-void"
    >
      <FlyingBird flap={!reduced} />
    </button>
  );

  return (
    <div
      className={
        fly
          ? "pointer-events-none fixed left-1/2 top-1/2 z-[70]"
          : "fixed bottom-5 right-5 z-[70]"
      }
    >
      {fly ? (
        <motion.div style={{ x, y, rotate: bank }} className="flex items-center gap-2">
          <span className="whitespace-nowrap rounded-full border border-border-default bg-surface-1/90 px-3 py-1.5 font-mono text-[0.65rem] tracking-wide text-text-secondary backdrop-blur">
            Ask Prince&apos;s AI
          </span>
          {button}
        </motion.div>
      ) : (
        button
      )}
    </div>
  );
}
