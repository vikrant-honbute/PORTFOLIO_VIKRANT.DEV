import { profile } from "@/data/profile";

export default function FooterSection() {
  return (
    <footer className="mt-10 border-t border-[var(--line-border)] px-5 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto mb-5 max-w-7xl">
        <div className="flex items-center justify-center gap-3 rounded-lg border border-[var(--line-border)] bg-[rgba(255,106,0,0.04)] px-5 py-3">
          <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[var(--primary-accent)]" />
          <p className="text-center font-mono-ui text-[11px] leading-relaxed text-[var(--text-muted)]">
            This portfolio has an AI assistant — click{" "}
            <span className="text-[var(--primary-accent)]">Ask AI</span> on any project card,
            or scroll to the bottom to chat about Vikrant's work and experience.
          </p>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="font-mono-ui text-sm tracking-[0.1em] text-[var(--primary-accent)]">{profile.brand}</p>
        <p className="text-xs text-[var(--text-muted)]">© 2026 Vikrant Honbute · Built with Next.js, FastAPI & Gemini</p>
        <div className="flex items-center gap-3 font-mono-ui text-xs text-white/75">
          <a href={profile.contact.github} target="_blank" rel="noreferrer" className="transition hover:text-[var(--primary-accent)]">
            GitHub
          </a>
          <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-[var(--primary-accent)]">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
