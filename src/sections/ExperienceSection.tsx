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

        <div className="relative mt-8 pl-8 sm:pl-12">
          <span className="absolute bottom-0 left-2 top-0 w-px bg-[rgba(255,122,24,0.45)] sm:left-4" aria-hidden="true" />

          {experiences.map((entry) => (
            <article key={entry.company} className="relative pb-3">
              <span
                className="absolute -left-[2px] top-2 h-3.5 w-3.5 rounded-full border border-[var(--line-border)] bg-[var(--primary-accent)] shadow-[0_0_14px_rgba(255,122,24,0.45)] sm:-left-1"
                aria-hidden="true"
              />

              <div className="surface-card rounded-xl p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-bold text-white">
                    {entry.role} @ {entry.company}
                  </h3>
                  <span className="rounded-md border border-[var(--line-border)] px-2 py-1 text-xs text-[var(--primary-accent)]">
                    {entry.badge}
                  </span>
                  <span className="rounded-md border border-white/15 px-2 py-1 text-xs text-white/75">
                    {entry.period}
                  </span>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  {entry.projects.map((project) => (
                    <article key={project.title} className="rounded-lg border border-[var(--line-border)] bg-black/20 p-4">
                      <h4 className="text-lg font-semibold text-white">{project.title}</h4>
                      <p className="mt-2 text-sm text-[var(--text-muted)]">{project.summary}</p>

                      <ul className="mt-3 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <li key={tag} className="rounded-md border border-[var(--line-border)] px-2 py-1 text-[11px] text-white/85">
                            {tag}
                          </li>
                        ))}
                      </ul>

                      <ul className="mt-3 space-y-2 text-sm text-white/88">
                        {project.contributions.map((item) => (
                          <li key={item} className="leading-relaxed">
                            - {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
