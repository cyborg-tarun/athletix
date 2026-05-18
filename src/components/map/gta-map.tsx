"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Navigation, Star, X } from "lucide-react";
import { VENUES } from "@/lib/data/venues";
import type { Venue } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { SPORT_BY_SLUG } from "@/lib/data/sports";

/* GTA bounding box (rough) — for projecting lat/lng → SVG */
const GTA = { minLat: 43.55, maxLat: 43.92, minLng: -79.85, maxLng: -79.20 };

function project(v: { lat: number; lng: number }, W: number, H: number) {
  const x = ((v.lng - GTA.minLng) / (GTA.maxLng - GTA.minLng)) * W;
  const y = (1 - (v.lat - GTA.minLat) / (GTA.maxLat - GTA.minLat)) * H;
  return { x, y };
}

const CITIES = [
  { name: "Toronto", lat: 43.66, lng: -79.39 },
  { name: "Mississauga", lat: 43.59, lng: -79.64 },
  { name: "Brampton", lat: 43.72, lng: -79.76 },
  { name: "Vaughan", lat: 43.83, lng: -79.51 },
  { name: "Markham", lat: 43.86, lng: -79.33 },
  { name: "Scarborough", lat: 43.77, lng: -79.27 },
];

export function GTAMap({
  height = 560,
  highlightId,
  venues = VENUES,
}: {
  height?: number;
  highlightId?: string;
  venues?: Venue[];
}) {
  const W = 1000, H = height;
  const projected = useMemo(
    () => venues.map((v) => ({ v, ...project(v, W, H) })),
    [venues, W, H],
  );
  const cityLabels = CITIES.map((c) => ({ name: c.name, ...project(c, W, H) }));
  const [active, setActive] = useState<Venue | null>(null);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl ring-1 ring-white/10" style={{ height }}>
      {/* layered background: aurora + grid */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ink-900 via-ink-950 to-ink-900" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" />
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(10,132,255,0.4)" />
            <stop offset="100%" stopColor="rgba(10,132,255,0)" />
          </radialGradient>
          <radialGradient id="lake" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(124,195,255,0.18)" />
            <stop offset="100%" stopColor="rgba(124,195,255,0)" />
          </radialGradient>
        </defs>

        {/* Lake Ontario suggestion at bottom */}
        <ellipse cx={W / 2} cy={H + 60} rx={W * 0.7} ry={130} fill="url(#lake)" />

        {/* city blob halos */}
        {cityLabels.map((c) => (
          <circle key={c.name} cx={c.x} cy={c.y} r={120} fill="url(#glow)" opacity={0.25} />
        ))}

        {/* roads (stylised) */}
        <g stroke="rgba(255,255,255,0.05)" strokeWidth="1.2" fill="none">
          <path d={`M0 ${H * 0.66} L${W} ${H * 0.7}`} /> {/* 401 */}
          <path d={`M0 ${H * 0.48} Q${W * 0.5} ${H * 0.42} ${W} ${H * 0.5}`} /> {/* 407 */}
          <path d={`M${W * 0.5} 0 L${W * 0.5} ${H}`} /> {/* 400 / Yonge */}
          <path d={`M${W * 0.2} 0 L${W * 0.2} ${H}`} />
          <path d={`M${W * 0.8} 0 L${W * 0.8} ${H}`} />
        </g>

        {/* city labels */}
        {cityLabels.map((c) => (
          <g key={c.name}>
            <circle cx={c.x} cy={c.y} r={2} fill="rgba(255,255,255,0.6)" />
            <text x={c.x + 8} y={c.y - 8} fill="rgba(255,255,255,0.55)" fontSize={11} fontFamily="JetBrains Mono">
              {c.name.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>

      {/* Venue pins */}
      {projected.map(({ v, x, y }) => {
        const isActive = active?.id === v.id || highlightId === v.id;
        const sport = SPORT_BY_SLUG[v.primarySport];
        return (
          <motion.button
            key={v.id}
            type="button"
            onClick={() => setActive(v)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: Math.random() * 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.25, zIndex: 5 }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: x, top: y, zIndex: isActive ? 10 : 2 }}
            aria-label={v.name}
          >
            <span className="relative inline-flex">
              <span
                className={`absolute inset-0 -m-1 rounded-full ${isActive ? "animate-ping bg-neon-400/60" : "bg-electric-400/40"}`}
                aria-hidden
              />
              <span
                className={`relative grid h-9 w-9 place-items-center rounded-full text-base ring-2 transition ${
                  isActive
                    ? "bg-neon-500 text-ink-950 ring-white shadow-[0_0_24px_rgba(25,225,104,.6)]"
                    : "bg-ink-900/90 text-white ring-white/40 backdrop-blur"
                }`}
              >
                {sport?.emoji}
              </span>
            </span>
          </motion.button>
        );
      })}

      {/* Active venue card */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-4 left-4 right-4 z-20 md:right-auto md:max-w-sm"
          >
            <div className="relative overflow-hidden rounded-2xl bg-ink-900/90 p-3 ring-1 ring-white/10 backdrop-blur-xl">
              <button
                onClick={() => setActive(null)}
                className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/5 text-ink-200 ring-1 ring-white/10 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <div className="flex gap-3">
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10">
                  <Image src={active.images[0]} alt={active.name} fill sizes="96px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-semibold text-white">{active.name}</p>
                  <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-ink-200">
                    <MapPin className="h-3 w-3" /> {active.neighbourhood}, {active.city}
                  </p>
                  <div className="mt-1 inline-flex items-center gap-2 text-[11px]">
                    <span className="inline-flex items-center gap-1 text-amber-glow">
                      <Star className="h-3 w-3 fill-current" /> {active.rating.toFixed(1)}
                    </span>
                    <span className="text-ink-300">·</span>
                    <span className="font-medium text-white">{formatCurrency(active.pricePerHour)}/hr</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Link
                  href={`/venues/${active.slug}`}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-white text-ink-950 px-3 py-2 text-xs font-medium hover:bg-ink-100"
                >
                  View venue
                </Link>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${active.lat},${active.lng}`}
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-2 text-xs text-white ring-1 ring-white/15 hover:bg-white/15"
                >
                  <Navigation className="h-3 w-3" /> Directions
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute right-4 top-4 hidden items-center gap-2 rounded-full bg-ink-950/60 px-3 py-1.5 text-[11px] text-ink-200 ring-1 ring-white/10 backdrop-blur md:inline-flex">
        <span className="inline-block h-2 w-2 rounded-full bg-neon-400" /> live venues · {venues.length}
      </div>
    </div>
  );
}
