export default function DashboardPage() {
  const projects = [
    { name: 'Northstar Launch', status: 'Published', visitors: '1.2k' },
    { name: 'Studio MVP', status: 'Draft', visitors: '340' },
    { name: 'Creator Toolkit', status: 'Publishing', visitors: '880' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-brand-200">Dashboard</div>
            <h1 className="mt-2 text-3xl font-bold">Your launch pages</h1>
          </div>
          <button className="rounded-full bg-brand-500 px-4 py-2 font-medium text-white">
            New page
          </button>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="text-sm text-slate-400">Active projects</div>
            <div className="mt-3 text-3xl font-bold">12</div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="text-sm text-slate-400">Monthly visitors</div>
            <div className="mt-3 text-3xl font-bold">48.2k</div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="text-sm text-slate-400">Conversion rate</div>
            <div className="mt-3 text-3xl font-bold">7.4%</div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 text-xl font-semibold">Recent launches</div>
          <div className="overflow-hidden rounded-xl">
            <table className="min-w-full text-left text-sm text-slate-200">
              <thead className="bg-slate-800/70 text-slate-300">
                <tr>
                  <th className="px-4 py-3">Project</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Visitors</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.name} className="border-t border-slate-800">
                    <td className="px-4 py-3">{project.name}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-200">{project.status}</span>
                    </td>
                    <td className="px-4 py-3">{project.visitors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
