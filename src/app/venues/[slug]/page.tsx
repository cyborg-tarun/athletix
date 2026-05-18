import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Baby, Car, CheckCircle2, Coffee, MapPin, Navigation, ParkingCircle, ShieldCheck,
  Star, Trophy, Wifi,
} from "lucide-react";
import { VENUE_BY_SLUG, VENUES } from "@/lib/data/venues";
import { SPORT_BY_SLUG } from "@/lib/data/sports";
import { Badge } from "@/components/ui/badge";
import { VenueGallery } from "@/components/venues/venue-gallery";
import { BookingPanel } from "@/components/venues/booking-panel";
import { GTAMap } from "@/components/map/gta-map";
import { Reveal } from "@/components/fx/reveal";
import { VenueCard } from "@/components/venues/venue-card";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return VENUES.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = VENUE_BY_SLUG[slug];
  if (!v) return { title: "Venue" };
  return {
    title: `${v.name} — ${v.city}`,
    description: `${v.tagline}. ${v.amenities.slice(0, 3).join(" · ")}.`,
    openGraph: { images: [v.images[0]] },
  };
}

export default async function VenueDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venue = VENUE_BY_SLUG[slug];
  if (!venue) notFound();
  const sport = SPORT_BY_SLUG[venue.primarySport];

  const similar = VENUES.filter(
    (v) => v.id !== venue.id && v.sports.some((s) => venue.sports.includes(s)),
  ).slice(0, 3);

  return (
    <article className="relative">
      <section className="mx-auto max-w-7xl px-5 pt-10 lg:px-8">
        <Reveal>
          <Link href="/venues" className="text-xs text-ink-300 hover:text-white">
            ← All venues
          </Link>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="electric" icon={<span className="-mt-0.5">{sport?.emoji}</span>}>
                  {sport?.name}
                </Badge>
                {venue.featured && <Badge tone="warn">Featured</Badge>}
                <Badge tone="muted">{venue.surface}</Badge>
                <Badge tone="muted">{venue.indoor ? "Indoor" : "Outdoor"}</Badge>
              </div>
              <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
                {venue.name}
              </h1>
              <p className="mt-2 text-sm text-ink-200">{venue.tagline}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-300">
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-glow text-amber-glow" />
                  <strong className="text-white">{venue.rating.toFixed(1)}</strong> · {venue.reviewCount} reviews
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {venue.neighbourhood}, {venue.city}
                </span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${venue.lat},${venue.lng}`}
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1 text-electric-300 hover:text-white"
                >
                  <Navigation className="h-3.5 w-3.5" /> Directions
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <VenueGallery images={venue.images} name={venue.name} />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <Block title="About this venue">
              <p className="text-[15px] leading-relaxed text-ink-100">
                {venue.name} is a {venue.indoor ? "premium indoor" : "stunning outdoor"} {sport?.name.toLowerCase()} facility located in {venue.neighbourhood}, {venue.city}.
                Built for serious players and weekend warriors alike — pro-grade {venue.surface.toLowerCase()} surfaces,
                spotless change rooms, and a team that obsesses over your experience.
              </p>
            </Block>

            <Block title="What's included">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {venue.amenities.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-ink-100">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-neon-400" />
                    {a}
                  </li>
                ))}
                {venue.parking && <Quick icon={<ParkingCircle className="h-4 w-4" />} label="On-site parking" />}
                {venue.kidsFriendly && <Quick icon={<Baby className="h-4 w-4" />} label="Kids friendly" />}
                {venue.coaching && <Quick icon={<Trophy className="h-4 w-4" />} label="Coaching available" />}
                {venue.foodCourt && <Quick icon={<Coffee className="h-4 w-4" />} label="Café & food court" />}
                {venue.indoor && <Quick icon={<Wifi className="h-4 w-4" />} label="Free Wi-Fi" />}
                {venue.parking && <Quick icon={<Car className="h-4 w-4" />} label="EV charging stations" />}
              </ul>
            </Block>

            <Block title="Reviews">
              <div className="rounded-3xl bg-white/[0.03] p-5 ring-1 ring-white/10">
                <div className="flex items-center gap-3">
                  <div className="font-display text-4xl font-semibold tracking-tight text-white">
                    {venue.rating.toFixed(2)}
                  </div>
                  <div className="text-xs text-ink-200">
                    based on <strong className="text-white">{venue.reviewCount}</strong> player reviews
                  </div>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {venue.reviews.map((r) => (
                    <div key={r.id} className="rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/[0.05]">
                      <div className="flex items-center gap-2">
                        <span
                          className="grid h-8 w-8 place-items-center rounded-full text-xs font-semibold text-ink-950"
                          style={{ background: `linear-gradient(135deg, ${r.avatarColor}, #ffffff)` }}
                        >
                          {r.user.split(" ").map((n) => n[0]).join("")}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-white">{r.user}</p>
                          <p className="text-[11px] text-ink-300">{formatDate(r.date)}</p>
                        </div>
                        <div className="ml-auto inline-flex items-center gap-1 text-amber-glow">
                          {Array.from({ length: r.rating }).map((_, k) => (
                            <Star key={k} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-ink-100">{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Block>

            <Block title="House rules">
              <ul className="grid gap-2 text-sm text-ink-100 sm:grid-cols-2">
                {venue.rules.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-400" />
                    {r}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Cancellation policy">
              <div className="inline-flex items-start gap-3 rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/[0.06]">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-neon-400" />
                <p className="text-sm leading-relaxed text-ink-100">{venue.cancellationPolicy}</p>
              </div>
            </Block>

            <Block title="Location">
              <p className="mb-3 text-sm text-ink-200">
                {venue.address}
              </p>
              <GTAMap height={420} highlightId={venue.id} />
            </Block>
          </div>

          <BookingPanel venue={venue} />
        </div>
      </section>

      {similar.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Similar venues you might love
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((v, i) => (
              <VenueCard key={v.id} venue={v} index={i} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="mt-10 first:mt-0">
        <h2 className="font-display text-xl font-semibold tracking-tight">{title}</h2>
        <div className="mt-4">{children}</div>
      </section>
    </Reveal>
  );
}

function Quick({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <li className="flex items-start gap-2 text-sm text-ink-100">
      <span className="text-neon-400">{icon}</span> {label}
    </li>
  );
}
