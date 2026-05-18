import type { Metadata } from "next";
import { Suspense } from "react";
import { VenueList } from "@/components/venues/venue-list";
import { Reveal } from "@/components/fx/reveal";
import { Aurora } from "@/components/fx/aurora";

export const metadata: Metadata = {
  title: "All venues — Premium sports courts across the GTA",
  description:
    "Browse, filter and book 47+ premium sports venues across Toronto, Brampton, Mississauga, Vaughan, Markham and Scarborough.",
};

export default function VenuesPage() {
  return (
    <div className="relative">
      <section className="relative isolate overflow-hidden pt-12 pb-10">
        <Aurora className="-z-20 opacity-60" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-electric-300">
              47 venues · across the GTA
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
              Find your <span className="text-gradient">perfect court</span>.
            </h1>
            <p className="mt-3 max-w-xl text-sm text-ink-200">
              Filter by sport, surface, price, amenities — and lock in a slot in seconds.
            </p>
          </Reveal>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="h-80 animate-pulse rounded-3xl bg-white/[0.04] ring-1 ring-white/5" />
              ))}
            </div>
          </div>
        }
      >
        <VenueList />
      </Suspense>
    </div>
  );
}
