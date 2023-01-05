import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostValidator {

  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    title: schema.string(),
    content: schema.string(),
    image: schema.file.optional({
      size: '1mb',
      extnames: ["jpg", "png", "jpeg"]
    }),
    user_id: schema.number(),
    category_id: schema.number(),
    status: schema.boolean.optional(),
    // image: schema.string.optional()
  })


  public messages: CustomMessages = {
    'title.required': "O campo titulo é obrigatório",
    'content.required': "O campo conteudo é obrigatório",
    'user_id.required': "O campo usuario é obrigatório",
    'category_id.required': "O campo categoria é obrigatório",

    "image.requiredWhen": "A imagem é obrigatória",
    "image.size": "Tamanho máximo do arquivo é de {{options.size}}",
    "image.extname": "Apenas os formatos {{options.extnames}} são válidos"
  }
}
