"use client";

import { useState, useRef, useEffect } from "react";

const QUESTIONS = [
  {
    q: "What can I do privately on EncryptedFi?",
    a: "Private swaps via SparkDEX, private lending and borrowing via Kinetic Finance, private staking via sFLR, private LP positions, private FAsset execution (FXRP live), private governance voting, private oracle queries, private wallet-to-wallet messaging, private attestations, and private liquidation protection. Every action goes through the TEE — your wallet never appears on chain after the initial deposit.",
    tag: "FEATURES",
  },
  {
    q: "Do I need to register before receiving tokens?",
    a: "No. Any fresh wallet can receive private tokens without ever having done anything on-chain. The sender just types your address. When you open the app, your tokens are there. Zero friction, zero registration.",
    tag: "BASICS",
  },
  {
    q: "How do private swaps work?",
    a: "You sign a swap instruction off-chain. The TEE decrypts it inside a hardware enclave, queries SparkDEX for a quote, adds a random timing delay, then executes the swap from its own wallet. SparkDEX sees the protocol contract swapping, not you. Your address never appears.",
    tag: "FEATURES",
  },
  {
    q: "What is Flare Confidential Compute?",
    a: "Flare FCC is hardware-attested TEE infrastructure built into the Flare network. The private key that decrypts your instructions is sealed inside hardware by Flare's attestation service. Nobody can extract it — not us, not Flare, not anyone. Multiple TEE machines must agree before anything executes. This is only available on Flare.",
    tag: "TEE",
  },
  {
    q: "Why does this only work on Flare?",
    a: "Flare has native TEE infrastructure (Confidential Compute) built into the network with on-chain verification. Other chains would need off-chain trusted servers or ZK circuits that take minutes to prove. On Flare the TEE is part of the infrastructure, sealed by hardware attestation, with multi-machine consensus built in.",
    tag: "TEE",
  },
  {
    q: "Is my wallet address ever visible on chain?",
    a: "Only once — your initial deposit. After that, the TEE hot wallet submits every transaction on your behalf. Your address never appears in any event, any storage slot, or any transaction. Observers see random bytes and encrypted blobs.",
    tag: "PRIVACY",
  },
  {
    q: "Can EncryptedFi see my balance?",
    a: "No. Your notes are encrypted with your own key, not ours. The TEE operator cannot read them. Nobody can without your private key. If our system goes down, you can still decrypt all your notes and recover your tokens from the blockchain directly.",
    tag: "PRIVACY",
  },
  {
    q: "How does private governance work?",
    a: "You cast your vote encrypted to the TEE. The TEE tallies all votes inside the hardware enclave and only posts the final aggregate result on-chain. Nobody can see which wallet voted or how. Prevents vote buying, pressure, and governance manipulation.",
    tag: "FEATURES",
  },
  {
    q: "What are private attestations?",
    a: "You can prove things about your portfolio without revealing it. Statements like 'I hold more than 10k USDC' or 'I have never interacted with sanctioned addresses' — the TEE verifies the claim inside the enclave and signs a proof. Verifiable without exposing your actual state.",
    tag: "FEATURES",
  },
  {
    q: "How does liquidation protection work?",
    a: "You set private stop-losses and collateral top-ups inside the TEE. The TEE monitors your position privately. Liquidation hunters cannot see your health factor or target you. If your position hits the threshold, the TEE automatically protects it before liquidators can act.",
    tag: "FEATURES",
  },
  {
    q: "Can AI agents use this?",
    a: "Yes. Any software that holds a private key can use EncryptedFi as a privacy rail. AI agents register a spending key and execute DeFi strategies through the same encrypted channel as human users. Their logic, positions, and triggers are completely invisible on-chain.",
    tag: "FEATURES",
  },
  {
    q: "Are transactions gasless?",
    a: "Yes. The TEE submits all transactions using its own funded hot wallet. You pay a small relay fee deducted from your transfer amount. You never need to hold FLR to transact privately.",
    tag: "BASICS",
  },
  {
    q: "Can I prove my history to an auditor?",
    a: "Yes. Register a view key — a read-only key that decrypts your notes but cannot spend them. Give the auditor the view key. They verify your history without being able to move any tokens.",
    tag: "COMPLIANCE",
  },
  {
    q: "Can other protocols integrate?",
    a: "Yes. Any protocol on Flare that accepts ERC-20 tokens can be wrapped with privacy. The protocol doesn't need to change anything. We handle the privacy layer on our side. New integrations can be added after deployment without touching core contracts.",
    tag: "BASICS",
  },
];

