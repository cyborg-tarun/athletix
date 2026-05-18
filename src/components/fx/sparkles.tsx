"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Spark {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export function Sparkles({
  density = 36,
  className,
  color = "rgba(255,255,255,0.85)",
}: {
  density?: number;
  className?: string;
  color?: string;
}) {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    const arr: Spark[] = Array.from({ length: density }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.6 + 0.4,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2,
    }));
    setSparks(arr);
  }, [density]);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {sparks.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${s.y}%`,
            left: `${s.x}%`,
            width: s.size,
            height: s.size,
            background: color,
            boxShadow: `0 0 ${s.size * 6}px ${color}`,
          }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            delay: s.delay,
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
