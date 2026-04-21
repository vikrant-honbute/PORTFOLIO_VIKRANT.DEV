"use client";

import { useEffect, useRef, useState } from "react";
import { profile, heroStats } from "@/data/profile";

// ── Name typing animation ────────────────────────────────────────────────────
const FULL_NAME = "Vikrant Honbute";
const ROLE_LINE = "AI Engineer · GenAI Developer";

function NameTypingBlock() {
  const [nameChars, setNameChars] = useState(0);
  const [showRole, setShowRole] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);
  const done = nameChars >= FULL_NAME.length;

  // Type name char by char
  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setShowRole(true), 400);
      return () => clearTimeout(t);
    }
    const delay = nameChars === 0 ? 600 : 80 + Math.random() * 60;
    const t = setTimeout(() => setNameChars((n) => n + 1), delay);
    return () => clearTimeout(t);
  }, [nameChars, done]);

  // Blink cursor
  useEffect(() => {
    const id = setInterval(() => setCursorBlink((b) => !b), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
      {/* Eyebrow */}
      <p className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-[var(--primary-accent)]/70">
        &gt; initializing_
      </p>

      {/* Name */}
      <div className="mt-5 min-h-[4.5rem] flex items-center justify-center">
        <h2 className="text-[clamp(2rem,5.5vw,3rem)] font-bold leading-tight tracking-tight text-white">
          {FULL_NAME.slice(0, nameChars)}
          <span
            className={`inline-block w-[3px] h-[1.1em] translate-y-[0.1em] ml-1 bg-[var(--primary-accent)] transition-opacity ${
              cursorBlink ? "opacity-100" : "opacity-20"
            }`}
          />
        </h2>
      </div>

      {/* Role — fades in after name is done */}
      <p
        className={`mt-3 font-mono-ui text-[13px] text-[var(--primary-accent)] tracking-[0.12em] transition-all duration-700 ${
          showRole ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        {ROLE_LINE}
      </p>

    </div>
  );
}


export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ── Dot-grid canvas animation ────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width / 28);
      const rows = Math.ceil(canvas.height / 28);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * 28 + 14;
          const y = r * 28 + 14;
          const dist = Math.sqrt(
            Math.pow((x - canvas.width / 2) / canvas.width, 2) +
              Math.pow((y - canvas.height / 2) / canvas.height, 2)
          );
          const wave = Math.sin(t * 0.8 + dist * 12) * 0.5 + 0.5;
          const alpha = 0.04 + wave * 0.18;
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 122, 24, ${alpha})`;
          ctx.fill();
        }
      }
      t += 0.016;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [mounted]);

  return (
    <section id="home" className="relative min-h-screen px-5 pb-20 pt-28 sm:px-8 lg:px-12 flex items-center">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center w-full">
        {/* ── Left — Copy ─────────────────────────────────────────────── */}
        <div className="flex flex-col justify-center">
          <p className="font-mono-ui text-[11px] uppercase tracking-[0.22em] text-[var(--primary-accent)]/70 mb-6">
            &gt; AI Engineer · GenAI Developer · LLM Systems
          </p>

          {/* Headline */}
          <h1 className="mt-6 text-[clamp(3rem,7vw,5.5rem)] font-bold leading-[1.08] tracking-tight text-white">
            {profile.headingPrimary}{" "}
            <span className="bg-gradient-to-r from-[var(--primary-accent)] to-amber-400 bg-clip-text text-transparent">
              {profile.headingAccent}
            </span>
          </h1>

          {/* Bio */}
          <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--text-muted)]">
            {profile.shortBio}{" "}
            <span className="text-white/60">{profile.longBio}</span>
          </p>

          {/* CTA row */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-md bg-[var(--primary-accent)] px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-black transition-all hover:brightness-110 active:scale-95"
            >
              View Projects
              <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--line-border)] px-6 py-3 text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--foreground)] transition-all hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)]"
            >
              Contact
            </a>
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md px-4 py-3 text-[13px] text-white/40 transition-all hover:text-white/70"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
          </div>

          {/* Stats strip */}
          <div className="mt-10 flex flex-wrap gap-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-baseline gap-2 border-b border-[var(--line-border)] pb-2 pr-6"
              >
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right — Visual panel ─────────────────────────────────────── */}
        <div className="relative min-h-[500px] overflow-hidden rounded-xl bg-[#0a0602]">
          {/* Animated dot grid */}
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

          {/* Radial glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(255,106,0,0.12),transparent)]" />

          {/* Corner accent lines */}
          <div className="absolute left-0 top-0 h-12 w-px bg-gradient-to-b from-[var(--primary-accent)]/60 to-transparent" />
          <div className="absolute left-0 top-0 h-px w-12 bg-gradient-to-r from-[var(--primary-accent)]/60 to-transparent" />
          <div className="absolute bottom-0 right-0 h-12 w-px bg-gradient-to-t from-[var(--primary-accent)]/60 to-transparent" />
          <div className="absolute bottom-0 right-0 h-px w-12 bg-gradient-to-l from-[var(--primary-accent)]/60 to-transparent" />


          {/* Centre — Name typing animation */}
          <div className="absolute inset-0 flex items-center justify-center pb-20">
            {mounted && <NameTypingBlock />}
          </div>

          {/* Education badge — bottom */}
          <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-lg border border-[var(--line-border)] bg-black/60 p-3.5 backdrop-blur-sm">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--line-border)] bg-[rgba(255,106,0,0.1)]">
              <svg className="h-4 w-4 text-[var(--primary-accent)]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="font-mono-ui text-[9px] uppercase tracking-[0.14em] text-[var(--primary-accent)]">
                Education
              </p>
              <p className="mt-0.5 truncate text-[13px] font-semibold text-white">
                {profile.college} · {profile.degree}
              </p>
              <p className="text-[11px] text-[var(--text-muted)]">
                Batch {profile.batch} · CGPA {profile.cgpa}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
