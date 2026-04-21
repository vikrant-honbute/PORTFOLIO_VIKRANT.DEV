from typing import Any

from pydantic import BaseModel, Field, field_validator


class IngestDocument(BaseModel):
    text: str = Field(min_length=1, max_length=8000)
    metadata: dict[str, str] = Field(default_factory=dict)

    @field_validator("metadata")
    @classmethod
    def normalize_metadata(cls, value: dict[str, Any]) -> dict[str, str]:
        if len(value) > 20:
            raise ValueError("metadata must have 20 keys or fewer")

        normalized: dict[str, str] = {}

        for key, raw_value in value.items():
            normalized_key = str(key).strip()
            if not normalized_key:
                continue

            normalized[normalized_key[:60]] = str(raw_value)[:200]

        return normalized


class IngestRequest(BaseModel):
    namespace: str = Field(pattern=r"^[a-z0-9-]{3,64}$")
    documents: list[IngestDocument]

    @field_validator("documents")
    @classmethod
    def validate_documents(cls, value: list[IngestDocument]) -> list[IngestDocument]:
        if not value:
            raise ValueError("documents cannot be empty")
        if len(value) > 100:
            raise ValueError("documents cannot exceed 100 items per request")
        return value


class IngestResponse(BaseModel):
    namespace: str
    ingested: int


class QueryRequest(BaseModel):
    namespace: str = Field(default="portfolio-main", pattern=r"^[a-z0-9-]{3,64}$")
    question: str = Field(min_length=3, max_length=1200)
    top_k: int = Field(default=4, ge=1, le=10)


class QuerySource(BaseModel):
    document_id: str
    score: float
    preview: str


class QueryResponse(BaseModel):
    namespace: str
    answer: str
    sources: list[QuerySource]
