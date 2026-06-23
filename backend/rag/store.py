"""Pinecone vector store operations.

Handles index creation, upserting documents, querying, and existence checks.
"""

import os
from pinecone import Pinecone, ServerlessSpec

from rag.embeddings import EMBEDDING_DIMENSION

_pc = None
_index = None


def get_index():
    """Get or create the Pinecone index (singleton)."""
    global _pc, _index
    if _index is not None:
        return _index
    api_key = os.getenv("PINECONE_API_KEY")
    index_name = os.getenv("PINECONE_INDEX_NAME")
    if not api_key:
        raise ValueError("PINECONE_API_KEY is not set")
    if not index_name:
        raise ValueError("PINECONE_INDEX_NAME is not set")

    _pc = Pinecone(api_key=api_key)
    existing = _pc.list_indexes()
    if hasattr(existing, "names"):
        existing_names = set(existing.names())
    else:
        existing_names = set(
            i["name"] if isinstance(i, dict) else i.name for i in existing
        )

    if index_name not in existing_names:
        _pc.create_index(
            name=index_name,
            dimension=EMBEDDING_DIMENSION,
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1")
        )
    _index = _pc.Index(index_name)
    return _index


def upsert_documents(
    namespace: str,
    ids: list[str],
    embeddings: list[list[float]],
    metadatas: list[dict],
    documents: list[str],
) -> None:
    """Upsert document vectors into a Pinecone namespace."""
    index = get_index()
    vectors = []
    for doc_id, embedding, metadata, document in zip(ids, embeddings, metadatas, documents):
        vectors.append(
            {
                "id": doc_id,
                "values": embedding,
                "metadata": {**(metadata or {}), "text": document},
            }
        )
    if vectors:
        index.upsert(vectors=vectors, namespace=namespace)


def query_vectors(embedding: list[float], top_k: int, namespace: str = "default"):
    """Query the Pinecone index for similar vectors."""
    index = get_index()
    results = index.query(
        vector=embedding,
        top_k=top_k,
        namespace=namespace,
        include_metadata=True,
    )
    return results.matches


def fetch_existing_ids(doc_ids: list[str], namespace: str) -> set[str]:
    """Batch-check which document IDs already exist in the namespace.

    Uses a single Pinecone fetch call instead of N individual calls.
    """
    if not doc_ids:
        return set()
    index = get_index()
    result = index.fetch(ids=doc_ids, namespace=namespace)
    return set(result.vectors.keys())