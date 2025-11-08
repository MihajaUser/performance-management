import axios from "axios";
import { AiAnalysisResult } from "App/Types/ai";

export default class AiService {
  /**
   * Analyse IA : sentiment + recommandation de cours basées sur les KPI
   */
  public static async analyzeEvaluationAI(
    comment: string,
    kpis: { name: string; score: number }[],
    job: string
  ): Promise<AiAnalysisResult> {
    try {
      // === 1️⃣ Analyse de sentiment ===
      const sentimentRes = await axios.post(
        "http://localhost:8001/analyze-sentiment",
        {
          text: comment,
        }
      );

      const sentiment = sentimentRes.data
        .sentiment as AiAnalysisResult["sentiment"];

      // === 2️⃣ Identifier les KPI faibles ===
      const sorted = [...kpis].sort((a, b) => a.score - b.score);
      const weakest = sorted.slice(0, 2).map((k) => k.name); // 🧠 2 KPI les plus faibles

      // === 3️⃣ Recommandations seulement si ton non agressif ===
      let recommendations: AiAnalysisResult["recommendations"] = [];
      if (sentiment !== "aggressif" && weakest.length > 0) {
        const queryText = weakest.join(" ");
        const courseRes = await axios.post(
          "http://localhost:8001/recommend-course",
          {
            kpi: queryText,
            job: job ?? "employee",
          }
        );

        recommendations = courseRes.data.results?.slice(0, 2) ?? [];
      }

      return {
        sentiment,
        confidence: sentimentRes.data.confidence ?? null,
        raw_label: sentimentRes.data.raw_label ?? null,
        recommendations,
      };
    } catch (error) {
      console.error("⚠️ Erreur analyse IA :", error.message);
      return {
        sentiment: "neutral",
        confidence: null,
        recommendations: [],
      };
    }
  }
}
