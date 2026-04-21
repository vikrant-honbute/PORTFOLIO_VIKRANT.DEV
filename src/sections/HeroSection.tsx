import { featuredProject, projects } from "@/data/projects";
import { profile } from "@/data/profile";

const technicalSpecs = [
  { label: "Stack", value: featuredProject.stack.join(" + ") },
  { label: "Logic", value: "RAG + Runtime APIs" },
  { label: "Uptime", value: "99.9% High Availability" },
  { label: "Scale", value: "Responsive Modern Layout" },
];

export default function HeroSection() {
  return (
    <section id="home" className="px-6 pb-12 pt-28 sm:px-10 lg:px-16 lg:pt-32">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur-xl sm:p-10">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.26em] text-white/55">
          <p>
            1/{projects.length}
          </p>
          <p>Next Project</p>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <p className="max-w-[18ch] text-xs uppercase tracking-[0.28em] text-orange-300/80">{profile.role}</p>
            <h1 className="mt-4 max-w-[12ch] font-display text-4xl uppercase leading-[0.92] text-white sm:text-6xl lg:text-7xl">
              {profile.codename} {"//"}
              <span className="block bg-gradient-to-r from-orange-200 via-orange-400 to-orange-500 bg-clip-text text-transparent">
                {profile.title}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/72 sm:text-base">
              Developed with high-end skills and a pixel-accurate eye for people who do not just browse the web.
              They build ideas that ship. {profile.shortBio}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded-full border border-orange-300/40 bg-orange-500/20 px-6 py-3 text-xs uppercase tracking-[0.2em] text-orange-100 transition hover:bg-orange-500/30"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/85 transition hover:border-orange-200/50 hover:text-orange-100"
              >
                Get in Touch
              </a>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-black/25 p-6">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/58">Technical Specs</p>
            <dl className="mt-5 space-y-4">
              {technicalSpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="grid grid-cols-[88px_1fr] gap-3 border-b border-white/10 pb-3 last:border-b-0"
                >
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-white/48">{spec.label}</dt>
                  <dd className="text-sm text-orange-100/95">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <article className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-orange-300/80">{featuredProject.code}</p>
            <h2 className="mt-2 text-xl font-semibold text-white">{featuredProject.title}</h2>
            <p className="mt-2 text-sm text-white/70">{featuredProject.summary}</p>
            <a
              href={featuredProject.href}
              className="mt-4 inline-flex text-xs uppercase tracking-[0.2em] text-orange-100"
            >
              Open Project
            </a>
          </article>

          <ul className="flex flex-wrap gap-3">
            {featuredProject.stack.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/15 bg-black/45 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white/78"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
