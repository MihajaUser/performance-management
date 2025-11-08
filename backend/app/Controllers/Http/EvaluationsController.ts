import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Evaluation from "App/Models/Evaluation";
import AiAnalysis from "App/Models/AiAnalysis";
import EvaluationValidator from "App/Validators/EvaluationValidator";
import UserCompetency from "App/Models/UserCompetency";
import UserKpi from "App/Models/UserKpi";
import AiService from "App/services/Services/AiService";
import { AiAnalysisResult } from "App/Types/ai";

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
   
    // ✅ 1. Créer l’évaluation principale
    const evaluation = await Evaluation.create({
      employeeId: payload.employeeId,
      evaluatorId: payload.evaluatorId,
      type: payload.type,
      period: payload.period,
      comment: payload.comment,
      generalScore: 0,
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

    console.log("🤖 Résultat IA :", aiResult);
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

    // // ✅ 7. Enregistrer les recommandations (si disponibles)
    // if (aiResult.recommendations.length > 0) {
    //   await AiAnalysis.create({
    //     evaluationId: evaluation.id,
    //     type: "training_recommendation",
    //     result: "generated",
    //     details: aiResult.recommendations,
    //   })
    // }

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
