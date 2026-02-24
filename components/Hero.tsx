import Logo from "./Logo";

const Stud = ({ light = false }: { light?: boolean }) => (
  <span
    style={{
      display: "inline-block",
      width: 14,
      height: 14,
      borderRadius: "50%",
      background: light ? "transparent" : "var(--cream)",
      border: `2px solid ${light ? "rgba(10,10,10,0.25)" : "var(--ink)"}`,
      marginRight: 5,
    }}
  />
);

const StudRow = ({
  n = 4,
  light = false,
  dark = false,
}: {
  n?: number;
  light?: boolean;
  dark?: boolean;
}) => (
  <div
    style={{
      padding: "5px 12px",
      background: dark ? "var(--ink)" : "var(--cream-mid)",
      borderBottom: dark ? "3px solid rgba(255,255,255,0.12)" : "var(--border)",
      display: "flex",
      alignItems: "center",
    }}
  >
    {Array.from({ length: n }).map((_, i) => (
      <Stud key={i} light={light} />
    ))}
  </div>
);

export default function Hero() {
  return (
    <section
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "72px 32px 80px",
      }}
    >
      {/* Breaking label */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          letterSpacing: "0.16em",
          fontWeight: 700,
          background: "var(--ink)",
          color: "var(--cream)",
          padding: "5px 14px",
          marginBottom: 28,
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--cream)",
            animation: "pulse 1.6s ease-in-out infinite",
            flexShrink: 0,
          }}
        />
        ENCRYPTED LAYER FOR ERC20s
      </div>

      {/* Main layout: headline left, card right */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: 64,
          alignItems: "start",
        }}
      >
        {/* Left */}
        <div>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(3.2rem, 6.5vw, 6rem)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              marginBottom: 32,
              animation: "fadeUp 0.6s ease both",
            }}
          >
            We bring
            <br />
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 700,
              }}
            >
              privacy
            </em>
            <br />
            to ERC20s.
          </h1>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1.15rem",
              lineHeight: 1.75,
              color: "var(--ink-soft)",
              maxWidth: 520,
              marginBottom: 20,
              animation: "fadeUp 0.6s 0.1s ease both",
            }}
          >
            Any ERC20 token. Fully private balances. Confidential transfers.
            Encrypted allowances. All verified on-chain by ZK-SNARKs —
            <strong style={{ color: "var(--ink)" }}> no trust, no tradeoffs.</strong>
          </p>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "var(--ink-soft)",
              maxWidth: 520,
              marginBottom: 40,
              animation: "fadeUp 0.6s 0.15s ease both",
            }}
          >
            Wrap any ERC20 into its confidential counterpart. Transact privately.
            Unwrap back anytime. Your balance is your business.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 48,
              animation: "fadeUp 0.6s 0.2s ease both",
            }}
          >
            <a
              href="#waitlist"
              style={{
                display: "inline-block",
                background: "var(--ink)",
                color: "var(--white)",
                textDecoration: "none",
                padding: "14px 30px",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                border: "var(--border)",
                boxShadow: "var(--shadow)",
              }}
            >
              Get Early Access
            </a>
            <a
              href="#usecases"
              style={{
                display: "inline-block",
                background: "transparent",
                color: "var(--ink)",
                textDecoration: "none",
                padding: "14px 30px",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                border: "var(--border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              See Use Cases ↓
            </a>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, auto)",
              gap: 0,
              border: "var(--border)",
              boxShadow: "var(--shadow-sm)",
              width: "fit-content",
              animation: "fadeUp 0.6s 0.25s ease both",
            }}
          >
            {[
              { num: "100%", label: "Private Balances" },
              { num: "ZK", label: "Proof Every Tx" },
              { num: "0", label: "Trust Required" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "16px 28px",
                  background: i % 2 === 0 ? "var(--white)" : "var(--cream-mid)",
                  borderRight: i < 2 ? "var(--border)" : "none",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 900,
                    fontSize: "1.8rem",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.12em",
                    fontWeight: 700,
                    opacity: 0.5,
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — visual card */}
        <div style={{ animation: "fadeUp 0.6s 0.3s ease both" }}>
          <div
            style={{
              border: "var(--border)",
              boxShadow: "var(--shadow-lg)",
              background: "var(--white)",
            }}
          >
            <StudRow n={4} />
            <div style={{ padding: 24 }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.16em",
                  fontWeight: 700,
                  opacity: 0.45,
                  marginBottom: 20,
                }}
              >
                CONFIDENTIAL TOKEN TRANSFER
              </div>

              {/* Before → After */}
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.12em",
                    opacity: 0.4,
                    marginBottom: 6,
                  }}
                >
                  BEFORE — PUBLIC ERC20
                </div>
                {[
                  { label: "FROM", val: "0x7A23...F1c4", exposed: true },
                  { label: "TO  ", val: "0xBb91...2E0d", exposed: true },
                  { label: "AMT ", val: "50,000 USDC", exposed: true },
                ].map((r) => (
                  <div
                    key={r.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "7px 12px",
                      borderBottom: "1px solid var(--cream-mid)",
                      background: "var(--cream)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        opacity: 0.45,
                      }}
                    >
                      {r.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#C0392B",
                      }}
                    >
                      {r.val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Arrow */}
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  opacity: 0.45,
                  margin: "12px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "var(--cream-dark)",
                  }}
                />
                ENCRYPTED FI
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "var(--cream-dark)",
                  }}
                />
              </div>

              {/* After */}
              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.12em",
                    opacity: 0.4,
                    marginBottom: 6,
                  }}
                >
                  AFTER — CONFIDENTIAL
                </div>
                {[
                  { label: "FROM", val: "●●●●●●●●●●●●" },
                  { label: "TO  ", val: "●●●●●●●●●●●●" },
                  { label: "AMT ", val: "▓▓▓▓▓▓▓▓▓▓▓▓" },
                ].map((r) => (
                  <div
                    key={r.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "7px 12px",
                      borderBottom: "1px solid rgba(10,10,10,0.08)",
                      background: "var(--ink)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        color: "rgba(228,222,212,0.4)",
                      }}
                    >
                      {r.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "rgba(228,222,212,0.35)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {r.val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Verified badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--ink)",
                  padding: "10px 14px",
                  border: "2px solid rgba(255,255,255,0.1)",
                }}
              >
                <span style={{ color: "#7EFF7E", fontSize: "0.95rem" }}>✓</span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    fontWeight: 700,
                    color: "rgba(228,222,212,0.7)",
                  }}
                >
                  ZK PROOF VERIFIED ON-CHAIN
                </span>
              </div>
            </div>
            <StudRow n={4} />
          </div>

          {/* Logo block below card */}
          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Logo size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
