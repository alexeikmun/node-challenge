import express from 'express'
import listEndpoints from 'express-list-endpoints'
import Routes from './routes'
import { AuthMiddleware, TryCatchMiddleware, ValidatorMiddleware } from './middlewares'

const api = (config) => {
  const { firebase } = config
  const app = express()
  const router = express.Router()
  const auth = AuthMiddleware(firebase)
  const routes = Routes({ router, auth, tryCatch: TryCatchMiddleware, validator: ValidatorMiddleware, firebase })

  app.use(express.json()) // For parsing application/json
  app.use(express.urlencoded({ extended: true }))
  app.use('/api/v1', routes)
  app.use((request, response) => response.sendStatus(404))
  app.use((error, request, response, next) => {
    console.log(error.stack)
    return response.status(500).send({ error: 'Something wrong happend, please try again!' })
  })

  console.log(listEndpoints(app))

  return app
}

export default api
