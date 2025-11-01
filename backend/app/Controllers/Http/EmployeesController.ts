import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import EmployeeListValidator from "App/Validators/EmployeeListValidator";

export default class EmployeeController {
  /**
   * 🧾 Liste de tous les employés
   * Filtres : département, statut, recherche
   */
  public async index({ request }: HttpContextContract) {
    const payload = await request.validate(EmployeeListValidator);

    const query = User.query()
      .preload("department")
      .preload("jobTitle")
      .whereNot("status", "inactive");

    if (payload.departmentId)
      query.where("department_id", payload.departmentId);
    if (payload.status) query.where("status", payload.status);
    if (payload.search) {
      query.where((builder) => {
        builder
          .whereILike("firstname", `%${payload.search}%`)
          .orWhereILike("lastname", `%${payload.search}%`)
          .orWhereILike("email", `%${payload.search}%`);
      });
    }

    const employees = await query.orderBy("firstname", "asc");
    return employees;
  }

  /**
   * 👤 Détails d’un employé (fiche profil)
   * Inclut infos, département, poste
   */
  public async show({ params, response }: HttpContextContract) {
    const employee = await User.query()
      .where("id", params.id)
      .preload("department")
      .preload("jobTitle")
      .first();

    if (!employee) return response.notFound({ message: "Employé non trouvé" });

    return employee;
  }

  /**
   * 📊 Évaluations reçues par un employé
   * Autoévaluations + évaluations de manager
   */
  public async evaluationsReceived({ params, response }: HttpContextContract) {
    const employee = await User.query()
      .where("id", params.id)
      .preload("evaluationsReceived", (evalQuery) =>
        evalQuery.preload("analyses")
      )
      .first();

    if (!employee) return response.notFound({ message: "Employé non trouvé" });

    return employee.evaluationsReceived;
  }

  /**
   * 🧠 Évaluations données par un employé (cas manager/RH)
   */
  public async evaluationsGiven({ params, response }: HttpContextContract) {
    const evaluator = await User.query()
      .where("id", params.id)
      .preload("evaluationsGiven", (evalQuery) => evalQuery.preload("analyses"))
      .first();

    if (!evaluator)
      return response.notFound({ message: "Évaluateur non trouvé" });

    return evaluator.evaluationsGiven;
  }
}
