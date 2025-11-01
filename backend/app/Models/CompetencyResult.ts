import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Evaluation from "./Evaluation";
import CompetencyCategory from "./CompetencyCategory";

export default class CompetencyResult extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public evaluationId: number;

  @column()
  public categoryId: number;

  @column()
  public averageScore: number;

  @column()
  public commentSummary?: string;

  @belongsTo(() => Evaluation)
  public evaluation: BelongsTo<typeof Evaluation>;

  @belongsTo(() => CompetencyCategory, { foreignKey: "categoryId" })
  public category: BelongsTo<typeof CompetencyCategory>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
