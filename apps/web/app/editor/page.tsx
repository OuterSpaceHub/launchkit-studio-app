'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function EditorPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [title, setTitle] = useState('Untitled Page');
  const [blocksJson, setBlocksJson] = useState('[{ "type": "hero", "props": { "heading": "Hello" } }]');
  const [message, setMessage] = useState<string | null>(null);

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

  async function handleSave() {
    setMessage(null);
    try {
      const blocks = JSON.parse(blocksJson);
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'page';

      const payload: any = {
        user_id: userId,
        title,
        slug,
        blocks,
        published: false,
      };

      const { data, error } = await supabase.from('pages').insert(payload).select().single();
      if (error) throw error;
      setMessage('Saved!');
    } catch (err: any) {
      setMessage('Error: ' + (err.message || 'Invalid JSON'));
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-2xl font-bold">Page editor (MVP)</h1>
        <div className="mb-4">
          <label className="block text-sm text-slate-300">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white" />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-300">Blocks (JSON)</label>
          <textarea rows={10} value={blocksJson} onChange={(e) => setBlocksJson(e.target.value)} className="mt-2 w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white font-mono" />
        </div>

        <div className="flex gap-3">
          <button onClick={handleSave} className="rounded-full bg-brand-500 px-4 py-2 font-medium text-white">Save page</button>
          <button onClick={() => setBlocksJson('[]')} className="rounded-full border border-slate-700 px-4 py-2 text-slate-200">Clear</button>
        </div>

        {message && <p className="mt-4 text-sm text-slate-300">{message}</p>}
      </div>
    </main>
  );
}
