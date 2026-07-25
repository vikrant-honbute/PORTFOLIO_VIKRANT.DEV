## Profile

Vikrant Honbute is a final year B.Tech AI & Data Science student at VIIT Pune (Vishwakarma Institute of Information Technology), Pune, Maharashtra, India. He is graduating in 2026 (Batch 2022-26) with a CGPA of 8.36. He works as an AI Engineer and GenAI Developer. He is actively looking for full-time AI Engineer roles in Pune or remote. His email is vikranthonbute2004@gmail.com, GitHub is github.com/vikrant-honbute, and LinkedIn is linkedin.com/in/vikranthonbute.

## Availability

Vikrant is currently open to work. He is actively looking for full-time AI Engineer positions starting 2026. He is interested in roles involving LLMs, RAG systems, AI agents, and full-stack AI development. He is available for roles in Pune or remote anywhere.

## Education

Vikrant studies at Vishwakarma Institute of Information Technology (VIIT) in Pune, Maharashtra, India. He is pursuing a Bachelor of Technology in Artificial Intelligence and Data Science. He is in the 2022-26 batch and will graduate in 2026. His current CGPA is 8.36.

## Skills — LLMs and GenAI

Vikrant's strongest skills are in LLMs and Generative AI. He works extensively with LangChain, LangGraph, and CrewAI for building AI agents and pipelines. He has deep experience with RAG (Retrieval-Augmented Generation) systems using FAISS and Pinecone as vector databases. He has used Claude API, OpenAI API, Gemini API, and Groq API for LLM integration. He is experienced with Hugging Face models, RAGAS for RAG evaluation, LangSmith for observability, Prompt Engineering, and LLM Fine-tuning.

## Skills — AI and Machine Learning

Vikrant's AI and ML skills include Python as his primary programming language, Scikit-learn, TensorFlow, Pandas for data manipulation, MLflow and DVC for experiment tracking and versioning, spaCy and NLTK for NLP tasks. He understands machine learning fundamentals, model evaluation, and data science workflows.

## Skills — Web and Backend

Vikrant builds full-stack AI applications. His web and backend skills include ReactJS, Next.js, FastAPI (his preferred Python backend framework), NodeJS, Django, TypeScript, JavaScript, REST APIs, and SQL. He can build complete AI products combining Python backends with React or Next.js frontends.

## Skills — DevOps and MLOps

Vikrant has practical DevOps and MLOps experience including Docker and Docker Compose for containerization, GitHub Actions and CI/CD Pipelines for automation, AWS (Basic), Git for version control, MLflow for experiment tracking, DVC for data versioning, and LangSmith for LLM monitoring.

## Experience — The Data Tech Labs Internship

Vikrant worked as an AI Engineer Intern at The Data Tech Labs from September 2025 to February 2026. This was a 6-month internship where he built two production AI systems for real clients.

## Experience — AI Banking Support Assistant

At The Data Tech Labs, Vikrant built an AI-Powered Banking Support Assistant. This system answers customer queries using information scraped from a bank website, providing responses in both text and voice formats. He implemented the full AI logic using a Retrieval-Augmented Generation (RAG) approach, handling query understanding, document retrieval, and response generation. This was a production system used by real customers.

## Experience — AI Business Requirement System

At The Data Tech Labs, Vikrant built an AI-Powered Business Requirement System. This system uses Large Language Models to transform unstructured business inputs into structured requirement documents. Vikrant implemented DOCX, PDF, and JPEG generation from LLM outputs using template-based formatting. He automated multi-format report generation which improved documentation speed and consistency significantly.

## Project — AI Recruitment Agent

The AI Recruitment Agent is one of Vikrant's main projects. It is an end-to-end AI recruitment system that handles resume analysis, resume-to-job-description similarity search, interview question generation, and automated candidate feedback. It uses a RAG pipeline with FAISS and Pinecone vector databases for accurate matching. The system can analyze a resume, compare it to a job description, generate relevant interview questions, identify skill gaps, and provide actionable feedback. Built with Python, LangChain, Groq API, FAISS, Pinecone, Streamlit for the UI, PyPDF2, spaCy, NLTK, and Docker. The project is live and deployed.

## Project — Quick Clip AI Video Generator

Quick Clip is Vikrant's AI Short Video Generator project. It is a scalable automated pipeline for generating short videos end-to-end using AI. The system takes a topic as input, uses an LLM to write a script, converts the script to speech using Google TTS, generates video visuals using Replicate API models, and combines everything into a final short video. It also uses Gemini 2.5 Flash for semantic video titling and description generation. Built with Next.js, Neon DB, Firebase, Gemini 2.5 Flash, Replicate API, Google TTS, Docker, and GitHub Actions. The project is currently being built.

## Project — CodeGuardian AI DevSecOps Agent

CodeGuardian is an autonomous, agentic AI DevSecOps platform built by Vikrant Honbute. It scans multi-language codebases for security vulnerabilities, provides plain-English explanations using LLMs, retrieves contextual security rules via RAG, and automatically generates secure code fixes.

