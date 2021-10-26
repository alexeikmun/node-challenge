require('regenerator-runtime/runtime')
const request = require('supertest')
const dotenv = require('dotenv')
const path = require('path')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const { setupTranslate, setupFirebase } = require('../../providers')
const api = require('../../api')
const { user, invalidUser } = require('../../__mocks__')
let app = {}


describe('USER', () => {
  beforeAll(async () => {
    dotenv.config()
    const mongoServer = await MongoMemoryServer.create()
    const database = mongoose.connect(mongoServer.getUri())
    const translatePath = path.join(__dirname, '../../locales')
    setupTranslate(translatePath, 'en')
    const firebase = setupFirebase()
  
    app = api.default({database, firebase})
  })
  
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  })

  describe('POST :/user/sign-up', () => {
    describe('Invalid input', () => {
      it('should response bad request', async () => {
        const response = await request(app).post('/api/v1/user/sign-up').send(invalidUser)
  
        expect(response.statusCode).toBe(400)
        expect(response.body).toBeDefined()
        expect(response.body.message.length).toBe(3)
      })
    })
  
    describe('New user', () => {
      it('Should response OK', async () => {
        const response = await request(app).post('/api/v1/user/sign-up').send(user)
        console.log(response.body)
        expect(response.statusCode).toBe(200)
        expect(response.body.code).toBeDefined()
      })
    })

    describe('User already exist', () => {
      it('Should response bad request', async () => {
        const response = await request(app).post('/api/v1/user/sign-up').send(user)
        console.log(response.body)
        expect(response.statusCode).toBe(400)
        expect(response.body.code).toBe(-1)
      })
    })
  })
})
