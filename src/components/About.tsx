"use client";

import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import Lottie from "lottie-react";
import {
  Brain,
  Cpu,
  Download,
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
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-100">
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
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-neutral-700 transition-colors group-hover:border-orange-500/60 group-hover:text-orange-500">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="mt-0.5 text-sm text-neutral-200">{desc}</p>
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
      className="rounded-xl border border-neutral-700 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <Icon className="mb-3 h-6 w-6 text-orange-500" />
      <h4 className="font-semibold text-white">{title}</h4>
      <p className="mt-1 text-sm text-neutral-200">{desc}</p>
    </article>
  );
}

type BadgeProps = {
  children: ReactNode;
};

function Badge({ children }: BadgeProps) {
  return (
    <span className="cursor-default rounded-md border border-neutral-200 px-3 py-1 text-sm text-neutral-300 transition-colors hover:border-orange-500 hover:text-orange-500">
      {children}
    </span>
  );
}

function ProfileCard() {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch("/animations/robot-mascot.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

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
      {/* Main layout: social links on left, mascot on right */}
      <div className="flex items-center gap-0">
        {/* Social links — positioned at the mascot's pointing finger */}
        <div className="flex shrink-0 flex-col items-start gap-2.5 pb-12">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
            Explore more
            <br />
            about me ↗
          </p>
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-xs font-medium text-white/85 backdrop-blur-sm transition-all hover:border-[#f97316] hover:text-[#f97316] hover:shadow-[0_0_12px_rgba(249,115,22,0.15)]"
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </a>
          ))}
        </div>

        {/* Lottie mascot */}
        <div className="-ml-4 flex-1">
          <div style={{ width: 340, height: 380, marginLeft: "auto" }}>
            {animationData && (
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{
                  width: "100%",
                  height: "100%",
                  clipPath: "inset(0 0 20% 0)",
                  transform: "scale(1.1) translateY(10%)"
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Download Resume */}
      <a
        href="/resume.pdf"
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#f97316] px-4 py-2.5 text-sm font-bold text-[#111111] transition-colors hover:bg-[#fb923c]"
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
            <p className="mt-5 text-base leading-relaxed text-neutral-300 md:text-lg">
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
            <blockquote className="border-l-2 border-orange-500 pl-4 italic leading-relaxed text-neutral-400">
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