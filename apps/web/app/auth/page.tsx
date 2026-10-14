'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for a login link.');
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-md">
        <h1 className="mb-4 text-2xl font-bold">Sign in to LaunchKit</h1>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-full bg-brand-500 px-4 py-2 font-medium text-white"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send magic link'}
            </button>
          </div>
        </form>

        {message && <p className="mt-4 text-sm text-slate-300">{message}</p>}
      </div>
    </main>
  );
}
