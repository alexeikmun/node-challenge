import express from 'express'
import listEndpoints from 'express-list-endpoints'
import Routes from './routes'

const api = (config) => {
  const app = express()
  const router = express.Router()
  const routes = Routes(router)

  app.use('/api/v1', routes)
  app.use((request, response) => response.sendStatus(404))

  console.log(listEndpoints(app))

  return app
}

export default api
