const CASES = [
  {
    num: "01",
    icon: "🔒",
    title: "Private Token Transfers",
    sub: "Send ERC20s without leaking anything",
    body: "On a standard chain, every transfer broadcasts your wallet address, the recipient, and the exact amount — forever. With Encrypted Fi, the same transfer happens on-chain but the sender, receiver, and amount are all hidden inside a ZK-SNARK proof. Observers see a transaction happened. That's it.",
    tags: ["USDC", "WETH", "ANY ERC20"],
  },
  {
    num: "02",
    icon: "📊",
    title: "Confidential Portfolio Positions",
    sub: "Hold DeFi positions without telegraphing your strategy",
    body: "When your wallet holds millions in a token, every trader on the network knows. Sophisticated actors front-run you. Competitors copy your positions the moment you move. Encrypted Fi keeps your confidential balance encrypted on-chain — no one can see what you hold or when you move it.",
    tags: ["TRADING", "INSTITUTIONS", "DEFI"],
  },
  {
    num: "03",
    icon: "💼",
    title: "Private On-Chain Payroll",
    sub: "Pay contributors without broadcasting salaries",
    body: "Crypto payroll is public by default. Every salary, every contractor payment, every bonus is readable by anyone with a block explorer. Encrypted Fi lets DAOs and companies pay contributors in any ERC20 token without making compensation data public on-chain.",
    tags: ["DAOS", "TEAMS", "CONTRACTORS"],
  },
  {
    num: "04",
    icon: "🏛️",
    title: "Institutional-Grade Privacy",
    sub: "Enterprise finance without public exposure",
    body: "Institutions can't operate when every treasury movement is tracked in real-time. Encrypted Fi brings the privacy model of traditional finance — where your bank doesn't broadcast your transactions to everyone — to public blockchains, with cryptographic proof that everything is valid.",
    tags: ["TREASURY", "COMPLIANCE", "ENTERPRISE"],
  },
  {
    num: "05",
    icon: "🎯",
    title: "Sealed Bid Auctions",
    sub: "Run on-chain auctions where bids are hidden until reveal",
    body: "Traditional on-chain auctions expose every bid as it's placed, letting later bidders game the system. Encrypted Fi enables sealed-bid auctions where participants commit encrypted bids on-chain, proven valid by ZK proofs, without revealing amounts until the auction closes.",
    tags: ["AUCTIONS", "NFTS", "GOVERNANCE"],
  },
  {
    num: "06",
    icon: "🛡️",
    title: "MEV & Front-Run Protection",
    sub: "Shield your swap intent from bots in the mempool",
    body: "Pending transactions are visible in the mempool before they're confirmed. Bots read your intent and front-run you, extracting value before your transaction settles. Encrypted Fi's confidential layer removes the publicly readable amount from the equation — your transaction intent stays private.",
    tags: ["DEFI", "SWAPS", "MEV"],
  },
];

const Stud = () => (
  <span
    style={{
      display: "inline-block",
      width: 13,
      height: 13,
      borderRadius: "50%",
      background: "var(--cream)",
      border: "2px solid var(--ink)",
      marginRight: 5,
    }}
  />
);

export default function UseCases() {
  return (
    <section id="usecases" style={{ padding: "80px 0", background: "var(--cream)" }}>
      {/* Section rule */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 32px",
          borderTop: "var(--border)",
          borderBottom: "var(--border)",
          marginBottom: 64,
          background: "var(--white)",
        }}
      >
        <div style={{ flex: 1, height: 1, background: "var(--ink)", opacity: 0.2 }} />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            padding: "0 20px",
          }}
        >
          USE CASES
        </span>
        <div style={{ flex: 1, height: 1, background: "var(--ink)", opacity: 0.2 }} />
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            marginBottom: 64,
            alignItems: "end",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
            }}
          >
            Privacy for every
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 700 }}>
              on-chain use case.
            </em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1.05rem",
              lineHeight: 1.75,
              color: "var(--ink-soft)",
            }}
          >
            The moment your assets are wrapped into Encrypted Fi, they move
            privately. Every transfer, approval, and delegated send is backed
            by a ZK proof. The use cases are as broad as ERC20s themselves.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            border: "var(--border)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {CASES.map((c, i) => {
            const isLastRow = i >= 3;
            const isLastCol = (i + 1) % 3 === 0;
            const isDark = i === 1 || i === 4;

            return (
              <div
                key={c.num}
                style={{
                  background: isDark ? "var(--ink)" : "var(--white)",
                  borderRight: isLastCol ? "none" : "var(--border)",
                  borderBottom: isLastRow ? "none" : "var(--border)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.15s",
                }}
              >
                {/* Stud row */}
                <div
                  style={{
                    padding: "5px 12px",
                    background: isDark
                      ? "rgba(255,255,255,0.06)"
                      : "var(--cream-mid)",
                    borderBottom: isDark
                      ? "2px solid rgba(255,255,255,0.08)"
                      : "var(--border)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((j) => (
                    <span
                      key={j}
                      style={{
                        display: "inline-block",
                        width: 13,
                        height: 13,
                        borderRadius: "50%",
                        background: isDark ? "transparent" : "var(--cream)",
                        border: `2px solid ${isDark ? "rgba(255,255,255,0.25)" : "var(--ink)"}`,
                        marginRight: 5,
                      }}
                    />
                  ))}
                </div>

                <div style={{ padding: 28, flex: 1, display: "flex", flexDirection: "column" }}>
                  {/* Top row: number + icon */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 16,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontWeight: 700,
                        fontSize: "0.65rem",
                        letterSpacing: "0.12em",
                        color: isDark
                          ? "rgba(228,222,212,0.35)"
                          : "var(--ink)",
                        opacity: isDark ? 1 : 0.35,
                      }}
                    >
                      {c.num}
                    </span>
                    <span style={{ fontSize: "1.6rem" }}>{c.icon}</span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 900,
                      fontSize: "1.2rem",
                      lineHeight: 1.2,
                      marginBottom: 6,
                      color: isDark ? "var(--white)" : "var(--ink)",
                    }}
                  >
                    {c.title}
                  </h3>

                  {/* Sub */}
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      fontSize: "0.78rem",
                      letterSpacing: "0.02em",
                      color: isDark
                        ? "rgba(228,222,212,0.5)"
                        : "var(--ink-soft)",
                      marginBottom: 14,
                    }}
                  >
                    {c.sub}
                  </p>

                  {/* Body */}
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.85rem",
                      lineHeight: 1.7,
                      color: isDark
                        ? "rgba(228,222,212,0.55)"
                        : "var(--ink-soft)",
                      flex: 1,
                      marginBottom: 20,
                    }}
                  >
                    {c.body}
                  </p>

                  {/* Tags */}
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.55rem",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          padding: "3px 8px",
                          border: `1.5px solid ${isDark ? "rgba(228,222,212,0.2)" : "var(--ink)"}`,
                          color: isDark
                            ? "rgba(228,222,212,0.45)"
                            : "var(--ink)",
                          opacity: isDark ? 1 : 0.55,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
