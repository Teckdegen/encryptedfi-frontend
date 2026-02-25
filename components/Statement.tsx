export default function Statement() {
  return (
    <>
      {/* ── Dark band ── */}
      <div style={{
        background: "var(--ink)",
        borderTop: "var(--border)",
        borderBottom: "var(--border)",
        padding: "80px 32px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Ghost mark */}
        <div style={{
          position: "absolute",
          right: -20,
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: "clamp(6rem, 20vw, 16rem)",
          lineHeight: 1,
          color: "var(--cream)",
          opacity: 0.025,
          letterSpacing: "-0.04em",
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}>{"{?}"}</div>

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.2em",
            fontWeight: 700,
            color: "rgba(231,226,217,0.3)",
            marginBottom: 24,
          }}>THE PROBLEM</p>

          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.8rem, 5vw, 4rem)",
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: "-0.025em",
            color: "var(--white)",
            marginBottom: 32,
            maxWidth: 800,
          }}>
            Every transfer you send on a public chain<br className="hide-mobile" />
            is{" "}
            <em style={{ fontStyle: "italic", color: "rgba(231,226,217,0.45)" }}>
              visible to everyone.
            </em>{" "}
            Forever.
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 40, height: 3, background: "rgba(231,226,217,0.2)" }} />
            <span style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              fontWeight: 700,
              color: "rgba(231,226,217,0.5)",
            }}>Until now.</span>
          </div>
        </div>
      </div>

      {/* ── WRAP / TRANSACT / UNWRAP ── */}
      <div className="how-grid" style={{ borderBottom: "var(--border)", background: "var(--white)" }}>
        {[
          {
            step: "01",
            verb: "WRAP",
            headline: "Any token becomes confidential.",
            sub: "Deposit any token. Receive a 1:1 confidential counterpart backed by the vault. Supported on any public chain.",
            pill: { from: "100 TOKEN", to: "100 cTOKEN" },
            dark: false,
          },
          {
            step: "02",
            verb: "TRANSACT",
            headline: "Send privately. Nothing leaks.",
            sub: "Transfer, approve, delegate. Every operation is proven by a ZK proof. Amounts and addresses stay hidden.",
            pill: { from: "▓▓▓ cTOKEN", to: "▓▓▓ cTOKEN" },
            dark: true,
          },
          {
            step: "03",
            verb: "UNWRAP",
            headline: "Back to your token. Anytime.",
            sub: "Burn your confidential tokens. Receive the underlying back. Your exit is as private as your entry.",
            pill: { from: "100 cTOKEN", to: "100 TOKEN" },
            dark: false,
          },
        ].map((s, i) => (
          <div key={s.step} style={{
            background: s.dark ? "var(--ink)" : "var(--white)",
            padding: "52px 40px",
            borderRight: i < 2 ? "var(--border)" : "none",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", right: 16, top: 20,
              fontFamily: "var(--font-serif)", fontWeight: 900,
              fontSize: "6rem", lineHeight: 1,
              color: s.dark ? "var(--cream)" : "var(--ink)",
              opacity: 0.04, userSelect: "none",
            }}>{i + 1}</div>

            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "0.58rem",
              letterSpacing: "0.16em", fontWeight: 700,
              color: s.dark ? "rgba(231,226,217,0.3)" : "rgba(10,10,10,0.3)",
              marginBottom: 14,
            }}>{s.step}</div>

            <div style={{
              fontFamily: "var(--font-mono)", fontWeight: 700,
              fontSize: "clamp(1.2rem, 3vw, 1.6rem)", letterSpacing: "0.04em",
              color: s.dark ? "var(--white)" : "var(--ink)", marginBottom: 14,
            }}>{s.verb}</div>

            <h3 style={{
              fontFamily: "var(--font-serif)", fontWeight: 900,
              fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.25,
              color: s.dark ? "var(--white)" : "var(--ink)", marginBottom: 12,
            }}>{s.headline}</h3>

            <p style={{
              fontFamily: "var(--font-sans)", fontSize: "0.85rem",
              lineHeight: 1.7,
              color: s.dark ? "rgba(231,226,217,0.5)" : "var(--ink-soft)",
              marginBottom: 28,
            }}>{s.sub}</p>

            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.72rem",
              letterSpacing: "0.06em",
              border: `2px solid ${s.dark ? "rgba(231,226,217,0.15)" : "var(--ink)"}`,
              padding: "8px 14px",
              background: s.dark ? "rgba(231,226,217,0.05)" : "var(--cream)",
              color: s.dark ? "rgba(231,226,217,0.6)" : "var(--ink)",
            }}>
              <span>{s.pill.from}</span>
              <span style={{ opacity: 0.35 }}>→</span>
              <span>{s.pill.to}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
