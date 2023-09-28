import { User } from '../../core/user/model/User'
import { UserRepository } from '../../core/user/service/UserRepository'

export class UserRepositoryMemory implements UserRepository {
  private readonly users: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null
  }

  async save(user: User): Promise<User> {
    const newUser = { ...user, id: Math.random().toString() }
    this.users.push(newUser)
    return newUser
  }
}
