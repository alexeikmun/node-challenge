const http = require('http')
const dotenv = require('dotenv')
const { setupDatabase } = require('./config')

dotenv.config()

const {
  SERVER_PORT,
  SERVER_HOST,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} = process.env

setupDatabase(DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME).then((connection) => {
  console.log('connection -->', connection)
  const requestListener = (req, res) => console.log('response')
  const server = http.createServer(requestListener)
  server.listen(SERVER_PORT, SERVER_HOST, () => console.log(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`))
}).catch(err => console.error(err))
