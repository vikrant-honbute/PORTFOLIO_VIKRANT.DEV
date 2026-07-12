"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import type { Project } from "@/data/projects";
import Portal from "@/components/Portal";

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

type PreviewMode = "demo" | "snapshots";

type SnapshotItem = { src: string; alt?: string; sectionTitle: string };

function SnapshotLightbox({
  items,
  startIndex,
  onClose,
}: {
  items: SnapshotItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const total = items.length;
  const item = items[index];

  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  return (
    <Portal>
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Close"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>

        {/* Counter */}
        {total > 1 && (
          <p className="absolute right-16 top-4 font-mono-ui text-xs text-white/50">
            {index + 1} / {total}
          </p>
        )}

        {/* Prev arrow */}
        {total > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[var(--primary-accent)] hover:text-black"
            aria-label="Previous image"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
        )}

        {/* Image */}
        <div
          className="relative mx-16 max-h-[90vh] max-w-[90vw] overflow-hidden rounded-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={item.src}
            alt={item.alt ?? `Snapshot ${index + 1}`}
            width={1920}
            height={1080}
            unoptimized
            className="max-h-[90vh] w-auto object-contain"
          />
          {item.sectionTitle && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
              <p className="font-mono-ui text-xs uppercase tracking-[0.12em] text-white/80">{item.sectionTitle}</p>
            </div>
          )}
        </div>

        {/* Next arrow */}
        {total > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[var(--primary-accent)] hover:text-black"
            aria-label="Next image"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        )}
      </div>
    </Portal>
  );
}

