"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

type TabKey = "challenge" | "stack" | "metrics";

interface Metric {
  label: string;
  value: string;
}

interface Project {
  id: string;
  path: string;
  name: string;
  period: string;
  status: "ACTIVE" | "COMPLETE";
  tagline: string;
  chips: string[];
  challenge: string[];
  stack: string[];
  metrics: Metric[];
  url?: string; // optional external link
}

const PROJECTS: Project[] = [
  {
    id: "healstate",
    path: "~/projects/healstate.org",
    name: "HealState.org",
    period: "Dec 2025 — Present",
    status: "ACTIVE",
    tagline:
      "Wellness marketplace rebuilt on Next.js + Laravel for speed and organic reach.",
    chips: ["40% faster load", "55% organic growth", "90+ Lighthouse"],
    challenge: [
      "/**",
      " * The problem:",
      " * Marketplace, course, and service pages were fully",
      " * client-rendered — slow first paint, weak SEO, and",
      " * a Lighthouse score that couldn't support growth.",
      " *",
      " * The fix:",
      " * Migrated critical routes to SSR/SSG on the App",
      " * Router, restructured data-fetching at the route",
      " * level, and removed request waterfalls between the",
      " * Laravel API and the frontend.",
      " *",
      " * Result: faster loads, higher rankings, and a UI",
      " * that stays 100% API-driven with no hardcoded copy",
      " * outside intentional marketing sections.",
      " */",
    ],
    stack: [
      "Next.js 15 (App Router)",
      "React 19",
      "Laravel 11 (REST API)",
      "TypeScript",
      "Tailwind CSS v4",
      "PostgreSQL",
    ],
    metrics: [
      { label: "page_load_time", value: "-40%" },
      { label: "organic_sessions", value: "+55%" },
      { label: "lighthouse_score", value: "90+" },
    ],
    url: "https://healstate.org", // external link
  },
  {
    id: "crm",
    path: "~/projects/configurable-crm",
    name: "Configurable CRM System",
    period: "Jun 2025 — Mar 2026",
    status: "COMPLETE",
    tagline:
      "Automated commission engine and role-based access control for a 200+ user CRM.",
    chips: ["70% less reconciliation", "0 access incidents", "200+ daily users"],
    challenge: [
      "/**",
      " * The problem:",
      " * Commission payouts were calculated manually across",
      " * multiple ad sources and roles — slow, error-prone,",
      " * and the source of recurring billing disputes.",
      " *",
      " * The fix:",
      " * Built a commission engine that resolves rate by",
      " * source and role automatically, paired with",
      " * immutable payment records for full auditability.",
      " * Layered role-based access control on top so every",
      " * action maps to an explicit permission.",
      " *",
      " * Result: reconciliation time collapsed, disputes",
      " * dropped to near zero, and access is fully audited.",
      " */",
    ],
    stack: [
      "Laravel 11 (REST API)",
      "Nuxt.js 3",
      "Vue.js",
      "MySQL",
      "Redis (queues)",
      "Role-based access middleware",
    ],
    metrics: [
      { label: "reconciliation_time", value: "-70%" },
      { label: "unauthorized_access", value: "0 incidents" },
      { label: "daily_active_users", value: "200+" },
    ],
  },
];

const TABS: { key: TabKey; label: string }[] = [
  { key: "challenge", label: "Architectural Challenge" },
  { key: "stack", label: "Stack Used" },
  { key: "metrics", label: "Metrics Locked" },
];

/* ------------------------------------------------------------------ */
/* Code pane                                                           */
/* ------------------------------------------------------------------ */

function CodePane({ lines }: { lines: ReactNode[] }) {
  return (
    <div className="grid grid-cols-[2rem_1fr] gap-x-4 font-mono text-sm leading-relaxed md:grid-cols-[2.5rem_1fr]">
      {lines.map((line, i) => (
        <div className="contents" key={i}>
          <span className="select-none text-right text-foreground-faint">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="whitespace-pre-wrap break-words text-foreground-muted">
            {line}
          </span>
        </div>
      ))}
    </div>
  );
}

function buildMetricsLines(project: Project): ReactNode[] {
  const header = `$ metrics --project="${project.id}" --status=locked`;
  const longestLabel = Math.max(...project.metrics.map((m) => m.label.length));

  return [
    <span key="cmd" className="text-foreground">
      {header}
    </span>,
    "",
    ...project.metrics.map((m) => (
      <span key={m.label}>
        <span className="text-foreground-muted">
          {m.label.padEnd(longestLabel + 2, " ")}
        </span>
        <span className="text-accent">{m.value.padEnd(10, " ")}</span>
        <span className="text-foreground-faint">✓ verified</span>
      </span>
    )),
  ];
}

/* ------------------------------------------------------------------ */
/* Expanded terminal window                                            */
/* ------------------------------------------------------------------ */

