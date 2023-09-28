import { RegisterUserController } from './adapters/user/RegisterUserController'
import { RegisterUser } from './core/user/service/RegisterUser'
import { UserRepositoryPrisma } from './external/prisma/UserRepositoryPrisma'
import { app } from './external/web/config'
// const UserRepositoryMemory = new UserRepositoryMemory()
const userRepositoryPrisma = new UserRepositoryPrisma()

const registerUser = new RegisterUser(userRepositoryPrisma)
new RegisterUserController(app, registerUser)
