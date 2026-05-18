"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Clock, MapPin, QrCode } from "lucide-react";
import type { Booking } from "@/lib/types";
import { VENUES } from "@/lib/data/venues";
import { SPORT_BY_SLUG } from "@/lib/data/sports";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function BookingRow({ b, index = 0 }: { b: Booking; index?: number }) {
  const venue = VENUES.find((v) => v.id === b.venueId);
  const sport = SPORT_BY_SLUG[b.sport];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.04, duration: 0.6 }}
      className="group grid grid-cols-[100px_1fr_auto] items-center gap-4 rounded-3xl bg-white/[0.03] p-3 ring-1 ring-white/[0.06] transition hover:bg-white/[0.05]"
    >
      <div className="relative aspect-[5/4] overflow-hidden rounded-2xl ring-1 ring-white/10">
        {venue && (
          <Image
            src={venue.images[0]}
            alt={venue.name}
            fill
            sizes="100px"
            className="object-cover transition-transform duration-[1.4s] group-hover:scale-110"
          />
        )}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="electric" icon={<span className="-mt-0.5">{sport?.emoji}</span>}>{sport?.name}</Badge>
          <Badge tone="muted">{b.city}</Badge>
        </div>
        <p className="mt-1.5 truncate font-display text-base font-semibold tracking-tight text-white">
          {b.venueName}
        </p>
        <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-ink-300">
          <span className="inline-flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {formatDate(b.date)}</span>
          <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {formatTime(b.startHour)} ({b.duration}h)</span>
          {venue && <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {venue.neighbourhood}</span>}
        </div>
      </div>

      <div className="text-right">
        <p className="font-display text-base font-semibold text-white">{formatCurrency(b.total)}</p>
        <Link
          href={`/bookings/${b.id}`}
          className="mt-1 inline-flex items-center gap-1 text-[11px] text-electric-300 hover:text-white"
        >
          <QrCode className="h-3 w-3" /> Receipt <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </motion.div>
  );
}
