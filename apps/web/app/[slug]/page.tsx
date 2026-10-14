import { notFound } from 'next/navigation';
import { supabaseServer } from '../../lib/supabaseServer';

type BuilderBlock = {
  id: string;
  type: 'hero' | 'features' | 'cta';
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  items?: string[];
};

function renderBlock(block: BuilderBlock) {
  if (block.type === 'hero') {
    return (
      <section key={block.id} className="rounded-2xl border border-slate-800 bg-gradient-to-br from-brand-500/10 to-slate-900 p-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl">{block.heading ?? 'Hero heading'}</h1>
          <p className="mt-4 text-lg text-slate-300">{block.subheading ?? 'Add a short subheading here.'}</p>
          {block.ctaLabel && (
            <a href={block.ctaUrl ?? '#'} className="mt-6 inline-block rounded-full bg-brand-500 px-5 py-3 font-medium text-white">
              {block.ctaLabel}
            </a>
          )}
        </div>
      </section>
    );
  }

  if (block.type === 'features') {
    return (
      <section key={block.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <h2 className="text-3xl font-bold text-white">{block.heading ?? 'Your feature list'}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {(block.items ?? ['Item one', 'Item two', 'Item three']).map((item) => (
            <div key={item} className="rounded-xl border border-slate-700 bg-slate-950 p-4 text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section key={block.id} className="rounded-2xl border border-brand-500/30 bg-brand-500/10 p-8 text-center">
      <h2 className="text-3xl font-bold text-white">{block.heading ?? 'Ready to launch?'}</h2>
      <p className="mt-4 text-slate-200">{block.subheading ?? 'Ship the next version faster.'}</p>
      {block.ctaLabel && (
        <a href={block.ctaUrl ?? '#'} className="mt-6 inline-block rounded-full bg-brand-500 px-5 py-3 font-medium text-white">
          {block.ctaLabel}
        </a>
      )}
    </section>
  );
}

export default async function PublicPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  let page: any = null;

  if (supabaseServer) {
    const { data, error } = await supabaseServer
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    if (!error) page = data;
  }

  if (!page) {
    const fallbackPage = {
      title: 'LaunchKit Demo',
      blocks: [
        {
          id: 'demo-hero',
          type: 'hero',
          heading: 'Launch your startup faster',
          subheading: 'A polished landing page for your next release.',
          ctaLabel: 'Get started',
          ctaUrl: '/checkout',
        },
        {
          id: 'demo-features',
          type: 'features',
          heading: 'Why teams use LaunchKit',
          items: ['Fast launch page assembly', 'Clear product messaging', 'Clean conversion flow'],
        },
      ],
    };

    if (slug !== 'demo') {
      notFound();
    }
    page = fallbackPage;
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4 text-sm text-slate-300">
          {page.title}
        </div>
        {(page.blocks ?? []).map((block: BuilderBlock) => renderBlock(block))}
      </div>
    </main>
  );
}
