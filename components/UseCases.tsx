"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  LockIcon, ChartIcon, BriefcaseIcon,
  BuildingIcon, GavelIcon, ShieldIcon,
  TrendingUpIcon, ArrowsIcon, LayersIcon,
  KeyIcon, ZapIcon, GlobeIcon, CoinIcon,
} from "./Icons";

const CASES = [
  { n: "01", Icon: LockIcon,       title: "Private Transfers",          one: "Send tokens. Reveal nothing.",          dark: false },
  { n: "02", Icon: ChartIcon,      title: "Hidden Positions",           one: "Your portfolio. Your secret.",          dark: true  },
  { n: "03", Icon: BriefcaseIcon,  title: "Private Payroll",            one: "Pay your team. Not publicly.",          dark: false },
  { n: "04", Icon: BuildingIcon,   title: "Institutional Privacy",      one: "Enterprise finance. Encrypted.",        dark: false },
  { n: "05", Icon: GavelIcon,      title: "Sealed Bids",                one: "Commit. Reveal. Win.",                  dark: true  },
  { n: "06", Icon: ShieldIcon,     title: "MEV Shield",                 one: "Your intent stays private.",            dark: false },
  { n: "07", Icon: TrendingUpIcon, title: "Confidential Yields",        one: "Earn DeFi yield. Stay private.",        dark: false },
  { n: "08", Icon: ArrowsIcon,     title: "Private Swaps",              one: "Swap tokens. Your address, hidden.",    dark: true  },
  { n: "09", Icon: LayersIcon,     title: "Hidden Liquidity",           one: "Provide LP. Leave no trace.",           dark: false },
  { n: "10", Icon: KeyIcon,        title: "Confidential Lending",       one: "Borrow. Your collateral, hidden.",      dark: false },
  { n: "11", Icon: ZapIcon,        title: "Private Governance",         one: "Vote. Nobody knows it was you.",        dark: true  },
  { n: "12", Icon: GlobeIcon,      title: "Any EVM, Any Token",         one: "Multichain. Universal.",                dark: false },
  { n: "13", Icon: CoinIcon,       title: "Private Stablecoin Payments",one: "Pay with stables. Leave no trace.",     dark: true  },
];

/* ── Single card with stagger reveal + 3D cursor tilt ── */
function UCCard({
  c, i, isLastRow, isLastCol,
}: {
  c: typeof CASES[0];
  i: number;
  isLastRow: boolean;
  isLastCol: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!visible) return;
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    el.style.transition = "transform 0.07s ease";
    el.style.transform  = `perspective(520px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg) translateY(-6px) scale(1.02)`;
  };

  const onLeave = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.transition = "transform 0.55s cubic-bezier(0.34,1.56,0.64,1)";
    el.style.transform  = "";
  };

  const iconColor = c.dark ? "rgba(231,226,217,0.65)" : "var(--ink)";

  return (
    <div
      ref={ref}
      className="uc-card"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        background: c.dark
          ? "var(--ink)"
          : i % 2 === 0 ? "var(--white)" : "var(--cream)",
        borderRight: isLastCol ? "none" : "var(--border)",
        borderBottom: isLastRow ? "none" : "var(--border)",
        opacity: visible ? 1 : 0,
        transform: visible ? "" : "translateY(28px)",
        transition: `opacity 0.55s ease ${i * 0.045}s, transform 0.55s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.045}s`,
      }}
    >
      {/* Ghost number */}
      <span style={{
        position: "absolute", top: 12, right: 18,
        fontFamily: "var(--font-serif)", fontWeight: 900,
        fontSize: "5rem", lineHeight: 1,
        color: c.dark ? "var(--cream)" : "var(--ink)",
        opacity: 0.05, userSelect: "none",
      }}>{i + 1}</span>

      {/* Icon + index */}
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

      {/* Title */}
      <h3 style={{
        fontFamily: "var(--font-serif)", fontWeight: 900,
        fontSize: "clamp(1.1rem, 2vw, 1.3rem)", lineHeight: 1.15,
        color: c.dark ? "var(--white)" : "var(--ink)", marginBottom: 10,
      }}>{c.title}</h3>

      {/* One-liner */}
      <p style={{
        fontFamily: "var(--font-mono)", fontSize: "0.62rem",
        fontWeight: 700, letterSpacing: "0.08em",
        color: c.dark ? "rgba(231,226,217,0.45)" : "rgba(10,10,10,0.45)",
      }}>{c.one}</p>
    </div>
  );
}

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
          <em style={{ fontStyle: "italic", fontWeight: 700 }}>DeFi primitive.</em>
        </h2>

        <div style={{ borderLeft: "4px solid var(--ink)", paddingLeft: 24 }}>
          <p style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            lineHeight: 1.65,
            color: "var(--ink-soft)",
          }}>
            "The moment your assets wrap, they move privately."
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid-3" style={{ borderBottom: "var(--border)" }}>
        {CASES.map((c, i) => {
          const isLastRow = i >= CASES.length - (CASES.length % 3 || 3);
          const isLastCol = (i + 1) % 3 === 0;
          return (
            <UCCard
              key={c.n}
              c={c}
              i={i}
              isLastRow={isLastRow}
              isLastCol={isLastCol}
            />
          );
        })}
      </div>
    </section>
  );
}
