"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { VenueCard } from "./venue-card";
import { VenueFilters, DEFAULT_FILTERS, type Filters } from "./venue-filters";
import { VENUES } from "@/lib/data/venues";
import type { City, SportSlug, Venue } from "@/lib/types";
import { Filter, Map, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function VenueList({
  fixedSport,
  initialCity,
}: {
  fixedSport?: SportSlug;
  initialCity?: City;
}) {
  const params = useSearchParams();
  const initial: Filters = {
    ...DEFAULT_FILTERS,
    sport: fixedSport ?? (params.get("sport") as SportSlug | null) ?? "",
    city: initialCity ?? (params.get("city") as City | null) ?? "",
  };
  const [filters, setFilters] = useState<Filters>(initial);
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return VENUES.filter((v) => {
      if (filters.sport && !v.sports.includes(filters.sport)) return false;
      if (filters.city && v.city !== filters.city) return false;
      if (filters.indoor === "indoor" && !v.indoor) return false;
      if (filters.indoor === "outdoor" && v.indoor) return false;
      if (v.rating < filters.minRating) return false;
      if (v.pricePerHour > filters.maxPrice) return false;
      if (filters.surfaces.length && !filters.surfaces.includes(v.surface)) return false;
      if (filters.kidsFriendly && !v.kidsFriendly) return false;
      if (filters.parking && !v.parking) return false;
      if (filters.coaching && !v.coaching) return false;
      if (filters.foodCourt && !v.foodCourt) return false;
      if (filters.availableToday && !v.slots.some((s) => s.available)) return false;
      if (
        q &&
        ![v.name, v.neighbourhood, v.city, v.tagline].some((s) => s.toLowerCase().includes(q))
      )
        return false;
      return true;
    }).sort((a: Venue, b: Venue) => {
      switch (filters.sort) {
        case "price-asc":  return a.pricePerHour - b.pricePerHour;
        case "price-desc": return b.pricePerHour - a.pricePerHour;
        case "rating":     return b.rating - a.rating;
        default:           return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating;
      }
    });
  }, [filters, query]);

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <div className="lg:block hidden">
          <VenueFilters value={filters} onChange={setFilters} />
        </div>

        {showFilters && (
          <div className="fixed inset-0 z-50 bg-ink-950/80 p-5 lg:hidden">
            <div className="mx-auto max-w-md">
              <button onClick={() => setShowFilters(false)} className="mb-3 text-sm text-ink-200">
                Close
              </button>
              <VenueFilters value={filters} onChange={setFilters} />
            </div>
          </div>
        )}

        <div>
          <div className="sticky top-16 z-10 -mx-5 mb-5 bg-ink-950/70 px-5 py-3 backdrop-blur-xl lg:static lg:mx-0 lg:rounded-3xl lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex-1 min-w-[200px]">
                <Input
                  placeholder="Search venues, neighbourhoods, cities…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  iconLeft={<Search className="h-4 w-4" />}
                />
              </div>
              <Button
                onClick={() => setShowFilters(true)}
                variant="outline"
                size="md"
                className="lg:hidden"
                iconLeft={<SlidersHorizontal className="h-4 w-4" />}
              >
                Filters
              </Button>
              <Button href="/map" variant="ghost" size="md" iconLeft={<Map className="h-4 w-4" />}>
                Map view
              </Button>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-ink-300">
              <span>
                <strong className="text-white">{filtered.length}</strong> venues
                {filters.city && (
                  <>
                    {" "}
                    in <strong className="text-white">{filters.city}</strong>
                  </>
                )}
              </span>
              <span className="inline-flex items-center gap-1">
                <Filter className="h-3 w-3" /> Live results
              </span>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-3xl bg-white/[0.03] p-12 text-center ring-1 ring-white/10">
              <p className="text-lg font-medium">No venues match those filters.</p>
              <p className="mt-1 text-sm text-ink-300">Try widening price, surface, or city.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((v, i) => (
                <VenueCard key={v.id} venue={v} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
