"use client";

import { useMemo, useState } from "react";
import { Search, Filter as FilterIcon } from "lucide-react";
import { GTAMap } from "@/components/map/gta-map";
import { VENUES } from "@/lib/data/venues";
import { SPORTS } from "@/lib/data/sports";
import type { City, SportSlug, Venue } from "@/lib/types";
import { Input, Select } from "@/components/ui/input";
import { Reveal } from "@/components/fx/reveal";
import { Aurora } from "@/components/fx/aurora";

const CITIES: City[] = ["Toronto", "Brampton", "Mississauga", "Vaughan", "Markham", "Scarborough"];

export default function MapPage() {
  const [sport, setSport] = useState<SportSlug | "">("");
  const [city, setCity] = useState<City | "">("");
  const [q, setQ] = useState("");

  const filtered: Venue[] = useMemo(() => {
    return VENUES.filter((v) => {
      if (sport && !v.sports.includes(sport)) return false;
      if (city && v.city !== city) return false;
      if (q && ![v.name, v.neighbourhood].some((s) => s.toLowerCase().includes(q.toLowerCase())))
        return false;
      return true;
    });
  }, [sport, city, q]);

  return (
    <div className="relative">
      <section className="relative isolate overflow-hidden pt-12 pb-6">
        <Aurora className="-z-20 opacity-60" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-neon-400">
              Live map · GTA
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
              Every <span className="text-gradient">court</span>, on one canvas.
            </h1>
            <p className="mt-3 max-w-xl text-sm text-ink-200">
              Browse pins, preview venues and tap a marker for the full story.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <div className="mb-4 grid gap-2 sm:grid-cols-[1fr_180px_180px]">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or neighbourhood…"
            iconLeft={<Search className="h-4 w-4" />}
          />
          <Select value={sport} onChange={(e) => setSport(e.target.value as SportSlug | "")} iconLeft={<FilterIcon className="h-4 w-4" />}>
            <option value="">All sports</option>
            {SPORTS.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </Select>
          <Select value={city} onChange={(e) => setCity(e.target.value as City | "")}>
            <option value="">All GTA</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </div>
        <GTAMap venues={filtered} height={620} />
        <p className="mt-3 text-center text-xs text-ink-300">
          <strong className="text-white">{filtered.length}</strong> venues shown ·
          stylised map for demo. Plug in Mapbox/Leaflet at <code className="rounded bg-white/5 px-1 py-0.5">src/components/map/gta-map.tsx</code> to ship real tiles.
        </p>
      </section>
    </div>
  );
}
