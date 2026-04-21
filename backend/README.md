# FastAPI Backend

This backend provides ingestion and retrieval routes for the portfolio.

## Structure

- `main.py`: FastAPI app entrypoint
- `api/routes/ingest.py`: ingestion endpoint router
- `api/routes/query.py`: query endpoint router
- `rag/ingest.py`: ingestion business logic
- `rag/query.py`: retrieval business logic
- `rag/store.py`: temporary in-memory store for local development

## Run Locally

1. Create and activate a Python virtual environment.
2. Install dependencies: `pip install -r requirements.txt`
3. Start server: `uvicorn main:app --reload --port 8000`

## Endpoints

- `POST /api/ingest`
- `POST /api/query`
- `GET /health`

## Important

The in-memory store is only for local development. Replace it with Pinecone in production.
