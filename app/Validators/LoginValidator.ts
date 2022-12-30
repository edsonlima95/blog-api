import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {

  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({

    email: schema.string([
      rules.email()
    ]),

    password: schema.string([
      rules.minLength(4)
    ])
  })

  public messages: CustomMessages = {
    'email.required': "O email é obrigatório",
    'email.email': "O email não é válido",

    'password.required': "A senha é obrigatório",
    'password.minLength': "A senha deve contar no minimo 4 caracteres"
  }
}
