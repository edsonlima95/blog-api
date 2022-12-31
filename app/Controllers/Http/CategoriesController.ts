import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CategoryValidator from 'App/Validators/CategoryValidator'

export default class CategoriesController {


  public async index({ request, response }: HttpContextContract) {

    const { page, per_page } = request.qs()

    const current_page = page ? page : 1
    const limit_per_page = per_page ? per_page : 100

    const categories = await Category.query().paginate(current_page, limit_per_page)

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
      return response.json({ message: "Categoria deletada com sucesso" })

    } catch {

      return response.notFound({ error: "Categoria não encontrada" })

    }

  }
}
