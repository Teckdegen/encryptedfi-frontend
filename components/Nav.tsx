"use client";

import Logo from "./Logo";

export default function Nav() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "var(--white)",
        borderBottom: "var(--border)",
      }}
    >
      {/* Main nav bar */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "12px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        {/* Brand */}
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
            color: "var(--ink)",
          }}
        >
          <Logo size="sm" />
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 900,
              fontSize: "1.05rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
            }}
          >
            ENCRYPTED
            <span
              style={{
                background: "var(--ink)",
                color: "var(--white)",
                padding: "0 5px",
                marginLeft: 2,
              }}
            >
              FI
            </span>
          </span>
        </a>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.14em",
              opacity: 0.45,
              marginRight: 8,
              display: "var(--hide-sm, flex)" as "flex",
            }}
          >
            ENCRYPTED LAYER FOR ERC20s
          </span>
          <a
            href="#usecases"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "0.78rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              textDecoration: "none",
              color: "var(--ink)",
              padding: "8px 16px",
              border: "var(--border)",
            }}
          >
            Use Cases
          </a>
          <a
            href="#technology"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "0.78rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              textDecoration: "none",
              color: "var(--white)",
              background: "var(--ink)",
              padding: "8px 18px",
              border: "var(--border)",
              boxShadow: "var(--shadow-sm)",
              transition: "transform 0.1s, box-shadow 0.1s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translate(-2px,-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "5px 5px 0 var(--ink)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "var(--shadow-sm)";
            }}
          >
            The Cryptography
          </a>
        </div>
      </div>

      {/* Ticker strip */}
      <div
        style={{
          background: "var(--ink)",
          overflow: "hidden",
          padding: "5px 0",
          borderTop: "var(--border)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            gap: 32,
            whiteSpace: "nowrap",
            animation: "ticker 20s linear infinite",
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.14em",
            color: "var(--cream)",
          }}
        >
          {[
            "PRIVATE ERC20 TRANSFERS",
            "◆",
            "ZK-SNARK VERIFIED",
            "◆",
            "ZERO TRUST REQUIRED",
            "◆",
            "ENCRYPTED BALANCES",
            "◆",
            "CONFIDENTIAL ALLOWANCES",
            "◆",
            "PRIVATE ERC20 TRANSFERS",
            "◆",
            "ZK-SNARK VERIFIED",
            "◆",
            "ZERO TRUST REQUIRED",
            "◆",
            "ENCRYPTED BALANCES",
            "◆",
            "CONFIDENTIAL ALLOWANCES",
            "◆",
          ].map((t, i) => (
            <span key={i} style={{ opacity: t === "◆" ? 0.35 : 1 }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
