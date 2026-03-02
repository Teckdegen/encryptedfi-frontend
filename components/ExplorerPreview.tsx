"use client";

/* ─────────────────────────────────────────────────────────
   ExplorerPreview.tsx
   Shows what a confidential transfer looks like when you
   look it up on a block explorer.
   With the relayer layer: NEITHER sender NOR receiver visible.
───────────────────────────────────────────────────────── */

const TX = {
  hash:      "0x8f3a2c1d9e4b7f06a3e5d2c8b1f9a4e7d0c3b6a2f5e8d1c4b7a0e3d6c9f2b5",
  block:     "21,847,392",
  timestamp: "2 mins ago",
  from:      "ENCRYPTEDFI",
  to:        "eUSDT",
  method:    "relayTransfer()",
  status:    "SUCCESS",
  gasUsed:   "312,844",
};

const LOGS = [
  {
    index:   "0",
    event:   "NoteSpent",
    color:   "#e05a4e",
    fields: [
      { key: "nullifier", value: "0x9d1f4a2e8c3b7d6f1a5e9c2b4d8f3a7e…", full: true },
      { key: "timestamp", value: "1740921847" },
    ],
  },
  {
    index:   "1",
    event:   "NoteCreated",
    color:   "#4ea8e0",
    fields: [
      { key: "commitment",    value: "0x2c7e5f8a1d4b9e3c7f2a5d8b1e4c9f3a…", full: true },
      { key: "encryptedNote", value: "0x04a3b2f1c8e5d9a2f4b7e1c6d3a8f2b5e9c1d4a7f0b3e6c9d2a5f8b1e4c7d0a…", full: true },
      { key: "timestamp",     value: "1740921847" },
    ],
  },
  {
    index:   "2",
    event:   "NoteCreated",
    color:   "#4ea8e0",
    fields: [
      { key: "commitment",    value: "0x7b3a9e2d5c8f1a4e7b0d3c6f9a2e5b8d…", full: true },
      { key: "encryptedNote", value: "0x04f8c1a2e5b9d3f6a1c4e7b0d2f5a8c3e6b9d1f4a7c0e3b6d9a2f5c8e1b4d7…", full: true },
      { key: "timestamp",     value: "1740921847" },
    ],
  },
];

/* tiny mono badge */
function Badge({ children, color }: { children: string; color: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.58rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        padding: "2px 8px",
        border: `1px solid ${color}33`,
        color,
        background: `${color}11`,
        whiteSpace: "nowrap" as const,
      }}
    >
      {children}
    </span>
  );
}

/* truncate a long hex string */
function Hex({ value, full = false }: { value: string; full?: boolean }) {
  const display = full
    ? value.length > 36
      ? value.slice(0, 18) + "…" + value.slice(-6)
      : value
    : value;
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.62rem",
        color: "rgba(228,222,212,0.55)",
        wordBreak: "break-all" as const,
      }}
    >
      {display}
    </span>
  );
}

