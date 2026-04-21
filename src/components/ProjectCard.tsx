import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-black/35 p-6 backdrop-blur-sm transition duration-300 hover:border-orange-300/40 hover:bg-black/45">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.24em] text-orange-300/85">{project.code}</p>
        <span className="rounded-full border border-orange-200/30 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-orange-200/90">
          {project.status}
        </span>
      </div>

      <h3 className="mt-4 font-display text-2xl text-white">{project.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/68">{project.summary}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-xs text-white/70"
          >
            {tech}
          </li>
        ))}
      </ul>

      <dl className="mt-6 grid grid-cols-3 gap-2 text-left">
        {project.metrics.map((metric) => (
          <div key={metric.label} className="rounded-xl border border-white/10 p-3">
            <dt className="text-[11px] uppercase tracking-[0.16em] text-white/45">{metric.label}</dt>
            <dd className="mt-1 text-sm font-semibold text-orange-100">{metric.value}</dd>
          </div>
        ))}
      </dl>

      <a
        href={project.href}
        className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-orange-200 transition group-hover:text-orange-100"
      >
        View Project
        <span aria-hidden="true">+</span>
      </a>
    </article>
  );
}
