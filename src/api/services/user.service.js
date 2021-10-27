import { UserModel } from '../models'

const UserService = () => {
  const createUser = async (user) => await UserModel.create(user)

  return {
    createUser
  }
}

export default UserService
