"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ExternalLink, Mail } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Security & Infrastructure Vault                                     */
/* ------------------------------------------------------------------ */

interface VaultEntry {
  address: string;
  title: string;
  description: string;
}

const VAULT_ENTRIES: VaultEntry[] = [
  {
    address: "0x00",
    title: "OWASP-Aligned Controls",
    description:
      "Systematic input sanitization, output encoding, and URL-scheme validation on every user-facing field — closing stored XSS and injection paths before they ship.",
  },
  {
    address: "0x01",
    title: "System Hardening",
    description:
      "Module-by-module vulnerability sweeps backed by static analysis, catching unsafe patterns in review instead of in production.",
  },
  {
    address: "0x02",
    title: "CI/CD Pipelines",
    description:
      "Automated tests and gated deploys that turn releases into routine events — fewer incidents, fewer rollbacks, faster shipping.",
  },
  {
    address: "0x03",
    title: "RBAC & Audit Trails",
    description:
      "Multi-layered role-based access control paired with immutable records, so every action is both restricted and provable.",
  },
];

function VaultCard({ entry }: { entry: VaultEntry }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group flex flex-col gap-4 rounded-2xl border border-border bg-background/80 p-6 shadow-[0_0_60px_-15px_rgba(242,169,59,0.06)] backdrop-blur-sm transition-shadow hover:border-accent hover:shadow-[0_0_60px_-15px_rgba(242,169,59,0.15)]"
    >
      <span className="font-mono text-label uppercase tracking-widest text-foreground-faint transition-colors duration-200 group-hover:text-accent">
        {entry.address}
      </span>
      <h3 className="font-display text-lg font-bold text-foreground md:text-xl">
        {entry.title}
      </h3>
      <p className="text-sm leading-relaxed text-foreground-muted">
        {entry.description}
      </p>
    </motion.div>
  );
}

function SecurityVault() {
  return (
    <section
      aria-label="Security and infrastructure focus"
      className="mx-auto w-full max-w-5xl px-6 py-20 md:px-10"
      id="security"
    >
      <p className="mb-3 font-mono text-label uppercase tracking-widest text-foreground-muted">
        // security_and_infra_vault
      </p>
      <h2 className="mb-10 font-display text-2xl font-bold text-foreground md:text-3xl">
        Security &amp; Infrastructure Vault
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        {VAULT_ENTRIES.map((entry) => (
          <VaultCard key={entry.address} entry={entry} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Floating contact dock                                               */
/* ------------------------------------------------------------------ */

interface DockIconProps {
  mouseX: MotionValue<number>;
  href: string;
  label: string;
  external?: boolean;
  children: ReactNode;
}

function DockIcon({ mouseX, href, label, external, children }: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Infinity;
    return val - (bounds.x + bounds.width / 2);
  });

  const scaleRaw = useTransform(distance, [-100, 0, 100], [1, 1.6, 1]);
  const scale = useSpring(scaleRaw, { mass: 0.1, stiffness: 220, damping: 14 });

  const liftRaw = useTransform(distance, [-100, 0, 100], [0, -10, 0]);
  const lift = useSpring(liftRaw, { mass: 0.1, stiffness: 220, damping: 14 });

  return (
    <a
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className="group relative flex flex-col items-center"
    >
      <motion.div
        ref={ref}
        style={{ scale, y: lift }}
        className="flex h-11 w-11 items-center justify-center border border-border bg-background/80 text-foreground-muted backdrop-blur-sm transition-colors duration-150 group-hover:border-accent group-hover:text-accent"
      >
        {children}
      </motion.div>
      <span className="pointer-events-none absolute -top-9 scale-90 whitespace-nowrap rounded border border-border bg-background-elevated px-2 py-1 font-mono text-label uppercase tracking-widest text-foreground-muted opacity-0 transition-all duration-150 group-hover:scale-100 group-hover:opacity-100">
        {label}
      </span>
    </a>  
  );
}

function ContactDock() {
  const mouseX = useMotionValue<number>(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed inset-x-0 bottom-6 z-40 mx-auto flex w-fit items-end gap-3 rounded-2xl border border-border bg-background/80 px-4 py-3 shadow-[0_0_60px_-15px_rgba(242,169,59,0.06)] backdrop-blur-md"
    >
      <DockIcon
        mouseX={mouseX}
        href="https://www.linkedin.com/in/muhammad-umeralam"
        label="LinkedIn"
        external
      >
        <ExternalLink className="h-5 w-5" strokeWidth={1.75} />
      </DockIcon>
      <DockIcon mouseX={mouseX} href="mailto:umeralamlhr@gmail.com" label="Email">
        <Mail className="h-5 w-5" strokeWidth={1.75} />
      </DockIcon>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Export                                                              */
/* ------------------------------------------------------------------ */

export default function FooterDock() {
  return (
    <>
      <SecurityVault />
      <ContactDock />
    </>
  );
}