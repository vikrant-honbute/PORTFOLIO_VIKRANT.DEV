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

        <div className="mx-auto mt-10 grid max-w-[1400px] grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          {projects.map((project) => (
            <div key={project.id} className="w-full flex h-full">
              <div className="w-full">
                <ProjectCard project={project} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
