export default function Contact() {
  return (
    <section id="contact" className="bg-grid px-6 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-text-dim">
          $ contact --init
        </p>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          Let&apos;s build something that scales.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] text-text-muted">
          Open to remote contract and freelance work. One extra question
          upfront beats a rebuild later.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:umeralampklhr@gmail.com"
            className="rounded-full bg-amber px-6 py-3 font-mono text-[13px] font-medium text-bg transition-transform hover:scale-[1.03]"
          >
            umeralampklhr@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/muhammadumeralam"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-6 py-3 font-mono text-[13px] text-text transition-colors hover:border-amber-dim hover:text-amber"
          >
            LinkedIn ↗
          </a>
        </div>

        <div className="mx-auto mt-14 flex max-w-md flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-border pt-6 font-mono text-[11px] text-text-dim">
          <span>+92 302 6907967</span>
          <span>Lahore, Pakistan</span>
          <span>HSSC · Computer Science</span>
        </div>
      </div>
    </section>
  );
}
