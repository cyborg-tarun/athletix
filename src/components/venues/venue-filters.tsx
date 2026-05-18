"use client";

import { motion } from "framer-motion";
import { Baby, Car, Coffee, Indent, Star, Sun, Trophy, Users } from "lucide-react";
import type { City, SportSlug, Surface } from "@/lib/types";

export interface Filters {
  city: City | "";
  sport: SportSlug | "";
  indoor: "any" | "indoor" | "outdoor";
  minRating: number;
  maxPrice: number;
  surfaces: Surface[];
  kidsFriendly: boolean;
  parking: boolean;
  coaching: boolean;
  foodCourt: boolean;
  availableToday: boolean;
  sort: "recommended" | "price-asc" | "price-desc" | "rating";
}

export const DEFAULT_FILTERS: Filters = {
  city: "",
  sport: "",
  indoor: "any",
  minRating: 0,
  maxPrice: 300,
  surfaces: [],
  kidsFriendly: false,
  parking: false,
  coaching: false,
  foodCourt: false,
  availableToday: false,
  sort: "recommended",
};

const SURFACES: Surface[] = ["Turf", "Hardwood", "Clay", "Synthetic", "Ice", "Pool", "Grass"];

export function VenueFilters({
  value,
  onChange,
}: {
  value: Filters;
  onChange: (next: Filters) => void;
}) {
  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => onChange({ ...value, [k]: v });

  return (
    <aside className="sticky top-20 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-3xl bg-ink-900/40 p-5 ring-1 ring-white/[0.06] backdrop-blur-xl">
      <h3 className="font-display text-lg font-semibold tracking-tight">Filters</h3>

      <Section title="Price (per hour)">
        <input
          type="range"
          min={10}
          max={300}
          step={5}
          value={value.maxPrice}
          onChange={(e) => set("maxPrice", Number(e.target.value))}
          className="w-full accent-[var(--color-neon-500)]"
        />
        <div className="mt-1 flex items-center justify-between text-xs text-ink-200">
          <span>$10</span>
          <span className="font-semibold text-white">Up to ${value.maxPrice}</span>
          <span>$300</span>
        </div>
      </Section>

      <Section title="Indoor / Outdoor">
        <div className="grid grid-cols-3 gap-1.5 rounded-full bg-white/[0.04] p-1 ring-1 ring-white/10">
          {(["any", "indoor", "outdoor"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => set("indoor", k)}
              className="relative rounded-full px-3 py-1.5 text-[12px] capitalize text-ink-100"
            >
              {value.indoor === k && (
                <motion.span
                  layoutId="indoor-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-white/15"
                />
              )}
              {k}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Minimum rating">
        <div className="flex items-center gap-1.5">
          {[0, 4, 4.5, 4.8].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => set("minRating", r)}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] ring-1 transition ${
                value.minRating === r
                  ? "bg-amber-glow/15 text-amber-glow ring-amber-glow/40"
                  : "bg-white/[0.04] text-ink-100 ring-white/10 hover:bg-white/[0.08]"
              }`}
            >
              <Star className="h-3 w-3 fill-current" /> {r === 0 ? "Any" : `${r}+`}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Surface">
        <div className="flex flex-wrap gap-1.5">
          {SURFACES.map((s) => {
            const active = value.surfaces.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() =>
                  set("surfaces", active ? value.surfaces.filter((x) => x !== s) : [...value.surfaces, s])
                }
                className={`rounded-full px-2.5 py-1 text-[12px] ring-1 transition ${
                  active
                    ? "bg-electric-500/15 text-electric-300 ring-electric-500/40"
                    : "bg-white/[0.04] text-ink-100 ring-white/10 hover:bg-white/[0.08]"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Amenities">
        <div className="grid grid-cols-2 gap-1.5">
          <Toggle icon={<Baby className="h-3.5 w-3.5" />} label="Kids friendly" on={value.kidsFriendly} onClick={() => set("kidsFriendly", !value.kidsFriendly)} />
          <Toggle icon={<Car className="h-3.5 w-3.5" />} label="Parking" on={value.parking} onClick={() => set("parking", !value.parking)} />
          <Toggle icon={<Trophy className="h-3.5 w-3.5" />} label="Coaching" on={value.coaching} onClick={() => set("coaching", !value.coaching)} />
          <Toggle icon={<Coffee className="h-3.5 w-3.5" />} label="Food court" on={value.foodCourt} onClick={() => set("foodCourt", !value.foodCourt)} />
          <Toggle icon={<Sun className="h-3.5 w-3.5" />} label="Available today" on={value.availableToday} onClick={() => set("availableToday", !value.availableToday)} />
          <Toggle icon={<Users className="h-3.5 w-3.5" />} label="Open play" on={false} onClick={() => {}} disabled />
        </div>
      </Section>

      <Section title="Sort by">
        <select
          value={value.sort}
          onChange={(e) => set("sort", e.target.value as Filters["sort"])}
          className="h-10 w-full appearance-none rounded-2xl bg-white/[0.04] px-3 text-sm ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-electric-400/60"
        >
          <option value="recommended">Recommended</option>
          <option value="rating">Top rated</option>
          <option value="price-asc">Price · low to high</option>
          <option value="price-desc">Price · high to low</option>
        </select>
      </Section>

      <button
        type="button"
        onClick={() => onChange(DEFAULT_FILTERS)}
        className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-white/5 px-4 py-2.5 text-[12px] text-ink-100 ring-1 ring-white/10 transition hover:bg-white/10"
      >
        <Indent className="h-3.5 w-3.5" /> Reset filters
      </button>
    </aside>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 border-t border-white/[0.05] pt-4 first-of-type:border-0 first-of-type:pt-0 first-of-type:mt-3">
      <h4 className="mb-2 text-[11px] uppercase tracking-[0.18em] text-ink-300">{title}</h4>
      {children}
    </div>
  );
}

function Toggle({
  icon, label, on, onClick, disabled,
}: { icon: React.ReactNode; label: string; on: boolean; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] ring-1 transition ${
        on
          ? "bg-neon-500/15 text-neon-300 ring-neon-500/40"
          : "bg-white/[0.04] text-ink-100 ring-white/10 hover:bg-white/[0.08] disabled:opacity-40"
      }`}
    >
      {icon} {label}
    </button>
  );
}
