import { NextRequest, NextResponse } from "next/server";

/** Strip Qwen-style <think>…</think> reasoning blocks from model output. */
function stripThinkTags(text: string): string {
  return text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
}

const SYSTEM_PROMPT = `You are an AI assistant helping a user write a professional outreach message to Vikrant.
Your task is to rewrite the user's rough input into a polished, formal message directed TO Vikrant, written FROM the perspective of the user (first-person "I" or "We").
CRITICAL RULES:
1. DO NOT act as a middleman or narrator (Never say "The user wants to tell you", "I have been asked to communicate", etc.).
2. Write directly as if you are the user emailing Vikrant (e.g., "Hi Vikrant, I would like to...").
3. Use ONLY the information provided in the user's input. Do not invent details.
4. Keep the same intent, just make it professional.
5. Return ONLY the drafted message body, nothing else.`;
export async function POST(req: NextRequest) {
  try {
    const { rawMessage } = await req.json();

    if (!rawMessage?.trim()) {
      return NextResponse.json({ message: "Please provide a message." }, { status: 400 });
    }

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY!}`,
      },
      body: JSON.stringify({
        model: "qwen/qwen3.6-27b",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: rawMessage },
        ],
      }),
    });

    if (!groqResponse.ok) {
      const groqError = await groqResponse.text();
      throw new Error(groqError || `Groq request failed with status ${groqResponse.status}`);
    }

    const groqData = await groqResponse.json();
    const message = stripThinkTags(groqData?.choices?.[0]?.message?.content?.trim() ?? "");

    if (!message) {
      throw new Error("Groq returned empty response");
    }

    return NextResponse.json({ message });
  } catch (err) {
    console.error("Generate message route error:", err);
    return NextResponse.json(
      { message: "Sorry, something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
