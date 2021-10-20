import http from 'http'
import dotenv from 'dotenv'

dotenv.config()

const { SERVER_PORT, SERVER_HOST } = process.env

const requestListener = (req, res) => console.log('response')
const server = http.createServer(requestListener)
server.listen(SERVER_PORT, SERVER_HOST, () => console.log(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`))
