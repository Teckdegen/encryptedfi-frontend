"use client";

export default function Footer() {
  return (
    <footer style={{ background: "var(--ink)", borderTop: "4px solid var(--cream)" }}>

      {/* Main footer content */}
      <div className="footer-grid" style={{
        padding: "56px 40px 40px",
        gap: 0,
        borderBottom: "2px solid rgba(231,226,217,0.08)",
      }}>

        {/* Availability column */}
        <div style={{ borderRight: "2px solid rgba(231,226,217,0.08)", paddingRight: 40 }}>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            letterSpacing: "0.16em",
            color: "rgba(231,226,217,0.25)",
            marginBottom: 20,
          }}>AVAILABILITY</div>
          <div style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 900,
            fontSize: "1.15rem",
            color: "var(--white)",
            lineHeight: 1.25,
            marginBottom: 14,
          }}>Live on Flare,<br />Ethereum &amp; Base.</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {[
              { abbr: "FLR",  bg: "#E22F2F", symbol: "✦" },
              { abbr: "ETH",  bg: "#627EEA", symbol: "Ξ" },
              { abbr: "BASE", bg: "#0052FF", symbol: "⬡" },
            ].map((c) => (
              <div key={c.abbr} style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "4px 10px",
                border: "1px solid rgba(231,226,217,0.12)",
                background: "rgba(231,226,217,0.04)",
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: 3,
                  background: c.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-mono)", fontWeight: 700,
                  fontSize: "0.55rem", color: "#fff",
                }}>{c.symbol}</div>
                <span style={{
                  fontFamily: "var(--font-mono)", fontWeight: 700,
                  fontSize: "0.55rem", letterSpacing: "0.08em",
                  color: "rgba(231,226,217,0.5)",
                }}>{c.abbr}</span>
              </div>
            ))}
          </div>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.8rem",
            lineHeight: 1.65,
            color: "rgba(231,226,217,0.35)",
          }}>
            More EVM chains coming. Any ERC-20 becomes private with one factory call.
          </p>
        </div>

        {/* Tagline column */}
        <div style={{
          borderRight: "2px solid rgba(231,226,217,0.08)",
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
        }}>
          <p style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "1.05rem",
            lineHeight: 1.6,
            color: "rgba(231,226,217,0.4)",
          }}>
            "We bring privacy to the tokens you already use. No new chains, no trusted parties, no compromises."
          </p>
        </div>

        {/* Links column */}
        <div style={{ paddingLeft: 40, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            letterSpacing: "0.16em",
            color: "rgba(231,226,217,0.25)",
            marginBottom: 16,
          }}>LINKS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["Twitter", "GitHub", "Discord"].map((l) => (
              <a key={l} href="#" style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "0.85rem",
                textDecoration: "none",
                color: "rgba(231,226,217,0.4)",
                transition: "color 0.15s",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--white)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(231,226,217,0.4)")}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="footer-strip">
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.58rem",
          letterSpacing: "0.12em",
          color: "rgba(231,226,217,0.2)",
        }}>© 2026 ENCRYPTED FI. ALL RIGHTS RESERVED</span>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.58rem",
          letterSpacing: "0.12em",
          color: "rgba(231,226,217,0.2)",
        }}>BUILT WITH ZK SNARKS</span>
      </div>

    </footer>
  );
}
