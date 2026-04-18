"use client";

import React, { useState, useCallback } from "react";

/* ────────────────────────────────────────────────────────
   ExplorerPreview.tsx
   - 3D perspective-tilted monitor that flattens on hover
   - Copy-to-clipboard on any hex value
   - Tabbed explorer: Transaction · Event Logs · Privacy Proof
──────────────────────────────────────────────────────── */

const TX = {
  hash:      "0x8f3a2c1d9e4b7f06a3e5d2c8b1f9a4e7d0c3b6a2f5e8d1c4b7a0e3d6c9f2b5",
  block:     "21,847,392",
  timestamp: "2 mins ago",
  from:      "ENCRYPTEDFI RELAY",
  to:        "eUSDT Vault",
  method:    "encryptedTransfer()",
  status:    "SUCCESS",
  gasUsed:   "312,844",
};

const LOGS = [
  {
    index: "0", event: "NoteSpent", color: "#e05a4e",
    fields: [
      { key: "nullifier",  value: "0x9d1f4a2e8c3b7d6f1a5e9c2b4d8f3a7e…" },
      { key: "timestamp",  value: "1740921847" },
    ],
  },
  {
    index: "1", event: "NoteCreated", color: "#4ea8e0",
    fields: [
      { key: "commitment",    value: "0x2c7e5f8a1d4b9e3c7f2a5d8b1e4c9f3a…" },
      { key: "encryptedNote", value: "0x04a3b2f1c8e5d9a2f4b7e1c6d3a8f2b5…" },
    ],
  },
  {
    index: "2", event: "NoteCreated", color: "#4ea8e0",
    fields: [
      { key: "commitment",    value: "0x7b3a9e2d5c8f1a4e7b0d3c6f9a2e5b8d…" },
      { key: "encryptedNote", value: "0x04f8c1a2e5b9d3f6a1c4e7b0d2f5a8c3…" },
    ],
  },
];

const PROOF = {
  protocol: "groth16",
  curve:    "bn128",
  pi_a:     ["0x1f3a9c2e8b4d7f1a5e9c2b4d8f3a7e2c", "0x8b4d7f1a5e9c2b4d8f3a7e2c1f3a9c2e"],
  pi_b:     [["0x4d8f3a7e2c1f3a9c2e8b4d7f1a5e9c2b", "0x9c2b4d8f3a7e2c1f3a9c2e8b4d7f1a5e"],
             ["0x7e2c1f3a9c2e8b4d7f1a5e9c2b4d8f3a", "0x5e9c2b4d8f3a7e2c1f3a9c2e8b4d7f1a"]],
  pi_c:     ["0x3a9c2e8b4d7f1a5e9c2b4d8f3a7e2c1f", "0x1a5e9c2b4d8f3a7e2c1f3a9c2e8b4d7f"],
  publicSignals: ["0x2c7e5f8a1d4b9e3c7f2a5d8b1e4c9f3a", "0x9d1f4a2e8c3b7d6f1a5e9c2b4d8f3a7e"],
  verified: true,
};

/* ── Copy-able hex value ── */
function CopyHex({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    }).catch(() => {});
  }, [value]);

  return (
    <span
      className={`hex-copyable${copied ? " copied" : ""}`}
      onClick={handleCopy}
      title={copied ? "Copied!" : "Click to copy"}
      style={{
        fontFamily: "var(--font-mono)", fontSize: "0.62rem",
        color: copied ? "rgba(80,220,120,0.9)" : "rgba(228,222,212,0.5)",
        wordBreak: "break-all" as const, cursor: "pointer",
      }}
    >
      {copied ? "✓ copied" : value}
    </span>
  );
}

function Badge({ children, color }: { children: string; color: string }) {
  return (
    <span style={{
      fontFamily: "var(--font-mono)", fontSize: "0.58rem",
      fontWeight: 700, letterSpacing: "0.1em",
      padding: "2px 8px",
      border: `1px solid ${color}33`, color,
      background: `${color}11`, whiteSpace: "nowrap" as const,
    }}>{children}</span>
  );
}

