const groups = [
  {
    label: "backend",
    items: ["Laravel", "PHP", "REST APIs", "OWASP Security"],
  },
  {
    label: "frontend",
    items: ["Next.js", "React", "Nuxt.js", "Vue.js", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "data",
    items: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    label: "delivery",
    items: ["CI/CD", "Git", "Automated Testing", "Vite"],
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
            <div key={g.label}>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-amber">
                {g.label}
              </p>
              <ul className="space-y-1.5">
                {g.items.map((item) => (
                  <li key={item} className="text-sm text-text-muted">
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
