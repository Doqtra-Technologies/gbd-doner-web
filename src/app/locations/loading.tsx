export default function LocationsLoading() {
  return (
    <main className="w-full bg-canvas">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="flex flex-col gap-6 p-10 lg:p-16">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 animate-pulse border-b border-border-hairline pb-6"
              aria-hidden
            >
              <div className="h-5 w-2/3 bg-surface-muted/40" />
              <div className="h-3 w-1/2 bg-surface-muted/30" />
              <div className="h-3 w-1/3 bg-surface-muted/30" />
            </div>
          ))}
        </div>
        <div className="bg-surface-muted/30" aria-hidden />
      </div>
      <span className="sr-only">Loading locations…</span>
    </main>
  );
}
