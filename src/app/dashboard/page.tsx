"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, Calendar, Heart, Star, Trophy, Wallet } from "lucide-react";
import { useBookingStore } from "@/store/booking-store";
import { VENUES } from "@/lib/data/venues";
import { VenueCard } from "@/components/venues/venue-card";
import { BookingRow } from "@/components/dashboard/booking-row";
import { ActivityChart } from "@/components/dashboard/stats-chart";
import { Reveal } from "@/components/fx/reveal";
import { AnimatedCounter } from "@/components/fx/animated-counter";
import { Aurora } from "@/components/fx/aurora";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const mounted = useMounted();
  const bookings = useBookingStore((s) => s.bookings);
  const favorites = useBookingStore((s) => s.favorites);

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = useMemo(() => bookings.filter((b) => b.date >= today), [bookings, today]);
  const past     = useMemo(() => bookings.filter((b) => b.date <  today), [bookings, today]);
  const favVenues = useMemo(() => VENUES.filter((v) => favorites.includes(v.id)), [favorites]);
  const totalSpent = bookings.reduce((s, b) => s + b.total, 0);
  const minutesPlayed = bookings.reduce((s, b) => s + b.duration * 60, 0);

  /* fake activity series for chart, seeded from booking count for stable SSR */
  const series = useMemo(() => {
    const base = Math.max(1, bookings.length);
    return Array.from({ length: 12 }).map((_, i) =>
      Math.round(((Math.sin(i * 0.7 + base) + 1.5) * (3 + base)) + (i % 3) * 2),
    );
  }, [bookings.length]);

  if (!mounted) return <div className="mx-auto h-96 max-w-7xl animate-pulse rounded-3xl bg-white/5 px-5 lg:px-8" />;

  return (
    <div className="relative">
      <section className="relative isolate overflow-hidden pt-12 pb-8">
        <Aurora className="-z-20 opacity-60" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-electric-300">
              Your hub
            </p>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
              <h1 className="font-display text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
                Welcome back, <span className="text-gradient">Athlete</span>.
              </h1>
              <Button href="/venues" variant="neon" size="md" iconRight={<ArrowRight className="h-4 w-4" />}>
                Book a slot
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard icon={<Calendar className="h-4 w-4" />} label="Bookings">
            <AnimatedCounter to={bookings.length} />
          </StatCard>
          <StatCard icon={<Trophy className="h-4 w-4" />} label="Minutes played">
            <AnimatedCounter to={minutesPlayed} />
          </StatCard>
          <StatCard icon={<Wallet className="h-4 w-4" />} label="Total spent">
            {formatCurrency(totalSpent)}
          </StatCard>
          <StatCard icon={<Star className="h-4 w-4" />} label="Loyalty points">
            <AnimatedCounter to={Math.round(totalSpent / 5)} />
          </StatCard>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-white/[0.03] p-5 ring-1 ring-white/[0.06]"
          >
            <h3 className="font-display text-lg font-semibold tracking-tight">Activity · last 12 weeks</h3>
            <p className="text-xs text-ink-300">Slots booked per week</p>
            <div className="mt-4">
              <ActivityChart values={series} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="rounded-3xl bg-gradient-to-br from-electric-500/15 via-white/[0.04] to-neon-500/15 p-5 ring-1 ring-white/[0.08]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-300">Athletix Intelligence</p>
            <h3 className="mt-1.5 font-display text-xl font-semibold leading-tight tracking-tight text-white">
              Tuesday 7 PM is your golden slot.
            </h3>
            <p className="mt-1.5 text-[12px] text-ink-200">
              Quietest, cheapest, closest to your usual courts. Lock it in?
            </p>
            <Button href="/venues" variant="neon" size="sm" className="mt-4">
              Find Tuesday slots
            </Button>
          </motion.div>
        </div>
      </section>

      <Section title="Upcoming bookings" right={<span className="text-xs text-ink-300">{upcoming.length} reservation{upcoming.length !== 1 && "s"}</span>}>
        {upcoming.length === 0 ? (
          <Empty
            title="No upcoming bookings yet"
            sub="Find your sport, pick a court, and lock in your first slot."
          />
        ) : (
          <div className="grid gap-3">
            {upcoming.map((b, i) => <BookingRow key={b.id} b={b} index={i} />)}
          </div>
        )}
      </Section>

      <Section title="Favorite venues">
        {favVenues.length === 0 ? (
          <Empty title="No favorites yet" sub="Tap the heart on any venue to save it here." icon={<Heart className="h-5 w-5" />} />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {favVenues.map((v, i) => <VenueCard key={v.id} venue={v} index={i} />)}
          </div>
        )}
      </Section>

      <Section title="Past bookings">
        {past.length === 0 ? (
          <Empty title="Nothing in your history" sub="Past reservations will appear here once you play." />
        ) : (
          <div className="grid gap-3">
            {past.map((b, i) => <BookingRow key={b.id} b={b} index={i} />)}
          </div>
        )}
      </Section>
    </div>
  );
}

function StatCard({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-4 ring-1 ring-white/[0.06]"
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 text-electric-300">
        {icon}
      </span>
      <div className="mt-3 font-display text-2xl font-semibold tabular-nums tracking-tight">{children}</div>
      <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-ink-300">{label}</div>
    </motion.div>
  );
}

function Section({ title, right, children }: { title: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
      <Reveal>
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">{title}</h2>
          {right}
        </div>
      </Reveal>
      {children}
    </section>
  );
}

function Empty({ title, sub, icon }: { title: string; sub: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white/[0.03] p-10 text-center ring-1 ring-white/[0.06]">
      <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-white/5 text-ink-200 ring-1 ring-white/10">
        {icon ?? <Calendar className="h-5 w-5" />}
      </div>
      <p className="mt-3 font-display text-lg font-semibold">{title}</p>
      <p className="mt-1 text-sm text-ink-200">{sub}</p>
      <Button href="/venues" variant="outline" size="sm" className="mt-5">
        Browse venues
      </Button>
    </div>
  );
}
