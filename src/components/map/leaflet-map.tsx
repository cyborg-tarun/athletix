"use client";

import "leaflet/dist/leaflet.css";

import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L, { type Map as LeafletMapType } from "leaflet";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Star, X } from "lucide-react";

import type { Venue } from "@/lib/types";
import { VENUES } from "@/lib/data/venues";
import { SPORT_BY_SLUG } from "@/lib/data/sports";
import { formatCurrency } from "@/lib/utils";

/* GTA center + sensible default bounds */
const GTA_CENTER: [number, number] = [43.74, -79.5];
const GTA_BOUNDS: L.LatLngBoundsLiteral = [
  [43.45, -80.0],
  [43.95, -79.05],
];

/** Build a styled HTML pin for a venue. */
function makeIcon(emoji: string, active: boolean) {
  const ring = active ? "#5cf09a" : "rgba(255,255,255,0.45)";
  const bg = active ? "#19e168" : "rgba(10,13,20,0.92)";
  const color = active ? "#05070b" : "#ffffff";
  const ping = active
    ? `<span style="position:absolute;inset:-6px;border-radius:9999px;background:rgba(92,240,154,0.45);animation:athletix-ping 1.6s cubic-bezier(0,0,0.2,1) infinite"></span>`
    : `<span style="position:absolute;inset:-4px;border-radius:9999px;background:rgba(58,166,255,0.35);"></span>`;

  return L.divIcon({
    className: "athletix-pin",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    html: `
      <div style="position:relative;display:inline-flex">
        ${ping}
        <span style="
          position:relative;
          display:grid;place-items:center;
          width:38px;height:38px;
          border-radius:9999px;
          background:${bg};
          color:${color};
          box-shadow:0 0 0 2px ${ring}, 0 10px 30px -10px rgba(10,132,255,0.6);
          font-size:18px;line-height:1;
          backdrop-filter:blur(8px);
        ">${emoji}</span>
      </div>
    `,
  });
}

/** Re-fits the map whenever the visible venue list changes. */
function FitToVenues({ venues }: { venues: Venue[] }) {
  const map = useMap();
  useEffect(() => {
    if (!venues.length) {
      map.setView(GTA_CENTER, 10);
      return;
    }
    const bounds = L.latLngBounds(venues.map((v) => [v.lat, v.lng] as [number, number]));
    map.flyToBounds(bounds.pad(0.18), { duration: 0.9, easeLinearity: 0.25 });
  }, [venues, map]);
  return null;
}

export default function LeafletMap({
  venues = VENUES,
  height = 560,
  highlightId,
}: {
  venues?: Venue[];
  height?: number;
  highlightId?: string;
}) {
  const [active, setActive] = useState<Venue | null>(null);
  const mapRef = useRef<LeafletMapType | null>(null);

  /* Stable list — sport meta merged once */
  const items = useMemo(
    () =>
      venues.map((v) => ({
        v,
        sport: SPORT_BY_SLUG[v.primarySport],
      })),
    [venues],
  );

  /* If parent highlights a venue (e.g. on venue detail), open its popup. */
  useEffect(() => {
    if (!highlightId) return;
    const v = venues.find((x) => x.id === highlightId);
    if (v) setActive(v);
  }, [highlightId, venues]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl ring-1 ring-white/10"
      style={{ height }}
    >
      <MapContainer
        center={GTA_CENTER}
        zoom={10}
        minZoom={9}
        maxZoom={18}
        scrollWheelZoom
        zoomControl={false}
        maxBounds={GTA_BOUNDS}
        maxBoundsViscosity={0.6}
        className="h-full w-full"
        style={{ background: "#05070b" }}
        ref={(map) => {
          if (map) mapRef.current = map;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains={["a", "b", "c", "d"]}
        />

        <FitToVenues venues={venues} />

        {items.map(({ v, sport }) => {
          const isActive = active?.id === v.id || highlightId === v.id;
          return (
            <Marker
              key={v.id}
              position={[v.lat, v.lng]}
              icon={makeIcon(sport?.emoji ?? "📍", isActive)}
              eventHandlers={{ click: () => setActive(v) }}
            >
              <Popup closeButton={false} className="athletix-popup">
                <span className="font-medium">{v.name}</span>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Active venue card */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-4 left-4 right-4 z-[500] md:right-auto md:max-w-sm"
          >
            <div className="relative overflow-hidden rounded-2xl bg-ink-900/90 p-3 ring-1 ring-white/10 backdrop-blur-xl">
              <button
                onClick={() => setActive(null)}
                className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/5 text-ink-200 ring-1 ring-white/10 hover:text-white"
                aria-label="Close"
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
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-white px-3 py-2 text-xs font-medium text-ink-950 hover:bg-ink-100"
                >
                  View venue
                </Link>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${active.lat},${active.lng}`}
                  target="_blank"
                  rel="noreferrer"
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
      <div className="pointer-events-none absolute right-4 top-4 z-[400] hidden items-center gap-2 rounded-full bg-ink-950/70 px-3 py-1.5 text-[11px] text-ink-200 ring-1 ring-white/10 backdrop-blur md:inline-flex">
        <span className="inline-block h-2 w-2 rounded-full bg-neon-400" />
        live venues · {venues.length}
      </div>

      {/* Zoom controls (custom-styled) */}
      <div className="absolute bottom-4 right-4 z-[400] hidden flex-col gap-1 md:flex">
        <button
          type="button"
          onClick={() => mapRef.current?.zoomIn()}
          className="grid h-9 w-9 place-items-center rounded-full bg-ink-950/70 text-base font-medium text-white ring-1 ring-white/15 backdrop-blur transition hover:bg-ink-900/90"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => mapRef.current?.zoomOut()}
          className="grid h-9 w-9 place-items-center rounded-full bg-ink-950/70 text-base font-medium text-white ring-1 ring-white/15 backdrop-blur transition hover:bg-ink-900/90"
          aria-label="Zoom out"
        >
          −
        </button>
      </div>
    </div>
  );
}
