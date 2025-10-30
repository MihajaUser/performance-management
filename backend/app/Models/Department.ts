import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import JobTitle from './JobTitle'
import User from './User'
import KpiTemplate from './KpiTemplate'

export default class Department extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description?: string

  @hasMany(() => JobTitle)
  public jobTitles: HasMany<typeof JobTitle>

  @hasMany(() => User)
  public users: HasMany<typeof User>

  @hasMany(() => KpiTemplate)
  public kpis: HasMany<typeof KpiTemplate>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
