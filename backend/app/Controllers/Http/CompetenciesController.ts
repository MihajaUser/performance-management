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

  public async byUser({ params, request, response }: HttpContextContract) {
    const employeeId = params.id

    // ✅ Validation du paramètre optionnel evaluationId
    const payload = await request.validate({
      schema: CompetencyValidator.byUser,
    })
    const evaluationId = payload.evaluationId

    /** --- Résumé global --- */
    const summariesQuery = CompetencyResult.query()
      .whereHas("evaluation", (q) => q.where("employee_id", employeeId))
      .preload("category")
      .orderBy("category_id", "asc")

    if (evaluationId) summariesQuery.andWhere("evaluation_id", evaluationId)
    const summaries = await summariesQuery

    /** --- Détails individuels --- */
    const detailsQuery = UserCompetency.query()
      .whereHas("evaluation", (q) => q.where("employee_id", employeeId))
      .preload("evaluation", (q) =>
        q
          .preload("employee", (e) =>
            e.preload("department").preload("jobTitle")
          )
          .preload("evaluator") // ✅ affichage de l’évaluateur
      )
      .preload("competency", (q) => q.preload("category"))
      .orderBy("competency_id", "asc")

    if (evaluationId) detailsQuery.andWhere("evaluation_id", evaluationId)
    const details = await detailsQuery

    /** --- Ajout du niveau requis --- */
    for (const d of details) {
      const assignment = await CompetencyAssignment.query()
        .where("competency_id", d.competencyId)
        .andWhere("department_id", d.evaluation.employee.departmentId)
        .andWhere("job_title_id", d.evaluation.employee.jobTitleId)
        .first()

      d["requiredLevel"] = assignment?.requiredLevel ?? null
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
        evaluator: d.evaluation.evaluator
          ? `${d.evaluation.evaluator.firstname} ${d.evaluation.evaluator.lastname}`
          : null,
        evaluationId: d.evaluationId,
      })),
    })
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
