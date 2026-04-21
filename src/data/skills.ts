export type SkillGroup = {
  title: string;
  items: Array<{
    name: string;
    featured?: boolean;
  }>;
};

export const skillGroups: SkillGroup[] = [
  {
    title: "LLMs & GenAI",
    items: [
      { name: "LangChain", featured: true },
      { name: "LangGraph", featured: true },
      { name: "CrewAI", featured: true },
      { name: "OpenAI" },
      { name: "Claude API" },
      { name: "Hugging Face" },
      { name: "RAGAS" },
      { name: "RAG", featured: true },
      { name: "LLM Fine-tuning" },
      { name: "Prompt Engineering", featured: true },
    ],
  },
  {
    title: "AI/ML",
    items: [
      { name: "Python", featured: true },
      { name: "Scikit-learn" },
      { name: "TensorFlow" },
      { name: "Pandas" },
      { name: "MLflow" },
      { name: "DVC" },
      { name: "FAISS", featured: true },
      { name: "Pinecone", featured: true },
      { name: "spaCy" },
      { name: "NLTK" },
    ],
  },
  {
    title: "Web & Backend",
    items: [
      { name: "ReactJS", featured: true },
      { name: "Next.js", featured: true },
      { name: "FastAPI", featured: true },
      { name: "NodeJS" },
      { name: "Django" },
      { name: "TypeScript" },
      { name: "RestAPI" },
      { name: "SQL" },
    ],
  },
  {
    title: "DevOps & MLOps",
    items: [
      { name: "Docker", featured: true },
      { name: "GitHub Actions" },
      { name: "CI/CD", featured: true },
      { name: "AWS (Basic)" },
      { name: "Git" },
      { name: "Docker Compose" },
      { name: "LangSmith" },
    ],
  },
];
