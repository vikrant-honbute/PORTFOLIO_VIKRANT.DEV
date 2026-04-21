import re
from pathlib import Path

def load_markdown_kb(filepath: str = None) -> list[dict]:
    if filepath is None:
        filepath = Path(__file__).parent / "vikrant_kb.md"

    text = Path(filepath).read_text(encoding="utf-8")

    # Split by ## headers
    sections = re.split(r"\n##\s+", text)

    documents = []
    for section in sections:
        section = section.strip()
        if not section:
            continue

        # First line is the heading, rest is content
        lines = section.split("\n", 1)
        heading = lines[0].strip().lstrip("#").strip()
        content = lines[1].strip() if len(lines) > 1 else ""

        if not content:
            continue

        # Full text combines heading + content for better retrieval
        full_text = f"{heading}. {content}"

        # Generate a clean ID from heading
        doc_id = heading.lower()
        doc_id = re.sub(r"[^a-z0-9]+", "-", doc_id).strip("-")
        doc_id = doc_id[:60]

        # Infer category from heading
        heading_lower = heading.lower()
        if any(w in heading_lower for w in ["profile", "availability", "education", "contact"]):
            category = "profile"
        elif "skill" in heading_lower:
            category = "skills"
        elif "experience" in heading_lower:
            category = "experience"
        elif "project" in heading_lower:
            category = "project"
        elif "publication" in heading_lower:
            category = "achievement"
        else:
            category = "general"

        documents.append({
            "id": doc_id,
            "text": full_text,
            "metadata": {
                "category": category,
                "heading": heading
            }
        })

    return documents