function Label({ children }: { children: string }) {
  return (
    <span style={{
      fontFamily: "var(--font-mono)", fontSize: "0.58rem",
      fontWeight: 700, letterSpacing: "0.12em",
      color: "rgba(255,255,255,0.22)",
      minWidth: 110, paddingTop: 2, flexShrink: 0,
    }}>{children}</span>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 12,
      paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.05)",
      marginBottom: 10, flexWrap: "wrap" as const,
    }}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

/* ── Tab: Transaction ── */
function TabTransaction() {
  return (
    <div style={{ padding: "20px 24px 24px" }}>
      {/* TX hash */}
      <div style={{
        display: "flex", alignItems: "flex-start", gap: 12,
        paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.07)",
        marginBottom: 14, flexWrap: "wrap" as const,
      }}>
        <Label>TX HASH</Label>
        <CopyHex value={TX.hash} />
        <Badge color="#4ead5b">{TX.status}</Badge>
      </div>

      {[
        { label: "BLOCK",     value: TX.block,     special: null },
        { label: "TIMESTAMP", value: TX.timestamp, special: null },
        { label: "FROM",      value: TX.from,      special: "relay" },
        { label: "TO",        value: TX.to,        special: null },
        { label: "METHOD",    value: TX.method,    special: "method" },
        { label: "GAS USED",  value: TX.gasUsed,   special: null },
      ].map(({ label, value, special }) => (
        <Row key={label} label={label}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.62rem",
            color: special === "method"
              ? "rgba(228,180,100,0.8)"
              : special === "relay"
              ? "rgba(160,220,120,0.85)"
              : "rgba(255,255,255,0.55)",
            flex: 1, wordBreak: "break-all" as const,
          }}>{value}</span>
          {special === "relay" && (
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.48rem",
              fontWeight: 700, letterSpacing: "0.1em",
              padding: "2px 6px",
              border: "1px solid rgba(160,220,120,0.2)",
              color: "rgba(160,220,120,0.5)",
              background: "rgba(160,220,120,0.06)",
              whiteSpace: "nowrap" as const,
            }}>PROTOCOL CONTRACT</span>
          )}
        </Row>
      ))}

      {/* Privacy callout */}
      <div style={{
        marginTop: 16,
        padding: "14px 16px",
        border: "1px solid rgba(78,168,224,0.2)",
        background: "rgba(78,168,224,0.05)",
        display: "flex", alignItems: "flex-start", gap: 12,
      }}>
        <span style={{ fontSize: "0.75rem", flexShrink: 0, marginTop: 1 }}>🔒</span>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "0.58rem",
          lineHeight: 1.7, color: "rgba(78,168,224,0.7)",
          letterSpacing: "0.04em",
        }}>
          SENDER ADDRESS HIDDEN · RECEIVER ADDRESS HIDDEN · AMOUNT HIDDEN · ZK PROOF VERIFIED ON-CHAIN
        </p>
      </div>
    </div>
  );
}

