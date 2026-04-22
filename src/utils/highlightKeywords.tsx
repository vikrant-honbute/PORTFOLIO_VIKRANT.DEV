import React from "react";

const KEYWORDS = [
  "LangChain",
  "LangGraph",
  "CrewAI",
  "FastAPI",
  "Pinecone",
  "Docker",
  "Next.js",
  "RAG",
  "FAISS",
];

export function highlightKeywords(text: string): React.ReactNode {
  if (!text) return text;

  const pattern = new RegExp(
    `(${KEYWORDS.map((k) => k.replace(".", "\\.")).join("|")})`,
    "g"
  );
  const parts = text.split(pattern);

  return parts.map((part, i) =>
    KEYWORDS.includes(part) ? (
      <span key={i} className="text-orange-500 font-semibold">
        {part}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}
