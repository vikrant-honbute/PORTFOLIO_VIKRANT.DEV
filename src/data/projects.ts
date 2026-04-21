export type ProjectMetric = {
    label: string;
    value: string;
};

export type Project = {
    id: string;
    code: string;
    title: string;
    summary: string;
    stack: string[];
    href: string;
    status: "Live" | "Building" | "Prototype";
    askAiNamespace: string;
    metrics: ProjectMetric[];
    watchDemoHref: string;
    githubHref: string;
    contextPrompt: string;
};

export const projects: Project[] = [
    {
        id: "ai-recruitment-agent",
        code: "PRJ-01",
        title: "AI Recruitment Agent",
        summary:
            "End-to-end AI recruitment system for resume analysis, JD similarity search, interview Q&A generation, and automated feedback using RAG + LLMs.",
        stack: [
            "Python",
            "LangChain",
            "Groq API",
            "FAISS",
            "Pinecone",
            "Streamlit",
            "Docker",
        ],
        href: "#projects",
    status: "Live",
        askAiNamespace: "project-ai-recruitment-agent",
    metrics: [
            { label: "Pipeline", value: "RAG + LLM" },
            { label: "Search", value: "FAISS + Pinecone" },
            { label: "Mode", value: "End-to-End" },
    ],
        watchDemoHref: "#",
        githubHref: "https://github.com/vikrant-honbute",
        contextPrompt:
            "This project focuses on AI recruitment workflows, resume/JD matching, interview question generation, and automated candidate feedback with RAG.",
    },
    {
        id: "quick-clip",
        code: "PRJ-02",
        title: "Quick Clip - AI Short Video Generator",
    summary:
            "Scalable AI pipeline for automated short video generation - LLM scripting, voice synthesis, video rendering, and semantic titling end-to-end.",
        stack: [
            "Next.js",
            "Gemini 2.5 Flash",
            "Firebase",
            "Replicate API",
            "Google TTS",
            "Docker",
        ],
    href: "#projects",
    status: "Building",
        askAiNamespace: "project-quick-clip",
    metrics: [
            { label: "Engine", value: "LLM + TTS + Video" },
            { label: "Flow", value: "Automated" },
            { label: "Scale", value: "Cloud-ready" },
    ],
        watchDemoHref: "#",
        githubHref: "https://github.com/vikrant-honbute",
        contextPrompt:
            "This project automates short video creation with LLM script generation, TTS narration, rendering pipelines, and AI-powered titles.",
    },
];

export const featuredProject = projects[0];