/* ── Tab: Event Logs ── */
function TabLogs() {
  return (
    <div style={{ padding: "20px 24px 24px" }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: "0.58rem",
        fontWeight: 700, letterSpacing: "0.14em",
        color: "rgba(255,255,255,0.22)", marginBottom: 16,
      }}>EVENT LOGS ({LOGS.length})</div>

      <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
        {LOGS.map(log => (
          <div key={log.index} style={{
            border: `1px solid ${log.color}22`,
            background: `${log.color}09`,
            padding: "13px 16px", borderRadius: 2,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.22)" }}>
                [{log.index}]
              </span>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "0.68rem",
                fontWeight: 700, color: log.color, letterSpacing: "0.06em",
              }}>{log.event}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", color: "rgba(255,255,255,0.18)" }}>
                eUSDT
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 7 }}>
              {log.fields.map(f => (
                <div key={f.key} style={{ display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" as const }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.58rem",
                    fontWeight: 700, letterSpacing: "0.08em",
                    color: "rgba(255,255,255,0.28)", minWidth: 110, paddingTop: 1,
                  }}>{f.key}</span>
                  <CopyHex value={f.value} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Tab: Privacy Proof ── */
function TabProof() {
  return (
    <div style={{ padding: "20px 24px 24px" }}>
      {/* Verified banner */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "12px 16px", marginBottom: 20,
        background: "rgba(78,173,91,0.08)",
        border: "1px solid rgba(78,173,91,0.25)",
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: "#4ead5b", boxShadow: "0 0 8px #4ead5b",
        }} />
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "0.62rem",
          fontWeight: 700, letterSpacing: "0.1em",
          color: "rgba(78,173,91,0.9)",
        }}>ZK PROOF VERIFIED ON-CHAIN · GROTH16 · BN128</span>
      </div>

      {/* Proof fields */}
      {[
        { label: "PROTOCOL", value: PROOF.protocol.toUpperCase() },
        { label: "CURVE",    value: PROOF.curve.toUpperCase() },
        { label: "π_A",      value: PROOF.pi_a[0] },
        { label: "π_B[0]",   value: PROOF.pi_b[0][0] },
        { label: "π_C",      value: PROOF.pi_c[0] },
      ].map(({ label, value }) => (
        <Row key={label} label={label}>
          <CopyHex value={value} />
        </Row>
      ))}

      {/* Public signals */}
      <div style={{ marginTop: 16 }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "0.58rem",
          fontWeight: 700, letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.22)", marginBottom: 10,
        }}>PUBLIC SIGNALS</div>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 6 }}>
          {PROOF.publicSignals.map((sig, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "0.55rem",
                color: "rgba(255,255,255,0.2)", minWidth: 24,
              }}>[{i}]</span>
              <CopyHex value={sig} />
            </div>
          ))}
        </div>
      </div>

      {/* What this means */}
      <div style={{
        marginTop: 20, padding: "14px 16px",
        border: "1px solid rgba(228,222,212,0.1)",
        background: "rgba(228,222,212,0.03)",
      }}>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "0.58rem",
          lineHeight: 1.75, color: "rgba(228,222,212,0.4)",
          letterSpacing: "0.04em",
        }}>
          THIS PROOF CONFIRMS A VALID SPEND WITHOUT REVEALING THE SENDER, RECEIVER, OR AMOUNT.
          THE NULLIFIER PREVENTS DOUBLE-SPENDING. THE COMMITMENT PROVES NOTE OWNERSHIP.
          NOTHING ELSE IS DISCLOSED.
        </p>
      </div>
    </div>
  );
}

/* ── Explorer card with tabs ── */
function ExplorerCard() {
  const [tab, setTab] = useState<"tx" | "logs" | "proof">("tx");

  const TABS: { id: "tx" | "logs" | "proof"; label: string }[] = [
    { id: "tx",    label: "Transaction" },
    { id: "logs",  label: "Event Logs" },
    { id: "proof", label: "ZK Proof" },
  ];

  return (
    <div style={{ background: "#0d0d0d", overflow: "hidden", borderRadius: 2 }}>

      {/* Browser chrome */}
      <div style={{
        background: "#1a1a1a",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "10px 16px",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        {["#e05a4e","#e0b84e","#4ead5b"].map(c => (
          <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.75 }} />
        ))}
        <div style={{
          flex: 1, marginLeft: 8,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 4, padding: "4px 12px",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
            <rect x="2" y="5" width="8" height="6" rx="1" stroke="rgba(100,220,100,0.6)" strokeWidth="1.2"/>
            <path d="M4 5V3.5a2 2 0 014 0V5" stroke="rgba(100,220,100,0.6)" strokeWidth="1.2"/>
          </svg>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.55rem",
            color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em",
          }}>
            explorer.network / tx / 0x8f3a…b5
          </span>
          <span style={{
            marginLeft: "auto",
            fontFamily: "var(--font-mono)", fontSize: "0.48rem",
            fontWeight: 700, letterSpacing: "0.1em",
            padding: "1px 6px",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.25)",
          }}>Flare · ETH · Base</span>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{
        display: "flex",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "#111",
      }}>
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                fontWeight: 700, letterSpacing: "0.1em",
                padding: "10px 20px",
                background: active ? "#0d0d0d" : "transparent",
                border: "none",
                borderBottom: active ? "2px solid rgba(78,168,224,0.7)" : "2px solid transparent",
                color: active ? "rgba(78,168,224,0.9)" : "rgba(255,255,255,0.3)",
                cursor: "pointer",
                transition: "color 0.15s, background 0.15s",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {tab === "tx"    && <TabTransaction />}
      {tab === "logs"  && <TabLogs />}
      {tab === "proof" && <TabProof />}
    </div>
  );
}

