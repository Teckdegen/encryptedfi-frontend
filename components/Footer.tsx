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

        {/* Brand column */}
        <div style={{ borderRight: "2px solid rgba(231,226,217,0.08)", paddingRight: 40 }}>
          {/* Logo mark */}
          <div style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: "1.6rem",
            background: "var(--cream)",
            color: "var(--ink)",
            padding: "6px 14px",
            width: "fit-content",
            letterSpacing: "-0.02em",
            border: "var(--border-sm)",
            marginBottom: 20,
          }}>
            <span style={{ opacity: 0.4 }}>{"{"}</span>
            <span>?</span>
            <span style={{ opacity: 0.4 }}>{"}"}</span>
          </div>
          <div style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 900,
            fontSize: "1.1rem",
            letterSpacing: "0.06em",
            color: "var(--white)",
            marginBottom: 8,
          }}>ENCRYPTED FI</div>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            color: "rgba(231,226,217,0.3)",
            lineHeight: 1.6,
          }}>ENCRYPTED LAYER<br />FOR PUBLIC CHAINS</div>
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
            "We bring privacy to public chains. No trust. No tradeoffs. Proven on-chain."
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
