import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import KpiTemplate from './KpiTemplate'

export default class UserKpi extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public kpiTemplateId: number

  @column()
  public period: string

  @column()
  public target: number

  @column()
  public actual: number

  @column()
  public score: number

  @column()
  public comment?: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => KpiTemplate)
  public kpiTemplate: BelongsTo<typeof KpiTemplate>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
