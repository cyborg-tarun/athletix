"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Flame } from "lucide-react";
import { SPORTS } from "@/lib/data/sports";
import { Reveal, Stagger, Item } from "@/components/fx/reveal";

export function SportsGrid() {
  return (
    <section id="sports" className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <Reveal>
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-electric-300">
              11 sports · all in one place
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Whatever your game,
              <br className="hidden sm:block" />
              we&rsquo;ve got the <span className="text-gradient-cool">court</span>.
            </h2>
          </div>
          <Link
            href="/sports"
            className="hidden shrink-0 items-center gap-1.5 text-sm text-ink-200 hover:text-white sm:inline-flex"
          >
            All sports <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>

      <Stagger className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {SPORTS.map((s) => (
          <Item key={s.slug}>
            <Link
              href={`/sports/${s.slug}`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-white/10 transition-shadow hover:ring-white/25"
            >
              <Image
                src={s.hero}
                alt={s.name}
                fill
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.08]"
              />
              <div
                className="absolute inset-0 mix-blend-overlay opacity-60 transition-opacity group-hover:opacity-80"
                style={{
                  background: `linear-gradient(160deg, transparent 30%, ${s.accent}40 80%)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />

              {s.trending && (
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-glow/15 px-2 py-1 text-[10px] font-medium text-amber-glow ring-1 ring-amber-glow/40 backdrop-blur">
                  <Flame className="h-3 w-3" /> Trending
                </span>
              )}

              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 260, damping: 14 }}
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-lg backdrop-blur"
                aria-hidden
              >
                {s.emoji}
              </motion.div>

              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-display text-xl font-semibold tracking-tight text-white">
                  {s.name}
                </p>
                <p className="mt-0.5 text-[12px] text-ink-200">{s.tagline}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-[12px] text-electric-300 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  Explore <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          </Item>
        ))}
      </Stagger>
    </section>
  );
}
