import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Evaluation from "App/Models/Evaluation";
import AiAnalysis from "App/Models/AiAnalysis";
import EvaluationValidator from "App/Validators/EvaluationValidator";

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
}
