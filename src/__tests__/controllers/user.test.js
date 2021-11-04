require('regenerator-runtime/runtime')
const request = require('supertest')
const dotenv = require('dotenv')
const path = require('path')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const { setupTranslate, setupFirebase } = require('../../providers')
const { AuthService } = require('../../api/services')
const api = require('../../api')

const { 
   user
} = require('../../__mocks__')

const { response } = require('express')

describe('RIGHT-THINGS', () => {
  let app = {}
  let firebase = {}
  let token = {}
  const authService = AuthService()

  beforeAll(async () => {
    dotenv.config()
    const mongoServer = await MongoMemoryServer.create()
    const database = mongoose.connect(mongoServer.getUri())
    const translatePath = path.join(__dirname, '../../locales')
    setupTranslate(translatePath, 'en')
    firebase = setupFirebase()
    
    app = api.default({ database, firebase })
    token = await request(app).post('/api/v1/user/sign-up').send(user)
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
    await authService.deleteUserByEmail(firebase, user.email)
  })

  describe('/user/stats', () => {
    describe('Missing token', () => {
      it('Should be response Unauthorized', async () => {
        const response = await request(app).get('/api/v1/user/stats')
        expect(response.statusCode).toBe(401)
      })
    })

    describe('Valid input', () => {
      it('Should be response OK', async() => {
        const response = await request(app).get('/api/v1/user/stats').auth(token.body.access_token, {
          type: 'bearer'
        })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
        expect(response.body.rightThing).toBe(0)
        expect(response.body.goalCompleted).toBe(0)
        expect(response.body.goalPending).toBe(0)
      })
    })
  })
})