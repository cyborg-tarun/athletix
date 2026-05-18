"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Aurora } from "@/components/fx/aurora";
import { GridPattern } from "@/components/fx/grid-pattern";
import { Reveal } from "@/components/fx/reveal";

export function CTA() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-ink-900 via-ink-900 to-ink-950 p-10 sm:p-16">
        <Aurora className="opacity-70" />
        <GridPattern />
        <Reveal>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
              The GTA&rsquo;s best courts.
              <br />
              <span className="text-gradient">One tap away.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-200">
              Join thousands of players unlocking smarter, faster, more beautiful sports booking.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/venues" variant="neon" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
                Explore venues
              </Button>
              <Button href="/dashboard" variant="outline" size="lg">
                Open dashboard
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
