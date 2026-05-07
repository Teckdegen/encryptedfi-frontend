"use client";

import { useEffect, useState } from "react";

// Ticker Strip
const TICKER_ITEMS = [
  "HIDDEN LP POSITIONS",
  "TEE GOVERNANCE VOTES",
  "FULL DEFI PRIVACY LAYER",
  "WRAP ANY TOKEN",
  "PRIVATE BALANCES ONCHAIN",
  "HARDWARE ATTESTED",
  "EARN YIELD ANONYMOUSLY",
  "PRIVATE DEFI",
];

function TickerStrip() {
  const text = TICKER_ITEMS.join("   •   ") + "   •   ";
  
  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      background: "var(--ink)",
      borderBottom: "var(--border)",
      overflow: "hidden",
      height: 36,
      display: "flex",
      alignItems: "center",
      zIndex: 10,
    }}>
      <div style={{
        display: "inline-flex",
        whiteSpace: "nowrap",
        animation: "ticker 40s linear infinite",
      }}>
        {[0, 1, 2].map((n) => (
          <span
            key={n}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "rgba(228,222,212,0.45)",
              paddingRight: 0,
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

// Main Hero
export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      style={{
        background:    "var(--cream)",
        borderBottom:  "var(--border)",
        position:      "relative",
        overflow:      "hidden",
        minHeight:     "100vh",
        display:       "flex",
        alignItems:    "center",
        justifyContent:"center",
      }}
    >
      {/* Ticker at top */}
      <TickerStrip />

      <div style={{
        position:      "relative",
        zIndex:        1,
        textAlign:     "center",
        padding:       "80px 24px 40px",
        maxWidth:      "1200px",
        width:         "100%",
      }}>

        {/* Main headline - ENCRYPTED centered */}
        <h1 style={{
          fontFamily:    "var(--font-serif)",
          fontSize:      "clamp(3.5rem, 15vw, 11rem)",
          fontWeight:    900,
          lineHeight:    0.9,
          letterSpacing: "-0.04em",
          marginBottom:  24,
          animation:     "fadeUp 0.55s 0.1s ease both",
          textTransform: "uppercase",
        }}>
          ENCRYPTED
        </h1>

        {/* Underline */}
        <div style={{
          height:       3,
          background:   "var(--ink)",
          width:        "clamp(160px, 35%, 350px)",
          margin:       "0 auto 28px",
          animation:    "fadeUp 0.55s 0.15s ease both",
        }} />

        {/* Finance subtitle */}
        <h2 style={{
          fontFamily:    "var(--font-serif)",
          fontSize:      "clamp(1.8rem, 7vw, 5rem)",
          fontWeight:    700,
          fontStyle:     "italic",
          lineHeight:    1.1,
          letterSpacing: "-0.02em",
          marginBottom:  "clamp(48px, 8vh, 80px)",
          animation:     "fadeUp 0.55s 0.2s ease both",
        }}>
          Finance
        </h2>

        {/* CTAs */}
        <div style={{
          display:      "flex",
          gap:          16,
          flexDirection: "column",
          alignItems:   "center",
          animation:    "fadeUp 0.55s 0.3s ease both",
        }}
        className="hero-ctas">
          <a href="#usecases" style={{
            fontFamily:    "var(--font-mono)",
            fontWeight:    700,
            fontSize:      "0.75rem",
            letterSpacing: "0.12em",
            textDecoration:"none",
            color:         "var(--white)",
            background:    "var(--ink)",
            padding:       "18px 48px",
            border:        "var(--border)",
            boxShadow:     "var(--shadow)",
            display:       "inline-block",
            transition:    "transform 0.1s, box-shadow 0.1s",
            width:         "100%",
            maxWidth:      "400px",
            textAlign:     "center",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform  = "translate(-3px,-3px)";
            (e.currentTarget as HTMLElement).style.boxShadow  = "9px 9px 0 var(--ink)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform  = "";
            (e.currentTarget as HTMLElement).style.boxShadow  = "var(--shadow)";
          }}>
            GET STARTED
          </a>
          <a href="#technology" style={{
            fontFamily:    "var(--font-mono)",
            fontWeight:    700,
            fontSize:      "0.75rem",
            letterSpacing: "0.12em",
            textDecoration:"none",
            color:         "var(--ink)",
            background:    "transparent",
            padding:       "18px 48px",
            border:        "var(--border)",
            boxShadow:     "var(--shadow-sm)",
            display:       "inline-block",
            transition:    "transform 0.1s, box-shadow 0.1s",
            width:         "100%",
            maxWidth:      "400px",
            textAlign:     "center",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform  = "translate(-2px,-2px)";
            (e.currentTarget as HTMLElement).style.boxShadow  = "5px 5px 0 var(--ink)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform  = "";
            (e.currentTarget as HTMLElement).style.boxShadow  = "var(--shadow-sm)";
          }}>
            LEARN MORE
          </a>
        </div>

      </div>

      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        
        @media (min-width: 768px) {
          .hero-ctas {
            flex-direction: row !important;
            justify-content: center;
          }
          .hero-ctas a {
            width: auto !important;
            max-width: none !important;
            padding: 16px 36px !important;
          }
        }
      `}</style>
    </section>
  );
}
