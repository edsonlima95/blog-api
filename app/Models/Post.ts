import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import User from './User'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public image?: string

  @column()
  public user_id: number

  @column()
  public category_id: number

  @column()
  public status: boolean

  @belongsTo(() => Category, {
    foreignKey: 'category_id'
  })
  public category: BelongsTo<typeof Category>

  @belongsTo(() => User, {
    foreignKey: 'user_id'
  })
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
