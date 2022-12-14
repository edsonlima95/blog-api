import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {

  constructor(protected ctx: HttpContextContract) { }

  public refs = schema.refs({
    id: this.ctx.params.id ? parseInt(this.ctx.params.id) : null, //Recebe o id da requisição.
    email: this.ctx.request.input('email'),
  })

  public schema = schema.create({
    name: schema.string(),
    email: schema.string([
      rules.email(),
      rules.unique({
        table: 'users', column: 'email', whereNot: {
          id: this.refs.id,
        }, where: {
          email: this.refs.email
        }
      }),
      /** 
       * null - significa que esta criando um novo, então o email será obrigatório
       * caso exista - significa que está editando, então não será obrigatório.
      */
      rules.requiredWhen("email", "=", null)
    ]),
    password: schema.string.optional([
      rules.minLength(4),
      rules.requiredWhen("id", "!=", this.refs.id)
    ]),
    admin: schema.boolean.optional()
  })


  public messages: CustomMessages = {
    //NAME
    'name.required': "O campo nome é obrigatório",

    //EMAIL
    'email.requiredWhen': "O campo email é obrigatório",
    'email.email': "O email não tem um formato válido",
    'email.unique': "O email já existe, por favor insira um email diferente",

    //PASSWORD
    'password.requiredWhen': "A senha é obrigatório",
    'password.minLength': "A senha deve contar no minimo 4 caracteres",
  }
}
