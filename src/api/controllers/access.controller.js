import { AuthService } from '../services'

const AccessController = ({ router, firebase }) => {
  const authService = AuthService()

  router.post('/user/sign-up', async (request, response) => {
    const { email, password } = request.body

    try {
      const user = await authService.createUser(firebase, email, password)
      const token = await authService.createToken(firebase, user.uid)

      return response.send({ access_token: token, token_type: 'bearer' })
    } catch (error) {
      return response.status(500).send({ code: -1, message: 'Couldn´t create the user' })
    }
  })

  return router
}

export default AccessController
