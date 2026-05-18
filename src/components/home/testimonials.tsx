"use client";

import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/data/testimonials";
import { Reveal } from "@/components/fx/reveal";

export function Testimonials() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <Reveal>
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-magenta-glow">
            Loved by the GTA
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            From weekend warriors
            <br />to provincial coaches.
          </h2>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.06, duration: 0.7 }}
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-6 ring-1 ring-white/[0.06]"
          >
            <Quote className="h-6 w-6 text-white/15" />
            <blockquote className="mt-3 text-[15px] leading-relaxed text-ink-50">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="mt-4 flex items-center gap-1 text-amber-glow">
              {Array.from({ length: t.rating }).map((_, k) => (
                <Star key={k} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <figcaption className="mt-4 flex items-center gap-3">
              <span
                className="grid h-10 w-10 place-items-center rounded-full text-sm font-semibold text-ink-950"
                style={{ background: `linear-gradient(135deg, ${t.color}, #ffffff)` }}
              >
                {t.name.split(" ").map((n) => n[0]).join("")}
              </span>
              <div>
                <div className="text-sm font-medium text-white">{t.name}</div>
                <div className="text-xs text-ink-300">
                  {t.role} · {t.city}
                </div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