Executive Summary:
- Project Name: CodeGuardian (The Autonomous AI DevSecOps Agent)
- Elevator Pitch: CodeGuardian is an autonomous, agentic AI DevSecOps platform that scans multi-language codebases for security vulnerabilities, provides plain-English explanations using LLMs, retrieves contextual security rules via RAG, and automatically generates secure code fixes.
- Primary Goal: Make secure software development autonomous by bridging the gap between static analysis tools (linters/SAST) and human security reviewers.
- Key Differentiator: Combines AST-based static code analysis with NVIDIA NIM LLM reasoning, a RAG security knowledge base (OWASP/CWE), and an offline deterministic fallback engine for zero-downtime reliability.

Technical Stack & Tools:
- Backend Framework: Python 3.11+, FastAPI, Uvicorn, Pydantic
- AI Reasoning Models: NVIDIA NIM Microservices (llama-3-1-nemotron-nano-8B-v1), AWS SageMaker Endpoints
- Embedding & RAG: NVIDIA NIM Retrieval Embedding (retrieval-embedding-nim), FAISS / Local Vector Store
- Multi-Language Parsers: Python native ast module, JavaScript Node.js + Esprima AST parser, C/C++ libclang Python bindings
- Database & Persistence: SQLite (data/reports.db for audit reports, data/sessions.db for chat history)
- DevOps & CI/CD: Docker, GitHub Actions (Pytest, Flake8 linting), Pytest
- Frontend UI: HTML5 / JavaScript browser interface served via FastAPI

Core Architecture & Workflow:
1. Ingestion Layer (POST /upload, POST /analyze): Accepts single code files (.py, .js, .cpp, .c), uploaded archives (.zip, .tar.gz), pasted snippets, or remote code URLs.
2. Static Analysis Engine (agent/engine.py, agent/parser.py): Parses code into Abstract Syntax Trees (ASTs) for Python, JS, and C/C++. Scans for vulnerabilities including hardcoded API keys/secrets, unsafe dynamic evaluation (eval, exec), insecure deserialization (pickle.load), weak hashes (MD5, SHA1), and dangerous process execution (subprocess).
3. RAG & AI Reasoning Layer (agent/reasoning.py, agent/llm_client.py): Queries the Security Knowledge Base (agent/knowledge_base.py) seeded with 50+ OWASP Top 10 / CWE rules using vector embeddings (retrieval-embedding-nim). Feeds code snippets, static findings, and relevant OWASP rules to llama-3-1-nemotron-nano-8B-v1 to generate severity scores (Low/Medium/High), root-cause explanations, remediation code diffs, and project-level risk summaries.
4. Persistence & Presentation Layer (agent/persistence.py, app/app.py): Stores structured JSON audit reports and chat histories in SQLite. Provides an interactive /chat API for developers to ask follow-up questions about vulnerabilities.

Key Features:
- Multi-Language AST Parsing: Static code analysis for Python, JavaScript (Esprima), and C/C++ (libclang).
- AI-Powered Vulnerability Remediation: Generates plain-English explanations and drop-in code fixes using NVIDIA NIM LLM models.
- Security RAG Knowledge Base: Context-aware retrieval of OWASP Top 10 and CWE security guidelines.
- Interactive Security Assistant (/chat): Stateful chat endpoint enabling developers to ask follow-up questions about detected risks.
- Multi-Backend Reliability: Flexibly switches between cloud NVIDIA NIM endpoints, AWS SageMaker endpoints, and an offline template-based fallback.
- Risk Scoring & Analytics: Computes overall project security risk scores and stores historical audit logs.

API Endpoints:
- GET /: Serves the browser-based code uploader interface
- GET /health: Health check endpoint returning server status
- POST /upload: Multipart upload for .py, .js, .c, .zip, .tar files or URLs
- POST /analyze: Triggers static scan + RAG LLM enrichment on code input
- POST /analyze_json: Processes raw static analysis JSON payloads for LLM reasoning
- POST /chat: Interactive Q&A chat endpoint regarding code findings
- GET /summary: Retrieves project-wide vulnerability risk scores and statistics
- GET /history: Fetches saved historical audit reports from SQLite persistence

## Publication — IEEE Research Paper

Vikrant published a research paper at the IEEE International Conference on Emerging Smart Computing and Informatics (ESCI) in 2025. The paper is titled Dynamic StarCraft: Multi-Agent Generative AI for Immersive Experiences. This is a peer-reviewed international publication accepted at an IEEE conference. It explores multi-agent generative AI systems applied to game environments.

## Contact

To contact Vikrant, email him at vikranthonbute2004@gmail.com. His GitHub profile is github.com/vikrant-honbute where you can see his code and projects. His LinkedIn profile is linkedin.com/in/vikranthonbute. He responds quickly to opportunities and collaboration requests.

## Hobby

His hobbies are to play video games and cricket and football , also likes to listen to music and watch esports like pubg and cs2