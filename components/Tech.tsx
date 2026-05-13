import React from "react";
import { LockIcon } from "./Icons";

const STACK = [
  { id: "01", name: "Flare FCC",        tag: "Hardware Confidential Compute",  dark: true  },
  { id: "02", name: "TEE Enclave",      tag: "Keys Sealed In Hardware",        dark: false },
  { id: "03", name: "ECIES Encrypt",    tag: "Notes Encrypted To You",         dark: true  },
  { id: "04", name: "TEE Relayer",      tag: "Your Address Never Shows",       dark: false },
  { id: "05", name: "Multi-TEE",        tag: "2-of-3 Consensus Required",      dark: true  },
  { id: "06", name: "Timing Privacy",   tag: "Random Execution Delays",        dark: false },
  { id: "07", name: "Batch Mixing",     tag: "Withdrawals Mixed Together",     dark: true  },
  { id: "08", name: "Self-Sovereign",   tag: "Your Keys. Always Yours.",       dark: false },
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
          THE TECHNOLOGY
        </span>
        <div style={{ flex: 1, height: 1, background: "rgba(228,222,212,0.2)" }} />
      </div>

      <div className="section-inner">

        {/* Header — headline only */}
        <div style={{ marginBottom: 56 }}>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
            }}
          >
            Your token.
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 700 }}>
              Made private.
            </em>
          </h2>
        </div>

        {/* Stack grid */}
        <div
          className="tech-grid"
          style={{
            border: "var(--border)",
            boxShadow: "var(--shadow-lg)",
            marginBottom: 28,
          } as React.CSSProperties}
        >
          {STACK.map((s, i) => {
            const isLastRow = i >= 4;
            const isLastCol = (i + 1) % 4 === 0;

            return (
              <div
                key={s.id}
                className="tech-cell"
                style={{
                  background: s.dark ? "var(--ink)" : "var(--white)",
                  borderRight: isLastCol ? "none" : "var(--border)",
                  borderBottom: isLastRow ? "none" : "var(--border)",
                }}
              >
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
            SENDER ANONYMOUS · RECEIVER ANONYMOUS · TEE ENCLAVE · ECIES ENCRYPTION · FLARE FCC · MULTI-TEE CONSENSUS · NO REGISTRATION NEEDED · SELF-SOVEREIGN KEYS · TIMING RANDOMIZATION · BATCH MIXING.
          </p>
        </div>

      </div>
    </section>
  );
}
