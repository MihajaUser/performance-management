import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Evaluation from "App/Models/Evaluation";
import AiAnalysis from "App/Models/AiAnalysis";
import EvaluationValidator from "App/Validators/EvaluationValidator";
import UserCompetency from "App/Models/UserCompetency";
import UserKpi from "App/Models/UserKpi";
import AiService from "App/services/Services/AiService";
import { AiAnalysisResult } from "App/Types/ai";
import PerformanceScore from "App/Models/PerformanceScore";
import CompetencyTemplate from "App/Models/CompetencyTemplate";
import CompetencyResult from "App/Models/CompetencyResult";
import User from "App/Models/User";
import PredictionService from "App/services/Services/PredictionService";

export default class EvaluationController {
  public async index({ request }: HttpContextContract) {
    const payload = await request.validate({
      schema: EvaluationValidator.list,
    });

    const page = payload.page ?? 1;
    const limit = payload.limit ?? 10;
    const order = payload.order ?? "desc";

    const query = Evaluation.query()
      .preload("employee", (q) => q.preload("department").preload("jobTitle"))
      .preload("evaluator")
      .preload("analyses");

    if (payload.period) query.where("period", payload.period);
    if (payload.type) query.where("type", payload.type);

    const evaluations = await query
      .orderBy("created_at", order)
      .paginate(page, limit);
    return evaluations;
  }

  public async show({ params, response }: HttpContextContract) {
    const evaluation = await Evaluation.query()
      .where("id", params.id)
      .preload("employee", (q) => q.preload("department").preload("jobTitle"))
      .preload("evaluator")
      .preload("analyses")
      .first();

    if (!evaluation)
      return response.notFound({ message: "Évaluation non trouvée" });
    return evaluation;
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate({
      schema: EvaluationValidator.create,
    });
    const evaluation = await Evaluation.create(payload);

    if (evaluation.comment) {
      await AiAnalysis.create({
        evaluationId: evaluation.id,
        type: "sentiment",
        result: evaluation.sentiment ?? "neutral",
        details: { text: evaluation.comment, confidence: 0.8 },
      });
    }

    return evaluation;
  }

  public async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: EvaluationValidator.update,
    });
    const evaluation = await Evaluation.find(params.id);
    if (!evaluation)
      return response.notFound({ message: "Évaluation introuvable" });

    evaluation.merge(payload);
    await evaluation.save();

    return evaluation;
  }

  public async destroy({ params, response }: HttpContextContract) {
    const evaluation = await Evaluation.find(params.id);
    if (!evaluation)
      return response.notFound({ message: "Évaluation introuvable" });

    await evaluation.delete();
    return { message: "Évaluation supprimée avec succès" };
  }

  /**
   * Crée une évaluation complète (avec KPI et compétences)
   * POST /evaluations/full
   */
  public async storeFull({ request, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: EvaluationValidator.storeFull,
    });

    const employee = await User.find(payload.employeeId);

    const seniority = employee
      ? Math.floor(
        (Date.now() - employee.createdAt.toJSDate().getTime()) /
        (1000 * 60 * 60 * 24 * 365)
      )
      : 0;

    // ✅ Calculer les score
    const kpi_score =
      payload.kpis && payload.kpis.length > 0
        ? payload.kpis.reduce((sum, k) => sum + k.score, 0) / payload.kpis.length
        : 0;

    const competency_score =
      payload.competencies && payload.competencies.length > 0
        ? payload.competencies.reduce((sum, c) => sum + c.score, 0) / payload.competencies.length
        : 0;

    const generalScore = (kpi_score * 0.7) + (competency_score * 0.3);

    const predicted = await PredictionService.predictPerformance({
      kpi_score,
      competency_score,
      seniority,
    });


    // ✅ 1. Créer l’évaluation principale
    const evaluation = await Evaluation.create({
      employeeId: payload.employeeId,
      evaluatorId: payload.evaluatorId,
      type: payload.type,
      period: payload.period,
      comment: payload.comment,
      generalScore,
      sentiment: "neutral",
    });

    // ✅ 2. Mettre à jour les KPI existants
    if (payload.kpis?.length) {
      for (const k of payload.kpis) {
        const existingKpi = await UserKpi.find(k.id);
        if (existingKpi) {
          existingKpi.merge({
            score: k.score,
            comment: k.comment,
          });
          await existingKpi.save();
        }
      }
    }

    // ✅ 3. Enregistrer les compétences associées
    if (payload.competencies?.length) {
      for (const c of payload.competencies) {
        await UserCompetency.create({
          evaluationId: evaluation.id,
          competencyId: c.competencyId,
          score: c.score,
          comment: c.comment,
          evaluatorType: payload.type,
        });
      }
    }

    // ✅ 4. Appeler l’IA pour sentiment + recommandation ciblée
    const aiResult: AiAnalysisResult = await AiService.analyzeEvaluationAI(
      payload.comment ?? "",
      payload.kpis ?? [],
      "manager" // ⚙️ à rendre dynamique (ex: employee.jobTitle.name)
    );


    // ✅ 5. Mettre à jour l’évaluation avec le résultat IA
    evaluation.merge({
      sentiment: aiResult.sentiment,
      trainingRecommendations: aiResult.recommendations,
    });
    await evaluation.save();

    // ✅ 6. Enregistrer l’analyse IA (sentiment)
    await AiAnalysis.create({
      evaluationId: evaluation.id,
      type: "sentiment",
      result: aiResult.sentiment,
      details: {
        confidence: aiResult.confidence,
        text: payload.comment,
        raw_label: aiResult.raw_label,
      },
    });


    // ✅ 7. Si ce n’est pas une auto-évaluation → enregistrer Performance + CompetencyResult
    if (payload.type !== "auto") {
      // --- 🧠 Enregistrer la performance globale ---
      const finalScore =
        payload.kpis?.length && payload.kpis.length > 0
          ? payload.kpis.reduce((sum, k) => sum + k.score, 0) /
          payload.kpis.length
          : 0;

      await PerformanceScore.create({
        userId: payload.employeeId,
        period: evaluation.period,
        scoreManager: finalScore,
        scoreFinal: finalScore, // pourra être ajusté plus tard
        predictedScore: predicted, // a ajuster plus tard
      });

      // --- 🧩 Enregistrer le résultat moyen par catégorie de compétence ---
      const groupedByCategory: Record<number, number[]> = {};

      for (const c of payload.competencies ?? []) {
        const competency = await CompetencyTemplate.find(c.competencyId);
        if (competency) {
          const catId = competency.categoryId;
          if (!groupedByCategory[catId]) groupedByCategory[catId] = [];
          groupedByCategory[catId].push(c.score);
        }
      }

      for (const [categoryId, scores] of Object.entries(groupedByCategory)) {
        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
        await CompetencyResult.create({
          evaluationId: evaluation.id,
          categoryId: Number(categoryId),
          averageScore: avg,
          commentSummary: `Moyenne des compétences de la catégorie`,
        });
      }
    }

    // ✅ 8. Retour API complet
    return response.created({
      message: "Évaluation complète créée avec succès",
      evaluation: {
        ...evaluation.toJSON(),
        sentiment: aiResult.sentiment,
        trainingRecommendations: aiResult.recommendations,
      },
    });
  }
}
