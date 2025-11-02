import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import CompetencyTemplate from "./CompetencyTemplate";
import Department from "./Department";
import JobTitle from "./JobTitle";

export default class CompetencyAssignment extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public competencyId: number;

  @column()
  public departmentId: number;

  @column()
  public jobTitleId: number;

  @column()
  public requiredLevel: "N" | "I" | "M" | "E";

  @belongsTo(() => CompetencyTemplate, { foreignKey: "competencyId" })
  public competency: BelongsTo<typeof CompetencyTemplate>;

  @belongsTo(() => Department)
  public department: BelongsTo<typeof Department>;

  @belongsTo(() => JobTitle)
  public jobTitle: BelongsTo<typeof JobTitle>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
