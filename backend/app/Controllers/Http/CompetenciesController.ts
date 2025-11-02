import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CompetencyAssignment from "App/Models/CompetencyAssignment";
import CompetencyResult from "App/Models/CompetencyResult";
import UserCompetency from "App/Models/UserCompetency";
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
    const employeeId = params.id;

    /** --- Résumé global (déjà existant) --- */
    const summaries = await CompetencyResult.query()
      .whereHas("evaluation", (q) => q.where("employee_id", employeeId))
      .preload("category")
      .orderBy("category_id", "asc");

    /** --- Détails individuels --- */
    const details = await UserCompetency.query()
      .whereHas("evaluation", (q) => q.where("employee_id", employeeId))
      .preload("evaluation", (q) =>
        q
          .preload("employee") // ✅ pour accéder à departmentId et jobTitleId
          .preload("evaluator")
      )
      .preload(
        "competency",
        (q) => q.preload("category") // ✅ pour la catégorie
      )
      .orderBy("competency_id", "asc");

    /** --- Ajout du niveau requis depuis competency_assignments --- */
    for (const d of details) {
      const assignment = await CompetencyAssignment.query()
        .where("competency_id", d.competencyId)
        .andWhere("department_id", d.evaluation.employee.departmentId)
        .andWhere("job_title_id", d.evaluation.employee.jobTitleId)
        .first();

      d["requiredLevel"] = assignment?.requiredLevel ?? null;
    }

    /** --- Format de réponse --- */
    return response.ok({
      summary: summaries.map((s) => ({
        id: s.id,
        category: s.category.name,
        averageScore: s.averageScore,
        commentSummary: s.commentSummary,
      })),
      details: details.map((d) => ({
        id: d.id,
        competency: d.competency.name,
        category: d.competency.category.name,
        score: d.score,
        comment: d.comment,
        evaluatorType: d.evaluatorType,
        requiredLevel: d["requiredLevel"],
      })),
    });
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
