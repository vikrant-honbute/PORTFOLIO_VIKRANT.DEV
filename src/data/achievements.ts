export const featuredAchievement = {
  label: "IEEE ESCI 2025",
  title: "Dynamic StarCraft: Multi-Agent Generative AI for Immersive Experiences",
  conference: "International Conference on Emerging Smart Computing and Informatics",
  year: "2025",
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  date?: string;
};

export const certifications: Certification[] = [
  {
    id: "cert-01",
    name: "Foundations of Data Science",
    issuer: "Coursera",
  },
  {
    id: "cert-02",
    name: "Ultimate RAG Bootcamp Using Langchain,LangGraph & Langsmith",
    issuer: "Udemy",
  },
  {
    id: "cert-03",
    name: "IBM Fullstack Course",
    issuer: "IBM",
  },
];
