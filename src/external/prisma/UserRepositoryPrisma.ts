import { PrismaClient } from '@prisma/client'
import { User } from '../../core/user/model/User'
import { UserRepository } from '../../core/user/service/UserRepository'

export class UserRepositoryPrisma implements UserRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  save(user: User): Promise<User> {
    const newUser = this.prisma.user.create({
      data: user,
    })
    return newUser
  }
}
