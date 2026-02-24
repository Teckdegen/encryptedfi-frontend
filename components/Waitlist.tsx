"use client";

import { useState } from "react";
import Logo from "./Logo";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  };

  return (
    <section
      id="waitlist"
      style={{
        background: "var(--ink)",
        borderTop: "var(--border)",
        padding: "80px 32px",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 64,
          alignItems: "center",
        }}
      >
        {/* Left */}
        <div>
          <div
            style={{
              display: "inline-block",
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              padding: "5px 12px",
              border: "2px solid rgba(228,222,212,0.2)",
              color: "rgba(228,222,212,0.5)",
              marginBottom: 24,
            }}
          >
            EARLY ACCESS
          </div>

          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "var(--white)",
              marginBottom: 16,
            }}
          >
            Be first.
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--cream)" }}>
              Stay private.
            </em>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "rgba(228,222,212,0.55)",
              maxWidth: 480,
              marginBottom: 32,
            }}
          >
            We're bringing privacy to ERC20s. Join the waitlist and be among
            the first to access Encrypted Fi when we launch.
          </p>

          {done ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#7EFF7E",
                border: "2px solid rgba(126,255,126,0.2)",
                padding: "14px 24px",
                width: "fit-content",
              }}
            >
              <span>✓</span> YOU'RE ON THE LIST
            </div>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", maxWidth: 460, marginBottom: 10 }}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    flex: 1,
                    padding: "14px 18px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.95rem",
                    background: "rgba(228,222,212,0.08)",
                    border: "2px solid rgba(228,222,212,0.2)",
                    borderRight: "none",
                    color: "var(--cream)",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "14px 22px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    background: "var(--cream)",
                    color: "var(--ink)",
                    border: "2px solid var(--cream)",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  JOIN WAITLIST
                </button>
              </form>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.08em",
                  color: "rgba(228,222,212,0.3)",
                }}
              >
                No spam. No tracking. Just updates when we launch.
              </p>
            </>
          )}
        </div>

        {/* Right — big logo */}
        <div>
          <Logo size="lg" />
        </div>
      </div>
    </section>
  );
}
