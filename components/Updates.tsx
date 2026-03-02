/* ─────────────────────────────────────────────────────────
   Updates.tsx
   Blog / updates section — placeholder until content is ready.
───────────────────────────────────────────────────────── */

export default function Updates() {
  return (
    <section
      id="updates"
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
          UPDATES
        </span>
        <div style={{ flex: 1, height: 1, background: "rgba(228,222,212,0.2)" }} />
      </div>

      <div className="section-inner">

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap" as const,
            gap: 32,
            marginBottom: 56,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                marginBottom: 14,
              }}
            >
              What&rsquo;s
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>happening.</em>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                color: "var(--ink-soft)",
                maxWidth: 400,
              }}
            >
              Protocol updates, research notes, and build logs.
              Check back soon.
            </p>
          </div>

          {/* Issue tag */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "rgba(10,10,10,0.25)",
              paddingTop: 6,
            }}
          >
            VOL. 01 / 2026
          </div>
        </div>

        {/* Empty state — placeholder */}
        <div
          style={{
            border: "var(--border)",
            borderStyle: "dashed",
            padding: "clamp(32px, 8vw, 64px) clamp(20px, 5vw, 40px)",
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "center",
            gap: 20,
            textAlign: "center" as const,
          }}
        >
          {/* Big mono label */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(0.6rem, 1.5vw, 0.75rem)",
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: "rgba(10,10,10,0.18)",
            }}
          >
            ◆ NO UPDATES YET ◆
          </span>

          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "rgba(10,10,10,0.15)",
              maxWidth: 440,
              margin: 0,
            }}
          >
            &ldquo;Building in silence.&rdquo;
          </p>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.82rem",
              color: "rgba(10,10,10,0.3)",
              maxWidth: 320,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            The first update drops when the protocol is ready.
            Follow on{" "}
            <a
              href="#"
              style={{
                color: "var(--ink)",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              Twitter
            </a>{" "}
            for the earliest signal.
          </p>
        </div>

        {/* Bottom caption */}
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "rgba(10,10,10,0.18)",
            }}
          >
            ENCRYPTED FI / UPDATES CHANNEL
          </span>
        </div>

      </div>
    </section>
  );
}
