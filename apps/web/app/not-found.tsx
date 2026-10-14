import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-8 text-white">
      <div className="max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
        <div className="text-sm uppercase tracking-[0.2em] text-brand-200">404</div>
        <h1 className="mt-4 text-3xl font-bold">Page not found</h1>
        <p className="mt-3 text-slate-300">This launch page hasn’t been published yet, or the slug is invalid.</p>
        <Link href="/" className="mt-6 inline-block rounded-full bg-brand-500 px-5 py-3 font-medium text-white">
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
