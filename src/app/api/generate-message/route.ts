import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = "You are a professional message writer. Convert the user's raw input into a clean, professional outreach message. Use ONLY what the user has written — do not add any contact details, email addresses, LinkedIn URLs, names, or any information not present in the user's input. Keep the same intent and meaning, just make it professional and well structured. Return only the message body, nothing else.";

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
        model: "llama-3.1-8b-instant",
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
    const message = groqData?.choices?.[0]?.message?.content?.trim();

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
