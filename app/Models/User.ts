import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasOne, HasOne, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'
import Post from './Post'

export default class User extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public image?: string

  @hasOne(() => Profile, {
    foreignKey: 'user_id'
  })
  public profile: HasOne<typeof Profile>

  @hasMany(() => Post,  {
    foreignKey: 'user_id'
  })
  public posts: HasMany<typeof Post>

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
