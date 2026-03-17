"use client";

import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import type { Slide } from "../slides";
import Image from "next/image";

// ─── Shared primitives ────────────────────────────────────────────────────────

const ink   = "var(--ink)";
const cream = "var(--cream)";
const white = "var(--white)";
const serif = "var(--font-serif)";
const mono  = "var(--font-mono)";
const sans  = "var(--font-sans)";
const bdr   = "var(--border)";
const soft  = "var(--ink-soft)";

const Tag = ({ children }: { children: string }) => (
  <div style={{ fontFamily: mono, fontSize: "0.55rem", letterSpacing: "0.2em", fontWeight: 700,
    background: ink, color: cream, padding: "5px 14px", display: "inline-block", marginBottom: 28 }}>
    {children}
  </div>
);

const H1 = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <h2 style={{ fontFamily: serif, fontWeight: 900, fontSize: "clamp(2.4rem,5.5vw,4.5rem)",
    lineHeight: 0.96, letterSpacing: "-0.03em", color: ink, margin: 0, ...style }}>
    {children}
  </h2>
);

const Body = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <p style={{ fontFamily: sans, fontSize: "clamp(0.88rem,1.5vw,1.02rem)", lineHeight: 1.8,
    color: soft, margin: 0, ...style }}>
    {children}
  </p>
);

const Divider = () => (
  <div style={{ height: 1, background: "rgba(10,10,10,0.1)", margin: "20px 0" }} />
);

const Row = ({ left, right }: { left: React.ReactNode; right: React.ReactNode }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1.35fr", height: "100%", gap: 0 }}>
    <div style={{ padding: "48px 40px 48px 0", borderRight: bdr, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {left}
    </div>
    <div style={{ padding: "48px 0 48px 44px", display: "flex", flexDirection: "column", justifyContent: "center", overflowY: "auto" as const }}>
      {right}
    </div>
  </div>
);

const Center = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    textAlign: "center", height: "100%", padding: "40px 20px" }}>
    {children}
  </div>
);

const Grid3 = ({ items }: { items: { icon?: string; label: string; sub: string }[] }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: bdr }}>
    {items.map((c, i) => (
      <div key={c.label} style={{
        padding: "26px 20px",
        borderRight: i % 3 < 2 ? bdr : "none",
        borderBottom: i < items.length - 3 ? bdr : "none",
        background: i % 2 === 1 ? "rgba(10,10,10,0.03)" : "transparent",
      }}>
        {c.icon && <div style={{ fontSize: "1.4rem", marginBottom: 10 }}>{c.icon}</div>}
        <div style={{ fontFamily: serif, fontWeight: 800, fontSize: "0.9rem", marginBottom: 6 }}>{c.label}</div>
        <div style={{ fontFamily: sans, fontSize: "0.75rem", color: soft, lineHeight: 1.55 }}>{c.sub}</div>
      </div>
    ))}
  </div>
);

// ─── Bullet list ──────────────────────────────────────────────────────────────

const Check = ({ items, done = true }: { items: string[]; done?: boolean }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    {items.map(t => (
      <div key={t} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <span style={{ color: done ? ink : "rgba(10,10,10,0.22)", fontWeight: 700, lineHeight: 1.4 }}>
          {done ? "✓" : "○"}
        </span>
        <span style={{ fontFamily: sans, fontSize: "0.82rem", color: soft, lineHeight: 1.6 }}>{t}</span>
      </div>
    ))}
  </div>
);

// ─── Big stat box ─────────────────────────────────────────────────────────────

const StatBox = ({ items, cols = 2 }: {
  items: { n: string; l: string; dark?: boolean }[];
  cols?: number;
}) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, border: bdr }}>
    {items.map((s, i) => (
      <div key={s.l} style={{
        padding: "30px 28px",
        borderRight: (i % cols < cols - 1) ? bdr : "none",
        borderBottom: i < items.length - cols ? bdr : "none",
        background: s.dark ? ink : "transparent",
        color: s.dark ? white : ink,
      }}>
        <div style={{ fontFamily: serif, fontWeight: 900, fontSize: "clamp(2rem,4vw,3.2rem)", lineHeight: 1, marginBottom: 8 }}>{s.n}</div>
        <div style={{ fontFamily: mono, fontSize: "0.54rem", letterSpacing: "0.14em", opacity: 0.55 }}>{s.l.toUpperCase()}</div>
      </div>
    ))}
  </div>
);

// ─── Slide content map ────────────────────────────────────────────────────────

