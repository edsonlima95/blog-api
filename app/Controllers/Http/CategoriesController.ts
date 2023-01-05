import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CategoryValidator from 'App/Validators/CategoryValidator'

export default class CategoriesController {


  public async index({ response }: HttpContextContract) {

    const categories = await Category.query()
      .preload('posts')
      .orderBy('id', 'desc')


    return response.json(categories)

  }

  public async store({ request, response }: HttpContextContract) {

    const data = await request.validate(CategoryValidator)

    await Category.create(data)

    return response.json({ message: "Categoria cadastrada com sucesso" })

  }

  public async show({ params, response }: HttpContextContract) {

    try {

      const category = await Category.findOrFail(params.id)
      return response.json(category)

    } catch {

      return response.notFound({ error: "Categoria não encontrada" })

    }



  }

  public async update({ params, response, request }: HttpContextContract) {

    try {

      const category = await Category.findOrFail(params.id)

      const data = await request.validate(CategoryValidator)

      await category.merge(data).save()



      return response.json({ message: "Categoria atualizada com sucesso" })

    } catch {

      return response.notFound({ error: "Categoria não encontrada" })

    }


  }

  public async destroy({ params, response }: HttpContextContract) {
    try {

      const category = await Category.findOrFail(params.id)

      await category.delete()

      const categories = await Category.query().orderBy('id', 'desc')

      return response.json({ categories, message: "Categoria deletada com sucesso" })

    } catch {

      return response.notFound({ error: "Categoria não encontrada" })

    }

  }
}
