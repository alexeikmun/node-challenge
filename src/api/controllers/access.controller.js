import i18n from 'i18n'
import { AuthService, UserService } from '../services'
import { userValidator } from '../validators'

const AccessController = ({ router, firebase, tryCatch, validator }) => {
  const authService = AuthService()
  const userService = UserService()
  const { STATUS_CODE_BAD_REQUEST } = process.env

  router.post('/user/sign-up', userValidator, validator, tryCatch(async (request, response) => {
    const { email, password, name } = request.body
    try {
      const { uid } = await authService.createUser(firebase, email, password)
      await userService.createUser({ name, email, authId: uid })
      const token = await authService.createToken(firebase, uid)

      return response.send({ access_token: token, token_type: 'bearer' })
    } catch (error) {
      console.log('error -->', error)
      return response.status(STATUS_CODE_BAD_REQUEST).send({ code: -1, message: i18n.__('access.user-already-exist') })
    }
  }))

  return router
}

export default AccessController
