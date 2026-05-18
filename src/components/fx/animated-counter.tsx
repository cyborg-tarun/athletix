"use client";

import { animate, useInView, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

export function AnimatedCounter({
  to,
  suffix = "",
  duration = 1.6,
  className,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const value = useMotionValue(0);
  const rounded = useTransform(value, (v) => Math.round(v).toLocaleString("en-CA"));

  useEffect(() => {
    if (inView) {
      const controls = animate(value, to, { duration, ease: [0.16, 1, 0.3, 1] });
      return controls.stop;
    }
  }, [inView, to, duration, value]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
