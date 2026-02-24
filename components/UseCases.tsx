const CASES = [
  {
    n: "01",
    icon: "🔒",
    title: "Private Transfers",
    one: "Send tokens. Reveal nothing.",
    body: "Addresses, amounts, and counterparties — all hidden inside a ZK proof. The chain confirms it happened. Nothing else is visible.",
    dark: false,
    wide: false,
  },
  {
    n: "02",
    icon: "📊",
    title: "Hidden Positions",
    one: "Your portfolio. Your secret.",
    body: "Stop broadcasting your holdings. Encrypted balances mean no one can surveil your strategy or front-run your next move.",
    dark: true,
    wide: false,
  },
  {
    n: "03",
    icon: "💼",
    title: "On-Chain Payroll",
    one: "Pay your team. Not publicly.",
    body: "DAOs and companies can pay contributors in any ERC20 without making salaries a public record on the blockchain.",
    dark: false,
    wide: false,
  },
  {
    n: "04",
    icon: "🏛️",
    title: "Institutional Privacy",
    one: "Enterprise finance. Encrypted.",
    body: "Treasury movements, OTC deals, large transfers — all handled confidentially on public infrastructure. No off-chain trust needed.",
    dark: false,
    wide: false,
  },
  {
    n: "05",
    icon: "🎯",
    title: "Sealed Bids",
    one: "Commit. Reveal. Win.",
    body: "On-chain auctions where bids are encrypted until reveal. No front-running. No last-second manipulation.",
    dark: true,
    wide: false,
  },
  {
    n: "06",
    icon: "⚡",
    title: "MEV Shield",
    one: "Your intent stays private.",
    body: "Bots can't read what they can't see. Confidential transactions stop front-runners and sandwich attacks before they start.",
    dark: false,
    wide: false,
  },
];

export default function UseCases() {
  return (
    <section id="usecases" style={{ background: "var(--cream)", borderBottom: "var(--border)" }}>

      {/* Section header */}
      <div style={{
        borderBottom: "var(--border)",
        padding: "10px 40px",
        display: "flex",
        alignItems: "center",
        background: "var(--cream)",
      }}>
        <div style={{ flex: 1, height: 1, background: "var(--ink)", opacity: 0.15 }} />
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.22em",
          padding: "0 24px",
          color: "var(--ink)",
        }}>USE CASES</span>
        <div style={{ flex: 1, height: 1, background: "var(--ink)", opacity: 0.15 }} />
      </div>

      {/* Header row */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "64px 40px 56px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 48,
        alignItems: "end",
        borderBottom: "var(--border)",
      }}>
        <h2 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          fontWeight: 900,
          lineHeight: 0.97,
          letterSpacing: "-0.025em",
        }}>
          Privacy for every<br />
          <em style={{ fontStyle: "italic", fontWeight: 700 }}>on-chain use case.</em>
        </h2>

        {/* Pull quote */}
        <div style={{
          borderLeft: "4px solid var(--ink)",
          paddingLeft: 24,
        }}>
          <p style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "1.1rem",
            lineHeight: 1.65,
            color: "var(--ink-soft)",
          }}>
            "The moment your assets wrap into Encrypted Fi, they move privately. Every transfer, approval, and delegated send is backed by a ZK proof."
          </p>
        </div>
      </div>

      {/* 3-col grid of 6 cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        borderBottom: "var(--border)",
      }}>
        {CASES.map((c, i) => {
          const isLastRow = i >= 3;
          const isLastCol = (i + 1) % 3 === 0;

          return (
            <div key={c.n} style={{
              background: c.dark ? "var(--ink)" : (i % 2 === 0 ? "var(--white)" : "var(--cream)"),
              borderRight: isLastCol ? "none" : "var(--border)",
              borderBottom: isLastRow ? "none" : "var(--border)",
              padding: "40px 36px",
              display: "flex",
              flexDirection: "column",
              gap: 0,
              position: "relative",
              overflow: "hidden",
            }}>

              {/* Ghost number */}
              <span style={{
                position: "absolute",
                top: 12,
                right: 18,
                fontFamily: "var(--font-serif)",
                fontWeight: 900,
                fontSize: "5rem",
                lineHeight: 1,
                color: c.dark ? "var(--cream)" : "var(--ink)",
                opacity: 0.05,
                userSelect: "none",
              }}>{i + 1}</span>

              {/* Icon + label */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <span style={{ fontSize: "1.5rem" }}>{c.icon}</span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.56rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: c.dark ? "rgba(231,226,217,0.25)" : "rgba(10,10,10,0.25)",
                }}>{c.n}</span>
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 900,
                fontSize: "1.3rem",
                lineHeight: 1.15,
                color: c.dark ? "var(--white)" : "var(--ink)",
                marginBottom: 8,
              }}>{c.title}</h3>

              {/* One-liner */}
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: c.dark ? "rgba(231,226,217,0.45)" : "rgba(10,10,10,0.45)",
                marginBottom: 16,
              }}>{c.one}</p>

              {/* Rule */}
              <div style={{
                height: 1,
                background: c.dark ? "rgba(231,226,217,0.1)" : "rgba(10,10,10,0.1)",
                marginBottom: 16,
              }} />

              {/* Body */}
              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                lineHeight: 1.7,
                color: c.dark ? "rgba(231,226,217,0.5)" : "var(--ink-soft)",
              }}>{c.body}</p>

            </div>
          );
        })}
      </div>

    </section>
  );
}
