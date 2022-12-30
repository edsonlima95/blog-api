import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SignUpValidator {

  constructor(protected ctx: HttpContextContract) { }

  public refs = schema.refs({
    email: this.ctx.request.input('email'),
  })

  public schema = schema.create({
    name: schema.string(),
    email: schema.string([
      rules.email(),
      rules.unique({
        table: 'users', column: 'email',
        where: {
          email: this.refs.email
        }
      })
    ]),
    password: schema.string([
      rules.minLength(4)
    ])
  })


  public messages: CustomMessages = {
    //NAME
    'name.required': "O campo nome é obrigatório",

    //EMAIL
    'email.required': "O campo email é obrigatório",
    'email.email': "O email não tem um formato válido",
    'email.unique': "O email já existe, por favor insira um email diferente",

    //PASSWORD
    'password.required': "A senha é obrigatório",
    'password.minLength': "A senha deve contar no minimo 4 caracteres",
  }
}
