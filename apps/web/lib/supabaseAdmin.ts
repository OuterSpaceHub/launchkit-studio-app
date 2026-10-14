'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

type PageEntry = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  updated_at: string;
};

const fallbackPages: PageEntry[] = [
  { id: 'demo-1', title: 'Northstar Launch', slug: 'northstar-launch', published: true, updated_at: '2026-10-14' },
  { id: 'demo-2', title: 'Studio MVP', slug: 'studio-mvp', published: false, updated_at: '2026-10-13' },
  { id: 'demo-3', title: 'Creator Toolkit', slug: 'creator-toolkit', published: true, updated_at: '2026-10-12' },
];

export default function DashboardPage() {
  const [pages, setPages] = useState<PageEntry[]>(fallbackPages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadPages() {
      if (!supabase) {
        if (mounted) setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.from('pages').select('*').order('updated_at', { ascending: false });
        if (!mounted) return;
        if (error) {
          console.error(error);
          setPages(fallbackPages);
        } else {
          setPages((data as PageEntry[]) ?? fallbackPages);
        }
      } catch (err) {
        console.error(err);
        setPages(fallbackPages);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadPages();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-brand-200">Dashboard</div>
            <h1 className="mt-2 text-3xl font-bold">Your launch pages</h1>
          </div>
          <Link href="/editor" className="rounded-full bg-brand-500 px-4 py-2 font-medium text-white">
            New page
          </Link>
        </header>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="text-sm text-slate-400">Active projects</div>
            <div className="mt-3 text-3xl font-bold">{pages.length}</div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="text-sm text-slate-400">Published</div>
            <div className="mt-3 text-3xl font-bold">{pages.filter((page) => page.published).length}</div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="text-sm text-slate-400">Drafts</div>
            <div className="mt-3 text-3xl font-bold">{pages.filter((page) => !page.published).length}</div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="text-xl font-semibold">Recent pages</div>
            <Link href="/editor" className="text-sm text-brand-200">Open editor</Link>
          </div>

          {loading ? (
            <div className="text-slate-300">Loading pages...</div>
          ) : (
            <div className="overflow-hidden rounded-xl">
              <table className="min-w-full text-left text-sm text-slate-200">
                <thead className="bg-slate-800/70 text-slate-300">
                  <tr>
                    <th className="px-4 py-3">Page</th>
                    <th className="px-4 py-3">Slug</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map((page) => (
                    <tr key={page.id} className="border-t border-slate-800">
                      <td className="px-4 py-3 font-medium text-white">{page.title}</td>
                      <td className="px-4 py-3 text-slate-300">/{page.slug}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-1 text-xs ${page.published ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-200'}`}>
                          {page.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-300">{page.updated_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

