import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Privilege from './Privilege'

export default class UserPrivilege extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public privilegeId: number

  @column()
  public mode: 'grant' | 'revoke'

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Privilege)
  public privilege: BelongsTo<typeof Privilege>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
