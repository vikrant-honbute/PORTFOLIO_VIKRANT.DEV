# FastAPI Backend — Vikrant Portfolio RAG

FastAPI backend powering the AI chat assistant on the portfolio. Uses **Pinecone** for vector storage and **Gemini/Groq** for answer generation via a RAG (Retrieval-Augmented Generation) pipeline.

## Architecture

```
Browser → Next.js /api/chat (Vercel) → FastAPI /api/query (Render) → Pinecone + Groq/Gemini
```

## Structure

- `main.py` — FastAPI app entrypoint with lifespan ingestion
- `api/routes/ingest.py` — POST `/api/ingest` — ingest documents into a namespace
- `api/routes/query.py` — POST `/api/query` — RAG query against a namespace
- `api/schemas.py` — Pydantic request/response models
- `rag/embeddings.py` — Gemini text-embedding-004 utility (768-dim)
- `rag/ingest.py` — Document ingestion logic
- `rag/query.py` — RAG retrieval + LLM answer generation
- `rag/store.py` — Pinecone index operations
- `knowledge/loader.py` — Markdown knowledge base parser
- `knowledge/vikrant_kb.md` — Portfolio knowledge base

## Run Locally

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate       # Windows
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your keys:

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Google Gemini API key (embeddings + fallback LLM) |
| `GROQ_API_KEY` | Groq API key (primary LLM — Llama 3.1) |
| `PINECONE_API_KEY` | Pinecone API key |
| `PINECONE_INDEX_NAME` | Pinecone index name (e.g. `portfolio-rag`) |
| `BACKEND_CORS_ORIGINS` | Comma-separated allowed origins |

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| POST | `/api/ingest` | Ingest documents into a Pinecone namespace |
| POST | `/api/query` | Query a namespace with a question (RAG) |

## Deployment

Deployed on **Render** as a Web Service. See the deployment section in the project root README for details.
