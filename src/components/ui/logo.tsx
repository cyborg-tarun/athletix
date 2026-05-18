"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Logo({ className, wordmark = true }: { className?: string; wordmark?: boolean }) {
  return (
    <Link href="/" aria-label="ATHLETIX home" className={cn("group inline-flex items-center gap-2.5", className)}>
      <motion.span
        initial={{ rotate: -8, scale: 0.9, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-electric-400 via-electric-500 to-neon-500 shadow-[0_8px_30px_-6px_rgba(10,132,255,.55)]"
      >
        <span className="absolute inset-0 rounded-xl ring-1 ring-white/30" />
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-ink-950">
          <path d="M4 14L10 4l4 8 6-8" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 20h18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
        <span className="pointer-events-none absolute -inset-1 rounded-2xl bg-electric-400/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      </motion.span>
      {wordmark && (
        <span className="font-display text-[15px] font-semibold tracking-[0.22em] text-white">
          ATHLETIX
        </span>
      )}
    </Link>
  );
}
