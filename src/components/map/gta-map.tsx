"use client";

import dynamic from "next/dynamic";
import type { Venue } from "@/lib/types";

interface GTAMapProps {
  height?: number;
  highlightId?: string;
  venues?: Venue[];
}

/**
 * Leaflet touches `window` on import, so the actual map renders client-only.
 * The wrapper keeps the existing public API used by `/map` and venue detail.
 */
const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="relative w-full overflow-hidden rounded-3xl ring-1 ring-white/10"
      style={{ height: 560 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-950 to-ink-900" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex items-center gap-2 rounded-full bg-ink-950/70 px-3 py-1.5 text-[11px] text-ink-200 ring-1 ring-white/10 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-500" />
          </span>
          Loading map…
        </div>
      </div>
    </div>
  ),
});

export function GTAMap(props: GTAMapProps) {
  return <LeafletMap {...props} />;
}
