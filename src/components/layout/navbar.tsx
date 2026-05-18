"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/sports", label: "Sports" },
  { href: "/venues", label: "Venues" },
  { href: "/map", label: "Map" },
  { href: "/events", label: "Events" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 120], [6, 18]);
  const bg = useTransform(
    scrollY,
    [0, 120],
    ["rgba(10,13,20,0.3)", "rgba(10,13,20,0.72)"],
  );
  const border = useTransform(
    scrollY,
    [0, 120],
    ["rgba(255,255,255,0.04)", "rgba(255,255,255,0.10)"],
  );
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      style={{
        backdropFilter: useTransform(blur, (v) => `blur(${v}px) saturate(160%)`),
        WebkitBackdropFilter: useTransform(blur, (v) => `blur(${v}px) saturate(160%)`),
        backgroundColor: bg,
        borderColor: border,
      }}
      className="fixed inset-x-0 top-0 z-50 border-b"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[13px] font-medium tracking-tight transition-colors",
                  active ? "text-white" : "text-ink-200 hover:text-white",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-white/15"
                  />
                )}
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href="/sports"
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
            iconLeft={<Sparkles className="h-3.5 w-3.5 text-neon-400" />}
          >
            Discover
          </Button>
          <Button href="/venues" variant="neon" size="sm" className="hidden sm:inline-flex">
            Book a slot
          </Button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden border-t border-white/10 bg-ink-900/90 backdrop-blur-xl"
          >
            <div className="mx-auto max-w-7xl px-5 py-4 flex flex-col gap-1">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm text-ink-100 hover:bg-white/5"
                >
                  {l.label}
                </Link>
              ))}
              <Button href="/venues" variant="neon" size="md" className="mt-2 w-full">
                Book a slot
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
