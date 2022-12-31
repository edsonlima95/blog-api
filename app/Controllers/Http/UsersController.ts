import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'
import { schema } from '@ioc:Adonis/Core/Validator'
import Drive from '@ioc:Adonis/Core/Drive'

export default class UsersController {


  public async index({ request, response }: HttpContextContract) {

    const { page, per_page } = request.qs()

    const current_page = page ? page : 1
    const limit_per_page = per_page ? per_page : 100

    const users = await User.query()
      .select('id', 'name', 'email', 'image')
      .orderBy("id", "desc")
      .preload('profile')
      .paginate(current_page, limit_per_page)

    return response.json(users)

  }

  public async show({ params, response }: HttpContextContract) {

    const user = await User.query()
      .select('id', 'name', 'email', 'image')
      .where('id', '=', params.id)
      .orderBy("id", "desc")
      .preload('profile')
      .first()

    return response.json(user)

  }

  public async update({ request, response, params }: HttpContextContract) {

    const user = await User.findOrFail(params.id)

    const data = await request.validate(UserValidator)

    await user?.merge({
      name: data.name,
      email: data.email,
      password: data.password ? data.password : user.password,
    }).save()

    await user.load("profile")

    user.profile.admin = data.admin as boolean

    await user.related('profile').save(user.profile)

    return response.json({ message: "Usuário atualizado com sucesso" })

  }

  public async destroy({ response, params }: HttpContextContract) {

    const user = await User.findOrFail(params.id)

    if (!user) {
      return response.notFound({ error: "Usuário não foi encontrado!" })
    }

    if (user.image) {
      Drive.delete(`/user/${user.image}`)
    }

    await user.delete()

    return response.json({ message: "Usuário deletado com sucesso" })

  }

  public async image({ request, response, params }: HttpContextContract) {

    const user = await User.find(params.id)

    if (!user) {
      return response.notFound({ error: "Usuário não pode ser encontrado" })
    }

    //DEFINE AS REGRAS DE VALIDAÇÃO
    const avatarSchema = schema.create({
      file: schema.file.optional({
        size: '1mb',
        extnames: ['jpg', 'gif', 'png', 'jpeg', 'JPG', 'GIF', 'PNG', 'PNG', 'JPEG'],
      }),
    },)

    //USA AS REGRAS E COSTUMIZA AS MENSAGEM.
    const payload = await request.validate({
      schema: avatarSchema, messages: {
        "file.size": "Tamanho máximo do arquivo é de {{options.size}}",
        "file.extname": "Apenas os formatos {{options.extnames}} são válidos",
      }
    })

    //Verifica se existe uma imgam e remove.
    if (user.image) {
      Drive.delete(`./user/${user.image}`)
    }

    await payload.file?.moveToDisk('./user')

    const image = payload.file?.fileName

    await user.merge({ image }).save()

  }

  public async showImage({ params, response }) {

    const image = await Drive.getStream(`/user/${params.image}`)

    return response.stream(image);
  }
}
