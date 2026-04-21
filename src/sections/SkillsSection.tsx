import SectionHeading from "@/components/SectionHeading";
import { skillGroups } from "@/data/skills";

export default function SkillsSection() {
  return (
    <section id="skills" className="px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Skills"
          title="Core capabilities across UI, backend, and AI pipelines."
          description="Focused on maintainable code, product velocity, and reliable systems from prototype to production."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {skillGroups.map((group) => (
            <article key={group.title} className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <h3 className="font-display text-xl text-white">{group.title}</h3>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2 text-sm text-white/72"
                  >
                    {item}
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
