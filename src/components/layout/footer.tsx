import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Github, Instagram, Twitter } from "lucide-react";

const COLS = [
  {
    title: "Play",
    links: [
      { href: "/sports", label: "Browse sports" },
      { href: "/venues", label: "All venues" },
      { href: "/map", label: "Map view" },
      { href: "/events", label: "Events & news" },
    ],
  },
  {
    title: "Cities",
    links: [
      { href: "/venues?city=Toronto", label: "Toronto" },
      { href: "/venues?city=Mississauga", label: "Mississauga" },
      { href: "/venues?city=Brampton", label: "Brampton" },
      { href: "/venues?city=Vaughan", label: "Vaughan" },
      { href: "/venues?city=Markham", label: "Markham" },
      { href: "/venues?city=Scarborough", label: "Scarborough" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "#", label: "Partners" },
      { href: "#", label: "Press kit" },
      { href: "#", label: "Careers" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/[0.06]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[40rem] w-[80rem] -translate-x-1/2 rounded-full bg-electric-500/10 blur-[120px]"
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.2fr_3fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-200">
            ATHLETIX is the premium way to discover, book and play across every great venue in the
            Greater Toronto Area.
          </p>
          <div className="mt-6 flex items-center gap-2">
            {[Twitter, Instagram, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-ink-200 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-300">
                {c.title}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {c.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="text-ink-100 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/[0.05]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-ink-300 sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} ATHLETIX Sports Inc. · Toronto, ON</p>
          <p className="font-mono uppercase tracking-[0.18em]">Play Beyond Limits</p>
        </div>
      </div>
    </footer>
  );
}
