"use client";

import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import type { Slide } from "../slides";
import Image from "next/image";

// ─── CSS vars shorthand ───────────────────────────────────────────────────────

const ink   = "var(--ink)";
const cream = "var(--cream)";
const white = "var(--white)";
const serif = "var(--font-serif)";
const mono  = "var(--font-mono)";
const sans  = "var(--font-sans)";
const bdr   = "var(--border)";
const soft  = "var(--ink-soft)";

// ─── Inline SVG icons (no emojis) ────────────────────────────────────────────

const SvgIcon = ({ d, size = 20 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const IconEye        = () => <SvgIcon d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />;
const IconZap        = () => <SvgIcon d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />;
const IconBuilding   = () => <SvgIcon d="M3 21h18M9 8h1m5 0h1M9 12h1m5 0h1M9 16h1m5 0h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />;
const IconTarget     = () => <SvgIcon d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-14a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />;
const IconLock       = () => <SvgIcon d="M18 11H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM12 17v-2m0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM8 11V7a4 4 0 0 1 8 0v4" />;
const IconArrows     = () => <SvgIcon d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4" />;
const IconTrend      = () => <SvgIcon d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />;
const IconCoin       = () => <SvgIcon d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 5v1m0 8v1m-3-5h5.5a1.5 1.5 0 0 1 0 3H9m0 0h6" />;
const IconDroplet    = () => <SvgIcon d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z" />;
const IconVote       = () => <SvgIcon d="M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9" />;
const IconShield     = () => <SvgIcon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />;
const IconKey        = () => <SvgIcon d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />;
const IconCircuit    = () => <SvgIcon d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />;
const IconLink       = () => <SvgIcon d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />;
const IconFileCheck  = () => <SvgIcon d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-2 13l-3-3 1.41-1.41L12 12.17l4.59-4.58L18 9l-6 6zm2-13v5h5" />;
const IconGlobe      = () => <SvgIcon d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 0a14.5 14.5 0 0 1 4 10 14.5 14.5 0 0 1-4 10A14.5 14.5 0 0 1 8 12 14.5 14.5 0 0 1 12 2zM2 12h20" />;
const IconCheckBadge = () => <SvgIcon d="M9 12l2 2 4-4M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />;

// ─── Shared layout primitives ─────────────────────────────────────────────────

const Tag = ({ children }: { children: string }) => (
  <div style={{
    fontFamily: mono, fontSize: "0.55rem", letterSpacing: "0.2em", fontWeight: 700,
    background: ink, color: cream, padding: "5px 14px", display: "inline-block", marginBottom: 28,
  }}>
    {children}
  </div>
);

const H1 = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <h2 style={{
    fontFamily: serif, fontWeight: 900, fontSize: "clamp(2.4rem,5.5vw,4.5rem)",
    lineHeight: 0.96, letterSpacing: "-0.03em", color: ink, margin: 0, ...style,
  }}>
    {children}
  </h2>
);

const Body = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <p style={{
    fontFamily: sans, fontSize: "clamp(0.88rem,1.5vw,1rem)", lineHeight: 1.8,
    color: soft, margin: 0, ...style,
  }}>
    {children}
  </p>
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
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    textAlign: "center", height: "100%", padding: "40px 20px",
  }}>
    {children}
  </div>
);

// ─── Slide content ────────────────────────────────────────────────────────────

