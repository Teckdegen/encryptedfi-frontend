"use client";

import { useState, useCallback } from "react";

// ─── Slide data ───────────────────────────────────────────────────────────────

const SLIDES = [
  // 0 — Cover
  {
    id: "cover",
    label: "01 / COVER",
    render: () => (
      <div style={styles.center}>
        <div style={styles.eyebrow}>INVESTOR PITCH · 2026</div>
        <h2 style={{ ...styles.bigH, fontSize: "clamp(3.2rem, 9vw, 7rem)", marginBottom: 28 }}>
          Encrypted<br />
          <em style={{ fontStyle: "italic", fontWeight: 700 }}>Fi</em>
        </h2>
        <p style={styles.sub}>
          The privacy layer for public blockchains.<br />
          Any token. Any chain. Zero knowledge.
        </p>
        <div style={{ marginTop: 48, display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" as const }}>
          {[
            { n: "100%", l: "Private balances" },
            { n: "ZK",   l: "Proof every op"   },
            { n: "0",    l: "Trust required"   },
          ].map(s => (
            <div key={s.l} style={styles.stat}>
              <div style={styles.statNum}>{s.n}</div>
              <div style={styles.statLbl}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // 1 — Problem
  {
    id: "problem",
    label: "02 / THE PROBLEM",
    render: () => (
      <div style={styles.twoCol}>
        <div style={styles.leftCol}>
          <div style={styles.eyebrow}>THE PROBLEM</div>
          <h2 style={styles.bigH}>
            Every transaction is a<br />
            <em style={{ fontStyle: "italic" }}>public confession.</em>
          </h2>
        </div>
        <div style={styles.rightCol}>
          {[
            { icon: "👁", title: "Total transparency", body: "Every wallet, balance, and transfer is readable by anyone on chain. Competitors, front-runners, and adversaries can surveil your every move in real time." },
            { icon: "⚡", title: "Front-running & MEV", body: "Visible pending transactions allow bots to extract value before your trade settles. An estimated $1B+ extracted from DeFi users annually." },
            { icon: "🎯", title: "Targeted attacks", body: "Public balances make wealthy wallets easy targets for phishing, social engineering, and protocol exploits directed at known holders." },
            { icon: "🏛", title: "Institutional blockers", body: "No enterprise treasury or fund can operate on-chain without exposing strategy. Privacy is the missing piece for institutional adoption." },
          ].map(p => (
            <div key={p.title} style={styles.problemRow}>
              <span style={styles.problemIcon}>{p.icon}</span>
              <div>
                <div style={styles.problemTitle}>{p.title}</div>
                <div style={styles.problemBody}>{p.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // 2 — Solution
  {
    id: "solution",
    label: "03 / THE SOLUTION",
    render: () => (
      <div style={styles.center}>
        <div style={styles.eyebrow}>THE SOLUTION</div>
        <h2 style={{ ...styles.bigH, marginBottom: 20 }}>
          Privacy as a layer,<br />
          <em style={{ fontStyle: "italic" }}>not a chain.</em>
        </h2>
        <p style={{ ...styles.sub, maxWidth: 620, marginBottom: 56 }}>
          Encrypted Fi wraps any existing ERC-20 or SIP-010 token into a confidential version.
          Balances, transfers, and DeFi interactions are hidden inside ZK proofs.
          The original token is redeemable 1-to-1 at any time.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "var(--border)", maxWidth: 760, margin: "0 auto" }}>
          {[
            { step: "01", label: "WRAP",    desc: "Deposit any token. Receive an encrypted cToken note." },
            { step: "02", label: "TRANSACT", desc: "Send, swap, lend, LP — all privately via ZK proofs."  },
            { step: "03", label: "UNWRAP",  desc: "Burn your note. Receive the underlying token back."  },
          ].map((s, i) => (
            <div key={s.step} style={{
              padding: "32px 24px",
              borderRight: i < 2 ? "var(--border)" : "none",
              background: i === 1 ? "var(--ink)" : "transparent",
              color: i === 1 ? "var(--white)" : "var(--ink)",
            }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.18em", opacity: 0.5, marginBottom: 10 }}>{s.step}</div>
              <div style={{ fontFamily: "var(--font-serif)", fontWeight: 900, fontSize: "1.4rem", marginBottom: 12 }}>{s.label}</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", lineHeight: 1.65, opacity: 0.75 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // 3 — How It Works
  {
    id: "how",
    label: "04 / HOW IT WORKS",
    render: () => (
      <div style={styles.twoCol}>
        <div style={styles.leftCol}>
          <div style={styles.eyebrow}>HOW IT WORKS</div>
          <h2 style={styles.bigH}>
            ZK proofs on<br />
            <em style={{ fontStyle: "italic" }}>every operation.</em>
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", lineHeight: 1.75, color: "var(--ink-soft)", marginTop: 20 }}>
            Every action — wrap, transfer, swap, borrow, vote — is verified by a
            zero-knowledge SNARK proof on-chain. No trusted setup required after deployment.
            No admin keys. No pause buttons.
          </p>
        </div>
        <div style={styles.rightCol}>
          {[
            { n: "1", title: "Commitment scheme", body: "Token amounts are stored as Poseidon-hashed commitments in a Merkle tree. Only the note holder knows the preimage." },
            { n: "2", title: "Nullifier system", body: "Each note has a unique nullifier. When spent, the nullifier is posted on-chain to prevent double-spending — without revealing the note." },
            { n: "3", title: "ZK-SNARK proofs", body: "Groth16 / PLONK circuits verify ownership and amounts off-chain. The on-chain verifier confirms the proof in ~30k gas." },
            { n: "4", title: "ECIES encryption", body: "Encrypted note ciphertexts are posted on-chain so recipients can scan and decrypt their incoming notes without a server." },
          ].map(p => (
            <div key={p.n} style={styles.problemRow}>
              <span style={{ ...styles.problemIcon, background: "var(--ink)", color: "var(--white)", width: 28, height: 28, borderRadius: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem", fontFamily: "var(--font-mono)", flexShrink: 0 }}>{p.n}</span>
              <div>
                <div style={styles.problemTitle}>{p.title}</div>
                <div style={styles.problemBody}>{p.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // 4 — DeFi Capabilities
  {
    id: "defi",
    label: "05 / DEFI CAPABILITIES",
    render: () => (
      <div style={styles.center}>
        <div style={styles.eyebrow}>DEFI CAPABILITIES</div>
        <h2 style={{ ...styles.bigH, marginBottom: 40 }}>
          Privacy for every<br />
          <em style={{ fontStyle: "italic" }}>DeFi primitive.</em>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "var(--border)", maxWidth: 820, margin: "0 auto" }}>
          {[
            { icon: "🔒", label: "Private Transfers",   desc: "Sender, receiver, amount — all hidden" },
            { icon: "🔄", label: "Confidential Swaps",  desc: "DEX trades with zero-knowledge proofs" },
            { icon: "📈", label: "Private Yield",        desc: "ERC-4626 vaults with encrypted deposits" },
            { icon: "💰", label: "Anonymous Lending",    desc: "Borrow & collateral positions private" },
            { icon: "💧", label: "Hidden LP Positions",  desc: "Provide liquidity without broadcasting" },
            { icon: "🗳", label: "ZK Governance",        desc: "Vote without revealing your balance" },
          ].map((c, i) => (
            <div key={c.label} style={{
              padding: "28px 22px",
              borderRight: (i % 3 < 2) ? "var(--border)" : "none",
              borderBottom: i < 3 ? "var(--border)" : "none",
              background: i === 1 || i === 4 ? "var(--cream-mid)" : "transparent",
            }}>
              <div style={{ fontSize: "1.5rem", marginBottom: 10 }}>{c.icon}</div>
              <div style={{ fontFamily: "var(--font-serif)", fontWeight: 900, fontSize: "0.95rem", marginBottom: 6 }}>{c.label}</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--ink-soft)", lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // 5 — Tech Stack
  {
    id: "tech",
    label: "06 / TECHNOLOGY",
    render: () => (
      <div style={styles.twoCol}>
        <div style={styles.leftCol}>
          <div style={styles.eyebrow}>TECHNOLOGY</div>
          <h2 style={styles.bigH}>
            Built on<br />
            <em style={{ fontStyle: "italic" }}>proven cryptography.</em>
          </h2>
        </div>
        <div style={styles.rightCol}>
          {[
            { label: "ZK Circuits",        tech: "Circom + SnarkJS",  desc: "Mint, burn, transfer, swap, vote circuits. Auditable, open source." },
            { label: "Proof System",        tech: "Groth16 / PLONK",  desc: "Sub-second proving on any device. ~30k gas verification on-chain." },
            { label: "Hash Function",       tech: "Poseidon",          desc: "ZK-friendly hash for commitments and nullifiers. Battle-tested." },
            { label: "Encryption",          tech: "ECIES / secp256k1", desc: "Encrypted notes posted on-chain. Recipients self-scan and decrypt." },
            { label: "EVM Contracts",       tech: "Solidity 0.8.20",   desc: "OpenZeppelin base, Uniswap V2 compatible, fully immutable." },
            { label: "Stacks Contracts",    tech: "Clarity",           desc: "SIP-010 native. Same ZK model. Native Bitcoin settlement." },
          ].map(t => (
            <div key={t.label} style={{ display: "flex", gap: 16, marginBottom: 18, paddingBottom: 18, borderBottom: "1px solid rgba(10,10,10,0.08)" }}>
              <div style={{ flex: "0 0 130px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.12em", color: "var(--ink-soft)", marginBottom: 2 }}>{t.label}</div>
                <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "0.88rem" }}>{t.tech}</div>
              </div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--ink-soft)", lineHeight: 1.6 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // 6 — Market
  {
    id: "market",
    label: "07 / MARKET OPPORTUNITY",
    render: () => (
      <div style={styles.center}>
        <div style={styles.eyebrow}>MARKET OPPORTUNITY</div>
        <h2 style={{ ...styles.bigH, marginBottom: 16 }}>
          A $2T+ market with<br />
          <em style={{ fontStyle: "italic" }}>zero privacy.</em>
        </h2>
        <p style={{ ...styles.sub, maxWidth: 580, marginBottom: 48 }}>
          Every dollar on-chain today is fully transparent. Encrypted Fi is the
          privacy middleware layer the entire ecosystem needs.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, border: "var(--border)", maxWidth: 700, margin: "0 auto" }}>
          {[
            { n: "$2T+",  l: "Total crypto market cap"    },
            { n: "$100B+", l: "DeFi total value locked"   },
            { n: "0%",    l: "On-chain privacy solutions" },
            { n: "∞",    l: "Total addressable market"    },
          ].map((s, i) => (
            <div key={s.l} style={{
              padding: "36px 32px",
              borderRight: i % 2 === 0 ? "var(--border)" : "none",
              borderBottom: i < 2 ? "var(--border)" : "none",
              background: i === 0 ? "var(--ink)" : "transparent",
              color: i === 0 ? "var(--white)" : "var(--ink)",
            }}>
              <div style={{ fontFamily: "var(--font-serif)", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: 8 }}>{s.n}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.14em", opacity: 0.55 }}>{s.l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // 7 — Traction / Roadmap
  {
    id: "traction",
    label: "08 / TRACTION & ROADMAP",
    render: () => (
      <div style={styles.twoCol}>
        <div style={styles.leftCol}>
          <div style={styles.eyebrow}>TRACTION & ROADMAP</div>
          <h2 style={styles.bigH}>
            Built in public.<br />
            <em style={{ fontStyle: "italic" }}>Launching soon.</em>
          </h2>
        </div>
        <div style={styles.rightCol}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.14em", marginBottom: 16, color: "var(--ink-soft)" }}>COMPLETED</div>
            {[
              "Core ZK circuits (mint, burn, transfer)",
              "EVM Vault + ConfidentialToken contracts",
              "Stacks / Clarity parallel implementation",
              "Confidential Swap Router",
              "Confidential Lending Vault",
              "Confidential LP Vault (Uniswap V2+)",
              "ZK Governance voting system",
              "ERC-4626 Yield Vault",
              "JavaScript SDK (wrap, transfer, swap, borrow, LP, vote)",
            ].map(item => (
              <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                <span style={{ color: "var(--ink)", fontWeight: 700, marginTop: 1 }}>✓</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--ink-soft)" }}>{item}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.14em", marginBottom: 16, color: "var(--ink-soft)" }}>UPCOMING</div>
            {[
              "Audit by top ZK security firm",
              "Testnet launch with SDK + explorer",
              "Mainnet deployment (EVM + Stacks)",
              "Partner integrations (DEXs, lending protocols)",
            ].map(item => (
              <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                <span style={{ color: "rgba(10,10,10,0.25)", fontWeight: 700, marginTop: 1 }}>○</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--ink-soft)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  // 8 — Team
  {
    id: "team",
    label: "09 / TEAM",
    render: () => (
      <div style={styles.center}>
        <div style={styles.eyebrow}>THE TEAM</div>
        <h2 style={{ ...styles.bigH, marginBottom: 12 }}>
          Built by people who<br />
          <em style={{ fontStyle: "italic" }}>care about privacy.</em>
        </h2>
        <p style={{ ...styles.sub, marginBottom: 52 }}>
          Deep expertise in cryptography, DeFi, and protocol engineering.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, border: "var(--border)", maxWidth: 720, margin: "0 auto" }}>
          {/* Member 1 */}
          <div style={{ padding: "36px 32px", borderRight: "var(--border)" }}>
            {/* Image placeholder */}
            <div style={{
              width: 88, height: 88,
              border: "var(--border)",
              background: "var(--cream-mid)",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.12em", color: "var(--ink-soft)", textAlign: "center" as const }}>
                PHOTO
              </span>
            </div>
            {/* Name */}
            <div style={{ fontFamily: "var(--font-serif)", fontWeight: 900, fontSize: "1.3rem", marginBottom: 4 }}>
              Your Name Here
            </div>
            {/* Title */}
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.14em", color: "var(--ink-soft)", marginBottom: 16 }}>
              CO-FOUNDER & CEO
            </div>
            {/* Bio / experience */}
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", lineHeight: 1.7, color: "var(--ink-soft)" }}>
              Your experience and background here. Previous roles, relevant expertise, and key accomplishments that establish your credibility for building Encrypted Fi.
            </div>
          </div>

          {/* Member 2 */}
          <div style={{ padding: "36px 32px" }}>
            <div style={{
              width: 88, height: 88,
              border: "var(--border)",
              background: "var(--cream-mid)",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.12em", color: "var(--ink-soft)", textAlign: "center" as const }}>
                PHOTO
              </span>
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontWeight: 900, fontSize: "1.3rem", marginBottom: 4 }}>
              Your Name Here
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.14em", color: "var(--ink-soft)", marginBottom: 16 }}>
              CO-FOUNDER & CTO
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", lineHeight: 1.7, color: "var(--ink-soft)" }}>
              Your experience and background here. Previous roles, relevant expertise, and key accomplishments that establish your credibility for building Encrypted Fi.
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // 9 — Ask / CTA
  {
    id: "ask",
    label: "10 / THE ASK",
    render: () => (
      <div style={styles.center}>
        <div style={styles.eyebrow}>THE ASK</div>
        <h2 style={{ ...styles.bigH, fontSize: "clamp(2.8rem, 8vw, 6rem)", marginBottom: 24 }}>
          Let's encrypt<br />
          <em style={{ fontStyle: "italic" }}>the future.</em>
        </h2>
        <p style={{ ...styles.sub, maxWidth: 560, marginBottom: 48 }}>
          We're raising a seed round to fund our audit, testnet launch, and
          the first wave of protocol integrations. If you believe privacy is
          a fundamental right on-chain — let's talk.
        </p>
        <div style={{ display: "flex", gap: 0, border: "var(--border)", maxWidth: 600, margin: "0 auto 48px", flexWrap: "wrap" as const }}>
          {[
            { label: "Round",      val: "Seed"          },
            { label: "Use of funds", val: "Audit, launch, BD" },
            { label: "Contact",    val: "hello@encrypted.fi" },
          ].map((r, i) => (
            <div key={r.label} style={{
              flex: "1 1 160px",
              padding: "24px 20px",
              borderRight: i < 2 ? "var(--border)" : "none",
            }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.14em", color: "var(--ink-soft)", marginBottom: 6 }}>{r.label.toUpperCase()}</div>
              <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "0.95rem" }}>{r.val}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.18em", color: "var(--ink-soft)" }}>
          ENCRYPTED FI · PRIVACY FOR PUBLIC CHAINS
        </div>
      </div>
    ),
  },
];

// ─── Shared micro-styles ──────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: "100%",
    padding: "40px 20px",
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr",
    gap: 0,
    height: "100%",
    alignItems: "center",
  },
  leftCol: {
    padding: "40px 40px 40px 0",
    borderRight: "var(--border)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  rightCol: {
    padding: "40px 0 40px 40px",
    height: "100%",
    overflowY: "auto" as const,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  eyebrow: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.58rem",
    letterSpacing: "0.18em",
    fontWeight: 700,
    background: "var(--ink)",
    color: "var(--cream)",
    padding: "5px 14px",
    display: "inline-block",
    marginBottom: 28,
    alignSelf: "flex-start",
  },
  bigH: {
    fontFamily: "var(--font-serif)",
    fontWeight: 900,
    fontSize: "clamp(2.2rem, 5vw, 4rem)",
    lineHeight: 0.97,
    letterSpacing: "-0.03em",
    color: "var(--ink)",
  },
  sub: {
    fontFamily: "var(--font-sans)",
    fontSize: "clamp(0.92rem, 1.8vw, 1.05rem)",
    lineHeight: 1.75,
    color: "var(--ink-soft)",
  },
  stat: {
    textAlign: "center" as const,
    padding: "16px 28px",
    border: "var(--border)",
    minWidth: 110,
  },
  statNum: {
    fontFamily: "var(--font-serif)",
    fontWeight: 900,
    fontSize: "2rem",
    marginBottom: 4,
    lineHeight: 1,
  },
  statLbl: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.52rem",
    letterSpacing: "0.14em",
    color: "var(--ink-soft)",
  },
  problemRow: {
    display: "flex",
    gap: 14,
    alignItems: "flex-start",
    marginBottom: 22,
    paddingBottom: 22,
    borderBottom: "1px solid rgba(10,10,10,0.08)",
  },
  problemIcon: {
    fontSize: "1.2rem",
    lineHeight: 1,
    flexShrink: 0,
    marginTop: 2,
  },
  problemTitle: {
    fontFamily: "var(--font-serif)",
    fontWeight: 700,
    fontSize: "0.95rem",
    marginBottom: 4,
  },
  problemBody: {
    fontFamily: "var(--font-sans)",
    fontSize: "0.78rem",
    lineHeight: 1.65,
    color: "var(--ink-soft)",
  },
};

// ─── PitchDeck component ──────────────────────────────────────────────────────

export default function PitchDeck() {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent(c => Math.min(SLIDES.length - 1, c + 1)), []);

  const slide = SLIDES[current];

  return (
    <section id="pitch" style={{
      background: "var(--cream)",
      borderTop: "var(--border)",
    }}>
      {/* Section header */}
      <div style={{
        padding: "0 20px",
        borderBottom: "var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 56,
      }}>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.58rem",
          letterSpacing: "0.18em",
          fontWeight: 700,
          color: "var(--ink)",
        }}>
          INVESTOR PITCH
        </div>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.55rem",
          letterSpacing: "0.12em",
          color: "var(--ink-soft)",
        }}>
          {slide.label}
        </div>
      </div>

      {/* Slide viewport */}
      <div style={{
        minHeight: "min(88vh, 720px)",
        padding: "48px clamp(20px, 5vw, 80px)",
        position: "relative" as const,
        display: "flex",
        flexDirection: "column",
      }}>

        {/* Slide content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }} key={slide.id}>
          {slide.render()}
        </div>

        {/* Navigation bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 48,
          paddingTop: 24,
          borderTop: "var(--border)",
        }}>
          {/* Prev */}
          <button
            onClick={prev}
            disabled={current === 0}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.12em",
              fontWeight: 700,
              padding: "10px 20px",
              border: "var(--border)",
              background: current === 0 ? "transparent" : "var(--ink)",
              color: current === 0 ? "rgba(10,10,10,0.25)" : "var(--white)",
              cursor: current === 0 ? "default" : "pointer",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            ← PREV
          </button>

          {/* Dot indicators */}
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: i === current ? 20 : 8,
                  height: 8,
                  background: i === current ? "var(--ink)" : "rgba(10,10,10,0.2)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width 0.2s, background 0.15s",
                }}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            disabled={current === SLIDES.length - 1}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.12em",
              fontWeight: 700,
              padding: "10px 20px",
              border: "var(--border)",
              background: current === SLIDES.length - 1 ? "transparent" : "var(--ink)",
              color: current === SLIDES.length - 1 ? "rgba(10,10,10,0.25)" : "var(--white)",
              cursor: current === SLIDES.length - 1 ? "default" : "pointer",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            NEXT →
          </button>
        </div>
      </div>

      {/* Slide list (mini TOC below viewport) */}
      <div style={{
        borderTop: "var(--border)",
        display: "flex",
        overflowX: "auto" as const,
      }}>
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrent(i)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.52rem",
              letterSpacing: "0.1em",
              padding: "12px 18px",
              background: i === current ? "var(--ink)" : "transparent",
              color: i === current ? "var(--white)" : "var(--ink-soft)",
              border: "none",
              borderRight: "var(--border)",
              cursor: "pointer",
              whiteSpace: "nowrap" as const,
              transition: "background 0.15s, color 0.15s",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </section>
  );
}
