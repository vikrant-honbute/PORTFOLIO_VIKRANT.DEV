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
    <section id="contact" className="px-5 pb-20 pt-14 sm:px-8 lg:px-12 lg:pb-28 lg:pt-20">
      <div className="mx-auto max-w-7xl rounded-xl border border-[var(--line-border)] bg-black/20 p-5 sm:p-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something"
          description="Share your idea, role, or collaboration request. I will reply with a practical execution plan."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <aside className="space-y-4">
            <div className="surface-card inline-flex items-center gap-2 rounded-md px-3 py-2">
              <span className="relative inline-flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono-ui text-xs text-white">Open to Work</span>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-[var(--text-muted)]">
              Available for full-time AI engineering roles and product-focused freelance collaborations.
            </p>

            <ul className="flex flex-wrap gap-2">
              {profile.socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
                    className="inline-flex rounded-md border border-[var(--line-border)] px-3 py-2 text-xs text-[var(--foreground)] transition hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)]"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

            <form onSubmit={handleSubmit} className="surface-card rounded-xl p-4 sm:p-5">
            <div className="space-y-3">
              <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">Name</span>
                <input
                  type="text"
                  placeholder="name"
                  value={form.name}
                  onChange={e => setForm(p => ({...p, name: e.target.value}))}
                    className="mt-1.5 w-full rounded-md border border-[var(--line-border)] bg-black/35 px-3 py-2 text-sm text-white outline-none transition focus:border-[var(--primary-accent)]"
                />
              </label>
              <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">Email</span>
                <input
                  type="email"
                  placeholder="email"
                  value={form.email}
                  onChange={e => setForm(p => ({...p, email: e.target.value}))}
                    className="mt-1.5 w-full rounded-md border border-[var(--line-border)] bg-black/35 px-3 py-2 text-sm text-white outline-none transition focus:border-[var(--primary-accent)]"
                />
              </label>
              <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">MESSAGE</span>
                <textarea
                  rows={5}
                  placeholder="type your own message here..."
                  value={form.message}
                  onChange={e => setForm(p => ({...p, message: e.target.value}))}
                    className="mt-1.5 w-full resize-none rounded-md border border-[var(--line-border)] bg-black/35 px-3 py-2 text-sm text-white outline-none transition focus:border-[var(--primary-accent)]"
                />
              </label>
              <div className="border-t border-[var(--line-border)] pt-3">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">— or use AI to write it —</p>
                <textarea
                  rows={4}
                  placeholder="Describe what you want to say in your own words..."
                  value={aiDraftInput}
                  onChange={e => setAiDraftInput(e.target.value)}
                  className="mt-1.5 w-full resize-none rounded-md border border-[var(--line-border)] bg-black/35 px-3 py-2 text-sm text-white outline-none transition focus:border-[var(--primary-accent)]"
                />
                <button
                  type="button"
                  onClick={handleGenerateDraft}
                  disabled={generatingDraft || !aiDraftInput.trim()}
                  className="mt-2 w-full rounded-md border border-[var(--line-border)] px-3 py-2.5 text-xs uppercase tracking-[0.12em] text-[var(--foreground)] transition hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)] disabled:opacity-60"
                >
                  {generatingDraft ? "Generating..." : "✦ Generate with AI"}
                </button>
              </div>
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="w-full rounded-md bg-[var(--primary-accent)] px-3 py-2.5 text-xs uppercase tracking-[0.12em] text-black transition hover:brightness-95 disabled:opacity-60"
              >
                {status === "idle" && "Send Message →"}
                {status === "sending" && "Sending..."}
                {status === "sent" && "Message Sent ✓"}
                {status === "error" && "Failed — Try Again"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
