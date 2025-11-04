from ddgs import DDGS  # ✅ nouveau package

def search_courses(kpi: str, job: str, max_results: int = 3):
    """Recherche des formations en ligne liées au KPI et au métier."""
    query = f"formation {kpi} {job} site:coursera.org OR site:openclassrooms.com OR site:udemy.com"
    results = []

    try:
        with DDGS() as ddgs:
            for r in ddgs.text(query, max_results=max_results):
                results.append({
                    "title": r.get("title"),
                    "url": r.get("href")
                })
    except Exception as e:
        return {"error": str(e)}

    return {
        "query": query,
        "results": results or [{"message": "Aucune formation trouvée."}]
    }
