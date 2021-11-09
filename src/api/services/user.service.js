import { UserModel } from '../models'

const UserService = () => {
  const createUser = async (user) => await UserModel.create(user)
  const updateUser = async (query, data) => await UserModel.updateOne(query, data)
  const findUser = async (query) => await UserModel.findOne(query)

  return {
    createUser,
    updateUser,
    findUser
  }
}

export default UserService