function TerminalWindow({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>("challenge");

  const paneContent: Record<TabKey, ReactNode[]> = {
    challenge: project.challenge,
    stack: project.stack.map((item, i) => (
      <span key={item}>
        <span className="text-foreground-faint">{i === 0 ? "const stack = [" : ""}</span>
        {i === 0 && <br />}
        <span className="text-foreground-muted">{"  "}"</span>
        <span className="text-foreground">{item}</span>
        <span className="text-foreground-muted">",</span>
      </span>
    )),
    metrics: buildMetricsLines(project),
  };

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      onClick={(e) => e.stopPropagation()}
      className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden border border-border-strong bg-background-elevated shadow-2xl"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground-faint/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground-faint/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        </div>
        <p className="flex-1 truncate text-center font-mono text-readout text-foreground-muted">
          {project.path}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project inspector"
          className="font-mono text-foreground-faint transition-colors hover:text-accent"
        >
          ✕
        </button>
      </div>

      {/* Header: name, period, status */}
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-center gap-2 font-mono text-label uppercase tracking-widest text-foreground-muted">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              project.status === "ACTIVE" ? "bg-accent" : "bg-foreground-faint"
            }`}
            style={
              project.status === "ACTIVE"
                ? { boxShadow: "0 0 8px #00f5d4" }
                : undefined
            }
          />
          <span>{project.status}</span>
          <span className="text-foreground-faint">/</span>
          <span>{project.period}</span>
        </div>
        <h3 className="mt-2 font-display text-xl font-bold text-foreground md:text-2xl">
          {project.name}
        </h3>
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-border" role="tablist">
        {TABS.map((tab) => {
          const active = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-4 py-3 font-mono text-label uppercase tracking-widest transition-colors duration-150 ${
                active ? "text-accent" : "text-foreground-muted hover:text-foreground"
              }`}
            >
              {tab.label}
              {active && (
                <motion.span
                  layoutId={`tab-underline-${project.id}`}
                  className="absolute inset-x-0 -bottom-px h-px bg-accent"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="min-h-[240px] flex-1 overflow-y-auto bg-background-recessed px-5 py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            <CodePane lines={paneContent[activeTab]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Collapsed card                                                      */
/* ------------------------------------------------------------------ */

function ProjectCard({
  project,
  isOpen,
  onOpen,
}: {
  project: Project;
  isOpen: boolean;
  onOpen: () => void;
}) {
  // If the project has an external URL, clicking the card opens it
  const handleClick = () => {
    if (project.url) {
      window.open(project.url, "_blank", "noopener,noreferrer");
    } else {
      onOpen();
    }
  };

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      style={{
        opacity: isOpen ? 0 : 1,
        pointerEvents: isOpen ? "none" : "auto",
      }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group flex cursor-pointer flex-col gap-5 rounded-2xl border border-border bg-background/80 p-6 shadow-[0_0_60px_-15px_rgba(242,169,59,0.06)] backdrop-blur-sm text-left transition-shadow hover:shadow-[0_0_60px_-15px_rgba(242,169,59,0.15)]"
    >
      <div className="flex items-center justify-between gap-2 font-mono text-label uppercase tracking-widest text-foreground-muted">
        <div className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              project.status === "ACTIVE" ? "bg-accent" : "bg-foreground-faint"
            }`}
            style={
              project.status === "ACTIVE"
                ? { boxShadow: "0 0 8px #00f5d4" }
                : undefined
            }
          />
          <span>{project.status}</span>
          <span className="text-foreground-faint">/</span>
          <span>{project.period}</span>
        </div>
        {project.url && (
          <span className="text-foreground-faint transition-colors group-hover:text-accent" aria-hidden="true">
            ↗
          </span>
        )}
      </div>

      <div>
        <h3 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          {project.name}
        </h3>
        <p className="mt-2 text-foreground-muted">{project.tagline}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.chips.map((chip) => (
          <span
            key={chip}
            className="border border-border px-2.5 py-1 font-mono text-label uppercase tracking-widest text-foreground-muted"
          >
            {chip}
          </span>
        ))}
      </div>

      <p className="mt-auto font-mono text-label uppercase tracking-widest text-foreground-faint transition-colors group-hover:text-accent">
        {project.url ? "Visit site →" : "Click to inspect →"}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                              */
/* ------------------------------------------------------------------ */

export default function ProjectTimeline() {
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (!openId) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenId(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openId]);

  const openProject = PROJECTS.find((p) => p.id === openId) ?? null;

  return (
    <section
      aria-label="Selected work"
      className="mx-auto w-full max-w-5xl px-6 py-20 md:px-10"
      id="work"
    >
      <p className="mb-8 font-mono text-label uppercase tracking-widest text-foreground-muted">
        // selected_work
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isOpen={openId === project.id}
            onOpen={() => setOpenId(project.id)}
          />
        ))}
      </div>

      <AnimatePresence>
        {openProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenId(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-6 backdrop-blur-sm"
          >
            <TerminalWindow project={openProject} onClose={() => setOpenId(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}