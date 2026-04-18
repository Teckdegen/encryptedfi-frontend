"use client";

import { useState, useRef, useEffect } from "react";

const QUESTIONS = [
  {
    q: "What if someone scans the entire blockchain looking for my transfers?",
    a: "They get nothing useful. Every note on chain is a Poseidon hash — a 32-byte value that looks completely random without the private inputs that created it. The Poseidon hash is a one-way function. You cannot reverse it to find the amount, the blinding factor, or the receiver. The encrypted note attached to each event is ECIES ciphertext. Decrypting it requires the receiver's private key. Brute forcing secp256k1 private keys is computationally impossible with all computers on Earth running for billions of years. Even a full blockchain scan with unlimited resources gives an attacker only random-looking hashes and unreadable ciphertext.",
    tag: "SECURITY",
  },
  {
    q: "Do I receive a new token when I wrap?",
    a: "No. You do not receive any new token or tradeable asset. What you get is a private note — a commitment hash that only you can prove ownership of using your private key. It lives in a global set on chain with no address attached to it. Nothing is minted to your wallet.",
    tag: "BASICS",
  },
  {
    q: "How does my wallet know I received funds?",
    a: "Your wallet scans every NoteCreated event on chain and tries to decrypt each encrypted note using your private key. If decryption succeeds and the commitment hash matches, that note belongs to you. You are never notified directly. Your wallet finds your notes automatically by trying your key on every new event.",
    tag: "BASICS",
  },
  {
    q: "What exactly is the encrypted note?",
    a: "When someone sends to you, they encrypt a small blob containing the transfer amount and a blinding factor using your Ethereum public key. This ciphertext is stored on chain attached to your commitment hash. Only you, with your private key, can decrypt it and learn what you received. Without it you cannot reconstruct your commitment and cannot spend the note.",
    tag: "CRYPTOGRAPHY",
  },
  {
    q: "Why can't someone with my public key read my notes?",
    a: "Public keys encrypt. Private keys decrypt. Never the other way. Your public key is a point on the secp256k1 elliptic curve derived from your private key using a one-way function — impossible to reverse. Anyone can lock a note to you using your public key. Only the holder of your private key can unlock it. The sender cannot read the note after sending it.",
    tag: "CRYPTOGRAPHY",
  },
  {
    q: "Is my wallet address ever visible on chain?",
    a: "No. When you transfer through EncryptedFi the on chain sender shows as the protocol relay contract, not your wallet. Receiver addresses never appear in transactions, storage, or events. Only commitment hashes and encrypted blobs are written on chain. Your address is not referenced anywhere.",
    tag: "PRIVACY",
  },
  {
    q: "What happens to my tokens when I wrap?",
    a: "Your tokens are locked in the Vault contract. A ZK proof is generated proving you deposited a valid amount and a commitment hash is written to the contract's global note set. No address is stored — not in the mapping, not in events. The vault holds the underlying tokens and they are redeemable only by whoever can prove note ownership with a valid ZK proof.",
    tag: "BASICS",
  },
  {
    q: "Can EncryptedFi see my balance?",
    a: "No. Your balance exists only as a set of encrypted notes on chain. The EncryptedFi team cannot read them. Nobody can without your private key. Only the holder of your private key can decrypt the notes and sum the amounts. Not the relayer. Not the deployer. Nobody.",
    tag: "PRIVACY",
  },
  {
    q: "Are transfers gasless?",
    a: "Yes. The relay server submits transactions on chain on your behalf. You pay a small protocol fee deducted from your transfer amount. You never need to hold native chain tokens to transact privately inside the system.",
    tag: "BASICS",
  },
  {
    q: "What if I lose access to my wallet?",
    a: "Your private notes are only recoverable with your private key. If you lose it, your notes are permanently inaccessible — the same as any self custodied wallet. EncryptedFi cannot recover them for you. There is no admin key, no recovery mechanism. Back up your seed phrase.",
    tag: "SECURITY",
  },
  {
    q: "Can I prove my transaction history to an auditor without sharing my wallet?",
    a: "Yes. EncryptedFi has a built in compliance system. Your wallet derives a viewing key — a separate cryptographic key that can only decrypt your notes for reading, not spend them. The derivation is one way: your spending key produces the viewing key, but the viewing key cannot produce the spending key. You give the auditor just the viewing key. They run a scan tool against the live chain, decrypt every note that belongs to you, verify each commitment hash on chain, and produce a verified report of your full history including amounts, timestamps, and transaction hashes. They cannot move a single token.",
    tag: "COMPLIANCE",
  },
  {
    q: "What chains does EncryptedFi support?",
    a: "EncryptedFi is currently live on Flare, Ethereum, and Base. The vault factory is a single deploy — any EVM-compatible chain can run the full stack with one transaction. More chains are added on demand.",
    tag: "BASICS",
  },
  {
    q: "What is a nullifier and why does it matter?",
    a: "When you spend a note, a one-way hash derived from the note's secret is written on chain. This is the nullifier. It proves the note has been consumed without revealing which note it was. Anyone can verify the nullifier has not appeared before. Nobody can trace it back to the original note, the sender, or the receiver. It makes double spending impossible while preserving complete privacy.",
    tag: "CRYPTOGRAPHY",
  },
  {
    q: "How does the relayer know what to relay without reading my transaction?",
    a: "The relayer receives a ZK proof and a set of public inputs. It verifies the proof is valid using only those public values. Your private inputs — amount, blinding factor, secret key — never leave your device. The relayer submits a transaction it cannot read. It is a blind courier that gets paid a protocol fee for submitting.",
    tag: "PRIVACY",
  },
  {
    q: "Can I earn yield while staying private?",
    a: "Yes. EncryptedFi vaults are ERC-4626 compatible. Your note tracks a proportional share of the underlying yield vault. Yield accrues silently to your share price over time. You never appear in any deposit or withdrawal record on the yield protocol itself. Unwrapping redeems your shares and returns tokens plus accumulated yield.",
    tag: "BASICS",
  },
  {
    q: "How is this different from Tornado Cash?",
    a: "Tornado Cash supported only fixed denominations of a single asset per pool, had no yield, no composability, and no private swaps. EncryptedFi wraps any ERC-20 in any amount, supports yield while private, private swaps, private LP positions, private lending, and private governance — all backed by ZK proofs on every operation. It is a full private DeFi layer, not a simple mixer.",
    tag: "BASICS",
  },
];

const TAGS = ["ALL", "BASICS", "PRIVACY", "CRYPTOGRAPHY", "SECURITY", "COMPLIANCE"];

/* ── Animated answer panel ── */
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
