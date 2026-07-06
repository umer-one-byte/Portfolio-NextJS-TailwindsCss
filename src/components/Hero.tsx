const metrics = [
  {
    label: "page load time",
    value: -40,
    display: "−40%",
    detail: "SSR/SSG · Lighthouse 90+",
    bar: 62,
  },
  {
    label: "organic sessions",
    value: 55,
    display: "+55%",
    detail: "technical SEO · 3 months",
    bar: 78,
  },
  {
    label: "reconciliation time",
    value: -70,
    display: "−70%",
    detail: "automated commission engine",
    bar: 88,
  },
  {
    label: "daily active users",
    value: 200,
    display: "200+",
    detail: "production CRM, zero downtime",
    bar: 70,
  },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="bg-grid relative overflow-hidden border-b border-border px-6 pt-16 pb-20 sm:pt-24 sm:pb-28"
    >
      <div className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        {/* Left: identity */}
        <div className="animate-rise">
          <div className="mb-6 flex items-center gap-2 font-mono text-xs text-green">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green status-dot" />
            available for contract &amp; freelance work
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-text sm:text-5xl">
            Muhammad Umer Alam
          </h1>
          <p className="mt-3 font-display text-lg font-medium text-amber text-glow sm:text-xl">
            Full-Stack Developer — Laravel, Next.js &amp; Nuxt.js
          </p>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-text-muted">
            I build systems that eliminate manual work and scale securely —
            the parts most developers skip: hardened APIs, fast databases,
            and production infrastructure that holds up under real load.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="rounded-full bg-amber px-5 py-2.5 font-mono text-[13px] font-medium text-bg transition-transform hover:scale-[1.03]"
            >
              View selected work
            </a>
            <a
              href="mailto:umeralampklhr@gmail.com"
              className="rounded-full border border-border px-5 py-2.5 font-mono text-[13px] text-text transition-colors hover:border-amber-dim hover:text-amber"
            >
              umeralampklhr@gmail.com
            </a>
          </div>

          <p className="mt-6 font-mono text-xs text-text-dim">
            Lahore, Pakistan · remote-first
          </p>
        </div>

        {/* Right: signature "system status" metrics panel */}
        <div
          className="animate-rise rounded-2xl border border-border bg-panel/80 p-5 shadow-[0_0_60px_-15px_rgba(242,169,59,0.12)] backdrop-blur-sm sm:p-6"
          style={{ animationDelay: "120ms" }}
        >
          <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
            <span className="font-mono text-xs text-text-dim">
              impact.log
            </span>
            <span className="flex items-center gap-1.5 font-mono text-xs text-green">
              <span className="h-1.5 w-1.5 rounded-full bg-green status-dot" />
              live
            </span>
          </div>

          <div className="space-y-5">
            {metrics.map((m) => (
              <div key={m.label}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[12px] text-text-muted">
                    {m.label}
                  </span>
                  <span className="font-mono text-sm font-semibold text-text">
                    {m.display}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-panel-2">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-dim to-amber"
                    style={{ width: `${m.bar}%` }}
                  />
                </div>
                <div className="mt-1 font-mono text-[11px] text-text-dim">
                  {m.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
