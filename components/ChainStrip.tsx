"use client";

// Supported chain list
const CHAINS = [
  { name: "Ethereum",  abbr: "ETH",  bg: "#627EEA", text: "#FFF",    symbol: "Ξ"  },
  { name: "Arbitrum",  abbr: "ARB",  bg: "#213147", text: "#12AAFF", symbol: "△"  },
  { name: "Base",      abbr: "BASE", bg: "#0052FF", text: "#FFF",    symbol: "⬡"  },
  { name: "Optimism",  abbr: "OP",   bg: "#FF0420", text: "#FFF",    symbol: "●"  },
  { name: "Polygon",   abbr: "POL",  bg: "#8247E5", text: "#FFF",    symbol: "⬟"  },
  { name: "Flare",     abbr: "FLR",  bg: "#E22F2F", text: "#FFF",    symbol: "✦"  },
  { name: "BNB Chain", abbr: "BNB",  bg: "#F3BA2F", text: "#0A0A0A", symbol: "◆"  },
  { name: "Avalanche", abbr: "AVAX", bg: "#E84142", text: "#FFF",    symbol: "▲"  },
  { name: "Linea",     abbr: "LNX",  bg: "#121212", text: "#FFF",    symbol: "↗"  },
  { name: "Scroll",    abbr: "SCR",  bg: "#FFEEDA", text: "#0A0A0A", symbol: "↺"  },
  { name: "zkSync",    abbr: "ZKS",  bg: "#4E529A", text: "#FFF",    symbol: "Z"  },
  { name: "Mantle",    abbr: "MNT",  bg: "#000000", text: "#FFF",    symbol: "M"  },
];

/* Duplicate for seamless loop */
const DOUBLE = [...CHAINS, ...CHAINS];

export default function ChainStrip() {
  return (
    <div
      style={{
        background:   "var(--ink)",
        borderTop:    "var(--border)",
        borderBottom: "var(--border)",
        overflow:     "hidden",
        padding:      "0",
      }}
    >
      {/* Label + strip side by side */}
      <div style={{ display: "flex", alignItems: "stretch" }}>

        {/* Left label */}
        <div style={{
          flexShrink:    0,
          display:       "flex",
          alignItems:    "center",
          padding:       "16px 28px",
          borderRight:   "var(--border)",
          background:    "var(--cream)",
          whiteSpace:    "nowrap",
        }}>
          <span style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.58rem",
            fontWeight:    700,
            letterSpacing: "0.2em",
            color:         "rgba(10,10,10,0.5)",
          }}>
            SUPPORTED CHAINS
          </span>
        </div>

        {/* Scrolling strip */}
        <div style={{ overflow: "hidden", flex: 1, position: "relative" }}>
          {/* Fade edges */}
          <div style={{
            position:   "absolute",
            left:       0,
            top:        0,
            bottom:     0,
            width:      60,
            background: "linear-gradient(to right, var(--ink), transparent)",
            zIndex:     2,
            pointerEvents: "none",
          }} />
          <div style={{
            position:   "absolute",
            right:      0,
            top:        0,
            bottom:     0,
            width:      60,
            background: "linear-gradient(to left, var(--ink), transparent)",
            zIndex:     2,
            pointerEvents: "none",
          }} />

          <div className="chain-strip-inner" style={{ gap: 0 }}>
            {DOUBLE.map((c, i) => (
              <div
                key={i}
                title={c.name}
                style={{
                  display:       "flex",
                  alignItems:    "center",
                  gap:           10,
                  padding:       "14px 24px",
                  borderRight:   "1px solid rgba(231,226,217,0.08)",
                  cursor:        "default",
                  userSelect:    "none",
                  transition:    "background 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(231,226,217,0.06)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {/* Chain colour badge */}
                <div style={{
                  width:        32,
                  height:       32,
                  borderRadius: 6,
                  background:   c.bg,
                  display:      "flex",
                  alignItems:   "center",
                  justifyContent: "center",
                  fontFamily:   "var(--font-mono)",
                  fontWeight:   700,
                  fontSize:     "0.85rem",
                  color:        c.text,
                  flexShrink:   0,
                  border:       "1px solid rgba(255,255,255,0.1)",
                }}>
                  {c.symbol}
                </div>

                <div>
                  <div style={{
                    fontFamily:    "var(--font-mono)",
                    fontWeight:    700,
                    fontSize:      "0.65rem",
                    letterSpacing: "0.06em",
                    color:         "var(--cream)",
                    lineHeight:    1.2,
                  }}>
                    {c.abbr}
                  </div>
                  <div style={{
                    fontFamily:    "var(--font-sans)",
                    fontSize:      "0.6rem",
                    color:         "rgba(231,226,217,0.35)",
                    lineHeight:    1.2,
                  }}>
                    {c.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right label */}
        <div style={{
          flexShrink:  0,
          display:     "flex",
          alignItems:  "center",
          padding:     "16px 22px",
          borderLeft:  "var(--border)",
          background:  "var(--cream)",
        }}>
          <span style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.58rem",
            fontWeight:    700,
            letterSpacing: "0.14em",
            color:         "rgba(10,10,10,0.4)",
          }}>
            ANY EVM
          </span>
        </div>
      </div>
    </div>
  );
}