const TAGS = ["ALL", "FEATURES", "BASICS", "PRIVACY", "TEE", "SECURITY", "COMPLIANCE"];

// Animated answer panel
function Answer({ text, open }: { text: string; open: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    if (open) {
      setHeight(ref.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open]);

  return (
    <div
      style={{
        overflow: "hidden",
        height,
        transition: "height 0.38s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div ref={ref} style={{ background: "var(--ink)", paddingBottom: 28, paddingLeft: 20, paddingRight: 20 }}>
        <div style={{ width: 32, height: 2, background: "rgba(228,222,212,0.2)", marginBottom: 16 }} />
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.95rem",
          lineHeight: 1.85,
          color: "rgba(228,222,212,0.65)",
          maxWidth: 720,
        }}>
          {text}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState("ALL");
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  /* "/" keyboard shortcut focuses the search box */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape") {
        setSearch("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered = QUESTIONS.filter((q) => {
    const matchTag = activeTag === "ALL" || q.tag === activeTag;
    const matchSearch =
      search.trim() === "" ||
      q.q.toLowerCase().includes(search.toLowerCase()) ||
      q.a.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  return (
    <section
      id="faq"
      style={{ background: "var(--cream)", padding: "80px 0", borderTop: "var(--border)" }}
    >
      {/* Section label */}
      <div style={{
        display: "flex", alignItems: "center",
        padding: "10px 32px",
        borderTop: "var(--border)", borderBottom: "var(--border)",
        marginBottom: 64,
        background: "var(--ink)",
      }}>
        <div style={{ flex: 1, height: 1, background: "rgba(228,222,212,0.2)" }} />
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "0.68rem",
          fontWeight: 700, letterSpacing: "0.2em",
          padding: "0 20px", color: "var(--cream)",
        }}>FAQ</span>
        <div style={{ flex: 1, height: 1, background: "rgba(228,222,212,0.2)" }} />
      </div>

      <div className="section-inner">

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between", flexWrap: "wrap" as const,
          gap: 24, marginBottom: 40,
          paddingBottom: 32, borderBottom: "var(--border)",
        }}>
          <div>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.02em",
              marginBottom: 14,
            }}>
              How it{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>actually</em>
              <br />works.
            </h2>
            <p style={{
              fontFamily: "var(--font-sans)", fontSize: "0.95rem",
              lineHeight: 1.75, color: "var(--ink-soft)", maxWidth: 400,
            }}>
              Privacy questions answered plainly.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "flex-end", gap: 4 }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.6rem",
              fontWeight: 700, letterSpacing: "0.14em",
              color: "rgba(10,10,10,0.22)",
            }}>
              {QUESTIONS.length} QUESTIONS
            </span>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.52rem",
              color: "rgba(10,10,10,0.2)", letterSpacing: "0.08em",
            }}>
              PRESS / TO SEARCH
            </span>
          </div>
        </div>

        {/* Search + tag filters */}
        <div style={{ marginBottom: 40, display: "flex", flexDirection: "column" as const, gap: 16 }}>

          {/* Search input */}
          <div style={{ position: "relative" as const, maxWidth: 480 }}>
            <span style={{
              position: "absolute" as const, left: 14, top: "50%",
              transform: "translateY(-50%)",
              fontFamily: "var(--font-mono)", fontSize: "0.7rem",
              color: "rgba(10,10,10,0.3)", pointerEvents: "none",
            }}>⌕</span>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search questions…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setOpen(null); }}
              style={{
                width: "100%",
                fontFamily: "var(--font-mono)", fontSize: "0.78rem",
                padding: "12px 56px 12px 36px",
                border: "var(--border)",
                background: "var(--white)",
                color: "var(--ink)",
                outline: "none",
                boxShadow: "var(--shadow-sm)",
              }}
            />
            {!search && (
              <span style={{
                position: "absolute" as const, right: 12, top: "50%",
                transform: "translateY(-50%)",
                fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                fontWeight: 700, color: "rgba(10,10,10,0.2)",
                padding: "2px 6px", border: "1px solid rgba(10,10,10,0.1)",
                pointerEvents: "none",
              }}>/</span>
            )}
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  position: "absolute" as const, right: 12, top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "var(--font-mono)", fontSize: "0.75rem",
                  color: "rgba(10,10,10,0.4)",
                }}
              >✕</button>
            )}
          </div>

          {/* Tag pills */}
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
            {TAGS.map((tag) => {
              const active = activeTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => { setActiveTag(tag); setOpen(null); }}
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.58rem",
                    fontWeight: 700, letterSpacing: "0.14em",
                    padding: "6px 14px",
                    border: "var(--border)",
                    background: active ? "var(--ink)" : "transparent",
                    color: active ? "var(--cream)" : "rgba(10,10,10,0.5)",
                    cursor: "pointer",
                    transition: "background 0.15s, color 0.15s, transform 0.1s",
                    transform: active ? "translate(-2px,-2px)" : "none",
                    boxShadow: active ? "var(--shadow-sm)" : "none",
                  }}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Result count */}
        {(search || activeTag !== "ALL") && (
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "0.6rem",
            fontWeight: 700, letterSpacing: "0.12em",
            color: "rgba(10,10,10,0.3)", marginBottom: 20,
          }}>
            {filtered.length} RESULT{filtered.length !== 1 ? "S" : ""}
          </div>
        )}

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column" as const }}>
          {filtered.length === 0 && (
            <div style={{
              padding: "40px 0",
              fontFamily: "var(--font-mono)", fontSize: "0.75rem",
              color: "rgba(10,10,10,0.3)", letterSpacing: "0.1em",
              textAlign: "center" as const,
            }}>
              NO RESULTS — TRY A DIFFERENT SEARCH
            </div>
          )}

          {filtered.map((item, i) => {
            const globalIdx = QUESTIONS.indexOf(item);
            const isOpen = open === globalIdx;

            return (
              <div
                key={globalIdx}
                style={{
                  borderBottom: "var(--border)",
                  borderTop: i === 0 ? "var(--border)" : "none",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : globalIdx)}
                  style={{
                    width: "100%",
                    background: isOpen ? "var(--ink)" : "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "22px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 24,
                    textAlign: "left" as const,
                    transition: "background 0.2s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, paddingLeft: isOpen ? 20 : 0, transition: "padding-left 0.2s" }}>
                    {/* Tag badge */}
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: "0.48rem",
                      fontWeight: 700, letterSpacing: "0.14em",
                      padding: "2px 7px",
                      border: `1px solid ${isOpen ? "rgba(228,222,212,0.2)" : "rgba(10,10,10,0.15)"}`,
                      color: isOpen ? "rgba(228,222,212,0.4)" : "rgba(10,10,10,0.35)",
                      whiteSpace: "nowrap" as const,
                      flexShrink: 0,
                    }}>{item.tag}</span>

                    <span style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(1rem, 2vw, 1.2rem)",
                      fontWeight: 700, lineHeight: 1.3,
                      color: isOpen ? "var(--white)" : "var(--ink)",
                      transition: "color 0.2s",
                    }}>
                      {item.q}
                    </span>
                  </div>

                  {/* +/- icon with rotation */}
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "1.2rem",
                    fontWeight: 300,
                    color: isOpen ? "rgba(228,222,212,0.6)" : "var(--ink)",
                    lineHeight: 1, minWidth: 24,
                    textAlign: "center" as const,
                    paddingRight: isOpen ? 20 : 0,
                    transition: "color 0.2s, transform 0.3s",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    display: "inline-block",
                    flexShrink: 0,
                  }}>+</span>
                </button>

                <Answer text={item.a} open={isOpen} />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
