"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, iconLeft, iconRight, ...props }, ref) => (
    <div className="relative">
      {iconLeft && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-300">
          {iconLeft}
        </span>
      )}
      <input
        ref={ref}
        className={cn(
          "h-11 w-full rounded-2xl bg-white/[0.04] px-4 text-sm text-white placeholder:text-ink-300",
          "ring-1 ring-white/10 transition-all duration-300",
          "hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-electric-400/60 focus:bg-white/[0.08]",
          iconLeft && "pl-10",
          iconRight && "pr-10",
          className,
        )}
        {...props}
      />
      {iconRight && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-300">{iconRight}</span>
      )}
    </div>
  ),
);
Input.displayName = "Input";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  iconLeft?: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, iconLeft, children, ...props }, ref) => (
    <div className="relative">
      {iconLeft && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-300">
          {iconLeft}
        </span>
      )}
      <select
        ref={ref}
        className={cn(
          "h-11 w-full appearance-none rounded-2xl bg-white/[0.04] px-4 pr-9 text-sm text-white",
          "ring-1 ring-white/10 transition-all duration-300",
          "hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-electric-400/60 focus:bg-white/[0.08]",
          iconLeft && "pl-10",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300"
      >
        <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  ),
);
Select.displayName = "Select";
