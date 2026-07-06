export type ProjectMetric = {
    label: string;
    value: string;
};

export type ProjectMediaItem = {
    type: "video" | "image";
    src: string;
    alt?: string;
    poster?: string;
};

export type ProjectSnapshot = {
    title: string;
    description?: string;
    items: ProjectMediaItem[];
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
    media?: ProjectSnapshot[];
    watchDemoHref: string;
    githubHref: string;
    contextPrompt: string;
    suggestions?: string[];
    defaultPrompt?: string;
    highlights?: string[];
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
        media: [
            {
                title: "Recruitment dashboard",
                description: "Structured resume analysis and match scoring.",
                items: [
                    {
                        type: "image",
                        src: "/projects/ai-recruitment-agent/1.png",
                        alt: "Recruitment dashboard snapshot",
                    },
                ],
            },
        ],
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
        status: "Live",
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
    {
        id: "codeguardian",
        code: "PRJ-03",
        title: "CodeGuardian – AI Powered DevSecOps Agent",
        summary:
            "AI-powered security analysis platform that combines static code analysis, RAG, and LLM reasoning to detect vulnerabilities, explain security risks, suggest fixes, and generate risk-scored reports.",
        stack: [
            "Python",
            "FastAPI",
            "FAISS",
            "RAG",
            "OWASP",
            "CWE",
            "NVIDIA NIM",
            "Docker",
        ],
        href: "#projects",
        status: "Live",
        askAiNamespace: "project-codeguardian",
        metrics: [
            { label: "ANALYSIS", value: "AST + SAST" },
            { label: "KNOWLEDGE", value: "FAISS + RAG" },
            { label: "SECURITY", value: "Risk Scoring" },
        ],
        watchDemoHref: "#",
        githubHref: "https://github.com/vikrant-honbute",
        contextPrompt:
            "CodeGuardian is an AI-powered security analysis platform that combines static code analysis, RAG, and LLM reasoning to detect vulnerabilities, explain security risks, suggest fixes, and generate risk-scored reports. Key highlights: Multi-language vulnerability detection, AST-based static analysis, hardcoded secret detection, SQL injection detection, LLM-powered explanations, OWASP + CWE grounded reasoning, risk scoring engine, structured security reports, and offline fallback mode.",
        suggestions: [
            "Explain the architecture and security workflow of CodeGuardian.",
            "What tech stack was used?",
            "What was the hardest part?",
        ],
        defaultPrompt: "Explain the architecture and security workflow of CodeGuardian.",
        highlights: [
            "Multi-language vulnerability detection",
            "AST-based static analysis",
            "Hardcoded secret detection",
            "SQL injection detection",
            "LLM-powered explanations",
            "OWASP + CWE grounded reasoning",
            "Risk scoring engine",
            "Structured security reports",
            "Offline fallback mode",
        ],
    },
    {
        id: "aws-face-recognition",
        code: "PRJ-04",
        title: "Cloud-based Face Recognition System",
        summary:
            "Cloud-based Face Recognition System utilizing AWS Rekognition, S3, Lambda, and DynamoDB. This serverless architecture demonstrates face detection, secure image storage, and intelligent metadata management through automated processing pipelines.",
        stack: [
            "Python",
            "Amazon Rekognition",
            "Amazon S3",
            "AWS Lambda",
            "Amazon DynamoDB",
        ],
        href: "#projects",
        status: "Prototype",
        askAiNamespace: "project-aws-face-recognition",
        metrics: [
            { label: "Architecture", value: "Serverless" },
            { label: "Engine", value: "Rekognition API" },
            { label: "Storage", value: "S3 + DynamoDB" },
        ],
        watchDemoHref: "https://youtu.be/c0Eht1EgTg8",
        githubHref: "https://github.com/vikrant-honbute",
        contextPrompt:
            "A comprehensive cloud-based face recognition system leveraging AWS services for detecting, recognizing, and storing facial data with secure metadata management. The system demonstrates modern serverless architecture patterns. Workflow: Image Upload to S3 -> Lambda Trigger -> Face Detection via Rekognition API -> Metadata and Face ID Storage in DynamoDB. Note: This is currently a design/architecture demonstration (testing has not been conducted yet).",
        suggestions: [
            "Explain the Lambda processing workflow when an image is uploaded.",
            "What AWS services are used for storage and indexing?",
            "What is the planned roadmap for this project?",
        ],
        defaultPrompt: "Explain the Lambda processing workflow when an image is uploaded.",
        highlights: [
            "Real-world cloud architecture using industry-standard AWS services",
            "Demonstrates understanding of serverless computing patterns",
            "Integration of multiple AWS services (multi-service orchestration)",
            "Security-focused design with S3 access control and metadata separation",
        ],
    },
];

export const featuredProject = projects[0];

