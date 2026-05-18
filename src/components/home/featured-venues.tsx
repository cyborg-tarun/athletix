"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FEATURED_VENUES } from "@/lib/data/venues";
import { VenueCard } from "@/components/venues/venue-card";
import { Reveal } from "@/components/fx/reveal";

export function FeaturedVenues() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <Reveal>
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-neon-400">
              Hand-picked · GTA
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Featured venues, <span className="text-gradient">obsessed</span> over.
            </h2>
          </div>
          <Link
            href="/venues"
            className="hidden shrink-0 items-center gap-1.5 text-sm text-ink-200 hover:text-white sm:inline-flex"
          >
            See all venues <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_VENUES.slice(0, 6).map((v, i) => (
          <VenueCard key={v.id} venue={v} index={i} />
        ))}
      </div>
    </section>
  );
}
