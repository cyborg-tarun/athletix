import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Aurora } from "@/components/fx/aurora";
import { GridPattern } from "@/components/fx/grid-pattern";

export default function NotFound() {
  return (
    <div className="relative grid min-h-[70vh] place-items-center overflow-hidden px-5">
      <Aurora className="-z-20 opacity-60" />
      <GridPattern className="-z-10" />
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-electric-300">404</p>
        <h1 className="mt-3 font-display text-6xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-8xl">
          Off the <span className="text-gradient">court</span>.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink-200">
          The page you&rsquo;re looking for doesn&rsquo;t exist. Let&rsquo;s get you back on the field.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="neon" size="lg">Take me home</Button>
          <Link href="/venues" className="text-sm text-ink-200 hover:text-white">Or browse venues →</Link>
        </div>
      </div>
    </div>
  );
}
