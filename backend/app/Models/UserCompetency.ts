import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Evaluation from "./Evaluation";
import CompetencyTemplate from "./CompetencyTemplate";

export default class UserCompetency extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public evaluationId: number;

  @column()
  public competencyId: number;

  @column()
  public score: number;

  @column()
  public comment?: string;

  @column()
  public evaluatorType: "auto" | "manager" | "final";

  @belongsTo(() => Evaluation)
  public evaluation: BelongsTo<typeof Evaluation>;

  @belongsTo(() => CompetencyTemplate, {
    foreignKey: "competencyId",
  })
  public competency: BelongsTo<typeof CompetencyTemplate>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
