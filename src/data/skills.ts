export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend Systems",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Design Systems"],
  },
  {
    title: "Backend + AI",
    items: ["FastAPI", "Python", "LangChain", "Pinecone", "RAG Pipelines"],
  },
  {
    title: "Production Engineering",
    items: ["Testing", "CI/CD", "Monitoring", "Performance Tuning", "Cloud Deployments"],
  },
];
