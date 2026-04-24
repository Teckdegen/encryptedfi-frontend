"use client";

/* ─── Data ──────────────────────────────────────────────── */
const COLS = [
  { label: "EncryptedFi",   accent: true  },
  { label: "Tornado Cash",  accent: false },
  { label: "Aztec",         accent: false },
  { label: "Raw Chain",     accent: false },
];

type Cell = true | false | string;

const ROWS: { feature: string; cells: Cell[] }[] = [
  { feature: "Any ERC-20 token",         cells: [true,   false,  false,  true]  },
  { feature: "Private balances",         cells: [true,   true,   true,   false] },
  { feature: "Private sender",           cells: [true,   true,   true,   false] },
  { feature: "Private receiver",         cells: [true,   true,   true,   false] },
  { feature: "DeFi composability",       cells: [true,   false,  "Soon", false] },
  { feature: "Yield while private",      cells: [true,   false,  false,  false] },
  { feature: "Private swaps",            cells: [true,   false,  "Soon", false] },
  { feature: "Private LP positions",     cells: [true,   false,  false,  false] },
  { feature: "Private governance votes", cells: [true,   false,  "Partial", false] },
  { feature: "Non-custodial",            cells: [true,   true,   true,   true]  },
  { feature: "No admin / backdoors",     cells: [true,   true,   true,   "—"]   },
  { feature: "Relayer anonymity",        cells: [true,   true,   "Partial", false] },
  { feature: "Multichain (any EVM)",     cells: [true,   false,  false,  true]  },
  { feature: "TEE every operation",      cells: [true,   true,   true,   false] },
  { feature: "Open source",             cells: [true,   true,   true,   "—"]   },
];

/* ─── Cell renderer ─────────────────────────────────────── */
function CellValue({ val, accent }: { val: Cell; accent: boolean }) {
  if (val === true) {
    return (
      <span style={{
        display:        "inline-flex",
        alignItems:     "center",
        justifyContent: "center",
        width:          22,
        height:         22,
        borderRadius:   "50%",
        background:     accent ? "var(--ink)" : "rgba(10,10,10,0.08)",
        color:          accent ? "var(--white)" : "rgba(10,10,10,0.55)",
        fontSize:       "0.7rem",
        fontWeight:     700,
      }}>✓</span>
    );
  }
  if (val === false) {
    return (
      <span style={{
        display:        "inline-flex",
        alignItems:     "center",
        justifyContent: "center",
        width:          22,
        height:         22,
        borderRadius:   "50%",
        background:     "transparent",
        color:          "rgba(10,10,10,0.2)",
        fontSize:       "0.9rem",
        fontWeight:     400,
      }}>✕</span>
    );
  }
  /* String value (e.g. "Soon", "Partial", "—") */
  return (
    <span style={{
      fontFamily:    "var(--font-mono)",
      fontSize:      "0.6rem",
      fontWeight:    700,
      letterSpacing: "0.06em",
      color:         "rgba(10,10,10,0.38)",
    }}>{val}</span>
  );
}

