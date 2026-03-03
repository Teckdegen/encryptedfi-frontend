/* ─────────────────────────────────────────────────────────
   Updates.tsx
   Shows the 3 newest blog posts + link to /blog.
   Add new posts in data/blogs.ts, they appear here automatically.
───────────────────────────────────────────────────────── */
import Link from "next/link";
import { blogs } from "../data/blogs";

export default function Updates() {
  return (
    <section
      id="updates"
      style={{ background: "var(--cream)", padding: "80px 0" }}
    >
      {/* Section rule */}
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
          UPDATES
        </span>
        <div style={{ flex: 1, height: 1, background: "rgba(228,222,212,0.2)" }} />
      </div>

      <div className="section-inner">

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap" as const,
            gap: 32,
            marginBottom: 48,
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
              What&rsquo;s
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>happening.</em>
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
              Protocol updates, research notes, and build logs.
            </p>
          </div>

          {/* Issue tag */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "rgba(10,10,10,0.25)",
              paddingTop: 6,
            }}
          >
            VOL. 01 / 2026
          </div>
        </div>

        {/* 3 newest posts only */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {blogs.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <article
                className="updates-card"
                style={{
                  border: "var(--border)",
                  padding: "40px",
                  cursor: "pointer",
                  boxShadow: "var(--shadow)",
                  transition: "transform 0.12s, box-shadow 0.12s",
                }}
              >
                {/* Meta row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap" as const,
                    gap: 12,
                    marginBottom: 24,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
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

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
                    fontWeight: 800,
                    lineHeight: 1.2,
                    letterSpacing: "-0.015em",
                    marginBottom: 16,
                  }}
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.93rem",
                    lineHeight: 1.8,
                    color: "var(--ink-soft)",
                    maxWidth: 640,
                    marginBottom: 28,
                  }}
                >
                  {post.excerpt}
                </p>

                {/* CTA */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap" as const,
                    gap: 12,
                    borderTop: "var(--border-sm)",
                    paddingTop: 20,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      color: "var(--ink)",
                    }}
                  >
                    READ FULL POST &rarr;
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      color: "rgba(10,10,10,0.28)",
                    }}
                  >
                    encryptedfi.xyz/blog/{post.slug}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View all link */}
        <div
          style={{
            marginTop: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap" as const,
            gap: 12,
          }}
        >
          <Link
            href="/blog"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "var(--ink)",
              textDecoration: "none",
              borderBottom: "2px solid var(--ink)",
              paddingBottom: 1,
            }}
          >
            VIEW ALL UPDATES &rarr;
          </Link>

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
    </section>
  );
}
