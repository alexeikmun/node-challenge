import http from 'http'
import path from 'path'
import dotenv from 'dotenv'
import { setupDatabase, setupFirebase, setupTranslate } from './providers'
import api from './api'

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

setupDatabase(DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME).then((database) => {
  const firebase = setupFirebase()
  const server = http.createServer(api({ database, firebase }))
  const translatePath = path.join(__dirname, '../locales')
  console.log('path -->', translatePath)
  setupTranslate(translatePath, 'en')

  server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`)
  })
}).catch(err => console.error(err))
