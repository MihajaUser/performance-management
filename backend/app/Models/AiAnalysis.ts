import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Evaluation from './Evaluation'

export default class AiAnalysis extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public evaluationId: number

  @column()
  public type: 'sentiment' | 'prediction'

  @column()
  public result: string

  @column()
  public details: any

  @belongsTo(() => Evaluation)
  public evaluation: BelongsTo<typeof Evaluation>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
