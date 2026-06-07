export type Stat = {
  label: string;
  value: string;
};

export const profile = {
  name: "Vikrant Honbute",
  brand: "VIKRANT.DEV",
  terminalLine: "> vikrant@ai:~$ initializing portfolio",
  roleLine: "AI Engineer · GenAI Developer · ML Engineer · LLM Systems",
  headingPrimary: "I build AI",
  headingAccent: "that actually works.",
  resumePreviewUrl:
    "https://drive.google.com/file/d/1PwNDfDqg3x2SPq5YxKDY51_rwaXGoEJv/preview",
  resumeDownloadUrl:
    "https://drive.google.com/uc?export=download&id=1PwNDfDqg3x2SPq5YxKDY51_rwaXGoEJv",
  shortBio:
    "Entry-level AI Engineer with hands-on experience in Generative AI, AI Agents, and RAG systems.",
  longBio:
    "Building LLM-powered apps with LangChain, LangGraph, and CrewAI. Final year student at VIIT Pune, actively looking for full-time AI Engineer roles.",
  location: "Pune, India",
  availability: "Open to Work",
  college: "VIIT Pune",
  degree: "B.Tech AI & Data Science",
  batch: "2022-26",
  cgpa: "8.18",
  contact: {
    email: "vikranthonbute2004@gmail.com",
    github: "https://github.com/vikrant-honbute",
    linkedin: "https://linkedin.com/in/vikranthonbute",
  },
  socialLinks: [
    { label: "GitHub", href: "https://github.com/vikrant-honbute" },
    { label: "LinkedIn", href: "https://linkedin.com/in/vikranthonbute" },
    { label: "Email", href: "mailto:vikranthonbute2004@gmail.com" },
  ],
  highlightChips: [
    "LangChain",
    "RAG Systems",
    "LLM Apps",
    "Open to Work ✦",
  ],
};

export const heroStats: Stat[] = [
  { label: "CGPA", value: "8.18" },
  { label: "Internship", value: "1" },
  { label: "Projects", value: "15+" },
];

export const aboutStats: Stat[] = [
  { label: "CGPA", value: "8.18" },
  { label: "Institute", value: "VIIT Pune" },
  { label: "Batch", value: "2026" },
  { label: "Location", value: "Pune, India" },
];

export type Profile = typeof profile;
