'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

type BlockType = 'hero' | 'features' | 'cta';

type BuilderBlock = {
  id: string;
  type: BlockType;
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  items?: string[];
};

const buildDemoBlocks = (): BuilderBlock[] => [
  {
    id: crypto.randomUUID(),
    type: 'hero',
    heading: 'Launch a polished startup page in a weekend',
    subheading: 'Turn rough ideas into a beautiful landing page with reusable sections and launch-ready messaging.',
    ctaLabel: 'Start free',
    ctaUrl: '#pricing',
  },
  {
    id: crypto.randomUUID(),
    type: 'features',
    heading: 'Everything you need to ship',
    items: ['Reusable blocks', 'Launch messaging', 'Pricing-ready copy'],
  },
  {
    id: crypto.randomUUID(),
    type: 'cta',
    heading: 'Ready to launch?',
    subheading: 'Create your next product launch page in one afternoon.',
    ctaLabel: 'Book a demo',
    ctaUrl: '/checkout',
  },
];

export default function EditorPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [title, setTitle] = useState('LaunchKit Launch Page');
  const [blocks, setBlocks] = useState<BuilderBlock[]>(buildDemoBlocks);
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      if (!supabase) return;
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setUserId(data.session?.user?.id ?? null);
    }

    loadUser();

    return () => {
      mounted = false;
    };
  }, []);

  const previewBlocks = useMemo(() => blocks, [blocks]);

  const handleAddBlock = (type: BlockType) => {
    setBlocks((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        type,
        heading: type === 'hero' ? 'New hero section' : type === 'features' ? 'New section' : 'Ready to launch?',
        subheading: type === 'cta' ? 'Create your next product launch page in one afternoon.' : 'Add a short description here.',
        ctaLabel: type === 'cta' ? 'Get started' : 'Try it now',
        ctaUrl: '#',
        items: type === 'features' ? ['Feature one', 'Feature two', 'Feature three'] : [],
      },
    ]);
  };

  const updateBlock = (id: string, patch: Partial<BuilderBlock>) => {
    setBlocks((current) => current.map((block) => (block.id === id ? { ...block, ...patch } : block)));
  };

  const removeBlock = (id: string) => {
    setBlocks((current) => current.filter((block) => block.id !== id));
  };

  const savePage = async () => {
    if (!supabase) {
      setMessage('Add Supabase env vars to enable persistence.');
      return;
    }

    if (!userId) {
      setMessage('Sign in first to save a page.');
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'untitled-page';
      const { error } = await supabase.from('pages').upsert(
        {
          user_id: userId,
          title,
          slug,
          blocks,
          published,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'slug' }
      );

      if (error) throw error;
      setMessage(published ? 'Page saved and published.' : 'Page saved successfully.');
    } catch (err: any) {
      setMessage(err.message || 'Unable to save page.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-brand-200">Builder</div>
            <h1 className="mt-2 text-3xl font-bold">Page Builder MVP</h1>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200">
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
              Publish live
            </label>
            <button
              onClick={savePage}
              disabled={isSaving}
              className="rounded-full bg-brand-500 px-5 py-3 font-medium text-white disabled:opacity-60"
            >
              {isSaving ? 'Saving...' : 'Save page'}
            </button>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="mb-5">
              <label className="mb-2 block text-sm text-slate-300">Page title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white"
              />
            </div>

            <div className="mb-5 flex gap-3">
              <button onClick={() => handleAddBlock('hero')} className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200">
                + Hero
              </button>
              <button onClick={() => handleAddBlock('features')} className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200">
                + Features
              </button>
              <button onClick={() => handleAddBlock('cta')} className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200">
                + CTA
              </button>
            </div>

            <div className="space-y-4">
              {blocks.map((block, index) => (
                <div key={block.id} className="rounded-xl border border-slate-700 bg-slate-950 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.2em] text-brand-200">{block.type}</span>
                    <button onClick={() => removeBlock(block.id)} className="text-sm text-rose-300">
                      Remove
                    </button>
                  </div>

                  {block.type === 'hero' && (
                    <div className="space-y-3">
                      <input
                        value={block.heading ?? ''}
                        onChange={(e) => updateBlock(block.id, { heading: e.target.value })}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white"
                        placeholder="Heading"
                      />
                      <textarea
                        value={block.subheading ?? ''}
                        onChange={(e) => updateBlock(block.id, { subheading: e.target.value })}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white"
                        rows={3}
                        placeholder="Subheading"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          value={block.ctaLabel ?? ''}
                          onChange={(e) => updateBlock(block.id, { ctaLabel: e.target.value })}
                          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white"
                          placeholder="Button label"
                        />
                        <input
                          value={block.ctaUrl ?? ''}
                          onChange={(e) => updateBlock(block.id, { ctaUrl: e.target.value })}
                          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white"
                          placeholder="Button URL"
                        />
                      </div>
                    </div>
                  )}

                  {block.type === 'features' && (
                    <div className="space-y-3">
                      <input
                        value={block.heading ?? ''}
                        onChange={(e) => updateBlock(block.id, { heading: e.target.value })}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white"
                        placeholder="Features title"
                      />
                      <textarea
                        value={(block.items ?? []).join('\n')}
                        onChange={(e) =>
                          updateBlock(block.id, {
                            items: e.target.value.split('\n').map((line) => line.trim()).filter(Boolean),
                          })
                        }
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white"
                        rows={5}
                        placeholder="Add one feature per line"
                      />
                    </div>
                  )}

                  {block.type === 'cta' && (
                    <div className="space-y-3">
                      <input
                        value={block.heading ?? ''}
                        onChange={(e) => updateBlock(block.id, { heading: e.target.value })}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white"
                        placeholder="CTA heading"
                      />
                      <textarea
                        value={block.subheading ?? ''}
                        onChange={(e) => updateBlock(block.id, { subheading: e.target.value })}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white"
                        rows={3}
                        placeholder="CTA text"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          value={block.ctaLabel ?? ''}
                          onChange={(e) => updateBlock(block.id, { ctaLabel: e.target.value })}
                          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white"
                          placeholder="Button label"
                        />
                        <input
                          value={block.ctaUrl ?? ''}
                          onChange={(e) => updateBlock(block.id, { ctaUrl: e.target.value })}
                          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white"
                          placeholder="Button URL"
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-3 text-xs text-slate-400">Block #{index + 1}</div>
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Live preview</h2>
              <span className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-300">{previewBlocks.length} blocks</span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
              <div className="border-b border-slate-800 px-4 py-3 text-xs uppercase tracking-[0.2em] text-slate-300">
                {title || 'Untitled page'}
              </div>

              <div className="space-y-0 bg-slate-950 p-4 text-slate-100">
                {previewBlocks.map((block) => {
                  if (block.type === 'hero') {
                    return (
                      <section key={block.id} className="rounded-xl border border-slate-800 bg-gradient-to-br from-brand-500/10 to-slate-900 p-5">
                        <h3 className="text-2xl font-bold text-white">{block.heading}</h3>
                        <p className="mt-3 text-sm text-slate-300">{block.subheading}</p>
                        {block.ctaLabel && (
                          <button className="mt-4 rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white">
                            {block.ctaLabel}
                          </button>
                        )}
                      </section>
                    );
                  }

                  if (block.type === 'features') {
                    return (
                      <section key={block.id} className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
                        <h3 className="text-xl font-semibold text-white">{block.heading}</h3>
                        <div className="mt-4 grid gap-3">
                          {(block.items ?? []).map((item) => (
                            <div key={item} className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200">
                              {item}
                            </div>
                          ))}
                        </div>
                      </section>
                    );
                  }

                  return (
                    <section key={block.id} className="mt-4 rounded-xl border border-brand-500/30 bg-brand-500/10 p-5 text-center">
                      <h3 className="text-xl font-semibold text-white">{block.heading}</h3>
                      <p className="mt-3 text-sm text-slate-200">{block.subheading}</p>
                      {block.ctaLabel && (
                        <button className="mt-4 rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white">
                          {block.ctaLabel}
                        </button>
                      )}
                    </section>
                  );
                })}
              </div>
            </div>

            {message && <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-slate-200">{message}</div>}
          </aside>
        </div>
      </div>
    </main>
  );
}

