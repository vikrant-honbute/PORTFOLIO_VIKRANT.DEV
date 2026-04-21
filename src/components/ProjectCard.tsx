"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

function getYouTubeId(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
    return u.searchParams.get("v") ?? "";
  } catch {
    return "";
  }
}

// ── Status badge ──────────────────────────────────────────────────────────
const STATUS_STYLES: Record<Project["status"], string> = {
  Live: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  Building: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  Prototype: "border-blue-500/40 bg-blue-500/10 text-blue-400",
};

const STATUS_DOT: Record<Project["status"], string> = {
  Live: "bg-emerald-400 animate-pulse",
  Building: "bg-amber-400 animate-pulse",
  Prototype: "bg-blue-400",
};

function AskAIPanel({ project }: { project: Project }) {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    {
      role: "ai" as const,
      text: `Hi! I know everything about ${project.title}. What would you like to know?`
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestions = ["What does this project do?", "What tech stack was used?", "What was the hardest part?"];

  async function send(text?: string) {
    const question = text ?? input.trim();
    if (!question || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user" as const, text: question }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          context: project.contextPrompt,
          projectTitle: project.title,
        }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "ai" as const, text: data.answer }]);
    } catch {
      setMessages((m) => [...m, { role: "ai" as const, text: "Couldn't reach the AI. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <p className={`max-w-[85%] rounded-lg px-3 py-2 text-[13px] leading-relaxed ${
              m.role === "user"
                ? "bg-[var(--primary-accent)] text-black font-medium"
                : "border border-[var(--line-border)] bg-white/[0.04] text-[var(--foreground)]"
            }`}>
              {m.text}
            </p>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <p className="rounded-lg border border-[var(--line-border)] bg-white/[0.04] px-3 py-2 text-[13px] text-[var(--text-muted)]">
              Thinking...
            </p>
          </div>
        )}
      </div>
      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2 px-4 pb-3">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-md border border-[var(--line-border)] px-2.5 py-1 text-[11px] text-[var(--text-muted)] transition hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)]"
            >
              {s}
            </button>
          ))}
        </div>
      )}
      <div className="flex gap-2 border-t border-[var(--line-border)] p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask about this project..."
          className="flex-1 rounded-md border border-[var(--line-border)] bg-black/40 px-3 py-2 text-[13px] text-white outline-none transition focus:border-[var(--primary-accent)] placeholder:text-white/25"
        />
        <button
          onClick={() => send()}
          disabled={loading || !input.trim()}
          className="rounded-md bg-[var(--primary-accent)] px-3 py-2 text-xs font-semibold text-black transition hover:brightness-110 disabled:opacity-40"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <article className="surface-card orange-glow-hover group overflow-hidden rounded-xl transition-all duration-200">
      {/* ── Header ───────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between border-b border-[var(--line-border)] bg-black/30 px-5 py-4">
        <div className="flex items-center gap-3">
          <p className="font-mono-ui text-[11px] uppercase tracking-[0.12em] text-[var(--primary-accent)]">
            {project.code}
          </p>
          <span
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${STATUS_STYLES[project.status]}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[project.status]}`} />
            {project.status}
          </span>
        </div>

        <a
          href={project.githubHref}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-md border border-[var(--line-border)] px-3 py-1.5 font-mono-ui text-[11px] uppercase tracking-[0.1em] text-[var(--foreground)] transition hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)]"
          aria-label={`Open ${project.title} on GitHub`}
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          Source
        </a>
      </header>

      {/* ── Video preview ─────────────────────────────────────────── */}
      <div className="relative mx-4 mt-4 aspect-video overflow-hidden rounded-lg border border-[var(--line-border)] bg-[#080402]">
        {project.watchDemoHref && project.watchDemoHref !== "#" ? (
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeId(project.watchDemoHref)}?rel=0&modestbranding=1`}
            title={`${project.title} demo`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line-border)] bg-[rgba(255,106,0,0.08)]">
              <svg className="h-5 w-5 translate-x-0.5 text-[var(--primary-accent)]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
              </svg>
            </div>
            <p className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Demo coming soon
            </p>
          </div>
        )}
      </div>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div className="px-5 pb-5 pt-4">
        <h3 className="text-xl font-bold text-white">{project.title}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-muted)]">
          {project.summary}
        </p>

        {/* Stack */}
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-[var(--line-border)] bg-black/20 px-2.5 py-1 font-mono-ui text-[11px] text-[var(--foreground)]"
            >
              {tech}
            </li>
          ))}
        </ul>

        {/* Metrics */}
        <dl className="mt-4 grid grid-cols-3 gap-2">
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-[var(--line-border)] bg-black/20 px-3 py-2.5"
            >
              <dt className="font-mono-ui text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                {metric.label}
              </dt>
              <dd className="mt-1 text-[13px] font-semibold text-white">{metric.value}</dd>
            </div>
          ))}
        </dl>

        {/* Actions */}
        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={project.watchDemoHref}
            className="inline-flex items-center gap-2 rounded-md bg-[var(--primary-accent)] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-black transition hover:brightness-110"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            Demo
          </a>
          <a
            href={project.githubHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-[var(--line-border)] px-4 py-2 text-[12px] uppercase tracking-[0.1em] text-[var(--foreground)] transition hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)]"
          >
            View Code
          </a>
          <button
            onClick={() => setAiOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border border-[var(--line-border)] px-4 py-2 text-[12px] uppercase tracking-[0.1em] text-[var(--foreground)] transition hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)]"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
            Ask AI
          </button>
        </div>
      </div>

      {aiOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-5" onClick={() => setAiOpen(false)}>
          <div className="flex h-[560px] w-[480px] flex-col overflow-hidden rounded-xl border border-[var(--line-border)] bg-[#0c0804] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-[var(--line-border)] bg-black/40 px-4 py-3">
              <div>
                <p className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[var(--primary-accent)]">Ask AI about</p>
                <p className="text-sm font-semibold text-white">{project.title}</p>
              </div>
              <button onClick={() => setAiOpen(false)} className="rounded-md p-1 text-white/40 transition hover:text-white">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <AskAIPanel project={project} />
          </div>
        </div>
      )}
    </article>
  );
}
