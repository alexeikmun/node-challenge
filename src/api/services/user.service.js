import { UserModel } from '../models'

const UserService = () => {
  const createUser = async (user) => await UserModel.create(user)
  const findUser = async (query) => await UserModel.findOne(query)

  return {
    createUser,
    findUser
  }
}

export default UserService
