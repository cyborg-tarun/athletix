"use client";

import { motion } from "framer-motion";
import { Compass, CalendarCheck, QrCode } from "lucide-react";
import { GlassCard } from "@/components/fx/glass-card";
import { Reveal, Stagger, Item } from "@/components/fx/reveal";

const STEPS = [
  {
    n: "01",
    icon: Compass,
    title: "Discover",
    desc: "Search 47+ premium venues across the GTA. Filter by sport, price, surface, parking, coaching.",
    accent: "from-electric-400 to-electric-600",
  },
  {
    n: "02",
    icon: CalendarCheck,
    title: "Book",
    desc: "Pick a slot, choose your party size, lock in your court — all in under 30 seconds.",
    accent: "from-neon-400 to-neon-600",
  },
  {
    n: "03",
    icon: QrCode,
    title: "Play",
    desc: "Walk in with your QR receipt. Frictionless check-in. Get on the court and play.",
    accent: "from-magenta-glow to-electric-500",
  },
];

export function HowItWorks() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <Reveal>
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-electric-300">
            How it works
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            Three steps.<br />Zero friction.
          </h2>
        </div>
      </Reveal>

      <Stagger className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3" staggerChildren={0.1}>
        {STEPS.map((s) => (
          <Item key={s.n}>
            <GlassCard className="h-full p-6">
              <div className="flex items-start justify-between">
                <div className={`relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${s.accent} text-ink-950`}>
                  <s.icon className="h-5 w-5" />
                  <motion.div
                    aria-hidden
                    className="absolute -inset-1 rounded-3xl opacity-50 blur-xl"
                    style={{ background: "inherit" }}
                  />
                </div>
                <span className="font-mono text-xs tracking-[0.18em] text-ink-300">{s.n}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-200">{s.desc}</p>
            </GlassCard>
          </Item>
        ))}
      </Stagger>
    </section>
  );
}
