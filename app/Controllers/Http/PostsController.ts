import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import PostValidator from 'App/Validators/PostValidator'

export default class PostsController {

  public async index({ }: HttpContextContract) {

    const posts = await Post.all()

    return posts

  }

  public async store({ request, response }: HttpContextContract) {

    const data = await request.validate(PostValidator)

    // if (data.image) {
    //   await data.image.moveToDisk("/post")
    // }

    // await Post.create({
    //   ...data,
    //   image: data.image?.fileName
    // })

    return data
    // return response.json({ message: "Post cadastrado com sucesso!" })
  }

  public async show({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
