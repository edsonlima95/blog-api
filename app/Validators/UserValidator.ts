import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) { }


  public schema = schema.create({
    name: schema.string(),
    email: schema.string([
      rules.email()
    ]),
    password: schema.string([
      rules.minLength(4)
    ])
  })


  public messages: CustomMessages = {

    'name.required':"O campo nome é obrigatório"

  }
}
