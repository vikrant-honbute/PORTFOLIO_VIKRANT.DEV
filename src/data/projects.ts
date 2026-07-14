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
        watchDemoHref: "https://youtu.be/_-Y5UIQ6Tzg",
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
        watchDemoHref: "https://youtu.be/WCsqSPjhqcI",
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
        watchDemoHref: "https://youtu.be/lLFoQv37eZo",
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
        githubHref: "https://github.com/vikrant-honbute/Cloud-based-Face-Recognition-System-Using-AWS",
        media: [
            {
                title: "System Flowchart",
                description: "End-to-end pipeline: S3 upload → Lambda trigger → Rekognition analysis → DynamoDB storage.",
                items: [
                    {
                        type: "image",
                        src: "https://raw.githubusercontent.com/vikrant-honbute/Cloud-based-Face-Recognition-System-Using-AWS/main/FLOWCHART.png",
                        alt: "AWS Face Recognition System Flowchart",
                    },
                ],
            },
        ],
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
    {
        id: "agentic-etl-self-healing-pipeline",
        code: "PRJ-05",
        title: "Agentic ETL Self-Healing Data Pipeline",
        summary:
            "End-to-end Agentic ETL pipeline orchestrated by Apache Airflow that autonomously ingests Yelp reviews, diagnoses & heals data quality issues, and performs AI-powered sentiment analysis using Ollama (llama3.2:3b). 100% Docker containerized with 12% auto-repair rate on real-world data.",
        stack: [
            "Python",
            "Apache Airflow",
            "Ollama (llama3.2:3b)",
            "PostgreSQL",
            "Docker",
            "Docker Compose",
        ],
        href: "#projects",
        status: "Live",
        askAiNamespace: "project-agentic-etl-self-healing-pipeline",
        metrics: [
            { label: "Success Rate", value: "88%" },
            { label: "Heal Rate", value: "12%" },
            { label: "Model Confidence", value: "91.5%" },
        ],
        watchDemoHref: "https://youtu.be/tm-EomhQw2c",
        githubHref: "https://github.com/vikrant-honbute/AgenticAI_ETL_SELF_HEALING_DATA_PIPELINE",
        contextPrompt:
            "This is an Agentic ETL Self-Healing Data Pipeline orchestrated by Apache Airflow. It autonomously ingests Yelp reviews, diagnoses and heals 5 types of data quality issues (missing_text, empty_text, wrong_type, special_characters_only, too_long), and performs AI-powered sentiment analysis using a local Ollama llama3.2:3b model. 100% Docker containerized with PostgreSQL metadata store. Key stats: 88% clean records, 12% auto-repaired records, 0% degradation, 91.5% average model confidence. The pipeline has 6 Airflow tasks: load_model → load_reviews → diagnose_and_heal_batch → batch_analyze_sentiment → aggregate_results → generate_health_report. Every healed record includes full traceability (was_healed, error_type, action_taken). Output includes per-run sentiment analysis summaries and health reports (HEALTHY/WARNING/DEGRADED/CRITICAL). Uses Yelp Academic Dataset. Local LLM inference means zero cloud costs.",
        suggestions: [
            "How does the self-healing mechanism work?",
            "Walk me through the 6 Airflow pipeline tasks.",
            "How is the local LLM integrated for sentiment analysis?",
        ],
        defaultPrompt: "How does the self-healing mechanism work?",
        highlights: [
            "Autonomous data quality detection & repair (5 issue types)",
            "12% auto-repair rate on real-world Yelp data",
            "91.5% average LLM model confidence",
            "Full healing traceability per record",
            "6-task Apache Airflow DAG orchestration",
            "Local Ollama inference — zero cloud LLM costs",
            "100% Docker containerized stack",
            "Pipeline health reporting (HEALTHY/WARNING/DEGRADED/CRITICAL)",
        ],
    },
    {
        id: "flights-operations-data-pipeline",
        code: "PRJ-06",
        title: "Flights Operations — Data Engineering Pipeline",
        summary:
            "Production-oriented data engineering pipeline that ingests live global flight data from OpenSky Network, processes it through a bronze → silver → gold medallion architecture, and loads aggregated results to Snowflake. Orchestrated with Apache Airflow on Docker Compose.",
        stack: [
            "Python",
            "Apache Airflow",
            "Snowflake",
            "PostgreSQL",
            "Docker",
            "pandas",
            "OpenSky API",
        ],
        href: "#projects",
        status: "Live",
        askAiNamespace: "project-flights-operations-data-pipeline",
        metrics: [
            { label: "Architecture", value: "Medallion" },
            { label: "Schedule", value: "Every 30 min" },
            { label: "Scale", value: "6,000+ Flights" },
        ],
        watchDemoHref: "https://youtu.be/Qa3yX67Y388",
        githubHref: "https://github.com/vikrant-honbute/Flights_Operations_Data_Eng_Project",
        contextPrompt:
            "This is a Flights Operations Data Engineering Pipeline using a medallion architecture (Bronze → Silver → Gold). It ingests live global flight state data from the OpenSky Network REST API every 30 minutes via Apache Airflow. Bronze layer stores raw JSON snapshots (~1-2MB per run). Silver layer normalizes 17 API columns into 4 key fields (icao24, origin_country, velocity, geo_altitude) and exports CSV. Gold layer aggregates by origin_country to compute total_flights, avg_velocity, and avg_geo_altitude per country (~150-200 countries). An optional Snowflake loader performs UPSERT (MERGE) into a FLIGHT_KPIS table keyed on WINDOW_START + ORIGIN_COUNTRY. The Airflow DAG (flight_ops_medallion_pipeline) uses PythonOperators with XCom for inter-task file path passing, 30-min schedule, and 1 retry with 5-min delay. 100% Docker Compose containerized with PostgreSQL 15 as Airflow metadata store. Processes 6,000+ concurrent global flights per run.",
        suggestions: [
            "Explain the medallion architecture and each layer's role.",
            "How does the Snowflake UPSERT (MERGE) pattern work?",
            "How is XCom used for inter-task communication in the DAG?",
        ],
        defaultPrompt: "Explain the medallion architecture and each layer's role.",
        highlights: [
            "Industry-standard bronze → silver → gold medallion architecture",
            "Live data ingestion from OpenSky Network API (global flight states)",
            "Processes 6,000+ concurrent flights per pipeline run",
            "30-minute automated scheduling with Airflow orchestration",
            "Snowflake UPSERT (MERGE) for cloud analytics warehouse load",
            "XCom-based inter-task file path propagation",
            "100% Docker Compose containerized environment",
            "Parameterized SQL queries for safe Snowflake writes",
        ],
    },
];

export const featuredProject = projects[0];

