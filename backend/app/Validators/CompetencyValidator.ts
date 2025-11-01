import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class CompetencyValidator {
  public static list = schema.create({
    page: schema.number.optional([rules.unsigned()]),
    limit: schema.number.optional([rules.range(1, 100)]),
    order: schema.enum.optional(["asc", "desc"] as const),
    categoryId: schema.number.optional([
      rules.exists({ table: "competency_categories", column: "id" }),
    ]),
    jobTitleId: schema.number.optional([
      rules.exists({ table: "job_titles", column: "id" }),
    ]),
    search: schema.string.optional({}, [rules.trim()]),
  });

  public static create = schema.create({
    evaluationId: schema.number([
      rules.exists({ table: "evaluations", column: "id" }),
    ]),
    categoryId: schema.number([
      rules.exists({ table: "competency_categories", column: "id" }),
    ]),
    averageScore: schema.number([rules.range(0, 5)]),
    commentSummary: schema.string.optional({}, [rules.trim()]),
  });

  public static update = schema.create({
    averageScore: schema.number.optional([rules.range(0, 5)]),
    commentSummary: schema.string.optional({}, [rules.trim()]),
  });
}
