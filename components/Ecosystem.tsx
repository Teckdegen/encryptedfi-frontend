"use client";

/* ────────────────────────────────────────────────────────
   Ecosystem.tsx  —  Projects building on EncryptedFi
──────────────────────────────────────────────────────── */

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

        {/* Header — full width, no right column */}
        <div style={{
          marginBottom: 56,
          paddingBottom: 32,
          borderBottom: "var(--border)",
        }}>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 5vw, 4.5rem)",
            fontWeight: 900, lineHeight: 0.97, letterSpacing: "-0.025em",
            marginBottom: 20,
          }}>
            Built on<br />
            <em style={{ fontStyle: "italic", fontWeight: 700 }}>EncryptedFi.</em>
          </h2>
          <p style={{
            fontFamily: "var(--font-sans)", fontSize: "0.95rem",
            lineHeight: 1.75, color: "var(--ink-soft)", maxWidth: 480,
          }}>
            Every DeFi primitive, privately composed. One protocol. Infinite applications.
          </p>
        </div>

        {/* Empty state — full width dark panel */}
        <div style={{
          border: "var(--border)",
          boxShadow: "var(--shadow-lg)",
          background: "var(--ink)",
          padding: "120px 40px",
          display: "flex",
          flexDirection: "column" as const,
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          textAlign: "center" as const,
          position: "relative" as const,
          overflow: "hidden",
        }}>
          {/* Blinking dot */}
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "rgba(228,222,212,0.25)",
            animation: "blink 2s ease-in-out infinite",
          }} />

          <p style={{
            fontFamily: "var(--font-mono)", fontSize: "0.6rem",
            fontWeight: 700, letterSpacing: "0.22em",
            color: "rgba(228,222,212,0.25)",
          }}>PROJECTS COMING SOON</p>

          <p style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
            fontWeight: 700,
            color: "rgba(228,222,212,0.45)",
            maxWidth: 520,
            lineHeight: 1.4,
          }}>
            Building in silence.
          </p>
        </div>

        {/* Bottom CTA bar */}
        <div style={{
          marginTop: 0,
          padding: "28px 36px",
          background: "var(--white)",
          border: "var(--border)",
          borderTop: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap" as const,
          gap: 24,
        }}>
          <div>
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: "0.55rem",
              fontWeight: 700, letterSpacing: "0.18em",
              color: "rgba(10,10,10,0.28)", marginBottom: 6,
            }}>BUILD ON ENCRYPTEDFI</p>
            <p style={{
              fontFamily: "var(--font-serif)", fontWeight: 900,
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
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
