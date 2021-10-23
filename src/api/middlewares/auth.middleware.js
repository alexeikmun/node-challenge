import { AuthService } from '../services'

const AuthMiddleware = (authServer) => {
  const authService = AuthService()
  const auth = async (request, response, next) => {
    try {
      const token = authService.getToken(request.headers.authorization)
      if (!token) return response.sendStatus(401)
      const user = await authService.getUserInfo(authServer, token)
      return user ? next() : response.sendStatus(401)
    } catch (error) {
      console.log('error -->', error)
      return response.sendStatus(401)
    }
  }

  return auth
}

export default AuthMiddleware
