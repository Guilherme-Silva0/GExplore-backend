import { hash } from 'bcrypt'
import { z, ZodError } from 'zod'
import { randomInt } from 'crypto'
import { UseCase } from '../../shared/UseCase'
import { User } from '../model/User'
import { UserRepository } from './UserRepository'

type input = {
  name: string
  email: string
  password: string
  image: string
}

const registerUserSchema = z.object({
  name: z.string().trim().nonempty('Todos os campos são obrigatórios'),
  email: z
    .string()
    .trim()
    .email('Email inválido')
    .nonempty('Todos os campos são obrigatórios'),
  password: z
    .string()
    .trim()
    .nonempty('Todos os campos são obrigatórios')
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .refine((password) => {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!-@#$%^&*()_+=[\]{}|\\,./<>?;:'"`~])/
      return regex.test(password)
    }, 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial'),
  image: z.string().trim().nonempty('Todos os campos são obrigatórios'),
})

type ValidateInputType = z.infer<typeof registerUserSchema>

export class RegisterUser implements UseCase<input, User> {
  constructor(private readonly repository: UserRepository) {}

  private async hashedPassword(password: string): Promise<string> {
    const randomSalt = randomInt(10, 16)
    return await hash(password, randomSalt)
  }

  private async validate(input: input): Promise<ValidateInputType | null> {
    try {
      return await registerUserSchema.parseAsync(input)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(error.issues[0].message)
      }
      return null
    }
  }

  async execute(input: input): Promise<User> {
    const ValidateInput = await this.validate(input)

    if (!ValidateInput) {
      throw new Error('Dados inválidos')
    }

    const { name, email, password, image } = ValidateInput

    const userAlreadyExists = await this.repository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error('Usuario já cadastrado')
    }

    const hashedPassword = await this.hashedPassword(password)

    const user = await this.repository.save({
      name,
      email,
      password: hashedPassword,
      image,
    })

    return user
  }
}
