"use client";

import React from "react";

/* ─────────────────────────────────────────────────────────
   ExplorerPreview.tsx
   Block-explorer transaction — displayed inside a desktop
   monitor mockup so it looks like you're staring at your
   screen looking up a real transaction.
───────────────────────────────────────────────────────── */

const TX = {
  hash:      "0x8f3a2c1d9e4b7f06a3e5d2c8b1f9a4e7d0c3b6a2f5e8d1c4b7a0e3d6c9f2b5",
  block:     "21,847,392",
  timestamp: "2 mins ago",
  from:      "ENCRYPTEDFI",
  to:        "eUSDT",
  method:    "encryptedTransfer()",
  status:    "SUCCESS",
  gasUsed:   "312,844",
};

const LOGS = [
  {
    index: "0",
    event: "NoteSpent",
    color: "#e05a4e",
    fields: [
      { key: "nullifier",  value: "0x9d1f4a2e8c3b7d6f1a5e9c2b4d8f3a7e…", full: true },
      { key: "timestamp",  value: "1740921847" },
    ],
  },
  {
    index: "1",
    event: "NoteCreated",
    color: "#4ea8e0",
    fields: [
      { key: "commitment",    value: "0x2c7e5f8a1d4b9e3c7f2a5d8b1e4c9f3a…", full: true },
      { key: "encryptedNote", value: "0x04a3b2f1c8e5d9a2f4b7e1c6d3a8f2b5…", full: true },
      { key: "timestamp",     value: "1740921847" },
    ],
  },
  {
    index: "2",
    event: "NoteCreated",
    color: "#4ea8e0",
    fields: [
      { key: "commitment",    value: "0x7b3a9e2d5c8f1a4e7b0d3c6f9a2e5b8d…", full: true },
      { key: "encryptedNote", value: "0x04f8c1a2e5b9d3f6a1c4e7b0d2f5a8c3…", full: true },
      { key: "timestamp",     value: "1740921847" },
    ],
  },
];

function Badge({ children, color }: { children: string; color: string }) {
  return (
    <span style={{
      fontFamily: "var(--font-mono)",
      fontSize: "0.58rem",
      fontWeight: 700,
      letterSpacing: "0.1em",
      padding: "2px 8px",
      border: `1px solid ${color}33`,
      color,
      background: `${color}11`,
      whiteSpace: "nowrap" as const,
    }}>
      {children}
    </span>
  );
}

function Hex({ value }: { value: string }) {
  return (
    <span style={{
      fontFamily: "var(--font-mono)",
      fontSize: "0.62rem",
      color: "rgba(228,222,212,0.5)",
      wordBreak: "break-all" as const,
    }}>
      {value}
    </span>
  );
}

/* ── The actual explorer card contents ── */
function ExplorerCard() {
  return (
    <div style={{ background: "#0d0d0d", overflow: "hidden", borderRadius: 2 }}>

      {/* Browser chrome bar */}
      <div style={{
        background: "#1a1a1a",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        {/* Traffic lights */}
        {["#e05a4e", "#e0b84e", "#4ead5b"].map((c) => (
          <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.75 }} />
        ))}
        {/* URL bar */}
        <div style={{
          flex: 1,
          marginLeft: 8,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 4,
          padding: "4px 12px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          {/* Lock icon */}
          <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
            <rect x="2" y="5" width="8" height="6" rx="1" stroke="rgba(100,220,100,0.6)" strokeWidth="1.2"/>
            <path d="M4 5V3.5a2 2 0 014 0V5" stroke="rgba(100,220,100,0.6)" strokeWidth="1.2"/>
          </svg>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.04em",
          }}>
            explorer.network / tx / 0x8f3a…b5
          </span>
          <span style={{
            marginLeft: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: "0.48rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            padding: "1px 6px",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.25)",
          }}>
            ANY EVM CHAIN
          </span>
        </div>
      </div>

      {/* Page body */}
      <div style={{ padding: "20px 24px 24px" }}>

        {/* TX hash row */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          paddingBottom: 14,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          marginBottom: 14,
          flexWrap: "wrap" as const,
        }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.22)",
            minWidth: 96,
            paddingTop: 2,
          }}>TX HASH</span>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "rgba(100,160,255,0.75)",
            wordBreak: "break-all" as const,
            flex: 1,
          }}>{TX.hash}</span>
          <Badge color="#4ead5b">{TX.status}</Badge>
        </div>

        {/* Detail rows */}
        {[
          { label: "BLOCK",     value: TX.block     },
          { label: "TIMESTAMP", value: TX.timestamp  },
          { label: "FROM",      value: TX.from,      highlight: "relayer" },
          { label: "TO",        value: TX.to         },
          { label: "METHOD",    value: TX.method     },
          { label: "GAS USED",  value: TX.gasUsed    },
        ].map(({ label, value, highlight }) => (
          <div key={label} style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            paddingBottom: 10,
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            marginBottom: 10,
            flexWrap: "wrap" as const,
          }}>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.22)",
              minWidth: 96,
              paddingTop: 1,
            }}>{label}</span>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              color: label === "METHOD"
                ? "rgba(228,180,100,0.8)"
                : highlight === "relayer"
                ? "rgba(160,220,120,0.85)"
                : "rgba(255,255,255,0.55)",
              flex: 1,
              wordBreak: "break-all" as const,
            }}>{value}</span>
            {highlight === "relayer" && (
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.48rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                padding: "2px 6px",
                border: "1px solid rgba(160,220,120,0.2)",
                color: "rgba(160,220,120,0.5)",
                background: "rgba(160,220,120,0.06)",
                whiteSpace: "nowrap" as const,
              }}>PROTOCOL CONTRACT</span>
            )}
          </div>
        ))}

        {/* Event logs */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: 18,
          marginTop: 8,
        }}>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.22)",
            marginBottom: 14,
          }}>
            EVENT LOGS ({LOGS.length})
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {LOGS.map((log) => (
              <div key={log.index} style={{
                border: `1px solid ${log.color}22`,
                background: `${log.color}09`,
                padding: "13px 16px",
                borderRadius: 2,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.55rem",
                    color: "rgba(255,255,255,0.22)",
                    letterSpacing: "0.1em",
                  }}>[{log.index}]</span>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: log.color,
                    letterSpacing: "0.06em",
                  }}>{log.event}</span>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.52rem",
                    color: "rgba(255,255,255,0.18)",
                    letterSpacing: "0.08em",
                  }}>eUSDT</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {log.fields.map((f) => (
                    <div key={f.key} style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      flexWrap: "wrap" as const,
                    }}>
                      <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.58rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        color: "rgba(255,255,255,0.28)",
                        minWidth: 110,
                        paddingTop: 1,
                      }}>{f.key}</span>
                      <Hex value={f.value} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Desktop monitor shell ── */
