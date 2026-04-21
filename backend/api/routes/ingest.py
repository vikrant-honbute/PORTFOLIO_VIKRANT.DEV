from fastapi import APIRouter, HTTPException, status

from api.schemas import IngestRequest, IngestResponse
from rag.ingest import ingest_namespace_documents

router = APIRouter()


@router.post("/ingest", response_model=IngestResponse, status_code=status.HTTP_201_CREATED)
def ingest_documents(payload: IngestRequest) -> IngestResponse:
    try:
        ingested_count = ingest_namespace_documents(
            payload.namespace,
            ((document.text, document.metadata) for document in payload.documents),
        )
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    return IngestResponse(namespace=payload.namespace, ingested=ingested_count)
