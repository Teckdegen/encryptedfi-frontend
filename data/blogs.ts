/* ─────────────────────────────────────────────────────────────────────────
   blogs.ts
   Hardcoded blog data — add new posts here, they appear automatically
   on /blog and in the Updates section on the homepage.
───────────────────────────────────────────────────────────────────────── */

export interface StatBlock {
  value: string;
  label: string;
}

export type ContentBlock =
  | { type: "p";     text: string }
  | { type: "h2";    text: string }
  | { type: "h3";    text: string }
  | { type: "list";  items: string[] }
  | { type: "code";  text: string }
  | { type: "stats"; stats: StatBlock[] };

export interface BlogPost {
  slug:     string;
  title:    string;
  date:     string;
  tag:      string;
  excerpt:  string;
  readTime: string;
  content:  ContentBlock[];
}

/* ─────────────────────────────────────────────────────────────────────────
   Posts — newest first
───────────────────────────────────────────────────────────────────────── */
export const blogs: BlogPost[] = [

  /* ── Add posts here — newest first ─────────────────────────────────────
     Each post appears on /blog and the 3 newest show in the Updates section
     on the homepage automatically.

     Example shape:
     {
       slug:     "your-post-slug",
       title:    "Your Post Title",
       date:     "March 2026",
       tag:      "PROTOCOL",          // e.g. PROTOCOL / LAUNCH / UPDATE
       excerpt:  "One or two sentence preview shown on the listing page.",
       readTime: "5 min read",
       content: [
         { type: "p",    text: "A paragraph." },
         { type: "h2",   text: "A section heading" },
         { type: "h3",   text: "A sub-heading" },
         { type: "list", items: ["Item one", "Item two"] },
         { type: "code", text: "some code here" },
         { type: "stats", stats: [
           { value: "$4B+", label: "Stat label" },
         ]},
       ],
     },
  ────────────────────────────────────────────────────────────────────── */

];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find((b) => b.slug === slug);
}
