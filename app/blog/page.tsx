/* ─────────────────────────────────────────────────────────────────────────
   /blog — All posts listing page
───────────────────────────────────────────────────────────────────────── */
import Link from "next/link";
import { blogs } from "../../data/blogs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Updates - EncryptedFi",
  description: "Protocol updates, research notes, and build logs from EncryptedFi.",
};

export default function BlogPage() {
  return (
    <main style={{ background: "var(--cream)", minHeight: "100vh" }}>

      {/* Dark band header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 32px",
          borderTop: "var(--border)",
          borderBottom: "var(--border)",
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
          UPDATES
        </span>
        <div style={{ flex: 1, height: 1, background: "rgba(228,222,212,0.2)" }} />
      </div>

      <div className="section-inner" style={{ paddingTop: 64, paddingBottom: 96 }}>

        {/* Page header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap" as const,
            gap: 24,
            marginBottom: 64,
            paddingBottom: 32,
            borderBottom: "var(--border)",
          }}
        >
          <div>
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "rgba(10,10,10,0.4)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 20,
              }}
            >
              &larr; HOME
            </Link>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
              }}
            >
              What&rsquo;s
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>happening.</em>
            </h1>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.95rem",
                color: "var(--ink-soft)",
                marginTop: 14,
                lineHeight: 1.7,
              }}
            >
              Protocol updates, research notes, and build logs.
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
            VOL. 01 / 2026
          </span>
        </div>

        {/* Posts list */}
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 0 }}>
          {blogs.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <article
                className="blog-list-card"
                style={{
                  padding: "40px 0",
                  borderBottom: "var(--border)",
                  borderTop: i === 0 ? "var(--border)" : "none",
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    flexWrap: "wrap" as const,
                    gap: 16,
                    marginBottom: 16,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        background: "var(--ink)",
                        color: "var(--cream)",
                        padding: "3px 8px",
                      }}
                    >
                      {post.tag}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        color: "rgba(10,10,10,0.4)",
                      }}
                    >
                      {post.date}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.1em",
                      color: "rgba(10,10,10,0.35)",
                    }}
                  >
                    {post.readTime}
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    fontWeight: 800,
                    lineHeight: 1.15,
                    letterSpacing: "-0.015em",
                    marginBottom: 14,
                  }}
                >
                  {post.title}
                </h2>

                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.95rem",
                    lineHeight: 1.75,
                    color: "var(--ink-soft)",
                    maxWidth: 680,
                    marginBottom: 20,
                  }}
                >
                  {post.excerpt}
                </p>

                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: "var(--ink)",
                    borderBottom: "2px solid var(--ink)",
                    paddingBottom: 1,
                  }}
                >
                  READ FULL POST &rarr;
                </span>
              </article>
            </Link>
          ))}
        </div>

        {/* Bottom caption */}
        <div style={{ marginTop: 48, display: "flex", justifyContent: "flex-end" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "rgba(10,10,10,0.18)",
            }}
          >
            ENCRYPTED FI / UPDATES CHANNEL
          </span>
        </div>

      </div>
    </main>
  );
}
