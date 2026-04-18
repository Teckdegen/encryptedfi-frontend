"use client";

/* ────────────────────────────────────────────────────────
   Ecosystem.tsx
   Projects building on EncryptedFi — coming soon.
──────────────────────────────────────────────────────── */

const CHAINS = [
  { abbr: "FLR",  bg: "#E22F2F", text: "#FFF", symbol: "✦" },
  { abbr: "ETH",  bg: "#627EEA", text: "#FFF", symbol: "Ξ" },
  { abbr: "BASE", bg: "#0052FF", text: "#FFF", symbol: "⬡" },
];

export default function Ecosystem() {
  return (
    <section
      id="ecosystem"
      style={{ background: "var(--cream)", padding: "80px 0", borderTop: "var(--border)" }}
    >
      {/* Section label */}
      <div style={{
        display: "flex", alignItems: "center",
        padding: "10px 32px",
        borderTop: "var(--border)", borderBottom: "var(--border)",
        marginBottom: 64,
        background: "var(--ink)",
      }}>
        <div style={{ flex: 1, height: 1, background: "rgba(228,222,212,0.2)" }} />
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "0.68rem",
          fontWeight: 700, letterSpacing: "0.2em",
          padding: "0 20px", color: "var(--cream)",
        }}>ECOSYSTEM</span>
        <div style={{ flex: 1, height: 1, background: "rgba(228,222,212,0.2)" }} />
      </div>

      <div className="section-inner">

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between", flexWrap: "wrap" as const,
          gap: 32, marginBottom: 56,
          paddingBottom: 32, borderBottom: "var(--border)",
        }}>
          <div>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.02em",
              marginBottom: 14,
            }}>
              Built on<br />
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>EncryptedFi.</em>
            </h2>
            <p style={{
              fontFamily: "var(--font-sans)", fontSize: "0.95rem",
              lineHeight: 1.75, color: "var(--ink-soft)", maxWidth: 440,
            }}>
              Every DeFi primitive, privately composed. One protocol. Infinite applications.
            </p>
          </div>

          {/* Chain badges */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 8, alignItems: "flex-end" }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.55rem",
              fontWeight: 700, letterSpacing: "0.16em",
              color: "rgba(10,10,10,0.3)", marginBottom: 4,
            }}>LIVE ON</span>
            <div style={{ display: "flex", gap: 8 }}>
              {CHAINS.map((c) => (
                <div key={c.abbr} style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "7px 12px",
                  border: "var(--border)",
                  background: "var(--white)",
                  boxShadow: "var(--shadow-sm)",
                }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 4,
                    background: c.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-mono)", fontWeight: 700,
                    fontSize: "0.65rem", color: c.text,
                    flexShrink: 0,
                  }}>{c.symbol}</div>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontWeight: 700,
                    fontSize: "0.6rem", letterSpacing: "0.06em",
                    color: "var(--ink)",
                  }}>{c.abbr}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Empty state */}
        <div style={{
          border: "var(--border)",
          boxShadow: "var(--shadow-lg)",
          background: "var(--ink)",
          padding: "80px 40px",
          display: "flex",
          flexDirection: "column" as const,
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          textAlign: "center" as const,
          position: "relative" as const,
          overflow: "hidden",
        }}>
          {/* Ghost text */}
          <div style={{
            position: "absolute" as const,
            fontFamily: "var(--font-serif)", fontWeight: 900,
            fontSize: "clamp(5rem, 18vw, 14rem)",
            lineHeight: 1,
            color: "var(--cream)",
            opacity: 0.025,
            letterSpacing: "-0.04em",
            userSelect: "none" as const,
            pointerEvents: "none" as const,
            whiteSpace: "nowrap" as const,
          }}>SOON</div>

          {/* Blinking dot */}
          <div style={{
            width: 10, height: 10, borderRadius: "50%",
            background: "rgba(228,222,212,0.3)",
            animation: "blink 2s ease-in-out infinite",
          }} />

          <p style={{
            fontFamily: "var(--font-mono)", fontSize: "0.62rem",
            fontWeight: 700, letterSpacing: "0.2em",
            color: "rgba(228,222,212,0.3)",
          }}>PROJECTS COMING SOON</p>

          <p style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            fontWeight: 700,
            color: "rgba(228,222,212,0.5)",
            maxWidth: 480,
            lineHeight: 1.5,
          }}>
            Building in silence.
          </p>
        </div>

        {/* Bottom CTA */}
        <div style={{
          marginTop: 24,
          padding: "32px 36px",
          background: "var(--white)",
          border: "var(--border)",
          boxShadow: "var(--shadow)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap" as const,
          gap: 24,
        }}>
          <div>
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: "0.58rem",
              fontWeight: 700, letterSpacing: "0.18em",
              color: "rgba(10,10,10,0.3)", marginBottom: 8,
            }}>BUILD ON ENCRYPTEDFI</p>
            <p style={{
              fontFamily: "var(--font-serif)", fontWeight: 900,
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              color: "var(--ink)", lineHeight: 1.2,
            }}>
              Any ERC-20. Any EVM. One factory call.
            </p>
          </div>
          <a
            href="#"
            style={{
              fontFamily: "var(--font-mono)", fontWeight: 700,
              fontSize: "0.72rem", letterSpacing: "0.1em",
              textDecoration: "none",
              color: "var(--white)",
              background: "var(--ink)",
              padding: "14px 28px",
              border: "var(--border)",
              boxShadow: "var(--shadow)",
              display: "inline-block",
              transition: "transform 0.1s, box-shadow 0.1s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translate(-3px,-3px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "9px 9px 0 var(--ink)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "var(--shadow)";
            }}
          >
            READ THE DOCS →
          </a>
        </div>

      </div>
    </section>
  );
}
