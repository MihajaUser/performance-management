import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany, HasMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import UserRole from './UserRole'
import Privilege from './Privilege'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string // ex: 'manager'

  @column()
  public label: string // ex: 'Manager'

  @column()
  public description?: string

  @column()
  public isSystem: boolean

  @hasMany(() => UserRole)
  public userRoles: HasMany<typeof UserRole>

  @manyToMany(() => Privilege, {
    pivotTable: 'role_privileges',
  })
  public privileges: ManyToMany<typeof Privilege>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
