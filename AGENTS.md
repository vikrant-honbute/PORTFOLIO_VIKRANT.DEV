# AGENTS.md — Vikrant AI Portfolio

## Project Overview

This is a production-grade AI portfolio built with Next.js (frontend) and FastAPI (backend) implementing Retrieval-Augmented Generation (RAG).

The goal is to create a scalable, clean, and modular system — not a static portfolio.

---

## Tech Stack

Frontend:

* Next.js (App Router)
* TypeScript
* Tailwind CSS

Backend:

* FastAPI (Python)
* LangChain (RAG pipeline)

Vector Database:

* Pinecone

LLM Providers:

* OpenAI / Claude / Gemini (interchangeable)

---

## Folder Structure Rules

* All frontend code must be inside `src/`
* Use absolute imports with `@/`
* Separate concerns strictly:

src/

* components/ → reusable UI components
* sections/ → page sections (Hero, Projects, etc.)
* data/ → static data (projects, config)
* lib/ → utilities, API helpers

Do NOT mix UI and business logic.

---

## UI Guidelines

* Theme: dark + orange gradient (#ff6a00 → #ff7a18)
* Avoid purple/cyan neon styles
* Use minimal, premium, cinematic design
* No excessive animations
* Prioritize readability and spacing

---

## Component Rules

* Components must be small and reusable
* No component > 150–200 lines
* Use functional components only
* Prefer server components unless interactivity is needed

---

## Data Management

* All project data must come from `data/projects.ts`
* UI must dynamically render from data
* Do NOT hardcode project content in components

---

## API Integration Rules

* All API calls must go through a centralized helper (lib/api.ts)
* Never call external APIs directly inside components
* Handle loading and error states properly

---

## AI / RAG System Rules

* Do NOT send full documents to LLM
* Always use retrieval-based approach

Namespaces:

* portfolio-main → resume, skills
* project-* → per project context

Each project must define:

* id
* askAiNamespace

---

## Backend Rules (FastAPI)

* Separate ingestion and query logic
* Use modular structure:

backend/

* rag/

  * ingest.py
  * query.py

* No business logic in route handlers

---

## Security Rules

* NEVER expose API keys in frontend
* Use environment variables
* Validate all inputs in backend

---

## Performance Rules

* Lazy load heavy components
* Optimize images
* Avoid unnecessary re-renders

---

## Code Quality

* Use TypeScript strictly
* Avoid `any`
* Follow consistent naming conventions

---

## Deployment

Frontend:

* Vercel

Backend:

* Render / Railway

Vector DB:

* Pinecone (cloud)

---

## What to Avoid

* Do NOT generate entire pages blindly using AI
* Do NOT use purple/cyan neon styles 
* Do NOT mix backend logic into frontend
* Do NOT use local vector DB in production
* Do NOT overcomplicate UI with animations

---

## Goal

Build a clean, scalable AI-powered portfolio that demonstrates:

* real engineering thinking
* RAG system understanding
* production-ready architecture
