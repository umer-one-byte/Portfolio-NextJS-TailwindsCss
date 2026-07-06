const projects = [
  {
    name: "HealState.org",
    role: "Next.js + Laravel · Community wellness platform",
    description:
      "End-to-end platform delivery with SSR/SSG rendering, technical SEO, and secure REST APIs for community wellness features.",
    metrics: ["−40% load time", "90+ Lighthouse", "+55% organic sessions"],
  },
  {
    name: "Configurable CRM Platform",
    role: "Laravel + Nuxt.js · Multi-source commission engine",
    description:
      "Production CRM serving 200+ daily users — automated commissions, immutable payment records, custom DataTables, and layered role-based access control.",
    metrics: ["−70% reconciliation time", "−30% data-retrieval time", "0 unauthorized-access incidents"],
  },
];

export default function Work() {
  return (
    <section id="work" className="border-b border-border px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-8 font-mono text-xs uppercase tracking-widest text-text-dim">
          selected work
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((p) => (
            <div
              key={p.name}
              className="group rounded-2xl border border-border bg-panel p-6 transition-colors hover:border-amber-dim"
            >
              <h3 className="font-display text-xl font-semibold text-text">
                {p.name}
              </h3>
              <p className="mt-1 font-mono text-[12px] text-amber">
                {p.role}
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-text-muted">
                {p.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.metrics.map((m) => (
                  <span
                    key={m}
                    className="rounded-full border border-border bg-panel-2 px-3 py-1 font-mono text-[11px] text-text-muted"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
