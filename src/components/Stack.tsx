const groups = [
  {
    label: "backend",
    items: ["PHP", "Laravel", "RESTful APIs", "OWASP Security", "Role-Based Access Control"],
  },
  {
    label: "frontend",
    items: ["Next.js", "React", "Nuxt.js", "Vue.js", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "data",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Database Normalization"],
  },
  {
    label: "delivery",
    items: ["CI/CD Pipelines", "Git / GitHub", "Automated Testing", "Agile", "Vite"],
  },
];

export default function Stack() {
  return (
    <section id="stack" className="border-b border-border px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-8 font-mono text-xs uppercase tracking-widest text-text-dim">
          stack --list
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <div key={g.label} className="group">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-amber transition-transform group-hover:translate-x-1">
                {g.label}
              </p>
              <ul className="space-y-1.5 border-l border-border/50 pl-3">
                {g.items.map((item) => (
                  <li key={item} className="text-sm text-text-muted hover:text-text transition-colors">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}