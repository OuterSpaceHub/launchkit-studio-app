'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function SettingsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setUserId(data.session?.user?.id ?? null);
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  async function openPortal() {
    if (!userId) return setError('Sign in first');
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error || 'No URL returned');
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-md">
        <h1 className="mb-4 text-2xl font-bold">Settings</h1>
        <p className="mb-6 text-slate-300">Manage your subscription and account.</p>

        <button onClick={openPortal} className="w-full rounded-full bg-brand-500 px-4 py-3 font-medium text-white" disabled={loading}>
          {loading ? 'Opening...' : 'Manage billing'}
        </button>

        {error && <p className="mt-4 text-sm text-rose-400">{error}</p>}
      </div>
    </main>
  );
}
