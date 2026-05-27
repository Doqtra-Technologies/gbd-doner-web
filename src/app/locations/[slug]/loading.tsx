export default function LocationDetailLoading() {
  return (
    <main className="w-full bg-canvas">
      <div className="grid grid-cols-1 md:grid-cols-12 border-b border-border-hairline">
        <div className="md:col-span-5 flex flex-col gap-6 p-10 lg:p-16">
          <div className="h-3 w-24 bg-surface-muted/40 animate-pulse" />
          <div className="h-12 w-3/4 bg-surface-muted/40 animate-pulse" />
          <div className="h-3 w-1/2 bg-surface-muted/30 animate-pulse" />
          <div className="h-3 w-1/3 bg-surface-muted/30 animate-pulse" />
        </div>
        <div className="md:col-span-7 min-h-[480px] bg-surface-muted/30 animate-pulse" />
      </div>
      <span className="sr-only">Loading location…</span>
    </main>
  );
}
