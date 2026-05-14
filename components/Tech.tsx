import React from "react";
import { LockIcon } from "./Icons";

export default function Tech() {
  return (
    <section
      id="technology"
      style={{ background: "var(--cream)", padding: "80px 0" }}
    >
      <div className="section-inner">
        <div
          style={{
            border: "var(--border)",
            background: "var(--ink)",
            boxShadow: "var(--shadow-sm)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            padding: "32px 28px",
          }}
        >
          <LockIcon size={20} color="rgba(228,222,212,0.55)" strokeWidth={2} />
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "rgba(228,222,212,0.55)",
              lineHeight: 1.6,
            }}
          >
            POWERED BY FLARE CONFIDENTIAL COMPUTE.
          </p>
        </div>
      </div>
    </section>
  );
}
