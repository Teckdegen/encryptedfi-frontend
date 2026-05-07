"use client";

import { useState, useRef, useEffect } from "react";

const QUESTIONS = [
  {
    q: "Does EncryptedFi support private transfers?",
    a: "Yes. Private transfers are the core feature. You send tokens to anyone without your wallet address appearing on chain. The on-chain record shows only random-looking commitment hashes and nullifiers — nothing links sender to receiver. The TEE relayer submits the transaction so your wallet never touches the chain.",
    tag: "FEATURES",
  },
  {
    q: "Can I swap tokens privately?",
    a: "Yes. Private swaps are built in. You burn a private note, the TEE routes the tokens through SparkDEX, and re-deposits the output as a new private note. No one sees the swap happened, the amounts, or that you were involved. Your wallet address never appears.",
    tag: "FEATURES",
  },
  {
    q: "What private DeFi can I do?",
    a: "Private transfers, private swaps (SparkDEX), private lending (Kinetic Finance), private staking (sFLR), private LP positions, and private yield. Every action goes through the TEE — your wallet never appears on chain after the initial deposit.",
    tag: "FEATURES",
  },
  {
    q: "What if someone scans the entire blockchain looking for my activity?",
    a: "They get nothing useful. Every note on chain is a random-looking 32-byte hash with no address attached. The TEE relayer submits all transactions — your wallet never appears as sender. Encrypted note blobs are unreadable without your private key. A full blockchain scan returns only random hashes and unreadable ciphertext.",
    tag: "SECURITY",
  },
  {
    q: "Is my wallet address ever visible on chain?",
    a: "No. After your initial deposit, the TEE's hot wallet submits every transaction on your behalf. Receiver addresses never appear in transactions, storage, or events. Only commitment hashes and encrypted blobs are written on chain. Your address is not referenced anywhere.",
    tag: "PRIVACY",
  },
  {
    q: "What is a TEE and why does it matter?",
    a: "A TEE (Trusted Execution Environment) is a secure hardware enclave — a region of the processor where code runs in complete isolation. Not even the machine operator can read what happens inside. EncryptedFi uses Flare FCC (Flare Confidential Compute) to run the TEE. Your spending key is encrypted and stored inside the enclave. It never leaves in plaintext. The TEE generates proofs, executes DeFi actions, and submits transactions — all privately, all inside hardware.",
    tag: "TEE",
  },
  {
    q: "What does the TEE actually do?",
    a: "The TEE handles four things: it stores your spending key (encrypted, inside hardware), it scans chain events to find your notes, it generates the cryptographic proofs needed to spend notes, and it submits transactions to the vault using its own hot wallet. Your wallet signs nothing after deposit.",
    tag: "TEE",
  },
  {
    q: "Can EncryptedFi see my balance?",
    a: "No. Your balance exists only as encrypted notes on chain. The EncryptedFi team cannot read them. The TEE operator cannot read them. Nobody can without your private key. Not the relayer. Not the deployer. Nobody.",
    tag: "PRIVACY",
  },
  {
    q: "Are transactions gasless?",
    a: "Yes. The TEE submits all transactions on your behalf using its own funded hot wallet. You pay a small protocol fee deducted from your transfer amount. You never need to hold native FLR tokens to transact privately inside the system.",
    tag: "BASICS",
  },
  {
    q: "Do I get a new token when I deposit?",
    a: "No. You receive a private note — a commitment hash that only you can prove ownership of using your private key. Nothing is minted to your wallet. The note lives in a global set on chain with no address attached to it.",
    tag: "BASICS",
  },
  {
    q: "What if I lose access to my wallet?",
    a: "Your private notes are only recoverable with your private key. If you lose it, your notes are permanently inaccessible — the same as any self-custodied wallet. EncryptedFi cannot recover them. There is no admin key, no recovery mechanism. Back up your seed phrase.",
    tag: "SECURITY",
  },
  {
    q: "Can I prove my history to an auditor without revealing everything?",
    a: "Yes. EncryptedFi has a built-in compliance system. You register a view key — a read-only key that decrypts your notes but cannot spend them. You give the auditor just the view key. They scan the chain, decrypt your notes, verify the hashes, and produce a verified report. They cannot move a single token.",
    tag: "COMPLIANCE",
  },
  {
    q: "What chains does EncryptedFi support?",
    a: "EncryptedFi is built on Flare, using Flare FCC for the TEE infrastructure. Flare is the only chain with native TEE compute at the protocol level, making it the ideal home for private DeFi.",
    tag: "BASICS",
  },
  {
    q: "How is this different from Tornado Cash?",
    a: "Tornado Cash was a fixed-denomination mixer with no DeFi, no yield, and no private swaps. EncryptedFi is a full private DeFi layer — any token, any amount, private swaps, private lending, private staking, and compliance tools built in. It runs on Flare with hardware-level privacy via TEE, not just cryptographic obfuscation.",
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
