import { AuthService } from '../services'

const AuthMiddleware = () => {
  const authService = AuthService()
  const { STATUS_CODE_UNAUTHORIZED } = process.env

  const auth = async (request, response, next) => {
    try {
      const token = authService.getToken(request.headers.authorization)
      if (!token) return response.sendStatus(STATUS_CODE_UNAUTHORIZED)
      const user = await authService.verifyToken(token)
      console.log('user -->', user)
      return user ? next() : response.sendStatus(STATUS_CODE_UNAUTHORIZED)
    } catch (error) {
      console.log('error -->', error)
      return response.status(STATUS_CODE_UNAUTHORIZED).send(error)
    }
  }

  return auth
}

export default AuthMiddleware
