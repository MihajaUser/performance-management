import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CompetencyAssignment from "App/Models/CompetencyAssignment";
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
      .whereHas("evaluation", (q) => q.where("employee_id", params.id))
      .preload("evaluation", (q) => q.preload("employee").preload("evaluator"))
      .preload("category");

    if (results.length === 0) {
      return response.notFound({
        message: "Aucune compétence trouvée pour cet employé.",
      });
    }

    const employee = results[0].evaluation.employee;

    // on récupère TOUTES les assignations du poste + département,
    // avec le template (pour avoir name + categoryId)
    const assignments = await CompetencyAssignment.query()
      .where("department_id", employee.departmentId)
      .where("job_title_id", employee.jobTitleId)
      .preload("competency", (c) => c.preload("category"));

    // groupées par category_id pour match direct avec CompetencyResult.categoryId
    const assignmentsByCategory = assignments.reduce<
      Record<
        number,
        { id: number; name: string; requiredLevel: "N" | "I" | "M" | "E" }[]
      >
    >((acc, a) => {
      const catId = a.competency.categoryId;
      (acc[catId] ||= []).push({
        id: a.competencyId,
        name: a.competency.name,
        requiredLevel: a.requiredLevel as "N" | "I" | "M" | "E",
      });
      return acc;
    }, {});

    // enrichit chaque résultat avec la liste des compétences requises (nom + niveau)
    const enriched = results.map((r) => ({
      id: r.id,
      categoryId: r.categoryId,
      category: r.category.name,
      averageScore: r.averageScore,
      commentSummary: r.commentSummary,
      // liste des templates de la catégorie + leur niveau requis
      required: assignmentsByCategory[r.categoryId] ?? [],
      // on garde la traçabilité complète
      evaluation: r.evaluation,
    }));

    return enriched;
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
