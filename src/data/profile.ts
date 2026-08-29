export type Stat = {
  label: string;
  value: string;
};

export const profile = {
  name: "Vikrant Honbute",
  brand: "VIKRANT.DEV",
  terminalLine: "> vikrant@ai:~$ initializing portfolio",
  roleLine: "AI ENGINEER - DATA ENGINEER - PYTHON DEVELOPER",
  headingPrimary: "I build",
  headingAccent: "AI & Data Solutions that actually works....",
  resumePreviewUrl:
    "https://drive.google.com/file/d/1cER0i_7lXYOqXjmTfVbgPEDQJgOOdKxK/preview",
  resumeDownloadUrl:
    "https://drive.google.com/uc?export=download&id=1cER0i_7lXYOqXjmTfVbgPEDQJgOOdKxK",
  shortBio:
    "Entry-level Data & AI Engineer actively looking for full-time roles in the Pune tech ecosystem.",
  longBio:
    "I build end-to-end data solutions, from robust data pipelines and analytics to LLM-powered AI agents. Experienced in Python, Data Engineering, and integrating Generative AI into practical applications.",
  location: "Pune, India",
  availability: "Open to Work",
  college: "VIIT Pune",
  degree: "B.Tech AI & Data Science",
  batch: "2022-26",
  cgpa: "8.36",
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
  { label: "CGPA", value: "8.36" },
  { label: "Internship", value: "1" },
  { label: "Projects", value: "15+" },
];

export const aboutStats: Stat[] = [
  { label: "CGPA", value: "8.36" },
  { label: "Institute", value: "VIIT Pune" },
  { label: "Batch", value: "2026" },
  { label: "Location", value: "Pune, India" },
];

export type Profile = typeof profile;
