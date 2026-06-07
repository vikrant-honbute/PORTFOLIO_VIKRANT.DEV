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

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <article
              key={group.title}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/30 hover:bg-white/[0.04] hover:shadow-[0_8px_30px_-12px_rgba(249,115,22,0.15)]"
            >
              {/* Subtle hover gradient background */}
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(400px circle at 50% 0%, rgba(249,115,22,0.08), transparent 80%)",
                }}
              />

              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/50 text-orange-500 shadow-inner transition-colors group-hover:border-orange-500/50 group-hover:bg-orange-500/10">
                    <span className="font-mono text-sm font-bold">0{i + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-100 transition-colors group-hover:text-white">
                    {group.title}
                  </h3>
                </div>

                <ul className="flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="relative inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.05)] hover:border-orange-500/60 hover:bg-orange-500/20 hover:text-orange-300 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] px-3.5 py-1.5 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5"
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
