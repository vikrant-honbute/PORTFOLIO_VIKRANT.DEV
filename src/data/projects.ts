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
};

export const projects: Project[] = [
    {
    id: "react-engine",
    code: "VK-01",
    title: "React Engine",
    summary:
        "High-performance frontend architecture for interactive product experiences with cinematic UX.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    href: "#projects",
    status: "Live",
    askAiNamespace: "project-react-engine",
    metrics: [
        { label: "Perf", value: "96 Lighthouse" },
        { label: "SEO", value: "A-grade" },
        { label: "Uptime", value: "99.9%" },
    ],
    },
    {
    id: "runtime-logic",
    code: "VK-02",
    title: "Runtime Logic",
    summary:
        "Backend service design focused on robust APIs, clear contracts, and retrieval-first AI workflows.",
    stack: ["FastAPI", "LangChain", "Pinecone"],
    href: "#projects",
    status: "Building",
    askAiNamespace: "project-runtime-logic",
    metrics: [
        { label: "Latency", value: "< 300ms" },
        { label: "Contexts", value: "Multi-namespace" },
        { label: "Security", value: "Input-validated" },
    ],
    },
    {
    id: "cloud-ready",
    code: "VK-03",
    title: "Cloud Ready",
    summary:
        "Deployment architecture tuned for reliability on Vercel and Render with production observability.",
    stack: ["Vercel", "Render", "CI/CD"],
    href: "#projects",
    status: "Prototype",
    askAiNamespace: "project-cloud-ready",
    metrics: [
        { label: "Regions", value: "Global Edge" },
        { label: "Build", value: "Automated" },
        { label: "Rollbacks", value: "Instant" },
    ],
    },
];

export const featuredProject = projects[0];
