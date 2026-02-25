import { LockIcon } from "./Icons";

const STACK = [
  { id: "01", name: "Groth16",       tag: "ZK-SNARK Proofs",      dark: true  },
  { id: "02", name: "BN254",         tag: "EVM Native Curve",      dark: false },
  { id: "03", name: "Nullifiers",    tag: "No Double Spends",      dark: true  },
  { id: "04", name: "Commitments",   tag: "Encrypted Balances",    dark: false },
  { id: "05", name: "6 Circuits",    tag: "Isolated Operations",   dark: true  },
  { id: "06", name: "Proof Binding", tag: "Ops You Can Verify",    dark: false },
];

export default function Tech() {
  return (
    <section
      id="technology"
      style={{ background: "var(--cream)", padding: "80px 0" }}
    >
      {/* Section rule */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 32px",
          borderTop: "var(--border)",
          borderBottom: "var(--border)",
          marginBottom: 64,
          background: "var(--ink)",
        }}
      >
        <div style={{ flex: 1, height: 1, background: "rgba(228,222,212,0.2)" }} />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            padding: "0 20px",
            color: "var(--cream)",
          }}
        >
          THE CRYPTOGRAPHY
        </span>
        <div style={{ flex: 1, height: 1, background: "rgba(228,222,212,0.2)" }} />
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ marginBottom: 56, maxWidth: 640 }}>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              marginBottom: 16,
            }}
          >
            Your token.
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 700 }}>
              Made private.
            </em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "var(--ink-soft)",
              maxWidth: 480,
            }}
          >
            Encrypted Fi wraps your existing tokens using battle-tested cryptography. Same chain, same liquidity — just private.
          </p>
        </div>

        {/* Stack grid — 6 cells, 3 col */}
        <div
          className="tech-grid"
          style={{
            border: "var(--border)",
            boxShadow: "var(--shadow-lg)",
            marginBottom: 28,
          }}
        >
          {STACK.map((s, i) => {
            const isLastRow = i >= 3;
            const isLastCol = (i + 1) % 3 === 0;

            return (
              <div
                key={s.id}
                style={{
                  background: s.dark ? "var(--ink)" : "var(--white)",
                  borderRight: isLastCol ? "none" : "var(--border)",
                  borderBottom: isLastRow ? "none" : "var(--border)",
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 20,
                  minHeight: 160,
                }}
              >
                {/* Top: ID */}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: s.dark
                      ? "rgba(228,222,212,0.25)"
                      : "rgba(10,10,10,0.25)",
                  }}
                >
                  {s.id}
                </span>

                {/* Bottom: name + tag */}
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 900,
                      fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      color: s.dark ? "var(--white)" : "var(--ink)",
                      marginBottom: 8,
                    }}
                  >
                    {s.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: s.dark
                        ? "rgba(228,222,212,0.4)"
                        : "rgba(10,10,10,0.4)",
                    }}
                  >
                    {s.tag}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lock bar */}
        <div
          style={{
            border: "var(--border)",
            background: "var(--ink)",
            boxShadow: "var(--shadow-sm)",
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "20px 28px",
          }}
        >
          <LockIcon size={20} color="rgba(228,222,212,0.55)" strokeWidth={2} />
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "rgba(228,222,212,0.55)",
              lineHeight: 1.6,
            }}
          >
            VERIFICATION KEYS LOCKED FOREVER — GROTH16 PROOFS ON EVERY OP · NULLIFIERS ON-CHAIN · NO ADMIN. NO BACKDOORS.
          </p>
        </div>

      </div>
    </section>
  );
}
