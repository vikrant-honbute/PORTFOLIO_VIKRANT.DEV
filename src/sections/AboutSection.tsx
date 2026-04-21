import SectionHeading from "@/components/SectionHeading";
import { aboutStats, profile } from "@/data/profile";

// ── Monogram / identity card ──────────────────────────────────────────────
function ProfileVisual() {
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <div className="relative flex w-full flex-col items-start justify-start overflow-hidden py-6">

      {/* Monogram ring */}
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[var(--primary-accent)]/40 bg-[rgba(255,106,0,0.07)] shadow-[0_0_32px_rgba(255,106,0,0.2)]">
        <span className="font-mono-ui text-2xl font-bold text-[var(--primary-accent)]">
          {initials}
        </span>
        {/* Rotating dashed ring */}
        <svg
          className="absolute inset-0 h-full w-full animate-[spin_18s_linear_infinite]"
          viewBox="0 0 112 112"
          fill="none"
        >
          <circle
            cx="56"
            cy="56"
            r="54"
            stroke="rgba(255,106,0,0.25)"
            strokeWidth="1"
            strokeDasharray="6 8"
          />
        </svg>
      </div>

      {/* Name + role */}
      <p className="mt-5 text-xl font-bold text-white">{profile.name}</p>
      <p className="mt-1 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-[var(--primary-accent)]">
        AI Engineer
      </p>

      {/* Location + status row */}
      <div className="mt-5 flex items-center gap-3">
        <span className="flex items-center gap-1.5 rounded-full border border-[var(--line-border)] bg-black/40 px-3 py-1.5 font-mono-ui text-[10px] text-white/40">
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.556 6.324 3.5 8.327a19.58 19.58 0 002.683 2.282 16.975 16.975 0 001.144.742zM12 13.5a3 3 0 110-6 3 3 0 010 6z" clipRule="evenodd" />
          </svg>
          {profile.location}
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono-ui text-[10px] text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          {profile.availability}
        </span>
      </div>

      {/* Divider */}
      <div className="mx-auto mt-6 h-px w-3/4 bg-gradient-to-r from-transparent via-[var(--line-border)] to-transparent" />

      {/* Highlight chips */}
      <ul className="mt-5 flex flex-wrap justify-center gap-2 px-4">
        {profile.highlightChips.map((chip) => (
          <li
            key={chip}
            className="rounded-md border border-[var(--line-border)] bg-black/30 px-2.5 py-1 font-mono-ui text-[10px] text-[var(--foreground)]"
          >
            {chip}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-0 lg:gap-0 lg:grid-cols-[0.42fr_0.58fr]">
        {/* ── Left — Profile visual ───────────────────────── */}
        <aside className="p-0">
          <ProfileVisual />

          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {profile.socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className="inline-flex items-center rounded-md border border-[var(--line-border)] px-3 py-2 text-xs text-[var(--foreground)] transition hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)]"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* ── Right — Bio + Stats ─────────────────────────── */}
        <div className="py-2 lg:pl-8 lg:border-l lg:border-[var(--line-border)]">
          <SectionHeading
            eyebrow="About"
            title="Building practical products, not just prototypes"
            description={`${profile.shortBio} ${profile.longBio}`}
          />

          <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 border-t border-[var(--line-border)] pt-5">
            {aboutStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-mono-ui text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">{stat.label}</p>
                <p className="mt-0.5 text-sm font-semibold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* What I work on */}
          <div className="mt-6">
            <p className="font-mono-ui text-[11px] uppercase tracking-[0.16em] text-[var(--primary-accent)] mb-4">
              What I work on
            </p>
            <ul className="mt-4 space-y-3">
              {[
                { icon: "⬡", text: "RAG pipelines with Pinecone vector search and LangChain" },
                { icon: "⬡", text: "LLM agents using LangGraph, CrewAI and tool calling" },
                { icon: "⬡", text: "Production FastAPI backends for AI-powered applications" },
                { icon: "⬡", text: "Full-stack AI products with Next.js + Python" },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                  <span className="mt-0.5 text-[var(--primary-accent)]">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
