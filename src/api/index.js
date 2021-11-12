import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import listEndpoints from 'express-list-endpoints'
import Routes from './routes'
import { AuthMiddleware, TryCatchMiddleware, ValidatorMiddleware } from './middlewares'

const api = (config) => {
  const { STATUS_CODE_NOT_FOUND, STATUS_CODE_SERVER_ERROR } = process.env
  const { firebase } = config
  const app = express()
  const router = express.Router()
  const auth = AuthMiddleware(firebase)
  const routes = Routes({ router, auth, tryCatch: TryCatchMiddleware, validator: ValidatorMiddleware, firebase })

  app.use(express.json()) // For parsing application/json
  app.use(express.urlencoded({ extended: true }))
  app.use(fileUpload())
  app.use(compression())
  app.use(helmet())
  app.use(cors())

  app.use('/api/v1', routes)
  app.use((request, response) => response.sendStatus(STATUS_CODE_NOT_FOUND))
  app.use((error, request, response, next) => {
    console.log(error.stack)
    return response.status(STATUS_CODE_SERVER_ERROR).send({ error: 'Something wrong happend, please try again!' })
  })

  console.log(listEndpoints(app))

  return app
}

export default api
