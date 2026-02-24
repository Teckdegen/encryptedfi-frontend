"use client";

export default function Hero() {
  return (
    <section style={{ background: "var(--cream)", borderBottom: "var(--border)" }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 40px",
        display: "grid",
        gridTemplateColumns: "1fr 480px",
        gap: 0,
        minHeight: "88vh",
        alignItems: "stretch",
      }}>

        {/* ── LEFT ── */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 64px 80px 0",
          borderRight: "var(--border)",
        }}>

          {/* Issue label */}
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
            width: "fit-content",
            marginBottom: 36,
            animation: "fadeUp 0.5s ease both",
          }}>
            <span style={{
              width: 7, height: 7,
              borderRadius: "50%",
              background: "var(--cream)",
              display: "inline-block",
              animation: "blink 1.8s ease-in-out infinite",
            }} />
            ENCRYPTED LAYER FOR ERC20s
          </div>

          {/* Main headline */}
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(3.5rem, 6.5vw, 6.5rem)",
            fontWeight: 900,
            lineHeight: 0.93,
            letterSpacing: "-0.03em",
            marginBottom: 36,
            animation: "fadeUp 0.55s 0.05s ease both",
          }}>
            We bring<br />
            <em style={{ fontStyle: "italic", fontWeight: 700 }}>privacy</em><br />
            to ERC20s.
          </h1>

          {/* Rule */}
          <div style={{ height: 3, background: "var(--ink)", width: 60, marginBottom: 28, animation: "fadeIn 0.5s 0.1s ease both" }} />

          {/* Subtext — tight, punchy */}
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "1.1rem",
            lineHeight: 1.75,
            color: "var(--ink-soft)",
            maxWidth: 460,
            marginBottom: 44,
            animation: "fadeUp 0.55s 0.12s ease both",
          }}>
            Any ERC20. Fully encrypted balances.
            Private transfers. Confidential allowances.
            Verified on-chain by ZK proofs.{" "}
            <strong style={{ color: "var(--ink)" }}>No trust. No tradeoffs.</strong>
          </p>

          {/* CTAs */}
          <div style={{
            display: "flex",
            gap: 12,
            marginBottom: 56,
            animation: "fadeUp 0.55s 0.18s ease both",
          }}>
            <a href="#usecases" style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textDecoration: "none",
              color: "var(--white)",
              background: "var(--ink)",
              padding: "13px 28px",
              border: "var(--border)",
              boxShadow: "var(--shadow)",
              transition: "transform 0.1s, box-shadow 0.1s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = "translate(-3px,-3px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "9px 9px 0 var(--ink)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = "";
              (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow)";
            }}
            >
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
              padding: "13px 28px",
              border: "var(--border)",
              boxShadow: "var(--shadow-sm)",
              transition: "transform 0.1s, box-shadow 0.1s",
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
              THE CRYPTOGRAPHY
            </a>
          </div>

          {/* 3 stat pills */}
          <div style={{
            display: "flex",
            gap: 0,
            border: "var(--border)",
            width: "fit-content",
            boxShadow: "var(--shadow-sm)",
            animation: "fadeUp 0.55s 0.22s ease both",
          }}>
            {[
              { num: "100%", label: "Private" },
              { num: "ZK", label: "Verified" },
              { num: "0", label: "Trust" },
            ].map((s, i) => (
              <div key={i} style={{
                padding: "14px 22px",
                borderRight: i < 2 ? "var(--border)" : "none",
                background: i === 1 ? "var(--ink)" : "var(--white)",
                textAlign: "center",
              }}>
                <div style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 900,
                  fontSize: "1.5rem",
                  lineHeight: 1,
                  marginBottom: 3,
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

        {/* ── RIGHT — logo featured ── */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 0 60px 48px",
          gap: 28,
          position: "relative",
          overflow: "hidden",
        }}>

          {/* Big logo image */}
          <div style={{
            position: "relative",
            width: "100%",
            maxWidth: 340,
            border: "var(--border)",
            boxShadow: "var(--shadow-lg)",
            background: "var(--cream)",
            animation: "fadeUp 0.6s 0.2s ease both",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://image2url.com/r2/default/images/1771926217635-c1e1a97f-34e6-4723-a7ab-946eb5a5feac.png"
              alt="Encrypted Fi"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>

          {/* Publication card below logo */}
          <div style={{
            width: "100%",
            maxWidth: 340,
            border: "var(--border)",
            background: "var(--ink)",
            boxShadow: "var(--shadow)",
            padding: "20px 24px",
            animation: "fadeUp 0.6s 0.3s ease both",
          }}>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.16em",
              color: "rgba(231,226,217,0.35)",
              marginBottom: 10,
            }}>
              CORE PRIMITIVE
            </div>
            <div style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 900,
              fontSize: "1.15rem",
              color: "var(--white)",
              marginBottom: 6,
              lineHeight: 1.2,
            }}>
              ZK-SNARK proof<br />for every operation.
            </div>
            <div style={{
              height: 1,
              background: "rgba(231,226,217,0.12)",
              margin: "12px 0",
            }} />
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              color: "rgba(231,226,217,0.35)",
            }}>
              <span>GROTH16 / BN254</span>
              <span>~280K GAS</span>
            </div>
          </div>

          {/* Decorative page number */}
          <div style={{
            position: "absolute",
            bottom: 24,
            right: 0,
            fontFamily: "var(--font-serif)",
            fontWeight: 900,
            fontSize: "8rem",
            lineHeight: 1,
            color: "var(--ink)",
            opacity: 0.04,
            userSelect: "none",
            pointerEvents: "none",
          }}>01</div>
        </div>

      </div>
    </section>
  );
}
