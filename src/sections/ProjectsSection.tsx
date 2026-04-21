import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Projects"
          title="Selected builds designed for speed, intelligence, and scale."
          description="Every card is generated from a shared data source so the portfolio remains easy to evolve as your work grows."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
