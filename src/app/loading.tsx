export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="h-12 w-2/3 animate-pulse rounded-2xl bg-white/[0.05]" />
      <div className="mt-4 h-5 w-1/3 animate-pulse rounded-2xl bg-white/[0.04]" />
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-80 animate-pulse rounded-3xl bg-white/[0.04] ring-1 ring-white/5" />
        ))}
      </div>
    </div>
  );
}
