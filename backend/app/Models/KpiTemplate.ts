import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Department from './Department'
import JobTitle from './JobTitle'
import UserKpi from './UserKpi'

export default class KpiTemplate extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public departmentId: number

  @column()
  public jobTitleId: number

  @column()
  public name: string

  @column()
  public description?: string

  @column()
  public unit: string

  @column()
  public weight: number

  @column()
  public isActive: boolean

  @belongsTo(() => Department)
  public department: BelongsTo<typeof Department>

  @belongsTo(() => JobTitle)
  public jobTitle: BelongsTo<typeof JobTitle>

  @hasMany(() => UserKpi)
  public userKpis: HasMany<typeof UserKpi>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
