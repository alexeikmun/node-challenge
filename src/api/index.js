import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import Routes from './routes'

const api = () => {
  const { STATUS_CODE_NOT_FOUND, STATUS_CODE_SERVER_ERROR } = process.env
  const app = express()
  const router = express.Router()
  const routes = Routes({ router })

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(helmet())
  app.use(cors())

  app.use('/api/v1', routes)
  app.use((request, response) => response.sendStatus(STATUS_CODE_NOT_FOUND))
  app.use((error, request, response, next) => {
    console.log(error)
    return response.status(STATUS_CODE_SERVER_ERROR).send({ error: 'Something wrong happend, please try again!' })
  })

  console.log(listEndpoints(app))

  return app
}

export default api
