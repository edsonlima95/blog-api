import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    
    name: schema.string(),
    description: schema.string.optional()

  })

  
  public messages: CustomMessages = {

    'name.required': "O campo nome é obrigatório",
  }
}