function Monitor({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

      {/* Monitor bezel */}
      <div style={{
        width: "100%",
        maxWidth: 780,
        background: "#1c1c1e",
        border: "2px solid #333",
        borderRadius: 12,
        padding: 10,
        boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)",
        position: "relative" as const,
      }}>
        {/* Top notch strip (camera + power indicator) */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 20,
          marginBottom: 8,
          gap: 8,
        }}>
          <div style={{
            width: 6, height: 6,
            borderRadius: "50%",
            background: "#333",
            border: "1px solid #444",
          }} />
          <div style={{
            width: 3, height: 3,
            borderRadius: "50%",
            background: "#4ead5b",
            boxShadow: "0 0 4px #4ead5b",
            opacity: 0.8,
          }} />
        </div>

        {/* Screen — slightly recessed */}
        <div style={{
          borderRadius: 6,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "inset 0 0 30px rgba(0,0,0,0.4)",
        }}>
          {children}
        </div>
      </div>

      {/* Monitor neck */}
      <div style={{
        width: 60,
        height: 28,
        background: "linear-gradient(to bottom, #1c1c1e, #252528)",
        borderLeft: "1px solid #333",
        borderRight: "1px solid #333",
      }} />

      {/* Monitor base */}
      <div style={{
        width: 180,
        height: 12,
        background: "#1c1c1e",
        border: "1px solid #333",
        borderRadius: "0 0 8px 8px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
      }} />
    </div>
  );
}

export default function ExplorerPreview() {
  return (
    <section
      id="explorer"
      style={{ background: "var(--ink)", padding: "80px 0", overflow: "hidden" }}
    >
      {/* Section label */}
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 32px",
        borderTop: "1px solid rgba(228,222,212,0.12)",
        borderBottom: "1px solid rgba(228,222,212,0.12)",
        marginBottom: 64,
      }}>
        <div style={{ flex: 1, height: 1, background: "rgba(228,222,212,0.08)" }} />
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          padding: "0 20px",
          color: "rgba(228,222,212,0.35)",
        }}>
          WHAT IT LOOKS LIKE ON CHAIN
        </span>
        <div style={{ flex: 1, height: 1, background: "rgba(228,222,212,0.08)" }} />
      </div>

      <div className="section-inner">

        {/* Headline only */}
        <div style={{ marginBottom: 56, maxWidth: 560 }}>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--white)",
          }}>
            No sender.
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 700, color: "rgba(228,222,212,0.5)" }}>
              No receiver. Just proof.
            </em>
          </h2>
        </div>

        {/* Monitor containing the explorer */}
        <Monitor>
          <ExplorerCard />
        </Monitor>

        {/* Footer caption */}
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.58rem",
          color: "rgba(228,222,212,0.18)",
          letterSpacing: "0.08em",
          marginTop: 32,
          textAlign: "center" as const,
        }}>
          ILLUSTRATIVE EXAMPLE · REAL TRANSACTIONS LOOK EXACTLY LIKE THIS · NO SENDER · NO RECEIVER · NEVER
        </p>

      </div>
    </section>
  );
}
