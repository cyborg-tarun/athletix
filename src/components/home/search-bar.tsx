"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Search, Trophy } from "lucide-react";
import { Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SPORTS } from "@/lib/data/sports";

const CITIES = ["Toronto", "Brampton", "Mississauga", "Vaughan", "Markham", "Scarborough"];

export function HeroSearchBar() {
  const router = useRouter();
  const [sport, setSport] = useState("");
  const [city, setCity] = useState("");
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (sport) params.set("sport", sport);
    if (city) params.set("city", city);
    if (date) params.set("date", date);
    router.push(`/venues?${params.toString()}`);
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-4xl rounded-[2rem] p-[1.5px] shadow-[0_30px_120px_-20px_rgba(10,132,255,.45)]"
    >
      <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-r from-electric-500/60 via-neon-500/50 to-magenta-glow/60 opacity-70 blur" />
      <div className="grid grid-cols-1 gap-2 rounded-[1.95rem] bg-ink-900/85 p-2 backdrop-blur-2xl md:grid-cols-[1.1fr_1fr_1fr_auto]">
        <Field icon={<Trophy className="h-4 w-4" />} label="Sport">
          <Select value={sport} onChange={(e) => setSport(e.target.value)}>
            <option value="">Any sport</option>
            {SPORTS.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field icon={<MapPin className="h-4 w-4" />} label="City">
          <Select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">All GTA</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>
        <Field icon={<Calendar className="h-4 w-4" />} label="Date">
          <input
            type="date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            className="h-11 w-full rounded-2xl bg-white/[0.04] px-4 text-sm text-white ring-1 ring-white/10 transition focus:outline-none focus:ring-2 focus:ring-electric-400/60 [color-scheme:dark]"
          />
        </Field>
        <div className="flex items-stretch justify-stretch p-1 md:items-center">
          <Button
            type="submit"
            variant="neon"
            size="lg"
            className="w-full md:w-auto"
            iconRight={<Search className="h-4 w-4" />}
          >
            Search
          </Button>
        </div>
      </div>
    </motion.form>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white/[0.02] p-2 ring-1 ring-white/[0.06]">
      <div className="mb-1 flex items-center gap-1.5 px-1 text-[10px] uppercase tracking-[0.18em] text-ink-300">
        <span className="text-electric-300">{icon}</span> {label}
      </div>
      {children}
    </div>
  );
}
