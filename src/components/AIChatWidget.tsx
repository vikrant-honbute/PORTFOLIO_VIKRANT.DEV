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
      <style>{`
        @keyframes shimmer-slide {
          0% { transform: translateX(-150%) skewX(-15deg); }
          62.5%, 100% { transform: translateX(250%) skewX(-15deg); }
        }
        .animate-shimmer-slide {
          animation: shimmer-slide 4s infinite ease-in-out;
        }

        /* Custom scrollbar for chat */
        .chat-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .chat-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 106, 0, 0.2);
          border-radius: 10px;
        }
        .chat-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 106, 0, 0.4);
        }
      `}</style>
      {/* ── Floating button ───────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-1.5">

        {/* Eye-catching AI Tooltip/Button */}
        {!open && (
          <button
            onClick={() => setOpen(true)}
            aria-label="Open AI assistant"
            className="group relative flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff6a00] to-[#ff7a18] pl-1.5 pr-4 py-2 shadow-lg shadow-[rgba(255,106,0,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[rgba(255,106,0,0.4)]"
          >
            {/* Shimmer Effect Overlay */}
            <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-full">
              <div className="h-full w-1/2 animate-shimmer-slide bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>

            {/* White Circle with Provided Image */}
            <div className="relative flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
              <div className="relative h-[85%] w-[85%] overflow-hidden rounded-full">
                <Image
                  src={CHATBOT_ICON_SRC}
                  alt="AI assistant icon"
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
              {/* Sparkle */}
              <svg 
                className="absolute -right-1.5 -top-1.5 h-3.5 w-3.5 text-white drop-shadow-[0_0_3px_rgba(255,255,255,0.9)] animate-pulse" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 1C12 7 17 12 23 12C17 12 12 17 12 23C12 17 7 12 1 12C7 12 12 7 12 1Z" />
              </svg>
            </div>

            {/* Text Content */}
            <div className="flex flex-col items-start justify-center text-left">
              <span className="text-[11.5px] font-bold leading-tight tracking-wide text-white">Ask Vikrant&apos;s AI</span>
              <span className="text-[9px] font-medium text-white/90">Your smart assistant</span>
            </div>

            {/* Chevron */}
            <svg className="ml-0.5 h-3.5 w-3.5 text-white transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Bot button */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Open AI assistant"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-[var(--line-border)] bg-[var(--primary-accent)] shadow-[0_0_24px_rgba(255,106,0,0.35)] transition-all duration-200 hover:scale-105 hover:shadow-[0_0_32px_rgba(255,106,0,0.5)]"
        >


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
        <div className="fixed bottom-24 right-6 z-50 flex h-[34rem] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-[var(--line-border)] bg-black/70 shadow-[0_8px_32px_rgba(255,106,0,0.15)] ring-1 ring-white/5 backdrop-blur-xl">

          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md">
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
          <div className="chat-scroll flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <p className={`max-w-[85%] px-4 py-2.5 text-[13px] leading-relaxed shadow-sm ${
                  m.role === "user"
                    ? "rounded-2xl rounded-tr-sm bg-gradient-to-br from-[#ff6a00] to-[#ff8a2c] text-black font-semibold shadow-[0_4px_14px_rgba(255,106,0,0.25)]"
                    : "rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.06] text-[var(--foreground)] backdrop-blur-md"
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
            <div className="flex flex-wrap gap-2 border-t border-white/10 bg-black/20 px-4 py-3">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/80 transition-all hover:border-[var(--primary-accent)] hover:bg-[var(--primary-accent)]/10 hover:text-[var(--primary-accent)]"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2 border-t border-white/10 bg-black/40 p-3 backdrop-blur-md">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask me anything..."
              className="flex-1 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[13px] text-white outline-none transition focus:border-[var(--primary-accent)] focus:bg-white/[0.05] placeholder:text-white/30"
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[var(--primary-accent)] text-black shadow-lg shadow-[rgba(255,106,0,0.3)] transition-all hover:scale-105 hover:brightness-110 disabled:scale-100 disabled:opacity-40"
            >
              <svg className="-ml-0.5 mt-0.5 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
