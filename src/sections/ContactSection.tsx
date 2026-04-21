import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/data/profile";

export default function ContactSection() {
  return (
    <section id="contact" className="px-6 pb-20 pt-14 sm:px-10 lg:px-16 lg:pb-28 lg:pt-20">
      <div className="mx-auto max-w-7xl rounded-3xl border border-orange-200/20 bg-[linear-gradient(130deg,rgba(255,122,24,0.16),rgba(0,0,0,0.45))] p-6 sm:p-10">
        <SectionHeading
          eyebrow="Contact"
          title="Let us build something ambitious together."
          description="Share your product idea, hiring role, or collaboration concept and I will get back with a practical plan."
        />

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex w-fit rounded-full border border-white/20 bg-black/35 px-6 py-3 text-xs uppercase tracking-[0.2em] text-orange-100 transition hover:border-orange-200/50"
          >
            {profile.email}
          </a>

          <ul className="flex flex-wrap gap-3">
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white/80 transition hover:border-orange-200/50 hover:text-orange-100"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
