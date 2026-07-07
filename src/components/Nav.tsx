"use client";

import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const primaryLinks = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

const secondaryLinks = [
  { href: "#top", label: "Find Me" },
  { href: "#liveprooftable", label: "Live Proof" },
  { href: "#security", label: "Security Vault" },
  { href: "#education", label: "Education" },
];

const allLinks = [...primaryLinks, ...secondaryLinks];

type DownloadState = "idle" | "compiling" | "done" | "error";

function ResumeDownload() {
  const [state, setState] = useState<DownloadState>("idle");
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  async function handleDownload() {
    if (state !== "idle") return;

    setState("compiling");
    setProgress(0);

    const start = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    try {
      const response = await fetch("/resume.pdf");
      if (!response.ok) {
        console.warn("Resume PDF not found (404) – make sure resume.pdf is in the public/ folder.");
        setState("error");
        setTimeout(() => setState("idle"), 2500);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        return;
      }

      const blob = await response.blob();
      await new Promise((resolve) => setTimeout(resolve, 100));

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Muhammad-Umer-Alam-Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setState("done");
      setTimeout(() => setState("idle"), 2000);
    } catch (err) {
      console.warn("Resume download failed:", err);
      setState("error");
      setTimeout(() => setState("idle"), 2500);
    } finally {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={state === "compiling"}
      aria-live="polite"
      aria-label="Download résumé as PDF"
      title="Download résumé (PDF)"
      className="group relative hidden h-8 items-center overflow-hidden rounded-full border border-border/80 px-3 font-mono text-[13px] text-text-muted transition-colors hover:border-amber-dim hover:text-amber disabled:cursor-wait sm:flex"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 bg-amber/15 transition-[width] duration-100 ease-linear"
        style={{
          width:
            state === "compiling"
              ? `${progress}%`
              : state === "done" || state === "error"
                ? "100%"
                : "0%",
        }}
      />

      <span className="relative flex items-center gap-1.5 tabular-nums">
        <AnimatePresence mode="wait" initial={false}>
          {state === "idle" && (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center"
            >
              resume.pdf
              <motion.span
                aria-hidden="true"
                className="ml-0.5 inline-block h-3 w-[6px] bg-text-muted group-hover:bg-amber"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.span>
          )}

          {state === "compiling" && (
            <motion.span
              key="compiling"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              compiling {progress}%
            </motion.span>
          )}

          {state === "done" && (
            <motion.span
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-amber"
            >
              ✓ fetched
            </motion.span>
          )}

          {state === "error" && (
            <motion.span
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-400"
            >
              ⚠ not found
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Command Palette – ⌘K style                                          */
/* ------------------------------------------------------------------ */

function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  // Auto-focus input when palette opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Filter links based on query (fuzzy)
  const filtered = allLinks.filter((link) =>
    link.label.toLowerCase().includes(query.toLowerCase().trim())
  );

  function handleSelect(href: string) {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    onClose();
    setQuery("");
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed inset-x-0 top-24 z-50 mx-auto max-w-md rounded-2xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="font-mono text-label uppercase tracking-widest text-foreground-faint">
                ⌘ navigate
              </span>
              <kbd className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-foreground-faint">
                ESC
              </kbd>
            </div>

            {/* Input */}
            <div className="relative mt-3">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-foreground-faint">
                &gt;
              </span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a section name…"
                className="w-full rounded-lg border border-border bg-background/50 py-2.5 pl-7 pr-3 font-mono text-readout text-foreground placeholder:text-foreground-faint focus:border-accent focus:outline-none"
              />
            </div>

            {/* Results */}
            <div className="mt-3 max-h-60 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="py-4 text-center font-mono text-readout text-foreground-faint">
                  No matches found
                </p>
              ) : (
                <div className="flex flex-col gap-0.5">
                  {filtered.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => handleSelect(link.href)}
                      className="flex items-center justify-between rounded-lg px-3 py-2 font-mono text-[13px] text-text-muted transition-colors hover:bg-amber/10 hover:text-amber"
                    >
                      <span>{link.label}</span>
                      <span className="text-[11px] text-foreground-faint">→</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="mt-3 border-t border-border pt-3">
              <p className="text-center font-mono text-[11px] text-foreground-faint">
                ⌘K to open · ESC to close
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Main Nav                                                            */
/* ------------------------------------------------------------------ */

export default function Nav() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Keyboard shortcut: ⌘K / Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-display text-sm font-semibold tracking-tight text-text">
            umer<span className="text-amber">.</span>alam
          </a>

          <div className="hidden items-center gap-6 font-mono text-[13px] text-text-muted sm:flex">
            {primaryLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-amber"
              >
                {l.label}
              </a>
            ))}
            {/* Command palette toggle */}
            <button
              onClick={() => setPaletteOpen(true)}
              className="flex items-center gap-1 rounded-lg border border-border/50 px-2.5 py-1 font-mono text-[12px] text-foreground-faint transition-colors hover:border-amber-dim hover:text-amber"
              aria-label="Open navigation command palette"
              title="⌘K – quick navigation"
            >
              <span className="text-amber">⌘</span>K
            </button>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/umer-one-byte"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden font-mono text-[13px] text-text-muted transition-colors hover:text-amber sm:block"
              title="GitHub"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-umeralam/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden font-mono text-[13px] text-text-muted transition-colors hover:text-amber sm:block"
              title="LinkedIn"
            >
              LinkedIn ↗
            </a>
            <ResumeDownload />
            <a
              href="mailto:umeralampklhr@gmail.com"
              className="rounded-full border border-amber-dim bg-amber/10 px-4 py-1.5 font-mono text-[13px] text-amber transition-colors hover:bg-amber/20"
            >
              Hire me →
            </a>
          </div>
        </nav>
      </header>

      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}