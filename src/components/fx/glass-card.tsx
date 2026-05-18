"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  tilt?: boolean;
}

export function GlassCard({
  children,
  className,
  glow = true,
  tilt = true,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useTransform(my, [-50, 50], [6, -6]);
  const ry = useTransform(mx, [-50, 50], [-6, 6]);
  const gx = useTransform(mx, (v) => `${50 + v}%`);
  const gy = useTransform(my, (v) => `${50 + v}%`);
  const glowBg = useTransform(
    [gx, gy],
    ([x, y]) =>
      `radial-gradient(380px circle at ${x} ${y}, rgba(124,195,255,0.22), transparent 55%)`,
  );

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 100);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 100);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={tilt ? { rotateX: rx, rotateY: ry, transformPerspective: 900 } : undefined}
      className={cn(
        "group relative overflow-hidden rounded-3xl glass ring-glow",
        "transition-shadow duration-500 will-change-transform",
        className,
      )}
    >
      {glow && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glowBg }}
        />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
}
