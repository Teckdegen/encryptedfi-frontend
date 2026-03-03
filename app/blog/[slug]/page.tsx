/* ─────────────────────────────────────────────────────────────────────────
   /blog/[slug] — Individual blog post page
───────────────────────────────────────────────────────────────────────── */
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogs, getBlogBySlug } from "../../../data/blogs";
import type { ContentBlock } from "../../../data/blogs";
import type { Metadata } from "next";

/* Pre-render all slugs at build time */
export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getBlogBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} - EncryptedFi`,
    description: post.excerpt,
  };
}

/* Content block renderer */
function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {

    case "h2":
      return (
        <h2 key={i} className="blog-h2">
          {block.text}
        </h2>
      );

    case "h3":
      return (
        <h3 key={i} className="blog-h3">
          {block.text}
        </h3>
      );

    case "p":
      return (
        <p key={i} className="blog-p">
          {block.text}
        </p>
      );

    case "list":
      return (
        <ul key={i} className="blog-list">
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );

    case "code":
      return (
        <pre key={i} className="blog-code">
          <code>{block.text}</code>
        </pre>
      );

    case "stats":
      return (
        <div key={i} className="blog-stats">
          {block.stats.map((s, j) => (
            <div key={j} className="blog-stat-cell">
              <span className="blog-stat-value">{s.value}</span>
              <span className="blog-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogBySlug(params.slug);
  if (!post) notFound();

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

      <div className="blog-post-container">

        {/* Back link */}
        <Link href="/blog" className="blog-back-link">
          &larr; ALL UPDATES
        </Link>

        {/* Post header */}
        <header className="blog-post-header">

          {/* Tag + date row */}
          <div className="blog-meta-row">
            <span className="blog-tag">{post.tag}</span>
            <span className="blog-date">{post.date}</span>
            <span className="blog-read-time">{post.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="blog-post-title">{post.title}</h1>

          {/* Excerpt */}
          <p className="blog-post-excerpt">{post.excerpt}</p>

          {/* Divider */}
          <div className="blog-post-divider" />
        </header>

        {/* Content */}
        <article className="blog-post-body">
          {post.content.map((block, i) => renderBlock(block, i))}
        </article>

        {/* Footer */}
        <footer className="blog-post-footer">
          <div className="blog-post-footer-inner">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "rgba(10,10,10,0.22)",
              }}
            >
              ENCRYPTED FI / {post.date.toUpperCase()}
            </span>
            <Link href="/blog" className="blog-back-link" style={{ marginTop: 0 }}>
              &larr; BACK TO ALL UPDATES
            </Link>
          </div>
        </footer>

      </div>
    </main>
  );
}
