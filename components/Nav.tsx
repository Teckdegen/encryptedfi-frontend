"use client";

import { useState } from "react";
import Image from "next/image";
import { MenuIcon, XIcon } from "./Icons";

const LINKS = [
  { label: "Use Cases",     href: "#usecases"   },
  { label: "Cryptography",  href: "#technology" },
  { label: "Twitter",       href: "#"           },
  { label: "GitHub",        href: "#"           },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "var(--cream)",
        borderBottom: "var(--border)",
      }}>
        <div style={{
          width: "100%",
          padding: "0 20px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>

          {/* Brand */}
          <a href="#" style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "var(--ink)",
          }}>
            <Image
              src="https://image2url.com/r2/default/images/1771982865555-91a426af-ecd8-4ca9-8e6b-11372ff845bf.png"
              alt="Encrypted Fi"
              width={34}
              height={34}
              style={{ objectFit: "contain", display: "block" }}
            />
            <span style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 900,
              fontSize: "0.82rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
            }}>
              ENCRYPTED
              <span style={{
                background: "var(--ink)",
                color: "var(--white)",
                padding: "1px 5px",
                marginLeft: 3,
              }}>FI</span>
            </span>
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--ink)",
            }}
          >
            {open ? <XIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile / dropdown menu */}
      {open && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99,
          background: "var(--ink)",
          display: "flex",
          flexDirection: "column",
          padding: "80px 40px 40px",
        }}>
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              top: 20,
              right: 32,
              background: "none",
              border: "var(--border)",
              cursor: "pointer",
              padding: "8px 10px",
              color: "var(--cream)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <XIcon size={20} color="var(--cream)" />
          </button>

          {/* Brand in menu */}
          <div style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 900,
            fontSize: "1rem",
            letterSpacing: "0.08em",
            color: "rgba(231,226,217,0.3)",
            marginBottom: 48,
            textTransform: "uppercase" as const,
          }}>
            ENCRYPTED FI
          </div>

          {/* Links */}
          <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 900,
                  fontSize: "clamp(2rem, 8vw, 3.5rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  textDecoration: "none",
                  color: "var(--white)",
                  borderBottom: "1px solid rgba(231,226,217,0.08)",
                  paddingBottom: 12,
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.5")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div style={{
            marginTop: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.14em",
            color: "rgba(231,226,217,0.2)",
          }}>
            © 2026 ENCRYPTED FI — ENCRYPTED LAYER FOR PUBLIC CHAINS
          </div>
        </div>
      )}
    </>
  );
}