/* ─── Component ─────────────────────────────────────────── */
export default function CompareTable() {
  return (
    <section
      style={{
        background:   "var(--white)",
        borderBottom: "var(--border)",
      }}
    >
      {/* Section rule */}
      <div style={{
        display:      "flex",
        alignItems:   "center",
        padding:      "10px 32px",
        borderBottom: "var(--border)",
        background:   "var(--ink)",
      }}>
        <div style={{ flex: 1, height: 1, background: "rgba(228,222,212,0.2)" }} />
        <span style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.65rem",
          fontWeight:    700,
          letterSpacing: "0.2em",
          padding:       "0 20px",
          color:         "var(--cream)",
        }}>
          HOW WE COMPARE
        </span>
        <div style={{ flex: 1, height: 1, background: "rgba(228,222,212,0.2)" }} />
      </div>

      <div className="section-inner" style={{ paddingTop: 60, paddingBottom: 72 }}>

        {/* Headline */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{
            fontFamily:    "var(--font-serif)",
            fontSize:      "clamp(2rem, 4vw, 3.2rem)",
            fontWeight:    900,
            lineHeight:    1.0,
            letterSpacing: "-0.025em",
            marginBottom:  12,
          }}>
            Nothing else does<br />
            <em style={{ fontStyle: "italic", fontWeight: 700 }}>what we do.</em>
          </h2>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize:   "clamp(0.9rem, 1.8vw, 1.05rem)",
            color:      "var(--ink-soft)",
            maxWidth:   560,
            lineHeight: 1.7,
          }}>
            Full DeFi composability with real privacy — not just mixer deposits.
          </p>
        </div>

        {/* Scrollable table wrapper */}
        <div style={{
          overflowX: "auto",
          border:    "var(--border)",
          boxShadow: "var(--shadow-lg)",
        }}>
          <table className="compare-table" style={{ minWidth: 580 }}>
            <thead>
              <tr>
                {/* Feature column header */}
                <th style={{
                  background:    "var(--ink)",
                  color:         "rgba(231,226,217,0.4)",
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.58rem",
                  fontWeight:    700,
                  letterSpacing: "0.14em",
                  padding:       "14px 20px",
                  borderBottom:  "var(--border)",
                  borderRight:   "var(--border)",
                  width:         "32%",
                }}>
                  FEATURE
                </th>

                {COLS.map((col, ci) => (
                  <th
                    key={ci}
                    style={{
                      background:    col.accent ? "var(--ink)" : "var(--cream)",
                      color:         col.accent ? "var(--white)" : "rgba(10,10,10,0.55)",
                      fontFamily:    "var(--font-mono)",
                      fontSize:      "0.65rem",
                      fontWeight:    700,
                      letterSpacing: "0.1em",
                      padding:       "14px 18px",
                      borderBottom:  "var(--border)",
                      borderRight:   ci < COLS.length - 1 ? "1px solid rgba(10,10,10,0.1)" : "none",
                      textAlign:     "center",
                      position:      "relative",
                    }}
                  >
                    {col.accent && (
                      <span style={{
                        display:       "block",
                        fontSize:      "0.5rem",
                        letterSpacing: "0.18em",
                        color:         "rgba(231,226,217,0.4)",
                        marginBottom:  3,
                      }}>▶ US</span>
                    )}
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {ROWS.map((row, ri) => (
                <tr key={ri}>
                  {/* Feature name */}
                  <td style={{
                    fontFamily:  "var(--font-sans)",
                    fontSize:    "0.82rem",
                    fontWeight:  500,
                    color:       "var(--ink)",
                    padding:     "12px 20px",
                    borderRight: "var(--border)",
                    background:  ri % 2 === 0 ? "var(--white)" : "var(--cream)",
                  }}>
                    {row.feature}
                  </td>

                  {row.cells.map((cell, ci) => (
                    <td
                      key={ci}
                      style={{
                        background:  COLS[ci].accent
                          ? ri % 2 === 0 ? "rgba(10,10,10,0.03)" : "rgba(10,10,10,0.05)"
                          : ri % 2 === 0 ? "var(--white)" : "var(--cream)",
                        borderRight: ci < COLS.length - 1 ? "1px solid rgba(10,10,10,0.07)" : "none",
                        padding:     "12px 18px",
                      }}
                    >
                      <CellValue val={cell} accent={COLS[ci].accent} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footnote */}
        <p style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.58rem",
          letterSpacing: "0.1em",
          color:         "rgba(10,10,10,0.3)",
          marginTop:     16,
        }}>
          * COMPARISON BASED ON PUBLICLY AVAILABLE DOCUMENTATION AS OF 2026. "SOON" = ROADMAP ITEMS. NOT FINANCIAL ADVICE.
        </p>
      </div>
    </section>
  );
}
