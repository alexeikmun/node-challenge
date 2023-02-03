import http from 'http'
import dotenv from 'dotenv'
import api from './api'

dotenv.config()

const {
  SERVER_PORT,
  SERVER_HOST
} = process.env

const server = http.createServer(api())

server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`)
})
