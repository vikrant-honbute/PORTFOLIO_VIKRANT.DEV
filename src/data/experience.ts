export type ExperienceProject = {
  title: string;
  summary: string;
  tags: string[];
  contributions: string[];
};

export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  badge: string;
  projects: ExperienceProject[];
};

export const experiences: ExperienceEntry[] = [
  {
    role: "AI Engineer Intern",
    company: "The Data Tech Labs",
    period: "Sept 2025 - Feb 2026",
    badge: "Internship",
    projects: [
      {
        title: "AI-Powered Banking Support Assistant",
        summary:
          "Built a RAG-powered assistant for banking support with both text and voice responses.",
        tags: ["RAG", "LangChain", "Voice AI"],
        contributions: [
          "Designed retrieval flow to ground responses in policy and product knowledge.",
          "Implemented voice input/output loop for faster customer support interactions.",
          "Improved response quality with context chunking and prompt strategies.",
        ],
      },
      {
        title: "AI Business Requirement System",
        summary:
          "Created an LLM pipeline that transforms user requirements into DOCX, PDF, and JPEG deliverables.",
        tags: ["LLMs", "FastAPI", "Template Automation"],
        contributions: [
          "Developed backend services to generate formatted documents from structured prompts.",
          "Introduced reusable templates for consistent output quality and speed.",
          "Automated multi-format exports for business and product teams.",
        ],
      },
    ],
  },
];
