import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Evaluation from "App/Models/Evaluation";
import AiAnalysis from "App/Models/AiAnalysis";

export default class EvaluationController {
  /**
   * 📋 Liste de toutes les évaluations
   * GET /evaluations
   * (Filtrable plus tard par type, période, employé)
   */
  public async index() {
    const evaluations = await Evaluation.query()
      .preload("employee", (q) => q.preload("department").preload("jobTitle"))
      .preload("evaluator")
      .preload("analyses")
      .orderBy("created_at", "desc");

    return evaluations;
  }

  /**
   * 👁️ Détails d'une évaluation précise
   * GET /evaluations/:id
   */
  public async show({ params, response }: HttpContextContract) {
    const evaluation = await Evaluation.query()
      .where("id", params.id)
      .preload("employee", (q) => q.preload("department").preload("jobTitle"))
      .preload("evaluator")
      .preload("analyses")
      .first();

    if (!evaluation) {
      return response.notFound({ message: "Évaluation non trouvée" });
    }

    return evaluation;
  }

  /**
   * ➕ Créer une nouvelle évaluation (auto ou manager)
   * POST /evaluations
   */
  public async store({ request }: HttpContextContract) {
    const data = request.only([
      "employee_id",
      "evaluator_id",
      "type",
      "period",
      "general_score",
      "comment",
      "sentiment",
    ]);

    const evaluation = await Evaluation.create(data);

    // 🔹 Création automatique d'une analyse IA si le commentaire existe
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

  /**
   * ✏️ Modifier une évaluation existante
   * PUT /evaluations/:id
   */
  public async update({ params, request, response }: HttpContextContract) {
    const evaluation = await Evaluation.find(params.id);
    if (!evaluation) {
      return response.notFound({ message: "Évaluation introuvable" });
    }

    const data = request.only(["general_score", "comment", "sentiment"]);
    evaluation.merge(data);
    await evaluation.save();

    return evaluation;
  }

  /**
   * ❌ Supprimer une évaluation
   * DELETE /evaluations/:id
   */
  public async destroy({ params, response }: HttpContextContract) {
    const evaluation = await Evaluation.find(params.id);
    if (!evaluation) {
      return response.notFound({ message: "Évaluation introuvable" });
    }

    await evaluation.delete();
    return { message: "Évaluation supprimée avec succès" };
  }
}
