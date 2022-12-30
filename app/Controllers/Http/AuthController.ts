import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'
import SignUpValidator from 'App/Validators/SignUpValidator'

export default class AuthController {

    public async signIn({ request, response, auth }: HttpContextContract) {

        const data = await request.validate(LoginValidator)

        try {

            const res = await auth.use('api').attempt(data?.email, data?.password, {
                expiresIn: '1days'
            })

            return {
                user: {
                    id: auth.user?.id,
                    name: auth.user?.name,
                    email: auth.user?.email
                },
                token: res.token,
            }

        } catch {
            return response.unauthorized({ message: "Email ou senha incorretos"})
        }

    }

    public async signUp({ request, response }: HttpContextContract) {

        const data = await request.validate(SignUpValidator)

        const user = await User.create(data)

        await user.related('profile').create({})

        return response.json({ message: "Usuário cadastrado com sucesso" })

    }

    public async checkToken({ response, auth }) {

        try {

            await auth.use('api').authenticate()
            return auth.use('api').isAuthenticated

        } catch {
            return response.unauthorized({ error: 'token inválido' })
        }
    }

}
