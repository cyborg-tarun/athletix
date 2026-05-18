"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import { EVENTS } from "@/lib/data/events";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/fx/reveal";
import { Aurora } from "@/components/fx/aurora";
import { formatDate } from "@/lib/utils";

const CATEGORIES = ["All", "Tournament", "Match", "Open Play", "Clinic", "News"] as const;

export default function EventsPage() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const filtered = useMemo(
    () => EVENTS.filter((e) => cat === "All" || e.category === cat),
    [cat],
  );

  return (
    <div className="relative">
      <section className="relative isolate overflow-hidden pt-12 pb-8">
        <Aurora className="-z-20 opacity-60" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-amber-glow">
              GTA sports pulse
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
              Events, leagues &amp; <span className="text-gradient">stories</span>.
            </h1>
            <p className="mt-3 max-w-xl text-sm text-ink-200">
              From cricket finals in Brampton to pickleball ladders in Vaughan — the local game,
              live.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className="relative rounded-full px-3.5 py-1.5 text-[12px] text-ink-100 ring-1 ring-white/10 transition hover:bg-white/10"
            >
              {cat === c && (
                <motion.span
                  layoutId="events-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-white/15"
                />
              )}
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e, i) => (
            <motion.article
              key={e.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-3xl ring-1 ring-white/[0.07] transition-shadow hover:ring-white/25"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={e.image}
                  alt={e.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
                <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
                  <Badge tone="electric">{e.category}</Badge>
                  {e.pill && <Badge tone="warn">{e.pill}</Badge>}
                </div>
              </div>
              <div className="bg-ink-900/70 p-5 backdrop-blur">
                <h3 className="font-display text-xl font-semibold leading-tight tracking-tight text-white">
                  {e.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-200">{e.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-[11px] text-ink-300">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" /> {formatDate(e.date, { year: "numeric" })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {e.city}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