function SlideContent({ n }: { n: number }) {
  switch (n) {

    // ── 1: Cover ──────────────────────────────────────────────────────────────
    case 1: return (
      <Center>
        <div style={{ fontFamily: mono, fontSize: "0.55rem", letterSpacing: "0.2em", color: soft, marginBottom: 24 }}>
          ENCRYPTED FI · 2026 · EVM PRIVACY INFRASTRUCTURE
        </div>
        <H1 style={{ fontSize: "clamp(4rem,11vw,8.5rem)", marginBottom: 24 }}>
          Encrypted<br /><em style={{ fontStyle: "italic" }}>Fi</em>
        </H1>
        <Body style={{ maxWidth: 520, marginBottom: 52 }}>
          The privacy layer for ERC-20 tokens on EVM chains. Any token.
          Any wallet. Zero knowledge. No new chain. No new wallet.
        </Body>
        <div style={{ display: "flex", gap: 0, border: bdr }}>
          {[
            { n: "ZK",   l: "Every operation"     },
            { n: "1:1",  l: "Token redemption"    },
            { n: "0x",   l: "Same wallet address" },
          ].map((s, i) => (
            <div key={s.l} style={{
              padding: "18px 32px", borderRight: i < 2 ? bdr : "none", textAlign: "center" as const,
            }}>
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
              Public blockchains solved trustlessness and sacrificed privacy entirely.
              Every wallet, balance, and transaction is permanently readable by anyone
              in real time. Competitors, front-running bots, and adversaries all have
              the same view you do.
            </Body>
          </>
        }
        right={
          <div>
            {[
              {
                Icon: IconEye,
                t: "Total on-chain surveillance",
                b: "Every wallet balance and transaction is visible permanently. A single address lookup exposes years of financial history, counterparties, and strategy.",
              },
              {
                Icon: IconZap,
                t: "$1.38B extracted via MEV in 2024",
                b: "Visible pending transactions allow sandwich bots to front-run every trade. Users absorb the cost through worse execution, failed transactions, and slippage.",
              },
              {
                Icon: IconBuilding,
                t: "Institutions cannot operate publicly",
                b: "No fund, treasury, or enterprise can execute strategy on-chain without broadcasting every move. Transparency is the single biggest blocker to institutional DeFi adoption.",
              },
              {
                Icon: IconTarget,
                t: "Wealth visibility drives targeted attacks",
                b: "Known on-chain holdings lead directly to phishing, social engineering, and protocol exploits directed at identifiable high-value wallets.",
              },
            ].map(p => (
              <div key={p.t} style={{ marginBottom: 18, paddingBottom: 18, borderBottom: "1px solid rgba(10,10,10,0.07)" }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0, marginTop: 2, color: ink }}>
                    <p.Icon />
                  </span>
                  <div>
                    <div style={{ fontFamily: serif, fontWeight: 700, fontSize: "0.9rem", marginBottom: 4 }}>{p.t}</div>
                    <div style={{ fontFamily: sans, fontSize: "0.76rem", color: soft, lineHeight: 1.65 }}>{p.b}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      />
    );

    // ── 3: Market ─────────────────────────────────────────────────────────────
    case 3: return (
      <Row
        left={
          <>
            <Tag>MARKET</Tag>
            <H1>$110B in DeFi.<br /><em style={{ fontStyle: "italic" }}>Zero privacy.</em></H1>
            <Body style={{ marginTop: 24 }}>
              Starknet launched STRK20, a confidential token standard that proved the
              market demand for on-chain privacy. But STRK20 is locked to the Starknet
              ecosystem and cannot touch a single ERC-20 token.
            </Body>
            <Body style={{ marginTop: 16 }}>
              Encrypted Fi brings the same capability to every ERC-20 token on every
              EVM chain, where the money actually lives.
            </Body>
          </>
        }
        right={
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: bdr }}>
              {[
                { n: "$110B+", l: "DeFi TVL on EVM chains",           dark: true },
                { n: "500k+",  l: "ERC-20 tokens deployed"                       },
                { n: "$1.4T",  l: "Annual EVM DEX volume"                        },
                { n: "0",      l: "ERC-20 native privacy solutions"               },
              ].map((s, i) => (
                <div key={s.l} style={{
                  padding: "28px 24px",
                  borderRight: i % 2 === 0 ? bdr : "none",
                  borderBottom: i < 2 ? bdr : "none",
                  background: s.dark ? ink : "transparent",
                  color: s.dark ? white : ink,
                }}>
                  <div style={{ fontFamily: serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", lineHeight: 1, marginBottom: 8 }}>{s.n}</div>
                  <div style={{ fontFamily: mono, fontSize: "0.52rem", letterSpacing: "0.12em", opacity: 0.55 }}>{s.l.toUpperCase()}</div>
                </div>
              ))}
            </div>

            <div style={{ border: bdr, padding: "20px 22px" }}>
              <div style={{ fontFamily: mono, fontSize: "0.52rem", letterSpacing: "0.14em", color: soft, marginBottom: 14 }}>WHY NOT STRK20</div>
              {[
                "Works only inside Starknet. Cannot interact with Ethereum, L2s, or any EVM chain.",
                "Cannot wrap standard ERC-20 tokens. Requires native Starknet token issuance.",
                "Separate ecosystem, separate wallets, separate liquidity. Not composable with existing DeFi.",
                "Encrypted Fi: any ERC-20, any EVM chain, same 0x wallet address, same liquidity pools.",
              ].map((it, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                  <span style={{ color: i === 3 ? ink : soft, flexShrink: 0, fontWeight: 700, fontSize: "0.72rem", marginTop: 2 }}>
                    {i === 3 ? "+" : "x"}
                  </span>
                  <span style={{ fontFamily: sans, fontSize: "0.76rem", color: i === 3 ? ink : soft, lineHeight: 1.55, fontWeight: i === 3 ? 600 : 400 }}>{it}</span>
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
        <Tag>SOLUTION</Tag>
        <H1 style={{ marginBottom: 16 }}>
          Privacy as a layer,<br /><em style={{ fontStyle: "italic" }}>not a chain.</em>
        </H1>
        <Body style={{ maxWidth: 580, marginBottom: 48 }}>
          Encrypted Fi wraps any existing ERC-20 token into a confidential cToken.
          Every interaction is hidden inside a ZK proof. The original token stays
          1-to-1 redeemable. No new chain. No new wallet. No protocol migration.
        </Body>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", border: bdr, maxWidth: 860 }}>
          {[
            { step: "01", label: "WRAP",     desc: "Deposit any ERC-20. Receive an encrypted cToken commitment note, locked to your address." },
            { step: "02", label: "TRANSACT", desc: "Send, swap, lend, earn yield. Every action verified by a ZK proof. Nothing is visible.", dark: true },
            { step: "03", label: "EARN",     desc: "cTokens auto-compound in private yield vaults. Your balance and strategy stay encrypted." },
            { step: "04", label: "UNWRAP",   desc: "Burn your note. Receive the underlying ERC-20 plus any earned yield back, exactly 1-to-1." },
          ].map((s, i) => (
            <div key={s.step} style={{
              padding: "28px 20px",
              borderRight: i < 3 ? bdr : "none",
              background: s.dark ? ink : "transparent",
              color: s.dark ? white : ink,
            }}>
              <div style={{ fontFamily: mono, fontSize: "0.5rem", letterSpacing: "0.16em", opacity: 0.45, marginBottom: 10 }}>{s.step}</div>
              <div style={{ fontFamily: serif, fontWeight: 900, fontSize: "1.1rem", marginBottom: 10 }}>{s.label}</div>
              <div style={{ fontFamily: sans, fontSize: "0.76rem", lineHeight: 1.6, opacity: 0.8 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </Center>
    );

    // ── 5: Technology ─────────────────────────────────────────────────────────
    case 5: return (
      <Row
        left={
          <>
            <Tag>TECHNOLOGY</Tag>
            <H1>Cryptography<br />verifiable<br /><em style={{ fontStyle: "italic" }}>on-chain.</em></H1>
            <Body style={{ marginTop: 20 }}>
              Every operation produces a ZK-SNARK proof verified by an on-chain
              Solidity verifier. No admin key. No pause function. No ability to
              de-anonymise users. The math is the only authority.
            </Body>
            <div style={{ marginTop: 28, border: bdr, padding: "16px 18px" }}>
              <div style={{ fontFamily: mono, fontSize: "0.5rem", letterSpacing: "0.12em", color: soft, marginBottom: 10 }}>PERFORMANCE</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" }}>
                {[
                  { label: "Proof generation",  val: "< 1 second (browser)" },
                  { label: "On-chain verify",   val: "~30k gas per proof"   },
                  { label: "Circuit size",      val: "~200k constraints"    },
                  { label: "Proof system",      val: "Groth16 (Circom)"     },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ fontFamily: mono, fontSize: "0.48rem", letterSpacing: "0.1em", color: soft }}>{s.label.toUpperCase()}</div>
                    <div style={{ fontFamily: serif, fontWeight: 700, fontSize: "0.88rem", marginTop: 2 }}>{s.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        }
        right={
          <div>
            <div style={{ fontFamily: mono, fontSize: "0.52rem", letterSpacing: "0.14em", color: soft, marginBottom: 16 }}>
              NOTE LIFECYCLE
            </div>

            {/* Lifecycle steps */}
            {[
              {
                Icon: IconLock,
                title: "Commitment",
                tech: "Poseidon(secret, amount, nonce)",
                desc: "When you wrap an ERC-20, the contract records a Poseidon hash commitment on-chain. The preimage — your secret and amount — stays entirely off-chain. Nobody can reverse the hash.",
              },
              {
                Icon: IconCircuit,
                title: "Merkle Inclusion",
                tech: "On-chain sparse Merkle tree",
                desc: "Each commitment is inserted into an on-chain Merkle tree. The tree root is public. To spend a note you prove membership in the tree with a ZK proof, without revealing which leaf is yours.",
              },
              {
                Icon: IconLink,
                title: "Nullifier",
                tech: "Poseidon(secret, nonce)",
                desc: "Every note generates a unique nullifier, derived from the same secret. When spent, the nullifier is posted on-chain. The contract rejects any duplicate nullifier, preventing double-spends without linking the spend to the original note.",
              },
              {
                Icon: IconKey,
                title: "ECIES Encryption",
                tech: "secp256k1 / ECIES",
                desc: "The note ciphertext is posted on-chain so you can recover your note from any device by scanning with your private key. No server. No relayer. No third party required.",
              },
              {
                Icon: IconCircuit,
                title: "ZK Circuits",
                tech: "Circom 2 + SnarkJS",
                desc: "Separate circuits for mint, burn, transfer, swap, vote. Each circuit proves: note validity, correct amount arithmetic, valid Merkle path, and unique nullifier. All verified in a single on-chain call.",
              },
            ].map((p, i) => (
              <div key={p.title} style={{
                display: "flex", gap: 14, marginBottom: 16, paddingBottom: 16,
                borderBottom: i < 4 ? "1px solid rgba(10,10,10,0.07)" : "none",
              }}>
                <span style={{ flexShrink: 0, marginTop: 2, color: ink }}>
                  <p.Icon />
                </span>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 3 }}>
                    <span style={{ fontFamily: serif, fontWeight: 700, fontSize: "0.88rem" }}>{p.title}</span>
                    <span style={{ fontFamily: mono, fontSize: "0.48rem", letterSpacing: "0.1em", color: soft }}>{p.tech}</span>
                  </div>
                  <div style={{ fontFamily: sans, fontSize: "0.74rem", color: soft, lineHeight: 1.65 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        }
      />
    );

    // ── 6: DeFi Capabilities ──────────────────────────────────────────────────
    case 6: return (
      <Center>
        <Tag>CAPABILITIES</Tag>
        <H1 style={{ marginBottom: 14 }}>
          Privacy for every<br /><em style={{ fontStyle: "italic" }}>DeFi primitive.</em>
        </H1>
        <Body style={{ maxWidth: 560, marginBottom: 40 }}>
          Encrypted Fi covers the full DeFi stack. Any protocol can integrate by
          pointing users to the SDK. Each capability is a separate auditable contract.
        </Body>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", border: bdr, maxWidth: 820, width: "100%" }}>
          {[
            { Icon: IconLock,    label: "Private Transfers",   sub: "Sender, receiver, and amount are ZK-verified. On-chain proof of validity. Zero information leaked from the transaction." },
            { Icon: IconArrows,  label: "Confidential Swaps",  sub: "Trade on any Uniswap V2 or V3 fork without revealing trade size, direction, or wallet to the mempool or MEV bots." },
            { Icon: IconTrend,   label: "Encrypted Yield",     sub: "Deposit into ERC-4626 yield vaults. Earn yield while keeping your balance, strategy, and compound interest private." },
            { Icon: IconCoin,    label: "Private Lending",     sub: "Borrow against cToken collateral at 75% LTV. Collateral size never linked to your wallet address or identity." },
            { Icon: IconDroplet, label: "Hidden LP Positions", sub: "Provide liquidity to any Uniswap V2 compatible pool without advertising your capital deployment to competitors." },
            { Icon: IconVote,    label: "ZK Governance Votes", sub: "Vote on proposals with cryptographic proof of token ownership. Vote weight is private. A nullifier prevents double-voting." },
          ].map((c, i) => (
            <div key={c.label} style={{
              padding: "26px 22px",
              borderRight: i % 3 < 2 ? bdr : "none",
              borderBottom: i < 3 ? bdr : "none",
              background: i % 2 === 1 ? "rgba(10,10,10,0.03)" : "transparent",
            }}>
              <span style={{ display: "block", marginBottom: 12, color: ink }}>
                <c.Icon />
              </span>
              <div style={{ fontFamily: serif, fontWeight: 800, fontSize: "0.9rem", marginBottom: 8 }}>{c.label}</div>
              <div style={{ fontFamily: sans, fontSize: "0.75rem", color: soft, lineHeight: 1.6 }}>{c.sub}</div>
            </div>
          ))}
        </div>
      </Center>
    );

    // ── 7: Team ───────────────────────────────────────────────────────────────
    case 7: return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "40px 0 0" }}>
        <div style={{ textAlign: "center" as const, marginBottom: 40 }}>
          <Tag>TEAM</Tag>
          <H1 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", marginTop: -8 }}>The people building it.</H1>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1, border: bdr,
        }}>
          {[
            { role: "CO-FOUNDER" },
            { role: "CO-FOUNDER" },
          ].map((m, i) => (
            <div key={i} style={{
              padding: "44px 48px",
              borderRight: i === 0 ? bdr : "none",
              display: "flex", flexDirection: "column",
            }}>
              {/* Photo */}
              <div style={{
                width: "100%",
                paddingBottom: "75%",
                position: "relative" as const,
                border: bdr,
                background: "rgba(10,10,10,0.03)",
                marginBottom: 28,
              }}>
                <div style={{
                  position: "absolute" as const, inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ textAlign: "center" as const }}>
                    <span style={{ color: "rgba(10,10,10,0.2)" }}><IconBuilding /></span>
                    <div style={{ fontFamily: mono, fontSize: "0.48rem", letterSpacing: "0.12em", color: "rgba(10,10,10,0.2)", marginTop: 8 }}>
                      ADD PHOTO
                    </div>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div style={{ fontFamily: serif, fontWeight: 900, fontSize: "1.6rem", color: ink, marginBottom: 4 }}>
                Name
              </div>
              {/* Role */}
              <div style={{ fontFamily: mono, fontSize: "0.54rem", letterSpacing: "0.16em", color: soft, marginBottom: 18 }}>
                {m.role}
              </div>
              {/* Bio */}
              <div style={{ fontFamily: sans, fontSize: "0.82rem", lineHeight: 1.8, color: "rgba(10,10,10,0.3)", fontStyle: "italic" }}>
                Background, experience, and previous roles go here.
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    // ── 8: Compliance ─────────────────────────────────────────────────────────
    case 8: return (
      <Row
        left={
          <>
            <Tag>COMPLIANCE</Tag>
            <H1>Privacy and<br />compliance<br /><em style={{ fontStyle: "italic" }}>are not opposites.</em></H1>
            <Body style={{ marginTop: 24 }}>
              Encrypted Fi is not a mixer. Unlike Tornado Cash, which provided
              no mechanism for voluntary disclosure, Encrypted Fi is built with
              compliance as a first-class feature. Users retain full control
              over what they disclose and to whom.
            </Body>
          </>
        }
        right={
          <div>
            {[
              {
                Icon: IconKey,
                title: "View Keys",
                desc: "Every wallet generates a view key derived from the same private key used on EVM. A user can share their view key with an auditor, regulator, or tax authority to disclose their full transaction history without exposing their secret to anyone else.",
              },
              {
                Icon: IconFileCheck,
                title: "Selective Disclosure",
                desc: "Users can generate a ZK proof that reveals a specific transaction to a specific party — proving a payment was made, an amount, or a counterparty — without revealing any other transaction in the history.",
              },
              {
                Icon: IconShield,
                title: "Compliance-Ready Architecture",
                desc: "The protocol enforces nullifier uniqueness, preventing any form of double-spend or fraud. All transaction proofs are verifiable on-chain. This is auditable compliance infrastructure, not obfuscation.",
              },
              {
                Icon: IconCheckBadge,
                title: "Not Tornado Cash",
                desc: "Tornado Cash offered no view keys, no selective disclosure, and no compliance path. Encrypted Fi was designed from day one so that users can always voluntarily prove their activity to authorised parties.",
              },
            ].map((p, i) => (
              <div key={p.title} style={{
                display: "flex", gap: 14, marginBottom: 18, paddingBottom: 18,
                borderBottom: i < 3 ? "1px solid rgba(10,10,10,0.07)" : "none",
              }}>
                <span style={{ flexShrink: 0, marginTop: 2, color: ink }}>
                  <p.Icon />
                </span>
                <div>
                  <div style={{ fontFamily: serif, fontWeight: 700, fontSize: "0.9rem", marginBottom: 4 }}>{p.title}</div>
                  <div style={{ fontFamily: sans, fontSize: "0.75rem", color: soft, lineHeight: 1.65 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        }
      />
    );

    // ── 9: Vision ─────────────────────────────────────────────────────────────
    case 9: return (
      <Center>
        <div style={{ fontFamily: mono, fontSize: "0.55rem", letterSpacing: "0.2em", color: soft, marginBottom: 28 }}>
          VISION
        </div>
        <H1 style={{ fontSize: "clamp(2.8rem,7vw,6.5rem)", marginBottom: 28 }}>
          Privacy is not<br />a feature. It is<br /><em style={{ fontStyle: "italic" }}>a right.</em>
        </H1>
        <Body style={{ maxWidth: 620, marginBottom: 44 }}>
          The internet was built open. Commerce moved on anyway.
          Blockchain is repeating the same mistake — public by default with no path
          to private. Encrypted Fi changes that. Users keep the same 0x wallet
          address they already have, the same MetaMask, the same Rabby, the same
          everything. They gain privacy without changing anything about how they use EVM.
        </Body>
        <Body style={{ maxWidth: 560, marginBottom: 52 }}>
          Every ERC-20 token deserves a confidential version. Every DeFi action
          deserves to be private by default. We are building the infrastructure
          that makes that possible on the chains where the value already lives.
        </Body>
        <div style={{ display: "flex", gap: 0, border: bdr }}>
          {[
            { Icon: IconGlobe,   label: "Any EVM chain",       val: "Same 0x address"          },
            { Icon: IconLock,    label: "Any ERC-20 token",    val: "Confidential by default"   },
            { Icon: IconShield,  label: "Compliance-ready",    val: "View keys + disclosure"    },
          ].map((s, i) => (
            <div key={s.label} style={{
              padding: "22px 28px", borderRight: i < 2 ? bdr : "none",
              background: i === 0 ? ink : "transparent",
              color: i === 0 ? white : ink,
              textAlign: "center" as const,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
            }}>
              <span style={{ opacity: i === 0 ? 0.7 : 0.8 }}>
                <s.Icon />
              </span>
              <div>
                <div style={{ fontFamily: mono, fontSize: "0.5rem", letterSpacing: "0.12em", opacity: 0.55, marginBottom: 4 }}>{s.label.toUpperCase()}</div>
                <div style={{ fontFamily: serif, fontWeight: 900, fontSize: "0.95rem" }}>{s.val}</div>
              </div>
            </div>
          ))}
        </div>
      </Center>
    );

    default: return <Center><Body>Slide not found.</Body></Center>;
  }
}

// ─── Slide strip labels ───────────────────────────────────────────────────────

const STRIP = [
  "COVER", "PROBLEM", "MARKET", "SOLUTION", "TECHNOLOGY",
  "CAPABILITIES", "TEAM", "COMPLIANCE", "VISION",
];

// ─── Main exported component ──────────────────────────────────────────────────

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
    <div style={{ minHeight: "100dvh", background: cream, display: "flex", flexDirection: "column" }}>

      {/* Top bar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        background: cream, borderBottom: bdr,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(16px,4vw,48px)", height: 52, gap: 16,
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: ink, flexShrink: 0 }}>
          <Image
            src="https://image2url.com/r2/default/images/1771982865555-91a426af-ecd8-4ca9-8e6b-11372ff845bf.png"
            alt="Encrypted Fi"
            width={26} height={26}
            style={{ objectFit: "contain" }}
          />
          <span style={{ fontFamily: serif, fontWeight: 900, fontSize: "0.72rem", letterSpacing: "0.06em" }}>
            ENCRYPTED{" "}
            <span style={{ background: ink, color: white, padding: "1px 4px", marginLeft: 2 }}>FI</span>
          </span>
        </a>

        <div style={{ fontFamily: mono, fontSize: "0.55rem", letterSpacing: "0.15em", color: soft }}>
          {meta.category}
        </div>

        <div style={{ fontFamily: mono, fontSize: "0.55rem", letterSpacing: "0.12em", color: soft, flexShrink: 0 }}>
          {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: "rgba(10,10,10,0.08)" }}>
        <div style={{
          height: "100%", background: ink,
          width: `${(current / total) * 100}%`,
          transition: "width 0.3s ease",
        }} />
      </div>

      {/* Slide content */}
      <div style={{ flex: 1, padding: "0 clamp(20px,5vw,72px)", display: "flex", flexDirection: "column" }}>
        <SlideContent n={current} />
      </div>

      {/* Bottom nav */}
      <div style={{
        borderTop: bdr,
        padding: "0 clamp(16px,4vw,48px)",
        height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
      }}>
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
          PREV
        </button>

        <div style={{ display: "flex", gap: 5, alignItems: "center", overflow: "hidden", maxWidth: "60vw" }}>
          {Array.from({ length: total }, (_, i) => i + 1).map(i => (
            <button
              key={i}
              onClick={() => go(i)}
              title={`Slide ${i}`}
              style={{
                width: i === current ? 22 : 6,
                height: 6, flexShrink: 0,
                background: i === current ? ink : "rgba(10,10,10,0.18)",
                border: "none", padding: 0, cursor: "pointer",
                transition: "width 0.2s, background 0.15s",
              }}
            />
          ))}
        </div>

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
          NEXT
        </button>
      </div>

      {/* Slide strip */}
      <div style={{ borderTop: bdr, display: "flex", overflowX: "auto" as const, background: cream }}>
        {Array.from({ length: total }, (_, i) => i + 1).map(i => (
          <button
            key={i}
            onClick={() => go(i)}
            style={{
              fontFamily: mono, fontSize: "0.48rem", letterSpacing: "0.1em",
              padding: "10px 16px", whiteSpace: "nowrap" as const,
              background: i === current ? ink : "transparent",
              color: i === current ? white : soft,
              border: "none", borderRight: bdr,
              cursor: "pointer", transition: "all 0.15s",
            }}
          >
            {String(i).padStart(2, "0")} {STRIP[i - 1]}
          </button>
        ))}
      </div>
    </div>
  );
}
