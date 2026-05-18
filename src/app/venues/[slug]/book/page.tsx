import { notFound } from "next/navigation";
import { Suspense } from "react";
import { VENUE_BY_SLUG } from "@/lib/data/venues";
import { ConfirmFlow } from "@/components/booking/confirm-flow";
import { Reveal } from "@/components/fx/reveal";

export const dynamic = "force-dynamic";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venue = VENUE_BY_SLUG[slug];
  if (!venue) notFound();

  return (
    <div className="relative">
      <section className="mx-auto max-w-5xl px-5 pt-12 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-electric-300">Step 1 of 3</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            Confirm your booking.
          </h1>
        </Reveal>
      </section>

      <Suspense fallback={<div className="mx-auto h-72 max-w-5xl animate-pulse rounded-3xl bg-white/5 mx-5 lg:mx-8" />}>
        <ConfirmFlow venue={venue} />
      </Suspense>
    </div>
  );
}
