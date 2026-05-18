import { Marquee } from "@/components/fx/marquee";

const CITIES = [
  "Toronto", "Brampton", "Mississauga", "Vaughan", "Markham", "Scarborough",
  "Etobicoke", "North York", "Richmond Hill", "Oakville", "Pickering", "Ajax",
];

export function CitiesMarquee() {
  return (
    <section className="relative border-y border-white/[0.05] bg-ink-900/30 py-6">
      <Marquee speed={50}>
        {CITIES.map((c) => (
          <div
            key={c}
            className="flex items-center gap-3 font-display text-2xl font-medium tracking-tight text-ink-200/70 sm:text-3xl"
          >
            <span>{c}</span>
            <span className="text-neon-400">·</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
