import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Department from "./Department";
import JobTitle from "./JobTitle";
import UserKpi from "./UserKpi";
import Evaluation from "./Evaluation";
import PerformanceScore from "./PerformanceScore";
import Alert from "./Alert";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public firstname: string;

  @column()
  public lastname: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public departmentId: number;

  @column()
  public jobTitleId: number;

  @column()
  public status: "active" | "inactive" | "on_leave" | "terminated";

  @column.date()
  public dateHired?: DateTime;

  @belongsTo(() => Department)
  public department: BelongsTo<typeof Department>;

  @belongsTo(() => JobTitle)
  public jobTitle: BelongsTo<typeof JobTitle>;

  @hasMany(() => UserKpi)
  public userKpis: HasMany<typeof UserKpi>;

  @hasMany(() => Evaluation, { foreignKey: "employeeId" })
  public evaluationsReceived: HasMany<typeof Evaluation>;

  @hasMany(() => Evaluation, { foreignKey: "evaluatorId" })
  public evaluationsGiven: HasMany<typeof Evaluation>;

  @hasMany(() => PerformanceScore)
  public performanceScores: HasMany<typeof PerformanceScore>;

  @hasMany(() => Alert)
  public alerts: HasMany<typeof Alert>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
