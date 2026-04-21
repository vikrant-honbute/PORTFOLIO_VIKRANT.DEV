import SectionHeading from "@/components/SectionHeading";
import { certifications, featuredAchievement } from "@/data/achievements";

export default function AchievementsSection() {
  return (
    <section id="achievements" className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Achievements"
          title="Recognition"
          description="Research publication and certifications that support practical engineering outcomes."
        />

        <article className="surface-card mt-8 rounded-xl bg-[linear-gradient(135deg,rgba(255,106,0,0.14),rgba(0,0,0,0.32))] p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono-ui text-xs text-[var(--primary-accent)]">IEEE logo placeholder</p>
              <h3 className="mt-2 text-2xl font-bold text-white">{featuredAchievement.label}</h3>
            </div>
            <span className="rounded-sm border border-white/20 px-3 py-1 font-mono-ui text-xs text-white/85">
              {featuredAchievement.year}
            </span>
          </div>

          <p className="mt-4 text-lg font-semibold text-white">{featuredAchievement.title}</p>
          <p className="mt-3 w-fit rounded-sm border border-[var(--line-border)] bg-black/30 px-3 py-1 font-mono-ui text-[11px] text-[var(--text-muted)]">
            {featuredAchievement.conference}
          </p>
        </article>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {certifications.map((certification) => (
            <article key={certification.id} className="surface-card rounded-xl p-4">
              <p className="font-mono-ui text-xs text-[var(--primary-accent)]">Certification</p>
              <h4 className="mt-2 text-base font-semibold text-white">{certification.name}</h4>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{certification.issuer}</p>
              <p className="mt-3 font-mono-ui text-[11px] text-white/65">{certification.date}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
