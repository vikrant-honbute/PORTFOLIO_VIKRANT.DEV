from fastapi import APIRouter, HTTPException, status

from api.schemas import QueryRequest, QueryResponse, QuerySource
from rag.query import query_namespace

router = APIRouter()


@router.post("/query", response_model=QueryResponse, status_code=status.HTTP_200_OK)
def query_documents(payload: QueryRequest) -> QueryResponse:
    try:
        answer, retrieved = query_namespace(
            namespace=payload.namespace,
            question=payload.question,
            top_k=payload.top_k,
        )
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    return QueryResponse(
        namespace=payload.namespace,
        answer=answer,
        sources=[
            QuerySource(document_id=item.document_id, score=item.score, preview=item.preview)
            for item in retrieved
        ],
    )
