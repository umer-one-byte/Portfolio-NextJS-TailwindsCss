"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

type AuditStatus = "Cleared" | "Pending" | "Flagged";

interface EngagementRow {
  id: string;
  client: string;
  leadSource: string;
  commission: number;
  auditStatus: AuditStatus;
}

const ROWS: EngagementRow[] = [
  {
    id: "eng-01",
    client: "Horizon Retail Group",
    leadSource: "Referral",
    commission: 4200,
    auditStatus: "Cleared",
  },
  {
    id: "eng-02",
    client: "Blue Ridge Wellness",
    leadSource: "Paid Ads",
    commission: 2850,
    auditStatus: "Pending",
  },
  {
    id: "eng-03",
    client: "Nexa Logistics",
    leadSource: "Organic",
    commission: 6120,
    auditStatus: "Cleared",
  },
  {
    id: "eng-04",
    client: "Summit Financial Partners",
    leadSource: "Referral",
    commission: 3475,
    auditStatus: "Flagged",
  },
  {
    id: "eng-05",
    client: "Cedarline Manufacturing",
    leadSource: "Cold Outreach",
    commission: 1980,
    auditStatus: "Cleared",
  },
];

const STATUS_COLOR: Record<AuditStatus, string> = {
  Cleared: "#00f5d4",
  Pending: "#ffb020",
  Flagged: "#ff5470",
};

type ColumnKey = "client" | "leadSource" | "commission" | "auditStatus";

const COLUMNS: { key: ColumnKey; label: string; align?: "right" }[] = [
  { key: "client", label: "Client" },
  { key: "leadSource", label: "Lead Source" },
  { key: "commission", label: "Commission", align: "right" },
  { key: "auditStatus", label: "Audit Status" },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

function fuzzyMatch(query: string, text: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
}

function StatusBadge({ status }: { status: AuditStatus }) {
  const color = STATUS_COLOR[status];
  return (
    <span className="inline-flex items-center gap-2 font-mono text-readout uppercase tracking-widest">
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
      />
      {status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                            */
/* ------------------------------------------------------------------ */

export default function LiveProofTable() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<ColumnKey>("commission");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [visible, setVisible] = useState<Record<ColumnKey, boolean>>({
    client: true,
    leadSource: true,
    commission: true,
    auditStatus: true,
  });

  function handleSort(key: ColumnKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function toggleColumn(key: ColumnKey) {
    setVisible((v) => {
      const activeCount = Object.values(v).filter(Boolean).length;
      if (v[key] && activeCount === 1) return v;
      return { ...v, [key]: !v[key] };
    });
  }

  const filteredAndSorted = useMemo(() => {
    const filtered = ROWS.filter((row) =>
      fuzzyMatch(
        query,
        `${row.client} ${row.leadSource} ${row.auditStatus} ${row.commission}`,
      ),
    );

    return filtered.sort((a, b) => {
      let cmp: number;
      if (sortKey === "commission") {
        cmp = a.commission - b.commission;
      } else {
        cmp = a[sortKey].localeCompare(b[sortKey]);
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [query, sortKey, sortDir]);

  const visibleColumns = COLUMNS.filter((c) => visible[c.key]);

  return (
    <section
      aria-label="Live capability demo"
      className="mx-auto w-full max-w-4xl rounded-2xl border border-border bg-background/80 p-5 shadow-[0_0_60px_-15px_rgba(242,169,59,0.08)] backdrop-blur-sm sm:p-6"
      id="liveprooftable"
    >
      {/* Header: eyebrow, search, column toggles */}
      <div className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-label uppercase tracking-widest text-foreground-muted">
            // live_proof.query()
          </p>
          <p className="mt-1 font-mono text-readout text-foreground-faint">
            {filteredAndSorted.length} of {ROWS.length} records
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search records..."
            aria-label="Search engagement records"
            className="h-10 w-full min-w-[180px] border border-border bg-background px-3 font-mono text-readout text-foreground placeholder:text-foreground-faint focus:border-accent focus:outline-none sm:w-56"
          />

          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Toggle visible columns"
          >
            {COLUMNS.map((col) => {
              const active = visible[col.key];
              return (
                <button
                  key={col.key}
                  type="button"
                  onClick={() => toggleColumn(col.key)}
                  aria-pressed={active}
                  className={`border px-2.5 py-1 font-mono text-label uppercase tracking-widest transition-colors duration-150 ${
                    active
                      ? "border-accent bg-accent text-background"
                      : "border-border text-foreground-muted hover:text-foreground"
                  }`}
                >
                  {col.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto pt-4">
        <table className="w-full min-w-[560px] border-collapse font-mono text-sm">
          <thead>
            <tr className="border-b border-border">
              {visibleColumns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  scope="col"
                  aria-sort={
                    sortKey === col.key
                      ? sortDir === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                  className={`cursor-pointer select-none whitespace-nowrap py-3 px-4 text-label uppercase tracking-widest text-foreground-muted transition-colors duration-150 hover:text-foreground ${
                    col.align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {col.label}
                    <span
                      className={`text-accent transition-opacity duration-150 ${
                        sortKey === col.key ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {sortDir === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <AnimatePresence initial={false}>
              {filteredAndSorted.length === 0 && (
                <motion.tr
                  key="empty-state"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td
                    colSpan={visibleColumns.length}
                    className="py-8 text-center font-mono text-readout text-foreground-faint"
                  >
                    No matches. Try a different query.
                  </td>
                </motion.tr>
              )}

              {filteredAndSorted.map((row) => (
                <motion.tr
                  key={row.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-border/50 hover:bg-background/60"
                >
                  {visibleColumns.map((col) => (
                    <td
                      key={col.key}
                      className={`whitespace-nowrap py-3 px-4 tabular-nums text-foreground ${
                        col.align === "right" ? "text-right" : "text-left"
                      }`}
                    >
                      {col.key === "commission" ? (
                        `$${row.commission.toLocaleString()}`
                      ) : col.key === "auditStatus" ? (
                        <StatusBadge status={row.auditStatus} />
                      ) : (
                        row[col.key]
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Caption */}
      <div className="border-t border-border pt-5 mt-4">
        <p className="border-l-2 border-accent pl-4 font-mono text-readout italic text-foreground-muted">
          I built this to show you instead of telling you. This is a mini
          version of how I engineered dynamic DataTables to optimize internal
          workflows.
        </p>
      </div>
    </section>
  );
}