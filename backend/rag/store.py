import os
from pinecone import Pinecone, ServerlessSpec

_pc = None
_index = None

def get_index():
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
            dimension=384,
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1")
        )
    _index = _pc.Index(index_name)
    return _index

def upsert_documents(
    collection_name: str,
    ids: list[str],
    embeddings: list[list[float]],
    metadatas: list[dict],
    documents: list[str],
):
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
        index.upsert(vectors=vectors, namespace=collection_name)

def query_collection(collection_name: str, query_embedding: list[float], top_k: int = 5):
    index = get_index()
    results = index.query(
        vector=query_embedding,
        top_k=top_k,
        namespace=collection_name,
        include_metadata=True,
    )

    ids = []
    distances = []
    metadatas = []
    documents = []

    for match in results.matches:
        metadata = dict(match.metadata or {})
        ids.append(match.id)
        distances.append(match.score)
        metadatas.append(metadata)
        documents.append(metadata.get("text", ""))

    return {
        "ids": [ids],
        "distances": [distances],
        "metadatas": [metadatas],
        "documents": [documents],
    }

def upsert_vectors(vectors: list[dict]):
    index = get_index()
    index.upsert(vectors=vectors)

def query_vectors(embedding: list[float], top_k: int, namespace: str = "default"):
    index = get_index()
    results = index.query(
        vector=embedding,
        top_k=top_k,
        namespace=namespace,
        include_metadata=True
    )
    return results.matches

def vector_exists(doc_id: str, namespace: str = "default") -> bool:
    index = get_index()
    result = index.fetch(ids=[doc_id], namespace=namespace)
    return doc_id in result.vectors