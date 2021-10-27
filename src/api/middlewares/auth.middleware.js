import { AuthService } from '../services'

const AuthMiddleware = (authServer) => {
  const authService = AuthService()
  const { STATUS_CODE_UNAUTHORIZED } = process.env

  const auth = async (request, response, next) => {
    try {
      const token = authService.getToken(request.headers.authorization)
      if (!token) return response.sendStatus(STATUS_CODE_UNAUTHORIZED)
      const user = await authService.getUserInfo(authServer, token)
      return user ? next() : response.sendStatus(STATUS_CODE_UNAUTHORIZED)
    } catch (error) {
      console.log('error -->', error)
      return response.sendStatus(STATUS_CODE_UNAUTHORIZED)
    }
  }

  return auth
}

export default AuthMiddleware
