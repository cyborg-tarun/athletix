"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export function ActivityChart({ values }: { values: number[] }) {
  const max = Math.max(1, ...values);
  const W = 540, H = 140, P = 8;
  const stepX = (W - P * 2) / Math.max(1, values.length - 1);

  const pts = useMemo(
    () =>
      values.map((v, i) => ({
        x: P + i * stepX,
        y: H - P - (v / max) * (H - P * 2),
      })),
    [values, stepX, max],
  );

  const path = pts.reduce(
    (acc, p, i) => acc + (i === 0 ? `M${p.x},${p.y}` : ` L${p.x},${p.y}`),
    "",
  );
  const area = `${path} L${pts.at(-1)!.x},${H - P} L${pts[0].x},${H - P} Z`;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-white/[0.03] p-3 ring-1 ring-white/[0.06]">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-32 w-full">
        <defs>
          <linearGradient id="area-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#19e168" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#19e168" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#7cc3ff" />
            <stop offset="100%" stopColor="#5cf09a" />
          </linearGradient>
        </defs>
        <motion.path
          d={area}
          fill="url(#area-fill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d={path}
          fill="none"
          stroke="url(#line)"
          strokeWidth={2.2}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        {pts.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x} cy={p.y} r={3}
            fill="#0a0d14" stroke="#5cf09a" strokeWidth={1.6}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 + i * 0.04, duration: 0.4 }}
          />
        ))}
      </svg>
    </div>
  );
}
