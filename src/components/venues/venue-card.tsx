"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin, Star, Wifi } from "lucide-react";
import { motion } from "framer-motion";
import type { Venue } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useBookingStore } from "@/store/booking-store";
import { useMounted } from "@/hooks/use-mounted";
import { SPORT_BY_SLUG } from "@/lib/data/sports";

export function VenueCard({ venue, index = 0 }: { venue: Venue; index?: number }) {
  const fav = useBookingStore((s) => s.favorites.includes(venue.id));
  const toggle = useBookingStore((s) => s.toggleFavorite);
  const mounted = useMounted();
  const sport = SPORT_BY_SLUG[venue.primarySport];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: (index % 8) * 0.04, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group relative h-full"
    >
      <Link
        href={`/venues/${venue.slug}`}
        className="block h-full overflow-hidden rounded-3xl bg-ink-800/40 ring-1 ring-white/[0.07] transition-shadow hover:ring-white/20"
      >
        <div className="relative aspect-[5/4] overflow-hidden">
          <Image
            src={venue.images[0]}
            alt={venue.name}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />

          {/* top row */}
          <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
            <Badge tone="default" icon={<span className="-mt-0.5">{sport?.emoji}</span>}>
              {sport?.name}
            </Badge>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggle(venue.id);
              }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink-950/55 ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-ink-950/80"
              aria-label="Toggle favorite"
            >
              <Heart
                className={`h-4 w-4 transition-colors ${mounted && fav ? "fill-magenta-glow text-magenta-glow" : "text-white"}`}
              />
            </button>
          </div>

          {/* live occupancy */}
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-ink-950/55 px-2.5 py-1 text-[11px] text-white ring-1 ring-white/10 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon-500" />
            </span>
            {venue.occupancy}% live occupancy
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-display text-[17px] font-semibold tracking-tight text-white">
                {venue.name}
              </h3>
              <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-ink-200">
                <MapPin className="h-3 w-3" /> {venue.neighbourhood}, {venue.city}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-display text-lg font-semibold text-white">
                {formatCurrency(venue.pricePerHour)}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-ink-300">/ hour</p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 text-[12px]">
              <Star className="h-3.5 w-3.5 fill-amber-glow text-amber-glow" />
              <span className="font-medium text-white">{venue.rating.toFixed(1)}</span>
              <span className="text-ink-300">({venue.reviewCount})</span>
            </div>
            <div className="flex flex-wrap items-center gap-1">
              {venue.tags.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[10px] text-ink-200 ring-1 ring-white/10"
                >
                  {t}
                </span>
              ))}
              {venue.indoor && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] px-2 py-0.5 text-[10px] text-ink-200 ring-1 ring-white/10">
                  <Wifi className="h-2.5 w-2.5" /> Free Wi-Fi
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
