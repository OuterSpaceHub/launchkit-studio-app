'use client';

import { useState } from 'react';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to create checkout session');
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-md">
        <h1 className="mb-4 text-2xl font-bold">Start your Pro trial</h1>
        <p className="mb-6 text-slate-300">One-click checkout — cancel anytime.</p>
        <button
          className="w-full rounded-full bg-brand-500 px-4 py-3 font-medium text-white"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? 'Redirecting...' : 'Go to checkout'}
        </button>

        {error && <p className="mt-4 text-sm text-rose-400">{error}</p>}
      </div>
    </main>
  );
}
