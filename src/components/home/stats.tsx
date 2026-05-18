"use client";

import { Activity, Building2, Star, Users } from "lucide-react";
import { AnimatedCounter } from "@/components/fx/animated-counter";
import { Reveal } from "@/components/fx/reveal";

const STATS = [
  { icon: Building2, to: 47,    suffix: "+", label: "Premium venues" },
  { icon: Users,     to: 24800, suffix: "+", label: "Active players" },
  { icon: Activity,  to: 132000, suffix: "+", label: "Slots booked" },
  { icon: Star,      to: 4.92,  suffix: " / 5", label: "Avg rating" },
];

export function StatsStrip() {
  return (
    <section className="relative border-y border-white/[0.06] bg-ink-900/40 backdrop-blur-sm">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-5 py-10 sm:grid-cols-4 lg:px-8">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.07}>
            <div className="flex flex-col items-start gap-2 px-4 py-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 text-electric-300">
                <s.icon className="h-4 w-4" />
              </span>
              <div className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {Number.isInteger(s.to) ? (
                  <AnimatedCounter to={s.to} suffix={s.suffix} />
                ) : (
                  <span>{s.to}{s.suffix}</span>
                )}
              </div>
              <div className="text-xs uppercase tracking-[0.18em] text-ink-300">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
