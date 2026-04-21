type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <header className={isCentered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <div className={`flex items-center gap-2 ${isCentered ? "justify-center" : ""}`}>
          <span className="h-px w-6 bg-[var(--primary-accent)]" />
          <p className="font-mono-ui text-[11px] uppercase tracking-[0.18em] text-[var(--primary-accent)]">
            {eyebrow}
          </p>
        </div>
      ) : null}
      <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-muted)]">{description}</p>
      ) : null}
    </header>
  );
}

