import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {

  public async index({ }: HttpContextContract) {



  }

  public async store({ request, response }: HttpContextContract) {

    const payload = await request.validate(UserValidator)

    return response.json(payload)

  }

  public async show({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
