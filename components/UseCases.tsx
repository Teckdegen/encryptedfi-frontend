import {
  LockIcon, ChartIcon, BriefcaseIcon,
  BuildingIcon, GavelIcon, ShieldIcon,
} from "./Icons";

const CASES = [
  {
    n: "01",
    Icon: LockIcon,
    title: "Private Transfers",
    one: "Send tokens. Reveal nothing.",
    body: "Sender, receiver, and amount are all hidden inside a ZK proof. The chain confirms it happened. Nothing else is visible.",
    dark: false,
  },
  {
    n: "02",
    Icon: ChartIcon,
    title: "Hidden Positions",
    one: "Your portfolio. Your secret.",
    body: "Stop broadcasting your holdings. Encrypted balances mean no one can surveil your strategy or front-run your next move.",
    dark: true,
  },
  {
    n: "03",
    Icon: BriefcaseIcon,
    title: "Private Payroll",
    one: "Pay your team. Not publicly.",
    body: "DAOs and companies can pay contributors in any token without making compensation a public record on-chain.",
    dark: false,
  },
  {
    n: "04",
    Icon: BuildingIcon,
    title: "Institutional Privacy",
    one: "Enterprise finance. Encrypted.",
    body: "Treasury movements, OTC deals, large transfers — handled confidentially on public infrastructure. No off-chain trust needed.",
    dark: false,
  },
  {
    n: "05",
    Icon: GavelIcon,
    title: "Sealed Bids",
    one: "Commit. Reveal. Win.",
    body: "On-chain auctions where bids are encrypted until reveal. No front-running. No last-second manipulation. Fully trustless.",
    dark: true,
  },
  {
    n: "06",
    Icon: ShieldIcon,
    title: "MEV Shield",
    one: "Your intent stays private.",
    body: "Bots can't read what they can't see. Confidential transactions stop front-runners and sandwich attacks before they start.",
    dark: false,
  },
];

export default function UseCases() {
  return (
    <section id="usecases" style={{ background: "var(--cream)", borderBottom: "var(--border)" }}>

      {/* Section rule */}
      <div style={{
        borderBottom: "var(--border)",
        padding: "10px 32px",
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

      {/* Header */}
      <div className="uc-header" style={{ padding: "64px 32px 56px", borderBottom: "var(--border)" }}>
        <h2 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
          fontWeight: 900,
          lineHeight: 0.97,
          letterSpacing: "-0.025em",
        }}>
          Privacy for every<br />
          <em style={{ fontStyle: "italic", fontWeight: 700 }}>on-chain use case.</em>
        </h2>

        <div style={{ borderLeft: "4px solid var(--ink)", paddingLeft: 24 }}>
          <p style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            lineHeight: 1.65,
            color: "var(--ink-soft)",
          }}>
            "The moment your assets wrap into Encrypted Fi, they move privately. Every transfer, approval, and delegated send is backed by a ZK proof."
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid-3" style={{ borderBottom: "var(--border)" }}>
        {CASES.map((c, i) => {
          const isLastRow = i >= 3;
          const isLastCol = (i + 1) % 3 === 0;
          const iconColor = c.dark ? "rgba(231,226,217,0.65)" : "var(--ink)";

          return (
            <div key={c.n} style={{
              background: c.dark
                ? "var(--ink)"
                : i % 2 === 0 ? "var(--white)" : "var(--cream)",
              borderRight: isLastCol ? "none" : "var(--border)",
              borderBottom: isLastRow ? "none" : "var(--border)",
              padding: "36px 32px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}>
              <span style={{
                position: "absolute", top: 12, right: 18,
                fontFamily: "var(--font-serif)", fontWeight: 900,
                fontSize: "5rem", lineHeight: 1,
                color: c.dark ? "var(--cream)" : "var(--ink)",
                opacity: 0.05, userSelect: "none",
              }}>{i + 1}</span>

              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", marginBottom: 20,
              }}>
                <c.Icon size={22} color={iconColor} strokeWidth={2} />
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.56rem",
                  fontWeight: 700, letterSpacing: "0.14em",
                  color: c.dark ? "rgba(231,226,217,0.25)" : "rgba(10,10,10,0.25)",
                }}>{c.n}</span>
              </div>

              <h3 style={{
                fontFamily: "var(--font-serif)", fontWeight: 900,
                fontSize: "clamp(1.1rem, 2vw, 1.3rem)", lineHeight: 1.15,
                color: c.dark ? "var(--white)" : "var(--ink)", marginBottom: 8,
              }}>{c.title}</h3>

              <p style={{
                fontFamily: "var(--font-mono)", fontSize: "0.62rem",
                fontWeight: 700, letterSpacing: "0.08em",
                color: c.dark ? "rgba(231,226,217,0.4)" : "rgba(10,10,10,0.4)",
                marginBottom: 14,
              }}>{c.one}</p>

              <div style={{
                height: 1,
                background: c.dark ? "rgba(231,226,217,0.08)" : "rgba(10,10,10,0.08)",
                marginBottom: 14,
              }} />

              <p style={{
                fontFamily: "var(--font-sans)", fontSize: "0.84rem",
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
