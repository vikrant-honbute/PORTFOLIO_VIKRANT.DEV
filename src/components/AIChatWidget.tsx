"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { profile } from "@/data/profile";

type Message = { role: "user" | "ai"; text: string };
const CHATBOT_ICON_SRC = "/icons/chatbot-chat-message-v2.jpg";

const SUGGESTIONS = [
  "What has Vikrant built?",
  "What are his top skills?",
  "Is he open to work?",
  "Tell me about his internship",
];

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: `Hi! I'm Vikrant's portfolio assistant. Ask me anything about his projects, skills, or experience.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text?: string) {
    const question = (text ?? input).trim();
    if (!question || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: question }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "ai", text: data.answer }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "ai", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ── Floating button ───────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {/* Tooltip — only when closed */}
        {!open && (
          <div className="flex items-center gap-2 rounded-full border border-[var(--line-border)] bg-[#0c0804]/90 px-4 py-2 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--primary-accent)]" />
            <p className="font-mono-ui text-[11px] text-[var(--foreground)]/70">
              Ask Vikrant&apos;s AI
            </p>
          </div>
        )}

        {/* Bot button */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Open AI assistant"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-[var(--line-border)] bg-[var(--primary-accent)] shadow-[0_0_24px_rgba(255,106,0,0.35)] transition-all duration-200 hover:scale-105 hover:shadow-[0_0_32px_rgba(255,106,0,0.5)]"
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 animate-ping rounded-full bg-[var(--primary-accent)] opacity-20" />

          {/* Icon — bot when closed, X when open */}
          {open ? (
            <svg className="h-5 w-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
            </svg>
          ) : (
            <div className="relative h-9 w-9 overflow-hidden rounded-full">
              <Image
                src={CHATBOT_ICON_SRC}
                alt="AI assistant icon"
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
          )}
        </button>
      </div>

      {/* ── Chat panel ────────────────────────────────────────── */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[34rem] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-xl border border-[var(--line-border)] bg-[#0c0804] shadow-[0_8px_48px_rgba(0,0,0,0.6)]">

          {/* Header */}
          <div className="flex items-center gap-3 border-b border-[var(--line-border)] bg-black/50 px-4 py-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-[var(--line-border)] bg-[rgba(255,106,0,0.15)]">
              <Image
                src={CHATBOT_ICON_SRC}
                alt="AI assistant avatar"
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{profile.brand} Assistant</p>
              <p className="font-mono-ui text-[10px] text-[var(--primary-accent)]/70">
                Powered by Gemini
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto rounded-md p-1 text-white/30 transition hover:text-white"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
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
                <div className="flex items-center gap-1.5 rounded-lg border border-[var(--line-border)] bg-white/[0.04] px-3 py-2.5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--primary-accent)] [animation-delay:0ms]"/>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--primary-accent)] [animation-delay:150ms]"/>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--primary-accent)] [animation-delay:300ms]"/>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions — only on first message */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 border-t border-[var(--line-border)] px-4 py-3">
              {SUGGESTIONS.map((s) => (
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

          {/* Input */}
          <div className="flex gap-2 border-t border-[var(--line-border)] p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask me anything..."
              className="flex-1 rounded-md border border-[var(--line-border)] bg-black/40 px-3 py-2 text-[13px] text-white outline-none transition focus:border-[var(--primary-accent)] placeholder:text-white/25"
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              className="rounded-md bg-[var(--primary-accent)] px-3 py-2 text-xs font-semibold text-black transition hover:brightness-110 disabled:opacity-40"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
