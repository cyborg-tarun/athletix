import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Marquee({
  children,
  reverse = false,
  speed = 40,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  speed?: number;
  className?: string;
}) {
  return (
    <div className={cn("group relative flex overflow-hidden mask-edges-x", className)}>
      <div
        className={cn(
          "flex shrink-0 items-center gap-8 pr-8",
          reverse ? "animate-[marquee-reverse_var(--speed)_linear_infinite]" : "animate-[marquee_var(--speed)_linear_infinite]",
          "group-hover:[animation-play-state:paused]",
        )}
        style={{ ["--speed" as never]: `${speed}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
