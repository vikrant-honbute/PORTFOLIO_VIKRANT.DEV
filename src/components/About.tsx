"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  Brain,
  Cpu,
  Download,
  Eye,
  GitBranch,
  Layout,
  Link,
  Mail,
  Network,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { profile } from "@/data/profile";
import ResumePreviewModal from "@/components/ResumePreviewModal";

type InfoItem = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const WHAT_I_DO: InfoItem[] = [
  {
    icon: Brain,
    title: "ML/DL Engineering",
    desc: "Develop models with end-to-end pipelines and MLOps practices",
  },
  {
    icon: Sparkles,
    title: "Generative AI",
    desc: "Build LLM applications with agentic workflows",
  },
  {
    icon: Server,
    title: "Backend Systems",
    desc: "Scalable APIs using FastAPI and Django",
  },
  {
    icon: Layout,
    title: "Modern Frontends",
    desc: "Production apps with React.js and Next.js",
  },
];

const PROJECTS: InfoItem[] = [
  {
    icon: Rocket,
    title: "Gen AI on Hugging Face",
    desc: "Deployed LLM demos and Spaces",
  },
  {
    icon: GitBranch,
    title: "End-to-end ML + MLOps",
    desc: "Training -> deployment -> monitoring",
  },
  {
    icon: Cpu,
    title: "Doctor Appointment System",
    desc: "Agentic AI with LangGraph",
  },
  {
    icon: ShieldCheck,
    title: "CodeGuardian",
    desc: "Autonomous DevSecOps agent",
  },
  {
    icon: Network,
    title: "Advanced RAG Systems",
    desc: "Agentic, Adaptive, Corrective RAG",
  },
];

const FOCUS = [
  "Advanced RAG & Agents",
  "SaaS product development",
  "Placement prep (DSA + System Design)",
];

const TECH = [
  "Python",
  "JavaScript",
  "ML",
  "DL",
  "GenAI",
  "FastAPI",
  "Django",
  "React",
  "Next.js",
  "Docker",
  "Git",
  "Hugging Face",
];

type RevealProps = {
  children: ReactNode;
  delay?: number;
};

function Reveal({ children, delay = 0 }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out motion-reduce:transition-none"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

type SectionLabelProps = {
  children: ReactNode;
};

function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="h-px w-6 bg-orange-500"></span>
      <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
        {children}
      </h3>
    </div>
  );
}

type SectionProps = {
  label: string;
  delay?: number;
  children: ReactNode;
};

function Section({ label, delay = 0, children }: SectionProps) {
  return (
    <Reveal delay={delay}>
      <section aria-label={label}>
        <SectionLabel>{label}</SectionLabel>
        {children}
      </section>
    </Reveal>
  );
}

type InfoCardProps = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

function InfoCard({ icon: Icon, title, desc }: InfoCardProps) {
  return (
    <article className="group flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-orange-500/30 hover:bg-white/[0.04]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black/50 text-neutral-400 transition-colors group-hover:text-orange-400">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h4 className="font-semibold text-neutral-100 transition-colors group-hover:text-white">{title}</h4>
        <p className="mt-1 text-sm leading-relaxed text-neutral-400">{desc}</p>
      </div>
    </article>
  );
}

type ProjectCardProps = {
  icon: LucideIcon;
  title: string;
  desc: string;
  delay: number;
};

function ProjectCard({ icon: Icon, title, desc, delay }: ProjectCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <article
      ref={ref}
      className="group rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500/5 hover:shadow-[0_8px_24px_-12px_rgba(249,115,22,0.2)]"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <Icon className="mb-3 h-6 w-6 text-neutral-500 transition-colors group-hover:text-orange-400" />
      <h4 className="font-semibold text-neutral-100 transition-colors group-hover:text-white">{title}</h4>
      <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">{desc}</p>
    </article>
  );
}

type BadgeProps = {
  children: ReactNode;
};

function Badge({ children }: BadgeProps) {
  return (
    <span className="cursor-default rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-neutral-300 transition-all hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400">
      {children}
    </span>
  );
}

