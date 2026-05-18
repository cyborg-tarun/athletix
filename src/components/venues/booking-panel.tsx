"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Clock, Minus, Plus, ShieldCheck, Sparkles, Users } from "lucide-react";
import type { Venue } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatTime } from "@/lib/utils";

export function BookingPanel({ venue }: { venue: Venue }) {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [slotId, setSlotId] = useState<string | null>(null);
  const [duration, setDuration] = useState(1);
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);

  const slot = useMemo(() => venue.slots.find((s) => s.id === slotId), [venue.slots, slotId]);
  const subtotal = slot ? slot.price * duration : 0;
  const fees = Math.round(subtotal * 0.06);
  const total = subtotal + fees;

  function confirm() {
    if (!slot) return;
    const params = new URLSearchParams({
      slot: slot.id,
      date,
      duration: String(duration),
      adults: String(adults),
      kids: String(kids),
    });
    router.push(`/venues/${venue.slug}/book?${params.toString()}`);
  }

  return (
    <aside className="sticky top-20 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-5 ring-1 ring-white/[0.08] backdrop-blur-xl">
      <div className="flex items-end justify-between">
        <div>
          <div className="font-display text-2xl font-semibold tracking-tight text-white">
            {formatCurrency(venue.pricePerHour)}
            <span className="text-sm font-normal text-ink-300"> / hour</span>
          </div>
          <p className="mt-0.5 text-[12px] text-ink-300">starts from · taxes shown at checkout</p>
        </div>
        <span className="rounded-full bg-neon-500/15 px-2 py-1 text-[11px] font-medium text-neon-300 ring-1 ring-neon-500/40">
          {venue.occupancy}% live
        </span>
      </div>

      <div className="mt-5">
        <Label icon={<Calendar className="h-3.5 w-3.5" />}>Date</Label>
        <input
          type="date"
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1.5 h-11 w-full rounded-2xl bg-white/[0.04] px-3.5 text-sm ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-electric-400/60 [color-scheme:dark]"
        />
      </div>

      <div className="mt-4">
        <Label icon={<Clock className="h-3.5 w-3.5" />}>Available slots</Label>
        <div className="mt-1.5 grid max-h-44 grid-cols-3 gap-1.5 overflow-y-auto pr-1">
          {venue.slots.map((s) => {
            const active = slotId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                disabled={!s.available}
                onClick={() => setSlotId(s.id)}
                className={`relative rounded-xl px-2 py-2 text-[12px] font-medium ring-1 transition ${
                  !s.available
                    ? "bg-white/[0.02] text-ink-400 ring-white/5 line-through cursor-not-allowed"
                    : active
                      ? "bg-neon-500/15 text-neon-300 ring-neon-500/50"
                      : "bg-white/[0.04] text-ink-100 ring-white/10 hover:bg-white/[0.08]"
                }`}
              >
                {formatTime(s.hour)}
                {s.hot && s.available && (
                  <span className="absolute -right-1 -top-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-amber-glow text-[8px] font-bold text-ink-950">
                    H
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Stepper label="Duration (hrs)" value={duration} min={1} max={4} onChange={setDuration} />
        <Stepper label="Adults" icon={<Users className="h-3.5 w-3.5" />} value={adults} min={1} max={20} onChange={setAdults} />
        <Stepper label="Kids" value={kids} min={0} max={10} onChange={setKids} />
      </div>

      {slot && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10"
        >
          <Row label={`${formatCurrency(slot.price)} × ${duration}h`} value={formatCurrency(subtotal)} />
          <Row label="Service fee" value={formatCurrency(fees)} />
          <div className="mt-2 border-t border-white/10 pt-2">
            <Row label={<span className="font-medium text-white">Total</span>} value={<span className="font-display text-lg font-semibold text-white">{formatCurrency(total)}</span>} />
          </div>
        </motion.div>
      )}

      <Button
        onClick={confirm}
        disabled={!slot}
        variant="neon"
        size="lg"
        className="mt-5 w-full"
        iconRight={<Sparkles className="h-4 w-4" />}
      >
        {slot ? "Reserve this slot" : "Pick a slot to continue"}
      </Button>

      <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-ink-300">
        <ShieldCheck className="h-3.5 w-3.5 text-neon-400" />
        Free cancellation up to 24h before slot
      </div>
    </aside>
  );
}

function Label({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-300">
      <span className="text-electric-300">{icon}</span>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-1 text-[13px] text-ink-100">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Stepper({
  label, value, min, max, onChange, icon,
}: {
  label: string; value: number; min: number; max: number; onChange: (n: number) => void; icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white/[0.04] p-2 ring-1 ring-white/10">
      <div className="mb-1 inline-flex items-center gap-1 px-1 text-[10px] uppercase tracking-[0.18em] text-ink-300">
        {icon} {label}
      </div>
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} className="grid h-8 w-8 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10">
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="font-display text-base font-semibold tabular-nums">{value}</span>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} className="grid h-8 w-8 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10">
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
