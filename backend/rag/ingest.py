from sentence_transformers import SentenceTransformer
from rag.store import upsert_vectors, vector_exists

_embedder = SentenceTransformer("all-MiniLM-L6-v2")

def ingest_documents(namespace: str, documents: list[dict]) -> int:
    vectors = []
    for doc in documents:
        doc_id = doc.get("id") or doc.get("metadata", {}).get("id", doc["text"][:40])
        if vector_exists(doc_id, namespace):
            continue
        embedding = _embedder.encode(doc["text"]).tolist()
        vectors.append({
            "id": doc_id,
            "values": embedding,
            "metadata": {
                **doc.get("metadata", {}),
                "text": doc["text"],
                "namespace": namespace
            }
        })
    if vectors:
        upsert_vectors(vectors)
    return len(vectors)

ingest_namespace_documents = ingest_documents