function ProfileCard() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const socialLinks = [
    { label: "GitHub", href: "https://github.com/vikrant-honbute" },
    { label: "LinkedIn", href: "https://linkedin.com/in/vikranthonbute" },
    { label: "Email", href: "mailto:vikranthonbute2004@gmail.com" },
  ];

  return (
    <aside
      className="overflow-hidden rounded-2xl p-5 lg:sticky lg:top-24"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(249,115,22,0.15)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Video mascot — prominent, full-width */}
      <div className="relative mx-auto mb-5 w-full overflow-hidden rounded-xl">
        {/* Subtle orange glow behind the bot */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: "radial-gradient(ellipse 60% 60% at 50% 60%, rgba(249,115,22,0.12), transparent 70%)",
          }}
        />
        <div style={{ aspectRatio: "4 / 3" }}>
          <video
            src="/animations/Bot_animation.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="relative z-[1] h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Social links row */}
        <div className="mb-4">
        <p className="mb-2 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
          Explore more about me ↗
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {socialLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition-all hover:bg-white/5"
            >
              {/* Brand SVGs */}
              {label === "GitHub" && (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              )}
              {label === "LinkedIn" && (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11.75 19.5h-2.5v-8.5h2.5v8.5zm-1.25-9.708c-.806 0-1.461-.655-1.461-1.461 0-.807.655-1.461 1.461-1.461s1.461.654 1.461 1.461c0 .806-.655 1.461-1.461 1.461zm12 9.708h-2.5v-4.25c0-1.012-.02-2.315-1.411-2.315-1.412 0-1.628 1.103-1.628 2.243v4.322h-2.5v-8.5h2.4v1.163h.034c.334-.633 1.152-1.3 2.372-1.3 2.536 0 3.004 1.67 3.004 3.842v4.795z" />
                </svg>
              )}
              {label === "Email" && (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              )}
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Resume Actions */}
        <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setResumeOpen(true)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#f97316] px-4 py-2.5 text-sm font-bold text-[#111111] transition-colors hover:bg-[#fb923c]"
        >
          <Eye className="h-4 w-4" />
          Preview Resume
        </button>
        <a
          href={profile.resumeDownloadUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#f97316]/30 bg-[#f97316]/10 px-4 py-2.5 text-sm font-bold text-[#f97316] transition-colors hover:bg-[#f97316]/20"
        >
          <Download className="h-4 w-4" />
          Download Resume
        </a>
      </div>
      <ResumePreviewModal
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
        src={profile.resumePreviewUrl}
      />
    </aside>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="space-y-14 lg:col-span-3">
          <Section label="About Me" delay={0}>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Vikrant
              </span>{" "}
              <span className="inline-block origin-bottom-right hover:animate-pulse">👋</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-400 md:text-lg">
              A final-year AI & Data Science student at VIIT, focused on building
              real-world AI systems and scalable applications. I work at the
              intersection of Machine Learning, Generative AI, and full-stack
              development.
            </p>
          </Section>

          <Section label="What I Do" delay={100}>
            <div className="grid gap-6 sm:grid-cols-2">
              {WHAT_I_DO.map((item) => (
                <InfoCard key={item.title} {...item} />
              ))}
            </div>
          </Section>

          <Section label="Featured Work" delay={200}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {PROJECTS.map((project, i) => (
                <ProjectCard key={project.title} {...project} delay={i * 80} />
              ))}
            </div>
          </Section>

          <Section label="Currently" delay={300}>
            <div className="flex flex-wrap gap-2">
              {FOCUS.map((focus) => (
                <span
                  key={focus}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-3 py-1.5 text-sm text-neutral-300"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  {focus}
                </span>
              ))}
            </div>
          </Section>

          <Section label="Tech Stack" delay={400}>
            <div className="flex flex-wrap gap-2">
              {TECH.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </Section>

          <Section label="Personality" delay={500}>
            <div className="relative overflow-hidden rounded-xl border border-orange-500/20 bg-orange-500/5 p-6">
              <div className="pointer-events-none absolute -right-4 -top-4 opacity-10">
                <Brain className="h-24 w-24 text-orange-500" />
              </div>
              <blockquote className="relative z-10 italic leading-relaxed text-neutral-300">
                &quot;I prefer learning by building real-world systems rather than just
                theory. I&apos;m focused on becoming an industry-ready developer who
                can bridge AI with scalable applications.&quot;
              </blockquote>
            </div>
          </Section>
        </div>

        <div className="lg:col-span-2">
          <Reveal delay={150}>
            <ProfileCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}