export default function ExplorerPreview() {
  return (
    <section
      id="explorer"
      style={{ background: "var(--ink)", padding: "80px 0", overflow: "hidden" }}
    >
      {/* Section label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 32px",
          borderTop: "1px solid rgba(228,222,212,0.12)",
          borderBottom: "1px solid rgba(228,222,212,0.12)",
          marginBottom: 64,
        }}
      >
        <div style={{ flex: 1, height: 1, background: "rgba(228,222,212,0.08)" }} />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            padding: "0 20px",
            color: "rgba(228,222,212,0.35)",
          }}
        >
          WHAT IT LOOKS LIKE ON-CHAIN
        </span>
        <div style={{ flex: 1, height: 1, background: "rgba(228,222,212,0.08)" }} />
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* Intro */}
        <div style={{ marginBottom: 48, maxWidth: 560 }}>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--white)",
              marginBottom: 14,
            }}
          >
            No sender.
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 700, color: "rgba(228,222,212,0.5)" }}>
              No receiver. Just proof.
            </em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9rem",
              lineHeight: 1.75,
              color: "rgba(228,222,212,0.45)",
              maxWidth: 480,
            }}
          >
            Open any block explorer. You see the protocol contract and encrypted blobs.
            The sender is{" "}
            <strong style={{ color: "rgba(228,222,212,0.7)" }}>never your wallet</strong>{" "}
            — it shows ENCRYPTEDFI. The receiver address is{" "}
            <strong style={{ color: "rgba(228,222,212,0.7)" }}>never on-chain</strong>{" "}
            — not in the transaction, not in the events. Not anywhere.
          </p>
        </div>

        {/* ── Explorer card ── */}
        <div
          style={{
            border: "1px solid rgba(228,222,212,0.10)",
            background: "rgba(228,222,212,0.03)",
            overflow: "hidden",
          }}
        >

          {/* Card header bar */}
          <div
            style={{
              background: "rgba(228,222,212,0.05)",
              borderBottom: "1px solid rgba(228,222,212,0.08)",
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* traffic lights */}
            {["#e05a4e", "#e0b84e", "#4ead5b"].map((c) => (
              <div
                key={c}
                style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }}
              />
            ))}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "rgba(228,222,212,0.25)",
                letterSpacing: "0.08em",
                marginLeft: 6,
              }}
            >
              explorer.network / tx / 0x8f3a…b5
            </span>
            {/* Network badge */}
            <span
              style={{
                marginLeft: "auto",
                fontFamily: "var(--font-mono)",
                fontSize: "0.52rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                padding: "2px 7px",
                border: "1px solid rgba(228,222,212,0.1)",
                color: "rgba(228,222,212,0.3)",
                background: "rgba(228,222,212,0.03)",
              }}
            >
              ANY EVM CHAIN
            </span>
          </div>

          {/* TX overview */}
          <div style={{ padding: "28px 28px 0" }}>

            {/* Hash row */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                paddingBottom: 16,
                borderBottom: "1px solid rgba(228,222,212,0.07)",
                marginBottom: 16,
                flexWrap: "wrap" as const,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "rgba(228,222,212,0.25)",
                  minWidth: 100,
                  paddingTop: 2,
                }}
              >
                TX HASH
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "rgba(100,160,255,0.8)",
                  wordBreak: "break-all" as const,
                  flex: 1,
                }}
              >
                {TX.hash}
              </span>
              <Badge color="#4ead5b">{TX.status}</Badge>
            </div>

            {/* Detail rows */}
            {[
              { label: "BLOCK",      value: TX.block      },
              { label: "TIMESTAMP",  value: TX.timestamp  },
              { label: "FROM",       value: TX.from,       highlight: "relayer" },
              { label: "TO",         value: TX.to         },
              { label: "METHOD",     value: TX.method     },
              { label: "GAS USED",   value: TX.gasUsed    },
            ].map(({ label, value, highlight }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  paddingBottom: 12,
                  borderBottom: "1px solid rgba(228,222,212,0.05)",
                  marginBottom: 12,
                  flexWrap: "wrap" as const,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: "rgba(228,222,212,0.25)",
                    minWidth: 100,
                    paddingTop: 1,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: label === "METHOD"
                      ? "rgba(228,180,100,0.8)"
                      : highlight === "relayer"
                      ? "rgba(160,220,120,0.85)"   // green — protocol contract, not user
                      : "rgba(228,222,212,0.6)",
                    flex: 1,
                    wordBreak: "break-all" as const,
                  }}
                >
                  {value}
                </span>
                {/* Tag the FROM field */}
                {highlight === "relayer" && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.5rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      padding: "2px 6px",
                      border: "1px solid rgba(160,220,120,0.2)",
                      color: "rgba(160,220,120,0.5)",
                      background: "rgba(160,220,120,0.06)",
                      whiteSpace: "nowrap" as const,
                    }}
                  >
                    PROTOCOL CONTRACT
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* ── Privacy callout — BOTH hidden ── */}
          <div
            style={{
              margin: "0 28px 20px",
              padding: "14px 18px",
              border: "1px dashed rgba(228,222,212,0.12)",
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "rgba(228,222,212,0.02)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                lineHeight: 1.6,
                color: "rgba(228,222,212,0.35)",
                margin: 0,
              }}
            >
              Neither the{" "}
              <span style={{ color: "rgba(228,222,212,0.65)", fontWeight: 700 }}>
                sender
              </span>{" "}
              nor the{" "}
              <span style={{ color: "rgba(228,222,212,0.65)", fontWeight: 700 }}>
                receiver
              </span>{" "}
              appear on-chain. Only the ENCRYPTEDFI protocol contract is visible.
              The{" "}
              <span style={{ color: "rgba(228,222,212,0.65)", fontWeight: 700 }}>
                balance
              </span>{" "}
              is fully encrypted. Your wallet never touches the chain.
            </p>
          </div>

          {/* ── Event Logs ── */}
          <div
            style={{
              borderTop: "1px solid rgba(228,222,212,0.08)",
              padding: "20px 28px 28px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "rgba(228,222,212,0.25)",
                marginBottom: 16,
              }}
            >
              EVENT LOGS ({LOGS.length})
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {LOGS.map((log) => (
                <div
                  key={log.index}
                  style={{
                    border: `1px solid ${log.color}22`,
                    background: `${log.color}08`,
                    padding: "16px 18px",
                  }}
                >
                  {/* Log header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 14,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.58rem",
                        color: "rgba(228,222,212,0.25)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      [{log.index}]
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: log.color,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {log.event}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem",
                        color: "rgba(228,222,212,0.2)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      eUSDT
                    </span>
                  </div>

                  {/* Log fields */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {log.fields.map((f) => (
                      <div
                        key={f.key}
                        style={{
                          display: "flex",
                          gap: 12,
                          alignItems: "flex-start",
                          flexWrap: "wrap" as const,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.6rem",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            color: "rgba(228,222,212,0.3)",
                            minWidth: 110,
                            paddingTop: 1,
                          }}
                        >
                          {f.key}
                        </span>
                        <Hex value={f.value} full={f.full ?? false} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer caption */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            color: "rgba(228,222,212,0.2)",
            letterSpacing: "0.08em",
            marginTop: 20,
            textAlign: "center" as const,
          }}
        >
          ILLUSTRATIVE EXAMPLE · REAL TRANSACTIONS LOOK EXACTLY LIKE THIS · NO SENDER · NO RECEIVER · NEVER
        </p>

      </div>
    </section>
  );
}
