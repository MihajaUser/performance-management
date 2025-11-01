import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class PerformanceScoreValidator {
  public static list = schema.create({
    page: schema.number.optional([rules.unsigned()]),
    limit: schema.number.optional([rules.range(1, 100)]),
    order: schema.enum.optional(["asc", "desc"] as const),
    userId: schema.number.optional([
      rules.exists({ table: "users", column: "id" }),
    ]),
    period: schema.string.optional({}, [rules.trim()]),
  });

  public static create = schema.create({
    userId: schema.number([rules.exists({ table: "users", column: "id" })]),
    period: schema.string({}, [rules.trim()]),
    scoreAuto: schema.number.optional([rules.range(0, 100)]),
    scoreManager: schema.number.optional([rules.range(0, 100)]),
    scoreFinal: schema.number.optional([rules.range(0, 100)]),
    predictedScore: schema.number.optional([rules.range(0, 100)]),
  });

  public static update = schema.create({
    scoreAuto: schema.number.optional([rules.range(0, 100)]),
    scoreManager: schema.number.optional([rules.range(0, 100)]),
    scoreFinal: schema.number.optional([rules.range(0, 100)]),
    predictedScore: schema.number.optional([rules.range(0, 100)]),
  });
}
