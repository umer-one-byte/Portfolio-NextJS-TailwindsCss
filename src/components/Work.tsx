const projects = [
  {
    name: "HealState.org",
    role: "Next.js + Laravel · Community wellness platform",
    description:
      "Led end-to-end platform delivery utilizing SSR/SSG rendering, technical SEO, and secure REST APIs to support high-volume community wellness features.",
    metrics: ["−40% load time", "90+ Lighthouse", "+55% organic sessions"],
    link: "https://healstate.org",
    isLive: true,
  },
  {
    name: "MRS-GROUP CRM Platform",
    role: "Laravel + Nuxt.js · Multi-source commission engine",
    description:
      "Production CRM serving 200+ daily users — automated commissions, immutable payment records, custom DataTables, and layered role-based access control to eliminate unauthorized access.",
    metrics: ["−70% reconciliation time", "−30% data-retrieval time", "0 unauthorized-access incidents"],
    link: "#",
    isLive: false,
  },
];

export default function Work() {
  return (
    <section id="work" className="border-b border-border px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-8 font-mono text-xs uppercase tracking-widest text-text-dim">
          selected work --interactive
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((p) => {
            const CardWrapper = p.isLive ? 'a' : 'div';
            const wrapperProps = p.isLive 
              ? { href: p.link, target: "_blank", rel: "noopener noreferrer", className: "group block rounded-2xl border border-border bg-panel p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-amber-dim cursor-pointer" }
              : { className: "group rounded-2xl border border-border bg-panel p-6 transition-colors hover:border-amber-dim" };

            return (
              <CardWrapper key={p.name} {...wrapperProps}>
                <div className="flex items-start justify-between">
                  <h3 className="font-display text-xl font-semibold text-text group-hover:text-amber transition-colors">
                    {p.name}
                  </h3>
                  {p.isLive && (
                    <span className="text-text-muted transition-colors group-hover:text-amber">
                      ↗
                    </span>
                  )}
                </div>
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
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}