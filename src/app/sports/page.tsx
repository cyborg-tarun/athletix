import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Flame } from "lucide-react";
import { SPORTS } from "@/lib/data/sports";
import { Reveal } from "@/components/fx/reveal";

export const metadata: Metadata = {
  title: "All Sports — Browse 11 sports across the GTA",
  description:
    "Cricket, badminton, soccer, pickleball, hockey, fitness, swimming and more. Find your sport, book your slot.",
};

export default function SportsIndexPage() {
  return (
    <div className="relative">
      <section className="relative mx-auto max-w-7xl px-5 pt-16 pb-12 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-electric-300">
            11 sports
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
            Pick your <span className="text-gradient">sport</span>.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-ink-200">
            Browse every sport ATHLETIX supports across the GTA. Each one comes with curated venues,
            verified ratings, and clean booking flows.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SPORTS.map((s, i) => (
            <Link
              key={s.slug}
              href={`/sports/${s.slug}`}
              className="group relative block aspect-[5/4] overflow-hidden rounded-3xl ring-1 ring-white/10 transition-shadow hover:ring-white/25"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Image
                src={s.hero}
                alt={s.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.08]"
              />
              <div
                className="absolute inset-0 mix-blend-overlay opacity-60 transition-opacity group-hover:opacity-80"
                style={{ background: `linear-gradient(160deg, transparent 30%, ${s.accent}50 80%)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />

              {s.trending && (
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-glow/15 px-2 py-1 text-[11px] font-medium text-amber-glow ring-1 ring-amber-glow/40 backdrop-blur">
                  <Flame className="h-3 w-3" /> Trending
                </span>
              )}
              <div className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-xl backdrop-blur">
                {s.emoji}
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-2xl font-semibold tracking-tight">{s.name}</p>
                <p className="mt-1 text-sm text-ink-200">{s.description}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-[12px] text-electric-300">
                  Browse {s.name.toLowerCase()} venues <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
