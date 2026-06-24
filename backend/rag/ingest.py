"""Document ingestion logic — embeds and upserts documents into Pinecone."""

from rag.embeddings import embed_texts
from rag.store import upsert_documents, fetch_existing_ids


def ingest_documents(namespace: str, documents: list[dict], overwrite: bool = False) -> int:
    """Ingest a list of documents into a Pinecone namespace.

    Each document should be a dict with:
        - "id" (optional): unique identifier
        - "text": the document content
        - "metadata" (optional): dict of metadata

    Skips documents that already exist in the namespace unless overwrite is True.
    Returns the number of newly ingested or updated documents.
    """
    if not documents:
        return 0

    # Build list of (doc_id, doc) pairs
    doc_pairs = []
    for doc in documents:
        doc_id = doc.get("id") or doc.get("metadata", {}).get("id", doc["text"][:40])
        doc_pairs.append((doc_id, doc))

    if not overwrite:
        # Batch-check which IDs already exist (single Pinecone call)
        all_ids = [pair[0] for pair in doc_pairs]
        existing_ids = fetch_existing_ids(all_ids, namespace)
        # Filter to only new documents
        new_docs = [(doc_id, doc) for doc_id, doc in doc_pairs if doc_id not in existing_ids]
    else:
        new_docs = doc_pairs

    if not new_docs:
        return 0

    # Embed all new documents in one batch
    texts = [doc["text"] for _, doc in new_docs]
    embeddings = embed_texts(texts)

    # Prepare upsert data
    ids = [doc_id for doc_id, _ in new_docs]
    metadatas = [doc.get("metadata", {}) for _, doc in new_docs]

    upsert_documents(namespace, ids, embeddings, metadatas, texts)

    return len(new_docs)


# Alias for backward compatibility with route imports
ingest_namespace_documents = ingest_documents