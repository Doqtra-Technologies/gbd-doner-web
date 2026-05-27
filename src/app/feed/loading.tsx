export default function FeedLoading() {
  return (
    <main className="w-full bg-canvas">
      <section className="grid grid-cols-1 md:grid-cols-12 border-b border-border-hairline w-full min-h-[60vh]">
        <div className="md:col-span-4 flex flex-col gap-6 p-10 lg:p-16">
          <div className="h-3 w-16 bg-surface-muted/40 animate-pulse" />
          <div className="h-12 w-3/4 bg-surface-muted/40 animate-pulse" />
          <div className="h-3 w-full bg-surface-muted/30 animate-pulse" />
        </div>
        <div className="md:col-span-8 bg-surface-muted/30 animate-pulse" />
      </section>
      <span className="sr-only">Loading articles…</span>
    </main>
  );
}
