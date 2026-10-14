export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="flex items-center gap-3">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
        <span className="text-sm uppercase tracking-[0.2em] text-slate-300">Loading</span>
      </div>
    </main>
  );
}
