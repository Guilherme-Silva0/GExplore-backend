import { ServerType } from '../../external/web/config'
import { RegisterUser } from '../../core/user/service/RegisterUser'
import { User } from '../../core/user/model/User'

export class RegisterUserController {
  constructor(
    private readonly server: ServerType,
    private readonly useCase: RegisterUser,
  ) {
    this.server.post('/auth/register', async ({ body }, reply) => {
      const { name, email, password } = body as User

      const user = await this.useCase.execute({
        name,
        email,
        password,
        image: 'placeholder',
      })

      reply.code(201).send({
        message: 'Usuario cadastrado',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          createdAt: user.createdAt,
          updateAt: user.updatedAt,
        },
      })
    })
  }
}
