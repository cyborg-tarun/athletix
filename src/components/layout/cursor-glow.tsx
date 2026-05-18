"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 220, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 28, mass: 0.5 });

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;
    function onMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[55] hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 md:block"
    >
      <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(124,195,255,0.10),transparent_60%)]" />
    </motion.div>
  );
}
