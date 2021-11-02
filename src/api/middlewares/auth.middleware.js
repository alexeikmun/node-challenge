import { AuthService, UserService } from '../services'

const AuthMiddleware = () => {
  const authService = AuthService()
  const userService = UserService()

  const { STATUS_CODE_UNAUTHORIZED } = process.env

  const auth = async (request, response, next) => {
    try {
      const token = authService.getToken(request.headers.authorization)
      if (!token) return response.sendStatus(STATUS_CODE_UNAUTHORIZED)
      const tokenVerified = await authService.verifyToken(token)
      if (!tokenVerified) return response.sendStatus(STATUS_CODE_UNAUTHORIZED)
      const user = await userService.findUser({ authId: tokenVerified.payload.uid })
      request.user = user
      return user ? next() : response.sendStatus(STATUS_CODE_UNAUTHORIZED)
    } catch (error) {
      console.log('error -->', error)
      return response.status(STATUS_CODE_UNAUTHORIZED).send(error)
    }
  }

  return auth
}

export default AuthMiddleware
