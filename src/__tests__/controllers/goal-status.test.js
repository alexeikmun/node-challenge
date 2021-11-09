require('regenerator-runtime/runtime')
const request = require('supertest')
const dotenv = require('dotenv')
const path = require('path')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const { setupTranslate, setupFirebase } = require('../../providers')
const { AuthService } = require('../../api/services')
const api = require('../../api')
const { user, goalStatus, goalStatusInvalid } = require('../../__mocks__')

describe('GOAL_STATUS', () => {
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

  describe('POST: /goal-status', () => {
    describe('Missign token', () => {
      it('Should be response Unauthorized', async () => {
        const response = await request(app).post('/api/v1/goal-status').send(goalStatus)
        expect(response.statusCode).toBe(401)
      })
    })

    describe('Invalid request', () => {
      it('Should be response bad request', async () => {
        const response = await request(app).post('/api/v1/goal-status').auth(token.body.access_token, { type: 'bearer' }).send(goalStatusInvalid)
        expect(response.statusCode).toBe(400)
        expect(response.body).toBeDefined()
        expect(response.body.code).toBe(400)
        expect(response.body.message).toBeDefined()
      })
    })


    describe('Valid request', () => {
      it('Should be response OK', async () => {
        const response = await request(app).post('/api/v1/goal-status').auth(token.body.access_token, { type: 'bearer' }).send(goalStatus)
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
      })
    })

    describe('Already exists', () => {
      it('Should be response bad request', async () => {
        const response = await request(app).post('/api/v1/goal-status').auth(token.body.access_token, { type: 'bearer' }).send(goalStatus)
        expect(response.statusCode).toBe(400)
        expect(response.body.code).toBe(400)
        expect(response.body.message).toBeDefined()
      })
    })
  })

  describe('GET: /goal-status', () => {
    describe('Missing token', () => {
      it('Should be response Unauthorized', async () => {
        const response = await request(app).get('/api/v1/goal-status')
        expect(response.statusCode).toBe(401)
      })
    })

    describe('Valid request', () => {
      it('Should be response OK', async () => {
        const response = await request(app).get('/api/v1/goal-status').auth(token.body.access_token, {
          type: 'bearer'
        })

        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
      })
    })
  })
})