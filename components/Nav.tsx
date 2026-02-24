"use client";

export default function Nav() {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, background: "var(--cream)", borderBottom: "var(--border)" }}>

      {/* Top meta strip */}
      <div style={{
        borderBottom: "var(--border-sm)",
        padding: "5px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "var(--white)",
      }}>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {["VOL. I", "ISSUE 001", "EST. 2024"].map((t, i) => (
            <span key={i} style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.16em",
              opacity: 0.4,
            }}>{t}</span>
          ))}
        </div>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.58rem",
          letterSpacing: "0.14em",
          opacity: 0.4,
        }}>
          ENCRYPTED LAYER FOR ERC20s
        </span>
      </div>

      {/* Main bar */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "14px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>

        {/* Brand wordmark */}
        <a href="#" style={{ textDecoration: "none", color: "var(--ink)", display: "flex", alignItems: "center", gap: 14 }}>
          {/* Small inline logo mark */}
          <div style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: "1rem",
            background: "var(--ink)",
            color: "var(--cream)",
            padding: "3px 9px",
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
            border: "var(--border)",
            boxShadow: "var(--shadow-sm)",
          }}>
            <span style={{ opacity: 0.4 }}>{"{"}</span>
            <span style={{ color: "var(--white)" }}>?</span>
            <span style={{ opacity: 0.4 }}>{"}"}</span>
          </div>
          <span style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 900,
            fontSize: "1.15rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase" as const,
          }}>
            ENCRYPTED<span style={{ background: "var(--ink)", color: "var(--white)", padding: "1px 6px", marginLeft: 3 }}>FI</span>
          </span>
        </a>

        {/* Nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {[
            { label: "Use Cases", href: "#usecases" },
            { label: "Cryptography", href: "#technology" },
          ].map((l) => (
            <a key={l.href} href={l.href} style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "0.75rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              textDecoration: "none",
              color: "var(--ink)",
              padding: "7px 14px",
              opacity: 0.6,
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.6")}
            >
              {l.label}
            </a>
          ))}
          <a href="#" style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textDecoration: "none",
            color: "var(--white)",
            background: "var(--ink)",
            padding: "8px 18px",
            border: "var(--border)",
            boxShadow: "var(--shadow-sm)",
            transition: "transform 0.1s, box-shadow 0.1s",
            marginLeft: 8,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "5px 5px 0 var(--ink)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = "";
            (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
          }}
          >
            GET ACCESS
          </a>
        </nav>
      </div>

      {/* Ticker */}
      <div style={{ background: "var(--ink)", overflow: "hidden", padding: "5px 0", borderTop: "var(--border)" }}>
        <div style={{
          display: "inline-flex",
          gap: 40,
          whiteSpace: "nowrap",
          animation: "ticker 22s linear infinite",
          fontFamily: "var(--font-mono)",
          fontSize: "0.58rem",
          letterSpacing: "0.16em",
          color: "var(--cream)",
        }}>
          {Array.from({ length: 2 }).flatMap(() => [
            "PRIVATE ERC20 TRANSFERS", "◆",
            "ZK-SNARK VERIFIED", "◆",
            "ZERO TRUST REQUIRED", "◆",
            "ENCRYPTED BALANCES", "◆",
            "CONFIDENTIAL ON-CHAIN", "◆",
            "GROTH16 / BN254", "◆",
          ]).map((t, i) => (
            <span key={i} style={{ opacity: t === "◆" ? 0.3 : 1 }}>{t}</span>
          ))}
        </div>
      </div>

    </header>
  );
}
