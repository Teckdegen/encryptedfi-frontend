export default function Statement() {
  return (
    <>
      {/* ── DARK BAND: the "until now" moment ── */}
      <div style={{
        background: "var(--ink)",
        borderTop: "var(--border)",
        borderBottom: "var(--border)",
        padding: "72px 40px",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Giant ghost text behind */}
        <div style={{
          position: "absolute",
          right: -20,
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: "clamp(6rem, 16vw, 14rem)",
          lineHeight: 1,
          color: "var(--cream)",
          opacity: 0.03,
          letterSpacing: "-0.04em",
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}>
          {"{?}"}
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div style={{ maxWidth: 800 }}>

            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              fontWeight: 700,
              color: "rgba(231,226,217,0.3)",
              marginBottom: 24,
            }}>
              THE PROBLEM
            </p>

            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4.5vw, 4rem)",
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              color: "var(--white)",
              marginBottom: 32,
            }}>
              Every ERC20 transfer you've<br />
              ever made is{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700, color: "rgba(231,226,217,0.5)" }}>
                visible to everyone.
              </em><br />
              Forever.
            </h2>

            {/* Rule + "Until now" */}
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 48, height: 3, background: "rgba(231,226,217,0.2)" }} />
              <span style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "rgba(231,226,217,0.55)",
                letterSpacing: "-0.01em",
              }}>
                Until now.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── HOW section: 3 clean columns ── */}
      <div style={{ borderBottom: "var(--border)", background: "var(--white)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>

            {[
              {
                step: "STEP 01",
                verb: "WRAP",
                headline: "Any ERC20 becomes confidential.",
                sub: "Deposit any token. Receive a 1:1 confidential counterpart backed by the vault.",
                example: { from: "100 USDC", to: "100 cUSDC" },
                dark: false,
              },
              {
                step: "STEP 02",
                verb: "TRANSACT",
                headline: "Send privately. Nothing leaks.",
                sub: "Transfer, approve, delegate. Every operation is proven by a ZK proof. Amounts and addresses stay hidden.",
                example: { from: "▓▓▓ cUSDC", to: "▓▓▓ cUSDC" },
                dark: true,
              },
              {
                step: "STEP 03",
                verb: "UNWRAP",
                headline: "Back to ERC20. Anytime.",
                sub: "Burn your confidential tokens. Receive the underlying back. Exit is as private as entry.",
                example: { from: "100 cUSDC", to: "100 USDC" },
                dark: false,
              },
            ].map((s, i) => (
              <div key={s.step} style={{
                background: s.dark ? "var(--ink)" : "var(--white)",
                borderRight: i < 2 ? "var(--border)" : "none",
                padding: "52px 40px",
                display: "flex",
                flexDirection: "column",
                gap: 0,
                position: "relative",
                overflow: "hidden",
              }}>

                {/* Ghost step number */}
                <div style={{
                  position: "absolute",
                  right: 16,
                  top: 20,
                  fontFamily: "var(--font-serif)",
                  fontWeight: 900,
                  fontSize: "6rem",
                  lineHeight: 1,
                  color: s.dark ? "var(--cream)" : "var(--ink)",
                  opacity: 0.04,
                  userSelect: "none",
                }}>{i + 1}</div>

                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.16em",
                  fontWeight: 700,
                  color: s.dark ? "rgba(231,226,217,0.3)" : "rgba(10,10,10,0.3)",
                  marginBottom: 16,
                }}>
                  {s.step}
                </div>

                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: "1.6rem",
                  letterSpacing: "0.04em",
                  color: s.dark ? "var(--white)" : "var(--ink)",
                  marginBottom: 14,
                }}>
                  {s.verb}
                </div>

                <h3 style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 900,
                  fontSize: "1.15rem",
                  lineHeight: 1.25,
                  color: s.dark ? "var(--white)" : "var(--ink)",
                  marginBottom: 12,
                }}>
                  {s.headline}
                </h3>

                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  lineHeight: 1.7,
                  color: s.dark ? "rgba(231,226,217,0.5)" : "var(--ink-soft)",
                  flex: 1,
                  marginBottom: 28,
                }}>
                  {s.sub}
                </p>

                {/* Token example pill */}
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.06em",
                  border: `2px solid ${s.dark ? "rgba(231,226,217,0.15)" : "var(--ink)"}`,
                  padding: "8px 14px",
                  background: s.dark ? "rgba(231,226,217,0.05)" : "var(--cream)",
                  color: s.dark ? "rgba(231,226,217,0.6)" : "var(--ink)",
                  width: "fit-content",
                }}>
                  <span>{s.example.from}</span>
                  <span style={{ opacity: 0.35 }}>→</span>
                  <span>{s.example.to}</span>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
}
