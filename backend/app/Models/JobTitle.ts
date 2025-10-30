import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Department from './Department'
import User from './User'
import KpiTemplate from './KpiTemplate'

export default class JobTitle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public departmentId: number

  @column()
  public name: string

  @column()
  public description?: string

  @column()
  public isActive: boolean

  @belongsTo(() => Department)
  public department: BelongsTo<typeof Department>

  @hasMany(() => User)
  public users: HasMany<typeof User>

  @hasMany(() => KpiTemplate)
  public kpis: HasMany<typeof KpiTemplate>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
