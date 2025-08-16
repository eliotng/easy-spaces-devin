export default function Page() {
  return (
    <main className="space-y-6">
      <section className="rounded-lg border border-slate-200 p-6">
        <h2 className="text-xl font-medium">Welcome</h2>
        <p className="mt-2 text-slate-600">
          This is a Next.js port of the Easy Spaces LWC sample. Use the nav to explore Customers, Reservations, and the Designer.
        </p>
      </section>
      <section className="grid gap-4 sm:grid-cols-2">
        <a href="/customers" className="rounded-lg border border-slate-200 p-6 hover:bg-slate-50">
          <div className="text-lg font-medium">Customers</div>
          <div className="text-slate-600">Browse Contacts or Leads and select one.</div>
        </a>
        <a href="/reservations" className="rounded-lg border border-slate-200 p-6 hover:bg-slate-50">
          <div className="text-lg font-medium">Reservations</div>
          <div className="text-slate-600">View open reservations and select one.</div>
        </a>
        <a href="/designer" className="rounded-lg border border-slate-200 p-6 hover:bg-slate-50">
          <div className="text-lg font-medium">Designer</div>
          <div className="text-slate-600">Filter and select a related space for a market.</div>
        </a>
      </section>
    </main>
  );
}
