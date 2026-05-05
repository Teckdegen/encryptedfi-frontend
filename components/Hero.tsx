"use client";

import { useEffect, useRef, useState } from "react";

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

/* ─── Main Hero ───────────────────────────────────────── */
export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      style={{
        background:    "var(--cream)",
        borderBottom:  "var(--border)",
        position:      "relative",
        overflow:      "hidden",
        minHeight:     "100vh",
        display:       "flex",
        alignItems:    "center",
        justifyContent:"center",
      }}
    >
      <ParticleCanvas />

      <div style={{
        position:      "relative",
        zIndex:        1,
        textAlign:     "center",
        padding:       "40px 32px",
        maxWidth:      "1200px",
        width:         "100%",
      }}>



        {/* Main headline - ENCRYPTED centered */}
        <h1 style={{
          fontFamily:    "var(--font-serif)",
          fontSize:      "clamp(4rem, 12vw, 10rem)",
          fontWeight:    900,
          lineHeight:    0.9,
          letterSpacing: "-0.04em",
          marginBottom:  24,
          animation:     "fadeUp 0.55s 0.1s ease both",
          textTransform: "uppercase",
        }}>
          ENCRYPTED
        </h1>

        {/* Underline */}
        <div style={{
          height:       4,
          background:   "var(--ink)",
          width:        "clamp(200px, 40%, 400px)",
          margin:       "0 auto 32px",
          animation:    "fadeUp 0.55s 0.15s ease both",
        }} />

        {/* Finance subtitle */}
        <h2 style={{
          fontFamily:    "var(--font-serif)",
          fontSize:      "clamp(2rem, 6vw, 5rem)",
          fontWeight:    700,
          fontStyle:     "italic",
          lineHeight:    1.1,
          letterSpacing: "-0.02em",
          marginBottom:  56,
          animation:     "fadeUp 0.55s 0.2s ease both",
        }}>
          Finance
        </h2>

        {/* Tagline - removed per user request */}

        {/* CTAs */}
        <div style={{
          display:      "flex",
          gap:          16,
          flexWrap:     "wrap",
          justifyContent:"center",
          animation:    "fadeUp 0.55s 0.3s ease both",
        }}>
          <a href="#usecases" style={{
            fontFamily:    "var(--font-mono)",
            fontWeight:    700,
            fontSize:      "0.75rem",
            letterSpacing: "0.12em",
            textDecoration:"none",
            color:         "var(--white)",
            background:    "var(--ink)",
            padding:       "16px 36px",
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
            GET STARTED
          </a>
          <a href="#technology" style={{
            fontFamily:    "var(--font-mono)",
            fontWeight:    700,
            fontSize:      "0.75rem",
            letterSpacing: "0.12em",
            textDecoration:"none",
            color:         "var(--ink)",
            background:    "transparent",
            padding:       "16px 36px",
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
            PRIVACY •
          </a>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position:      "absolute",
          bottom:        40,
          left:          "50%",
          transform:     `translateX(-50%) translateY(${Math.min(scrollY * 0.5, 30)}px)`,
          opacity:       Math.max(1 - scrollY / 300, 0),
          transition:    "opacity 0.3s",
          animation:     "fadeUp 0.55s 0.4s ease both",
        }}>
          <div style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.55rem",
            letterSpacing: "0.2em",
            fontWeight:    700,
            color:         "rgba(10,10,10,0.3)",
            marginBottom:  12,
          }}>
            SCROLL
          </div>
          <div style={{
            width:      2,
            height:     40,
            background: "rgba(10,10,10,0.2)",
            margin:     "0 auto",
            position:   "relative",
            overflow:   "hidden",
          }}>
            <div style={{
              position:   "absolute",
              top:        0,
              left:       0,
              width:      "100%",
              height:     "30%",
              background: "var(--ink)",
              animation:  "scrollDown 2s ease-in-out infinite",
            }} />
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
      `}</style>
    </section>
  );
}
