import SectionHeading from "@/components/SectionHeading";
import { skillGroups } from "@/data/skills";

export default function SkillsSection() {
  return (
    <section id="skills" className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Skills"
          title="Technical Stack"
          description="Core technologies used across AI applications, backend systems, and deployment workflows."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {skillGroups.map((group) => (
            <article key={group.title} className="surface-card rounded-xl p-5 sm:p-6">
              <h3 className="text-xl font-bold text-white">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className={`rounded-md border border-[var(--line-border)] px-2.5 py-1.5 text-xs transition orange-glow-hover ${
                      item.featured
                        ? "bg-[rgba(255,106,0,0.14)] text-[var(--foreground)]"
                        : "bg-black/20 text-[var(--text-muted)]"
                    }`}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
