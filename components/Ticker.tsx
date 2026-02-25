const ITEMS = [
  "WRAP ANY TOKEN",
  "PRIVATE BALANCES ON-CHAIN",
  "ZERO KNOWLEDGE PROOFS",
  "NO TRUSTED PARTIES",
  "CONFIDENTIAL TRANSFERS",
  "LIVE ON INTEGRATED CHAINS",
  "FHE POWERED",
  "GROTH16 VERIFIED",
];

const TEXT = ITEMS.join("   ·   ") + "   ·   ";

export default function Ticker() {
  return (
    <div
      style={{
        background: "var(--ink)",
        borderBottom: "var(--border)",
        overflow: "hidden",
        height: 36,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          whiteSpace: "nowrap",
          animation: "ticker 30s linear infinite",
        }}
      >
        {[0, 1].map((n) => (
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
            {TEXT}
          </span>
        ))}
      </div>
    </div>
  );
}