function SlideContent({ n }: { n: number }) {
  switch (n) {

    // ── 1: Cover ──────────────────────────────────────────────────────────────
    case 1: return (
      <Center>
        <div style={{ fontFamily: mono, fontSize: "0.55rem", letterSpacing: "0.2em", color: soft, marginBottom: 24 }}>
          CONFIDENTIAL · SERIES SEED · 2026
        </div>
        <H1 style={{ fontSize: "clamp(4rem,11vw,8.5rem)", marginBottom: 24 }}>
          Encrypted<br /><em style={{ fontStyle: "italic" }}>Fi</em>
        </H1>
        <Body style={{ maxWidth: 520, marginBottom: 52 }}>
          The privacy infrastructure layer for public blockchains.
          Any token. Any chain. Zero-knowledge verified.
        </Body>
        <div style={{ display: "flex", gap: 0, border: bdr }}>
          {[
            { n: "ZK",    l: "Every operation"    },
            { n: "100%",  l: "Non-custodial"       },
            { n: "Multi", l: "Chain — EVM + BTC"   },
          ].map((s, i) => (
            <div key={s.l} style={{ padding: "18px 32px", borderRight: i < 2 ? bdr : "none", textAlign: "center" as const }}>
              <div style={{ fontFamily: serif, fontWeight: 900, fontSize: "1.8rem", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: mono, fontSize: "0.5rem", letterSpacing: "0.14em", color: soft, marginTop: 6 }}>{s.l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </Center>
    );

    // ── 2: Problem ────────────────────────────────────────────────────────────
    case 2: return (
      <Row
        left={
          <>
            <Tag>THE PROBLEM</Tag>
            <H1>Every on-chain<br />move is a<br /><em style={{ fontStyle: "italic" }}>public record.</em></H1>
            <Body style={{ marginTop: 24 }}>
              Public blockchains solved trustlessness. They sacrificed privacy entirely.
              Every wallet, balance, and transaction is permanently readable by anyone —
              competitors, regulators, bots, and adversaries alike.
            </Body>
          </>
        }
        right={
          <div>
            {[
              { icon: "👁", t: "Total on-chain surveillance",
                b: "Every wallet balance and transaction is visible in real time. A single address lookup exposes years of financial history — wealth, counterparties, habits." },
              { icon: "⚡", t: "$1.38B extracted via MEV in 2024",
                b: "Visible pending transactions allow sandwich bots to front-run every trade. Users bear the cost through slippage, failed txs, and worse execution." },
              { icon: "🏛", t: "Institutions cannot operate publicly",
                b: "No fund, treasury, or enterprise can execute strategy on-chain without telegraphing every move. Privacy is the single biggest blocker to institutional DeFi adoption." },
              { icon: "🎯", t: "Targeted attacks follow public wealth",
                b: "Known on-chain wealth leads directly to phishing, social engineering, and protocol exploits directed at visible high-value wallets." },
            ].map(p => (
              <div key={p.t} style={{ marginBottom: 18, paddingBottom: 18, borderBottom: "1px solid rgba(10,10,10,0.07)" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.1rem", flexShrink: 0, marginTop: 2 }}>{p.icon}</span>
                  <div>
                    <div style={{ fontFamily: serif, fontWeight: 700, fontSize: "0.88rem", marginBottom: 4 }}>{p.t}</div>
                    <div style={{ fontFamily: sans, fontSize: "0.75rem", color: soft, lineHeight: 1.6 }}>{p.b}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      />
    );

    // ── 3: Market Size ────────────────────────────────────────────────────────
    case 3: return (
      <Row
        left={
          <>
            <Tag>MARKET OPPORTUNITY</Tag>
            <H1>$2.7 trillion.<br /><em style={{ fontStyle: "italic" }}>Zero privacy.</em></H1>
            <Body style={{ marginTop: 24 }}>
              Every dollar currently on-chain is fully transparent. We are building
              the first privacy middleware that any protocol, wallet, or institution
              can integrate without forking their stack.
            </Body>
          </>
        }
        right={
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <StatBox cols={2} items={[
              { n: "$2.7T",  l: "Total crypto market cap",   dark: true },
              { n: "$110B",  l: "DeFi total value locked"             },
              { n: "$1.4T",  l: "Addressable DeFi volume / yr"        },
              { n: "$0",     l: "Credible on-chain privacy solutions"  },
            ]} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "TAM", desc: "All on-chain value ($2.7T+) — every user benefits from confidential balances" },
                { label: "SAM", desc: "DeFi power users, institutions, DAOs, protocols — ~$400B TVL exposure" },
                { label: "SOM", desc: "Privacy-conscious segment in Year 1–2: $5B–20B TVL as integration target" },
              ].map(m => (
                <div key={m.label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: mono, fontSize: "0.55rem", letterSpacing: "0.14em",
                    background: ink, color: white, padding: "3px 10px", flexShrink: 0, marginTop: 2 }}>{m.label}</span>
                  <span style={{ fontFamily: sans, fontSize: "0.78rem", color: soft, lineHeight: 1.55 }}>{m.desc}</span>
                </div>
              ))}
            </div>
          </div>
        }
      />
    );

    // ── 4: Solution ───────────────────────────────────────────────────────────
    case 4: return (
      <Center>
        <Tag>OUR SOLUTION</Tag>
        <H1 style={{ marginBottom: 16 }}>
          Privacy as a layer,<br /><em style={{ fontStyle: "italic" }}>not a chain.</em>
        </H1>
        <Body style={{ maxWidth: 580, marginBottom: 48 }}>
          Encrypted Fi wraps any existing ERC-20 (or SIP-010) token into a
          confidential cToken. Every interaction — transfer, swap, lend, earn —
          is hidden inside a ZK proof. The original token stays 1-to-1 redeemable.
          No new chain. No new wallet. No trust required.
        </Body>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", border: bdr, maxWidth: 860 }}>
          {[
            { step: "01", label: "WRAP",     desc: "Deposit any token. Receive an encrypted cToken commitment note." },
            { step: "02", label: "TRANSACT", desc: "Send, swap, lend, provide LP — all via ZK proofs, no data exposed.", dark: true },
            { step: "03", label: "EARN",     desc: "Your cTokens auto-compound in private yield vaults while hidden." },
            { step: "04", label: "UNWRAP",   desc: "Burn your note. Receive the underlying token + yield back, 1-to-1." },
          ].map((s, i) => (
            <div key={s.step} style={{
              padding: "28px 20px",
              borderRight: i < 3 ? bdr : "none",
              background: s.dark ? ink : "transparent",
              color: s.dark ? white : ink,
            }}>
              <div style={{ fontFamily: mono, fontSize: "0.5rem", letterSpacing: "0.16em", opacity: 0.45, marginBottom: 10 }}>{s.step}</div>
              <div style={{ fontFamily: serif, fontWeight: 900, fontSize: "1.1rem", marginBottom: 10 }}>{s.label}</div>
              <div style={{ fontFamily: sans, fontSize: "0.75rem", lineHeight: 1.6, opacity: 0.75 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </Center>
    );

    // ── 5: Product Overview ───────────────────────────────────────────────────
    case 5: return (
      <Row
        left={
          <>
            <Tag>PRODUCT</Tag>
            <H1>Three layers.<br />One<br /><em style={{ fontStyle: "italic" }}>seamless stack.</em></H1>
            <Body style={{ marginTop: 24 }}>
              Encrypted Fi ships as three composable components: on-chain contracts,
              a ZK proving SDK, and an explorer. Each layer can be consumed independently
              by third-party protocols.
            </Body>
          </>
        }
        right={
          <div>
            {[
              {
                n: "01", label: "Confidential Contracts",
                items: [
                  "ConfidentialToken — wrap/unwrap any ERC-20",
                  "ConfidentialSwapRouter — private AMM trades",
                  "ConfidentialLendingVault — private borrow/collateral",
                  "ConfidentialLPVault — hidden LP positions",
                  "ConfidentialGovernance — ZK vote proofs",
                  "YieldVault — ERC-4626 yield, fully encrypted",
                ],
              },
              {
                n: "02", label: "JavaScript / TypeScript SDK",
                items: [
                  "wrap(), transfer(), swap(), borrow(), repay()",
                  "addLiquidity(), removeLiquidity(), castVote()",
                  "Off-chain Groth16 proof generation (browser + Node)",
                  "ECIES note encryption / decryption",
                  "Wallet-agnostic — works with ethers.js, viem",
                ],
              },
              {
                n: "03", label: "On-chain Explorer",
                items: [
                  "View encrypted transaction history (self-decrypting)",
                  "Merkle tree visualiser — proves inclusion without revealing balance",
                  "Nullifier status — confirm spends without linking identity",
                ],
              },
            ].map(s => (
              <div key={s.n} style={{ marginBottom: 22, paddingBottom: 22, borderBottom: "1px solid rgba(10,10,10,0.08)" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "baseline", marginBottom: 10 }}>
                  <span style={{ fontFamily: mono, fontSize: "0.5rem", letterSpacing: "0.14em",
                    background: ink, color: white, padding: "2px 8px" }}>{s.n}</span>
                  <span style={{ fontFamily: serif, fontWeight: 700, fontSize: "0.92rem" }}>{s.label}</span>
                </div>
                <div style={{ paddingLeft: 4, display: "flex", flexDirection: "column", gap: 5 }}>
                  {s.items.map(it => (
                    <div key={it} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ color: soft, fontSize: "0.7rem", marginTop: 2, flexShrink: 0 }}>—</span>
                      <span style={{ fontFamily: sans, fontSize: "0.75rem", color: soft, lineHeight: 1.5 }}>{it}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        }
      />
    );

    // ── 6: How It Works ───────────────────────────────────────────────────────
    case 6: return (
      <Row
        left={
          <>
            <Tag>TECHNOLOGY</Tag>
            <H1>Cryptography<br />you can<br /><em style={{ fontStyle: "italic" }}>verify on-chain.</em></H1>
            <Body style={{ marginTop: 24 }}>
              Every operation is verified by a ZK-SNARK proof submitted to a
              Solidity verifier contract. No trusted intermediary. No admin key.
              No ability to freeze, censor, or de-anonymise users.
            </Body>
          </>
        }
        right={
          <div>
            {[
              { label: "Commitment scheme",  tech: "Poseidon hash",      desc: "Token amounts are stored as Poseidon-hashed commitments in an on-chain Merkle tree. Only the note holder knows the preimage (secret + amount)." },
              { label: "Nullifier system",   tech: "Poseidon(secret, nonce)", desc: "Each note generates a unique nullifier. When spent, it's posted on-chain — preventing double-spends without linking the note to its creator." },
              { label: "ZK-SNARK circuits",  tech: "Circom + Groth16",   desc: "Mint, burn, transfer, swap, vote circuits. ~200k constraints each. Sub-second browser proving. ~30k gas on-chain verification." },
              { label: "Note encryption",    tech: "ECIES / secp256k1",  desc: "Ciphertexts posted on-chain so recipients self-scan. No server, no relayer, no trusted third party required." },
              { label: "Oracle integration", tech: "Chainlink-compatible", desc: "Price feeds for lending LTV. Permissionless oracle registration. Works with any latestAnswer() compatible feed." },
            ].map((t, i) => (
              <div key={t.label} style={{ display: "flex", gap: 16, marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid rgba(10,10,10,0.07)" }}>
                <div style={{ flex: "0 0 120px" }}>
                  <div style={{ fontFamily: mono, fontSize: "0.52rem", letterSpacing: "0.1em", color: soft, marginBottom: 2 }}>{t.label.toUpperCase()}</div>
                  <div style={{ fontFamily: serif, fontWeight: 700, fontSize: "0.82rem" }}>{t.tech}</div>
                </div>
                <div style={{ fontFamily: sans, fontSize: "0.75rem", color: soft, lineHeight: 1.6 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        }
      />
    );

    // ── 7: DeFi Suite ─────────────────────────────────────────────────────────
    case 7: return (
      <Center>
        <Tag>DEFI CAPABILITIES</Tag>
        <H1 style={{ marginBottom: 14 }}>
          Privacy for every<br /><em style={{ fontStyle: "italic" }}>DeFi primitive.</em>
        </H1>
        <Body style={{ maxWidth: 540, marginBottom: 40 }}>
          Encrypted Fi covers the full DeFi stack out of the box. Any protocol
          can integrate by pointing their users to our SDK.
        </Body>
        <Grid3 items={[
          { icon: "🔒", label: "Private Transfers",   sub: "Sender, receiver, and amount are all ZK-verified. On-chain proof of validity. Zero information leaked." },
          { icon: "🔄", label: "Confidential Swaps",  sub: "Trade on any Uniswap V2/V3 fork without broadcasting trade size, direction, or counterparty." },
          { icon: "📈", label: "Encrypted Yield",     sub: "Deposit into ERC-4626 yield vaults. Earn yield while keeping balance and strategy private." },
          { icon: "💰", label: "Private Lending",     sub: "Borrow against cToken collateral at 75% LTV. Position size never linked to wallet address." },
          { icon: "💧", label: "Hidden LP Positions", sub: "Provide liquidity to any Uniswap V2-compatible pool without advertising your capital deployment." },
          { icon: "🗳",  label: "ZK Governance Votes", sub: "Vote on proposals with cryptographic proof of token ownership. Vote weight private. Nullifier prevents double-voting." },
        ]} />
      </Center>
    );

    // ── 8: Competitive Landscape ──────────────────────────────────────────────
    case 8: return (
      <Row
        left={
          <>
            <Tag>COMPETITION</Tag>
            <H1>No one does<br />this on<br /><em style={{ fontStyle: "italic" }}>existing chains.</em></H1>
            <Body style={{ marginTop: 24 }}>
              Competitors either require a new chain (Zcash, Secret Network, Aztec),
              sacrifice composability, or cover only transfers — not the full DeFi stack.
              Encrypted Fi is the first modular privacy layer for existing EVM and Stacks chains.
            </Body>
          </>
        }
        right={
          <div>
            <div style={{ border: bdr, overflow: "hidden" as const }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr",
                background: ink, color: white, fontFamily: mono, fontSize: "0.52rem",
                letterSpacing: "0.1em", padding: "10px 14px", gap: 0 }}>
                {["CAPABILITY", "ENCRYPTED FI", "TORNADO CASH", "AZTEC", "SECRET NETWORK"].map(h => (
                  <div key={h} style={{ padding: "4px 8px" }}>{h}</div>
                ))}
              </div>
              {[
                ["Existing chain",       "✓", "✓", "✗", "✗"],
                ["Full DeFi stack",      "✓", "✗", "Partial", "Partial"],
                ["Non-custodial",        "✓", "✓", "✓", "✓"],
                ["No new token needed",  "✓", "✓", "✗", "✗"],
                ["ERC-20 compatible",    "✓", "✗", "✗", "✗"],
                ["Governance privacy",   "✓", "✗", "✗", "✗"],
                ["Private LP positions", "✓", "✗", "✗", "✗"],
                ["Multi-chain",          "✓", "✗", "✗", "✗"],
                ["Active / legal",       "✓", "✗ OFAC", "In dev", "✓"],
              ].map((row, ri) => (
                <div key={ri} style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr",
                  background: ri % 2 === 0 ? "transparent" : "rgba(10,10,10,0.025)",
                  borderTop: bdr,
                  fontFamily: sans,
                  fontSize: "0.76rem",
                }}>
                  {row.map((cell, ci) => (
                    <div key={ci} style={{
                      padding: "9px 14px",
                      color: ci === 0 ? ink : cell === "✓" ? "#1a7a40" : cell.startsWith("✗") ? "#aa2a2a" : soft,
                      fontWeight: ci === 0 ? 600 : ci === 1 ? 700 : 400,
                    }}>{cell}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        }
      />
    );

    // ── 9: Business Model ─────────────────────────────────────────────────────
    case 9: return (
      <Row
        left={
          <>
            <Tag>MONETISATION</Tag>
            <H1>Protocol fees<br />on every<br /><em style={{ fontStyle: "italic" }}>interaction.</em></H1>
            <Body style={{ marginTop: 24 }}>
              Encrypted Fi earns a small fee on every wrap, swap, borrow, and LP
              provision. Fees are collected in the input token and accumulate in a
              protocol treasury controlled by governance. No VC unlock cliffs.
              Revenue grows with usage.
            </Body>
          </>
        }
        right={
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              { stream: "Wrap / Unwrap",    fee: "0.05%",  note: "Per deposit or redemption of any cToken" },
              { stream: "Private Swaps",    fee: "0.10%",  note: "Added to AMM LP fee; split protocol / LP" },
              { stream: "Lending",          fee: "0.30%",  note: "Origination fee on each borrow position" },
              { stream: "LP Provision",     fee: "0.05%",  note: "On add and remove liquidity events" },
              { stream: "SDK Licensing",    fee: "Custom", note: "Enterprise / white-label SDK integrations" },
              { stream: "Protocol Treasury", fee: "100%",  note: "All fees flow to governance-controlled multisig" },
            ].map((r, i) => (
              <div key={r.stream} style={{ display: "flex", justifyContent: "space-between",
                alignItems: "flex-start", gap: 16, paddingBottom: 14, borderBottom: "1px solid rgba(10,10,10,0.08)" }}>
                <div>
                  <div style={{ fontFamily: serif, fontWeight: 700, fontSize: "0.88rem", marginBottom: 3 }}>{r.stream}</div>
                  <div style={{ fontFamily: sans, fontSize: "0.75rem", color: soft }}>{r.note}</div>
                </div>
                <div style={{ fontFamily: serif, fontWeight: 900, fontSize: "1.1rem",
                  background: i === 0 ? ink : "transparent", color: i === 0 ? white : ink,
                  padding: i === 0 ? "2px 10px" : 0, flexShrink: 0 }}>
                  {r.fee}
                </div>
              </div>
            ))}
            <div style={{ background: "rgba(10,10,10,0.04)", border: bdr, padding: "14px 18px" }}>
              <div style={{ fontFamily: mono, fontSize: "0.52rem", letterSpacing: "0.12em", color: soft, marginBottom: 6 }}>ILLUSTRATIVE UNIT ECONOMICS</div>
              <div style={{ fontFamily: sans, fontSize: "0.78rem", color: soft, lineHeight: 1.65 }}>
                At $500M TVL with 20% monthly volume turnover: ~$1M ARR from fees alone.
                Each $1B of integrated TVL adds ~$2M in annualised protocol revenue.
              </div>
            </div>
          </div>
        }
      />
    );

    // ── 10: GTM ───────────────────────────────────────────────────────────────
    case 10: return (
      <Row
        left={
          <>
            <Tag>GTM STRATEGY</Tag>
            <H1>Protocol-first.<br /><em style={{ fontStyle: "italic" }}>Then users.</em></H1>
            <Body style={{ marginTop: 24 }}>
              We win by embedding into protocols that already have users, not by
              acquiring retail users one at a time. Each integrated DEX, lending
              protocol, or DAO multiplies our effective reach.
            </Body>
          </>
        }
        right={
          <div>
            {[
              {
                phase: "Phase 1 — Developer Beachhead",
                timeline: "Q2–Q3 2026",
                items: [
                  "Open-source SDK release with full documentation",
                  "Hackathon grants ($50k pool) to seed integrations",
                  "Direct outreach to top 20 DeFi protocols by TVL",
                  "Security audit + bug bounty launch",
                ],
              },
              {
                phase: "Phase 2 — Protocol Integrations",
                timeline: "Q4 2026",
                items: [
                  "3–5 signed protocol integration agreements (DEX / lending)",
                  "Stacks ecosystem launch — native Bitcoin DeFi privacy",
                  "Institutional pilot with one mid-size fund or treasury",
                  "Explorer and analytics dashboard public beta",
                ],
              },
              {
                phase: "Phase 3 — Mainstream Adoption",
                timeline: "2027",
                items: [
                  "10+ integrated protocols, $1B+ TVL target",
                  "Consumer wallet SDK partnerships (MetaMask Snaps, Rabby)",
                  "Governance token launch + protocol decentralisation",
                  "Series A raise based on revenue metrics",
                ],
              },
            ].map(p => (
              <div key={p.phase} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid rgba(10,10,10,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                  <div style={{ fontFamily: serif, fontWeight: 700, fontSize: "0.88rem" }}>{p.phase}</div>
                  <div style={{ fontFamily: mono, fontSize: "0.52rem", letterSpacing: "0.1em", color: soft }}>{p.timeline}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {p.items.map(it => (
                    <div key={it} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: soft, fontSize: "0.7rem", marginTop: 2, flexShrink: 0 }}>→</span>
                      <span style={{ fontFamily: sans, fontSize: "0.75rem", color: soft, lineHeight: 1.55 }}>{it}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        }
      />
    );

    // ── 11: Traction ──────────────────────────────────────────────────────────
    case 11: return (
      <Row
        left={
          <>
            <Tag>TRACTION</Tag>
            <H1>Shipping<br />since day<br /><em style={{ fontStyle: "italic" }}>one.</em></H1>
            <Body style={{ marginTop: 24 }}>
              All core protocol contracts, ZK circuits, and SDK are built and
              functionally complete. No vapourware. We are pre-audit and pre-mainnet —
              raising to get there.
            </Body>
          </>
        }
        right={
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: "0.54rem", letterSpacing: "0.14em", color: soft, marginBottom: 14 }}>COMPLETED</div>
              <Check items={[
                "ZK circuits: mint, burn, transfer, swap, vote (Circom + Groth16)",
                "EVM — ConfidentialToken, Vault, SwapRouter, LendingVault, LPVault, YieldVault, Governance",
                "Stacks / Clarity — SIP-010 parallel implementation",
                "JavaScript SDK — wrap, transfer, swap, borrow, repay, addLiquidity, removeLiquidity, castVote",
                "On-chain explorer with self-decrypting note viewer",
                "Merkle tree & nullifier verification tooling",
                "Full technical documentation and integration guide",
              ]} done />
            </div>
            <div>
              <div style={{ fontFamily: mono, fontSize: "0.54rem", letterSpacing: "0.14em", color: soft, marginBottom: 14 }}>IN PROGRESS / NEXT</div>
              <Check items={[
                "Third-party ZK security audit (scope: all circuits + contracts)",
                "Public testnet deployment with live explorer",
                "First protocol integration partnership",
                "Governance token design and distribution model",
              ]} done={false} />
            </div>
          </div>
        }
      />
    );

    // ── 12: Roadmap ───────────────────────────────────────────────────────────
    case 12: return (
      <Center>
        <Tag>ROADMAP</Tag>
        <H1 style={{ marginBottom: 14 }}>
          12 months to<br /><em style={{ fontStyle: "italic" }}>mainnet and beyond.</em>
        </H1>
        <Body style={{ maxWidth: 520, marginBottom: 44 }}>
          Funded milestones are clear and discrete. Every dollar raised maps to
          a specific deliverable.
        </Body>
        <div style={{ border: bdr, maxWidth: 820, width: "100%" }}>
          {[
            { q: "Q2 2026", label: "Audit & Testnet",        items: ["ZK circuit audit complete", "Smart contract audit complete", "Public testnet + explorer live", "Bug bounty program launch"], dark: true },
            { q: "Q3 2026", label: "Mainnet Launch",          items: ["EVM mainnet deployment (Ethereum + L2s)", "Stacks mainnet deployment", "SDK v1.0 public release", "First 3 protocol integrations"] },
            { q: "Q4 2026", label: "Ecosystem Growth",        items: ["10 protocol integrations", "Institutional pilot closed", "$100M TVL milestone", "Governance token design finalised"] },
            { q: "Q1 2027", label: "Decentralisation",        items: ["Governance token launch", "Protocol decentralisation begins", "Series A raise", "$500M TVL milestone target"] },
          ].map((row, i) => (
            <div key={row.q} style={{
              display: "grid", gridTemplateColumns: "160px 1fr",
              borderBottom: i < 3 ? bdr : "none",
              background: row.dark ? ink : "transparent",
              color: row.dark ? white : ink,
            }}>
              <div style={{ padding: "22px 24px", borderRight: row.dark ? "1px solid rgba(255,255,255,0.12)" : bdr }}>
                <div style={{ fontFamily: mono, fontSize: "0.54rem", letterSpacing: "0.14em", opacity: 0.55, marginBottom: 6 }}>{row.q}</div>
                <div style={{ fontFamily: serif, fontWeight: 900, fontSize: "1rem" }}>{row.label}</div>
              </div>
              <div style={{ padding: "22px 24px", display: "flex", flexWrap: "wrap" as const, gap: "8px 20px" }}>
                {row.items.map(it => (
                  <div key={it} style={{ display: "flex", gap: 8, alignItems: "flex-start", flex: "1 1 200px" }}>
                    <span style={{ opacity: 0.4, flexShrink: 0, marginTop: 2 }}>✓</span>
                    <span style={{ fontFamily: sans, fontSize: "0.75rem", opacity: 0.8, lineHeight: 1.5 }}>{it}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Center>
    );

    // ── 13: Team ──────────────────────────────────────────────────────────────
    case 13: return (
      <Center>
        <Tag>THE TEAM</Tag>
        <H1 style={{ marginBottom: 12 }}>
          Built by people who<br /><em style={{ fontStyle: "italic" }}>care about privacy.</em>
        </H1>
        <Body style={{ maxWidth: 520, marginBottom: 48 }}>
          Deep expertise in applied cryptography, DeFi protocol engineering,
          and go-to-market in the blockchain space.
        </Body>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", border: bdr, maxWidth: 760, width: "100%" }}>
          {[
            { role: "CO-FOUNDER & CEO" },
            { role: "CO-FOUNDER & CTO" },
          ].map((m, i) => (
            <div key={m.role} style={{ padding: "40px 36px", borderRight: i === 0 ? bdr : "none" }}>
              {/* Photo placeholder */}
              <div style={{
                width: 96, height: 96, border: bdr, background: "rgba(10,10,10,0.04)",
                marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: mono, fontSize: "0.5rem", letterSpacing: "0.1em", color: soft }}>PHOTO</span>
              </div>
              {/* Name */}
              <div style={{ fontFamily: serif, fontWeight: 900, fontSize: "1.5rem", marginBottom: 4, color: ink }}>
                Name Here
              </div>
              {/* Role */}
              <div style={{ fontFamily: mono, fontSize: "0.54rem", letterSpacing: "0.16em", color: soft, marginBottom: 20 }}>
                {m.role}
              </div>
              {/* Bio */}
              <div style={{ fontFamily: sans, fontSize: "0.8rem", lineHeight: 1.75, color: soft }}>
                Add your background here — previous experience, relevant expertise in cryptography
                / DeFi / startups, and key accomplishments that establish credibility for building Encrypted Fi.
              </div>
              {/* Social placeholders */}
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                {["Twitter", "LinkedIn", "GitHub"].map(s => (
                  <span key={s} style={{ fontFamily: mono, fontSize: "0.5rem", letterSpacing: "0.1em",
                    border: bdr, padding: "4px 10px", color: soft }}>
                    {s.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Center>
    );

    // ── 14: The Ask ───────────────────────────────────────────────────────────
    case 14: return (
      <Row
        left={
          <>
            <Tag>THE ASK</Tag>
            <H1>Seed round.<br /><em style={{ fontStyle: "italic" }}>Clear use of funds.</em></H1>
            <Body style={{ marginTop: 24 }}>
              We are raising a Seed round to fund the audit, testnet, and mainnet
              launch — the three milestones that take us from a complete but
              unaudited codebase to a live, revenue-generating protocol.
            </Body>
            <div style={{ marginTop: 32, border: bdr, padding: "20px 24px" }}>
              <div style={{ fontFamily: mono, fontSize: "0.52rem", letterSpacing: "0.12em", color: soft, marginBottom: 8 }}>CONTACT</div>
              <div style={{ fontFamily: serif, fontWeight: 700, fontSize: "1rem" }}>hello@encrypted.fi</div>
            </div>
          </>
        }
        right={
          <div>
            <div style={{ border: bdr, overflow: "hidden" as const, marginBottom: 24 }}>
              {[
                { category: "Security Audits",      pct: "35%", detail: "ZK circuits + smart contracts by top-tier firm" },
                { category: "Engineering",          pct: "25%", detail: "Core team runway through mainnet + 6 months" },
                { category: "BD & Integrations",   pct: "20%", detail: "Protocol partnerships, hackathon grants, ecosystem" },
                { category: "Infrastructure",       pct: "10%", detail: "Testnet / mainnet nodes, proving infrastructure" },
                { category: "Legal & Compliance",   pct: "10%", detail: "Regulatory clarity across target markets" },
              ].map((r, i) => (
                <div key={r.category} style={{
                  display: "grid", gridTemplateColumns: "1fr 60px",
                  padding: "14px 18px",
                  borderBottom: i < 4 ? bdr : "none",
                  background: i === 0 ? ink : "transparent",
                  color: i === 0 ? white : ink,
                }}>
                  <div>
                    <div style={{ fontFamily: serif, fontWeight: 700, fontSize: "0.88rem", marginBottom: 3 }}>{r.category}</div>
                    <div style={{ fontFamily: sans, fontSize: "0.72rem", opacity: 0.65 }}>{r.detail}</div>
                  </div>
                  <div style={{ fontFamily: serif, fontWeight: 900, fontSize: "1.3rem", textAlign: "right" as const, alignSelf: "center" }}>
                    {r.pct}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(10,10,10,0.04)", border: bdr, padding: "16px 18px" }}>
              <div style={{ fontFamily: sans, fontSize: "0.78rem", color: soft, lineHeight: 1.65 }}>
                Milestone-based drawdown available. Lead investor receives board observer seat.
                Structured as a SAFE with MFN clause and $[X]M post-money cap.
              </div>
            </div>
          </div>
        }
      />
    );

    // ── 15: Vision / Close ────────────────────────────────────────────────────
    case 15: return (
      <Center>
        <div style={{ fontFamily: mono, fontSize: "0.55rem", letterSpacing: "0.2em", color: soft, marginBottom: 28 }}>
          THE VISION
        </div>
        <H1 style={{ fontSize: "clamp(3rem, 8vw, 7rem)", marginBottom: 28 }}>
          Privacy is not<br />a feature.<br /><em style={{ fontStyle: "italic" }}>It's a right.</em>
        </H1>
        <Body style={{ maxWidth: 580, marginBottom: 52 }}>
          The internet was built open. Commerce moved on anyway. Blockchain is
          repeating the same mistake — public by default, with no path to private.
          Encrypted Fi changes that. We're not hiding anything. We're giving
          everyone the ability to decide what they share.
        </Body>
        <div style={{ display: "flex", gap: 0, border: bdr }}>
          {[
            { label: "ENCRYPTED FI",       val: "The privacy layer" },
            { label: "EVERY CHAIN",        val: "Not just one" },
            { label: "EVERY PRIMITIVE",    val: "Not just transfers" },
          ].map((s, i) => (
            <div key={s.label} style={{
              padding: "20px 28px", borderRight: i < 2 ? bdr : "none",
              background: i === 0 ? ink : "transparent",
              color: i === 0 ? white : ink,
              textAlign: "center" as const,
            }}>
              <div style={{ fontFamily: mono, fontSize: "0.5rem", letterSpacing: "0.14em", opacity: 0.5, marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontFamily: serif, fontWeight: 900, fontSize: "1rem" }}>{s.val}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 52, fontFamily: mono, fontSize: "0.54rem", letterSpacing: "0.2em", color: soft }}>
          CONFIDENTIAL · hello@encrypted.fi · encrypted.fi
        </div>
      </Center>
    );

    default: return <Center><Body>Slide not found.</Body></Center>;
  }
}

// ─── Main client component ────────────────────────────────────────────────────

export default function SlideClient({ current, total, meta }: {
  current: number;
  total: number;
  meta: Slide;
}) {
  const router = useRouter();

  const go = useCallback((n: number) => {
    if (n < 1 || n > total) return;
    router.push(`/pitch/${n}`);
  }, [router, total]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") go(current + 1);
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")                     go(current - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, go]);

  const canPrev = current > 1;
  const canNext = current < total;

  return (
    <div style={{
      minHeight: "100dvh",
      background: cream,
      display: "flex",
      flexDirection: "column",
      fontFamily: sans,
    }}>

      {/* ── Top bar ─────────────────────────────────────────────── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        background: cream, borderBottom: bdr,
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(16px, 4vw, 48px)",
        height: 52,
        gap: 16,
      }}>
        {/* Brand */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: ink, flexShrink: 0 }}>
          <Image
            src="https://image2url.com/r2/default/images/1771982865555-91a426af-ecd8-4ca9-8e6b-11372ff845bf.png"
            alt="Encrypted Fi"
            width={26}
            height={26}
            style={{ objectFit: "contain" }}
          />
          <span style={{ fontFamily: serif, fontWeight: 900, fontSize: "0.72rem", letterSpacing: "0.06em" }}>
            ENCRYPTED <span style={{ background: ink, color: white, padding: "1px 4px", marginLeft: 2 }}>FI</span>
          </span>
        </a>

        {/* Slide label */}
        <div style={{ fontFamily: mono, fontSize: "0.55rem", letterSpacing: "0.15em", color: soft }}>
          {meta.category}
        </div>

        {/* Counter */}
        <div style={{ fontFamily: mono, fontSize: "0.55rem", letterSpacing: "0.12em", color: soft, flexShrink: 0 }}>
          {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>

      {/* ── Progress bar ────────────────────────────────────────── */}
      <div style={{ height: 3, background: "rgba(10,10,10,0.08)" }}>
        <div style={{ height: "100%", background: ink, width: `${(current / total) * 100}%`, transition: "width 0.3s ease" }} />
      </div>

      {/* ── Slide content ────────────────────────────────────────── */}
      <div style={{ flex: 1, padding: "0 clamp(20px, 5vw, 72px)", display: "flex", flexDirection: "column" }}>
        <SlideContent n={current} />
      </div>

      {/* ── Bottom nav ───────────────────────────────────────────── */}
      <div style={{
        borderTop: bdr,
        padding: "0 clamp(16px, 4vw, 48px)",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}>
        {/* Prev */}
        <button
          onClick={() => go(current - 1)}
          disabled={!canPrev}
          style={{
            fontFamily: mono, fontSize: "0.58rem", letterSpacing: "0.12em", fontWeight: 700,
            padding: "8px 18px", border: bdr,
            background: canPrev ? ink : "transparent",
            color: canPrev ? white : "rgba(10,10,10,0.2)",
            cursor: canPrev ? "pointer" : "default",
            transition: "all 0.15s",
          }}
        >
          ← PREV
        </button>

        {/* Dot track */}
        <div style={{ display: "flex", gap: 5, alignItems: "center", overflow: "hidden", maxWidth: "60vw" }}>
          {Array.from({ length: total }, (_, i) => i + 1).map(i => (
            <button
              key={i}
              onClick={() => go(i)}
              title={`Slide ${i}`}
              style={{
                width: i === current ? 22 : 6,
                height: 6,
                flexShrink: 0,
                background: i === current ? ink : "rgba(10,10,10,0.18)",
                border: "none", padding: 0, cursor: "pointer",
                transition: "width 0.2s, background 0.15s",
              }}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => go(current + 1)}
          disabled={!canNext}
          style={{
            fontFamily: mono, fontSize: "0.58rem", letterSpacing: "0.12em", fontWeight: 700,
            padding: "8px 18px", border: bdr,
            background: canNext ? ink : "transparent",
            color: canNext ? white : "rgba(10,10,10,0.2)",
            cursor: canNext ? "pointer" : "default",
            transition: "all 0.15s",
          }}
        >
          NEXT →
        </button>
      </div>

      {/* ── Slide thumbnail strip ─────────────────────────────────── */}
      <div style={{
        borderTop: bdr,
        display: "flex",
        overflowX: "auto" as const,
        background: cream,
      }}>
        {Array.from({ length: total }, (_, i) => i + 1).map(i => (
          <button
            key={i}
            onClick={() => go(i)}
            style={{
              fontFamily: mono, fontSize: "0.48rem", letterSpacing: "0.1em",
              padding: "10px 14px", whiteSpace: "nowrap" as const,
              background: i === current ? ink : "transparent",
              color: i === current ? white : soft,
              border: "none", borderRight: bdr,
              cursor: "pointer", transition: "all 0.15s",
            }}
          >
            {String(i).padStart(2, "0")} {i === current ? "— " : ""}
            {["COVER","PROBLEM","MARKET","SOLUTION","PRODUCT","TECHNOLOGY","CAPABILITIES",
              "COMPETITION","MONETISATION","GTM","TRACTION","ROADMAP","TEAM","THE ASK","VISION"][i - 1]}
          </button>
        ))}
      </div>
    </div>
  );
}
