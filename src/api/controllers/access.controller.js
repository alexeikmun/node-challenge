import { AuthService } from '../services'

const AccessController = (router, auth) => {
  const authService = AuthService()

  router.post('/user/login', (request, response) => {
    console.log('body -->', request.body)
    const { user, password } = request.body

    return response.send({ user, password })
  })

  router.post('/user/sign-up', async (request, response) => {
    const { email, password } = request.body
    const user = await authService.createUser(auth, email, password)

    return response.send(user)
  })

  router.post('/user/recovery-password', (request, response) => {
    const { user } = request.body
    return response.send({ user })
  })

  return router
}

export default AccessController
