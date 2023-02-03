import { getUser } from '../database/users'

const UserController = ({ router }) => {
  router.get('/user', (request, response) => response.send(getUser()))

  return router
}

export default UserController
