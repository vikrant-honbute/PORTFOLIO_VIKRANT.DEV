"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/data/profile";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [generatingDraft, setGeneratingDraft] = useState(false);
  const [aiDraftInput, setAiDraftInput] = useState("");

  async function handleGenerateDraft() {
    const rawMessage = aiDraftInput.trim();
    if (!rawMessage || generatingDraft) return;

    setGeneratingDraft(true);
    try {
      const res = await fetch("/api/generate-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawMessage,
        }),
      });

      const data = await res.json();
      const draft = typeof data?.message === "string" ? data.message.trim() : "";
      if (draft) {
        setForm((p) => ({ ...p, message: draft }));
      }
    } finally {
      setGeneratingDraft(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { from_name: form.name, from_email: form.email, message: form.message },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-[rgba(255,122,24,0.22)] bg-[linear-gradient(135deg,rgba(255,106,0,0.12),rgba(0,0,0,0.55))] p-5 sm:p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[rgba(255,122,24,0.16)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 right-[-60px] h-72 w-72 rounded-full bg-[rgba(255,122,24,0.1)] blur-3xl"
        />
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something"
          description="Share your idea, role, or collaboration request. I will reply with a practical execution plan."
        />

        <div className="relative mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <aside className="relative space-y-4 rounded-2xl border border-[rgba(255,122,24,0.18)] bg-black/40 p-4 shadow-[0_20px_50px_-40px_rgba(0,0,0,0.8)] backdrop-blur-lg sm:p-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5">
              <span className="relative inline-flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono-ui text-[11px] text-white">Open to Work</span>
            </div>

            <p className="max-w-md text-[13px] leading-relaxed text-[var(--text-muted)]">
              Available for full-time AI engineering roles and product-focused freelance collaborations.
            </p>

            <ul className="flex flex-wrap gap-2">
              {profile.socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
                    className="inline-flex rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[11px] text-[var(--foreground)] transition hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)]"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="space-y-2 pt-1">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(249,115,22,0.18)] bg-[rgba(249,115,22,0.08)] px-3 py-1.5 text-xs text-[var(--foreground)]">
                <span className="text-[rgba(249,115,22,0.9)]">⚡</span>
                Usually responds within 24hrs
              </div>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(249,115,22,0.18)] bg-[rgba(249,115,22,0.08)] px-3 py-1.5 text-xs text-[var(--foreground)]">
                <span className="text-[rgba(249,115,22,0.9)]">✉</span>
                Email preferred for opportunities
              </div>
              <p className="max-w-md text-sm italic leading-relaxed text-[var(--text-muted)]">
                Open to full-time roles, freelance collaborations, and interesting problems.
              </p>
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            className="relative rounded-2xl border border-[rgba(255,122,24,0.25)] bg-black/45 p-4 shadow-[0_24px_70px_-50px_rgba(0,0,0,0.9)] backdrop-blur-lg sm:p-6"
          >
            <div className="space-y-3">
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">Name</span>
                <input
                  type="text"
                  placeholder="name"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  autoComplete="name"
                  required
                  className="mt-2 w-full rounded-lg border border-white/10 bg-black/55 px-3 py-2 text-[14px] text-white outline-none transition placeholder:text-white/35 focus:border-[var(--primary-accent)] focus:ring-2 focus:ring-[rgba(249,115,22,0.3)]"
                />
              </label>
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">Email</span>
                <input
                  type="email"
                  placeholder="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  autoComplete="email"
                  required
                  className="mt-2 w-full rounded-lg border border-white/10 bg-black/55 px-3 py-2 text-[14px] text-white outline-none transition placeholder:text-white/35 focus:border-[var(--primary-accent)] focus:ring-2 focus:ring-[rgba(249,115,22,0.3)]"
                />
              </label>
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">Message</span>
                <textarea
                  rows={4}
                  placeholder="type your own message here..."
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  required
                  className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-black/55 px-3 py-2 text-[14px] text-white outline-none transition placeholder:text-white/35 focus:border-[var(--primary-accent)] focus:ring-2 focus:ring-[rgba(249,115,22,0.3)]"
                />
              </label>
              <div className="border-t border-white/10 pt-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">— or use AI to write it —</p>
                <textarea
                  rows={3}
                  placeholder="Describe what you want to say in your own words..."
                  value={aiDraftInput}
                  onChange={(e) => setAiDraftInput(e.target.value)}
                  className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-black/55 px-3 py-2 text-[14px] text-white outline-none transition placeholder:text-white/35 focus:border-[var(--primary-accent)] focus:ring-2 focus:ring-[rgba(249,115,22,0.3)]"
                />
                <button
                  type="button"
                  onClick={handleGenerateDraft}
                  disabled={generatingDraft || !aiDraftInput.trim()}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-black/45 px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-[var(--foreground)] transition hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)] hover:bg-black/60 disabled:opacity-60"
                >
                  {generatingDraft ? "Generating..." : "✦ Generate with AI"}
                </button>
              </div>
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="w-full rounded-lg bg-[linear-gradient(90deg,#ff6a00,#ff7a18)] px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-black shadow-[0_16px_40px_-28px_rgba(255,122,24,0.8)] transition hover:brightness-110 disabled:opacity-60"
              >
                {status === "idle" && "Send Message →"}
                {status === "sending" && "Sending..."}
                {status === "sent" && "Message Sent ✓"}
                {status === "error" && "Failed — Try Again"}
              </button>
              <p className="text-[11px] text-[var(--text-muted)]" aria-live="polite">
                {status === "sent" && "Thanks! I will get back to you shortly."}
                {status === "error" && "Something went wrong. Please try again or email directly."}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
