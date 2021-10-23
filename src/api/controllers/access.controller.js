import { AuthService, UserService } from '../services'

const AccessController = ({ router, firebase }) => {
  const authService = AuthService()
  const userService = UserService()

  router.post('/user/sign-up', async (request, response) => {
    const { email, password, name } = request.body

    try {
      const { uid } = await authService.createUser(firebase, email, password)
      await userService.createUser({ name, email, authId: uid })
      const token = await authService.createToken(firebase, uid)

      return response.send({ access_token: token, token_type: 'bearer' })
    } catch (error) {
      console.log('error -->', error)
      return response.status(500).send({ code: -1, message: 'Couldn´t create the user' })
    }
  })

  return router
}

export default AccessController
