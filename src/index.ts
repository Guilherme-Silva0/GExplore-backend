import { AuthenticateUserController } from './adapters/user/AuthenticateUserController'
import { RegisterUserController } from './adapters/user/RegisterUserController'
import { AuthenticateUser } from './core/user/service/AuthenticateUser'
import { RegisterUser } from './core/user/service/RegisterUser'
import { UserRepositoryPrisma } from './external/prisma/UserRepositoryPrisma'
import { app } from './external/web/config'
// const UserRepositoryMemory = new UserRepositoryMemory()
const userRepositoryPrisma = new UserRepositoryPrisma()

const registerUser = new RegisterUser(userRepositoryPrisma)
new RegisterUserController(app, registerUser)

const authenticateUser = new AuthenticateUser(userRepositoryPrisma)
new AuthenticateUserController(app, authenticateUser)
