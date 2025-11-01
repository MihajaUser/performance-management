import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import EmployeeValidator from "App/Validators/EmployeeValidator";

export default class EmployeeController {
  public async index({ request }: HttpContextContract) {
    const payload = await request.validate({ schema: EmployeeValidator.list });

    const page = payload.page ?? 1;
    const limit = payload.limit ?? 10;
    const order = payload.order ?? "asc";

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

    const employees = await query
      .orderBy("firstname", order)
      .paginate(page, limit);
    return employees;
  }

  public async show({ params, response }: HttpContextContract) {
    const employee = await User.query()
      .where("id", params.id)
      .preload("department")
      .preload("jobTitle")
      .preload("evaluationsReceived", (evalQuery) =>
        evalQuery.preload("analyses")
      )
      .preload("userKpis", (kpiQuery) => kpiQuery.preload("kpiTemplate"))
      .preload("performanceScores")
      .first();

    if (!employee) return response.notFound({ message: "Employé non trouvé" });

    return employee;
  }
}
