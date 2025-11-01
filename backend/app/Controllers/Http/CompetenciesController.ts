import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CompetencyResult from "App/Models/CompetencyResult";
import CompetencyValidator from "App/Validators/CompetencyValidator";

export default class CompetencyController {
  public async index({ request }: HttpContextContract) {
    const payload = await request.validate({
      schema: CompetencyValidator.list,
    });

    const page = payload.page ?? 1;
    const limit = payload.limit ?? 10;
    const order = payload.order ?? "asc";

    const query = CompetencyResult.query()
      .preload("evaluation", (q) => q.preload("employee").preload("evaluator"))
      .preload("category");

    if (payload.categoryId) query.where("category_id", payload.categoryId);
    if (payload.search) {
      query.whereHas("category", (builder) => {
        builder.whereILike("name", `%${payload.search}%`);
      });
    }

    const results = await query
      .orderBy("created_at", order)
      .paginate(page, limit);
    return results;
  }

  public async byUser({ params, response }: HttpContextContract) {
    const results = await CompetencyResult.query()
      .whereHas("evaluation", (q) => {
        q.where("employee_id", params.id);
      })
      .preload("evaluation", (q) => q.preload("employee").preload("evaluator"))
      .preload("category");

    if (results.length === 0) {
      return response.notFound({
        message: "Aucune compétence trouvée pour cet employé.",
      });
    }

    return results;
  }

  /**
   * ➕ Ajouter une évaluation de compétence
   * POST /competencies
   */
  public async store({ request }: HttpContextContract) {
    const payload = await request.validate({
      schema: CompetencyValidator.create,
    });
    const result = await CompetencyResult.create(payload);
    return result;
  }

  /**
   * ✏️ Mettre à jour une compétence évaluée
   * PUT /competencies/:id
   */
  public async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: CompetencyValidator.update,
    });
    const result = await CompetencyResult.find(params.id);

    if (!result) return response.notFound({ message: "Résultat introuvable" });

    result.merge(payload);
    await result.save();
    return result;
  }
}
