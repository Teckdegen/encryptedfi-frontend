export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { wrap: 36, font: 14, pad: "2px 8px" },
    md: { wrap: 44, font: 18, pad: "4px 12px" },
    lg: { wrap: 80, font: 34, pad: "10px 22px" },
  };
  const s = sizes[size];

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: "var(--ink)",
        padding: s.pad,
        border: "var(--border)",
        boxShadow: size === "lg" ? "var(--shadow-lg)" : "var(--shadow-sm)",
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        fontSize: s.font,
        letterSpacing: "-0.02em",
        userSelect: "none",
        lineHeight: 1,
      }}
    >
      <span style={{ color: "rgba(228,222,212,0.45)" }}>{"{"}</span>
      <span style={{ color: "#FFFFFF", margin: "0 2px" }}>?</span>
      <span style={{ color: "rgba(228,222,212,0.45)" }}>{"}"}</span>
    </div>
  );
}
