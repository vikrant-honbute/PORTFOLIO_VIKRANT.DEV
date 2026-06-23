"""Lightweight embedding utility using the Gemini Embedding API.

Replaces sentence-transformers (which pulls in PyTorch ~2GB) with a simple
API call to Google's free gemini-embedding-001 model (3072 dimensions).
"""

import os
import google.generativeai as genai

_configured = False


def _ensure_configured() -> None:
    global _configured
    if _configured:
        return
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set")
    genai.configure(api_key=api_key)
    _configured = True


EMBEDDING_MODEL = "models/gemini-embedding-001"
EMBEDDING_DIMENSION = 3072


def embed_texts(texts: list[str]) -> list[list[float]]:
    """Embed a list of texts using Gemini's text-embedding-004 model.

    Args:
        texts: List of strings to embed.

    Returns:
        List of embedding vectors (each 3072-dimensional).
    """
    _ensure_configured()

    if not texts:
        return []

    # Gemini embed_content supports batching natively
    result = genai.embed_content(
        model=EMBEDDING_MODEL,
        content=texts,
        task_type="retrieval_document",
    )

    return result["embedding"]


def embed_query(text: str) -> list[float]:
    """Embed a single query string (uses retrieval_query task type for better search).

    Args:
        text: The query string to embed.

    Returns:
        A single embedding vector (3072-dimensional).
    """
    _ensure_configured()

    result = genai.embed_content(
        model=EMBEDDING_MODEL,
        content=text,
        task_type="retrieval_query",
    )

    return result["embedding"]
