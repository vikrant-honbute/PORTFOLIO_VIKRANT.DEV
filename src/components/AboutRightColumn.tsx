"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useTypewriter } from "@/hooks/useTypewriter";
import { highlightKeywords } from "@/utils/highlightKeywords";

const WHAT_I_BUILD = [
  {
    icon: "⚡",
    title: "RAG Pipelines that actually retrieve",
    desc: "— not just embed and hope. Built with LangChain, FAISS, and Pinecone for real retrieval accuracy",
  },
  {
    icon: "🤖",
    title: "LLM Agents that complete tasks",
    desc: "— multi-step workflows using LangGraph and CrewAI that go beyond simple chat",
  },
  {
    icon: "🛠",
    title: "Full-stack AI products",
    desc: "— FastAPI backends + Next.js frontends, containerized with Docker and shipped to production",
  },
];

type AboutRightColumnProps = {
  bioText: string;
};

export default function AboutRightColumn({ bioText }: AboutRightColumnProps) {
  const bioInView = useInView<HTMLParagraphElement>({ threshold: 0.2 });
  const buildInView = useInView<HTMLDivElement>({ threshold: 0.2 });
  const currentlyInView = useInView<HTMLDivElement>({ threshold: 0.2 });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setFromMedia = () => setPrefersReducedMotion(media.matches);
    setFromMedia();
    media.addEventListener("change", setFromMedia);
    return () => media.removeEventListener("change", setFromMedia);
  }, []);

  const { displayed, done } = useTypewriter(
    bioText,
    bioInView.inView || prefersReducedMotion,
    20
  );

  const showBuild = buildInView.inView || prefersReducedMotion;
  const showCurrently = currentlyInView.inView || prefersReducedMotion;

  return (
    <div className="space-y-8">
      <p className="text-xs uppercase tracking-[0.28em] text-orange-300/80">About</p>

      <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
        Building practical products, not just prototypes
      </h2>

      <p
        ref={bioInView.ref}
        className="min-h-[6rem] text-sm leading-relaxed text-[var(--text-muted)] sm:text-base"
      >
        {highlightKeywords(displayed)}
        {!done && (
          <span
            className="ml-0.5 inline-block h-5 w-[2px] animate-pulse align-middle bg-[var(--primary-accent)]"
            aria-hidden="true"
          />
        )}
      </p>

      <div ref={buildInView.ref}>
        <h3 className="mb-5 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
          WHAT I BUILD
        </h3>
        <ul className="space-y-4">
          {WHAT_I_BUILD.map((item, i) => (
            <li
              key={item.title}
              className="flex gap-4 transition-all duration-[600ms] ease-out motion-reduce:transition-none"
              style={{
                opacity: showBuild ? 1 : 0,
                transform: showBuild ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <span className="shrink-0 text-2xl leading-none" aria-hidden>
                {item.icon}
              </span>
              <div className="text-sm leading-relaxed">
                <span className="font-semibold text-white">{item.title}</span>{" "}
                <span className="text-[var(--text-muted)]">{item.desc}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={currentlyInView.ref}
        className="transition-all duration-[700ms] ease-out motion-reduce:transition-none"
        style={{
          opacity: showCurrently ? 1 : 0,
          transform: showCurrently ? "translateX(0)" : "translateX(-40px)",
        }}
      >
        <h3 className="mb-5 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
          CURRENTLY
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-[var(--line-border)] bg-black/20 p-5">
            <div className="mb-2 flex items-center gap-2">
              <span aria-hidden>🔨</span>
              <span className="font-semibold text-white">Building</span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">
              An LLM-powered developer tool — turning a side project into a real product
            </p>
          </div>
          <div className="rounded-xl border border-[var(--line-border)] bg-black/20 p-5">
            <div className="mb-2 flex items-center gap-2">
              <span aria-hidden>📖</span>
              <span className="font-semibold text-white">Learning</span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">
              LangGraph multi-agent systems · LLM fine-tuning · Full-stack AI deployment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
