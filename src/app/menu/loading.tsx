export default function MenuLoading() {
  return (
    <main className="w-full bg-canvas">
      <div className="px-8 lg:px-16 py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 animate-pulse"
            aria-hidden
          >
            <div className="aspect-[4/5] w-full bg-surface-muted/40" />
            <div className="h-4 w-3/4 bg-surface-muted/40" />
            <div className="h-3 w-1/2 bg-surface-muted/30" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading menu…</span>
    </main>
  );
}
