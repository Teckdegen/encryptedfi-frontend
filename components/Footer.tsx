"use client";

export default function Footer() {
  return (
    <footer style={{ background: "var(--ink)", borderTop: "4px solid var(--cream)" }}>

      {/* Main footer content */}
      <div className="footer-grid" style={{
        maxWidth: 1200,
        margin: "0 auto",
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
          }}>Live on the<br />chains we support.</div>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.8rem",
            lineHeight: 1.65,
            color: "rgba(231,226,217,0.35)",
          }}>
            Encrypted Fi deploys on integrated chains only. As new chains go live, they become available instantly.
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
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "16px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.58rem",
          letterSpacing: "0.12em",
          color: "rgba(231,226,217,0.2)",
        }}>© 2026 ENCRYPTED FI — ALL RIGHTS RESERVED</span>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.58rem",
          letterSpacing: "0.12em",
          color: "rgba(231,226,217,0.2)",
        }}>BUILT WITH ZK-SNARKS</span>
      </div>

    </footer>
  );
}
