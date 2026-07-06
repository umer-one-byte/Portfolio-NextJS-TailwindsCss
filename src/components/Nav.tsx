const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="font-display text-sm font-semibold tracking-tight text-text"
        >
          umer<span className="text-amber">.</span>alam
        </a>
        <div className="hidden items-center gap-8 font-mono text-[13px] text-text-muted sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-amber"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="mailto:umeralampklhr@gmail.com"
          className="rounded-full border border-amber-dim bg-amber/10 px-4 py-1.5 font-mono text-[13px] text-amber transition-colors hover:bg-amber/20"
        >
          Hire me →
        </a>
      </nav>
    </header>
  );
}
