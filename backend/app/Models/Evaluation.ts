import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import AiAnalysis from './AiAnalysis'

export default class Evaluation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public employeeId: number

  @column()
  public evaluatorId: number

  @column()
  public type: 'auto' | 'manager' | 'peer' | 'hr_review'

  @column()
  public period: string

  @column()
  public generalScore: number

  @column()
  public comment?: string

  @column()
  public sentiment?: 'positive' | 'neutral' | 'negative'

  @belongsTo(() => User, { foreignKey: 'employeeId' })
  public employee: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'evaluatorId' })
  public evaluator: BelongsTo<typeof User>

  @hasMany(() => AiAnalysis)
  public analyses: HasMany<typeof AiAnalysis>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
