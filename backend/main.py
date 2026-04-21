import os
from contextlib import asynccontextmanager
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes.ingest import router as ingest_router
from api.routes.query import router as query_router
from knowledge.loader import load_markdown_kb
from rag.ingest import ingest_documents

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Ingesting Vikrant knowledge base into Pinecone...")
    documents = load_markdown_kb()
    count = ingest_documents("vikrant-portfolio", documents)
    print(f"Ingested {count} new documents. Backend ready.")
    yield

def create_app() -> FastAPI:
    app = FastAPI(
        title="Vikrant Portfolio API",
        description="FastAPI backend with Pinecone RAG for portfolio queries.",
        version="0.2.0",
        lifespan=lifespan
    )

    allowed_origins = [
        origin.strip()
        for origin in os.getenv("BACKEND_CORS_ORIGINS", "http://localhost:3000").split(",")
        if origin.strip()
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/health")
    def health_check() -> dict[str, str]:
        return {"status": "ok"}

    app.include_router(ingest_router, prefix="/api", tags=["Ingest"])
    app.include_router(query_router, prefix="/api", tags=["Query"])

    return app

app = create_app()
