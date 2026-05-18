"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight, MapPin } from "lucide-react";
import { EVENTS } from "@/lib/data/events";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/fx/reveal";
import { formatDate } from "@/lib/utils";

export function EventsSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <Reveal>
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-amber-glow">
              Local pulse
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Events, tournaments,
              <br />
              and the <span className="text-gradient-cool">latest moves.</span>
            </h2>
          </div>
          <Link
            href="/events"
            className="hidden shrink-0 items-center gap-1.5 text-sm text-ink-200 hover:text-white sm:inline-flex"
          >
            All events <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {EVENTS.slice(0, 6).map((e) => (
          <Link
            key={e.id}
            href="/events"
            className="group relative overflow-hidden rounded-3xl ring-1 ring-white/[0.07] transition-shadow hover:ring-white/25"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={e.image}
                alt={e.title}
                fill
                sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
              <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
                <Badge tone="electric">{e.category}</Badge>
                {e.pill && <Badge tone="warn">{e.pill}</Badge>}
              </div>
            </div>
            <div className="bg-ink-900/70 p-4 backdrop-blur">
              <h3 className="font-display text-lg font-semibold leading-tight tracking-tight text-white">
                {e.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-xs text-ink-200">{e.excerpt}</p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-ink-300">
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" /> {formatDate(e.date)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {e.city}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
