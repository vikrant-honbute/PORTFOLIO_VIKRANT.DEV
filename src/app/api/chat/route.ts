import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { queryPortfolioContext } from "@/lib/api";
import { projects } from "@/data/projects";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const VIKRANT_CONTEXT = `
## test

CodeGuardian internal test keyword:
ZXCV-RAG-9917

The AI security level is:
OMEGA-RED-ALPHA
`;

function resolveNamespace(projectTitle?: string) {
  // Use the canonical portfolio namespace for all frontend chat queries.
  // Per-project namespaces are not populated by the backend ingestion by default,
  // which causes unnecessary fallbacks. Querying the single ingested namespace
  // ensures the project panels use the Pinecone RAG index.
  return "portfolio-main";
}

function shouldFallback(answer: string) {
  const normalized = answer.trim().toLowerCase();
  return (
    !normalized ||
    normalized.includes("no relevant context found") ||
    normalized.includes("please ensure documents are ingested")
  );
}

async function getLocalFallbackAnswer(question: string, context?: string, projectTitle?: string) {
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

    return answer;
  } catch {
    const result = await Promise.race([
      model.generateContent(prompt),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Gemini timeout")), 15000);
      }),
    ]);

    return result.response.text().trim();
  }
}

export async function POST(req: NextRequest) {
  try {
    const { question, context, projectTitle } = await req.json();

    if (!question?.trim()) {
      return NextResponse.json({ answer: "Please ask a question." });
    }

    try {
      const namespace = resolveNamespace(projectTitle);
      const backendResult = await queryPortfolioContext({
        namespace,
        question,
        top_k: 4,
      });

      if (!shouldFallback(backendResult.answer)) {
        return NextResponse.json({
          answer: backendResult.answer,
          sources: backendResult.sources,
          namespace: backendResult.namespace,
          mode: "pinecone",
        });
      }
    } catch (backendError) {
      console.warn("Pinecone backend failed, using local fallback:", backendError);
    }

    const fallbackAnswer = await getLocalFallbackAnswer(question, context, projectTitle);
    return NextResponse.json({ answer: fallbackAnswer, mode: "local-fallback" });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { answer: "Sorry, something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
