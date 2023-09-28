import { User } from '../model/User'

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>
  save(user: User): Promise<User>
}
