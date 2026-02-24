import Logo from "./Logo";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--ink)",
        borderTop: "4px solid rgba(228,222,212,0.12)",
        padding: "28px 32px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Logo size="sm" />
          <div>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 900,
                fontSize: "0.95rem",
                letterSpacing: "0.06em",
                color: "var(--white)",
              }}
            >
              ENCRYPTED FI
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.1em",
                color: "rgba(228,222,212,0.35)",
                marginTop: 2,
              }}
            >
              THE ENCRYPTED LAYER FOR ERC20s
            </div>
          </div>
        </div>

        {/* Center */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            letterSpacing: "0.1em",
            color: "rgba(228,222,212,0.25)",
            display: "flex",
            gap: 16,
            alignItems: "center",
          }}
        >
          <span>PRIVATE DEFI INFRASTRUCTURE</span>
          <span style={{ opacity: 0.4 }}>—</span>
          <span>BUILT WITH ZK-SNARKS</span>
          <span style={{ opacity: 0.4 }}>—</span>
          <span>© 2024 ENCRYPTED FI</span>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 20 }}>
          {["Twitter", "GitHub", "Discord"].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textDecoration: "none",
                color: "rgba(228,222,212,0.4)",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--white)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(228,222,212,0.4)")
              }
            >
              {l.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
