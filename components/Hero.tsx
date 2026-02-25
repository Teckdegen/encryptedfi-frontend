"use client";

export default function Hero() {
  return (
    <section style={{ background: "var(--cream)", borderBottom: "var(--border)" }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "80px 32px 88px",
      }}>

        {/* Eyebrow label */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.18em",
          fontWeight: 700,
          background: "var(--ink)",
          color: "var(--cream)",
          padding: "5px 14px",
          marginBottom: 36,
        }}>
          <span style={{
            width: 7, height: 7,
            borderRadius: "50%",
            background: "var(--cream)",
            display: "inline-block",
            animation: "blink 1.8s ease-in-out infinite",
            flexShrink: 0,
          }} />
          ENCRYPTED LAYER FOR PUBLIC CHAINS
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(3rem, 8vw, 7.5rem)",
          fontWeight: 900,
          lineHeight: 0.93,
          letterSpacing: "-0.03em",
          marginBottom: 40,
          animation: "fadeUp 0.55s ease both",
        }}>
          We bring<br />
          <em style={{ fontStyle: "italic", fontWeight: 700 }}>privacy</em><br />
          to public chains.
        </h1>

        {/* Rule */}
        <div style={{
          height: 3,
          background: "var(--ink)",
          width: 56,
          marginBottom: 32,
        }} />

        {/* Sub copy */}
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
          lineHeight: 1.75,
          color: "var(--ink-soft)",
          maxWidth: 580,
          marginBottom: 48,
          animation: "fadeUp 0.55s 0.08s ease both",
        }}>
          Any token. Any public chain. Fully encrypted balances,
          private transfers, and confidential allowances — every
          operation verified on-chain by a ZK proof.{" "}
          <strong style={{ color: "var(--ink)" }}>No trust. No tradeoffs.</strong>
        </p>

        {/* CTAs */}
        <div style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 64,
          animation: "fadeUp 0.55s 0.14s ease both",
        }}>
          <a href="#usecases" style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            textDecoration: "none",
            color: "var(--white)",
            background: "var(--ink)",
            padding: "14px 30px",
            border: "var(--border)",
            boxShadow: "var(--shadow)",
            display: "inline-block",
            transition: "transform 0.1s, box-shadow 0.1s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = "translate(-3px,-3px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "9px 9px 0 var(--ink)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = "";
            (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow)";
          }}>
            SEE USE CASES
          </a>
          <a href="#technology" style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            textDecoration: "none",
            color: "var(--ink)",
            background: "transparent",
            padding: "14px 30px",
            border: "var(--border)",
            boxShadow: "var(--shadow-sm)",
            display: "inline-block",
            transition: "transform 0.1s, box-shadow 0.1s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "5px 5px 0 var(--ink)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = "";
            (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
          }}>
            THE CRYPTOGRAPHY
          </a>
        </div>

        {/* Stat row */}
        <div className="stats-row" style={{ animation: "fadeUp 0.55s 0.2s ease both" }}>
          {[
            { num: "100%", label: "Private Balances" },
            { num: "ZK",   label: "Proof Every Op" },
            { num: "0",    label: "Trust Required" },
            { num: "∞",    label: "Composable" },
          ].map((s, i) => (
            <div key={i} style={{
              padding: "18px 28px",
              background: i === 1 ? "var(--ink)" : i === 3 ? "var(--cream-mid)" : "var(--white)",
              borderRight: "var(--border)",
              textAlign: "center" as const,
              flex: "1 1 auto",
            }}>
              <div style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 900,
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                lineHeight: 1,
                marginBottom: 4,
                color: i === 1 ? "var(--white)" : "var(--ink)",
              }}>{s.num}</div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.14em",
                fontWeight: 700,
                color: i === 1 ? "rgba(231,226,217,0.5)" : "rgba(10,10,10,0.4)",
              }}>{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
