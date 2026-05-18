"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Check, Clock, Loader2, MapPin, ShieldCheck, Users } from "lucide-react";
import type { Venue } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SPORT_BY_SLUG } from "@/lib/data/sports";
import { useBookingStore } from "@/store/booking-store";
import { formatCurrency, formatDate, formatTime, generateBookingId } from "@/lib/utils";

export function ConfirmFlow({ venue }: { venue: Venue }) {
  const router = useRouter();
  const params = useSearchParams();
  const addBooking = useBookingStore((s) => s.addBooking);

  const slotId   = params.get("slot") ?? venue.slots.find((s) => s.available)?.id ?? venue.slots[0].id;
  const date     = params.get("date") ?? new Date().toISOString().slice(0, 10);
  const duration = Number(params.get("duration") ?? 1);
  const adults   = Number(params.get("adults") ?? 2);
  const kids     = Number(params.get("kids") ?? 0);

  const slot = useMemo(() => venue.slots.find((s) => s.id === slotId) ?? venue.slots[0], [slotId, venue.slots]);
  const subtotal = slot.price * duration;
  const fees = Math.round(subtotal * 0.06);
  const total = subtotal + fees;

  const [step, setStep] = useState<"review" | "details" | "confirming">("review");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function submit() {
    if (!name || !email) return;
    setStep("confirming");
    const id = generateBookingId();
    const booking = {
      id,
      venueId: venue.id,
      venueName: venue.name,
      city: venue.city,
      sport: venue.primarySport,
      date,
      startHour: slot.hour,
      duration,
      adults,
      kids,
      total,
      createdAt: new Date().toISOString(),
    };
    addBooking(booking);
    setTimeout(() => router.push(`/bookings/${id}`), 900);
  }

  const sport = SPORT_BY_SLUG[venue.primarySport];

  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-5 py-12 lg:grid-cols-[1.2fr_1fr] lg:px-8">
      <div>
        <div className="mb-5 flex items-center gap-3 text-xs text-ink-300">
          {["Review", "Your details", "Confirm"].map((label, i) => {
            const order = ["review", "details", "confirming"];
            const active = order.indexOf(step) >= i;
            return (
              <div key={label} className="flex items-center gap-3">
                <span className={`grid h-6 w-6 place-items-center rounded-full text-[11px] font-medium transition ${
                  active ? "bg-neon-500 text-ink-950" : "bg-white/5 text-ink-300 ring-1 ring-white/10"
                }`}>
                  {i + 1}
                </span>
                <span className={active ? "text-white" : ""}>{label}</span>
                {i < 2 && <span className="text-ink-400">·</span>}
              </div>
            );
          })}
        </div>

        {step === "review" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-6 ring-1 ring-white/[0.07]">
              <h2 className="font-display text-2xl font-semibold tracking-tight">Review your reservation</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Tile icon={<Calendar className="h-4 w-4" />} label="Date">{formatDate(date, { year: "numeric" })}</Tile>
                <Tile icon={<Clock className="h-4 w-4" />} label="Time">
                  {formatTime(slot.hour)} — {formatTime(slot.hour + duration)}
                </Tile>
                <Tile icon={<Users className="h-4 w-4" />} label="Party">
                  {adults} adult{adults !== 1 ? "s" : ""}{kids > 0 ? ` · ${kids} kid${kids !== 1 ? "s" : ""}` : ""}
                </Tile>
                <Tile icon={<MapPin className="h-4 w-4" />} label="Venue">
                  {venue.name}, {venue.city}
                </Tile>
              </div>

              <div className="mt-6 inline-flex items-start gap-3 rounded-2xl bg-neon-500/10 p-4 ring-1 ring-neon-500/30">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-neon-400" />
                <div className="text-sm text-ink-100">
                  Free cancellation until {formatDate(date)} 24h before slot. No card needed for demo bookings —
                  payments coming soon.
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <Button onClick={() => setStep("details")} variant="neon" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {step === "details" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-6 ring-1 ring-white/[0.07]">
              <h2 className="font-display text-2xl font-semibold tracking-tight">Your details</h2>
              <p className="mt-1 text-sm text-ink-200">Your receipt and check-in QR will go here.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Field label="Full name" value={name} onChange={setName} placeholder="Arjun Sharma" required />
                <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@athletix.app" required />
                <Field label="Phone (optional)" value={phone} onChange={setPhone} placeholder="+1 416 …" />
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <button className="text-sm text-ink-300 hover:text-white" onClick={() => setStep("review")}>
                ← Back
              </button>
              <Button
                onClick={submit}
                disabled={!name || !email}
                variant="neon"
                size="lg"
                iconRight={<Check className="h-4 w-4" />}
              >
                Confirm reservation
              </Button>
            </div>
          </motion.div>
        )}

        {step === "confirming" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-64 items-center justify-center rounded-3xl bg-white/[0.03] ring-1 ring-white/[0.06]"
          >
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-neon-400" />
              <p className="mt-3 text-sm text-ink-100">Reserving your slot…</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Summary */}
      <aside className="h-fit rounded-3xl bg-ink-900/60 p-5 ring-1 ring-white/[0.08] backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <Badge tone="electric" icon={<span className="-mt-0.5">{sport?.emoji}</span>}>{sport?.name}</Badge>
          <Badge tone="muted">{venue.indoor ? "Indoor" : "Outdoor"}</Badge>
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold leading-tight tracking-tight">{venue.name}</h3>
        <p className="text-xs text-ink-300">{venue.neighbourhood}, {venue.city}</p>

        <div className="mt-4 space-y-1.5 border-t border-white/10 pt-4 text-[13px] text-ink-100">
          <Row label={`${formatCurrency(slot.price)} × ${duration}h`} value={formatCurrency(subtotal)} />
          <Row label="Service fee" value={formatCurrency(fees)} />
          <Row label="Taxes" value="Included" />
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
          <span className="text-sm text-ink-200">Total</span>
          <span className="font-display text-2xl font-semibold text-white">{formatCurrency(total)}</span>
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Tile({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10">
      <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-300">
        <span className="text-electric-300">{icon}</span> {label}
      </div>
      <div className="mt-1 font-display text-base font-semibold text-white">{children}</div>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text", required,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-ink-300">
        {label}{required && <span className="text-magenta-glow"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-2xl bg-white/[0.04] px-3.5 text-sm text-white placeholder:text-ink-300 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-electric-400/60"
      />
    </label>
  );
}
