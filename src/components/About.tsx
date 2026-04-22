"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  Brain,
  Cpu,
  Download,
  GitBranch,
  Layout,
  Link,
  Mail,
  MapPin,
  Network,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

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
    <div className="mb-5 flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-300">
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
    <article className="group flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 transition-colors group-hover:border-orange-500/60 group-hover:text-orange-500">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h4 className="font-semibold text-neutral-100">{title}</h4>
        <p className="mt-0.5 text-sm text-neutral-300">{desc}</p>
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
      className="rounded-xl border border-neutral-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <Icon className="mb-3 h-6 w-6 text-orange-500" />
      <h4 className="font-semibold text-neutral-100">{title}</h4>
      <p className="mt-1 text-sm text-neutral-300">{desc}</p>
    </article>
  );
}

type BadgeProps = {
  children: ReactNode;
};

function Badge({ children }: BadgeProps) {
  return (
    <span className="cursor-default rounded-md border border-neutral-200 px-3 py-1 text-sm text-neutral-700 transition-colors hover:border-orange-500 hover:text-orange-500">
      {children}
    </span>
  );
}

function ProfileCard() {
  const socialLinks = [
    { icon: GitBranch, label: "GitHub", href: "https://github.com/vikrant-honbute" },
    { icon: Link, label: "LinkedIn", href: "https://linkedin.com/in/vikranthonbute" },
    { icon: Mail, label: "Email", href: "mailto:vikranthonbute2004@gmail.com" },
  ];

  return (
    <aside
      className="rounded-2xl p-6 lg:sticky lg:top-24"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(249,115,22,0.15)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative h-32 w-32">
          <div className="absolute inset-2 rounded-full bg-[#f97316]/25 blur-xl" aria-hidden="true" />
          <div className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-[#f97316] bg-[#0a0a0a] text-4xl font-bold text-white">
            VH
          </div>
        </div>

        <h3 className="mt-5 text-xl font-bold text-white">Vikrant Honbute</h3>
        <p className="mt-1 font-mono text-sm text-[#f97316]">AI & Full-Stack Developer</p>

        <div className="mt-3 flex items-center gap-1.5 text-sm text-white/70">
          <MapPin className="h-4 w-4" />
          <span>Pune, India</span>
        </div>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-black/40 px-3 py-1 text-xs font-medium text-green-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          Open to Work
        </div>
      </div>

      <div className="my-6 h-px bg-white/10" />

      <div className="flex justify-center gap-2">
        {socialLinks.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs font-medium text-white/85 transition-colors hover:border-[#f97316] hover:text-[#f97316]"
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </a>
        ))}
      </div>

      <a
        href="/resume.pdf"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#f97316] px-4 py-2.5 text-sm font-bold text-[#111111] transition-colors hover:bg-[#fb923c]"
      >
        <Download className="h-4 w-4" />
        Download Resume
      </a>
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
              Hi, I&apos;m Vikrant <span className="inline-block">👋</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">
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
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700"
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
            <blockquote className="border-l-2 border-orange-500 pl-4 italic leading-relaxed text-neutral-600">
              I prefer learning by building real-world systems rather than just
              theory. I&apos;m focused on becoming an industry-ready developer who
              can bridge AI with scalable applications.
            </blockquote>
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