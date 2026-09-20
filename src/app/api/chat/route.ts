import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { queryPortfolioContext } from "@/lib/api";

/** Strip Qwen-style <think>…</think> reasoning blocks from model output. */
function stripThinkTags(text: string): string {
  return text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const VIKRANT_CONTEXT = `
PHONE BRAND is IQOO NEO 7
`;

function resolveNamespace(_projectTitle?: string) {
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

// ---------------------------------------------------------------------------
// SSE helpers
// ---------------------------------------------------------------------------

/** Encode a single SSE data line. */
function sseEncode(data: string): Uint8Array {
  return new TextEncoder().encode(`data: ${data}\n\n`);
}

/** Create SSE Response headers. */
function sseHeaders(): HeadersInit {
  return {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  };
}

// ---------------------------------------------------------------------------
// Streaming strategies
// ---------------------------------------------------------------------------

/**
 * Simulate streaming for a pre-computed answer by splitting it into
 * word-level chunks with a tiny delay between each.
 */
function streamPrecomputedAnswer(
  answer: string,
  controller: ReadableStreamDefaultController
) {
  const words = answer.split(/(\s+)/); // keep whitespace as separate tokens
  let index = 0;

  const interval = setInterval(() => {
    if (index >= words.length) {
      clearInterval(interval);
      controller.enqueue(sseEncode("[DONE]"));
      controller.close();
      return;
    }
    controller.enqueue(sseEncode(JSON.stringify({ token: words[index] })));
    index++;
  }, 18); // ~18ms per word ≈ fast but visually pleasing
}

/**
 * Real streaming using Gemini's generateContentStream API.
 */
async function streamGeminiResponse(
  prompt: string,
  controller: ReadableStreamDefaultController
) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  try {
    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        controller.enqueue(sseEncode(JSON.stringify({ token: text })));
      }
    }

    controller.enqueue(sseEncode("[DONE]"));
    controller.close();
  } catch (err) {
    console.error("Gemini stream error:", err);
    controller.enqueue(
      sseEncode(
        JSON.stringify({
          token: "Sorry, something went wrong. Please try again.",
        })
      )
    );
    controller.enqueue(sseEncode("[DONE]"));
    controller.close();
  }
}

/**
 * Attempt Groq first (non-streaming, then simulate-stream the result).
 * If Groq fails, fall back to real Gemini streaming.
 */
async function streamFallbackResponse(
  question: string,
  context: string | undefined,
  projectTitle: string | undefined,
  controller: ReadableStreamDefaultController
) {
  const systemContext = projectTitle
    ? `${VIKRANT_CONTEXT}\n\nThe user is asking specifically about the project: "${projectTitle}".\nExtra project context: ${context ?? ""}\nFocus your answer on this project unless asked otherwise.`
    : VIKRANT_CONTEXT;

  const prompt = `${systemContext}\n\nQuestion: ${question}`;

  try {
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY!}`,
        },
        body: JSON.stringify({
          model: "qwen/qwen3.8-27b",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    if (!groqResponse.ok) {
      throw new Error(`Groq failed: ${groqResponse.status}`);
    }

    const groqData = await groqResponse.json();
    const answer = groqData?.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      throw new Error("Groq returned empty response");
    }

    streamPrecomputedAnswer(stripThinkTags(answer), controller);
  } catch {
    // Groq failed → use real Gemini streaming
    await streamGeminiResponse(prompt, controller);
  }
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    const { question, context, projectTitle } = await req.json();

    if (!question?.trim()) {
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(
            sseEncode(JSON.stringify({ token: "Please ask a question." }))
          );
          controller.enqueue(sseEncode("[DONE]"));
          controller.close();
        },
      });
      return new Response(stream, { headers: sseHeaders() });
    }

    // --- Try Pinecone RAG backend first ---
    let pineconeAnswer: string | null = null;
    try {
      const namespace = resolveNamespace(projectTitle);
      const backendResult = await queryPortfolioContext({
        namespace,
        question,
        top_k: 4,
      });

      if (!shouldFallback(backendResult.answer)) {
        pineconeAnswer = stripThinkTags(backendResult.answer);
      }
    } catch (backendError) {
      console.warn(
        "Pinecone backend failed, using local fallback:",
        backendError
      );
    }

    // --- Build the SSE stream ---
    const stream = new ReadableStream({
      start(controller) {
        if (pineconeAnswer) {
          // Good Pinecone answer → simulate streaming
          streamPrecomputedAnswer(pineconeAnswer, controller);
        } else {
          // Fallback → Groq or real Gemini stream
          streamFallbackResponse(
            question,
            context,
            projectTitle,
            controller
          ).catch((err) => {
            console.error("Fallback stream error:", err);
            controller.enqueue(
              sseEncode(
                JSON.stringify({
                  token: "Sorry, something went wrong. Please try again.",
                })
              )
            );
            controller.enqueue(sseEncode("[DONE]"));
            controller.close();
          });
        }
      },
    });

    return new Response(stream, { headers: sseHeaders() });
  } catch (err) {
    console.error("Chat route error:", err);

    const errorStream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          sseEncode(
            JSON.stringify({
              token: "Sorry, something went wrong. Please try again.",
            })
          )
        );
        controller.enqueue(sseEncode("[DONE]"));
        controller.close();
      },
    });

    return new Response(errorStream, {
      status: 500,
      headers: sseHeaders(),
    });
  }
}
