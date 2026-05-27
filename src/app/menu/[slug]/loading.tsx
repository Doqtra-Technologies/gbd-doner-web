export default function MenuItemLoading() {
  return (
    <main className="w-full bg-canvas">
      <div className="grid grid-cols-1 md:grid-cols-12 border-b border-border-hairline">
        <div className="md:col-span-6 aspect-square bg-surface-muted/30 animate-pulse" />
        <div className="md:col-span-6 flex flex-col gap-6 p-10 lg:p-16">
          <div className="h-3 w-24 bg-surface-muted/40 animate-pulse" />
          <div className="h-3 w-16 bg-surface-muted/40 animate-pulse" />
          <div className="h-12 w-3/4 bg-surface-muted/40 animate-pulse" />
          <div className="h-3 w-full bg-surface-muted/30 animate-pulse" />
          <div className="h-3 w-5/6 bg-surface-muted/30 animate-pulse" />
        </div>
      </div>
      <span className="sr-only">Loading menu item…</span>
    </main>
  );
}
