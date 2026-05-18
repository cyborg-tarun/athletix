import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { Suspense } from "react";
import { SPORTS, SPORT_BY_SLUG } from "@/lib/data/sports";
import { VENUES } from "@/lib/data/venues";
import { Aurora } from "@/components/fx/aurora";
import { GridPattern } from "@/components/fx/grid-pattern";
import { Reveal } from "@/components/fx/reveal";
import { VenueList } from "@/components/venues/venue-list";
import type { SportSlug } from "@/lib/types";

export function generateStaticParams() {
  return SPORTS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sport = SPORT_BY_SLUG[slug];
  if (!sport) return { title: "Sport" };
  return {
    title: `${sport.name} courts & venues across the GTA`,
    description: sport.description,
  };
}

export default async function SportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sport = SPORT_BY_SLUG[slug];
  if (!sport) notFound();

  const count = VENUES.filter((v) => v.sports.includes(slug as SportSlug)).length;

  return (
    <div className="relative">
      <section className="relative isolate overflow-hidden pb-12 pt-10">
        <div className="absolute inset-0 -z-30">
          <Image src={sport.hero} alt="" fill priority className="object-cover opacity-30" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/70 to-ink-950" />
        </div>
        <Aurora className="-z-20" />
        <GridPattern className="-z-10" />

        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start gap-3">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] backdrop-blur"
                style={{
                  background: `${sport.accent}20`,
                  color: sport.accent,
                  boxShadow: `inset 0 0 0 1px ${sport.accent}40`,
                }}
              >
                <span className="text-base">{sport.emoji}</span> {sport.name} · {count} venues live
              </span>
              <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-7xl">
                <span className="text-gradient">{sport.name}</span>, perfectly booked.
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-ink-200 sm:text-base">
                {sport.description}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Suspense fallback={<VenuesSkeleton />}>
        <VenueList fixedSport={slug as SportSlug} />
      </Suspense>
    </div>
  );
}

function VenuesSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-80 animate-pulse rounded-3xl bg-white/[0.04] ring-1 ring-white/5" />
        ))}
      </div>
    </div>
  );
}
