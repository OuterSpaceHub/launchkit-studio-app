const features = [
  {
    title: 'AI-assisted product prompts',
    description: 'Turn a rough idea into a clear landing-page brief in seconds.',
  },
  {
    title: 'Reusable marketing blocks',
    description: 'Use a library of sections for hero, testimonials, pricing, FAQs, and more.',
  },
  {
    title: 'Preview and publish',
    description: 'Test your site in a full preview flow before sending to customers.',
  },
  {
    title: 'Fast launch cycle',
    description: 'Reduce design work and get from idea to live page in one afternoon.',
  },
];

const plans = [
  {
    name: 'Starter',
    price: '$19',
    description: 'For solo founders shipping quick landing pages.',
    features: ['3 live landing pages', 'Template library access', 'Basic export'],
    featured: false,
  },
  {
    name: 'Pro',
    price: '$49',
    description: 'For startups and product teams working faster.',
    features: ['Unlimited pages', 'Smart content prompts', 'Priority support'],
    featured: true,
  },
  {
    name: 'Scale',
    price: '$99',
    description: 'For agencies and teams with multiple launches.',
    features: ['Brand kits', 'Team accounts', 'Custom integrations'],
    featured: false,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 font-bold text-white">
            L
          </div>
          <div className="text-lg font-semibold">LaunchKit</div>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#product">Product</a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200">
            Log in
          </button>
          <button className="rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-soft hover:bg-brand-600">
            Start free
          </button>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-10 md:grid-cols-2 md:items-center md:pt-20">
        <div>
          <div className="mb-5 inline-flex items-center rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-100">
            Built for founders shipping fast
          </div>

          <h1 className="max-w-xl text-5xl font-bold tracking-tight text-white md:text-6xl">
            Create launch pages that actually convert.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-slate-300">
            LaunchKit helps early-stage teams turn ideas into polished landing pages, pricing sections, and launch assets without hiring a designer.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-full bg-brand-500 px-6 py-3 font-medium text-white shadow-soft hover:bg-brand-600">
              Start for free
            </button>
            <button className="rounded-full border border-slate-700 px-6 py-3 font-medium text-slate-200">
              Book demo
            </button>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-slate-300">
            <span>14-day free trial</span>
            <span>•</span>
            <span>No credit card required</span>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-soft">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Preview</div>
                <div className="mt-2 text-xl font-semibold">Launch page</div>
              </div>
              <div className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-medium text-emerald-300">
                Live
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-brand-500/20 to-slate-900 p-5">
              <div className="mb-4 h-2.5 w-20 rounded-full bg-white/70" />
              <div className="mb-3 h-3 w-36 rounded-full bg-white/50" />
              <div className="mb-6 h-24 rounded-2xl bg-slate-900/70" />

              <div className="grid grid-cols-3 gap-3">
                <div className="h-16 rounded-xl bg-slate-900/60" />
                <div className="h-16 rounded-xl bg-slate-900/60" />
                <div className="h-16 rounded-xl bg-slate-900/60" />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-3">
              <div>
                <div className="text-xs text-slate-400">Conversion score</div>
                <div className="mt-1 text-lg font-semibold text-white">91%</div>
              </div>
              <div className="rounded-full bg-brand-500/15 px-3 py-1 text-xs font-medium text-brand-100">
                +24% this week
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <div className="text-sm font-medium uppercase tracking-[0.25em] text-brand-200">Features</div>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Everything you need to launch faster</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-4 h-10 w-10 rounded-xl bg-brand-500/15" />
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <div className="text-sm font-medium uppercase tracking-[0.25em] text-brand-200">Pricing</div>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Simple plans for every stage</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-6 ${
                plan.featured ? 'border-brand-500 bg-brand-500/10 shadow-soft' : 'border-slate-800 bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                {plan.featured && (
                  <span className="rounded-full bg-brand-500 px-2 py-1 text-xs font-medium text-white">Popular</span>
                )}
              </div>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-slate-400">/ month</span>
              </div>

              <p className="mt-4 text-sm text-slate-300">{plan.description}</p>

              <ul className="mt-6 space-y-3 text-sm text-slate-200">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-brand-300">•</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`mt-8 w-full rounded-full px-4 py-3 font-medium ${plan.featured ? 'bg-brand-500 text-white hover:bg-brand-600' : 'border border-slate-700 text-slate-200'}`}>
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="product" className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.25em] text-brand-200">What customers say</div>
              <blockquote className="mt-6 text-2xl font-medium leading-relaxed text-white">
                “LaunchKit let our team ship a polished product page in one day instead of waiting on design.”
              </blockquote>
              <div className="mt-5 text-sm text-slate-300">
                <div className="font-medium text-white">Ari Chen</div>
                <div>Founder, Northstar Labs</div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <div className="text-sm text-slate-400">Launch stats</div>
              <div className="mt-4 space-y-4">
                <div>
                  <div className="text-3xl font-bold text-white">4.8x</div>
                  <div className="text-sm text-slate-300">faster campaign setup</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">72%</div>
                  <div className="text-sm text-slate-300">more product page engagement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
