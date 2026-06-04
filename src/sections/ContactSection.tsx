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

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <aside className="space-y-5">
            <div className="surface-card inline-flex items-center gap-2 rounded-md px-3 py-2">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono-ui text-xs text-white">Open to Work</span>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-[var(--text-muted)]">
              Available for full-time AI engineering roles and product-focused freelance collaborations. Let's discuss how I can bring value to your team.
            </p>

            <ul className="flex flex-wrap gap-2 pt-2">
              {profile.socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
                    className="inline-flex items-center gap-2 rounded-md border border-[var(--line-border)] px-4 py-2 text-xs text-[var(--foreground)] transition hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)]"
                  >
                    {social.label === "GitHub" && (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    )}
                    {social.label === "LinkedIn" && (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11.75 19.5h-2.5v-8.5h2.5v8.5zm-1.25-9.708c-.806 0-1.461-.655-1.461-1.461 0-.807.655-1.461 1.461-1.461s1.461.654 1.461 1.461c0 .806-.655 1.461-1.461 1.461zm12 9.708h-2.5v-4.25c0-1.012-.02-2.315-1.411-2.315-1.412 0-1.628 1.103-1.628 2.243v4.322h-2.5v-8.5h2.4v1.163h.034c.334-.633 1.152-1.3 2.372-1.3 2.536 0 3.004 1.67 3.004 3.842v4.795z" />
                      </svg>
                    )}
                    {social.label === "Email" && (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    )}
                    <span>{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <form onSubmit={handleSubmit} className="surface-card rounded-xl p-5 sm:p-6">
            <div className="space-y-4">
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Name</span>
                <input
                  type="text"
                  placeholder="your name"
                  value={form.name}
                  onChange={e => setForm(p => ({...p, name: e.target.value}))}
                  className="mt-1.5 w-full rounded-md border border-[var(--line-border)] bg-black/40 px-3 py-2 text-sm text-white outline-none transition focus:border-[var(--primary-accent)] focus:bg-black/60"
                />
              </label>
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">YOUR EMAIL</span>
                <input
                  type="email"
                  placeholder="your email address"
                  value={form.email}
                  onChange={e => setForm(p => ({...p, email: e.target.value}))}
                  className="mt-1.5 w-full rounded-md border border-[var(--line-border)] bg-black/40 px-3 py-2 text-sm text-white outline-none transition focus:border-[var(--primary-accent)] focus:bg-black/60"
                />
              </label>
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Message</span>
                <textarea
                  rows={4}
                  placeholder="What's on your mind?"
                  value={form.message}
                  onChange={e => setForm(p => ({...p, message: e.target.value}))}
                  className="mt-1.5 w-full resize-none rounded-md border border-[var(--line-border)] bg-black/40 px-3 py-2 text-sm text-white outline-none transition focus:border-[var(--primary-accent)] focus:bg-black/60"
                />
              </label>

              <div className="border-t border-[var(--line-border)] pt-4 mt-2">
                <div className="mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-orange-400">Generate using AI</span>
                </div>
                <textarea
                  rows={2}
                  placeholder="Describe what you want to say in your own words..."
                  value={aiDraftInput}
                  onChange={e => setAiDraftInput(e.target.value)}
                  className="w-full resize-none rounded-md border border-[var(--line-border)] bg-black/40 px-3 py-2 text-sm text-white outline-none transition focus:border-[var(--primary-accent)] focus:bg-black/60"
                />
                <button
                  type="button"
                  onClick={handleGenerateDraft}
                  disabled={generatingDraft || !aiDraftInput.trim()}
                  className="mt-2 w-full rounded-md border border-[var(--line-border)] px-3 py-2 text-xs uppercase tracking-[0.1em] text-[var(--foreground)] transition hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)] disabled:opacity-50"
                >
                  {generatingDraft ? "Generating..." : "✦ Generate"}
                </button>
              </div>

              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="mt-2 w-full rounded-md bg-[var(--primary-accent)] px-3 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-[#111111] transition hover:brightness-110 disabled:opacity-50"
              >
                {status === "idle" && "Send Message"}
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
