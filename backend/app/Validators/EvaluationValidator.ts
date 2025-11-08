import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class EvaluationValidator {
  public static list = schema.create({
    page: schema.number.optional([rules.unsigned()]),
    limit: schema.number.optional([rules.range(1, 100)]),
    order: schema.enum.optional(["asc", "desc"] as const),
    period: schema.string.optional({}, [rules.trim()]),
    type: schema.enum.optional([
      "auto",
      "manager",
      "peer",
      "hr_review",
    ] as const),
  });

  public static create = schema.create({
    employee_id: schema.number([
      rules.exists({ table: "users", column: "id" }),
    ]),
    evaluator_id: schema.number([
      rules.exists({ table: "users", column: "id" }),
    ]),
    type: schema.enum(["auto", "manager", "peer", "hr_review"] as const),
    period: schema.string({}, [rules.trim()]),
    general_score: schema.number([rules.range(0, 100)]),
    comment: schema.string.optional({}, [rules.trim()]),
    sentiment: schema.enum.optional([
      "positive",
      "neutral",
      "negative",
    ] as const),
  });

  public static update = schema.create({
    general_score: schema.number.optional([rules.range(0, 100)]),
    comment: schema.string.optional({}, [rules.trim()]),
    sentiment: schema.enum.optional([
      "positive",
      "neutral",
      "negative",
    ] as const),
  });

  public static remove = schema.create({
    id: schema.number([rules.exists({ table: "evaluations", column: "id" })]),
  });

  public static storeFull = schema.create({
    employeeId: schema.number([rules.exists({ table: 'users', column: 'id' })]),
    evaluatorId: schema.number([rules.exists({ table: 'users', column: 'id' })]),
    type: schema.enum(['auto', 'manager', 'peer', 'hr_review'] as const),
    period: schema.string({}, [rules.trim()]),
    comment: schema.string.optional({}, [rules.trim()]),

    kpis: schema.array.optional().members(
      schema.object().members({
        id: schema.number([rules.exists({ table: 'user_kpis', column: 'id' })]),
        name: schema.string({}, [rules.trim()]),
        score: schema.number([rules.range(0, 100)]),
        comment: schema.string.optional({}, [rules.trim()]),
      })
    ),


    competencies: schema.array.optional().members(
      schema.object().members({
        competencyId: schema.number([rules.exists({ table: 'competency_templates', column: 'id' })]),
        score: schema.number([rules.range(0, 5)]),
        comment: schema.string.optional({}, [rules.trim()]),
      })
    ),
  })
}
