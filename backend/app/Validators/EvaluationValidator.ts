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
}
