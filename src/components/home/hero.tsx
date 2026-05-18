"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { GridPattern } from "@/components/fx/grid-pattern";
import { Aurora } from "@/components/fx/aurora";
import { Sparkles as Sparks } from "@/components/fx/sparkles";
import { Button } from "@/components/ui/button";
import { HeroSearchBar } from "./search-bar";
import { Badge } from "@/components/ui/badge";

const FLOATING_SPORTS = [
  { emoji: "🏏", x: "5%",  y: "20%", delay: 0,   size: 56 },
  { emoji: "⚽", x: "92%", y: "30%", delay: 0.8, size: 48 },
  { emoji: "🏀", x: "12%", y: "76%", delay: 1.4, size: 44 },
  { emoji: "🎾", x: "88%", y: "72%", delay: 2.0, size: 42 },
  { emoji: "🏸", x: "78%", y: "18%", delay: 0.4, size: 40 },
  { emoji: "🏓", x: "22%", y: "45%", delay: 1.0, size: 36 },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-16 pb-28 sm:pt-24"
    >
      {/* BG image with motion blur on scroll */}
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-30">
        <Image
          src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=2200&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.22]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/70 to-ink-950" />
      </motion.div>

      <Aurora className="-z-20" />
      <GridPattern className="-z-10" />
      <Sparks className="-z-10" density={40} />

      {/* Floating sports icons */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
        {FLOATING_SPORTS.map((s, i) => (
          <motion.div
            key={i}
            className="absolute select-none"
            style={{ left: s.x, top: s.y, fontSize: s.size }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.95, scale: 1 }}
            transition={{ delay: 0.3 + s.delay * 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              className="block drop-shadow-[0_8px_24px_rgba(124,195,255,0.5)]"
              animate={{ y: [-6, 8, -6], rotate: [-2, 2, -2] }}
              transition={{ duration: 6 + s.delay, repeat: Infinity, ease: "easeInOut" }}
            >
              {s.emoji}
            </motion.span>
          </motion.div>
        ))}
      </div>

      <motion.div
        style={{ opacity }}
        className="relative mx-auto flex max-w-5xl flex-col items-center px-5 text-center lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Badge tone="neon" icon={<Sparkles className="h-3 w-3" />}>
            New · 47 venues live across the GTA
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-balance font-display text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-7xl lg:text-[7.5rem]"
        >
          Play <span className="text-gradient">beyond</span>
          <br />
          limits.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9 }}
          className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-ink-200 sm:text-lg"
        >
          The premium way to discover and book sports venues across the Greater Toronto Area.
          From floodlit cricket turfs in Brampton to wood-sprung badminton courts in Mississauga —
          all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button href="/venues" variant="neon" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
            Explore venues
          </Button>
          <Button href="/sports" variant="outline" size="lg">
            Browse by sport
          </Button>
        </motion.div>

        <div className="mt-12 w-full">
          <HeroSearchBar />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-ink-300"
        >
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-amber-glow text-amber-glow" />
            <strong className="text-white">4.92</strong> · 18,400+ player reviews
          </span>
          <span>·</span>
          <Link href="/events" className="hover:text-white">
            Live: GTA Premier Cricket League finals — Jun 12 →
          </Link>
        </motion.div>
      </motion.div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
    </section>
  );
}
