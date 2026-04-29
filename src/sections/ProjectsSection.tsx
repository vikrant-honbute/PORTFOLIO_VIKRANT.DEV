import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  return (
    <section id="projects" className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Projects"
          title="Selected Work"
          description="A focused selection of production-minded projects and case-study builds."
        />

        <div className="mx-auto mt-8 grid max-w-[1180px] grid-cols-[repeat(auto-fill,minmax(520px,1fr))] gap-5">
          {projects.map((project) => (
            <div key={project.id} className="mx-auto w-full max-w-[580px]">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
