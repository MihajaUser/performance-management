import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import CompetencyCategory from './CompetencyCategory'
import CompetencyAssignment from './CompetencyAssignment'
import UserCompetency from './UserCompetency'

export default class CompetencyTemplate extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description?: string

  @column()
  public categoryId: number

  @belongsTo(() => CompetencyCategory)
  public category: BelongsTo<typeof CompetencyCategory>

  @hasMany(() => CompetencyAssignment)
  public assignments: HasMany<typeof CompetencyAssignment>

  @hasMany(() => UserCompetency)
  public userCompetencies: HasMany<typeof UserCompetency>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
