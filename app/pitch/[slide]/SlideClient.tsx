"use client";

import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import type { Slide } from "../slides";
import Image from "next/image";

// ─── CSS vars ─────────────────────────────────────────────────────────────────
const ink   = "var(--ink)";
const cream = "var(--cream)";
const white = "var(--white)";
const serif = "var(--font-serif)";
const mono  = "var(--font-mono)";
const sans  = "var(--font-sans)";
const bdr   = "var(--border)";
const soft  = "var(--ink-soft)";

// topbar 48px + progress 3px + bottomnav 48px + strip 32px = 131px
const CHROME = "131px";

// ─── SVG icons ────────────────────────────────────────────────────────────────
const Svg = ({ d, d2, size = 24 }: { d: string; d2?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />{d2 && <path d={d2} />}
  </svg>
);
const I = (s = 24) => ({ s });
const IconEye       = ({ s = 24 }: { s?: number }) => <Svg size={s} d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" d2="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />;
const IconZap       = ({ s = 24 }: { s?: number }) => <Svg size={s} d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />;
const IconBuilding  = ({ s = 24 }: { s?: number }) => <Svg size={s} d="M3 21h18M9 8h1m5 0h1M9 12h1m5 0h1M9 16h1m5 0h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />;
const IconTarget    = ({ s = 24 }: { s?: number }) => <Svg size={s} d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-14a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />;
const IconLock      = ({ s = 24 }: { s?: number }) => <Svg size={s} d="M18 11H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM8 11V7a4 4 0 0 1 8 0v4" />;
const IconArrows    = ({ s = 24 }: { s?: number }) => <Svg size={s} d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4" />;
const IconTrend     = ({ s = 24 }: { s?: number }) => <Svg size={s} d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />;
const IconCoin      = ({ s = 24 }: { s?: number }) => <Svg size={s} d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm-1 7h2m-1 0v5m-2 0h4" />;
const IconDroplet   = ({ s = 24 }: { s?: number }) => <Svg size={s} d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />;
const IconVote      = ({ s = 24 }: { s?: number }) => <Svg size={s} d="M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9" />;
const IconShield    = ({ s = 24 }: { s?: number }) => <Svg size={s} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />;
const IconKey       = ({ s = 24 }: { s?: number }) => <Svg size={s} d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />;
const IconCircuit   = ({ s = 24 }: { s?: number }) => <Svg size={s} d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />;
const IconLink      = ({ s = 24 }: { s?: number }) => <Svg size={s} d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />;
const IconFileCheck = ({ s = 24 }: { s?: number }) => <Svg size={s} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-2 13l-3-3 1.41-1.41L12 12.17l4.59-4.58L18 9l-6 6zm2-13v5h5" />;
const IconGlobe     = ({ s = 24 }: { s?: number }) => <Svg size={s} d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 0a14.5 14.5 0 0 1 4 10 14.5 14.5 0 0 1-4 10A14.5 14.5 0 0 1 8 12 14.5 14.5 0 0 1 12 2zM2 12h20" />;
const IconBadge     = ({ s = 24 }: { s?: number }) => <Svg size={s} d="M9 12l2 2 4-4M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />;

// ─── Layout primitives ────────────────────────────────────────────────────────

const Tag = ({ children }: { children: string }) => (
  <div style={{
    fontFamily: mono, fontSize: "0.65rem", letterSpacing: "0.2em", fontWeight: 700,
    background: ink, color: cream, padding: "5px 14px", display: "inline-block", marginBottom: 20,
  }}>{children}</div>
);

const H = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <h2 style={{
    fontFamily: serif, fontWeight: 900,
    fontSize: "clamp(2.6rem, 4.8vw, 4.4rem)",
    lineHeight: 0.95, letterSpacing: "-0.03em", color: ink, margin: 0, ...style,
  }}>{children}</h2>
);

const P = ({ children, style = {}, dark = false }: { children: React.ReactNode; style?: React.CSSProperties; dark?: boolean }) => (
  <p style={{
    fontFamily: sans, fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", lineHeight: 1.75,
    color: dark ? cream : soft, background: dark ? ink : "transparent",
    margin: 0, ...(dark ? { padding: "14px 18px" } : {}), ...style,
  }}>{children}</p>
);

