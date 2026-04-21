import os
import importlib
from dataclasses import dataclass
from sentence_transformers import SentenceTransformer
import google.generativeai as genai
from rag.store import query_vectors

_groq_api_key = os.getenv("GROQ_API_KEY")
_gemini_api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=_gemini_api_key)
_groq_client = None
if _groq_api_key:
    try:
        _groq_client = importlib.import_module("groq").Groq(api_key=_groq_api_key)
    except Exception:
        _groq_client = None
_model = genai.GenerativeModel("gemini-1.5-flash")
_embedder = SentenceTransformer("all-MiniLM-L6-v2")

SYSTEM_PROMPT = """You are Vikrant Honbute's portfolio assistant.
Answer questions about his projects, skills, and experience using only the context provided.
Be concise (2-4 sentences). Sound human and direct, not robotic or corporate.
If the context does not contain the answer, say so honestly."""

@dataclass(frozen=True)
class RetrievedChunk:
    document_id: str
    score: float
    preview: str
    text: str

def query_namespace(namespace: str, question: str, top_k: int) -> tuple[str, list[RetrievedChunk]]:
    query_embedding = _embedder.encode(question).tolist()
    matches = query_vectors(query_embedding, top_k, namespace)

    if not matches:
        return "No relevant context found. Please ensure documents are ingested.", []

    context_text = "\n\n".join(
        m.metadata.get("text", "") for m in matches
    )

    prompt = f"{SYSTEM_PROMPT}\n\nContext:\n{context_text}\n\nQuestion: {question}"
    try:
        if _groq_client is None:
            raise ValueError("Missing GROQ_API_KEY")

        response = _groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
        )
        answer = (response.choices[0].message.content or "").strip()

        if not answer:
            raise ValueError("Groq returned empty response")
    except Exception:
        response = _model.generate_content(prompt)
        answer = response.text.strip()

    sources = [
        RetrievedChunk(
            document_id=m.id,
            score=round(m.score, 3),
            preview=m.metadata.get("text", "")[:180],
            text=m.metadata.get("text", "")
        )
        for m in matches
    ]

    return answer, sources
