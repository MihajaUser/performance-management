import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, hasMany, ManyToMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import UserPrivilege from './UserPrivilege'

export default class Privilege extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string // ex: 'create_evaluation'

  @column()
  public category?: string // ex: 'evaluations'

  @column()
  public description?: string

  @manyToMany(() => Role, {
    pivotTable: 'role_privileges',
  })
  public roles: ManyToMany<typeof Role>

  @hasMany(() => UserPrivilege)
  public userPrivileges: HasMany<typeof UserPrivilege>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
