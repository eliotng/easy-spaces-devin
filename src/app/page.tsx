export default function Page() {
  return (
    <main className="space-y-8">
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold tracking-tight">Welcome</h2>
        <p className="mt-2 text-slate-600">
          This is a Next.js port of the Easy Spaces LWC sample. Use the navigation to explore Customers, Reservations,
          and the Designer.
        </p>
      </section>
      <section className="grid gap-6 sm:grid-cols-2">
        <a href="/customers" className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-300">
          <div className="text-lg font-medium">Customers</div>
          <div className="mt-1 text-slate-600">Browse Contacts or Leads and select one.</div>
        </a>
        <a href="/reservations" className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-300">
          <div className="text-lg font-medium">Reservations</div>
          <div className="mt-1 text-slate-600">View open reservations and select one.</div>
        </a>
        <a href="/designer" className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-300">
          <div className="text-lg font-medium">Designer</div>
          <div className="mt-1 text-slate-600">Filter and select a related space for a market.</div>
        </a>
      </section>
    </main>
  );
}
