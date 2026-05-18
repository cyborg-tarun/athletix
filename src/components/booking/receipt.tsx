"use client";

import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Calendar, CheckCircle2, Clock, Download, MapPin, Printer, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useBookingStore } from "@/store/booking-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";
import { SPORT_BY_SLUG } from "@/lib/data/sports";
import { VENUES } from "@/lib/data/venues";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils";

export function Receipt({ id }: { id: string }) {
  const bookings = useBookingStore((s) => s.bookings);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const booking = useMemo(() => bookings.find((b) => b.id === id), [bookings, id]);
  const venue = booking ? VENUES.find((v) => v.id === booking.venueId) : undefined;

  if (!mounted) {
    return <div className="mx-auto h-80 max-w-3xl animate-pulse rounded-3xl bg-white/5 mx-5 lg:mx-8" />;
  }

  if (!booking || !venue) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center lg:px-8">
        <p className="font-display text-3xl font-semibold tracking-tight">Receipt not found</p>
        <p className="mt-2 text-sm text-ink-200">This booking ID doesn&rsquo;t exist on this device.</p>
        <Button href="/venues" variant="neon" size="md" className="mt-6">
          Browse venues
        </Button>
      </div>
    );
  }

  const sport = SPORT_BY_SLUG[booking.sport];
  const subtotal = booking.total / 1.06;
  const fees = booking.total - subtotal;

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
      <div className="no-print mb-5 flex items-center justify-between gap-3">
        <div>
          <Link href="/dashboard" className="text-xs text-ink-300 hover:text-white">← Dashboard</Link>
          <p className="mt-1 font-display text-2xl font-semibold tracking-tight">Reservation confirmed</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => window.print()} variant="outline" size="sm" iconLeft={<Download className="h-3.5 w-3.5" />}>
            Download PDF
          </Button>
          <Button onClick={() => window.print()} variant="ghost" size="sm" iconLeft={<Printer className="h-3.5 w-3.5" />}>
            Print
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="print-card relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 ring-1 ring-white/[0.08]"
      >
        {/* Glow accents */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-neon-500/30 blur-3xl no-print"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-electric-500/30 blur-3xl no-print"
        />

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <Logo />
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.22em] text-ink-300">Booking ID</p>
            <p className="font-mono text-sm font-semibold text-white">{booking.id}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge tone="neon" icon={<CheckCircle2 className="h-3 w-3" />}>Confirmed</Badge>
          <Badge tone="electric" icon={<span className="-mt-0.5">{sport?.emoji}</span>}>{sport?.name}</Badge>
          <Badge tone="muted">{venue.indoor ? "Indoor" : "Outdoor"} · {venue.surface}</Badge>
        </div>

        <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em]">
          See you on the court.
        </h1>
        <p className="mt-1 text-sm text-ink-200 print-card:text-ink-500">
          We&rsquo;ve emailed a copy of this receipt. Bring your QR for fast check-in.
        </p>

        {/* Slot grid */}
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <Tile icon={<MapPin className="h-4 w-4" />} label="Venue">
            <p className="font-semibold">{venue.name}</p>
            <p className="text-[12px] text-ink-300">{venue.address}</p>
          </Tile>
          <Tile icon={<Calendar className="h-4 w-4" />} label="Date">
            {formatDate(booking.date, { year: "numeric" })}
          </Tile>
          <Tile icon={<Clock className="h-4 w-4" />} label="Time">
            {formatTime(booking.startHour)} — {formatTime(booking.startHour + booking.duration)}
            <span className="ml-2 text-[12px] text-ink-300">({booking.duration}h)</span>
          </Tile>
          <Tile icon={<Users className="h-4 w-4" />} label="Players">
            {booking.adults} adult{booking.adults !== 1 ? "s" : ""}
            {booking.kids > 0 && ` · ${booking.kids} kid${booking.kids !== 1 ? "s" : ""}`}
          </Tile>
        </div>

        {/* QR + totals */}
        <div className="mt-7 grid gap-5 sm:grid-cols-[auto_1fr]">
          <div className="relative rounded-2xl bg-white p-3">
            <QRCodeSVG
              value={`https://athletix.app/checkin?b=${booking.id}`}
              size={160}
              level="M"
              bgColor="#ffffff"
              fgColor="#05070b"
              imageSettings={{
                src: "data:image/svg+xml;utf8," + encodeURIComponent(
                  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='24' height='24' rx='6' fill='%230a84ff'/><path d='M4 14L10 4l4 8 6-8' stroke='white' stroke-width='2.4' fill='none' stroke-linecap='round' stroke-linejoin='round'/><path d='M3 20h18' stroke='white' stroke-width='2.4' stroke-linecap='round'/></svg>`
                ),
                height: 28, width: 28, excavate: true,
              }}
            />
            <p className="mt-2 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-ink-950/70">
              Scan to check in
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10">
            <Row label="Subtotal" value={formatCurrency(subtotal)} />
            <Row label="Service fee" value={formatCurrency(fees)} />
            <Row label="Taxes" value="Included" />
            <div className="mt-2 border-t border-white/15 pt-2">
              <Row
                label={<span className="font-semibold text-white">Total paid</span>}
                value={<span className="font-display text-xl font-semibold text-white">{formatCurrency(booking.total)}</span>}
              />
            </div>
            <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-ink-300">
              <Sparkles className="h-3 w-3 text-amber-glow" /> +{Math.round(booking.total / 5)} loyalty points earned
            </div>
          </div>
        </div>

        <div className="mt-7 grid gap-4 text-[12px] text-ink-300 sm:grid-cols-2">
          <p>
            <strong className="text-white">Address:</strong> {venue.address}
          </p>
          <p>
            <strong className="text-white">Cancellation:</strong> Free up to 24h before slot · {venue.cancellationPolicy.split(".")[1]?.trim() ?? ""}
          </p>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-center text-[10px] uppercase tracking-[0.22em] text-ink-400">
          ATHLETIX · Play Beyond Limits · athletix.app
        </div>
      </motion.div>

      <div className="no-print mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button href={`/venues/${venue.slug}`} variant="outline" size="sm">
          View venue
        </Button>
        <Button href="/dashboard" variant="ghost" size="sm">
          Open dashboard
        </Button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-1 text-sm text-ink-100">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Tile({
  icon, label, children,
}: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10">
      <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-300">
        <span className="text-electric-300">{icon}</span> {label}
      </div>
      <div className="mt-1 text-[15px] font-medium text-white">{children}</div>
    </div>
  );
}
