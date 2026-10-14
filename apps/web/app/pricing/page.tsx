export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <div className="text-sm uppercase tracking-[0.2em] text-brand-200">Pricing</div>
          <h1 className="mt-3 text-4xl font-bold">Simple plans. Powerful launch flow.</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Starter', '$19', '3 pages', 'Basic library'],
            ['Pro', '$49', 'Unlimited pages', 'Prompt engine'],
            ['Scale', '$99', 'Teams', 'Custom workflows'],
          ].map(([name, price, feature1, feature2]) => (
            <div key={name} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-xl font-semibold">{name}</h2>
              <div className="mt-4 text-4xl font-bold">{price}</div>
              <div className="mt-2 text-sm text-slate-300">per month</div>
              <ul className="mt-6 space-y-3 text-sm text-slate-200">
                <li>• {feature1}</li>
                <li>• {feature2}</li>
                <li>• Priority support</li>
              </ul>
              <button className="mt-8 w-full rounded-full bg-brand-500 px-4 py-3 font-medium text-white">
                Select {name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
