export default function Education() {
  return (
    <section id="education" className="border-b border-border px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-8 font-mono text-xs uppercase tracking-widest text-text-dim">
          education --fetch
        </p>
        <div className="grid gap-2 border-l border-border pl-6 sm:grid-cols-[180px_1fr] sm:gap-8 hover:border-amber-dim transition-colors">
          <div>
            <p className="font-mono text-[12px] text-amber">May 2024 — May 2026</p>
            <p className="font-mono text-[11px] text-text-dim">Lahore, Pakistan</p>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-text">
              HSSC (Higher Secondary School Certificate)
            </h3>
            <p className="mb-2 text-sm text-text-muted">Unique High School &amp; Academy</p>
            <p className="text-[14px] leading-relaxed text-text-muted">
              Intermediate in Computer Science. Coursework includes Computer Science, Mathematics, and Physics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}