/* ── Desktop monitor shell (3D tilted) ── */
function Monitor({ children }: { children: React.ReactNode }) {
  return (
    <div className="monitor-3d-wrap" style={{ width: "100%" }}>
      <div className="monitor-3d" style={{ display: "flex", flexDirection: "column" as const, alignItems: "center" }}>
        <div style={{
          width: "100%", maxWidth: 800,
          background: "#1c1c1e",
          border: "2px solid #2a2a2c",
          borderRadius: 12, padding: 10,
          boxShadow: "0 48px 96px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)",
        }}>
          <div style={{
            display: "flex", justifyContent: "center", alignItems: "center",
            height: 20, marginBottom: 8, gap: 8,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#2e2e30", border: "1px solid #3a3a3c" }} />
            <div style={{ width: 3, height: 3, borderRadius: "50%", background: "#4ead5b", boxShadow: "0 0 5px #4ead5b", opacity: 0.8 }} />
          </div>
          <div style={{
            borderRadius: 6, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)",
          }}>
            {children}
          </div>
        </div>
        <div style={{
          width: 64, height: 30,
          background: "linear-gradient(to bottom, #1c1c1e, #252528)",
          borderLeft: "1px solid #2a2a2c", borderRight: "1px solid #2a2a2c",
        }} />
        <div style={{
          width: 200, height: 14,
          background: "#1c1c1e", border: "1px solid #2a2a2c",
          borderRadius: "0 0 10px 10px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
        }} />
      </div>
    </div>
  );
}

/* ── Main section ── */
export default function ExplorerPreview() {
  return (
    <section
      id="explorer"
      style={{ background: "var(--ink)", padding: "80px 0", overflow: "hidden" }}
    >
      {/* Section label */}
      <div style={{
        display: "flex", alignItems: "center",
        padding: "10px 32px",
        borderTop: "1px solid rgba(228,222,212,0.12)",
        borderBottom: "1px solid rgba(228,222,212,0.12)",
        marginBottom: 64,
      }}>
        <div style={{ flex: 1, height: 1, background: "rgba(228,222,212,0.08)" }} />
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "0.68rem",
          fontWeight: 700, letterSpacing: "0.2em",
          padding: "0 20px", color: "rgba(228,222,212,0.35)",
        }}>WHAT IT LOOKS LIKE ON CHAIN</span>
        <div style={{ flex: 1, height: 1, background: "rgba(228,222,212,0.08)" }} />
      </div>

      <div className="section-inner">

        {/* Headline */}
        <div style={{ marginBottom: 56, maxWidth: 560 }}>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.02em",
            color: "var(--white)",
          }}>
            No sender.
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 700, color: "rgba(228,222,212,0.5)" }}>
              No receiver. Just proof.
            </em>
          </h2>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 20, flexWrap: "wrap" as const }}>
            {["Flare", "Ethereum", "Base"].map(chain => (
              <span key={chain} style={{
                fontFamily: "var(--font-mono)", fontSize: "0.58rem",
                fontWeight: 700, letterSpacing: "0.1em",
                padding: "4px 12px",
                border: "1px solid rgba(78,173,91,0.3)",
                color: "rgba(78,173,91,0.8)",
                background: "rgba(78,173,91,0.06)",
                display: "inline-flex", alignItems: "center", gap: 6,
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ead5b", display: "inline-block", boxShadow: "0 0 5px #4ead5b" }} />
                {chain}
              </span>
            ))}
          </div>
        </div>

        {/* 3D tilted monitor */}
        <Monitor>
          <ExplorerCard />
        </Monitor>

        {/* Caption */}
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "0.55rem",
          color: "rgba(228,222,212,0.15)", letterSpacing: "0.08em",
          marginTop: 28, textAlign: "center" as const,
        }}>
          ILLUSTRATIVE EXAMPLE · REAL TRANSACTIONS LOOK EXACTLY LIKE THIS · NO SENDER · NO RECEIVER · NEVER
        </p>

      </div>
    </section>
  );
}
