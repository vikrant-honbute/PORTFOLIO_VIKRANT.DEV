import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const VIKRANT_CONTEXT = `
You are the portfolio assistant for Vikrant Honbute. Answer all questions about him concisely and professionally.

PROFILE:
Name: Vikrant Honbute
Role: AI Engineer / GenAI Developer
College: VIIT Pune — B.Tech AI & Data Science (2022–26), CGPA 8.18
Location: Pune, India
Status: Open to full-time AI Engineer roles
Email: vikranthonbute2004@gmail.com
GitHub: github.com/vikrant-honbute
LinkedIn: linkedin.com/in/vikranthonbute

EXPERIENCE:
AI Engineer Intern @ The Data Tech Labs (Sept 2025 – Feb 2026)
- Built AI Banking Support Assistant using RAG — answered queries from bank website, responses in text and voice
- Built AI Business Requirement System — LLM transforms business inputs into DOCX/PDF/JPEG output documents

PROJECTS:
1. AI Recruitment Agent
   Stack: Python, LangChain, Groq API, FAISS, Pinecone, Streamlit, Docker
   What: End-to-end recruitment system — resume analysis, JD similarity search, interview Q&A generation, automated feedback using RAG + LLMs

2. Quick Clip — AI Short Video Generator
   Stack: Next.js, Gemini 2.5 Flash, Firebase, Replicate API, Google TTS, Docker
   What: Automated short video pipeline — LLM scripting, voice synthesis, video rendering, semantic titling

PUBLICATION:
IEEE ESCI 2025 — "Dynamic StarCraft: Multi-Agent Generative AI for Immersive Experiences"

SKILLS:
LLMs & GenAI: LangChain, LangGraph, CrewAI, RAG, FAISS, Pinecone, Gemini, Claude API, Hugging Face, RAGAS, LangSmith
AI/ML: Python, Scikit-learn, TensorFlow, Pandas, MLflow, DVC, spaCy, NLTK
Web & Backend: ReactJS, Next.js, FastAPI, NodeJS, Django, TypeScript, RestAPI, SQL
DevOps & MLOps: Docker, GitHub Actions, CI/CD, AWS (Basic), Docker Compose

RULES:
- Keep answers to 2-4 sentences max
- Be direct and human, not corporate
- If asked about availability: he is actively looking for full-time AI Engineer roles
- If asked for contact: share his email and LinkedIn
`;

export async function POST(req: NextRequest) {
  try {
    const { question, context, projectTitle } = await req.json();

    if (!question?.trim()) {
      return NextResponse.json({ answer: "Please ask a question." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const systemContext = projectTitle
      ? `${VIKRANT_CONTEXT}\n\nThe user is asking specifically about the project: "${projectTitle}".\nExtra project context: ${context ?? ""}\nFocus your answer on this project unless asked otherwise.`
      : VIKRANT_CONTEXT;

    const prompt = `${systemContext}\n\nQuestion: ${question}`;

    try {
      const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY!}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!groqResponse.ok) {
        const groqError = await groqResponse.text();
        throw new Error(groqError || `Groq fallback failed with status ${groqResponse.status}`);
      }

      const groqData = await groqResponse.json();
      const answer = groqData?.choices?.[0]?.message?.content?.trim();

      if (!answer) {
        throw new Error("Groq fallback returned empty response");
      }

      return NextResponse.json({ answer });
    } catch {
      const result = await Promise.race([
        model.generateContent(prompt),
        new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error("Gemini timeout")), 15000);
        }),
      ]);

      const answer = result.response.text().trim();
      return NextResponse.json({ answer });
    }
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { answer: "Sorry, something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
