"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Typewriter hook ─────────────────────────────────── */
function useTypewriter(words: string[], speed = 90, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx]     = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const delay   = deleting ? speed / 2 : speed;

    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx(c => c + 1);
        }
      } else {
        setDisplayed(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx(w => (w + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx(c => c - 1);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

/* ─── Counter hook ────────────────────────────────────── */
function useCounter(target: number | null, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (target === null) return;
    const start     = performance.now();
    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [target, duration]);
  return count;
}

/* ─── Particle canvas ─────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx    = canvas.getContext("2d");
    if (!ctx)    return;

    let raf: number;
    const W = () => canvas.width  = canvas.offsetWidth;
    const H = () => canvas.height = canvas.offsetHeight;
    W(); H();

    const CHARS = "0123456789abcdef";
    const hexFrag = () => "0x" + Array.from({ length: 4 },
      () => CHARS[Math.floor(Math.random() * CHARS.length)]).join("");

    type Particle = {
      x: number; y: number;
      speed: number; opacity: number;
      size: number; text: string;
      life: number; maxLife: number;
    };

    const particles: Particle[] = [];

    const spawn = () => {
      if (particles.length > 72) return;
      const maxLife = 260 + Math.random() * 220;
      // spawn from bottom 60% of canvas so they drift up through the full hero
      const startY = canvas.height * 0.6 + Math.random() * canvas.height * 0.5;
      particles.push({
        x:       Math.random() * canvas.width,
        y:       startY,
        speed:   0.28 + Math.random() * 0.52,
        opacity: 0,
        size:    8 + Math.random() * 5,
        text:    hexFrag(),
        life:    0,
        maxLife,
      });
    };

    // pre-seed so the canvas isn't empty on first paint
    for (let i = 0; i < 48; i++) {
      const maxLife = 260 + Math.random() * 220;
      particles.push({
        x:       Math.random() * (canvas.width  || 400),
        y:       Math.random() * (canvas.height || 600),
        speed:   0.28 + Math.random() * 0.52,
        opacity: 0,
        size:    8 + Math.random() * 5,
        text:    hexFrag(),
        life:    Math.floor(Math.random() * maxLife),
        maxLife,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // spawn ~3× more often
      if (Math.random() < 0.18) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y    -= p.speed;
        p.life += 1;

        const progress = p.life / p.maxLife;
        p.opacity = progress < 0.1
          ? progress * 10 * 0.22
          : progress > 0.85
          ? (1 - (progress - 0.85) / 0.15) * 0.22
          : 0.22;

        ctx.globalAlpha = p.opacity;
        ctx.fillStyle   = "rgba(10,10,10,1)";
        ctx.font        = `700 ${p.size}px 'Space Mono', monospace`;
        ctx.fillText(p.text, p.x, p.y);

        if (p.life >= p.maxLife || p.y < -20) particles.splice(i, 1);
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    draw();
    const ro = new ResizeObserver(() => { W(); H(); });
    ro.observe(canvas);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

/* ─── 3D Vault cube ───────────────────────────────────── */
function VaultCube() {
  return (
    <div
      className="vault-scene"
      style={{ opacity: 0.65, flexShrink: 0 }}
    >
      <div className="vault-cube">
        <div className="vault-face front"  />
        <div className="vault-face back"   />
        <div className="vault-face left"   />
        <div className="vault-face right"  />
        <div className="vault-face top"    />
        <div className="vault-face bottom" />
      </div>
    </div>
  );
}

/* ─── Animated stat ───────────────────────────────────── */
function AnimatedStat({
  num, label, dark, trigger,
}: {
  num: string; label: string; dark: boolean; trigger: boolean;
}) {
  const numericMatch = num.match(/^(\d+)/);
  const numeric      = numericMatch ? parseInt(numericMatch[1]) : null;
  const suffix       = numericMatch ? num.slice(numericMatch[1].length) : num;
  const counted      = useCounter(trigger ? numeric : null);
  const display      = numeric !== null ? `${counted}${suffix}` : num;

  return (
    <div style={{
      padding:     "18px 28px",
      background:  dark ? "var(--ink)" : "var(--white)",
      borderRight: "var(--border)",
      textAlign:   "center" as const,
      flex:        "1 1 auto",
    }}>
      <div style={{
        fontFamily:  "var(--font-serif)",
        fontWeight:  900,
        fontSize:    "clamp(1.4rem, 3vw, 2rem)",
        lineHeight:  1,
        marginBottom:4,
        color:       dark ? "var(--white)" : "var(--ink)",
        transition:  "color 0.2s",
      }}>{display}</div>
      <div style={{
        fontFamily:    "var(--font-mono)",
        fontSize:      "0.55rem",
        letterSpacing: "0.14em",
        fontWeight:    700,
        color:         dark ? "rgba(231,226,217,0.5)" : "rgba(10,10,10,0.4)",
      }}>{label}</div>
    </div>
  );
}

/* ─── Main Hero ───────────────────────────────────────── */
export default function Hero() {
  const words    = ["privacy", "freedom", "security", "invisibility"];
  const typed    = useTypewriter(words, 85, 2000);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const STATS = [
    { num: "100%", label: "Private Balances",  dark: false },
    { num: "TEE",  label: "Enclave Secured",   dark: true  },
    { num: "0",    label: "Trust Required",    dark: false },
    { num: "∞",    label: "Composable",        dark: false },
  ];

  return (
    <section
      style={{
        background:    "var(--cream)",
        borderBottom:  "var(--border)",
        position:      "relative",
        overflow:      "hidden",
      }}
    >

      <div className="hero-inner" style={{ position: "relative", zIndex: 1 }}>

        {/* Top row: eyebrow + vault cube */}
        <div className="hero-top-row" style={{
          display:        "flex",
          alignItems:     "flex-start",
          justifyContent: "space-between",
          marginBottom:   36,
        }}>
          {/* Eyebrow label */}
          <div style={{
            display:       "inline-flex",
            alignItems:    "center",
            gap:           8,
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.62rem",
            letterSpacing: "0.18em",
            fontWeight:    700,
            background:    "var(--ink)",
            color:         "var(--cream)",
            padding:       "5px 14px",
          }}>
            <span style={{
              width:       7,
              height:      7,
              borderRadius:"50%",
              background:  "var(--cream)",
              display:     "inline-block",
              animation:   "blink 1.8s ease-in-out infinite",
              flexShrink:  0,
            }} />
            PRIVACY ON FLARE WITH TEE
          </div>

          {/* 3D rotating vault — hidden on small screens */}
          <div style={{
            display:    "flex",
            alignItems: "center",
            gap:        10,
          }} className="hide-mobile">
            <VaultCube />
          </div>
        </div>

        {/* Headline with typewriter */}
        <h1 style={{
          fontFamily:    "var(--font-serif)",
          fontSize:      "clamp(3rem, 8vw, 7.5rem)",
          fontWeight:    900,
          lineHeight:    0.93,
          letterSpacing: "-0.03em",
          marginBottom:  40,
          animation:     "fadeUp 0.55s ease both",
        }}>
          We bring{" "}
          <em
            style={{
              fontStyle:  "italic",
              fontWeight: 700,
              display:    "inline",
            }}
          >
            {typed}
            <span
              style={{
                display:       "inline-block",
                width:         "3px",
                height:        "0.85em",
                background:    "var(--ink)",
                marginLeft:    "3px",
                verticalAlign: "middle",
                animation:     "blink 0.9s step-end infinite",
                transform:     "translateY(-4px)",
              }}
            />
          </em>
          <br />
          to public chains.
        </h1>

        {/* Rule */}
        <div style={{
          height:       3,
          background:   "var(--ink)",
          width:        56,
          marginBottom: 32,
        }} />

        {/* Sub copy — trimmed */}
        <p style={{
          fontFamily:    "var(--font-sans)",
          fontSize:      "clamp(1rem, 2.2vw, 1.2rem)",
          lineHeight:    1.75,
          color:         "var(--ink-soft)",
          maxWidth:      580,
          marginBottom:  48,
          animation:     "fadeUp 0.55s 0.08s ease both",
        }}>
          Any token. Any chain.{" "}
          <strong style={{ color: "var(--ink)" }}>No trust. No tradeoffs.</strong>
        </p>

        {/* CTAs */}
        <div style={{
          display:      "flex",
          gap:          12,
          flexWrap:     "wrap",
          marginBottom: 64,
          animation:    "fadeUp 0.55s 0.14s ease both",
        }}>
          <a href="#usecases" style={{
            fontFamily:    "var(--font-mono)",
            fontWeight:    700,
            fontSize:      "0.72rem",
            letterSpacing: "0.1em",
            textDecoration:"none",
            color:         "var(--white)",
            background:    "var(--ink)",
            padding:       "14px 30px",
            border:        "var(--border)",
            boxShadow:     "var(--shadow)",
            display:       "inline-block",
            transition:    "transform 0.1s, box-shadow 0.1s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform  = "translate(-3px,-3px)";
            (e.currentTarget as HTMLElement).style.boxShadow  = "9px 9px 0 var(--ink)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform  = "";
            (e.currentTarget as HTMLElement).style.boxShadow  = "var(--shadow)";
          }}>
            SEE USE CASES
          </a>
          <a href="#technology" style={{
            fontFamily:    "var(--font-mono)",
            fontWeight:    700,
            fontSize:      "0.72rem",
            letterSpacing: "0.1em",
            textDecoration:"none",
            color:         "var(--ink)",
            background:    "transparent",
            padding:       "14px 30px",
            border:        "var(--border)",
            boxShadow:     "var(--shadow-sm)",
            display:       "inline-block",
            transition:    "transform 0.1s, box-shadow 0.1s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform  = "translate(-2px,-2px)";
            (e.currentTarget as HTMLElement).style.boxShadow  = "5px 5px 0 var(--ink)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform  = "";
            (e.currentTarget as HTMLElement).style.boxShadow  = "var(--shadow-sm)";
          }}>
            HOW IT WORKS
          </a>
        </div>

        {/* Animated stat row */}
        <div
          ref={statsRef}
          className="stats-row"
          style={{ animation: "fadeUp 0.55s 0.2s ease both" }}
        >
          {STATS.map((s, i) => (
            <AnimatedStat
              key={i}
              num={s.num}
              label={s.label}
              dark={i === 1}
              trigger={statsVisible}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
