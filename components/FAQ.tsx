"use client";

/* ─────────────────────────────────────────────────────────────────────────
   FAQ.tsx
   Accordion FAQ — privacy questions answered for users.
   Placed before the footer on the homepage.
───────────────────────────────────────────────────────────────────────── */

import { useState } from "react";

const QUESTIONS = [
  {
    q: "Do I receive a new token when I wrap?",
    a: "No. You do not receive any new token or tradeable asset. What you get is a private note — a commitment hash that only you can prove ownership of using your private key. It lives in a global set on-chain with no address attached to it. Nothing is minted to your wallet.",
  },
  {
    q: "How does my wallet know I received funds?",
    a: "Your wallet scans every NoteCreated event on-chain and tries to decrypt each encrypted note using your private key. If decryption succeeds and the commitment hash matches, that note belongs to you. You are never notified directly — your wallet finds your notes automatically by trying your key on every new event.",
  },
  {
    q: "What exactly is the encrypted note?",
    a: "When someone sends to you, they encrypt a small blob containing the transfer amount and a blinding factor using your Ethereum public key. This ciphertext is stored on-chain attached to your commitment hash. Only you — with your private key — can decrypt it and learn what you received. Without it you cannot reconstruct your commitment and cannot spend the note.",
  },
  {
    q: "Why can't someone with my public key read my notes?",
    a: "Public keys encrypt. Private keys decrypt. Never the other way. Your public key is a point on the secp256k1 elliptic curve derived from your private key using a one-way function — impossible to reverse. Anyone can lock a note to you using your public key, including the sender. Only the holder of your private key can unlock it. The sender cannot read the note after sending it.",
  },
  {
    q: "Is my wallet address ever visible on-chain?",
    a: "No. When you transfer through EncryptedFi the on-chain sender shows as the protocol relay contract, not your wallet. Receiver addresses never appear in transactions, storage, or events. Only commitment hashes and encrypted blobs are written on-chain. Your address is not referenced anywhere.",
  },
  {
    q: "What happens to my tokens when I wrap?",
    a: "Your tokens are locked in the Vault contract. A ZK proof is generated proving you deposited a valid amount and a commitment hash is written to the contract's global note set. No address is stored — not in the mapping, not in events. The vault holds the underlying tokens and they are redeemable only by whoever can prove note ownership with a valid ZK proof.",
  },
  {
    q: "Can EncryptedFi see my balance?",
    a: "No. Your balance exists only as a set of encrypted notes on-chain. The EncryptedFi team cannot read them. Nobody can without your private key. Only the holder of your private key can decrypt the notes and sum the amounts. Not the relayer. Not the deployer. Nobody.",
  },
  {
    q: "Are transfers gasless?",
    a: "Yes. The relay server submits transactions on-chain on your behalf. You pay a small protocol fee deducted from your transfer amount. You never need to hold native chain tokens to transact privately inside the system.",
  },
  {
    q: "What if I lose access to my wallet?",
    a: "Your private notes are only recoverable with your private key. If you lose it, your notes are permanently inaccessible — the same as any self-custodied wallet. EncryptedFi cannot recover them for you. There is no admin key, no recovery mechanism. Back up your seed phrase.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      style={{ background: "var(--cream)", padding: "80px 0", borderTop: "var(--border)" }}
    >
      {/* Section label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 32px",
          borderTop: "var(--border)",
          borderBottom: "var(--border)",
          marginBottom: 64,
          background: "var(--ink)",
        }}
      >
        <div style={{ flex: 1, height: 1, background: "rgba(228,222,212,0.2)" }} />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            padding: "0 20px",
            color: "var(--cream)",
          }}
        >
          FAQ
        </span>
        <div style={{ flex: 1, height: 1, background: "rgba(228,222,212,0.2)" }} />
      </div>

      <div className="section-inner">

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap" as const,
            gap: 24,
            marginBottom: 56,
            paddingBottom: 32,
            borderBottom: "var(--border)",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                marginBottom: 14,
              }}
            >
              How it{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>actually</em>
              <br />
              works.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                color: "var(--ink-soft)",
                maxWidth: 400,
              }}
            >
              Privacy questions answered plainly.
            </p>
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "rgba(10,10,10,0.22)",
              paddingBottom: 4,
            }}
          >
            {QUESTIONS.length} QUESTIONS
          </span>
        </div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column" as const }}>
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{
                  borderBottom: "var(--border)",
                  borderTop: i === 0 ? "var(--border)" : "none",
                }}
              >
                {/* Question row — clickable */}
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    background: isOpen ? "var(--ink)" : "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "24px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 24,
                    textAlign: "left" as const,
                    transition: "background 0.15s",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(1rem, 2vw, 1.2rem)",
                      fontWeight: 700,
                      lineHeight: 1.3,
                      color: isOpen ? "var(--white)" : "var(--ink)",
                      flex: 1,
                      paddingLeft: isOpen ? 20 : 0,
                      transition: "color 0.15s, padding-left 0.15s",
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "1.2rem",
                      fontWeight: 300,
                      color: isOpen ? "rgba(228,222,212,0.6)" : "var(--ink)",
                      lineHeight: 1,
                      minWidth: 24,
                      textAlign: "center" as const,
                      paddingRight: isOpen ? 20 : 0,
                      transition: "color 0.15s",
                      flexShrink: 0,
                    }}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Answer — visible when open */}
                {isOpen && (
                  <div
                    style={{
                      background: "var(--ink)",
                      paddingBottom: 28,
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 2,
                        background: "rgba(228,222,212,0.2)",
                        marginBottom: 16,
                      }}
                    />
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.95rem",
                        lineHeight: 1.85,
                        color: "rgba(228,222,212,0.65)",
                        maxWidth: 720,
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
