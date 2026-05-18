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
      <div className="relative flex h-2 w-2 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-60"></span>
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-500"></span>
      </div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
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
    { icon: GitBranch, label: "GitHub", href: "https://github.com/vikrant-honbute" },
    { icon: Link, label: "LinkedIn", href: "https://linkedin.com/in/vikranthonbute" },
    { icon: Mail, label: "Email", href: "mailto:vikranthonbute2004@gmail.com" },
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
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-xs font-medium text-white/85 backdrop-blur-sm transition-all hover:border-[#f97316] hover:text-[#f97316] hover:shadow-[0_0_12px_rgba(249,115,22,0.15)]"
            >
              <Icon className="h-4 w-4" />
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
          Download PDF
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