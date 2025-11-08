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
  public sentiment?: 'positive' | 'neutral' | 'negative' | 'aggressif'


  @column({
    // écrit en DB
    prepare: (value: { title: string; url: string }[] | null | undefined) => {
      return value ? JSON.stringify(value) : null
    },
    // lu depuis la DB
    consume: (value: any) => {
      if (!value) return []
      // pg peut déjà renvoyer objet ou string selon driver
      return typeof value === 'string' ? JSON.parse(value) : value
    },
  })
  public trainingRecommendations?: { title: string; url: string }[]

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
