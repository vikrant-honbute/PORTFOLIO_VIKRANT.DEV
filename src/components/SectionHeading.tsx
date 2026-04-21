type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <header className="max-w-2xl">
      <p className="text-xs uppercase tracking-[0.28em] text-orange-300/80">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl leading-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">{description}</p>
    </header>
  );
}