// Two-column, fills full slide height — children spread vertically
const Row = ({ left, right, split = "1fr 1.4fr" }: {
  left: React.ReactNode; right: React.ReactNode; split?: string;
}) => (
  <div style={{
    display: "grid", gridTemplateColumns: split,
    height: `calc(100dvh - ${CHROME})`, overflow: "hidden",
  }}>
    <div style={{
      padding: "40px 36px 40px 0", borderRight: bdr,
      display: "flex", flexDirection: "column", justifyContent: "center", gap: 18,
      overflow: "hidden",
    }}>{left}</div>
    <div style={{
      padding: "40px 0 40px 40px",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      overflow: "hidden",
    }}>{right}</div>
  </div>
);

// Centered, fills full slide height
const Ctr = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", textAlign: "center",
    height: `calc(100dvh - ${CHROME})`, overflow: "hidden",
    padding: "0 clamp(16px, 5vw, 96px)", gap: 0,
  }}>{children}</div>
);

// ─── Slide content ────────────────────────────────────────────────────────────
function SlideContent({ n }: { n: number }) {
  switch (n) {

    // ── 1: Cover ─────────────────────────────────────────────────────────────
    case 1: return (
      <Ctr>
        <div style={{ fontFamily: mono, fontSize: "0.7rem", letterSpacing: "0.22em", color: soft, marginBottom: 28 }}>
          ENCRYPTED FI · 2026 · EVM PRIVACY INFRASTRUCTURE
        </div>
        <div style={{
          fontFamily: serif, fontWeight: 900,
          fontSize: "clamp(5rem, 14vw, 11rem)",
          lineHeight: 0.9, letterSpacing: "-0.04em", color: ink,
          marginBottom: 28,
          display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "0.16em",
        }}>
          Encrypted
          <span style={{ background: ink, color: white, padding: "0.04em 0.2em 0.06em", display: "inline-block" }}>Fi</span>
        </div>
        <P style={{ maxWidth: 560, marginBottom: 36, fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}>
          The privacy layer for ERC-20 tokens on EVM chains.
          Any token. Any wallet. Zero knowledge. No new chain required.
        </P>
        <div style={{ display: "flex", border: bdr }}>
          {[
            { n: "ZK",  l: "Every operation"   },
            { n: "1:1", l: "Token redemption"  },
            { n: <span style={{ fontFamily: mono }}>0x</span>, l: "Same wallet address" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "22px 44px", borderRight: i < 2 ? bdr : "none", textAlign: "center" as const }}>
              <div style={{ fontFamily: serif, fontWeight: 900, fontSize: "2.4rem", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: mono, fontSize: "0.58rem", letterSpacing: "0.16em", color: soft, marginTop: 8 }}>{s.l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </Ctr>
    );

    // ── 2: Problem ───────────────────────────────────────────────────────────
    case 2: return (
      <Row
        left={
          <>
            <Tag>THE PROBLEM</Tag>
            <H>
              Every on-chain<br />move is a<br /><em style={{ fontStyle: "italic" }}>public record.</em>
            </H>
            <P dark style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)" }}>
              Public blockchains solved trustlessness and sacrificed privacy entirely.
              Every wallet, balance, and transaction is permanently readable by anyone.
              Competitors, front-running bots, and adversaries all see exactly what you do.
            </P>
          </>
        }
        right={
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            {[
              { I: IconEye,      t: "Total on-chain surveillance",        b: "A single address lookup exposes years of financial history, counterparties, and strategy in real time. There is no opt-out." },
              { I: IconZap,      t: "$1.38B extracted via MEV in 2024",   b: "Visible pending transactions allow sandwich bots to front-run every trade. Users absorb the cost in slippage and failed transactions." },
              { I: IconBuilding, t: "Institutions cannot operate openly", b: "No fund, treasury, or enterprise can execute on-chain without telegraphing every move. This is the single biggest blocker to institutional DeFi adoption." },
              { I: IconTarget,   t: "Wealth visibility drives attacks",   b: "Known on-chain holdings lead directly to phishing, social engineering, and exploits directed at identifiable high-value wallets." },
            ].map((p, i) => (
              <div key={i} style={{
                display: "flex", gap: 16, alignItems: "flex-start",
                paddingBottom: i < 3 ? 20 : 0, borderBottom: i < 3 ? "1px solid rgba(10,10,10,0.08)" : "none",
              }}>
                <span style={{ flexShrink: 0, marginTop: 2, color: ink }}><p.I /></span>
                <div>
                  <div style={{ fontFamily: serif, fontWeight: 800, fontSize: "clamp(0.95rem,1.3vw,1.1rem)", marginBottom: 6 }}>{p.t}</div>
                  <div style={{ fontFamily: sans, fontSize: "clamp(0.82rem,1.1vw,0.95rem)", color: soft, lineHeight: 1.65 }}>{p.b}</div>
                </div>
              </div>
            ))}
          </div>
        }
      />
    );

    // ── 3: Market ────────────────────────────────────────────────────────────
    case 3: return (
      <Row
        left={
          <>
            <Tag>MARKET</Tag>
            <H>
              $110B in DeFi.<br /><em style={{ fontStyle: "italic" }}>Zero privacy.</em>
            </H>
            <P dark style={{ fontSize: "clamp(0.9rem, 1.15vw, 1.05rem)" }}>
              Every dollar in DeFi is fully transparent. Anyone can look up any wallet
              and see its exact balance, every trade ever made, and every protocol it has touched.
            </P>
            <P dark style={{ fontSize: "clamp(0.9rem, 1.15vw, 1.05rem)" }}>
              RAILGUN has processed over $4B in private transactions since 2021 and
              STRK20 on Starknet shows how much demand exists for on-chain privacy.
              The market is real and growing.
            </P>
            <P dark style={{ fontSize: "clamp(0.9rem, 1.15vw, 1.05rem)" }}>
              Encrypted Fi expands this to the full ERC-20 ecosystem across EVM chains,
              using the same <span style={{ fontFamily: mono, color: cream }}>0x</span> wallet address users already have.
            </P>
          </>
        }
        right={
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            {/* Stats 2x2 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: bdr }}>
              {[
                { n: "$110B+", l: "DeFi TVL on EVM chains",          dark: true },
                { n: "500k+",  l: "ERC-20 tokens deployed"                      },
                { n: "$1.4T",  l: "Annual EVM DEX volume"                       },
                { n: "$4B+",   l: "RAILGUN private volume since 2021"           },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: "24px 22px",
                  borderRight: i % 2 === 0 ? bdr : "none",
                  borderBottom: i < 2 ? bdr : "none",
                  background: s.dark ? ink : "transparent",
                  color: s.dark ? white : ink,
                }}>
                  <div style={{ fontFamily: serif, fontWeight: 900, fontSize: "clamp(2rem,3.8vw,3.4rem)", lineHeight: 1, marginBottom: 8 }}>{s.n}</div>
                  <div style={{ fontFamily: mono, fontSize: "0.58rem", letterSpacing: "0.13em", opacity: 0.55 }}>{s.l.toUpperCase()}</div>
                </div>
              ))}
            </div>
            {/* Demand box */}
            <div style={{ border: bdr }}>
              <div style={{ fontFamily: mono, fontSize: "0.58rem", letterSpacing: "0.15em", color: soft, padding: "12px 18px", borderBottom: bdr }}>
                DEMAND IS VALIDATED. THE EVM MARKET IS UNTAPPED.
              </div>
              {[
                { label: "RAILGUN", desc: "$4B+ processed since 2021. On-chain privacy has clear product-market fit." },
                { label: "STRK20",  desc: "Starknet launched STRK20 showing institutional confidence in the space. Encrypted Fi brings this to EVM chains." },
                { label: "EVM GAP", desc: "The full ERC-20 ecosystem on Ethereum, Arbitrum, Base, and Optimism has no equivalent privacy layer today." },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "12px 18px", borderBottom: i < 2 ? "1px solid rgba(10,10,10,0.07)" : "none" }}>
                  <span style={{ fontFamily: mono, fontSize: "0.55rem", letterSpacing: "0.1em", fontWeight: 700, background: ink, color: white, padding: "3px 10px", flexShrink: 0, alignSelf: "flex-start", marginTop: 2 }}>{r.label}</span>
                  <span style={{ fontFamily: sans, fontSize: "clamp(0.82rem,1.05vw,0.95rem)", color: soft, lineHeight: 1.6 }}>{r.desc}</span>
                </div>
              ))}
            </div>
          </div>
        }
      />
    );

    // ── 4: Solution ──────────────────────────────────────────────────────────
    case 4: return (
      <Ctr>
        <Tag>SOLUTION</Tag>
        <H style={{ marginBottom: 10, fontSize: "clamp(2.4rem, 4.8vw, 4.2rem)" }}>
          Privacy as a layer,<br /><em style={{ fontStyle: "italic" }}>not a chain.</em>
        </H>
        <P style={{ maxWidth: 600, marginBottom: 28, fontSize: "clamp(0.88rem, 1.1vw, 1rem)" }}>
          Encrypted Fi wraps any ERC-20 token into a confidential cToken. Every interaction
          is hidden inside a ZK proof. The original token is redeemable 1-to-1 at any time.
          No new chain. No new wallet. No protocol migration needed.
        </P>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", border: bdr, maxWidth: 960, width: "100%" }}>
          {[
            { step: "01", label: "WRAP",     desc: "Deposit any ERC-20 token. Receive an encrypted cToken commitment. Your balance is now hidden.", dark: false },
            { step: "02", label: "TRANSACT", desc: "Send, swap, borrow, or earn yield. Every action is verified by a ZK proof. Nothing is visible.", dark: true  },
            { step: "03", label: "EARN",     desc: "cTokens auto-compound inside private yield vaults. Your balance and strategy stay fully encrypted.", dark: false },
            { step: "04", label: "UNWRAP",   desc: "Burn your note at any time. Receive the underlying ERC-20 plus earned yield back, exactly 1-to-1.", dark: false },
          ].map((s, i) => (
            <div key={s.step} style={{
              padding: "22px 20px",
              borderRight: i < 3 ? bdr : "none",
              background: s.dark ? ink : "transparent",
              color: s.dark ? white : ink,
            }}>
              <div style={{ fontFamily: mono, fontSize: "0.55rem", letterSpacing: "0.18em", opacity: 0.4, marginBottom: 10 }}>{s.step}</div>
              <div style={{ fontFamily: serif, fontWeight: 900, fontSize: "1.15rem", marginBottom: 10 }}>{s.label}</div>
              <div style={{ fontFamily: sans, fontSize: "clamp(0.78rem,1vw,0.9rem)", lineHeight: 1.6, opacity: 0.82 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </Ctr>
    );

    // ── 5: Technology ────────────────────────────────────────────────────────
    case 5: return (
      <Row
        left={
          <>
            <Tag>TECHNOLOGY</Tag>
            <H>
              Math is the<br />only<br /><em style={{ fontStyle: "italic" }}>authority.</em>
            </H>
            <P dark style={{ fontSize: "clamp(0.9rem, 1.15vw, 1.05rem)" }}>
              Every operation produces a ZK-SNARK proof verified by an on-chain
              Solidity verifier contract. No admin key. No pause function. No ability
              to de-anonymise any user. The math governs everything.
            </P>
            <div style={{ border: bdr }}>
              <div style={{ fontFamily: mono, fontSize: "0.6rem", letterSpacing: "0.14em", color: soft, padding: "10px 16px", borderBottom: bdr }}>
                PERFORMANCE
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                {[
                  { l: "Proof generation", v: "Under 1 second" },
                  { l: "On-chain verify",  v: "~30k gas"        },
                  { l: "Circuit size",     v: "~200k constraints" },
                  { l: "Proof system",     v: "Groth16 / Circom"  },
                ].map((m, i) => (
                  <div key={i} style={{
                    padding: "14px 16px",
                    borderRight: i % 2 === 0 ? bdr : "none",
                    borderBottom: i < 2 ? "1px solid rgba(10,10,10,0.08)" : "none",
                  }}>
                    <div style={{ fontFamily: mono, fontSize: "0.52rem", letterSpacing: "0.1em", color: soft, marginBottom: 4 }}>{m.l.toUpperCase()}</div>
                    <div style={{ fontFamily: serif, fontWeight: 800, fontSize: "1rem" }}>{m.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        }
        right={
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <div style={{ fontFamily: mono, fontSize: "0.6rem", letterSpacing: "0.15em", color: soft }}>
              HOW A NOTE IS CREATED, HELD, AND SPENT
            </div>
            {[
              { I: IconLock,    title: "Commitment",      tech: "Poseidon(secret, amount, nonce)",
                b: "When you wrap an ERC-20, the contract records a Poseidon hash on-chain. The preimage stays fully off-chain. Nobody can reverse it to learn your amount." },
              { I: IconCircuit, title: "Merkle Tree",     tech: "Sparse Merkle — on-chain root",
                b: "Each commitment is inserted into an on-chain Merkle tree. To spend a note you prove membership without revealing which leaf you own." },
              { I: IconLink,    title: "Nullifier",       tech: "Poseidon(secret, nonce)",
                b: "Every note has a unique nullifier. When spent it is posted on-chain. The contract rejects duplicates — preventing double-spends without linking anything." },
              { I: IconKey,     title: "Note Encryption", tech: "ECIES / secp256k1",
                b: "Ciphertexts are posted on-chain so you can recover notes on any device by scanning with your private key. No server or relayer needed." },
              { I: IconCircuit, title: "ZK Circuits",     tech: "Circom 2 — mint, burn, transfer, swap, vote",
                b: "Separate circuits for each operation. Each proves note validity, amount arithmetic, Merkle path, and nullifier uniqueness in a single on-chain call." },
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ flexShrink: 0, marginTop: 2, color: ink }}><p.I /></span>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontFamily: serif, fontWeight: 800, fontSize: "clamp(0.92rem,1.2vw,1.05rem)" }}>{p.title}</span>
                    <span style={{ fontFamily: mono, fontSize: "0.52rem", letterSpacing: "0.08em", color: soft }}>{p.tech}</span>
                  </div>
                  <div style={{ fontFamily: sans, fontSize: "clamp(0.8rem,1.05vw,0.92rem)", color: soft, lineHeight: 1.6 }}>{p.b}</div>
                </div>
              </div>
            ))}
          </div>
        }
      />
    );

    // ── 6: Capabilities ──────────────────────────────────────────────────────
    case 6: return (
      <Ctr>
        <Tag>CAPABILITIES</Tag>
        <H style={{ marginBottom: 8, fontSize: "clamp(2rem, 4vw, 3.6rem)" }}>
          Privacy for every DeFi primitive.
        </H>
        <P style={{ maxWidth: 520, marginBottom: 20, fontSize: "clamp(0.85rem, 1.05vw, 0.96rem)" }}>
          Encrypted Fi covers the full DeFi stack. Each capability is a separate, auditable contract.
        </P>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", border: bdr, maxWidth: 920, width: "100%" }}>
          {[
            { I: IconLock,    label: "Private Transfers",   sub: "Sender, receiver, and amount ZK-verified. On-chain proof of validity. Zero information leaked." },
            { I: IconArrows,  label: "Confidential Swaps",  sub: "Trade on any Uniswap V2 or V3 fork without revealing trade size, direction, or wallet." },
            { I: IconTrend,   label: "Encrypted Yield",     sub: "Deposit into ERC-4626 yield vaults. Balance, strategy, and interest all stay encrypted." },
            { I: IconCoin,    label: "Private Lending",     sub: "Borrow against cToken collateral at 75% LTV. Collateral size never linked to your wallet." },
            { I: IconDroplet, label: "Hidden LP Positions", sub: "Provide liquidity to Uniswap V2 pools without advertising your capital to competitors." },
            { I: IconVote,    label: "ZK Governance Votes", sub: "Vote with cryptographic proof of ownership. Vote weight private. Nullifiers prevent double-voting." },
          ].map((c, i) => (
            <div key={i} style={{
              padding: "18px 18px",
              borderRight: i % 3 < 2 ? bdr : "none",
              borderBottom: i < 3 ? bdr : "none",
              background: i % 2 === 1 ? "rgba(10,10,10,0.03)" : "transparent",
            }}>
              <span style={{ display: "block", marginBottom: 8, color: ink }}><c.I s={20} /></span>
              <div style={{ fontFamily: serif, fontWeight: 800, fontSize: "clamp(0.88rem,1.1vw,1rem)", marginBottom: 6 }}>{c.label}</div>
              <div style={{ fontFamily: sans, fontSize: "clamp(0.76rem,0.95vw,0.86rem)", color: soft, lineHeight: 1.55 }}>{c.sub}</div>
            </div>
          ))}
        </div>
      </Ctr>
    );

    // ── 7: Team ──────────────────────────────────────────────────────────────
    case 7: return (
      <div style={{
        height: `calc(100dvh - ${CHROME})`,
        display: "grid",
        gridTemplateColumns: "1fr 1.4fr",
        overflow: "hidden",
      }}>

        {/* Left — full photo */}
        <div style={{ position: "relative" as const, overflow: "hidden", borderRight: bdr }}>
          <Image
            src="https://image2url.com/r2/default/images/1773816346658-17894493-6969-416a-ace2-9577f7f79f37.jpg"
            alt="Collins"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
          {/* Core team badge */}
          <div style={{
            position: "absolute" as const, top: 20, left: 20,
            fontFamily: mono, fontSize: "0.5rem", letterSpacing: "0.18em", fontWeight: 700,
            background: ink, color: white, padding: "5px 14px",
          }}>
            CORE TEAM
          </div>
        </div>

        {/* Right — info */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 52px", gap: 24, overflow: "hidden" }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: "0.6rem", letterSpacing: "0.2em", color: soft, marginBottom: 16 }}>FOUNDER</div>
            <div style={{ fontFamily: serif, fontWeight: 900, fontSize: "clamp(2.8rem,5.5vw,5rem)", lineHeight: 0.92, letterSpacing: "-0.03em", color: ink, marginBottom: 16 }}>
              Collins
            </div>
            <div style={{ fontFamily: mono, fontSize: "0.58rem", letterSpacing: "0.18em", color: soft }}>
              CO-FOUNDER · ENCRYPTED FI
            </div>
          </div>

          <div style={{ width: 48, height: 3, background: ink }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "ROLE",      val: "Dealflow Broker · Web3 Operator"             },
              { label: "TRACK",     val: "$300k+ raised through network"                },
              { label: "FOCUS",     val: "Zero-to-one · 0 → 1 early-stage specialist"  },
              { label: "AGENCY",    val: "Founder, GrayMan Dealflows"                  },
            ].map(r => (
              <div key={r.label} style={{ display: "flex", gap: 20, alignItems: "baseline" }}>
                <div style={{ fontFamily: mono, fontSize: "0.5rem", letterSpacing: "0.14em", color: soft, flexShrink: 0, width: 56 }}>{r.label}</div>
                <div style={{ fontFamily: sans, fontSize: "clamp(0.88rem,1.1vw,1rem)", color: ink, fontWeight: 500 }}>{r.val}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(10,10,10,0.04)", border: bdr, padding: "18px 22px" }}>
            <div style={{ fontFamily: sans, fontSize: "clamp(0.82rem,1vw,0.94rem)", lineHeight: 1.75, color: soft }}>
              Embedded with founders, VCs, launchpads, and liquidity providers — not as a middleman, but as an operator. Connects early projects to the capital and partners they need, then stays in the trenches to make sure those deals actually land.
            </div>
          </div>
        </div>

      </div>
    );

    // ── 8: Compliance ────────────────────────────────────────────────────────
    case 8: return (
      <div style={{ height: `calc(100dvh - ${CHROME})`, display: "flex", flexDirection: "column", justifyContent: "center", gap: 24, overflow: "hidden", padding: "0 clamp(20px,5vw,72px)" }}>

        {/* Top: headline left, intro right */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 0, border: bdr }}>
          <div style={{ padding: "28px 28px", borderRight: bdr, background: ink, color: white }}>
            <div style={{ fontFamily: mono, fontSize: "0.6rem", letterSpacing: "0.2em", opacity: 0.5, marginBottom: 14 }}>COMPLIANCE</div>
            <div style={{ fontFamily: serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.2vw,2.8rem)", lineHeight: 0.95, letterSpacing: "-0.03em" }}>
              Privacy and<br />compliance<br /><em style={{ fontStyle: "italic" }}>are not opposites.</em>
            </div>
          </div>
          <div style={{ padding: "28px 32px", display: "flex", alignItems: "center" }}>
            <p style={{ fontFamily: sans, fontSize: "clamp(0.88rem,1.1vw,1rem)", lineHeight: 1.75, color: soft, margin: 0 }}>
              Encrypted Fi is not a mixer. Unlike Tornado Cash, which had no mechanism
              for voluntary disclosure, Encrypted Fi was designed from day one so users
              can always prove their activity to authorised parties without exposing
              anything to anyone else.
            </p>
          </div>
        </div>

        {/* Bottom: 2×2 card grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: bdr }}>
          {[
            { I: IconKey,       title: "View Keys",
              b: "Every wallet generates a view key derived from the same private key used on EVM. Share it with an auditor or regulator to disclose your full history — without exposing your spending key to anyone else." },
            { I: IconFileCheck, title: "Selective Disclosure",
              b: "Generate a ZK proof revealing one specific transaction to one specific party — proving a payment, amount, or counterparty — without revealing anything else in your history." },
            { I: IconShield,    title: "Auditable by Design",
              b: "All proofs are verifiable on-chain. Nullifier uniqueness prevents double-spend and fraud. This is auditable compliance infrastructure built in from the first line of code." },
            { I: IconBadge,     title: "Not Tornado Cash",
              b: "Tornado Cash offered no view keys, no selective disclosure, and no compliance path. Encrypted Fi provides all three. Compliance was never an afterthought here." },
          ].map((p, i) => (
            <div key={i} style={{
              padding: "22px 24px",
              borderRight: i % 2 === 0 ? bdr : "none",
              borderTop: i >= 2 ? bdr : "none",
              background: i === 1 ? "rgba(10,10,10,0.03)" : "transparent",
            }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ flexShrink: 0, marginTop: 2, color: ink }}><p.I s={20} /></span>
                <div>
                  <div style={{ fontFamily: serif, fontWeight: 800, fontSize: "clamp(0.9rem,1.2vw,1.05rem)", marginBottom: 5 }}>{p.title}</div>
                  <div style={{ fontFamily: sans, fontSize: "clamp(0.78rem,1vw,0.9rem)", color: soft, lineHeight: 1.6 }}>{p.b}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    // ── 9: Vision ────────────────────────────────────────────────────────────
    case 9: return (
      <div style={{ height: `calc(100dvh - ${CHROME})`, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Full-width headline banner */}
        <div style={{ background: ink, color: white, padding: "22px clamp(20px,5vw,72px)", borderBottom: bdr, flexShrink: 0 }}>
          <div style={{ fontFamily: mono, fontSize: "0.58rem", letterSpacing: "0.22em", opacity: 0.4, marginBottom: 10 }}>VISION</div>
          <div style={{ fontFamily: serif, fontWeight: 900, fontSize: "clamp(2.2rem,4.8vw,4.4rem)", lineHeight: 0.93, letterSpacing: "-0.03em" }}>
            Privacy is not a feature.<br /><em style={{ fontStyle: "italic" }}>It is a right.</em>
          </div>
        </div>

        {/* Bottom: left body text | right three stacked panels */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1.35fr 1fr", minHeight: 0, overflow: "hidden" }}>

          {/* Left — two paragraphs */}
          <div style={{ borderRight: bdr, padding: "32px clamp(20px,4vw,56px)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 20, overflow: "hidden" }}>
            <p style={{ fontFamily: sans, fontSize: "clamp(0.9rem,1.2vw,1.06rem)", lineHeight: 1.8, color: soft, margin: 0 }}>
              Blockchain is repeating the same mistake the early internet made — public by default
              with no path to private. Encrypted Fi changes that. Users keep the exact same{" "}
              <span style={{ fontFamily: mono }}>0x</span> wallet they already use: MetaMask,
              Rabby, Ledger. No new wallet. No migration. No learning curve. Privacy just works.
            </p>
            <p style={{ fontFamily: sans, fontSize: "clamp(0.9rem,1.2vw,1.06rem)", lineHeight: 1.8, color: soft, margin: 0 }}>
              Every ERC-20 token deserves a confidential version. Every DeFi action deserves to
              be private by default. We are building the infrastructure that makes that possible
              on the chains where the value already lives.
            </p>
          </div>

          {/* Right — three stacked panels */}
          <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {[
              { I: IconGlobe,  tag: "SAME WALLET",       headline: "Your 0x address",   sub: "No new wallet required. Same MetaMask, Rabby, or Ledger you already use." },
              { I: IconLock,   tag: "ANY ERC-20",         headline: "Any token, private", sub: "Wrap any ERC-20 into a confidential cToken. Redeem 1-to-1 at any time."  },
              { I: IconShield, tag: "COMPLIANCE-READY",  headline: "View keys built in", sub: "Voluntary disclosure to auditors or regulators. Selective, not forced."    },
            ].map((s, i) => (
              <div key={i} style={{
                flex: 1, display: "flex", alignItems: "center", gap: 18,
                padding: "0 28px",
                borderBottom: i < 2 ? bdr : "none",
                background: i === 0 ? ink : i === 2 ? "rgba(10,10,10,0.03)" : "transparent",
                color: i === 0 ? white : ink,
              }}>
                <span style={{ flexShrink: 0, opacity: 0.7 }}><s.I s={22} /></span>
                <div>
                  <div style={{ fontFamily: mono, fontSize: "0.5rem", letterSpacing: "0.16em", opacity: 0.45, marginBottom: 4 }}>{s.tag}</div>
                  <div style={{ fontFamily: serif, fontWeight: 900, fontSize: "clamp(1rem,1.6vw,1.3rem)", marginBottom: 5 }}>{s.headline}</div>
                  <div style={{ fontFamily: sans, fontSize: "clamp(0.76rem,1vw,0.88rem)", lineHeight: 1.55, opacity: 0.7 }}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    default: return <Ctr><P>Slide not found.</P></Ctr>;
  }
}

// ─── Strip labels ─────────────────────────────────────────────────────────────
const STRIP_LABELS = ["COVER","PROBLEM","MARKET","SOLUTION","TECHNOLOGY","CAPABILITIES","TEAM","COMPLIANCE","VISION"];

// ─── Main component ───────────────────────────────────────────────────────────
export default function SlideClient({ current, total, meta }: {
  current: number; total: number; meta: Slide;
}) {
  const router = useRouter();

  const go = useCallback((n: number) => {
    if (n < 1 || n > total) return;
    router.push(`/pitch/${n}`);
  }, [router, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight","ArrowDown"," "].includes(e.key)) { e.preventDefault(); go(current + 1); }
      if (["ArrowLeft","ArrowUp"].includes(e.key))        { e.preventDefault(); go(current - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, go]);

  const canPrev = current > 1;
  const canNext = current < total;

  const btn = (active: boolean): React.CSSProperties => ({
    fontFamily: mono, fontSize: "0.62rem", letterSpacing: "0.14em", fontWeight: 700,
    padding: "9px 24px", border: bdr,
    background: active ? ink : "transparent",
    color: active ? white : "rgba(10,10,10,0.2)",
    cursor: active ? "pointer" : "default",
    transition: "all 0.15s",
  });

  return (
    <div style={{ height: "100dvh", background: cream, display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Top bar — 48px */}
      <div style={{ height: 48, flexShrink: 0, background: cream, borderBottom: bdr, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(16px,4vw,52px)", gap: 16 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: ink, flexShrink: 0 }}>
          <Image src="https://image2url.com/r2/default/images/1771982865555-91a426af-ecd8-4ca9-8e6b-11372ff845bf.png" alt="Encrypted Fi" width={26} height={26} style={{ objectFit: "contain" }} />
          <span style={{ fontFamily: serif, fontWeight: 900, fontSize: "0.78rem", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 3 }}>
            ENCRYPTED <span style={{ background: ink, color: white, padding: "1px 6px" }}>FI</span>
          </span>
        </a>
        <div style={{ fontFamily: mono, fontSize: "0.6rem", letterSpacing: "0.16em", color: soft }}>{meta.category}</div>
        <div style={{ fontFamily: mono, fontSize: "0.6rem", letterSpacing: "0.13em", color: soft, flexShrink: 0 }}>
          {String(current).padStart(2,"0")} / {String(total).padStart(2,"0")}
        </div>
      </div>

      {/* Progress bar — 3px */}
      <div style={{ height: 3, flexShrink: 0, background: "rgba(10,10,10,0.08)" }}>
        <div style={{ height: "100%", background: ink, width: `${(current/total)*100}%`, transition: "width 0.35s ease" }} />
      </div>

      {/* Slide — fills all remaining */}
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden", padding: "0 clamp(20px,5vw,72px)" }}>
        <SlideContent n={current} />
      </div>

      {/* Bottom nav — 48px */}
      <div style={{ height: 48, flexShrink: 0, borderTop: bdr, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(16px,4vw,52px)", gap: 16 }}>
        <button onClick={() => go(current-1)} disabled={!canPrev} style={btn(canPrev)}>PREV</button>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          {Array.from({ length: total }, (_, i) => i+1).map(i => (
            <button key={i} onClick={() => go(i)} title={`Slide ${i}`} style={{ width: i===current?22:6, height: 7, flexShrink: 0, background: i===current?ink:"rgba(10,10,10,0.18)", border:"none", padding:0, cursor:"pointer", transition:"width 0.2s,background 0.15s" }} />
          ))}
        </div>
        <button onClick={() => go(current+1)} disabled={!canNext} style={btn(canNext)}>NEXT</button>
      </div>

      {/* Slide strip — 32px */}
      <div style={{ height: 32, flexShrink: 0, borderTop: bdr, display: "flex", overflowX: "auto", background: cream }}>
        {Array.from({ length: total }, (_, i) => i+1).map(i => (
          <button key={i} onClick={() => go(i)} style={{ fontFamily: mono, fontSize: "0.52rem", letterSpacing: "0.1em", padding: "0 16px", whiteSpace: "nowrap" as const, height: "100%", background: i===current?ink:"transparent", color: i===current?white:soft, border:"none", borderRight:bdr, cursor:"pointer", transition:"all 0.15s", flexShrink: 0 }}>
            {String(i).padStart(2,"0")} {STRIP_LABELS[i-1]}
          </button>
        ))}
      </div>
    </div>
  );
}
