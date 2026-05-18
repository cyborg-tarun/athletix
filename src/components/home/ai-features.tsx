"use client";

import { Bot, Sparkles, Wand2, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/fx/glass-card";
import { Reveal, Stagger, Item } from "@/components/fx/reveal";
import { Badge } from "@/components/ui/badge";

const AI_FEATURES = [
  {
    icon: Wand2,
    title: "AI venue picks",
    desc: "Personalised venue suggestions tuned to your sport, skill level, and play history.",
    color: "from-electric-400 to-electric-600",
  },
  {
    icon: Zap,
    title: "Best time to play",
    desc: "We crunch live demand + your calendar to surface the cheapest, quietest slots.",
    color: "from-neon-400 to-neon-600",
  },
  {
    icon: Bot,
    title: "Athletix Concierge",
    desc: "Chat with an AI assistant that handles bookings, rescheduling and team invites.",
    color: "from-magenta-glow to-electric-500",
  },
  {
    icon: Sparkles,
    title: "Smart match-ups",
    desc: "Find teammates and opponents nearby with skill-matched suggestions.",
    color: "from-amber-glow to-magenta-glow",
  },
];

export function AIFeatures() {
  return (
    <section className="relative overflow-hidden py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-fade-b"
      />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Badge tone="neon" icon={<Sparkles className="h-3 w-3" />}>
                Athletix Intelligence · Beta
              </Badge>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                Your AI sidekick
                <br />
                for <span className="text-gradient-cool">smarter play</span>.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-200">
                Athletix learns the way you play and what your city is doing in real time —
                then puts the perfect match on your calendar.
              </p>
            </div>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AI_FEATURES.map((f) => (
            <Item key={f.title}>
              <GlassCard className="h-full p-6">
                <motion.div
                  whileHover={{ rotate: 6, scale: 1.06 }}
                  className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${f.color} text-ink-950`}
                >
                  <f.icon className="h-4 w-4" />
                </motion.div>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-200">{f.desc}</p>
              </GlassCard>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
