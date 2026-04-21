const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";

export type IngestDocument = {
  text: string;
  metadata?: Record<string, string>;
};

export type IngestPayload = {
  namespace: string;
  documents: IngestDocument[];
};

export type QueryPayload = {
  namespace?: string;
  question: string;
  top_k?: number;
};

export type QuerySource = {
  document_id: string;
  score: number;
  preview: string;
};

export type QueryResponse = {
  namespace: string;
  answer: string;
  sources: QuerySource[];
};

async function request<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export function ingestPortfolioContext(payload: IngestPayload) {
  return request<{ namespace: string; ingested: number }>("/ingest", payload);
}

export function queryPortfolioContext(payload: QueryPayload) {
  return request<QueryResponse>("/query", payload);
}
