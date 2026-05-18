"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "neon";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "relative text-white bg-gradient-to-b from-white/10 to-white/0 ring-1 ring-white/15 hover:ring-white/30 " +
    "shadow-[0_10px_40px_-12px_rgba(10,132,255,.65)] hover:shadow-[0_18px_60px_-12px_rgba(10,132,255,.9)]",
  secondary:
    "bg-white text-ink-950 hover:bg-ink-100 ring-1 ring-white/10",
  ghost:
    "bg-transparent text-ink-100 hover:bg-white/5 ring-1 ring-transparent hover:ring-white/10",
  outline:
    "bg-transparent text-white ring-1 ring-white/15 hover:bg-white/5 hover:ring-white/30",
  neon:
    "text-ink-950 bg-gradient-to-br from-neon-400 via-neon-500 to-electric-400 " +
    "shadow-[0_14px_40px_-10px_rgba(25,225,104,.6)] hover:shadow-[0_22px_60px_-10px_rgba(25,225,104,.9)]",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, iconLeft, iconRight, children, ...props }, ref) => {
    const cls = cn(
      "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight",
      "transition-[transform,box-shadow,background-color,color] duration-300 ease-out",
      "active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-400/60",
      "disabled:opacity-50 disabled:pointer-events-none",
      VARIANTS[variant],
      SIZES[size],
      className,
    );

    const content = (
      <>
        {variant === "primary" && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          />
        )}
        {iconLeft && <span className="-ml-1 inline-flex">{iconLeft}</span>}
        <span className="relative">{children}</span>
        {iconRight && <span className="-mr-1 inline-flex transition-transform duration-300 group-hover:translate-x-0.5">{iconRight}</span>}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={cls}>
          {content}
        </Link>
      );
    }
    return (
      <button ref={ref} className={cls} {...props}>
        {content}
      </button>
    );
  },
);
Button.displayName = "Button";