function YouTubeThumbnail({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`}
        title={`${title} demo`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group/play relative h-full w-full cursor-pointer"
      aria-label={`Play ${title} demo`}
    >
      {/* YouTube maxresdefault thumbnail — clean, no branding */}
      <Image
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={`${title} thumbnail`}
        fill
        unoptimized
        className="object-cover transition duration-300 group-hover/play:brightness-75 group-hover/play:scale-105"
      />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Centered play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm transition-all duration-300 group-hover/play:scale-110 group-hover/play:border-[var(--primary-accent)] group-hover/play:bg-[var(--primary-accent)]/90">
          <svg
            className="ml-1 h-6 w-6 text-white transition-colors duration-300 group-hover/play:text-black"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute inset-x-0 bottom-0 px-3 py-2">
        <p className="font-mono-ui text-[9px] uppercase tracking-[0.14em] text-white/70">
          Click to play demo
        </p>
      </div>
    </button>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  const mediaSections = project.media ?? [];
  const [activeMode, setActiveMode] = useState<PreviewMode>("demo");
  const [activeSnapshotIndex, setActiveSnapshotIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const demoSections = mediaSections.filter((section) =>
    section.items.some((item) => item.type === "video")
  );
  const snapshotSections = mediaSections.filter((section) =>
    section.items.some((item) => item.type === "image")
  );
  const snapshotItems = snapshotSections.flatMap((section) =>
    section.items
      .filter((item) => item.type === "image")
      .map((item) => ({
        ...item,
        sectionTitle: section.title,
      }))
  );

  const demoHref = project.watchDemoHref && project.watchDemoHref !== "#" ? project.watchDemoHref : "";
  const hasDemo = Boolean(demoHref) || demoSections.length > 0;
  const hasSnapshots = snapshotItems.length > 0;
  const activeSnapshot = snapshotItems[Math.min(activeSnapshotIndex, Math.max(snapshotItems.length - 1, 0))];

  // Resolve the YouTube video ID for the demo
  const demoVideoId = demoHref
    ? getYouTubeId(demoHref)
    : demoSections[0]?.items[0]?.type === "video"
      ? getYouTubeId(demoSections[0].items[0].src)
      : "";

  return (
    <div className="relative mx-3 mt-3 overflow-hidden rounded-lg border border-[var(--line-border)] bg-[#080402]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--line-border)] bg-black/35 px-3 py-1.5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveMode("demo")}
            className={`rounded-md px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] transition ${activeMode === "demo"
                ? "bg-[var(--primary-accent)] text-black"
                : "text-[var(--text-muted)] hover:text-white"
              }`}
          >
            Demo
          </button>
          <button
            onClick={() => setActiveMode("snapshots")}
            className={`rounded-md px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] transition ${activeMode === "snapshots"
                ? "bg-[var(--primary-accent)] text-black"
                : "text-[var(--text-muted)] hover:text-white"
              }`}
          >
            Snapshots
          </button>
        </div>

        <p className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
          {activeMode === "demo" ? "Demo preview" : "Image gallery"}
        </p>
      </div>

      {activeMode === "demo" ? (
        <div className="flex flex-col items-center justify-center gap-2 px-2 py-3 text-center">
          <div className="w-full max-w-[380px]">
            <div className="aspect-video w-full rounded-md border border-[var(--line-border)] overflow-hidden bg-black/40 flex items-center justify-center">
              {hasDemo && demoVideoId ? (
                <YouTubeThumbnail videoId={demoVideoId} title={project.title} />
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 px-4">
                  <div className="h-12 w-12 rounded-full bg-[rgba(255,106,0,0.12)] flex items-center justify-center">
                    <svg className="h-5 w-5 text-[var(--primary-accent)]" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">Demo coming soon</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : hasSnapshots && activeSnapshot ? (
        <div className="flex flex-col gap-2 p-2">
          {/* Main image with prev/next + expand */}
          <div className="group relative overflow-hidden rounded-md border border-[var(--line-border)] bg-black/30">
            <Image
              src={activeSnapshot.src}
              alt={activeSnapshot.alt ?? `${project.title} snapshot ${activeSnapshotIndex + 1}`}
              width={1280}
              height={720}
              unoptimized
              className="aspect-video h-full max-h-[190px] w-full cursor-pointer object-cover transition duration-200 group-hover:brightness-75"
              onClick={() => setLightboxIndex(activeSnapshotIndex)}
            />

            {/* Expand button */}
            <button
              onClick={() => setLightboxIndex(activeSnapshotIndex)}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-black/60 text-white opacity-0 transition group-hover:opacity-100 hover:bg-[var(--primary-accent)] hover:text-black"
              aria-label="View fullscreen"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </button>

            {/* Prev / Next arrows on card */}
            {snapshotItems.length > 1 && (
              <>
                <button
                  onClick={() => setActiveSnapshotIndex((i) => (i - 1 + snapshotItems.length) % snapshotItems.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-md bg-black/60 text-white opacity-0 transition group-hover:opacity-100 hover:bg-[var(--primary-accent)] hover:text-black"
                  aria-label="Previous"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button
                  onClick={() => setActiveSnapshotIndex((i) => (i + 1) % snapshotItems.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-md bg-black/60 text-white opacity-0 transition group-hover:opacity-100 hover:bg-[var(--primary-accent)] hover:text-black"
                  aria-label="Next"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </>
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2">
              <p className="font-mono-ui text-[9px] uppercase tracking-[0.14em] text-white/80">
                {activeSnapshot.sectionTitle}
              </p>
            </div>
          </div>

          {/* Thumbnail strip */}
          {snapshotItems.length > 1 && (
            <div className="flex gap-1.5 overflow-x-auto pb-1 pr-1 [scrollbar-width:thin]">
              {snapshotItems.map((item, index) => {
                const isActive = index === activeSnapshotIndex;
                return (
                  <button
                    key={`${item.src}-${index}`}
                    type="button"
                    onClick={() => setActiveSnapshotIndex(index)}
                    className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md border transition ${isActive
                        ? "border-[var(--primary-accent)] ring-1 ring-[var(--primary-accent)]"
                        : "border-[var(--line-border)] opacity-70 hover:opacity-100"
                      }`}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt ?? `${project.title} snapshot ${index + 1}`}
                      width={320}
                      height={180}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex items-center justify-between px-1 text-[10px] text-[var(--text-muted)]">
            <span>{snapshotItems.length} screenshot{snapshotItems.length !== 1 ? "s" : ""}</span>
            <span>{activeSnapshotIndex + 1}/{snapshotItems.length}</span>
          </div>

          {/* Lightbox */}
          {lightboxIndex !== null && (
            <SnapshotLightbox
              items={snapshotItems}
              startIndex={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
            />
          )}
        </div>
      ) : (
        <div className="flex min-h-[180px] flex-col items-center justify-center gap-2 px-3 py-4 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-border)] bg-[rgba(255,106,0,0.08)]">
            <svg className="h-4.5 w-4.5 text-[var(--primary-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          </div>
          <p className="font-mono-ui text-[11px] tracking-[0.12em] text-[var(--text-muted)]">
            Snapshots coming soon
          </p>
        </div>
      )}
    </div>
  );
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
  const [input, setInput] = useState(project.defaultPrompt ?? "");
  const [loading, setLoading] = useState(false);

  const suggestions = project.suggestions ?? ["What does this project do?", "What tech stack was used?", "What was the hardest part?"];

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
            <p className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${m.role === "user"
                ? "bg-[var(--primary-accent)] text-black font-medium"
                : "border border-[var(--line-border)] bg-white/[0.04] text-[var(--foreground)]"
              }`}>
              {m.text}
            </p>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <p className="rounded-lg border border-[var(--line-border)] bg-white/[0.04] px-3 py-2 text-sm text-[var(--text-muted)]">
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
              className="rounded-md border border-[var(--line-border)] px-2.5 py-1 text-xs text-[var(--text-muted)] transition hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)]"
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
          className="flex-1 rounded-md border border-[var(--line-border)] bg-black/40 px-3 py-2 text-sm text-white outline-none transition focus:border-[var(--primary-accent)] placeholder:text-white/25"
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
    <article className="surface-card h-full flex flex-col orange-glow-hover group overflow-hidden rounded-xl transition-all duration-200">
      {/* ── Header ───────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between border-b border-[var(--line-border)] bg-black/30 px-4 py-3">
        <div className="flex items-center gap-3">
          <p className="font-mono-ui text-[11px] uppercase tracking-[0.12em] text-[var(--primary-accent)]">
            {project.code}
          </p>
          <span
            className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${STATUS_STYLES[project.status]}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[project.status]}`} />
            {project.status}
          </span>
        </div>

        <a
          href={project.githubHref}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-md border border-[var(--line-border)] px-2.5 py-1 font-mono-ui text-[11px] uppercase tracking-[0.1em] text-[var(--foreground)] transition hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)]"
          aria-label={`Open ${project.title} on GitHub`}
        >
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          Source
        </a>
      </header>

      <ProjectPreview project={project} />

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div className="px-4 pb-4 pt-3 flex flex-col flex-1">
        <h3 className="text-lg font-bold leading-tight text-white">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
          {project.summary}
        </p>

        {/* Stack */}
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-[var(--line-border)] bg-black/20 px-2 py-1 font-mono-ui text-[11px] text-[var(--foreground)]"
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
              className="rounded-lg border border-[var(--line-border)] bg-black/20 px-2.5 py-2.5"
            >
              <dt className="font-mono-ui text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                {metric.label}
              </dt>
              <dd className="mt-1 text-sm font-semibold text-white">{metric.value}</dd>
            </div>
          ))}
        </dl>

        {/* Actions */}
        <div className="mt-auto pt-5 flex flex-wrap gap-2.5">
          <a
            href={project.watchDemoHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-[var(--primary-accent)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-black transition hover:brightness-110"
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
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--line-border)] px-3 py-1.5 text-xs uppercase tracking-[0.1em] text-[var(--foreground)] transition hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)]"
          >
            View Code
          </a>
          <button
            onClick={() => setAiOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--line-border)] px-3 py-1.5 text-xs uppercase tracking-[0.1em] text-[var(--foreground)] transition hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)]"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            Ask AI
          </button>
        </div>
      </div>

      {aiOpen && (
        <Portal>
          <div className="fixed inset-0 z-50 flex items-end justify-end p-5" onClick={() => setAiOpen(false)}>
            <div className="flex h-[560px] w-[480px] flex-col overflow-hidden rounded-xl border border-[var(--line-border)] bg-[#0c0804] shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-[var(--line-border)] bg-black/40 px-4 py-3">
                <div>
                  <p className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--primary-accent)]">Ask AI about</p>
                  <p className="text-base font-semibold text-white">{project.title}</p>
                </div>
                <button onClick={() => setAiOpen(false)} className="rounded-md p-1 text-white/40 transition hover:text-white">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              </div>
              <AskAIPanel project={project} />
            </div>
          </div>
        </Portal>
      )}
    </article>
  );
}
