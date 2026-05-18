import { cn } from "@/lib/utils";

export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute -top-32 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl bg-aurora" />
      <div className="absolute -bottom-40 -left-32 h-[40rem] w-[40rem] rounded-full bg-electric-500/30 blur-[120px] animate-pulse-glow" />
      <div className="absolute -right-32 top-1/3 h-[36rem] w-[36rem] rounded-full bg-neon-500/25 blur-[120px] animate-pulse-glow" />
    </div>
  );
}
