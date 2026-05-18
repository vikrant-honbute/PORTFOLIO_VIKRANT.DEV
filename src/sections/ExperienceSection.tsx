import SectionHeading from "@/components/SectionHeading";
import { experiences } from "@/data/experience";

export default function ExperienceSection() {
  return (
    <section id="experience" className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've Worked"
          description="Hands-on delivery of practical systems during internship experience."
        />

        <div className="relative mt-12 pl-8 sm:pl-12">
          {/* Glowing Timeline Line */}
          <span
            className="absolute bottom-0 left-2 top-2 w-[2px] bg-gradient-to-b from-orange-500 via-orange-500/20 to-transparent sm:left-4"
            aria-hidden="true"
          />

          {experiences.map((entry) => (
            <article key={entry.company} className="group relative pb-10 last:pb-0">
              {/* Timeline Dot with Pulse */}
              <span className="absolute -left-[3px] top-6 flex h-3.5 w-3.5 items-center justify-center sm:-left-[1px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-60"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]"></span>
              </span>

              <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-500 hover:border-orange-500/30 hover:bg-white/[0.04] sm:p-8">
                {/* Subtle Glow Background */}
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(600px circle at 0% 0%, rgba(249,115,22,0.06), transparent 80%)",
                  }}
                />

                <div className="relative z-10">
                  <div className="mb-6 flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-bold text-neutral-100">
                      {entry.role} <span className="text-orange-500">@ {entry.company}</span>
                    </h3>
                    <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400">
                      {entry.badge}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-neutral-400">
                      {entry.period}
                    </span>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    {entry.projects.map((project) => (
                      <article
                        key={project.title}
                        className="rounded-xl border border-white/5 bg-black/40 p-5 transition-colors hover:border-white/10"
                      >
                        <h4 className="text-lg font-semibold text-neutral-200">{project.title}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                          {project.summary}
                        </p>

                        <ul className="mt-4 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-neutral-400"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>

                        <ul className="mt-4 space-y-2">
                          {project.contributions.map((item) => (
                            <li key={item} className="flex gap-3 text-sm leading-relaxed text-neutral-300">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-orange-500"></span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
