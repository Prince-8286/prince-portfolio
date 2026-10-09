"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

function subscribe(onMount: () => void) {
  const id = window.requestAnimationFrame(() => onMount());
  return () => window.cancelAnimationFrame(id);
}

/**
 * Khushi-spec cursor: 6px copper dot (instant) + 34px ring (lerped trail).
 * Enhancement only — the native cursor stays untouched. Fine pointers only,
 * hidden on touch via CSS, dead under reduced motion.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const sx = useMotionValue(-100);
  const sy = useMotionValue(-100);
  const rx = useSpring(sx, { stiffness: 420, damping: 34, mass: 0.6 });
  const ry = useSpring(sy, { stiffness: 420, damping: 34, mass: 0.6 });
  const ringScale = useMotionValue(1);

  useEffect(() => {
    if (!mounted) return;
    const move = (e: MouseEvent) => {
      sx.set(e.clientX - 3);
      sy.set(e.clientY - 3);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest?.("a, button, [role='button']");
      animate(ringScale, interactive ? 1.6 : 1, { duration: 0.25 });
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [mounted, sx, sy, ringScale]);

  if (!mounted || reduced) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-accent [@media(pointer:coarse)]:hidden"
      />
      <motion.div
        aria-hidden
        style={{ x: rx, y: ry, scale: ringScale, marginLeft: -14, marginTop: -14 }}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-[34px] w-[34px] rounded-full border border-accent/60 [@media(pointer:coarse)]:hidden"
      />
    </>
  );
}
