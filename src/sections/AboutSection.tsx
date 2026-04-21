import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/data/profile";

const highlights = [
  { label: "Location", value: profile.location },
  { label: "Availability", value: profile.availability },
  { label: "Primary Focus", value: "AI Product Engineering" },
];

export default function AboutSection() {
  return (
    <section id="about" className="px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr]">
        <SectionHeading
          eyebrow="About"
          title="I design systems that look premium and perform under pressure."
          description={profile.longBio}
        />

        <div className="grid gap-3 sm:grid-cols-2">
          {highlights.map((item) => (
            <article key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">{item.label}</p>
              <p className="mt-2 text-sm text-orange-100/95">{item.value}</p>
            </article>
          ))}
          <article className="rounded-2xl border border-orange-200/20 bg-orange-500/10 p-5 sm:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.18em] text-orange-200/80">Engineering Style</p>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Strong architecture first, delightful details second, and measurable outcomes always.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
