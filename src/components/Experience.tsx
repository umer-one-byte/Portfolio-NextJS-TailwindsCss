const roles = [
  {
    company: "HealState.org",
    title: "Full Stack Developer",
    period: "Dec 2025 — Present",
    duration: "8 mo",
    points: [
      "Led end-to-end development with Next.js and Laravel, implementing SSR/SSG for ~40% faster loads and 90+ Lighthouse scores.",
      "Drove ~55% organic session growth in 3 months through technical SEO and structured data optimization.",
      "Architected secure, normalized RESTful APIs to support high-volume community interactions and concurrent usage.",
      "Optimized frontend performance with code-splitting, bundling, and caching strategies, lowering JavaScript payloads.",
      "Introduced automated tests, CI/CD pipelines, and OWASP-aligned security measures to reduce incidents and rollbacks."
    ],
  },
  {
    company: "Freelance (MRS-GROUP CRM)",
    title: "Full Stack Developer",
    period: "Jun 2025 — Mar 2026",
    duration: "1 yr 3 mo",
    points: [
      "Built and maintained core CRM modules — auth, lead/client management, notifications, integrations — with Laravel APIs and Nuxt.js.",
      "Shipped an automated commission engine with immutable payment records, cutting reconciliation time ~70% and eliminating billing disputes.",
      "Engineered custom DataTables with dynamic column toggling, advanced search, and sorting, reducing data-retrieval time by ~30%.",
      "Designed and implemented multi-layered role-based access controls (RBAC), resulting in zero unauthorized-access incidents.",
      "Adopted industry-standard automated testing and code-review practices under mentorship to increase code quality."
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="border-b border-border px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-8 font-mono text-xs uppercase tracking-widest text-text-dim">
          experience --log
        </p>
        <div className="space-y-10">
          {roles.map((r) => (
            <div
              key={r.company}
              className="grid gap-2 border-l border-border pl-6 sm:grid-cols-[180px_1fr] sm:gap-8 hover:border-amber-dim transition-colors"
            >
              <div>
                <p className="font-mono text-[12px] text-amber">{r.period}</p>
                <p className="font-mono text-[11px] text-text-dim">
                  {r.duration}
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-text">
                  {r.title}
                </h3>
                <p className="mb-3 text-sm text-text-muted">{r.company}</p>
                <ul className="space-y-2">
                  {r.points.map((p, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-[14px] leading-relaxed text-text-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}