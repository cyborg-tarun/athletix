import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone = "default" | "neon" | "electric" | "warn" | "muted";

const TONES: Record<Tone, string> = {
  default: "bg-white/10 text-white ring-1 ring-white/15",
  neon: "bg-neon-500/15 text-neon-300 ring-1 ring-neon-500/40",
  electric: "bg-electric-500/15 text-electric-300 ring-1 ring-electric-500/40",
  warn: "bg-amber-glow/15 text-amber-glow ring-1 ring-amber-glow/40",
  muted: "bg-white/5 text-ink-200 ring-1 ring-white/10",
};

export function Badge({
  children,
  tone = "default",
  className,
  icon,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-tight",
        TONES[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
